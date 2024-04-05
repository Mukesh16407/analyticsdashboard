// Correct import statement for redux-thunk using named import
import { createStore, combineReducers, applyMiddleware,compose} from 'redux';
import {thunk} from "redux-thunk";
import  DashboardReducer  from './Reducer';

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  dashboard: DashboardReducer,

});


const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
