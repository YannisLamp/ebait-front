import { authHeader } from '../utils';
import axios from '../axiosConfig';

export const registerApi = {
    register,
    usernameExists
};

function register(username, password, firstName, lastName, email) {
    const jsonRequest = {
        username,
        password,
        firstName,
        lastName,
        email,
    }

    return axios.post('/register', jsonRequest)
        .then(response => {

            console.log(response);
            console.log(response.data);

            return response.data;
        })
        /*.catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if (error.response.status === 401) {
                    // auto logout if 401 response returned from api
                    //localStorage.removeItem('user');
                    //window.location.reload(true);
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('no response!!!');
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });*/
}


function usernameExists(username) {
    const jsonRequest = {
        username,
    }

    axios.post('/register', { jsonRequest })
        .then(res => {

            if (!res.ok()) {
                console.log('res not okay');
                console.log(res);
            }
            console.log(res);
            console.log(res.data);
        });
}