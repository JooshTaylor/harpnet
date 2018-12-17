import {
  SET_PROFILE,
  GET_ERRORS,
  SET_VIEW_PROFILE,
  PROFILE_LOADING,
  CLEAR_VIEW_PROFILE,
  RELOAD_PROFILE,
  RESET_PROFILE_RELOAD,
  END_VIEW_PROFILE_RELOAD
} from "./constants";
import axios from "axios";

export const getProfile = (id, token) => dispatch => {
  dispatch({
    type: RESET_PROFILE_RELOAD
  });

  axios
    .get(`http://localhost:5000/api/profile/${id}`, {
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

export const getViewProfile = (id, token) => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });

  dispatch({
    type: END_VIEW_PROFILE_RELOAD
  });

  axios
    .get(`http://localhost:5000/api/profile/view/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(profile =>
      dispatch({
        type: SET_VIEW_PROFILE,
        payload: profile.data
      })
    );
};

export const clearViewProfile = () => {
  return {
    type: CLEAR_VIEW_PROFILE
  };
};

export const changePrivacy = (state, id, token) => dispatch => {
  axios
    .put(`http://localhost:5000/api/profile/privacy/${id}`, state, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: RELOAD_PROFILE
      });
    });
};

export const updateBio = (bio, id, token) => dispatch => {
  axios
    .put(`http://localhost:5000/api/profile/biography/${id}`, bio, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: RELOAD_PROFILE
      });
    });
};

export const updateFirstName = (fname, id, token) => dispatch => {
  axios
    .put(`http://localhost:5000/api/profile/first_name/${id}`, fname, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: RELOAD_PROFILE
      });
    });
};

export const updateLastName = (lname, id, token) => dispatch => {
  axios
    .put(`http://localhost:5000/api/profile/last_name/${id}`, lname, {
      headers: {
        Authorization: token
      }
    })
    .then(() => {
      dispatch({
        type: RELOAD_PROFILE
      });
    });
};
