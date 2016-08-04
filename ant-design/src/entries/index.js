import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Icon, Row, Col} from 'antd'


class Btngroup extends React.Component {  
  render() {
    return (
      <div className="yihang">
        按钮组
        <Button type="primary">primary</Button>
        <Button>Default</Button>
        <Button type="ghost">Ghost</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="primary" size="large">Large</Button>
        <Button type="primary" size="default">Default</Button>
        <Button type="primary" size="small">Small</Button>
      </div>
    ) 
  }
}

const Btn = React.createClass({
  getInitialState() {
    return {
      loading: false,
      iconLoading: false,
    };
  },
  enterLoading() {
    this.setState({ loading: true });
  },
  enterIconLoading() {
    this.setState({ iconLoading: true });
  },
  render() {
    return (
      <div className="yihang">
        加载按钮组
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>        
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
          Click me!
        </Button>
        <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
          Click me!
        </Button>
        <br />
        <Button type="primary" shape="circle" icon="search"></Button>
        <Button type="dashed" icon="search">搜索</Button>
        <Button type="ghost" shape="circle-outline" icon="search"></Button>
        <Button type="ghost" icon="search">Search</Button>
        <Button type="primary" shape="circle" icon="search" disabled></Button>
        <Button type="dashed" icon="search" disabled>搜索</Button>
        <Button type="ghost" shape="circle-outline" icon="search" disabled></Button>
        <Button type="ghost" icon="search" disabled>Search</Button>        
      </div>
    );
  },
});

var IconG = React.createClass({
  render() {
    return (
      <div className="yihang icontubiao">
        <Icon type="step-backward" />
        <Icon type="heart-o" />
        <Icon type="fast-forward" />
        <Icon type="shrink" />
        <Icon type="arrow-salt" />
        <Icon type="caret-circle-right" />
        <Icon type="android" />
        <Icon type="apple" />
        <Icon type="pie-chart" />
        <Icon type="scan" />
        <Icon type="like" />
        <Icon type="star" />
      </div>
    )
  }
})

const ButtonGroup = Button.Group

var Btnzuhe = React.createClass({
  render() {
    return (
      <div className="yihang">
        <ButtonGroup>
          <Button>Cancel</Button>
          <Button type="primary">OK</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button disabled>L</Button>
          <Button disabled>M</Button>
          <Button disabled>R</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button type="primary">L</Button>
          <Button>M</Button>
          <Button type="ghost">M</Button>
          <Button type="dashed">R</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button type="primary">
            <Icon type="left" />Go back
          </Button>
          <Button type="primary">
            Go forward<Icon type="right" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button type="primary" icon="cloud" />
          <Button type="primary" icon="cloud-download" />
        </ButtonGroup>
        <ButtonGroup size="large">
          <Button type="ghost">Large</Button>
          <Button type="ghost">Large</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button type="ghost">Default</Button>
          <Button type="ghost">Default</Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button type="ghost">Small</Button>
          <Button type="ghost">Small</Button>
        </ButtonGroup>
      </div>
    )
  }
})

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>

class Buju extends React.Component {
  render() {
    return (
      <div className="buju">
        <div className="biaozhun">
          <Row>
            <Col span={12}>.ant-col-12</Col>
            <Col span={12}>.ant-col-12</Col>
          </Row>
          <Row>
            <Col span={8}>.ant-col-8</Col>
            <Col span={8}>.ant-col-8</Col>
            <Col span={8}>.ant-col-8</Col>
          </Row>
          <Row>
            <Col span={6}>.ant-col-6</Col>
            <Col span={6}>.ant-col-6</Col>
            <Col span={6}>.ant-col-6</Col>
            <Col span={6}>.ant-col-6</Col>
          </Row>
        </div>
        <div className="gutter-example">
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">.ant-col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">.ant-col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">.ant-col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">.ant-col-6</div>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col span={8}>.ant-col-8</Col>
            <Col span={8} offset={8}>.ant-col-8 .ant-offset-8</Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>.ant-col-6 .ant-offset-6</Col>
            <Col span={6} offset={6}>.ant-col-6 .ant-offset-6</Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>.ant-col-12 .ant-offset-6</Col>
          </Row>
          <Row>
            <Col span={18} push={6}>.ant-col-18 .ant-push-6</Col>
            <Col span={6} pull={18}>.ant-col-6 .ant-pull-18</Col>
          </Row>
        </div>
        <div>
          <p>子元素居左排列</p>
          <Row type="flex" justify="start">
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
          </Row>
          <p>子元素居中排列</p>
          <Row type="flex" justify="center">
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
          </Row>
          <p>子元素居右排列</p>
          <Row type="flex" justify="end">
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
          </Row>
          <p>子元素等宽排列</p>
          <Row type="flex" justify="space-between">
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
          </Row>
          <p>子元素分散对齐排列</p>
          <Row type="flex" justify="space-around">
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
            <Col span={4}>.ant-col-4</Col>
          </Row>
        </div>
        <div>
          <p>顶部对齐</p>
          <Row type="flex" justify="center" align="top">
            <Col span={4}><DemoBox value={100}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={50}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={120}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={80}>.ant-col-4</DemoBox></Col>
          </Row>
          <p>居中对齐</p>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={4}><DemoBox value={100}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={50}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={120}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={80}>.ant-col-4</DemoBox></Col>
          </Row>

          <p>底部对齐</p>
          <Row type="flex" justify="space-between" align="bottom">
            <Col span={4}><DemoBox value={100}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={50}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={120}>.ant-col-4</DemoBox></Col>
            <Col span={4}><DemoBox value={80}>.ant-col-4</DemoBox></Col>
          </Row>
        </div> 
        <div>
          flex order
          <Row type="flex">
            <Col span={6} order={2}>2 col-order-1</Col>
            <Col span={6} order={4}>4 col-order-2</Col>
            <Col span={6} order={1}>1 col-order-3</Col>
            <Col span={6} order={3}>3 col-order-4</Col>
          </Row>
        </div>
        <div>
          响应式布局
          <Row>
          <Col xs={2} sm={4} md={6} lg={8}>响应式</Col>
          <Col xs={20} sm={16} md={12} lg={8}>响应式</Col>
          <Col xs={2} sm={4} md={6} lg={8}>响应式</Col>
          </Row>

          其他内嵌的响应式布局
          <Row>
            <Col xs={{span: 5, offset: 1}} lg={{span:12, offset: 2}}>响应式</Col>
            <Col xs={{span: 11, offset: 1}} lg={{span: 6, offset: 6}}>响应式</Col>
            <Col sm={{span:4, offset: 8}} lg={{span: 20, offset: 2}}>响应式</Col>            
          </Row>
          <Row gutter={100}>
            <Col xs={{span: 6}}>响应式</Col>
            <Col xs={{span: 6}}>响应式</Col>
            <Col xs={{span: 6}}>响应式</Col>
            <Col xs={{span: 6}}>响应式</Col>
          </Row>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <div>
    <div className="btnGroup">
      <Btngroup />
      <Btn />
      <Btnzuhe />
      <IconG />
    </div>
    <div className="buju">
      <Buju />
    </div>
  </div>,
  document.getElementById('root')
);