import { createSelector } from 'reselect';
import { prop } from 'ramda';

import { OPENAI_REDUCER_NAME } from './reducer';

export const responseSelector = createSelector(
    prop(OPENAI_REDUCER_NAME),
    (data) => data.response
);

export const loadingSelector = createSelector(
    prop(OPENAI_REDUCER_NAME),
    (data) => data.loading
);
