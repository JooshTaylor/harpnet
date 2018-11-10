import { combineReducers } from 'redux';
import { errorReducer } from './errors';
import { authReducer } from './authReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer
});