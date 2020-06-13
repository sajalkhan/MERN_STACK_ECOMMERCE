import setAuthToken from '../Util/setAuthToken';
import { setAlert } from './alertAction';
import Cookie from 'js-cookie';
import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCCESS,
    LOGIN_FALI,
    LOGOUT,
    UPDATE_PROFILE,
    UPDATE_PROFILE_ERROR } from './type';


// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Login user
export const loginAction = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/users/login', body, config);
        dispatch({
            type: LOGIN_SUCCCESS,
            payload: res.data
        });
        Cookie.set('user', JSON.stringify(res.data));
        dispatch(loadUser());

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FALI
        })
    }
}

// Register user
export const registerAction = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        Cookie.set('user', JSON.stringify(res.data));
        dispatch(setAlert('Register Successfull','success'));
        dispatch(loadUser());

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const updateUserProfile = ({ name, email, password }) => async (dispatch, getState) => {
    const { loginRegisterState: { user } } = getState();
    const config = {
        headers: {
            Authorization: ' Bearer ' + user.token
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.put('/api/users/updateProfile', body, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        Cookie.set('user', JSON.stringify(res.data));
        dispatch(setAlert('Profile Update Successfull', 'success'));
        dispatch(loadUser());

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: UPDATE_PROFILE_ERROR
        })
    }
}

// Logout User
export const logOut = () => dispatch => {
    dispatch({ type: LOGOUT });
}