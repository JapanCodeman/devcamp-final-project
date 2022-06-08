import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';

import GreenButton from '../helpers/greenButton';
import LoadingPage from '../helpers/loadingPage';
import PageTitler from '../helpers/pageTitler';

export default class InstructorHome extends Component {
  constructor(props) {
  super(props) 
    
    this.state = {
      first: ""
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
        {this.state.first === "" ? <LoadingPage /> : null }
        <PageTitler className='instructor-home__title' title={'Instructor Home'}/> 
        <PageTitler className='instructor-home__welcome-back' title={`Welcome back, ${this.state.first}!`}/>
        <div className='instructor-home__green-button-links'>
          <GreenButton className='green-button__instructor' to='/instructor/create' text="Create a Set" />
          <GreenButton className='green-button__instructor' to='/instructor/modify' text="Modify a Set" />
        </div>
      </div>
    );
  }
}