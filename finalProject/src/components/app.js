import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Router } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faRightFromBracket, faSquarePen } from '@fortawesome/free-solid-svg-icons'

import AdministratorLogin from './admin/adminLogin';
import AdministratorHome from './admin/adminHome';
import CreateCards from './pages/createCards';
import history from '../history';
import Home from './pages/home';
import InstructorHome from './pages/instructorHome';
import Login from './login/login';
import ModifyCards from './pages/modifyCards';
import PageNotFound from './pages/pageNotFound';
import Register from './login/register';
import StudentProgress from './pages/studentProgress';
import TitlePage from './login/titlePage';
import UserProfile from './pages/userProfile';
import UserStatus from './admin/adminUserStatus';
import HeaderNavbar from './headerNavbar/headerNavbar';


library.add(faRightFromBracket, faSquarePen)

export default class App extends Component {
constructor(props) {
  super(props);

  this.handleLogout = this.handleLogout.bind(this)
}

handleLogout() {
  window.sessionStorage.clear()
  props.history.push('/')
}

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
          <HeaderNavbar />
          <Switch>
            <Route exact path="/" component={TitlePage} />
            <Route  path="/register" component={Register} />
            <Route  path="/login" component={Login} />
            <Route  path="/home" component={Home} />
            <Route  path="/profile" component={UserProfile} />
            <Route  path="/admin/login" component={AdministratorLogin} />
            <Route  path="/admin/home" component={AdministratorHome} />
            <Route  path="/admin/userstatus" component={UserStatus} />
            <Route  path="/instructor/create" component={CreateCards} />
            <Route  path="/instructor/home" component={InstructorHome} />
            <Route  path="/instructor/modify" component={ModifyCards} />
            <Route  path="/instructor/students" component={StudentProgress} />
            {/* <Route component={PageNotFound} /> */}
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
