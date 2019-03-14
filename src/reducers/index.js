import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import sekhraReducer from './sekhraReducer';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    sekhra: sekhraReducer
});