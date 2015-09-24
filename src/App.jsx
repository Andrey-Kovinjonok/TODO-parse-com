import React, { Component } from 'react';

import { createStore } from 'redux';
/*
import { createStore as initialCreateStore, compose } from 'redux';
*/
import { Provider } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import todoReducer from './stores/TodoReducer.js';
import AppView from './components/AppView.jsx';
//import { List } from 'immutable';

//let initialState = new List();

//const reducer = combineReducers(reducers);
/*let createStore = compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    initialCreateStore
  );*/

const store = createStore(todoReducer);//, initialState);

// Log the initial state
console.log('store: ', store.getState());

// Every time the state changes, log it
/*let unsubscribe = store.subscribe(() =>
  console.log('store: ', store.getState())
);*/

//unsubscribe();

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <AppView />}
        </Provider>


      </div>

    );
  }
}


        /*

        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      */