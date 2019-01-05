import {
  SET_FOLLOWS,
  RELOAD_SEARCH,
  FOLLOWS_LOADING,
  RELOAD_PROFILE,
  RESET_PROFILE_RELOAD
} from "./constants";
import axios from "axios";

export const getFollowData = (id, token) => dispatch => {
  dispatch({
    type: FOLLOWS_LOADING
  });

  dispatch({
    type: RESET_PROFILE_RELOAD
  });

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
      });
    });
};

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
          return null;
        case "search":
          dispatch({
            type: RELOAD_SEARCH
          });
          break;

        //case for profiles
        case "profile":
          dispatch({
            type: RELOAD_PROFILE
          });
          break;

        //case for feed
      }
    });
};

export const unfollowUser = (
  unfollower_id,
  unfollowing_id,
  token,
  location
) => dispatch => {
  axios
    .delete(
      `${
        process.env.REACT_APP_API
      }/api/follows/${unfollower_id}/${unfollowing_id}`,
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => {
      switch (location) {
        default:
          return null;
        case "search":
          dispatch({
            type: RELOAD_SEARCH
          });
          break;

        //case for profiles
        case "profile":
          dispatch({
            type: RELOAD_PROFILE
          });
          break;

        //case for follow prompt

        //case for feed
      }
    });
};
