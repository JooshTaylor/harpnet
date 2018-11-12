import { SET_PROFILE, GET_ERRORS } from './constants';
import axios from 'axios';

export const getProfile = (id) => dispatch => {
  axios.get(`http://localhost:5000/api/profile/get/${id}`)
    .then(profile => dispatch({
      type: SET_PROFILE,
      payload: profile.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}