/**
 * Created by app on 16/2/2.
 */
"use strict";
let combineReducers = require('redux').combineReducers;
let TodoActionType = require('../actions/action').TodoActionType;
let TodoFilterType = require('../actions/action').TodoFilterType;
let VisibilityFilters = require('../actions/action').VisibilityFilters;
//let { ADD_TODO, DELETE_TODO, COMPLETE_TODO, CLEAR_COMPLETED, SET_VISIBILITY_FILTER, VisibilityFilters } = require('../actions/action');
let utils = require('../utils/utils').utils;

let visibilityFilter = function(state, action) {
    state = state || VisibilityFilters.SHOW_ALL;
    switch(action.type) {
        case TodoFilterType.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state
    }
};

let todo = function(state, action) {
    state = state || [];
    switch(action.type) {
        case TodoActionType.COMPLETE_TODO:
            if(state.id != action.id) {
                return state
            } else {
                return {
                    ...state,
                    completed: !state.completed
                }
            }
        default:
            return state;
    }
};

let todos = function(state, action) {
    state = state || [];
    switch(action.type) {
        case TodoActionType.ADD_TODO:
            return [
                {
                    id: utils.uuid(),
                    text: action.text,
                    completed: false
                },
                ...state
            ];
        case TodoActionType.DELETE_TODO:
            return state.filter(todo => todo.id != action.id);
        case TodoActionType.COMPLETE_TODO:
            return state.map(t => todo(t, action));
        case TodoActionType.CLEAR_COMPLETED:
            return state.filter(todo => !todo.completed);
        default:
            return state;
    }
};
const todoApp = combineReducers({
    visibilityFilter,
    todos
});

module.exports = {
    todoApp: todoApp
};