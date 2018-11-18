import { SET_PROFILE, CLEAR_PROFILE, SET_VIEW_PROFILE, PROFILE_LOADING, CLEAR_VIEW_PROFILE } from '../actions/constants';

const initialState = {
    profile: {},
    viewProfile: {},
    loading: true
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: {},
                viewProfile: {},
                loading: false
            }

        case CLEAR_VIEW_PROFILE:
            return {
                ...state,
                loading: false,
                viewProfile: {}
            }

        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }

        case SET_VIEW_PROFILE:
            return {
                ...state,
                viewProfile: action.payload,
                loading: false
            }

        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
    }
}