import { combineReducers } from 'redux';
import AllproductListReducer from './All_Product_List_Reducer';
import ProductDetailsReducer from './Product_Details_Reducer';
import CreateproductReducer from './Create_Product_Reducer';
import CartReducer from './cartReducer';

export default combineReducers({
    AllproductListReducer,
    ProductDetailsReducer,
    CreateproductReducer,
    CartReducer
});