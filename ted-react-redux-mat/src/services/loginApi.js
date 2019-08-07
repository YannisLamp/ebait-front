import { authHeader } from '../utils';
import axios from './axiosConfig';

import { userActions } from '../store/ducks/userStore';
import { alertActions } from '../store/ducks/alertStore';

// response.headers

export const loginApi = {
    loginThunk,
    logoutThunk
};

function loginThunk(username, password) {
    return dispatch => {
        dispatch(userActions.loginRequest({ username }));

        const jsonRequest = {
            username,
            password,
        }
        console.log('axios posting');

        axios.post('/login', jsonRequest)
            .then(
                response => {
                    console.log(response);
                    let user = response.data;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('user', JSON.stringify(user));
                    if (user) {
                        console.log('login user');
                        console.log(user);
                    }
                    dispatch(userActions.loginSuccess(user));
                    //history.push('/');
                },
                error => {
                    console.log(' in redux fail');
                    dispatch(userActions.loginFailure(error));
                    dispatch(alertActions.error(error.message));

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
                    }
                    console.log(error.config);

                }
            );
    }
}


function logoutThunk() {
    localStorage.removeItem('user');
    return dispatch => dispatch(userActions.logoutAction());
}


