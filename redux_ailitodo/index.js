import 'babel-core/polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import 'todomvc-app-css/index.css'

const store = configureStore()

render(
  /**
   * [store 顶级store, 传入根Reducer]
   * @type {Object}
   */
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
