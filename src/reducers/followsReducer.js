import { SUGGEST_FOLLOWERS, SET_FOLLOWS, CLEAR_FOLLOWS } from '../actions/constants';

const initialState = {
    following: [],
    followers: []
}

export const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case CLEAR_FOLLOWS:
            return {
                ...state,
                following: [],
                followers: []
            }

        case SET_FOLLOWS:
            return {
                ...state,
                following: action.payload.following,
                followers: action.payload.followers
            }
    }
}