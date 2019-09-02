import alertStore from './alertStore';
import userStore from './userStore';
//import filterStore from './filterStore';

/*
    DUCKS FORMAT CONTAINS EVERYTHING IN ONE FILE!
    ACTION TYPES, ACTION CREATORS, AND REDUCERS

*/

export const reducers = { alertStore, userStore };
export { alertActions } from './alertStore';
export { userActions } from './userStore';

