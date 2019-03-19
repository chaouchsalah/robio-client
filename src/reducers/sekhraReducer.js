import { FETCH_SEKHRA, REMOVE_SEKHRA, FETCH_SEKHRAS } from '../actions/types';

const INITIAL_STATE = {
    sekhras: [],
    sekhra: {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_SEKHRA:
            return { ...state, sekhra: action.payload };
        case FETCH_SEKHRAS:
            return { ...state, sekhras: action.payload };
        case REMOVE_SEKHRA:
            return { ...state, sekhra: null };
        default:
            return state;
    }
}