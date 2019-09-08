import axios from 'axios';
import handleError from './handleError';


export const nominatimApi = {
    getGeoLocation
};

function getGeoLocation(query) {    
        return axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: query,
                format: 'geocodejson'
            }
            })
            .then(response => {
                    return response.data;
            })
            // May need to remove handle error here (no need for logout) 
            .catch(error => {handleError(error)});
}