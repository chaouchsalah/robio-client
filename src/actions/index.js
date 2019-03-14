import { 
    SIGN_IN,
    SIGN_OUT,
    FETCH_USER,
    UPDATE_USER,
    FETCH_COURSIER,
    ADD_SEKHRA,
    REMOVE_SEKHRA
} from './types';
import axios from 'axios';

export const signIn = () => async dispatch =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth`)
        dispatch({
            type: SIGN_IN,
            payload: response.data.user
        });
    }catch(error) {
        throw error;
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const fetchUser = id => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/customers/${id}`);
        dispatch({ type: FETCH_USER, payload: response.data.customer });
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

export const updateUser = id => async dispatch => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/customers/${id}`);
        dispatch({ type: UPDATE_USER, payload: response.data.customer });
    }catch(error) {
        throw error;
    }
};

export const addSekhra = sekhra => {
    return {
        type: ADD_SEKHRA,
        payload: sekhra
    }
};

export const removeSekhra = () => {
    return {
        type: REMOVE_SEKHRA
    }
};