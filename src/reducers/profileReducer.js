import { SET_PROFILE, CLEAR_PROFILE } from "../actions/constants";

const initialState = {
  profile: {}
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {}
      };

    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
  }
};
