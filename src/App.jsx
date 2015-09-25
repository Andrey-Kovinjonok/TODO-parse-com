import React, { Component } from 'react';

import { Route, Router } from 'react-router';

import { reduxRouteComponent, routerStateReducer } from 'redux-react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/Reducer.js';

import AppView from './containers/AppView.jsx';
import Login from './containers/Login.jsx';

const combinedReducer = combineReducers({
  router: routerStateReducer,
  reducer
});

import parseComMiddleware from './redux/ParseComMiddleware.js';
const createStoreWithMiddleware = applyMiddleware(
  parseComMiddleware,
)(createStore);

const store = createStoreWithMiddleware(combinedReducer);

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          { () => <AppView /> }
        </Provider>
      </div>
    );
  }
}

const requireAuth = (nextState, replaceState) => {
  if (store.user.session) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
};

React.render(
  <Router>
    <Route name="app" path="/" component={App} onEnter={requireAuth}/>
    <Route name="login" path="/login" component={Login}/>
  </Router>, document.querySelector('.app')
);

