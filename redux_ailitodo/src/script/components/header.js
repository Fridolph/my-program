/**
 * Created by app on 16/2/2.
 */
"use strict";
let React = require('react');
{
    const ENTER_KEY = 13;
    let Header = React.createClass({
        handleNewTodoKeyDown: function(e) {
            const node = this.refs['new-todo'];
            const text = node.value.trim();
            if(e.which !== ENTER_KEY || !text) {
                return;
            }
            this.props.onClickAdd(text);
            node.value = ''
        },
        render: function() {
            console.log(this.props);
            return (
                <header id="header">
                    <h1>todos</h1>
                    <input
                        ref="new-todo"
                        className="new-todo"
                        placeholder="What needs to be done?"
                        autofocus
                        onKeyDown={this.handleNewTodoKeyDown}/>
                </header>
            );
        }
    });

    module.exports = {
        Header: Header
    }
}
