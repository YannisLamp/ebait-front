import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducers } from './ducks';

const loggerMiddleware = createLogger(); // initialize logger

const rootReducer = combineReducers(reducers);

const store = createStore(
  rootReducer,
  applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
  )
);

export default store;