import { GET_ERRORS, CLEAR_ERRORS } from '../actions/constants';

const initialState = {}

export const errorReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
        case GET_ERRORS:
            return {
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {}
    }
}