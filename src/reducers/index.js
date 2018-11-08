import { combineReducers } from 'redux';
import { errorReducer } from './errors';

export default combineReducers({
    errors: errorReducer
});