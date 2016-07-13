import { combineReducers } from 'redux'
import todos from './todos'

/**
 * [rootReducer redux里同样只有一个顶级的
 *  Reducer来控制派发对应的事件类型]
 * @type {[Object]}
 */
const rootReducer = combineReducers({
  todos
})

export default rootReducer
