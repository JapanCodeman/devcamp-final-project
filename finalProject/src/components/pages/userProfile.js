import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div>
        <div className="user-profile-page-wrapper">
          <label className="user-profile-info__first-name-label" htmlFor="first-name">First Name</label>
            <div className="user-profile-info__first-name" name="first-name">{this.props.first}</div>
          <label className="user-profile-info__last-name-label" htmlFor="last-name">Last Name</label>
            <div className="user-profile-info__last-name" name="last-name">{this.props.last}</div>
          <label className="user-profile-info__email-label" htmlFor="email">Email</label>
            <div className="user-profile-info__email" name="email">{this.props.email}</div> 
          <label className="user-profile-info__logged-status-label" htmlFor="logged-status">Logged Status</label>
            <div className="user-profile-info__logged-status" name="logged-status">{this.props.logged_in}</div> 
          <label className='user-profile-info__course-label' htmlFor='course'>Course</label>
            <div className="user-profile-info__course" name="course">{this.props.course}</div>
          <label className="user-profile-info__role-label" htmlFor="role">Role</label>
            <div className="user-profile-info__role" name="role">{this.props.role}</div>
          <div className="user-profile-info__edit-button"><FontAwesomeIcon icon="pen-square"/></div>
        </div>
      </div>
    );
  }
}