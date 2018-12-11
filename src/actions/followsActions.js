import { SET_FOLLOWS, RELOAD_SEARCH, FOLLOWS_LOADING } from "./constants";
import axios from "axios";

export const getFollowData = (id, token) => dispatch => {
  dispatch({
    type: FOLLOWS_LOADING
  });

  axios
    .get(`http://localhost:5000/api/follows/get/${id}`, {
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
    .post(`http://localhost:5000/api/follows/${following_id}`, follower_id, {
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

        //case for profiles

        //case for follow prompt

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
      `http://localhost:5000/api/follows/${unfollower_id}/${unfollowing_id}`,
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

        //case for profiles

        //case for follow prompt

        //case for feed
      }
    });
};
