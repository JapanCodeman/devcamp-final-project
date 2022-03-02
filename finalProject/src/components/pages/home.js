import axios from 'axios';
import React, { Component } from 'react';
import HeaderNavbar from '../headerNavbar/headerNavbar';
import jwtDecode from 'jwt-decode';


export default class Home extends Component {
  constructor(props) {
    super(props)

     this.state = {
       user:{}
     }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    var token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token) 
    console.log(decoded)
    const userEmail = decoded.sub.email
    axios.patch(`http://127.0.0.1:5000/update-student-by-email/${userEmail}`, {logged_in:"false"}, { headers: {"Authorization" : `Bearer ${token}`}})
    .catch(error => {
      console.log("Patch log status error", error)
    })
    window.sessionStorage.clear()
    this.props.history.push('/')
  }

  componentDidMount(){
    var token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token) 
    console.log(decoded)
    const userEmail = decoded.sub.email
    axios.patch(`http://127.0.0.1:5000/update-student-by-email/${userEmail}`, {logged_in:"true"}, { headers: {"Authorization" : `Bearer ${token}`}})
    .catch(error => {
      console.log("Patch log status error", error)
    })
    axios.get(`http://127.0.0.1:5000/student-email/${userEmail}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then (User => {
      this.setState({
        user : User.data
      })
      // window.sessionStorage.setItem("User", JSON.stringify(User))
    })
    .catch(error => {
      console.log("Error in getting user object", error);
    })
    const user = JSON.parse(window.sessionStorage.getItem("User"))
  }


  componentWillUnmount() {
    window.sessionStorage.clear()
  }

  render () {
 
    
    return (
      <div>
        <HeaderNavbar/>
        <h1>Home</h1>
        <h2>Welcome back, {this.state.user.first}!</h2>
        <h1>Status: {this.state.user.logged_in ? "Logged in" : "Logged out"}</h1>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}