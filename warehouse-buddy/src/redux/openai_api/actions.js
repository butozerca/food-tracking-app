import { GET_RESPONSE, SET_RESPONSE, SET_LOADING, SEND_TICKET, SET_TICKET_SEND } from "./const";

export const setLoading = () => ({
    type: SET_LOADING
});

export const getResponse = (query) => ({
    type: GET_RESPONSE,
    query
});

export const setResponse = (payload) => ({
    type: SET_RESPONSE,
    payload
});


export const sendTicket = (ticket) => ({
    type: SEND_TICKET,
    ticket
});

export const setTicketSend = (result) => ({
    type: SET_TICKET_SEND,
    result
})