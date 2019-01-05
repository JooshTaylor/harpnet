import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  AUTHENTICATE_USER
} from "../actions/constants";

const initialState = {
  loading: false,
  user: -1,
  isLoggedIn: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    // Runs when a user submits a register form
    case REGISTER_PENDING:
      return {
        ...state,
        loading: true
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false
      };

    // Runs when a user submits a login form
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false
      };

    // Runs when a user successfully logs in
    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload.user ? action.payload.user : -1,
        isLoggedIn: action.payload.user ? true : false
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.payload.user_id,
        isLoggedIn: true
      };
  }
};
