import { ofType } from 'redux-observable';
import { from, catchError, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GET_RESPONSE, SEND_TICKET } from './const';
import { setResponse, setTicketSend } from './actions';
import { FetchResponse, sendTicketApi } from './api';

export const openaiEpic = (action$, state$) =>
    action$.pipe(
        ofType(GET_RESPONSE),
        map(action => action.query),
        switchMap(query =>
            from(FetchResponse(query)).pipe(
                map((result) => setResponse(result)),
                catchError((e) => console.log(e))) // of(setResponse("error"))))
        ),
    );


// sendTicketApi does not return anything
export const backendEpic = (action$, state$) =>
    action$.pipe(
        ofType(SEND_TICKET),
        map(action => action.ticket),
        switchMap(ticket =>
            from(sendTicketApi(ticket)).pipe(
                map((result) => setTicketSend(result)),
                catchError((e) => console.log(e)))
    ),
);