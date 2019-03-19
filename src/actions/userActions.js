import {
    FETCH_CUSTOMER,
    FETCH_COURSIER,
    FETCH_USER,
    UPDATE_CUSTOMER
} from './types';
import axios from 'axios';

export const fetchCustomer = id => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/customers/${id}`);
        dispatch({ type: FETCH_CUSTOMER, payload: response.data.customer });
    }catch(error) {
        throw error;
    }
};

export const fetchCoursier = id => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/coursiers/${id}`);
        dispatch({ type: FETCH_COURSIER, payload: response.data.coursier });
    }catch(error) {
        throw error;
    }
    
};

export const updateCustomer = id => async dispatch => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/customers/${id}`);
        dispatch({ type: UPDATE_CUSTOMER, payload: response.data.customer });
    }catch(error) {
        throw error;
    }
};

export const fetchUser = token => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/currentUser`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: FETCH_USER, payload: response.data });
    }catch(error) {
        throw error;
    }
}