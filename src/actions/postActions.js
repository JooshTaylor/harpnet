import { SET_POSTS, GET_COMMENTS } from './constants';

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

export const makeComment = (data, token) => dispatch => { //NOT SET UP
  axios.post(`http://localhost:5000/api/posts/${data.post_id}/comment`, data, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      console.log(res);
    })
}