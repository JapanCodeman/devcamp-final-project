import React, { Component } from 'react';
import HeaderNavbar from '../headerNavbar/headerNavbar';
import axios from 'axios';

import PageTitler from '../helpers/pageTitler';
import UserProfile from '../pages/profile';

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
    console.log("button clicked")
      axios.get("http://127.0.0.1:5000/students/")
      .then(response => {
        console.log("this is the response", response)
        this.setState({
          users : response
        })
      })
      .catch(error => {
        console.log("there was an error", error)
      })
    }

  
//   axios.get(`http://127.0.0.1:5000/administrator-by-email/${adminEmail}`, { headers: {"Authorization" : `Bearer ${token}`}})
//   .then (Admin => {
//     console.log(Admin)
//     this.setState({
//       admin : Admin.data
//     })
//   })
//   .catch(error => {
//     console.log("Error in getting admin object", error);
//   })
// }

  render () {
    return (
      <div>
        <HeaderNavbar/>
        <PageTitler className='page-titler' title={"User Status"}/>
        <label className='user-status__selector-label' htmlFor='users'>Select Users</label>
                <select className='register-form__course' name="searchParams" value={this.state.searchParams} onChange={this.handleChange}>
                  <option value="1-1">Junior High TEIE 1-1</option>
                  <option value="2-1">Junior High TEIE 2-1</option>
                  <option value="2-2">Junior High TEIE 2-2</option>
                  <option value="3-1">Junior High TEIE 3-1</option>
                  <option value="Instructors">Instructors</option>
                  <option value="Administrators">Administrators</option>
                </select>
        <button onClick={this.getUsers}>Search</button>
        {this.state.users.map(users => (
          <div>
            <UserProfile />
          </div>
        ))}
        
      </div>
    );
  }
}