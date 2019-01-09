import {
  FOLLOWS_LOADING,
  SET_FOLLOWS,
  CLEAR_FOLLOWS,
  SET_FOLLOW_SUGGESTIONS,
  RELOAD_FOLLOW_SUGGESTIONS
} from "../actions/constants";

const initialState = {
  following: [],
  followers: [],
  suggestions: [],
  reloadSuggestions: false,
  loading: true,
  reduxLoaded: false
};

export const followsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case FOLLOWS_LOADING:
      return {
        ...state,
        loading: true,
        reduxLoaded: true
      };

    case CLEAR_FOLLOWS:
      return {
        ...state,
        following: [],
        followers: [],
        loading: false
      };

    case SET_FOLLOWS:
      return {
        ...state,
        following: action.payload.following,
        followers: action.payload.followers,
        loading: false
      };

    case SET_FOLLOW_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload,
        reloadSuggestions: false,
        loading: false
      };

    case RELOAD_FOLLOW_SUGGESTIONS:
      return {
        ...state,
        reloadSuggestions: true,
        loading: false
      };
  }
};
