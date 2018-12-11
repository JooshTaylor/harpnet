import {
  SET_FOLLOWS,
  RELOAD_SEARCH,
  FOLLOWS_LOADING,
  RELOAD_PROFILE,
  END_RELOAD_PROFILE,
  SET_INDIV_FOLLOWS
} from "./constants";
import axios from "axios";

export const getFollowData = (id, token) => dispatch => {
  dispatch({
    type: END_RELOAD_PROFILE
  });

  dispatch({
    type: FOLLOWS_LOADING
  });

  axios
    .get(`http://localhost:5000/api/v1/follows/get/${id}`, {
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

export const getFollowDataByUser = (id, token) => dispatch => {
  axios
    .get(`http://localhost:5000/api/v1/follows/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .then(follows => {
      dispatch({
        type: SET_INDIV_FOLLOWS,
        payload: follows.data
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
    .post(`http://localhost:5000/api/v1/follows/${following_id}`, follower_id, {
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

        case "profile":
          dispatch({
            type: RELOAD_PROFILE
          });

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
      `http://localhost:5000/api/v1/follows/${unfollower_id}/${unfollowing_id}`,
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

        case "profile":
          dispatch({
            type: RELOAD_PROFILE
          });

        //case for feed
      }
    });
};
