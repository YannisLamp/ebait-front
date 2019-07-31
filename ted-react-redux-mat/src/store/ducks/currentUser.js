import { loginApi } from '../../services';
import { registerApi } from '../../services';
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

    LOGOUT: 'my_app/user/LOGOUT'
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


// Operators
export const userOperations = {
    register,
    login, 
    logout
};

function register(username, password, firstName, lastName, email) {
    return dispatch => {
        dispatch(loginRequest({ username }));
        
        console.log('registerApi:\n');
        console.log(registerApi);

        registerApi.register(username, password, firstName, lastName, email)
            .then(
                user => {
                    dispatch(loginSuccess(user));
                    //history.push('/');
                },
                error => {
                    dispatch(loginFailure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

function login(username, password) {
    return dispatch => {
        /*dispatch(request({ username }));

        loginApi.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );*/

        //dispatch(success({name:'yayay', sur:'sur'}));
    };
}

function logout() {
    localStorage.removeItem('user');
    return dispatch => dispatch(logoutAction);
}


// Reducer
let user = JSON.parse(localStorage.getItem('user'));
console.log('stored user?');
console.log(user);
const initialState = user ? { loggedIn: true, user } : {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
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
    default:
        return state
    }
}