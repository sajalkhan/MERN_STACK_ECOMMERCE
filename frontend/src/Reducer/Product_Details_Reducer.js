import { GET_PRODUCTS_ERROR, GET_PRODUCT_DETAILS } from '../Action/type'

const initialState = {
    product: {},
    loading: false,
    error: {}
}

const productDetailsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCT_DETAILS:
            return{
                ...state,
                product: payload,
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

export default productDetailsReducer;