import { REGISTER_PENDING, REGISTER_SUCCESS, LOGIN_PENDING, SET_USER } from "../actions/constants";

const initialState = {
  loading: false,
  user: {},
  profile: {},
  isLoggedIn: false
}

const authReducer = (state = initialState, action) => {
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
      }

    // Runs when a user submits a login form
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true
      }

    // Runs when a user successfully logs in
    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload[0],
        profile: action.payload[1],
        isLoggedIn: true
      }
  }
}