import React, { Component } from 'react';

import axios from 'axios';
import { withRouter } from 'react-router';

import GreenButton from '../helpers/greenButton';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: "",
      last: "",
      email: "",
      course: "1-1",
      password: "",
      confirm_password: "",
      role: "Student"
    }
    this.handleChange = this.handleChange.bind(this)
    // this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
  }

  // handlePassword() { // future versions
  //   let regex = /^[a-zA-Z]+$/
  //   if (this.state.password.length < 7 || this.state.password.length > 15) {
  //     return "green"
  //   }
  //   else if (.test(this.state.password)) {
  //     console.log("letters only")
  //   }
  // }
  
  async handleSubmit(event) {
    if (this.state.role === "Student") {
    await axios.post('http://127.0.0.1:5000/register-student',
    {
      "first": this.state.first,
      "last": this.state.last,
      "email": this.state.email,
      "course": this.state.course,
      "role": this.state.role,
      "password": this.state.password
    },
    // { withCredentials: true } // How to get this working?
    ).then(response => {
      if (response.status === 200) return response;
      else alert("There was an error");
    })
    .catch(error => {
      console.log("registration error", error);
    })
    this.props.history.push("/login")
    // event.preventDefault();
  } else {
    axios.post('http://127.0.0.1:5000/register-instructor/',
    {
      "first": this.state.first,
      "last": this.state.last,
      "email": this.state.email,
      "course": this.state.course,
      "password": this.state.password
    },
    // { withCredentials: true } // How to get this working?
    ).then(response => {
      if (response.status === 200) return response;
      else alert("There was an error");
    })
    .catch(error => {
      console.log("registration error", error);
    })
    this.props.history.push("/login")
    // event.preventDefault();
  }} 

  render () {
    // var password = document.getElementsByClassName('register-form__password')
    // var confirm_password = document.getElementsByClassName('register-form__label-confirm-password');

    // function validatePassword() {
    //   if (password.value !== confirm_password.value) {
    //     confirm_password.setCustomValidity("Passwords Don't Match");
    //   } else {
    //     confirm_password.setCustomValidity('');
    //   }
    // }

    // password.onChange = validatePassword;
    // confirm_password.onChange = validatePassword;
    return (
      <div className='register-page-wrapper'>
        <form className='register-form' onSubmit={this.handleSubmit}>
          <div className='register-heading'>Register</div>
            <label className='register-form__first-label' htmlFor='first'>First name</label>
              <input 
              className='register-form__first-name'
              label='First Name'
              type="text"
              name="first"
              placeholder="first"
              value={this.state.first}
              onChange={this.handleChange}
              required
              />

            <label className='register-form__last-label' htmlFor='last'>Last Name</label>
              <input 
              className='register-form__last-name'
              type="text"
              name="last"
              placeholder="last"
              value={this.state.last}
              onChange={this.handleChange}
              required
              />

            <label className='register-form__email-label' htmlFor='email'>Email</label>
              <input 
              className='register-form__e-mail'
              type="email"
              name="email"
              placeholder="email"
              autoComplete="username"
              value={this.state.email}
              onChange={this.handleChange}
              />

            <label className='register-form__label-course' htmlFor='course'>Course</label>
              <select className='register-form__course' name="course" value={this.state.course} onChange={this.handleChange}>
                <option value="1-1">Junior High TEIE 1-1</option>
                <option value="2-1">Junior High TEIE 2-1</option>
                <option value="2-2">Junior High TEIE 2-2</option>
                <option value="3-1">Junior High TEIE 3-1</option>
              </select>

            <label className='register-form__label-role' htmlFor='role'>Are you a...</label>
              <select className='register-form__role' name="role" value={this.state.role} onChange={this.handleChange}>
                <option value="Student">Student</option>
                <option value="Instructor">Teacher</option>
              </select>

            <label className='register-form__label-password' htmlFor='password'>Create Password</label>
              <input
              className='register-form__password'
              type="password"
              name="password"
              placeholder="password"
              autoComplete="new-password"
              value={this.state.password}
              // onChange={(e) => {this.handleChange(e); this.handlePassword()}}
              onChange={this.handleChange}
              required
              />

            <label className='register-form__label-confirm-password' htmlFor='confirm_password'>Confirm Password</label>
              <input
              className='register-form__confirm-password'
              type="password"
              name="confirm_password"
              placeholder="confirm password"
              autoComplete="new-password"
              value={this.state.confirm_password}
              onChange={this.handleChange}
              required
              />

            <ul className='password-suggestions'>Password Security Suggestions
              <li>8-16 characters</li>
              <li>Roman characters only</li>
              <li>At least one number</li>
              <li>At least one symbol</li>
            </ul> 
            
            {this.state.password === this.state.confirm_password ? null : <div className='passwords-match'>Password and Confirm Password Fields Must Match</div>}
            <div className='button-wrapper'>
              <GreenButton className={this.state.password === this.state.confirm_password ? 'green-button' : 'green-button__inactive'} to='' onClick={this.handleSubmit} text="Create Account" />
              <GreenButton className='green-button' to='/' text="Return to Title Screen" />
            </div>
          </form>
        </div>
    );
  }
}

withRouter(Register)