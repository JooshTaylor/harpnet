import { GET_POSTS, GET_COMMENTS, FEED_RELOAD_TRUE, DELETE_DECLINE, GET_ERRORS, CLEAR_ERRORS, ADD_EXTRA_POSTS, ADD_EXTRA_COMMENTS } from './constants';

import axios from 'axios';

export const getFeed = (data, iteration, token) => dispatch => {
  axios.post(`http://localhost:5000/api/posts/get/${iteration}`, data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      if (iteration === 1) {
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })

        dispatch({
          type: GET_COMMENTS,
          payload: res.data.comments
        })
      }

      else if (iteration > 1) {
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })

        dispatch({
          type: GET_COMMENTS,
          payload: res.data.comments
        })
      }
    })
}

export const makePost = (data, token) => dispatch => {
  axios.post('http://localhost:5000/api/posts/new', data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: FEED_RELOAD_TRUE
      })
      dispatch({
        type: CLEAR_ERRORS
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const makeComment = (data, token) => dispatch => {
  axios.post(`http://localhost:5000/api/posts/comment`, data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: FEED_RELOAD_TRUE
      })
    });
}

export const deletePost = (id, token) => dispatch => {
  axios.delete(`http://localhost:5000/api/posts/${id}`, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: FEED_RELOAD_TRUE
      })
    })
}

export const deleteComment = (id, token) => dispatch => {
  axios.delete(`http://localhost:5000/api/posts/comment/${id}`, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: FEED_RELOAD_TRUE
      })
    })
}