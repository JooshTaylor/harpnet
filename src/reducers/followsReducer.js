import { GET_FOLLOW_PROMPT } from '../actions/constants';

const initialState = {
    following: [],
    followers: [],
    followPrompt: []
}

export const followsReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}