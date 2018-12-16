import {
  GET_POSTS,
  GET_COMMENTS,
  FEED_RELOAD_TRUE,
  GET_ERRORS,
  CLEAR_ERRORS,
  FEED_LOADING,
  SET_INDIV_POSTS,
  SET_SINGLE_POST,
  RELOAD_VIEW_PROFILE
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

export const getPostsByUser = (id, token) => dispatch => {
  axios
    .get(`http://localhost:5000/api/posts/user/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(posts => {
      dispatch({
        type: SET_INDIV_POSTS,
        payload: posts.data
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

export const makePost = (data, token) => dispatch => {
  axios
    .post("http://localhost:5000/api/posts/new", data, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: FEED_RELOAD_TRUE
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
        type: FEED_RELOAD_TRUE
      });
    });
};

export const deletePost = (id, token, location) => dispatch => {
  axios
    .delete(`http://localhost:5000/api/posts/${id}`, {
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
            type: FEED_RELOAD_TRUE
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
        type: FEED_RELOAD_TRUE
      });
    });
};
