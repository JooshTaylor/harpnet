import { SEARCH_LOADING, SEARCH_COMPLETE, RESET_SEARCH } from "./constants";
import axios from "axios";
import { navigate } from "@reach/router";

export const searchUsers = (params, token) => dispatch => {
  dispatch({
    type: SEARCH_LOADING,
    payload: params
  });

  axios
    .get(`/api/search/${params}`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      dispatch({
        type: SEARCH_COMPLETE,
        payload: res.data
      });
      navigate(`/search/${params}`);
    });
};

export const resetSearch = () => {
  return {
    type: RESET_SEARCH
  };
};
