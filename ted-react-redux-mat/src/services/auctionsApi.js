import axios from './axiosConfig';

export const auctionsApi = {
    createAuction,
    getUserAuctions,
    startAuction,
    deleteAuction,

    getRootCategories,
    getChildrenCategories
};


function createAuction(name, description, ends,
    firstBid, buyout, categories, country, locationDescription,
    selectedLat, selectedLng, imageFile) {

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

    const json = JSON.stringify(jsonRequest);
    const blob = new Blob([json], {
        type: 'application/json'
    });

    const formData = new FormData();
    formData.append('item', blob);
    formData.append('imageFile', imageFile);

    return axios.post('/auctions', formData, {
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