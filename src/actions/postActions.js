import {
  GET_POSTS,
  GET_COMMENTS,
  RELOAD_FEED,
  GET_ERRORS,
  CLEAR_ERRORS,
  FEED_LOADING,
  SET_SINGLE_POST,
  RELOAD_VIEW_PROFILE,
  RESET_SINGLE_POST
} from "./constants";

import axios from "axios";
import jwt_decode from "jwt-decode";

export const getFeed = (data, iteration, token) => dispatch => {
  dispatch({
    type: FEED_LOADING
  });
  axios
    .post(`http://localhost:5000/api/posts/get/${iteration}`, data, {
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
  const user_id = jwt_decode(token);
  axios
    .get(`http://localhost:5000/api/posts/post/${id}`, {
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
    .post("http://localhost:5000/api/posts/post", data, {
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

export const makeComment = (data, token) => dispatch => {
  axios
    .post(`http://localhost:5000/api/posts/comment`, data, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: RELOAD_FEED
      });
    });
};

export const deletePost = (id, token, location) => dispatch => {
  axios
    .delete(`http://localhost:5000/api/posts/post/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      console.log(location);
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

export const deleteComment = (id, token) => dispatch => {
  axios
    .delete(`http://localhost:5000/api/posts/comment/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: RELOAD_FEED
      });
    });
};
