import { authHeader, history } from '../utils';
import axios from './axiosConfig';

import { userActions } from '../store/ducks/userStore';
import { alertActions } from '../store/ducks/alertStore';

import { usersApi } from './usersApi';

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

        axios.post('/login', jsonRequest)
            .then(
                response => {
                    // If the login process was successful, save authorization JWT
                    const authorizationJwt = response.headers.authorization;
                    axios.defaults.headers.common['Authorization'] = authorizationJwt;

                    // Then request and save logged in user information  
                    const userId = response.headers.userid;
                    usersApi.getUserInfo(userId)
                        .then(data => {
                            let user = data;
                            //user.authorizationJwt = authorizationJwt;
                            dispatch(userActions.loginSuccess(user))
                            // Also store retrieved information locally so that they persist
                            localStorage.setItem('user', JSON.stringify(user));
                            // And redirect
                            history.push('/');
                        }

                        );
                },
                error => {
                    dispatch(userActions.loginFailure(error));
                    if (error.response) {
                        dispatch(alertActions.error(error.response.message));
                    }
                    else {
                        dispatch(alertActions.error(error.message));
                    }

                    if (error.response.status === 401) {
                        // auto logout if 401 response returned from api
                        // dispatch(logoutThunk);
                        //window.location.reload(true);
                    }
                }
            );
    }
}


function logoutThunk() {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common["Authorization"];
    return dispatch => dispatch(userActions.logoutAction());
}


