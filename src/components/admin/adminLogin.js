import React, { Component } from 'react';

import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default class AdministratorLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      role: "",
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
    axios.get(`http://127.0.0.1:5000/user-by-email/${this.state.email}`)
    .then(response => {
      this.setState({
        user: [...response.data]
      })
    })
    .catch(error => {
      console.log("There was an error", error)
    })
    axios.post('http://127.0.0.1:5000/login',
    {
      "email": this.state.email,
      "password": this.state.password
    })
    // { withCredentials: true } // How to get this working?
    .then(response => {
      if (response.status === 200) return response;
      else alert("There was an error");
    })
    .then(data => {
      const token = data.data.token
      const decoded = jwtDecode(token)
      const role = decoded.sub.role
      if (role !== "Administrator") {
        return alert("You are not an administrator")
      }
      window.sessionStorage.setItem("token", token)
      this.setState({
        role: role
      })
      this.props.history.push("/admin/home")
    })
    .catch(error => {
      console.log("There was an error!", error);
    })
  }


  render () {
    return (
      <div>
        <div className='admin-login-page-wrapper'>
          <form className='admin-login-form' onSubmit={this.handleSubmit}>
            <div className='admin-login-form__login-heading'>Administrator Login</div>
              <label className='admin-login-form__email-label' htmlFor='email'>Email</label>
                <input 
                className='admin-login-form__email'
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
                />

              <label className='admin-login-form__password-label' htmlFor='password'>Password</label>
                <p className='admin-login-form__password-incorrect'>Password incorrect, try again</p>
                <input 
                className='admin-login-form__password'
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                />
              <button type="submit" className='admin-login-form__login-button'>Login</button>
              <Link className='admin-login-form__forgot-password' to='/reset-password'>
                Forgot Password?
              </Link>
          </form>
        </div>
      </div>
    );
  }
}

withRouter(AdministratorLogin)