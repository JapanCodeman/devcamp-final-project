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

  // componentDidMount() {
  //   this.setState({
  //     _id: this.props.id
  //   })
  // }

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    });
  }

  saveChanges() {
    var token = window.sessionStorage.getItem("token")
    axios
    .patch(`http://127.0.0.1:5000/update-instructor/${id}`, data, { headers: {"Authorization" : `Bearer ${token}`}})
    .catch(error => {
      console.log("There was an error with the patch request to instructor", error)
    })
  }

  handleClick = value => () => {
    console.log(value);
  };

  render () {
    console.log(this.state) - // empty
    console.log(this.state._id) // undefined
    console.log(this.props.id) // string/int?
    console.log(typeof(this.state._id)) // undefined
    return (
      <div>
        <div className="user-profile-page-wrapper">
          <label className="user-profile-info__first-name-label" htmlFor="first-name">First Name</label>
            <input className="user-profile-info__first-name" defaultValue={this.props.first} name="first-name" onChange={this.handleChange} />
          <label className="user-profile-info__last-name-label" htmlFor="last-name">Last Name</label>
            <input className="user-profile-info__last-name"  defaultValue={this.props.last} name="last-name" onChange={this.handleChange} />
          <label className="user-profile-info__email-label" htmlFor="email">Email</label>
            <input className="user-profile-info__email"  defaultValue={this.props.email} name="email" onChange={this.handleChange} />
          <label className="user-profile-info__logged-status-label" htmlFor="logged-status">Logged Status</label>
            <div className="user-profile-info__logged-status" name="logged-status">{this.props.logged_in}</div> 
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
          <div className="user-profile-info__edit-button" onClick={this.handleClick}><FontAwesomeIcon icon="pen-square" /></div>
        </div>
      </div>
    );
  }
}