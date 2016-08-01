'use strict';

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {addTodo, completeTodo, setVisibilityFilter, VisibilityFilters} from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

class App extends Component {
  render() {
    const {dispatch, visibleTodos, visibilityFilter} = this.props;

    return (
      <div>
        <AddTodo
          onAddClick={text => dispatch(addTodo(text))}
        />
        <TodoList 
          todos={visibleTodos}
          onTodoClick={index => dispatch(completeTodo(index))}
        />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))}
        />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired
  })),

  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;

    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todos => todo.completed);

    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todos => !todo.completed);
  }
}

// 这里的 state 是 connect 的组件的
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// 他从 react-redux 获取 connect 连接组件，通过 connect(select)(App) 连接 store 和 App 容器组件。
// select 是一个函数，他能接收到一个 state 参数，这个就是 store 里面的 state，然后通过这个函数的处理，返回一个对象，把对象里面的参数以属性传送给 App，以及附带一个 dispatch。
// 所以在 App 里面可以：
// const {dispatch, visibleTodos, visibilityFilter} = this.props;

// 所以App通过connect的到state和dispatch, 把state传递给子组件
// dispatch这个函数可以接受一个action参数, 然后就会执行reducer里面的操作。比如:
// text => dispatch(addTodo(text))

// addTodo(text), 这个函数是在action里面得到的, 可以看action的代码, 他其实返回一个action对象, 所以其实就是dispatch(action)

