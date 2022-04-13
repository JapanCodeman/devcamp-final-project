import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Router } from "react-router-dom";

import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faRightFromBracket, faSquarePen, faUpload, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import jwtDecode from 'jwt-decode';

import AdministratorLogin from './admin/adminLogin';
import AdministratorHome from './admin/adminHome';
import CreateCards from './cards/createCards';
import EditCards from './cards/editCards';
import history from '../history';
import Home from './student/home';
import InstructorHome from './instructor/instructorHome';
import Login from './login/login';
import ModifyCards from './cards/modifyCards';
import PageNotFound from './pages/pageNotFound';
import Register from './login/register';
import StudentProgress from './pages/studentProgress';
import StudentStudy from './student/study';
import StudentTest from './student/test';
import TitlePage from './login/titlePage';
import UserProfile from './helpers/userProfile';
import UserStatus from './admin/adminUserStatus';
import HeaderNavbar from './headerNavbar/headerNavbar';

library.add(faRightFromBracket, faSquarePen, faPlus, faMinus, faUpload, faTrashCan)

export default class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    loggedInStatus: "NOT_LOGGED_IN",
    role: ""
  }

  this.handleLogin = this.handleLogin.bind(this)
  this.handleLogout = this.handleLogout.bind(this)
}

handleLogin(role) {      
  this.setState({
    loggedInStatus: "LOGGED_IN",
    role: role
  })
}

handleLogout() {
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN",
    role: ""
  })
  window.location.assign('http://localhost:3000/')
  window.sessionStorage.clear()
}

adminAuthorizedPages() {
  return [
    <Route exact path="/admin/login" render={(props) => (<AdministratorLogin {...props} handleLogin={this.handleLogin}/>)}/>,
    <Route exact path="/admin/home" component={AdministratorHome} />,
    <Route exact path="/admin/userstatus" component={UserStatus} />
  ]
}

instructorAuthorizedPages() {
  return [
    <Route exact path="/instructor/create" component={CreateCards} />,
    <Route exact path="/instructor/home" render={(props) => (<InstructorHome {...props} handleLogin={this.handleLogin}/>)}/>,
    <Route exact path="/instructor/modify" component={ModifyCards} />,
    <Route exact path="/instructor/modify/:slug" component={EditCards} />,
    <Route exact path="/instructor/students" component={StudentProgress} />
  ]
}

studentAuthorizedPages() {
  return [
    <Route exact path="/home" component={Home} />,
    <Route exact path="/study" component={StudentStudy} />,
    <Route exact path="/test" component={StudentTest} />
  ]
}

  render() {
    return (
      <div>
        <Router history={history} >
          <Switch>
            <Route render={(props) => (<HeaderNavbar {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} role={this.state.role}/>)}/>
            <Route exact path="/" component={TitlePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" render={(props) => (<Login {...props} handleLogin={this.handleLogin}/>)}/>
            {this.state.role === "Student" ? (
              this.studentAuthorizedPages()) :
              null}
            <Route exact path="/profile" component={UserProfile} />
            {this.state.role === "Instructor" ? (
              this.instructorAuthorizedPages()) :
              null}
            
            {this.state.role==="Administrator" ? (
              this.adminAuthorizedPages()) :
              null}

            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}
