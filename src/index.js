import React from 'react';
import ReactDOM from "react-dom";
import reducer from './store/reducers/reducer';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import './assets/index.scss';
import App from './App';

// Don't need right now, might need in the future
// const rootReducer = combineReducers({
//   root: reducer
// })

const composeEnhaces = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhaces(applyMiddleware(thunk)))
const app = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(app, document.getElementById("app"));