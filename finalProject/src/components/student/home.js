import axios from 'axios';
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import PageTitler from '../helpers/pageTitler';
import GreenButton from '../helpers/greenButton';

export default class Home extends Component {
  constructor(props) {
    super(props)

     this.state = {
     }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    var token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token) 
    console.log(decoded)
    const userEmail = decoded.sub.email
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${token}`
        }
      }
    axios.patch(`http://127.0.0.1:5000/update-user-by-email/${userEmail}`, {"logged_in":"false"}, config)
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
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${token}`
        }
      }
    axios.patch(`http://127.0.0.1:5000/update-user-by-email/${userEmail}`, { logged_in: "true" }, config)
    .catch(error => {
      console.log("Patch log status error", error)
    })
    axios.get(`http://127.0.0.1:5000/user-email/${userEmail}`, config)
    .then (user => {
      this.setState({...user.data}
    )  
    })
    .catch(error => {
      console.log("Error in getting user object", error);
    })
    const user = JSON.parse(window.sessionStorage.getItem("User"))
  }

  render () {
    return (
      <div className="student-home">
        <PageTitler title="Home" />
        <PageTitler title={`Welcome back, ${this.state.first}`} />
        <h1 className="student-home__agenda">Would you like to study or take your daily test?</h1>
        <GreenButton to="/study" text="Study" user={this.state} />
        <GreenButton to="/test" text="Daily Test" />
        <GreenButton to='' text="Logout" onClick={this.handleLogout} />
      </div>
    );
  }
}