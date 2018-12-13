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
  CLEAR_POSTS,
  SET_PROFILE,
  SET_FOLLOWS
} from "./constants";
import axios from "axios";
import { navigate } from "@reach/router";

export const registerUser = user => dispatch => {
  dispatch({
    type: REGISTER_PENDING
  });

  axios
    .post("http://localhost:5000/api/auth/register", user)
    .then(() => {
      dispatch({
        type: REGISTER_SUCCESS
      });

      dispatch({
        type: CLEAR_ERRORS
      });

      navigate("/login");
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

export const loginUser = data => dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });

  axios
    .post("http://localhost:5000/api/auth/login", data)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS
      });

      //Store our token in session storage in the user's browser
      window.localStorage.setItem("token", res.data.session.token);

      // Set users sets the auth, profile and follows data in the redux store.
      dispatch({
        type: SET_USER,
        payload: res.data.auth
      });

      dispatch({
        type: SET_PROFILE,
        payload: res.data.profile
      });

      dispatch({
        type: SET_FOLLOWS,
        payload: res.data.follows
      });

      navigate("/feed");
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL
      });

      if (err.response === undefined) {
        navigate("/feed");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
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
