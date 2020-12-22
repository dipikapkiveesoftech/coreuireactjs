import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'

import { Provider,connect } from 'react-redux'
import { createStore } from 'redux';
import reducer from '../src/redux/reducer'
// import store from './store'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

// componentDidMount(){
  
// }

ReactDOM.render(
  <Provider store = {store}>
     <App />
  </Provider>, document.getElementById('root')
)

React.icons = icons

// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>, 
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
