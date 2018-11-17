import { SET_PROFILE, GET_ERRORS } from './constants';
import axios from 'axios';

export const getProfile = (id, token) => dispatch => {
  axios.get(`https://lit-citadel-92787.herokuapp.com/api/profile/get/${id}`, {
    headers: {
      "Authorization": token
    }
  })
    .then(profile => dispatch({
      type: SET_PROFILE,
      payload: profile.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}