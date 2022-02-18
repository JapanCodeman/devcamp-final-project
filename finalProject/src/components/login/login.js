
import React, { Component } from 'react';

import axios from 'axios';
import HeaderNavbar from '../headerNavbar/headerNavbar';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
    axios.post('http://127.0.0.1:5000/login',
    {
      "email": this.state.email,
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
        <div className='login-page-wrapper'>
          <form className='login-form' onSubmit={this.handleSubmit}>
            <div className='login-form__login-heading'>Login</div>
              <label className='login-form__email-label' for='email'>Email</label>
                <input 
                className='login-form__email'
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                />

              <label className='login-form__password-label' for='password'>Password</label>
                <p className='login-form__password-incorrect'>Password incorrect, try again</p>
                <input 
                className='login-form__password'
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                />
              <Link className='login-form__login-button' onClick={this.handleSubmit}>Login</Link>
              <Link className='login-form__forgot-password' to='/reset-password'>
                Forgot Password?
              </Link>
          </form>
        </div>
      </div>
    );
  }
}