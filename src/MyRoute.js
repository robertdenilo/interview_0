import React, { Component } from 'react';
import './App.css';
import Candidate from './Candidate';
import ShowUp from './ShowUp';
import Main from './Main';
import { HashRouter as Router, Route, Link,withRouter} from 'react-router-dom'   

export default class MyRoute extends Component {
    render(){
        return(
          <Main>
            <Route exact path="/Candidate" component={Candidate}/>
            <Route exact path="/ShowUp" component={ShowUp}/>
          </Main>
        )
    }
}