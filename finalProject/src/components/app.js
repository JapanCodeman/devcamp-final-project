import React, { Component } from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Router } from "react-router-dom";

import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faRightFromBracket, faSquarePen, faUpload, faTrashCan } from '@fortawesome/free-solid-svg-icons'

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
    role: "",
    id: ""
  }

  this.handleLogin = this.handleLogin.bind(this)
  this.handleLogout = this.handleLogout.bind(this)
}

checkLoginStatus() {
  if (this.state.loggedInStatus === "NOT_LOGGED_IN" && window.sessionStorage.getItem("token")) {
    var token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token)
    const email = decoded.sub.email
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${token}`
        }
      }
    axios
    .get(`http://127.0.0.1:5000/user-by-email/${email}`, config)
    .then(response => {
      this.setState({
        loggedInStatus: "LOGGED_IN",
        role: response.data.role,
        id: response.data._id
      })
    })
  }
}

componentDidMount() {
  this.checkLoginStatus()
}

handleLogin(email) {
  var token = window.sessionStorage.getItem("token")
  const decoded = jwtDecode(token) 
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "Authorization" : `Bearer ${token}`
      }
    }      
  axios
  .get(`http://127.0.0.1:5000/user-by-email/${email}`, config)
  .then(response => {
    this.setState({
    loggedInStatus: "LOGGED_IN",
    role: response.data.role,
    id: response.data._id
  })
  .catch(error => {
    console.log("There was an error in App.js with the handleLogin function", error)
  })
  })
}

handleLogout() {
  var token = window.sessionStorage.getItem("token")
  const decoded = jwtDecode(token) 
  const userEmail = decoded.sub.email
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "Authorization" : `Bearer ${token}`
      }
    }
  axios.patch(`http://127.0.0.1:5000/update-user-by-email/${userEmail}`, { logged_in: "false" }, config)
  .catch(error => {
    console.log("Patch log status error", error)
  })
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN",
    role: "",
    id: ""
  })
  window.location.assign('http://localhost:3000/')
  window.sessionStorage.clear()
}

adminAuthorizedPages() {
  return [
      <Route exact path="/admin/login" render={(props) => (<AdministratorLogin {...props} handleLogin={this.handleLogin} key="admin-login"/>)}/>,
      <Route exact path="/admin/home" component={AdministratorHome} key="admin-home"/>,
      <Route exact path="/admin/userstatus" component={UserStatus} key="admin-userstatus"/>
  ]
}

instructorAuthorizedPages() {
  try {
  return [
      <Route exact path="/instructor/create" component={CreateCards} key="instructor-create-cards"/>,
      <Route exact path="/instructor/home" render={(props) => (<InstructorHome {...props} handleLogin={this.handleLogin} key="instructor-home"/>)}/>,
      <Route exact path="/instructor/modify" component={ModifyCards} key="instructor-modify"/>,
      <Route exact path="/instructor/modify/:slug" component={EditCards} key="instructor-modify-slug"/>,
      <Route exact path="/instructor/students" component={StudentProgress} key="instructor-student-progress"/>
  ]
}
catch (error) {
  console.log("error in instructorAuthorizedPages()", error)
}
}

studentAuthorizedPages() {
  return [
      <Route exact path="/home" component={Home} key="student-home" />,
      <Route exact path="/study" component={StudentStudy} key="student-study" />,
      <Route exact path="/test" component={StudentTest} key="student-test" />
  ]
}

  render() {
    return (
      <div>
        <Router history={history} >
          <Switch>
            <Route render={(props) => (<HeaderNavbar {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} role={this.state.role} key="header"/>)}/>
            <Route exact path="/" component={TitlePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" render={(props) => (<Login {...props} handleLogin={this.handleLogin} key="login" />)}/>
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
            {/* <Route path="*" component={PageNotFound} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}
