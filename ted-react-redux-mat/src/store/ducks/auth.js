import axios from '../../axiosConfig';
import { alertActions } from './alert';
import { history } from '../../utils';

// Action types
const userTypes = { 
    REGISTER_REQUEST: 'my_app/user/REGISTER_REQUEST',
    REGISTER_SUCCESS: 'my_app/user/REGISTER_SUCCESS',
    REGISTER_FAILURE: 'my_app/user/REGISTER_FAILURE',

    LOGIN_REQUEST: 'my_app/user/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'my_app/user/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'my_app/user/LOGIN_FAILURE',

    LOGOUT: 'my_app/user/LOGOUT',

    TOGGLE_SIDEBAR: 'my_app/user/TOGGLE_SIDEBAR'
}

// Action creators

// Register
function registerRequest(user) { 
    return { type: userTypes.REGISTER_REQUEST, user } 
}

function registerSuccess(user) { 
    return { type: userTypes.REGISTER_SUCCESS, user } 
}
    
function registerFailure(error) { 
    return { type: userTypes.REGISTER_FAILURE, error } 
}

// Login
function loginRequest(user) { 
    return { type: userTypes.LOGIN_REQUEST, user } 
}
    
function loginSuccess(user) { 
    return { type: userTypes.LOGIN_SUCCESS, user } 
}
    
function loginFailure(error) { 
    return { type: userTypes.LOGIN_FAILURE, error } 
}

function logoutAction() { 
    return { type: userTypes.LOGOUT } 
}

function toggleSidebar() { 
    return { type: userTypes.TOGGLE_SIDEBAR } 
}

// Operators
export const authOperations = {
    register,
    login, 
    logout,
    toggleSidebar
};

function register(username, password, firstName, lastName, email) {
    return dispatch => {
        dispatch(registerRequest({ username }));

        const jsonRequest = {
            username,
            password,
            firstName,
            lastName,
            email,
        }

        axios.post('/register', jsonRequest)
            .then(
                response => {
                    console.log(response.headers);
                    dispatch(registerSuccess(user));

                    // If register was a success, then log him in
                    dispatch(login(user));

                    //history.push('/');
                },
                error => {
                    console.log(' in redux fail');
                    dispatch(registerFailure(error));
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
    };
}


function login(username, password) {


        return dispatch => {
            dispatch(loginRequest({ username }));
    
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
                        dispatch(loginSuccess(user));
                        //history.push('/');
                    },
                    error => {
                        console.log(' in redux fail');
                        dispatch(loginFailure(error));
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


function logout() {
    localStorage.removeItem('user');
    return dispatch => dispatch(logoutAction);
}


// Reducer
let user = JSON.parse(localStorage.getItem('user'));
console.log('stored user?');
console.log(user);
const initialState = user ? { loggedIn: true, user, sidebarOpen: true } : { loggedIn: false, sidebarOpen: true };

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case userTypes.REGISTER_REQUEST:
        return {
        registering: true,
        user: action.user
        };
    case userTypes.REGISTER_SUCCESS:
        return {
        loggedIn: true,
        user: action.user
        };
    case userTypes.REGISTER_FAILURE:
        return {};
    case userTypes.LOGIN_REQUEST:
        return {
        loggingIn: true,
        user: action.user
        };
    case userTypes.LOGIN_SUCCESS:
        return {
        loggedIn: true,
        user: action.user
        };
    case userTypes.LOGIN_FAILURE:
        return {};
    case userTypes.LOGOUT:
        return {};
    case userTypes.TOGGLE_SIDEBAR:
        const { loggedIn, user, sidebarOpen } = state;
        return {
        loggedIn,
        user,
        sidebarOpen: !sidebarOpen
        }
    default:
        return state
    }
}