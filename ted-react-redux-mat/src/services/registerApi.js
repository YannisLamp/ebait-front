import { authHeader } from '../utils';
import axios from './axiosConfig';

import { loginApi } from './loginApi';
import { userActions } from '../store/ducks/userStore';
import { alertActions } from '../store/ducks/alertStore';

export const registerApi = {
    registerThunk,
    checkUsernameExists
};

function registerThunk(username, password, firstName, 
        lastName, email, phoneNumber, country, address, afm) {
    return dispatch => {
        dispatch(userActions.registerRequest({ username }));

        const jsonRequest = {
            username,
            password,
            firstName,
            lastName,
            email,
            phoneNumber,
            country,
            address,
            afm
        }

        const user = {
            username,
            password
        }

        axios.post('/register', jsonRequest)
            .then(
                response => {
                    console.log(response.headers);
                    dispatch(userActions.registerSuccess(user));

                    // If register was a success, then log him in (redirection will take place after login)
                    dispatch(loginApi.loginThunk(username, password));
                },
                error => {
                    console.log(' in redux fail');
                    dispatch(userActions.registerFailure(error));

                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        //console.log(error.response.data);
                        //console.log(error.response.status);
                        //console.log(error.response.headers);
                        let errorMsg = '';
                        for (let currError of error.response.data.errors) {
                            errorMsg += currError.defaultMessage + '\n';
                        }
                        dispatch(alertActions.error(errorMsg));

                        if (error.response.status === 401) {
                            // auto logout if 401 response returned from api
                            //localStorage.removeItem('user');
                            //window.location.reload(true);
                            
                        }
                    } 
                    else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('no response!!!');
                        console.log(error.request);
                    } 
                    else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        dispatch(alertActions.error(error.message));
                    }
                    console.log(error.config);

                }
            );
    };
}


function checkUsernameExists(username) {
    return axios.post('/exists', { username })
    .then(
        response => {
            //console.log(response.headers);
            return response.data;
        },
        error => {
            console.log('username exists error');
            console.log(error);
        }
    );
}