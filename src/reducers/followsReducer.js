import { FOLLOWS_LOADING, SET_FOLLOWS, CLEAR_FOLLOWS, SET_INDIV_FOLLOWS } from '../actions/constants';

const initialState = {
    following: [],
    followers: [],
    loading: false,
    profile: {}
}

export const followsReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case FOLLOWS_LOADING:
            return {
                ...state,
                loading: true
            }

        case CLEAR_FOLLOWS:
            return {
                ...state,
                following: [],
                followers: [],
                loading: false,
                profile: {}
            }

        case SET_FOLLOWS:
            return {
                ...state,
                following: action.payload.following,
                followers: action.payload.followers,
                loading: false
            }

        case SET_INDIV_FOLLOWS:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }
    }
}