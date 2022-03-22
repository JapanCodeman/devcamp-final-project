import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Router } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faRightFromBracket, faSquarePen } from '@fortawesome/free-solid-svg-icons'

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


library.add(faRightFromBracket, faSquarePen, faPlus, faMinus)

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
          <Switch>
            <Route component={HeaderNavbar}/>
            <Route exact path="/" component={TitlePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/admin/login" component={AdministratorLogin} />
            <Route exact path="/admin/home" component={AdministratorHome} />
            <Route exact path="/admin/userstatus" component={UserStatus} />
            <Route exact path="/instructor/create" component={CreateCards} />
            <Route exact path="/instructor/home" component={InstructorHome} />
            <Route exact path="/instructor/modify" component={ModifyCards} />
            <Route exact path="/instructor/students" component={StudentProgress} />
            {/* <Route component={PageNotFound} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}
