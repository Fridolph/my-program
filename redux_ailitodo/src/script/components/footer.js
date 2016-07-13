/**
 * Created by app on 16/2/2.
 */
"use strict";
let React = require('react');
let classNames = require('classnames');
let { VisibilityFilters } = require('../actions/action');
{
    let Footer = React.createClass({
        handleFilterActive: function() {
            this.props.onFilterChange(VisibilityFilters.SHOW_ACTIVE);
        },
        handleFilterAll: function() {
            this.props.onFilterChange(VisibilityFilters.SHOW_ALL);
        },
        handleFilterCompleted: function() {
            this.props.onFilterChange(VisibilityFilters.SHOW_COMPLETED);
        },
        handleClearCompleted: function() {
            this.props.onClearCompleted();
        },
        render: function() {
            let { count, visibilityFilter } = this.props;
            return (
                <footer id="footer" className="footer">
                    <span id="todo-count" className="todo-count"><strong
                        id="totale">{count}</strong> 项任务</span>
                    <ul id="filters" className="filters">
                        <li>
                            <a className={classNames({
                            selected: visibilityFilter == VisibilityFilters.SHOW_ALL
                            })} href="javascript:void(0)" id="all"
                               onClick={this.handleFilterAll}>显示全部</a>
                        </li>
                        <li>
                            <a className={classNames({
                            selected: visibilityFilter == VisibilityFilters.SHOW_ACTIVE
                            })} href="javascript:void(0)" id="active"
                               onClick={this.handleFilterActive}>未完成</a>
                        </li>
                        <li>
                            <a className={classNames({
                            selected: visibilityFilter == VisibilityFilters.SHOW_COMPLETED
                            })} href="javascript:void(0)" id="completed"
                               onClick={this.handleFilterCompleted}>已完成</a>
                        </li>
                    </ul>
                    <button id="clear-completed" className="clear-completed"
                            onClick={this.handleClearCompleted}>清除已完成项目
                    </button>
                </footer>
            );
        }
    });

    module.exports = {
        Footer: Footer
    }
}