import React, { Component } from 'react';
import { Link,withRouter} from 'react-router-dom'   

import { Layout, Menu, Icon} from 'antd';
const { Header, Sider, Content } = Layout;

var ReviewedUser = [];

class Main extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }



  constructor(){
    super();
    this.state={userinfo:[]};
  }
  componentDidMount () {

  }

  getResultFromPage(value){
    console.log("back to main");
    console.log(value);
    ReviewedUser = value;
  }

  render() {
    var item1 =  <div>
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>Search People</span>
            <Link to = {{pathname:"/Candidate",state:{backToMain:this.getResultFromPage.bind(this),userinfo:ReviewedUser}}}></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            <span>Show Favorite</span>
            <Link to = {{pathname:"/ShowUp",state:{backToMain:this.getResultFromPage.bind(this),userinfo:ReviewedUser}}}>Show Favorite</Link>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          /> 
        </Header>         
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
        </Content>
      </Layout>
  </Layout></div>
   
    return (
          item1
    );
  }
}

export default withRouter(Main);
