
// Action types
const alertTypes = {
    SUCCESS: 'my_app/alert/SUCCESS',
    ERROR: 'my_app/alert/ERROR',
    CLEAR: 'my_app/alert/CLEAR'
};


// Actions
export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertTypes.SUCCESS, message };
}

function error(message) {
    return { type: alertTypes.ERROR, message };
}

function clear() {
    return { type: alertTypes.CLEAR };
}


// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
    case alertTypes.SUCCESS:
        return {
            type: 'alert-success',
            message: action.message
        };
    case alertTypes.ERROR:
        return {
            type: 'alert-danger',
            message: action.message
        };
    case alertTypes.CLEAR:
        return {};
    default:
        return state
    }
}


