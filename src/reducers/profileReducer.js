import {
  SET_PROFILE,
  CLEAR_PROFILE,
  SET_VIEW_PROFILE,
  PROFILE_LOADING,
  CLEAR_VIEW_PROFILE,
  RELOAD_PROFILE,
  END_RELOAD_PROFILE
} from "../actions/constants";

const initialState = {
  profile: {},
  viewProfile: {},
  loading: false,
  reload: false
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {},
        viewProfile: {},
        loading: false,
        reload: false
      };

    case CLEAR_VIEW_PROFILE:
      return {
        ...state,
        loading: false,
        viewProfile: {},
        reload: false
      };

    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        reload: false
      };

    case SET_VIEW_PROFILE:
      return {
        ...state,
        viewProfile: action.payload,
        loading: false,
        reload: false
      };

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        reload: false
      };

    case RELOAD_PROFILE:
      return {
        ...state,
        reload: true
      };

    case END_RELOAD_PROFILE:
      return {
        ...state,
        reload: false
      };
  }
};
