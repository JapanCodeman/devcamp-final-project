import React, { Component } from 'react';

import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      role: "Student",
      user: []
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
    event.preventDefault(); 
      axios.post('http://127.0.0.1:5000/login',
      {
        "email": this.state.email,
        "password": this.state.password
      })
      .then(response => {
        if (response.status === 200) {
          return response}
        else alert("There was an error");
      })
      .then(data => {
        var token = data.data.token
        window.sessionStorage.setItem("token", token)
        var decoded = jwtDecode(token)
        this.setState({
          role: decoded.sub.role
        })
        this.props.handleLogin(this.state.email)
        if (decoded.sub.role === "Student") {
          this.props.history.push('/home')
        } else {
          this.props.history.push('/instructor/home')
        }
      })
      .catch(error => {
        console.log("There was an error!", error)
      })
}

  render () {
    return (
      <div>
        <div className='login-page-wrapper'>
          <form className='login-form' onSubmit={this.handleSubmit}>
            <div className='login-form__login-heading'>Login</div>
              <label className='login-form__email-label' htmlFor='email'>Email</label>
                <input 
                className='login-form__email'
                type="email"
                name="email"
                autoComplete="username"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
                />
              <label className='login-form__password-label' htmlFor='password'>Password</label>
                <p className='login-form__password-incorrect'>Password incorrect, try again</p>
                <input 
                className='login-form__password'
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                />
              <button type="submit" className='login-form__login-button'>Login</button>
              <Link className='login-form__forgot-password' to='/reset-password'>
                Forgot Password?
              </Link>
          </form>
        </div>
      </div>
    );
  }
}

withRouter(Login)