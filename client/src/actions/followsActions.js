import {
  SET_FOLLOWS,
  RELOAD_SEARCH,
  FOLLOWS_LOADING,
  RELOAD_PROFILE,
  RESET_PROFILE_RELOAD,
  SET_FOLLOW_SUGGESTIONS,
  RELOAD_FOLLOW_SUGGESTIONS,
  RELOAD_FEED
} from './constants'
import axios from 'axios'

export const getFollowData = (id, token, location) => dispatch => {
  if (location !== 'suggestions') {
    dispatch({
      type: FOLLOWS_LOADING
    })
  }

  dispatch({
    type: RESET_PROFILE_RELOAD
  })

  axios
    .get(`/api/follows/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: SET_FOLLOWS,
        payload: res.data
      })
    })
}

export const followUser = (
  follower_id,
  following_id,
  token,
  location
) => dispatch => {
  axios
    .post(`/api/follows/${following_id}`, follower_id, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      switch (location) {
        default:
          return null
        case 'search':
          dispatch({
            type: RELOAD_SEARCH
          })
          break

        //case for profiles
        case 'profile':
          dispatch({
            type: RELOAD_PROFILE
          })
          break

        case 'feed':
          dispatch({
            type: RELOAD_FOLLOW_SUGGESTIONS
          })
          setTimeout(() => {
            dispatch({
              type: RELOAD_FEED
            })
          }, 500)
          break
      }
    })
}

export const unfollowUser = (
  unfollower_id,
  unfollowing_id,
  token,
  location
) => dispatch => {
  axios
    .delete(`/api/follows/${unfollower_id}/${unfollowing_id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      switch (location) {
        default:
          return null
        case 'search':
          dispatch({
            type: RELOAD_SEARCH
          })
          break

        //case for profiles
        case 'profile':
          dispatch({
            type: RELOAD_PROFILE
          })
          break
      }
    })
}

export const getSuggestedFollows = (id, token) => dispatch => {
  axios
    .get(`/api/follows/suggestions/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: SET_FOLLOW_SUGGESTIONS,
        payload: res.data.suggestions
      })
    })
}
