'use strict';

import {createStore} from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')

      store.replaceReducer(nextReducer)
    });
  }

  return store;
}

// 他从 redux 拿到 createStore 这个函数，再获取到 rootReducer ；
// createStore 函数接收两个参数，(reducer, [initialState])，reducer 毋庸置疑，他需要从 store 获取 state，以及连接到 reducer 交互。
// initialState 是可以自定义的一个初始化 state，可选参数。
// module.hot这个可以不用管，这是 webpack 热加载的处理，你也可以不要他。