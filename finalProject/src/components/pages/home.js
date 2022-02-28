import axios from 'axios';
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import HeaderNavbar from '../headerNavbar/headerNavbar';


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    window.sessionStorage.clear()
    this.props.history.push('/')
  }

  componentDidMount() {

    // var token = window.sessionStorage.token
    // const decoded = jwtDecode(token) 
    // const userEmail = decoded.sub.email
    // axios.get(`http://127.0.0.1:5000/student-email/${userEmail}`, { headers: {"Authorization" : `Bearer ${token}`}})
    // .then (User => {
    //   console.log("Inputting user data to sessionStorage");
    //   window.sessionStorage.setItem("User", JSON.stringify(User))
    // })
    // .catch(error => {
    //   console.log("Error in getting user object", error);
    // })
  }

  componentWillUnmount() {
    window.sessionStorage.clear()
  }

  render () {
    var token = window.sessionStorage.token
    const decoded = jwtDecode(token) 
    const userEmail = decoded.sub.email
    axios.get(`http://127.0.0.1:5000/student-email/${userEmail}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then (User => {
      console.log("Inputting user data to sessionStorage");
      window.sessionStorage.setItem("User", JSON.stringify(User))
    })
    .catch(error => {
      console.log("Error in getting user object", error);
    })

    // console.log(JSON.parse(window.sessionStorage.User))
    const user = JSON.parse(window.sessionStorage.getItem("User"))
    const first = user.data.first
    
    return (
      <div>
        <HeaderNavbar/>
        <h1>Home</h1>
        <h2>Welcome back, {first}!</h2>
        <h1>Status: </h1>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}