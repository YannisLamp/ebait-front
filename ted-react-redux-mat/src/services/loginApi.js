import { authHeader } from '../utils';
import axios from './axiosConfig';

// response.headers

export const loginApi = {
    login
};

function login(username, password) {
    const jsonRequest = {
        username,
        password,
    }

    return axios.post('/login', jsonRequest)
        .then(response => {
            console.log(response);
            console.log(response.data);

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(response.data));
            
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if (error.response.status === 401) {
                    // auto logout if 401 response returned from api
                    localStorage.removeItem('user');
                    window.location.reload(true);
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
}
