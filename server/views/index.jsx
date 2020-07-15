import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router-dom';
import rootReducer from '../../client/reducers';
import Routes from '../../client/Routes';

export default function renderIndexHTML(req) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
  );
  const context = {};
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {Routes(store)}
      </StaticRouter>
    </Provider>
  );
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="no code, neural networks" />
        <meta name="description" content="A no-code development platform (NCDP) for rapid prototyping and visualization of neural networks behaviour on custom data." />
        <title>The NoCode Neural Networks Development Platform</title>
        <script src="/client_app.js" defer></script>
        <script> window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>
      </head>

      <body>
        <div id="root">${html}</div>
      </body>
    </html>
    `;
}
