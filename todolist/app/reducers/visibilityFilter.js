import {SET_VISIBILITY_FILTER, VisibilityFilters} from '../actions'

const {SHOW_ALL} = VisibilistyFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER: 
      return action.filter;

    default:
      return state;
  }
}

export default visibilityFilter;

// 这里我们从 actions 获得各个 type 的参数，以便和 action 做好映射对应。
// 整个函数其实就是执行 switch，根据不同的 action.type，返回不同的对象状态。
// 但是如果我们需要 type 很多，比如除了 visibilityFilter，还有 todos，难道要写一个长长的switch，当然不。
// redux 提供一个 combineReducers 辅助函数，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
// 我们把不同的 reducer 放在不同文件下。