/**
 * Created by app on 16/2/1.
 */
"use strict";
let reactDom = require('react-dom');
let React = require('react');
let Provider = require('react-redux').Provider;
let createStore = require('redux').createStore;
let todoApp = require('./reducers/reducers').todoApp;
let App = require('./components/app').App;
{
    require('todomvc-app-css');
    require('todomvc-common');
    let store = createStore(todoApp);
    reactDom.render(
        <Provider store={store}>
            <App/>
        </Provider>, document.getElementById('con'));
}