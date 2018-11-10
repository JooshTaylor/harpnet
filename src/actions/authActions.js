import { REGISTER_PENDING, REGISTER_SUCCESS, GET_ERRORS, LOGIN_PENDING, SET_USER } from "./constants";
import axios from 'axios';

export const registerUser = (user, history) => dispatch => {
  dispatch({
    type: REGISTER_PENDING
  });

  axios.post('/api/auth/register', user)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS
      })
      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}

export const loginUser = (data) => dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });

  axios.post('/api/auth/login', data)
    .then(userData => {

      //store token in redis db

      dispatch({
        type: SET_USER,
        payload: userData
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}