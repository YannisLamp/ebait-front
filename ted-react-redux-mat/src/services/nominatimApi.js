import axios from 'axios';


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
                },
                error => {

                    if (error.response.status === 401) {
                        // auto logout if 401 response returned from api
                        // dispatch(logoutThunk);
                        //window.location.reload(true);
                    }
                }
            );
}