'use strict';

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLET_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const VisibiliterFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

export function completeTodo(text) {
  return {
    type: COMPLETED_TODO,
    index
  }
}

export function setVisibiltyFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

// 在声明每一个返回 action 函数的时候，我们需要在头部声明这个 action 的 type，以便好组织管理。
// 每个函数都会返回一个 action 对象，所以在 容器组件里面 调用
// text => dispatch(addTodo(text))

// 就是调用dispatch(action)