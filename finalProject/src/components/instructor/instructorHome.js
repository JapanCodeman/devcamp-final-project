import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';

import GreenButton from '../helpers/greenButton';
import PageTitler from '../helpers/pageTitler';

export default class InstructorHome extends Component {
  constructor(props) {
  super(props) 
    
    this.state = {

    }
  }

  componentDidMount() {
    var token = window.sessionStorage.getItem("token")
    var decoded = jwtDecode(token)
    const userEmail = decoded.sub.email
    axios
    .get(`http://127.0.0.1:5000/user-by-email/${userEmail}`)
    .then(user => {
      this.setState({...user.data})
    })
    .catch(error => {
      console.log("There was an error in retrieiving the instructor's profile info", error)
    })
  }

  render () {
    return (
      <div className='instructor-home'>
        <PageTitler className='instructor-home__title' title={`Instructor Home Welcome back, ${this.state.first}!`}/>
        <div className='instructor-home__graph-box'>
          <div className='instructor-home__graph-box__title'>Student Progress at a Glance</div>
          <div className='instructor-home__graph-box__graph'>Graph goes here</div>
        </div>
        <div className='instructor-home__green-button-links'>
          <GreenButton className='green-button' to='/instructor/create' text="Create a Set" />
          <GreenButton className='green-button' to='/instructor/modify' text="Modify a Set" />
          <GreenButton className='green-button' to='/instructor/students' text="View Student Progress" />
        </div>
      </div>
    );
  }
}
