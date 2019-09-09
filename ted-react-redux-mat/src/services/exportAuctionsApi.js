import axios from './axiosConfig';
import handleError from './handleError';

export const exportAuctionsApi = {
    downloadAuctions
};

function downloadAuctions(type) {
    // Type is a string with options 'xml' or 'json'
    const jsonRequest = {
        params: {
            type
        }
    }

    return axios.get('/admin/download_auctions', jsonRequest)
        // .then(
        //     response => {
        //         return response.data;
        //     }
        // )
        .catch(error => { handleError(error) });
}

