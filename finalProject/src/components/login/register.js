
import React, { Component } from 'react';

import axios from 'axios';
import HeaderNavbar from '../headerNavbar/headerNavbar';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "",
      last: "",
      email: "",
      course: "",
      password: "",
      confirm_password: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    axios.post('http://127.0.0.1:5000/register-student',
    {
      "first": this.state.first,
      "last": this.state.last,
      "email": this.state.email,
      "course": this.state.course,
      "password": this.state.password
    },
    // { withCredentials: true } // How to get this working?
    ).then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log("registration error", error);
    })
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <HeaderNavbar />
        <div className='register-page-wrapper'>
          <form className='register-form' onSubmit={this.handleSubmit}>
            <div className='register-heading'>Register</div>
              <label className='register-form__first-label' for='first'>First name</label>
                <input 
                className='register-form__first-name'
                label='First Name'
                type="text"
                name="first"
                placeholder="first"
                value={this.state.first}
                onChange={this.handleChange}
                />

              <label className='register-form__last-label' for='last'>Last Name</label>
                <input 
                className='register-form__last-name'
                type="text"
                name="last"
                placeholder="last"
                value={this.state.last}
                onChange={this.handleChange}
                />

              <label className='register-form__email-label' for='email'>Email</label>
                <input 
                className='register-form__e-mail'
                type="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
                />

              <label className='register-form__label-course' for='course'>Course</label>
                <select className='register-form__course' name="course" value={this.state.course} onChange={this.handleChange}>
                  <option value="1-1">Junior High TEIE 1-1</option>
                  <option value="2-1">Junior High TEIE 2-1</option>
                  <option value="2-2">Junior High TEIE 2-2</option>
                  <option value="3-1">Junior High TEIE 3-1</option>
                </select>

              <label className='register-form__label-password' for='password'>Create Password</label>
                <input
                className='register-form__password'
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
                />

              <label className='register-form__label-confirm-password' for='confirm_password'>Confirm Password</label>
                <input
                className='register-form__confirm-password'
                type="password"
                name="confirm_password"
                placeholder="confirm password"
                value={this.state.confirm_password}
                onChange={this.handleChange}
                />

              <ul className='password-requirements'>Password Requirements
                <li>8-16 characters</li>
                <li>Roman characters only</li>
                <li>At least one number</li>
                <li>At least one symbol</li>
              </ul> 
              
              <div className='button-wrapper'>
                <Link className='create-acct-button' onClick={this.handleSubmit}>Create Account</Link>
                <Link type='button' className='return-to-home' to='/'>Return to Title Screen</Link>
              </div>
            </form>
          </div>
        </div>
    );
  }
}