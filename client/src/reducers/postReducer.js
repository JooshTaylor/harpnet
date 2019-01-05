import {
  GET_POSTS,
  CLEAR_POSTS,
  GET_COMMENTS,
  RELOAD_FEED,
  FEED_LOADING,
  SET_SINGLE_POST,
  RESET_SINGLE_POST,
  RELOAD_SINGLE_POST,
  END_RELOAD_SINGLE_POST
} from "../actions/constants";

const initialState = {
  posts: [],
  comments: [],
  morePosts: false,
  deleteState: false,
  loading: true,
  reduxLoaded: false,
  reload: false,
  single: {},
  singleReload: false,
  profile: []
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case FEED_LOADING:
      return {
        ...state,
        loading: true,
        reload: false
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

    case RELOAD_FEED:
      return {
        ...state,
        reload: true,
        loading: false,
        reduxLoaded: true
      };

    case SET_SINGLE_POST:
      return {
        ...state,
        reload: false,
        reduxLoaded: true,
        single: action.payload
      };

    case RESET_SINGLE_POST:
      return {
        ...state,
        single: {}
      };

    case RELOAD_SINGLE_POST:
      return {
        ...state,
        singleReload: true
      };

    case END_RELOAD_SINGLE_POST:
      return {
        ...state,
        singleReload: false
      };
  }
};
