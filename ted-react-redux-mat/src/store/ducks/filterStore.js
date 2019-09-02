import { alertActions } from './alertStore';

// Action types
const userTypes = {
    EMPTY_FILTERS: 'ebait/user/EMPTY_FILTERS',
    ALTER_FILTERS: 'ebait/user/ALTER_FILTERS',

    EMPTY_CATEGORIES: 'ebait/user/EMPTY_CATEGORIES',
    ALTER_CATEGORIES: 'ebait/user/ALTER_CATEGORIES',

    TOGGLE_FILTERS: 'ebait/user/TOGGLE_FILTERS',
}




// Action creators
export const userActions = {
    emptyFilters,
    alterFilters,
    emptyCategories,
    alterCategories,
    toggleFilters,
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
    const {  filtersOpen } = state;

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