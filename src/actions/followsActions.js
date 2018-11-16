import { SUGGEST_FOLLOWERS, SET_FOLLOWS } from './constants';
import axios from 'axios';

export const followPrompt = (id, token) => dispatch => {
    axios.get(`http://localhost:5000/api/profile/prompt/${id}`, {
        headers: {
            'Authorization': token
        }
    })
        .then(res => {
            dispatch({
                type: SUGGEST_FOLLOWERS,
                payload: res.data
            })
        })
}

export const getFollowData = (id, token) => dispatch => {
    axios.get(`http://localhost:5000/api/follows/get/${id}`, {
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

export const followUser = (follower_id, following_id, token) => dispatch => {
    axios.post(`http://localhost:5000/api/follows/follow/${following_id}`, follower_id, {
        headers: {
            "Authorization": token
        }
    });
}

export const unfollowUser = (unfollower_id, unfollowing_id, token) => dispatch => {
    axios.post(`http://localhost:5000/api/follows/unfollow/${unfollowing_id}`, unfollower_id, {
        headers: {
            "Authorization": token
        }
    });
}