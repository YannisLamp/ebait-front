
// Action types
const alertTypes = {
    SUCCESS: 'ebait/alert/SUCCESS',
    ERROR: 'ebait/alert/ERROR',
    CLEAR: 'ebait/alert/CLEAR'
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
            open: true,
            type: 'success',
            message: action.message
        };
    case alertTypes.ERROR:
        return {
            open: true,
            type: 'error',
            message: action.message
        };
    case alertTypes.CLEAR:
        return {
            open: false,
        };
    default:
        return state
    }
}


