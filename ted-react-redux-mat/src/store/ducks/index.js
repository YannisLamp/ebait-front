import alertStore from './alertStore';
import userStore from './userStore';

/*
    DUCKS FORMAT CONTAINS EVERYTHING IN ONE FILE!
    ACTION TYPES, ACTION CREATORS, AND REDUCERS

*/

export const reducers = { alertStore, userStore };
export { alertActions } from './alertStore';
//export { authOperations } from './auth';

