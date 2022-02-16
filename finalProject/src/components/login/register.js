
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
  }

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event) {
    console.log(event)
    // axios.post('http://127.0.0.1:5000/register') // make sure to run api simultaneously in order to post to axios
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <HeaderNavbar />
        <div className='register-heading'>
          <form onSubmit={this.handleSubmit}>
            <label>First Name</label>
            <input 
            type="text"
            name="first"
            placeholder="first"
            value={this.state.first}
            onChange={this.handleChange}
            />

            <label>Last Name</label>
            <input 
            type="text"
            name="last"
            placeholder="last"
            value={this.state.last}
            onChange={this.handleChange}
            />

            <label>Email</label>
            <input 
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
            />

            <label>Course</label>
            <select name="course" value={this.state.course} onChange={this.handleChange}>
              <option value="1-1">1-1</option>
              <option value="2-1">2-1</option>
              <option value="2-2">2-2</option>
              <option value="3-1">3-1</option>
            </select>

            <label>Create Password</label>
            <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            />

            <label>Confirm Password</label>
            <input
            type="password"
            name="confirm_password"
            placeholder="confirm password"
            value={this.state.confirm_password}
            onChange={this.handleChange}
            />
            <div>
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}