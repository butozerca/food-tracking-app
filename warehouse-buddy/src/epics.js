import { combineEpics } from 'redux-observable';

import { openaiEpic } from './redux/openai_api/epics';
import { backendEpic } from './redux/openai_api/epics';

export const rootEpic = combineEpics(openaiEpic, backendEpic);