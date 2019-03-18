import { FETCH_CUSTOMER, FETCH_COURSIER, FETCH_USER, UPDATE_CUSTOMER } from '../actions/types';

const INITIAL_STATE = {
    user: {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_CUSTOMER:
        case FETCH_COURSIER :
        case FETCH_USER :
        case UPDATE_CUSTOMER :
            return { ...state, user: action.payload.user }
        default:
            return state;
    }
};