import { SUGGEST_FOLLOWERS, SET_FOLLOWS, CLEAR_FOLLOWS, FOLLOW_USER } from '../actions/constants';

const initialState = {
    following: [],
    followers: [],
    followPrompt: []
}

export const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case CLEAR_FOLLOWS:
            return {
                ...state,
                followPrompt: [],
                following: [],
                followers: []
            }

        case SUGGEST_FOLLOWERS:
            return {
                ...state,
                followPrompt: action.payload
            }

        case SET_FOLLOWS:
            return {
                ...state,
                followPrompt: [],
                following: action.payload.following,
                followers: action.payload.followers
            }
    }
}