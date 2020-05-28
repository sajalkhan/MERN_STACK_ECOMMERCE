import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_PRODUCTS_ERROR } from '../Action/type'

const initialState = {
    cartItems: []
}
const cartReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ADD_ITEM:
            {
                const item = payload;
                const product = state.cartItems.find(x => x.id === item.id);
                if (product) {
                    return {
                        cartItems:
                            state.cartItems.map(x => x.id === product.id ? item : x)
                    };
                }
                return {
                    cartItems: [...state.cartItems, item]
                };
            }
        case CART_REMOVE_ITEM:
            return {
                cartItems: state.cartItems.filter(x => x.id !== payload)
            }
        case CART_PRODUCTS_ERROR:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default cartReducer;