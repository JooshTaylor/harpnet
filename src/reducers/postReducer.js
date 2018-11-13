import { SET_POSTS, CLEAR_POSTS } from '../actions/constants';

const initialState = {
    posts: []
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
    }
}