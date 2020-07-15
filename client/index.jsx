import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers';
import Routes from './Routes';

require('./styles/main.scss');

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk),
);

const AppWithRouting = () => (
  <Provider store={store}>
    <BrowserRouter>
      {Routes(store)}
    </BrowserRouter>
  </Provider>
);


ReactDOM.hydrate(
  <AppWithRouting />,
  document.getElementById('root'),
);
