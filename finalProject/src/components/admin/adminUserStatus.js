import React, { Component } from 'react';
import HeaderNavbar from '../headerNavbar/headerNavbar';
import axios from 'axios';

import PageTitler from '../helpers/pageTitler';
import UserProfile from '../pages/userProfile';

export default class UserStatus extends Component {
  constructor(props) {
  super(props)
 
  this.state = {
    searchParams: "",
    users: []
  }
  this.handleChange = this.handleChange.bind(this)
  this.getUsers = this.getUsers.bind(this)
}  

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
  }

  getUsers() {
    const query = this.state.searchParams
      axios.get("http://127.0.0.1:5000/students/")
      .then(response => {
        this.setState({
          users : [...response.data]
        })
      })
    }

  render () {
    return (
      <div>
        <HeaderNavbar/>
        <PageTitler className='page-titler' title={"User Status"}/>
        <div className='user-status-page-wrapper'>
          <label className='user-status__selector-label' htmlFor='searchParams'>Select Users</label>
                  <select className='user-status__search-params' name="searchParams" value={this.state.searchParams} onChange={this.handleChange}>
                    <option value="1-1">Junior High TEIE 1-1</option>
                    <option value="2-1">Junior High TEIE 2-1</option>
                    <option value="2-2">Junior High TEIE 2-2</option>
                    <option value="3-1">Junior High TEIE 3-1</option>
                    <option value="Instructors">Instructors</option>
                    <option value="Administrators">Administrators</option>
                  </select>
            <button className='user-status__search-button' onClick={this.getUsers}>Search</button>
            <div className='user-status__results'>
              {this.state.users ? this.state.users.map(user => <UserProfile key={user["_id"]} first={user.first} last={user.last} email={user.email} logged_in={user.logged_in} role={user.role}/>) : null}
            </div>
          </div>
      </div>
    );
  }
}
