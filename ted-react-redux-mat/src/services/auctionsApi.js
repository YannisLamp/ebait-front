import axios from './axiosConfig';

export const auctionsApi = {
    createAuction,
    getUserAuctions,
    
    getRootCategories,
    getChildrenCategories
};


function createAuction(name, description, endingDate, 
    firstBid, buyout, categories, country, locationDescription,
    selectedLat, selectedLng) {

    const jsonRequest = {
        name: name,
        description: description,
        ends: endingDate,
        firstBid: firstBid,
        buyPrice: buyout,
        country: country,
        
        categories: categories,

        location: {
            latitude: selectedLat,
            longitude: selectedLng,
            text: locationDescription
        },
        
    }


    return axios.post('/auctions', jsonRequest)
        .then(
            response => {
                return response.data;
            },
            error => {
                

            }
        );
}


function getActiveAuctions() {
    return axios.get('/search/auctions/active', {
        params: {

            // category: 
            // description: 'substring'

            // gia to currentbid
            // belowPrice:
            // abovePrice:

            // location: location.text


            // orderBy: orderBy,
            // pageNo: currPage,

            // pageSize: pageSize,
            // order: order,
        }
        })
        .then(response => {
                return response.data;
            },
            error => {

            }
        );
}

function buyoutAuction(id) {
    return axios.put('/auctions/buyout' + id)
        .then(response => {
                return response.data;
            },
            error => {

            }
        );
}


function getUserAuctions() {
    return axios.get('/auctions', {
        //'active', 'finished', 'archived'
        params: {
            //type: 'active',
        }
        })
        .then(response => {
                return response.data;
            },
            error => {

            }
        );
}


function getRootCategories() {
    return axios.get('/categories/root')
        .then(response => {
                return response.data;
            },
            error => {

            }
        );
}


function getChildrenCategories(parentId) {
    return axios.get('/categories/children/' + parentId)
        .then(response => {
                return response.data;
            },
            error => {

            }
        );
}