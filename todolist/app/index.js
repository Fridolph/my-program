'use strict';

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App frmo './containers/App'
import configureStore from './stores/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// 这里我们从 react-redux 中获取了一个 Provider 组件，我们把它渲染到应用的最外层。
// 他需要一个属性 store ，他把这个 store 放在context里，给App(connect)用。