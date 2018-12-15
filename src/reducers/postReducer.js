import {
  GET_POSTS,
  CLEAR_POSTS,
  GET_COMMENTS,
  FEED_RELOAD_TRUE,
  ADD_EXTRA_POSTS,
  ADD_EXTRA_COMMENTS,
  FEED_LOADING,
  SET_INDIV_POSTS
} from "../actions/constants";

const initialState = {
  posts: [],
  comments: [],
  reload: false,
  morePosts: false,
  deleteState: false,
  loading: true,
  reduxLoaded: false,
  profile: []
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case FEED_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        morePosts: action.payload.morePosts,
        reload: false,
        loading: false,
        reduxLoaded: true
      };

    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        comments: [],
        reload: false,
        morePosts: false,
        loading: false,
        reduxLoaded: true
      };

    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        reload: false,
        loading: false,
        reduxLoaded: true
      };

    case FEED_RELOAD_TRUE:
      return {
        ...state,
        reload: true,
        loading: false,
        reduxLoaded: true
      };

    case ADD_EXTRA_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        morePosts: action.payload.morePosts,
        reload: false,
        reduxLoaded: true
      };

    case ADD_EXTRA_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
        reload: false,
        reduxLoaded: true
      };

    case SET_INDIV_POSTS:
      return {
        ...state,
        reload: false,
        reduxLoaded: true,
        profile: action.payload
      };
  }
};
