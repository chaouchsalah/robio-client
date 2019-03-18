import { 
    SIGN_IN,
    SIGN_OUT,
    ADD_TOKEN
} from './types';
import axios from 'axios';
import history from '../history';

export const signIn = (user) => async dispatch =>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth`,user);
        const { token } = response.data;
        sessionStorage.setItem('token', token);
        if(response.status === 200) {
            if(user.userType === 'coursier') {
                history.push('/coursier/profile');
            }else if(user.userType === 'customer') {
                history.push('/customer/profile');
            }
        }
        dispatch({
            type: SIGN_IN,
            payload: token
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

export const addToken = token => {
    return {
        type: ADD_TOKEN,
        payload: token
    }
}