import { combineReducers } from 'redux';

import { openaiReducer, OPENAI_REDUCER_NAME } from './redux/openai_api/reducer';

export default function createReducer() {
    return combineReducers({
        [OPENAI_REDUCER_NAME]: openaiReducer
    });
}