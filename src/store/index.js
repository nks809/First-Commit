import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'

import allReducers from './reducers/index'

const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : null) || compose;

const middlewares = reduxThunk;

const Store = createStore(allReducers, composeEnhancers(
	applyMiddleware(middlewares)
))

export default Store;