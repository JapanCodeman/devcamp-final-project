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
    loggedInStatus: "NOT_LOGGED_IN"
  }

  this.handleLogin = this.handleLogin.bind(this)
  this.handleLogout = this.handleLogout.bind(this)
}

componentDidUpdate() {
  if (window.sessionStorage.getItem("token")) {
    let token = window.sessionStorage.getItem("token")
    var decoded = jwtDecode(token)
    this.setState({loggedInStatus: "LOGGED_IN"})
    this.setState({role:decoded.sub.role})
  }
}

handleLogin() {      
  this.setState({
    loggedInStatus: "LOGGED_IN"
  })
}

handleLogout() {
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN"
  })
  window.sessionStorage.clear()
  props.history.push('/')
}

  render() {
    return (
      <div>
        <Router history={history} >
          <Switch>
            <Route component={HeaderNavbar}/>
            <Route exact path="/" component={TitlePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/study" component={StudentStudy} />
            <Route exact path="/test" component={StudentTest} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/admin/login" component={AdministratorLogin} />
            <Route exact path="/admin/home" component={AdministratorHome} />
            <Route exact path="/admin/userstatus" component={UserStatus} />
            <Route exact path="/instructor/create" component={CreateCards} />
            <Route exact path="/instructor/home" render={(props) => (<InstructorHome {...props} handleLogin={this.handleLogin}/>)}/>
            <Route exact path="/instructor/modify" component={ModifyCards} />
            <Route exact path="/instructor/modify/:slug" component={EditCards} />
            <Route exact path="/instructor/students" component={StudentProgress} />
            {/* <Route path="*" component={PageNotFound} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}
