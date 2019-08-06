import alert from './alert';
import auth from './auth';

/*
    DUCKS FORMAT CONTAINS EVERYTHING IN ONE FILE!
    ACTION TYPES, ACTION CREATORS, THUNK OPERATORS(API CALLS) AND REDUCERS

*/

export const reducers = {alert, auth};
export { alertActions } from './alert';
export { authOperations } from './auth';

