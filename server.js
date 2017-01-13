import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, browserHistory, match, RouterContext } from 'react-router';
import routes from './routes.jsx';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from './reducers/counter.jsx';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, `dist`)));

app.get(`*`, (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      // we've got props!
      // let's match a route and render the corresponding page component

      // create a new Redux store instance
      const store = createStore(counterApp);

      // grab the initial state from our Redux store
      const preloadedState = store.getState();

      // render the component to a string
      const appHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );

      if (props.components[props.components.length-1].displayName === `not-found`) {
        // if route matches the "Not Found" route, let's render the "Not Found" 404 page
        res.status(404).send(renderFullPage(appHtml, preloadedState));
      } else {
        res.status(200).send(renderFullPage(appHtml, preloadedState));
      }
    } else {
      // nothing was matched
      res.status(404).send(`Not Found`);
    }
  });
});

function renderFullPage(appHtml, preloadedState) {
  // this is basically the same as what we have in ./index.html,
  // except that we are inserting appHtml as inner DOM of <div id="app"></div>
  return `<!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta charset="utf-8">
                <link rel="icon" type="image/png" sizes="36x36" href="/favicon.png">
                <link rel="icon" type="image/png" sizes="128x128" href="/assets/favicons/favicon-128x128@2x.png">
                <link rel="apple-touch-icon" type="image/png" sizes="152x152" href="/assets/favicons/touch-icon-ipad.png">
                <link rel="apple-touch-icon" type="image/png" sizes="167x167" href="/assets/favicons/touch-icon-ipad-retina.png">
                <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/assets/favicons/touch-icon-iphone-retina.png">
                <link rel="manifest" href="/manifest.json">
                <link rel="stylesheet" type="text/css" href="https://code.cdn.mozilla.net/fonts/fira.css">
                <link rel="stylesheet" type="text/css" href="/css/mofo-bootstrap.css">
                <link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css">
                <link rel="stylesheet" type="text/css" href="/css/main.css">
                <title>Mozilla Network Pulse</title>
              </head>
              <body>
                <div id="app">${appHtml}</div>
                <script>
                  // WARNING: See the following for Security isues with this approach:
                  // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
                  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
                </script>
                <script src="/bundle.js"></script>
              </body>
            </html>`;
}

app.listen(PORT, () => {
  console.log(`Network Pulse listening on port ${PORT}...`);
});
