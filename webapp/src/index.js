import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './containers/App';

import { createEpicMiddleware } from 'redux-observable';

import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import createReducer from './reducer';

import { rootEpic } from './epics';

const reducer = createReducer();
const epicMiddleware = createEpicMiddleware();
const middleware = applyMiddleware(epicMiddleware);

let store, composeEnhancers;

composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
store = createStore(reducer, undefined, composeEnhancers(middleware));

epicMiddleware.run(rootEpic);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);