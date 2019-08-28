import { authHeader, history } from '../utils';
import axios from './axiosConfig';

import { userActions } from '../store/ducks/userStore';
import { alertActions } from '../store/ducks/alertStore';

import { usersApi } from './usersApi';

// response.headers

export const loginApi = {
    loginThunk,
    logoutThunk,
    refreshUserThunk
    //loginAsGuest,
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
                    localStorage.setItem('jwt', authorizationJwt);

                    // Then request and save logged in user information  
                    const userId = response.headers.userid;
                    usersApi.getUserInfo(userId)
                        .then(data => {
                            let user = data;
                            // TEMPORARY FIX NEEDS TO BE REMOVED
                            user.address = user.location;
                            //user.authorizationJwt = authorizationJwt;
                            dispatch(userActions.loginSuccess(user))
                            // Also store retrieved information locally so that they persist
                            localStorage.setItem('user', JSON.stringify(user));

                            // And redirect
                            if (user.userRole === 'ADMIN') {
                                history.push('/admin');
                            }
                            else {
                                history.push('/');
                            }
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

function refreshUserThunk(userId) {
    return dispatch => {
        usersApi.getUserInfo(userId)
            .then(data => {
                // Overwrite old user data with new data
                let user = data;
                dispatch(userActions.refreshUser(user))
                // Also overwrite retrieved information locally so that they persist
                localStorage.setItem('user', JSON.stringify(user));
            }
            );
    }
}

function logoutThunk() {
    // Clean up local storage
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    return dispatch => dispatch(userActions.logoutAction());
}


