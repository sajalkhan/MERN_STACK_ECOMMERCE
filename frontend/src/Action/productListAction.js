import axios from 'axios'
import { GET_PRODUCTS, GET_PRODUCTS_ERROR, GET_PRODUCT_DETAILS, SAVE_PRODUCT, SAVE_PRODUCT_ERROR, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS } from './type'

// Get All Products
export const getAllproducts = () => async dispatch => {

    try {
        const res = await axios.get('/api/products');
        //console.log('get data -- ', res.data);
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_ERROR,
            payload: error.message
        });
    }
}

// Get product by ID
export const getProductDetails = (productId) => async dispatch => {

    try {
        const res = await axios.get(`/api/products/${productId}`);
        dispatch({
            type: GET_PRODUCT_DETAILS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_ERROR,
            payload: error.message
        });
    }
}

// Create or update product
export const saveProduct = (data) => async dispatch => {

    try {
        let res = null;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('brand', data.brand);
        formData.append('category', data.category);
        formData.append('inStock', data.inStock);
        formData.append('description', data.description);
        formData.append('image', data.image.name);
        formData.append('image', data.image, data.image.name);
        
        if (!data.id) res = await axios.post('/api/products', formData);
        else res = await axios.put(`api/products/${data.id}`, formData);

        dispatch({
            type: SAVE_PRODUCT,
            payload: res.data
        });

        // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        // if (!edit) {
        //     history.push('/dashboard');
        // }

    } catch (error) {

        // const errors = error.response.data.errors;
        // if (errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }

        dispatch({
            type: SAVE_PRODUCT_ERROR,
            payload: { msg: 'no data found' }
        });
    }
}

//Delete product
export const deleteProdcut = (productId) => async (dispatch) => {
    try {

        const res = await axios.delete(`/api/products/${productId}`);
        
        dispatch({ 
            type: PRODUCT_DELETE_SUCCESS, 
            payload: res.data
        });

    } catch (error) {

        dispatch({ 
            type: PRODUCT_DELETE_FAIL, 
            payload: error.message
        });

    }
}