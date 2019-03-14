import { ADD_SEKHRA, REMOVE_SEKHRA } from '../actions/types';

const INITIAL_STATE = {
    sekhra: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_SEKHRA:
            return { ...state, sekhra: action.payload };
        case REMOVE_SEKHRA:
            return { ...state, sekhra: null };
        default:
            return state;
    }
}