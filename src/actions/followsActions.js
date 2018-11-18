import { SET_FOLLOWS, RELOAD_SEARCH, FOLLOWS_LOADING, RELOAD_PROFILE, END_RELOAD_PROFILE } from './constants';
import axios from 'axios';

export const getFollowData = (id, token) => dispatch => {
    dispatch({
        type: END_RELOAD_PROFILE
    })

    dispatch({
        type: FOLLOWS_LOADING
    })

    axios.get(`https://lit-citadel-92787.herokuapp.com/api/follows/get/${id}`, {
        headers: {
            "Authorization": token
        }
    })
        .then(res => {
            dispatch({
                type: SET_FOLLOWS,
                payload: res.data
            })
        })
}

export const followUser = (follower_id, following_id, token, location) => dispatch => {
    axios.post(`https://lit-citadel-92787.herokuapp.com/api/follows/${following_id}`, follower_id, {
        headers: {
            "Authorization": token
        }
    })
        .then(res => {
            switch (location) {
                default: return null;
                case "search":
                    dispatch({
                        type: RELOAD_SEARCH
                    })

                case "profile":
                    dispatch({
                        type: RELOAD_PROFILE
                    })

                //case for feed
            }
        })
}

export const unfollowUser = (unfollower_id, unfollowing_id, token, location) => dispatch => {
    axios.delete(`https://lit-citadel-92787.herokuapp.com/api/follows/${unfollower_id}/${unfollowing_id}`, {
        headers: {
            "Authorization": token
        }
    })
        .then(res => {
            switch (location) {
                default: return null;
                case "search":
                    dispatch({
                        type: RELOAD_SEARCH
                    })

                case "profile":
                    dispatch({
                        type: RELOAD_PROFILE
                    })

                //case for feed
            }
        })
}