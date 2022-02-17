
import React, { Component } from 'react';

import axios from 'axios';
import HeaderNavbar from '../headerNavbar/headerNavbar';

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
      console.log("response", response)
    })
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <HeaderNavbar />
        <div className='register-page-wrapper'>
          <div className='register-heading'>Register
            <form className='register-form' onSubmit={this.handleSubmit}>
              <label>First Name</label>
              <input 
              className='register-form__first-name'
              type="text"
              name="first"
              placeholder="first"
              value={this.state.first}
              onChange={this.handleChange}
              />

              <label>Last Name</label>
              <input 
              className='register-form__last-name'
              type="text"
              name="last"
              placeholder="last"
              value={this.state.last}
              onChange={this.handleChange}
              />

              <label>Email</label>
              <input 
              className='register-form__e-mail'
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              />

              <label>Course</label>
              <select className='register-form__course' name="course" value={this.state.course} onChange={this.handleChange}>
                <option value="1-1">1-1</option>
                <option value="2-1">2-1</option>
                <option value="2-2">2-2</option>
                <option value="3-1">3-1</option>
              </select>

              <label>Create Password</label>
              <input
              className='register-form__password'
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              />

              <label>Confirm Password</label>
              <input
              className='register-form__confirm-password'
              type="password"
              name="confirm_password"
              placeholder="confirm password"
              value={this.state.confirm_password}
              onChange={this.handleChange}
              />
              <div>
                <button className='create-acct-button' type="submit">Create Account</button>
              </div>
            </form>
            </div>
          </div>
        </div>
    );
  }
}