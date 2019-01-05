import {
  GET_POSTS,
  GET_COMMENTS,
  RELOAD_FEED,
  GET_ERRORS,
  CLEAR_ERRORS,
  FEED_LOADING,
  SET_SINGLE_POST,
  RELOAD_SINGLE_POST,
  RELOAD_VIEW_PROFILE,
  RESET_SINGLE_POST,
  END_RELOAD_SINGLE_POST
} from "./constants";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const getFeed = (data, iteration, token) => dispatch => {
  dispatch({
    type: FEED_LOADING
  });
  axios
    .post(`/api/posts/get/${iteration}`, data, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });

      dispatch({
        type: GET_COMMENTS,
        payload: res.data.comments
      });
    });
};

export const getPostById = (id, token) => dispatch => {
  dispatch({
    type: END_RELOAD_SINGLE_POST
  });
  const user_id = jwt_decode(token);
  axios
    .get(`/api/posts/post/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(post => {
      post.data.user_id = user_id;
      dispatch({
        type: SET_SINGLE_POST,
        payload: post.data
      });
    });
};

export const resetSinglePost = () => {
  return {
    type: RESET_SINGLE_POST
  };
};

export const makePost = (data, token) => dispatch => {
  axios
    .post(`/api/posts/post`, data, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: RELOAD_FEED
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const makeComment = (data, token, single = false) => dispatch => {
  axios
    .post(`/api/posts/comment`, data, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      if (single) {
        dispatch({
          type: RELOAD_SINGLE_POST
        });
      } else {
        dispatch({
          type: RELOAD_FEED
        });
      }
    });
};

export const deletePost = (id, token, location) => dispatch => {
  axios
    .delete(`/api/posts/post/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      switch (location) {
        default:
          return null;
        case "feed":
          dispatch({
            type: RELOAD_FEED
          });
          break;
        case "profile":
          dispatch({
            type: RELOAD_VIEW_PROFILE
          });
      }
    });
};

export const deleteComment = (id, token, single = false) => dispatch => {
  axios
    .delete(`/api/posts/comment/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      if (single) {
        dispatch({
          type: RELOAD_SINGLE_POST
        });
      } else {
        dispatch({
          type: RELOAD_FEED
        });
      }
    });
};
