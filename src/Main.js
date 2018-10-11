import React, { Component } from 'react';
import { Link,withRouter} from 'react-router-dom'   

import { Layout, Menu, Icon} from 'antd';
const { Header, Sider, Content } = Layout;



class Main extends Component {
  ReviewedUser = [];
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }



  constructor(){
    super();
    this.state={userinfo:[], collapsed: false,};
  }

  getResultFromPage(value){
    this.ReviewedUser = value;
  }
  onClickTo(arg){
    var path = {
        pathname:arg,
        state:{userinfo: this.ReviewedUser,backToMain:this.getResultFromPage.bind(this)},
    };
    
    this.props.history.push(path);
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
              <span onClick={this.onClickTo.bind(this,"/Candidate")}>Search People</span>
              </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span onClick={this.onClickTo.bind(this,"/ShowUp")}>Show Favorite</span>
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
