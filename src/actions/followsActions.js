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