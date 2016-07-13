/**
 * Created by app on 16/2/2.
 */
"use strict";
let React = require('react');
{
    let FooterOuter = React.createClass({
        render: function() {
            return <footer id="info" className="info">
                <p>Double-click to edit a todo</p>

                <p>Created by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>

                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        }
    });

    module.exports = {
        FooterOuter: FooterOuter
    }
}