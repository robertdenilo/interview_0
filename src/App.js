import React, { Component } from 'react';
import './App.css';
import Candidate from './Candidate';
import ShowUp from './ShowUp';

import { HashRouter as Router, Route, Link,withRouter,Redirect, Switch} from 'react-router-dom'   

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

class App extends Component {

 ReviewedUser = [];
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }



  constructor(){
    super();
    this.state={userinfo:[],collapsed: false};
  }
  componentDidMount () {

  }
  // onClick(event){
  //     console.log(ReviewedUser);
  // }
  getResultFromPage(value){
    console.log("back to main");
    // console.log(value);
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
    // var item1 =  <div>
    //     <Router>
    //       <div>        
    //         <ul>
    //             <li><Link to = {{pathname:"/Candidate",state:{backToMain:this.getResultFromPage,userinfo:ReviewedUser}}}>Search People</Link></li>
    //             <li><Link to = {{pathname:"/ShowUp",state:{backToMain:this.getResultFromPage,userinfo:ReviewedUser}}}>Show Favorite</Link></li>
    //         </ul>
    //         <Route exact={true} path="/Candidate" component={Candidate}/>
    //         <Route exact={true} path="/ShowUp" component={ShowUp}/>
    //       </div>
    //     </Router>
    //       {/* <button onClick={this.onClick.bind(this)}>check</button> */}
    //     </div>;
    var item2 =  <div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {/* <Menu.Item key="1">
              <Icon type="user" />
              <span>Search People</span>
              <Link to = {{pathname:"/Candidate",state:{backToMain:this.getResultFromPage.bind(this),userinfo:this.ReviewedUser}}} replace>Search People</Link>
            </Menu.Item> */}
            {/* <Menu.Item key="2">
              <Icon type="user" />
              <span>Show Favorite</span>
              <Link to = {{pathname:"/ShowUp",state:{backToMain:this.getResultFromPage.bind(this),userinfo:this.ReviewedUser}}} replace>Show Favorite</Link>
              </Menu.Item> */}
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
             <Switch>
             <Route exact={true} path="/Candidate" component={Candidate}/>
             <Route exact={true} path="/ShowUp" component={ShowUp}/>
             <Redirect path="/" to={{pathname: '/ShowUp'}} />
             </Switch>
          </Content>
        </Layout>
    </Layout></div>
    return (
          item2
    );
  }
}

export default withRouter(App);
