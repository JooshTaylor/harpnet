import {
  SET_PROFILE,
  GET_ERRORS,
  SET_VIEW_PROFILE,
  PROFILE_LOADING,
  CLEAR_VIEW_PROFILE
} from "./constants";
import axios from "axios";

export const getProfile = (id, token) => dispatch => {
  axios
    .get(`http://localhost:5000/api/profile/get/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(profile =>
      dispatch({
        type: SET_PROFILE,
        payload: profile.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getProfileById = (id, token) => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });

  axios
    .get(`http://localhost:5000/api/profile/get/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(profile =>
      dispatch({
        type: SET_VIEW_PROFILE,
        payload: profile.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearViewProfile = () => {
  return {
    type: CLEAR_VIEW_PROFILE
  };
};
