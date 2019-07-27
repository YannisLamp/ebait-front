import { loginApi } from '../../services';
import { alertActions } from './alert';
import { history } from '../../utils';

// Action types
const authTypes = { 
    REQUEST: 'my_app/auth/REQUEST',
    SUCCESS: 'my_app/auth/SUCCESS',
    FAILURE: 'my_app/auth/FAILURE',
    LOGOUT: 'my_app/auth/LOGOUT'
}

// Action creators
function request(user) { 
    return { type: authTypes.REQUEST, user } 
}
    
function success(user) { 
    return { type: authTypes.SUCCESS, user } 
}
    
function failure(error) { 
    return { type: authTypes.FAILURE, error } 
}

function logout_action() { 
    return { type: authTypes.LOGOUT } 
}


// Operators
export const authOperations = {
    login, 
    logout
};

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

        dispatch(success({name:'yayay', sur:'sur'}));
    };
}

function logout() {
    loginApi.logout();
    return dispatch => dispatch(logout_action);
}


// Reducer
let user = JSON.parse(localStorage.getItem('user'));
console.log('stored user?');
console.log(user);
const initialState = user ? { loggedIn: true, user } : {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case authTypes.REQUEST:
        return {
        loggingIn: true,
        user: action.user
        };
    case authTypes.SUCCESS:
        return {
        loggedIn: true,
        user: action.user
        };
    case authTypes.FAILURE:
        return {};
    case authTypes.LOGOUT:
        return {};
    default:
        return state
    }
}