import React, { Component } from 'react';
import axios from 'axios';

import PageTitler from '../helpers/pageTitler';
import UserProfile from '../helpers/userProfile';

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
    if (this.state.searchParams === "Instructors") {
      axios
      .get('http://127.0.0.1:5000/instructors')
      .then(response => {
        this.setState({
          users: [...response.data]
        })
      })
      .catch(error => {
        console.log("Error in getting data from instructor query", error)
      })
    } else if (this.state.searchParams === "Administrators") {
      axios
      .get('http://127.0.0.1:5000/administrators')
      .then(response => {
        this.setState({
          users: [...response.data]
        })
      })
      .catch(error => {
        console.log("There was an error in the administrator query", error)
      })
    } else {
    axios
    .get(`http://127.0.0.1:5000/users-by-course/${this.state.searchParams}`)
    .then(response => {
      this.setState({
        users: [...response.data]
      })
    })
    .catch(error => {
      "Error in new getUsers function", error})
  }
}

  render () {
    return (
      <div>
        <div className='page-titler-and-selector'>
          <PageTitler className='page-titler-and-selector__page-titler' title={"User Status"}/>          
          <label className='page-titler-and-selector__selector-label' htmlFor='searchParams'>Select Users</label>
            <select className='page-titler-and-selector__search-params' name="searchParams" value={this.state.searchParams} onChange={this.handleChange.bind(this)}>
              <option value="1-1">Junior High TEIE 1-1</option>
              <option value="2-1">Junior High TEIE 2-1</option>
              <option value="2-2">Junior High TEIE 2-2</option>
              <option value="3-1">Junior High TEIE 3-1</option>
              <option value="Instructors">Instructors</option>
              <option value="Administrators">Administrators</option>
            </select>
          <button className='page-titler-and-selector__search-button' onClick={this.getUsers}>Search</button>
        </div>

        <div className='user-status__results'>
          {this.state.users ? this.state.users.map(user => <UserProfile className="user-status__user-profile-component" key={user["_id"]} updateData={this.handleChange} id={user._id} first={user.first} last={user.last} email={user.email} logged_in={user.logged_in} role={user.role} course={user.course}/>) : null}
        </div>
      </div>
    );
  }
}
