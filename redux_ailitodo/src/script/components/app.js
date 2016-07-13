/**
 * Created by app on 16/2/1.
 */


let React = require('react');
let connect = require('react-redux').connect;
let { addTodo, deleteTodo, completeTodo, clearCompleteTodo, setVisibilityFilter, VisibilityFilters } = require('../actions/action');
let FooterOuter = require('./footerOuter').FooterOuter;
let Footer = require('./footer').Footer;
let Header = require('./header').Header;
let TodoItem = require('./todoItem').TodoItem;
{
    let App = React.createClass({
        render: function() {
            const { dispatch, visibleTodos, visibilityFilter } = this.props;
            console.log(this.props);
            let TodoItems = visibleTodos.map(
                    todo => <TodoItem
                    todo={todo}
                    onClickDelete={id => dispatch(deleteTodo(id))}
                    onClickToggle={id => dispatch(completeTodo(id))}
                    />
            );
            return (
                <section id="todoapp" className="todoapp">
                    <Header onClickAdd={text => dispatch(addTodo(text))}/>
                    <section id="main" className="main">
                        <input id="toggle-all" className="toggle-all" type="checkbox"/>
                        <label htmlFor="toggle-all">Mark all as complete</label>
                        <ul id="todo-list" className="todo-list">
                            {TodoItems}
                        </ul>
                    </section>
                    <Footer
                        count={visibleTodos.length}
                        visibilityFilter={visibilityFilter}
                        onFilterChange={filter => dispatch(setVisibilityFilter(filter))}
                        onClearCompleted={() => dispatch(clearCompleteTodo())}
                        />
                </section>
            );
        }
    });

    
    let selectTodos = function(todos, filter) {
        switch(filter) {
            case VisibilityFilters.SHOW_ALL:
                return todos;
            case VisibilityFilters.SHOW_COMPLETED:
                return todos.filter(todo => todo.completed);
            case VisibilityFilters.SHOW_ACTIVE:
                return todos.filter(todo => !todo.completed);
        }
    };
    let select = function(state) {
        return {
            visibleTodos: selectTodos(state.todos, state.visibilityFilter),
            visibilityFilter: state.visibilityFilter
        }
    };

    module.exports = {
        App: connect(select)(App)
    }
}
