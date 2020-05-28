import { SAVE_PRODUCT, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, SAVE_PRODUCT_ERROR } from '../Action/type'

const initialState = {
    product: [],
    loading: false,
    error: {}
}

const CreateproductReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SAVE_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: true
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                product: payload,
                loading: false
            }
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false,
                error: payload
            }
        case SAVE_PRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default CreateproductReducer;