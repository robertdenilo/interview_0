import React, { Component } from 'react';
import './App.css';
import Candidate from './Candidate';
import ShowUp from './ShowUp';
import Main from './Main';
import { Route,Switch,Redirect } from 'react-router-dom'   

export default class MyRoute extends Component {
    render(){
        return(
          <Main>
            <Switch>
              <Route exact path="/Candidate" component={Candidate}/>
              <Route exact path="/ShowUp" component={ShowUp}/>
              <Redirect path="/" to={{pathname: '/ShowUp'}} />
             </Switch>
          </Main>
        )
    }
}