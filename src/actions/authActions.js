import { REGISTER_PENDING, REGISTER_SUCCESS, REGISTER_FAIL, GET_ERRORS, LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAIL, SET_USER, CLEAR_ERRORS } from "./constants";
import axios from 'axios';

export const registerUser = (user, history) => dispatch => {
  dispatch({
    type: REGISTER_PENDING
  });

  axios.post('http://localhost:5000/api/auth/register', user)
    .then(res => {

      dispatch({
        type: REGISTER_SUCCESS
      })

      dispatch({
        type: CLEAR_ERRORS
      })

      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      })

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}

export const loginUser = (data, history) => dispatch => {
  dispatch({
    type: LOGIN_PENDING
  });

  axios.post('http://localhost:5000/api/auth/login', data)
    .then(res => {

      //store token in redis db
      dispatch({
        type: LOGIN_SUCCESS
      })

      dispatch({
        type: SET_USER,
        payload: res
      })

      history.push('/');
    })
    // .catch(err => {
    //   console.log(err);

    //   dispatch({
    //     type: LOGIN_FAIL
    //   })

    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data
    //   })
    // })
}