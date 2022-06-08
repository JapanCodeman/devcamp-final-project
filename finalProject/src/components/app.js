import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";

import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faRightFromBracket, faSquarePen, faUpload, faTrashCan, faSpinner } from '@fortawesome/free-solid-svg-icons'

import AdministratorHome from './admin/adminHome';
import CreateCards from './cards/createCards';
import EditCards from './cards/editCards';
import HeaderNavbar from './headerNavbar/headerNavbar';
import history from '../history';
import Home from './student/home';
import InstructorHome from './instructor/instructorHome';
import LoadingPage from './helpers/loadingPage';
import Login from './login/login';
import ModifyCards from './cards/modifyCards';
import PageNotFound from './pages/pageNotFound';
import Register from './login/register';
import StudentProgress from './pages/studentProgress';
import StudentStudy from './student/study';
import StudySet from './student/studySet';
// import StudentTest from './student/test'; //Future versions
import TitlePage from './login/titlePage';
import UserProfile from './helpers/userProfile';
// import UserStatus from './admin/adminUserStatus'; //Future versions
import ViewSets from './student/viewSets';


library.add(faRightFromBracket, faSquarePen, faPlus, faMinus, faUpload, faTrashCan, faSpinner)

export default class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    loggedInStatus: "NOT_LOGGED_IN",
    role: "",
    id: "",
    isLoading: false
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
        id: response.data._id,
        isLoading: false
      })
    })
  }
}

componentDidMount() {
  this.checkLoginStatus()
}

handleLogin(email) {
  this.setState({
    isLoading: true
  })
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
    id: response.data._id,
    isLoading: false
    })
  })  
  .catch(error => {
    console.log("There was an error in App.js with the handleLogin function", error)
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
  history.push('/')
  window.sessionStorage.clear()
}

adminAuthorizedPages() {
  return [
      // <Route exact path="/admin/login" render={(props) => (<AdministratorLogin {...props} handleLogin={this.handleLogin} key="admin-login"/>)}/>,
      <Route exact path="/admin/home" component={AdministratorHome} key="admin-home"/>
      // <Route exact path="/admin/userstatus" component={UserStatus} key="admin-userstatus"/>
  ]
}

instructorAuthorizedPages() {
  try {
  return [
      <Route exact path="/instructor/create" component={CreateCards} key="instructor-create-cards"/>,
      <Route exact path="/instructor/home" key="instructor-home" render={(props) => (<InstructorHome {...props} key="instructor-home"/>)}/>,
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
      <Route exact path="/study-set/:slug" component={StudySet} key="student-study-set" />,
      <Route exact path="/view-sets" component={ViewSets} key="student-view-sets" />
      // <Route exact path="/test" component={StudentTest} key="student-test" /> // future versions
  ]
}

  render() {
    return (
      <div>
        <Router history={history} >
        <Route render={(props) => (<HeaderNavbar {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} role={this.state.role} key="header"/>)}/>
          <Switch>
            <Route exact path="/" component={TitlePage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" render={(props) => (<Login {...props} handleLogin={this.handleLogin} handleNotLoading={this.handleNotLoading} key="login" />)}/>
            {this.state.isLoading === true ? <Route component={LoadingPage}/> : null} 
              {this.state.role === "Student" ? (
                this.studentAuthorizedPages()) :
                null}
            <Route exact path="/profile" component={UserProfile} />
              {this.state.role === "Instructor" ? (
                this.instructorAuthorizedPages()) :
                null}
              {this.state.role === "Administrator" ? (
                this.adminAuthorizedPages()) :
                null}

            <Route path="*" component={PageNotFound} />
            {/* <Route path='/404' component={PageNotFound} />
            <Redirect to="/404" /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}
