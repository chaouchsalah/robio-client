import {
    SIGN_IN,
    SIGN_OUT,
    FETCH_USER,
    UPDATE_USER
} from './types';
import axios from 'axios';
import Customer from '../api/customer';

export const signIn = () => async dispatch => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth`
        );
        const { user } = response.data;
        dispatch({
            type: SIGN_IN,
            payload: user
        });
    } catch (error) {
        throw error;
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const fetchUser = (id) => async dispatch => {
    const response = await Customer.get(`/${id}`);
    dispatch({ type: FETCH_USER, payload: response.data.customer });
}

export const updateUser = (id) => async dispatch => {
    const response = await Customer.put(`/${id}`);
    dispatch({ type: UPDATE_USER, payload: response.data.customer });
}