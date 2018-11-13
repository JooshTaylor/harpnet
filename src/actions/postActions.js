import { SET_POSTS } from './constants';

import axios from 'axios';

export const getFeed = (data, token) => dispatch => {
  axios.post('http://localhost:5000/api/posts/get/', data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      })
    })
}

export const makePost = (data, token) => dispatch => {
  axios.post('http://localhost:5000/api/posts/new', data, {
    headers: {
      "Authorization": token
    }
  })
    .then(() => {
      window.location.reload();
    });
}