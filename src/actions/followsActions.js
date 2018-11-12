import { SUGGEST_FOLLOWERS } from './constants';
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