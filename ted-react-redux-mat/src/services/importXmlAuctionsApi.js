import axios from 'axios';
import { usersApi } from './usersApi';
import handleError from './handleError';

var convert = require('xml-js');


const importInstance = axios.create({
    baseURL: 'https://localhost:8443/api',
});


const parseXml = (inputXml) => {
    const options = { ignoreComment: true, alwaysChildren: false, compact:true };
    const result = convert.xml2js(inputXml, options);
    return result;
}


// From an array of auction js objects transformed from xml,
// find all unique users and return their name and
const getUsersFromAuctions = (auctionObjects) => {
    let map = new Map();
    //console.log(auctionObjects);
    for (const auction of auctionObjects.Items.Item) {
        const creator = auction.Seller._attributes;
        const key = creator.UserID;
        const value = {
            rating: creator.Rating,
            country: auction.Country ? auction.Country._text : 'unknown',
            location: auction.Location ? auction.Location._text : 'unknown',
        }
        if (!map.has(key)) {
            map.set(key, value);
        }
        //console.log(auction);

        // Now for each bid (there may be some users that bid and have not created auctions)
        if (auction.Bids.Bid) {
            if (Array.isArray(auction.Bids.Bid)) {
                
                for (const bid of auction.Bids.Bid) {
                    // console.log(bid);
                    const bidder = bid.Bidder;
                    const bidderKey = bidder._attributes.UserID;
                    const bidderValue = {
                        rating: bidder._attributes.Rating,
                        country: bidder.Country ? bidder.Country._text : 'unknown',
                        location: bidder.Location ? bidder.Location._text : 'unknown',
                    }
                    
                    if (!map.has(bidderKey)) {
                        map.set(bidderKey, bidderValue);
                    }
                }
            }
            else {
                //console.log('LONELY BID');
                const bid = auction.Bids.Bid;
                const bidder = bid.Bidder;
                    const bidderKey = bidder._attributes.UserID;
                    const bidderValue = {
                        rating: bidder._attributes.Rating,
                        country: bidder.Country ? bidder.Country._text : 'unknown',
                        location: bidder.Location ? bidder.Location._text : 'unknown',
                    }
                    
                    if (!map.has(bidderKey)) {
                        map.set(bidderKey, bidderValue);
                    }
            }
        }
    }
    // Convert map to array, as map property is not needed anymore
    const userArray = Array.from(map);
    //console.log(userArray);
    return userArray;
}

// Creates users and returns JWTS
const createUsersFromArray = async (userArray) => {

    // Create an array of requests
    let jwtMap = new Map();
    let userIdMap = new Map();
    for (let i = 0; i < userArray.length; i += 50) {
        const requests = userArray
            .slice(i, i + 50)
            .map(([key, value]) => {
                return createFakeUser(key, value.country, value.location)
                    .then(res => {
                        jwtMap.set(key, res[0]);
                        userIdMap.set(key, res[1]);
                        //console.log(res);
                    })
                    .catch(error => {handleError(error)});
            });

        await Promise.all(requests)
            .catch(error => {handleError(error)});
    }
    
    //console.log(jwtMap);
    return [jwtMap, userIdMap];
    
}




const createFakeUser = async (username, country, location) => {
    const jsonRequest = {
        username: username,
        password: '12341234',
        firstName: 'unknown',
        lastName: 'unknown',
        email: 'mail@mail.com',
        phoneNumber: '2102102102',
        country: country,
        address: location,
        afm: 'unknown'
    }

    const user = {
        username: username,
        password: '12341234'
    }

    return importInstance.post('/register', jsonRequest)
        .then(
            response => {
                return importInstance.post('/login', user)
                    .then(
                        response => {
                            const userId = response.headers.userid;
                            const authorizationJwt = response.headers.authorization;
                            return [authorizationJwt, userId];
                        });
            }
        )
        .catch(error => {handleError(error)});
}


const verifyUsersFromIdMap = async (userIdMap) => {
    const userIdArray = Array.from(userIdMap);
    for (let i = 0; i < userIdArray.length; i += 50) {
        const requests = userIdArray
            .slice(i, i + 50)
            .map(([key, value]) => {
                return usersApi.verifyUser(value);
            });

        await Promise.all(requests)
            .catch(error => {handleError(error)});
    }
}

const createAuctionsFromParsed = async (auctionObjects, jwtMap) => {
    let itemIDToDesc = new Map();

    const auctions = auctionObjects.Items.Item;
    for (let i = 0; i < auctions.length; i += 40) {
        const requests = auctions.slice(i, i + 40).map(auction => {
            return createFakeAuction(auction, jwtMap)
                .then(res => {
                    itemIDToDesc.set(res[0], res[1]);
                });
        })
        await Promise.all(requests)
            .catch(error => {handleError(error)});
    }

    // for (let i = 0; i < auctions.length; i++) {
    //     await createFakeAuction(auctions[i], jwtMap)
    //         .then(res => {
    //             if (res[0] && res[1]) {
    //                 itemIDToDesc.set(res[0], res[1]);
    //             }
    //             else {
    //                 console.log('EDW EINAI TO THEMA');
    //                 console.log(res);
    //             }
    //         })
    //         .catch(error => {handleError(error)});
    // }

    return itemIDToDesc;
}


const createFakeAuction = async (auction, jwtMap) => {
    let categories = []
    for (const cat of auction.Category) {
        categories.push({name: cat._text});
    }
        
    const jsonRequest = {
        name: auction.Name._text,
        description: auction.Description ? auction.Description._text : '',
        ends: "Dec-13-19 18:10:40",
        firstBid: auction.First_Bid._text.slice(1),
        buyPrice: auction.Buy_Price ? auction.Buy_Price._text.slice(1) : '',
        country: auction.Country ? auction.Country._text : '',

        categories: categories,

        location: {
            latitude: auction.Location._attributes ? auction.Location._attributes.Latitude : '',
            longitude: auction.Location._attributes ? auction.Location._attributes.Longitude : '',
            text: auction.Location ? auction.Location._text : ''
        },
    }

    const creator = auction.Seller._attributes.UserID;
    const creatorJwt = jwtMap.get(creator);
    return importInstance.post('/auctions', jsonRequest, { headers: {"Authorization" : creatorJwt} })
        .then(
            response => {
                // After the auction is created, make requests to append all bids from other users
                const itemID = response.data.itemID;
                //const xmlitemID = auction._attributes.ItemID;
                //return [xmlitemID, itemID]; 
                
                let bids = [];
                if (auction.Bids.Bid) {
                    
                    if (Array.isArray(auction.Bids.Bid)) {
                        //console.log('ARRAYBIDS' + itemID);
                        for (const bid of auction.Bids.Bid) {
                            const bidder = bid.Bidder._attributes.UserID;
                            const bidderJwt = jwtMap.get(bidder);
                            const amount = bid.Amount._text.slice(1);
                            bids.push({bidderJwt, amount});
                        }
                    }
                    else {
                        //console.log('NORMALBIDS' + itemID);
                        const bid = auction.Bids.Bid;
                        const bidder = bid.Bidder._attributes.UserID;
                        const bidderJwt = jwtMap.get(bidder);
                        const amount = bid.Amount._text.slice(1);
                        bids.push({bidderJwt, amount});
                        
                    }
                    
                }

                const auctionDesc = {
                    creatorJwt: creatorJwt,
                    bids: bids,
                }
                return [itemID, auctionDesc];
            },
        )
        .catch(error => {handleError(error)});
}


const startAuctionsFromitemIDToDesc = async (itemIDToDesc) => {
    const itemIDArray = Array.from(itemIDToDesc);
    //console.log(itemIDArray);
    
    for (let i = 0; i < itemIDArray.length; i += 50) {
        const requests = itemIDArray.slice(i, i + 50).map(item => {
            return importInstance.put('/auctions/start/' + item[0], null, { headers: {"Authorization" : item[1].creatorJwt} });
        })
        await Promise.all(requests)
            .catch(error => {handleError(error)});
    }
    const itemIDArray2 = Array.from(itemIDToDesc);
    if (itemIDArray2.length !== itemIDArray.length) {
        console.log('ERROR: itemIDToDesc was not ready on call time');
    }
}

const placeBidsFromitemIDToDesc = async (itemIDToDesc) => {
    const itemIDArray = Array.from(itemIDToDesc);
    for (let i = 0; i < itemIDArray.length; i += 1) {
        if (itemIDArray[i][1].bids.length > 0) {
            //console.log(itemIDArray[i][1].bids);
            for (const bid of itemIDArray[i][1].bids) {
                await importInstance.put('/auctions/add_bid/' + itemIDArray[i][0], {amount: bid.amount}, { headers: {"Authorization" : bid.bidderJwt} })
                    .catch(error => {handleError(error)});
            }
        }
    }

}


export const importXmlAuctionsApi = {
    parseXml,
    getUsersFromAuctions,
    createUsersFromArray,
    createAuctionsFromParsed,
    verifyUsersFromIdMap,
    startAuctionsFromitemIDToDesc,
    placeBidsFromitemIDToDesc,
}