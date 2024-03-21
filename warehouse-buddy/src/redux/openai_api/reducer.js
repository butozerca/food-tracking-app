import { SET_LOADING, SET_RESPONSE, SET_TICKET_SEND } from "./const"

export const OPENAI_REDUCER_NAME = 'openai_data';

const initial_openai_state = {
    loading: false,
    response: null,
}

export const openaiReducer = (state = initial_openai_state, action) => {
    switch (action.type) {
        case SET_LOADING: 
            return {
                ...state,
                loading: true
            }
        case SET_RESPONSE:
            return {
                ...state,
                response: action.payload,
                loading: false
            }
        case SET_TICKET_SEND:
            return {
                ...state,
                tickets_status: action.response
            }
        default:
            return state
    }
}
