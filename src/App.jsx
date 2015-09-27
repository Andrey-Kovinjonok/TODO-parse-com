import React, { Component } from 'react';

import { Route, Router } from 'react-router';

import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/Reducer.js';

import AppView from './containers/AppView.jsx';
import Login from './containers/Login.jsx';

import * as parseComActions from './redux/ParseComActions.js';

import parseComMiddleware from './redux/ParseComMiddleware.js';
const createStoreWithMiddleware = applyMiddleware(
  parseComMiddleware,
)(createStore);

const store = createStoreWithMiddleware(reducer);

// Enable Webpack hot module replacement for reducers
console.log('module.hot = ', module.hot);
if (module.hot) {
  module.hot.accept('./redux/Reducer.js', () => {
    const nextRootReducer = require('./redux/Reducer.js');
    store.replaceReducer(nextRootReducer);
  });
}

const requireAuth = (nextState, replaceState) => {
  let state = store.getState();
  if ((!state.user) || (!state.user.sessionToken)) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
};


const { getUsers } = bindActionCreators(parseComActions, store.dispatch);
getUsers();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        { () =>
          <Router>
            <Route path="/" component={AppView} onEnter={requireAuth}/>
            <Route path="/login" component={Login}/>
          </Router>
        }
      </Provider>
    );
  }
}

