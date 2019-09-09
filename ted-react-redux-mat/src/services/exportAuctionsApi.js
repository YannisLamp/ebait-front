import axios from './axiosConfig';
import handleError from './handleError';


const downloadAuctions = async (type) => {
    if (type === 'json') {
        return axios.get('/admin/download_auctions', {
            transformResponse: [],
            responseType: 'blob',
        })
            .catch(error => { handleError(error) });
    }
    else if (type === 'xml') {
        return axios.get('/admin/download_auctions', { 
            headers: { 'Accept': 'text/xml, text/plain, */*' },
            responseType: 'blob',
        })
            .catch(error => { handleError(error) });
    }
}


export const exportAuctionsApi = {
    downloadAuctions
};

