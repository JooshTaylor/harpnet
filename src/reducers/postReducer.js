import { GET_POSTS, CLEAR_POSTS, GET_COMMENTS, RELOAD_TRUE } from '../actions/constants';

const initialState = {
    posts: [],
    comments: [],
    reload: false
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                reload: false
            }

        case CLEAR_POSTS:
            return {
                ...state,
                posts: [],
                comments: [],
                reload: false
            }

        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                reload: false
            }

        case RELOAD_TRUE:
            return {
                ...state,
                reload: true
            }
    }
}