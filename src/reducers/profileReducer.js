import { GET_PROFILE } from '../actions/constants';

const initialState = {
    profile: {}
}

export const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
        
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload.data.user[1]
            }
    }
}