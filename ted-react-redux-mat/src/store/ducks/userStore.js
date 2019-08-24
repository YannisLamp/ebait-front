import { alertActions } from './alertStore';

// Action types
const userTypes = {
    REGISTER_REQUEST: 'my_app/user/REGISTER_REQUEST',
    REGISTER_SUCCESS: 'my_app/user/REGISTER_SUCCESS',
    REGISTER_FAILURE: 'my_app/user/REGISTER_FAILURE',

    LOGIN_REQUEST: 'my_app/user/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'my_app/user/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'my_app/user/LOGIN_FAILURE',

    LOGOUT: 'my_app/user/LOGOUT',

    REFRESH_USER: 'my_app/user/REFRESH_USER',

    TOGGLE_SIDEBAR: 'my_app/user/TOGGLE_SIDEBAR',
}




// Action creators
export const userActions = {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutAction,
    refreshUser,
    toggleSidebar
}

function registerRequest(user) {
    return { type: userTypes.REGISTER_REQUEST, user } 
}

function registerSuccess(user) { 
    return { type: userTypes.REGISTER_SUCCESS, user } 
}
    
function registerFailure(error) { 
    return { type: userTypes.REGISTER_FAILURE, error } 
}

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

function refreshUser(user) {
    return { type: userTypes.REFRESH_USER, user } 
}

function toggleSidebar() { 
    return { type: userTypes.TOGGLE_SIDEBAR } 
}



// Reducer Initialization
let user = JSON.parse(localStorage.getItem('user'));
console.log('stored user?');
console.log(user);
const initialState = user ? { loggedIn: true, user, sidebarOpen: true } : { loggedIn: false, sidebarOpen: true };
// Reducer
export default function reducer(state = initialState, action) {
    const { loggedIn, user, sidebarOpen } = state;

    switch (action.type) {
    case userTypes.REGISTER_REQUEST:
        return {
            registering: true,
            username: action.user
        };
    case userTypes.REGISTER_SUCCESS:
        return {
            registered: true,
            user: action.user
        };
    case userTypes.REGISTER_FAILURE:
        return {};
    case userTypes.LOGIN_REQUEST:
        return {
            loggingIn: true,
            username: action.user
        };
    case userTypes.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user,
            sidebarOpen: true,
        };
    case userTypes.LOGIN_FAILURE:
        return {};
    case userTypes.LOGOUT:
        return {};
    case userTypes.REFRESH_USER:
        return {
            loggedIn: true,
            user: action.user,
            sidebarOpen: sidebarOpen,
        };
    case userTypes.TOGGLE_SIDEBAR:
        return {
            loggedIn,
            user,
            sidebarOpen: !sidebarOpen
        }
    default:
        return state
    }
}