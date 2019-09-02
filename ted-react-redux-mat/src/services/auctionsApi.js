import axios from './axiosConfig';

export const auctionsApi = {
    createAuction,
    editAuction,
    getUserAuctions,
    getActiveAuctions,
    getAllAuctions,
    startAuction,
    deleteAuction,

    bidAuction,

    getRootCategories,
    getChildrenCategories,
    getAllCats,
};


function createAuction(name, description, ends,
    firstBid, buyout, categories, country, locationDescription,
    selectedLat, selectedLng, photos) {

    const jsonRequest = {
        name: name,
        description: description,
        ends: ends,
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
                console.log(response.data);

                // After the auction is created, make a request to append all the photos
                // the user has uploaded
                const itemID = response.data.itemID;
                uploadMultiplePhotos(itemID, photos)
                    .then(response => {
                        return response.data;
                    },
                        error => {

                        }
                    );
            },
            error => {


            }
        );
}


function editAuction(itemID, name, description, ends,
    firstBid, buyout, categories, country, locationDescription,
    selectedLat, selectedLng, photos, deletedPhotos) {

    const jsonRequest = {
        name: name,
        description: description,
        ends: ends,
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

    return axios.put('/auctions/' + itemID, jsonRequest)
        .then(
            response => {
                // Then delete all the photos that the iser has deleted in the UI
                for (const photo of deletedPhotos) {
                    deleteAuctionPhoto(photo.photoId);
                }

                // After the auction is edited, make a request to append all the new photos
                // the user has uploaded
                return uploadMultiplePhotos(itemID, photos);
            },
            error => {


            }
        );
}


function getAllAuctions(categories, description, lowestPrice, highestPrice, location,
    order, orderBy, currPage, pageSize) {

    const jsonRequest = {
        params: {

            categories: categories,
            description: description,
            lowestPrice: lowestPrice,
            highestPrice: highestPrice,
            location: location,

            //order: orderBy,
            //orderBy: order,

            pageNo: currPage,
            pageSize: pageSize,
        }
    }

    return axios.get('/search/auctions/filters', jsonRequest)
        .then(response => {
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

function bidAuction(id, amount) {
    return axios.put('/auctions/add_bid/' + id)
        .then(response => {
            return response.data;
        },
            error => {

            }
        );
}

function deleteAuctionPhoto(photoId) {
    return axios.delete('/auctions/delete_photo/' + photoId, {

    })
        .then(response => {
            return response.data;
        },
            error => {

            }
        );
}

function uploadMultiplePhotos(auctionId, photos) {

    const formData = new FormData();

    for (const photo of photos) {
        formData.append('imageFile', photo);
    }

    return axios.post('/auctions/' + auctionId + '/upload_multiple_photos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(
            response => {
                return response.data;
            },
            error => {


            }
        );
}

function getUserAuctions(type) {
    return axios.get('/auctions', {
        //'created', 'started', 'finished'
        params: {
            type,
        }
    })
        .then(response => {
            return response.data;
        },
            error => {

            }
        );
}

function startAuction(itemID) {
    return axios.put('/auctions/start/' + itemID)
        .then(response => {
            return response.data;
        },
            error => {

            }
        );
}

function deleteAuction(itemID) {
    return axios.delete('/auctions/' + itemID)
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


function getAllCats(reqs) {
    return Promise.all(reqs)
        .then(allResp => {
            return allResp;
        },
            error => {

            });
}