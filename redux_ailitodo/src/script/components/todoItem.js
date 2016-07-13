/**
 * Created by app on 16/2/2.
 */
"use strict";
let React = require('react');
let classNames = require('classnames');
{
    let TodoItem = React.createClass({
        handleDestroy: function() {
            let id = this.props.todo.id;
            this.props.onClickDelete(id);
        },
        handleToggle: function() {
            let id = this.props.todo.id;
            this.props.onClickToggle(id);
        },
        render: function(a) {
            return (
                <li className={classNames({
                    completed: this.props.todo.completed
                })}>
                    <div className="view">
                        <input className="toggle" type="checkbox"
                               onChange={this.handleToggle}
                               checked={this.props.todo.completed}/>
                        <label>{this.props.todo.text}</label>
                        <button className="destroy" onClick={this.handleDestroy}></button>
                    </div>
                    <input className="edit" value={this.props.todo.text}/>
                </li>
            );
        }
    });

    module.exports = {
        TodoItem: TodoItem
    }
}