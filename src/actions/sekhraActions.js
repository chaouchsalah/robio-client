import {
    FETCH_SEKHRA,
    FETCH_SEKHRAS,
    REMOVE_SEKHRA
} from './types';
import axios from 'axios';

export const removeSekhra = () => {
    return {
        type: REMOVE_SEKHRA
    }
};

export const fetchSekhras = token => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/sekhras`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: FETCH_SEKHRAS, payload: response.data.sekhras });
    } catch (error) {
        throw error;
    }
}

export const fetchSekhra = (token, sekhraId) => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/sekhras/${sekhraId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: FETCH_SEKHRA, payload: response.data.sekhra });
    } catch (error) {
        throw error;
    }
}