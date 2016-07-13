/**
 * Created by app on 16/2/2.
 */
"use strict";
/*
 * action type
 * */
const TodoActionType = {};
TodoActionType.ADD_TODO = 'ADD_TODO';
TodoActionType.DELETE_TODO = 'DELETE_TODO';
TodoActionType.COMPLETE_TODO = 'COMPLETE_TODO';
TodoActionType.CLEAR_COMPLETED = 'CLEAR_COMPLETED';

const TodoFilterType = {};
TodoFilterType.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * todo_filters
 * */
const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};


/*
 * action creators
 * */
let addTodo = function(text) {
    return {type: TodoActionType.ADD_TODO, text}
};
let deleteTodo = function(id) {
    return {type: TodoActionType.DELETE_TODO, id}
};
let completeTodo = function(id) {
    return {type: TodoActionType.COMPLETE_TODO, id}
};
let clearCompleteTodo = function() {
    return {type: TodoActionType.CLEAR_COMPLETED}
};
let setVisibilityFilter = function(filter) {
    return {type: TodoFilterType.SET_VISIBILITY_FILTER, filter}
};

module.exports = {
    TodoActionType: TodoActionType,
    TodoFilterType: TodoFilterType,
    //ADD_TODO: ADD_TODO,
    //COMPLETE_TODO: COMPLETE_TODO,
    //DELETE_TODO: DELETE_TODO,
    //CLEAR_COMPLETED: CLEAR_COMPLETED,
    VisibilityFilters: VisibilityFilters,
    //SET_VISIBILITY_FILTER: SET_VISIBILITY_FILTER,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    completeTodo: completeTodo,
    clearCompleteTodo: clearCompleteTodo,
    setVisibilityFilter: setVisibilityFilter
};