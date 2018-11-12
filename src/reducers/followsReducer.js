import { SUGGEST_FOLLOWERS } from '../actions/constants';

const initialState = {
    following: [],
    followers: [],
    followPrompt: []
}

export const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        case SUGGEST_FOLLOWERS:
            return {
                ...state,
                followPrompt: action.payload
            }
    }
}