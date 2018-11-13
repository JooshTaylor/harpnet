import { SET_POSTS, CLEAR_POSTS, GET_COMMENTS } from '../actions/constants';

const initialState = {
    posts: [],
    comments: []
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }

        case CLEAR_POSTS:
            return {
                ...state,
                posts: []
            }

        // case GET_COMMENTS:
        //     return {
        //         ...state,
        //         comments: action.payload
        //     }
    }
}