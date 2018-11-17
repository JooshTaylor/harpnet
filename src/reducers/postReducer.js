import { GET_POSTS, CLEAR_POSTS, GET_COMMENTS, FEED_RELOAD_TRUE, DELETE_DECLINE, ADD_EXTRA_POSTS, ADD_EXTRA_COMMENTS } from '../actions/constants';

const initialState = {
    posts: [],
    comments: [],
    reload: false,
    morePosts: false,
    deleteState: false
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
                morePosts: action.payload.morePosts,
                reload: false
            }

        case CLEAR_POSTS:
            return {
                ...state,
                posts: [],
                comments: [],
                reload: false,
                morePosts: false
            }

        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                reload: false
            }

        case FEED_RELOAD_TRUE:
            return {
                ...state,
                reload: true
            }

        case ADD_EXTRA_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts],
                morePosts: action.payload.morePosts,
                reload: false
            }

        case ADD_EXTRA_COMMENTS:
            return {
                ...state,
                comments: [...state.comments, ...action.payload],
                reload: false
            }
    }
}