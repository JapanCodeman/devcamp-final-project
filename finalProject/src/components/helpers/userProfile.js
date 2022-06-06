import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
  }

  saveChanges(id, data) {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        }
      }
    axios.patch(`http://127.0.0.1:5000/update-user/${id}`, JSON.stringify(data), config)
    .catch(error => {
      console.log("There was an error with the patch request to instructor", error)
    })
    // window.alert("Changes saved, confirm with new search")
  }

  handleClick = value => () => {
    console.log(value);
  };

  render () {
    return (
      <div>
        <div className="user-profile-page-wrapper">
          <label className="user-profile-info__first-name-label" htmlFor="first-name">First Name</label>
            <input className="user-profile-info__first-name" defaultValue={this.props.first} name="first" onChange={this.handleChange} />
          <label className="user-profile-info__last-name-label" htmlFor="last-name">Last Name</label>
            <input className="user-profile-info__last-name"  defaultValue={this.props.last} name="last" onChange={this.handleChange} />
          <label className="user-profile-info__email-label" htmlFor="email">Email</label>
            <input className="user-profile-info__email"  defaultValue={this.props.email} name="email" onChange={this.handleChange} />
          <label className="user-profile-info__logged-status-label" htmlFor="logged-status">Logged Status</label>
            <div className="user-profile-info__logged-status" name="logged_in">{this.props.logged_in}</div> 
          <label className='user-profile-info__course-label' htmlFor='course'>Course</label>
            {this.props.role === "Administrator" ? null

            :

            <select className="user-profile-info__course" defaultValue={this.props.course} name="course" onChange={this.handleChange}>
              <option value="1-1">Junior High TEIE 1-1</option>
              <option value="2-1">Junior High TEIE 2-1</option>
              <option value="2-2">Junior High TEIE 2-2</option>
              <option value="3-1">Junior High TEIE 3-1</option>
              <option value="Instructors">Instructors</option>
              <option value="Administrators">Administrators</option>
            </select>}
          <label className="user-profile-info__role-label" htmlFor="role">Role</label>
            <select className="user-profile-info__role" name="role" defaultValue={this.props.role} onChange={this.handleChange}>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Administrator">Administrator</option>
            </select>
          <div className="user-profile-info__edit-button" onClick={() => this.saveChanges(this.props.id, this.state)}><FontAwesomeIcon icon="pen-square" /></div>
        </div>
      </div>
    );
  }
}