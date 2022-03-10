import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { Router } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRightFromBracket, faSquarePen } from '@fortawesome/free-solid-svg-icons'

import AdministratorLogin from './admin/adminLogin';
import AdministratorHome from './admin/adminHome';
import history from '../history';
import Home from './pages/home';
import InstructorHome from './pages/instructorHome';
import Login from './login/login';
import Register from './login/register';
import TitlePage from './login/titlePage';
import UserProfile from './pages/userProfile';
import UserStatus from './admin/adminUserStatus';


library.add(faRightFromBracket, faSquarePen)

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
            <Route exact path="/instructor/home" component={InstructorHome} />
          </Switch>
        </Router>
      </div>
    );
  }
}
