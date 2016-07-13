import React from 'react'

class AppleItem extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.state != this.props.state;
  }

  render() {
    let { state, actions } = this.props;

    /**
     * 这个区域是 mock 数据区，也作为组件文档，要书写清楚
     * 在组件发布时，将它们注释掉，以提高性能
     */
    
    let mockState = {
      id: 1,
      weight: 256,
      isEaten: false
    };
    
    let mockActions = {
      eatApple : id => console.log('eatApple',id)
    };

    /**
    * 开关这行代码，用于切换装入的数据来源。
    * 在开发阶段先打开，使用其内部的 state 和 action,
    * 在开发完成后关闭注释
    */
    state = mockState; 
    actions = mockActions;

    if (state.isEaten) return null;

    return (
      <div className="appleItem">
        <div className="apple">
          <img src="../images/apple.png" alt=""/>
        </div>
        <div className="info">
            <div className="name">红苹果 - 1号</div>
            <div className="weight">265克</div>
        </div>
        <div className="btn-div"><button>吃掉</button></div>
    </div>
    )
  }
}

export default AppleItem