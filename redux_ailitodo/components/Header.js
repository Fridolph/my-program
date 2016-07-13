import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

/**
 * Header 组件
 */
class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
          <h1>我的DEMO</h1>
          <TodoTextInput newTodo
                         onSave={this.handleSave.bind(this)}
                         placeholder="输入你想做的事" />
      </header>
    )
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default Header
