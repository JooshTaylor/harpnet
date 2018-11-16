import { SEARCH_LOADING, SEARCH_COMPLETE, RESET_SEARCH } from './constants';
import axios from 'axios';

export const searchUsers = (params, token, history = null) => dispatch => {
  dispatch({
    type: SEARCH_LOADING,
    payload: params
  })
  if (history) {
    history.push('/search');
  }

  axios.get(`http://localhost:5000/api/search/${params}`, {
    headers: {
      "Authorization": token
    }
  })
    .then(res => {
      dispatch({
        type: SEARCH_COMPLETE,
        payload: res.data
      })
    })

}

export const resetSearch = () => {
  return {
    type: RESET_SEARCH
  }
}