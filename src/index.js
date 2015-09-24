import './styles/main.styl';
import 'babel/polyfill';

import React from 'react';
//import Todo from './components/Todo.jsx';
import App from './App.jsx';

//import { createStore as initialCreateStore, compose } from 'redux';
/*import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import devTools from 'redux-devtools';
//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import todoReducer from './stores/TodoReducer.js';
import AppView from './components/AppView.jsx';


const store = createStore(todoReducer);//, initialState);*/

const rootElement = document.getElementById('root');
console.log('index init');

//React.render(<Todo />, rootElement);
React.render(<App />, rootElement);
/*React.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={store}>
    {() => <AppView />}
  </Provider>,
  rootElement
);*/


