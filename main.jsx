import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes.jsx';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from './reducers/counter.jsx';
import App from './app.jsx';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(counterApp, preloadedState);

ReactDOM.render((
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
), document.getElementById(`app`));
