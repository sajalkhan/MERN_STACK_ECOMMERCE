import axios from 'axios'
import Cookie from 'js-cookie'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_PRODUCTS_ERROR} from './type'

export const addToCart = (productId, quentity) => async (dispatch, getState)=> {
    try {
        const res = await axios.get(`/api/products/${productId}`);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {...res.data, quentity}
        });

        const { CartReducer: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {
        dispatch({
            type: CART_PRODUCTS_ERROR,
            payload: error.message
        });
    }
}

export const removeFromCart = (productId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: productId
        });

        const { CartReducer: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {
        dispatch({
            type: CART_PRODUCTS_ERROR,
            payload: 'No Item Found'
        });
    }
}