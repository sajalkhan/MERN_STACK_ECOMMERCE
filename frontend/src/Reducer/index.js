import { combineReducers } from 'redux';
import loginRegisterState from './loginRegisterReducer';
import AllproductListReducer from './All_Product_List_Reducer';
import ProductDetailsReducer from './Product_Details_Reducer';
import CreateproductReducer from './Create_Product_Reducer';
import CartReducer from './cartReducer';
import alertState from './alertReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from './OrderReducer';

export default combineReducers({
    loginRegisterState,
    AllproductListReducer,
    ProductDetailsReducer,
    CreateproductReducer,
    CartReducer,
    alertState,
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    myOrderListReducer, 
    orderListReducer, 
    orderDeleteReducer
});