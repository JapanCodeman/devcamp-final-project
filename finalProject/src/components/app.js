import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Router } from 'react-router-dom';

import Home from './pages/home';
import history from '../history';
import TitlePage from './login/titlePage';
import Register from './login/register';
import Login from './login/login';
import Profile from './pages/profile';

export default class App extends Component {
constructor() {
  super();
}

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={TitlePage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path ="/profile" component={Profile}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
