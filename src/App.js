import React, { Component } from 'react';
import './App.css';
import Candidate from './Candidate';
import ShowUp from './ShowUp';

import { HashRouter as Router, Route, Link,withRouter} from 'react-router-dom'   

var ReviewedUser = [];

class App extends Component {

  constructor(){
    super();
    this.state={userinfo:[]};
  }
  componentDidMount () {

  }
  // onClick(event){
  //     console.log(ReviewedUser);
  // }
  getResultFromPage(value){
    console.log("back to main");
    console.log(value);
    ReviewedUser = value;
  }

  render() {
    var item1 =  <div>
        <Router>
          <div>        
            <ul>
                <li><Link to = {{pathname:"/Candidate",state:{backToMain:this.getResultFromPage.bind(this),userinfo:ReviewedUser}}}>Search People</Link></li>
                <li><Link to = {{pathname:"/ShowUp",state:{backToMain:this.getResultFromPage.bind(this),userinfo:ReviewedUser}}}>Show Favorite</Link></li>
            </ul>
            <Route exact={true} path="/Candidate" component={Candidate}/>
            <Route exact={true} path="/ShowUp" component={ShowUp}/>
          </div>
        </Router>
          {/* <button onClick={this.onClick.bind(this)}>check</button> */}
        </div>;
    return (
          item1
    );
  }
}

export default withRouter(App);
