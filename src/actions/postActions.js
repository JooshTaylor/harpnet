import { GET_POSTS, GET_COMMENTS, FEED_RELOAD_TRUE, SET_INDIV_POSTS, GET_ERRORS, CLEAR_ERRORS } from './constants';

import axios from 'axios';

export const getFeed = (data, iteration, token) => dispatch => {
  axios.post(`https://lit-citadel-92787.herokuapp.com/api/posts/get/${iteration}`, data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })

      dispatch({
        type: GET_COMMENTS,
        payload: res.data.comments
      })
    })
}

export const getPostsByUser = (id, token) => dispatch => {
  axios.get(`https://lit-citadel-92787.herokuapp.com/api/posts/${id}`, {
    headers: {
      "Authorization": token
    }
  })
    .then(posts => {
      dispatch({
        type: SET_INDIV_POSTS,
        payload: posts.data
      })
    })
}

export const makePost = (data, token) => dispatch => {
  axios.post('https://lit-citadel-92787.herokuapp.com/api/posts', data, {
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
  axios.post(`https://lit-citadel-92787.herokuapp.com/api/posts/comment`, data, {
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
  axios.delete(`https://lit-citadel-92787.herokuapp.com/api/posts/${id}`, {
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
  axios.delete(`https://lit-citadel-92787.herokuapp.com/api/posts/comment/${id}`, {
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