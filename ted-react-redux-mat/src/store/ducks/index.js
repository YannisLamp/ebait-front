import alertStore from './alertStore';
import userStore from './userStore';
import auctionStore from './auctionStore';
import messageStore from './messageStore';

/*
    DUCKS FORMAT CONTAINS EVERYTHING IN ONE FILE!
    ACTION TYPES, ACTION CREATORS, AND REDUCERS

*/

export const reducers = { alertStore, userStore, auctionStore, messageStore };
export { alertActions } from './alertStore';
export { userActions } from './userStore';
export { auctionActions } from './auctionStore';
export { messageActions } from './messageStore';


