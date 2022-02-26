import axios from 'axios';
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import HeaderNavbar from '../headerNavbar/headerNavbar';



export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(token) {
    var token = window.sessionStorage.token
    const decoded = jwtDecode(token)
    const userEmail = decoded.sub.email
    axios.get(`http://127.0.0.1:5000/student-email/${userEmail}`)
    .then (user => {
      console.log("Inputting user data to sessionStorage");
      window.sessionStorage.setItem("User", JSON.stringify(user))
    })
    .catch(error => {
      console.log("Error in getting user object", error);
    })
  }



  render () {
    const user = JSON.parse(sessionStorage.user)
    const first = user.first
    return (
      <div>
        <HeaderNavbar/>
        <h1>Home</h1>
        <h2>{first}</h2>
        <h1>Status: </h1>
      </div>
    );
  }
}