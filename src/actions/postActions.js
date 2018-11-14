import { GET_POSTS, GET_COMMENTS, RELOAD_TRUE } from './constants';

import axios from 'axios';

export const getFeed = (data, token, test = 0) => dispatch => {
  axios.post('http://localhost:5000/api/posts/get/', data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      if (test === 1) {
        console.log('hi');
      }

      dispatch({
        type: GET_POSTS,
        payload: res.data.posts
      })

      dispatch({
        type: GET_COMMENTS,
        payload: res.data.comments
      })
    })
}

export const makePost = (data, token, reloadData) => dispatch => {
  axios.post('http://localhost:5000/api/posts/new', data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: RELOAD_TRUE
      })
    });
}

export const makeComment = (data, token, reloadData) => dispatch => {
  axios.post(`http://localhost:5000/api/posts/comment`, data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: RELOAD_TRUE
      })
    });
}