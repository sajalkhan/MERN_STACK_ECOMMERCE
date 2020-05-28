import { GET_PRODUCTS, GET_PRODUCTS_ERROR } from '../Action/type'

const initialState = {
    products: [],
    loading: false,
    error: {}
}

const productListReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: true
            }
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default productListReducer;