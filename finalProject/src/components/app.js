import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Router } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faFontAwesome } from '@fortawesome/free-brand-svg-icons'

import Home from './pages/home';
import history from '../history';
import TitlePage from './login/titlePage';
import Register from './login/register';
import Login from './login/login';
import UserProfile from './pages/userProfile';
import AdministratorLogin from './admin/adminLogin';
import AdministratorHome from './admin/adminHome';
import UserStatus from './admin/adminUserStatus';

library.add(faRightFromBracket)

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
            <Route exact path="/profile" component={UserProfile}/>
            <Route exact path="/admin/login" component={AdministratorLogin} />
            <Route exact path="/admin/home" component={AdministratorHome} />
            <Route exact path="/admin/userstatus" component={UserStatus} />
          </Switch>
        </Router>
      </div>
    );
  }
}
