import axios from './axiosConfig';

export const auctionsApi = {
    
    
    
    getCategories
};


function getCategories() {
    return axios.get('/categories')
        .then(response => {
                return response.data;
            },
            error => {

            }
        );
}