import React, { Component } from 'react';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      role: "Student",
      user: [],
      userOrPassIncorrect: false
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
      .then(data => {
        if (data.status === 401) {
          this.setState({
            userOrPassIncorrect: true
          })
        }
        var token = data.data.token
        window.sessionStorage.setItem("token", token)
        var decoded = jwtDecode(token)
        this.setState({
          role: decoded.sub.role
        })
        this.props.handleLogin(this.state.email)
        if (decoded.sub.role === "Student") {
          // this.props.handleNotLoading
          this.props.history.push('/home')
        } else if (decoded.sub.role === "Administrator") {
          this.props.history.push('/admin/home') }
          else {
          this.props.history.push('/instructor/home')
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({
            userOrPassIncorrect: true
          })
        }
      }
    )
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
                {this.state.userOrPassIncorrect ? <p className='login-form__password-incorrect'>Username or Password incorrect, try again</p> : null}
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
          </form>
        </div>
      </div>
    );
  }
}

withRouter(Login)