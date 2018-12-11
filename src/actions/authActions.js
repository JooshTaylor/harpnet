import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ERRORS,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  CLEAR_ERRORS,
  AUTHENTICATE_USER,
  CLEAR_PROFILE,
  CLEAR_FOLLOWS,
  CLEAR_POSTS
} from "./constants";
import axios from "axios";

export const registerUser = (user, history) => dispatch => {
  dispatch({
    type: REGISTER_PENDING
  });

  axios
    .post("http://localhost:5000/api/v1/auth/register", user)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS
      });

      dispatch({
        type: CLEAR_ERRORS
      });

      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      });

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (data, history) => dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });

  axios
    .post("http://localhost:5000/api/v1/auth/login", data)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS
      });

      //Store our token in session storage in the user's browser
      window.localStorage.setItem("token", res.data.token);

      dispatch({
        type: SET_USER,
        payload: res
      });

      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const authenticateUser = data => {
  return {
    type: AUTHENTICATE_USER,
    payload: data
  };
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: SET_USER,
    payload: {}
  });

  dispatch({
    type: CLEAR_PROFILE
  });

  dispatch({
    type: CLEAR_FOLLOWS
  });

  dispatch({
    type: CLEAR_POSTS
  });
};
