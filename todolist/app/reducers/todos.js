'use strict';

import {ADD_TODO, COMPLETE_TODO} from '../actions'

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODOS: 
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];

    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ];
  }
}


export default todos;