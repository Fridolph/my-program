import React, {Component, PropTypes} from 'react'

export default class Footer extends Component {
  renderFilter(filter, name) {
    if (filter == this.props.filter) {
      return name;
    }

    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          this.props.onFilterChange(filter);
        }}
      >
        {name}
      </a>
    )
  }

  render() {
    return (
      <p>
        SHOW
        {' '}
        {this.renderFilter('SHOW_ALL', 'ALLA')}
        {' '},
        {this.renderFilter('SHOW_COMPLETED', 'Completed')}
        {' '},
        {this.renderFilter('SHOW_ACTIVE', 'Active')}
        .
      </p>
    )
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

// 可以看出，所有的展示组件需要的 state 和 数据，都从属性中获取的，所有的操作，都是通过容器组件给的回调函数来操作的。
// 他们尽可能地不拥有自己的状态，做无状态组件。