import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './Reducer';
import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON("cartItems") || []

const initialState = { CartReducer: { cartItems } };

const middleWare = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
