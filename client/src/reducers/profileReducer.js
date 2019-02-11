import {
  SET_PROFILE,
  CLEAR_PROFILE,
  SET_VIEW_PROFILE,
  PROFILE_LOADING,
  CLEAR_VIEW_PROFILE,
  RELOAD_PROFILE,
  RESET_PROFILE_RELOAD,
  RELOAD_VIEW_PROFILE,
  END_VIEW_PROFILE_RELOAD
} from '../actions/constants'

const initialState = {
  profile: {},
  viewProfile: {},
  loading: false,
  reload: false,
  viewReload: false
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {},
        viewProfile: {},
        loading: false,
        reload: false,
        viewReload: false
      }

    case CLEAR_VIEW_PROFILE:
      return {
        ...state,
        loading: false,
        viewProfile: {},
        reload: false,
        viewReload: false
      }

    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        reload: false,
        viewReload: false
      }

    case SET_VIEW_PROFILE:
      return {
        ...state,
        viewProfile: action.payload,
        loading: false,
        reload: false,
        viewReload: false
      }

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        reload: false,
        viewReload: false
      }

    case RELOAD_PROFILE:
      return {
        ...state,
        reload: true,
        viewReload: false
      }

    case RESET_PROFILE_RELOAD:
      return {
        ...state,
        reload: false,
        viewReload: false
      }

    case RELOAD_VIEW_PROFILE:
      return {
        ...state,
        viewReload: true
      }

    case END_VIEW_PROFILE_RELOAD:
      return {
        ...state,
        viewReload: false
      }
  }
}
