import { createStore ,compose} from 'redux'
import rootReducer from '../reducers'

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

/**
 * [configureStore description]
 * @param  {[Object]} initialState [传入的初始状态]
 * @return {[Object]}              [返回store, 这里的store可理解为所有状态的一个容器集合]
 */
export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
