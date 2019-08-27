import axios from './axiosConfig';

export const auctionsApi = {
    createAuction,
    getUserAuctions,
    
    getCategories
};


function createAuction(name, description, endingDate, 
    firstBid, buyout, selectedCategories, country, locationDescription,
    selectedLat, selectedLng) {

    let categories = [];
    for (let cat of selectedCategories) {
        categories.push({name: cat});
    }

    const jsonRequest = {
        name: name,
        description: description,
        ends: endingDate,
        firstBid: firstBid,
        buyPrice: buyout,
        country: country,
        
        categories:categories,

        location: {
            latitude: selectedLat,
            longitude: selectedLng,
            text: locationDescription
        },
        
        
        //address,
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

function getCategories() {
    return axios.get('/categories')
        .then(response => {
                return response.data;
            },
            error => {

            }
        );
}


function getUserAuctions() {
    return axios.get('/auctions')
        .then(response => {
                return response.data;
            },
            error => {

            }
        );
}