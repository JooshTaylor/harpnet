import { GET_FOLLOW_PROMPT } from './constants';
import axios from 'axios';

export const followPrompt = (id) => dispatch => {
    axios.post('/api/profile/prompt', id)
}