import axios from 'axios';
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import PageTitler from '../helpers/pageTitler';
import GreenButton from '../helpers/greenButton';

export default class Home extends Component {
  constructor(props) {
    super(props)

     this.state = {
       user: []
     }
  }

  componentDidMount() {
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
        <div className="button-wrapper">
          <GreenButton className="green-button-study" to="/study" text="Study" />
          <GreenButton className="green-button-test" to="/test" text="Daily Test" />
        </div>

        <div className="explanations-wrapper">
          <div className="explanations-wrapper__study">In study mode, you can view the cards that will be on your daily test. You can do this for as long as you like without making any permanent changes to your study record. It is best to study throughout the day in small batches and to be sure and give it a final go before taking your daily test so you can do as best as you can!</div>
          <div className="explanations-wrapper__test">For "Let's Go!" to work properly, you need to take a test everyday. This is known as your daily test and shouldn't take too much of your time. Words that you consistently answer correctly will be shown to you less often. Words that you are having a hard time with will be shown to you more often. Be aware, although a word may come very rarely, they never completely go out of your word bank, so keep studying!</div>
        </div>
      </div>
    );
  }
}