import React, { Component } from 'react';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  
    this.handleChange = this.handleChange.bind(this)
  
  }
  

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
      });
  }
  
  componentDidMount() {
    this.setState({
      ...this.props
    })
  }


  render () {
    return (
      <div>
        <div className="user-profile-page-wrapper">
          <label className="user-profile-info__first-name-label" htmlFor="first-name">First Name</label>
            <input className="user-profile-info__first-name" name="first-name" value={this.state.first} onChange={this.handleChange}/>
          <label className="user-profile-info__last-name-label" htmlFor="last-name">Last Name</label>
            <input className="user-profile-info__last-name" name="last-name" value={this.state.last} onChange={this.handleChange}/>
          <label className="user-profile-info__email-label" htmlFor="email">Email</label>
            <input className="user-profile-info__email" name="email" value={this.state.email} onChange={this.handleChange}/> 
          <label className="user-profile-info__logged-status-label" htmlFor="logged-status">Logged Status</label>
            <div className="user-profile-info__logged-status" name="logged-status">{this.state.logged_in}</div> 
          <label className='user-profile-info__course-label' htmlFor='course'>Course</label>
              <select className="user-profile-info__course" name="course" value={this.state.course} onChange={this.handleChange}>
                <option value="1-1">Junior High TEIE 1-1</option>
                <option value="2-1">Junior High TEIE 2-1</option>
                <option value="2-2">Junior High TEIE 2-2</option>
                <option value="3-1">Junior High TEIE 3-1</option>
                <option value="Instructor">Instructor</option>
                <option value="Administrator">Administrator</option>
              </select>
          <label className="user-profile-info__role-label" htmlFor="role">Role</label>
            <select className="user-profile-info__role" name="role" value={this.state.role} onChange={this.handleChange}>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Administrator">Administrator</option>
            </select>
        </div>
      </div>
    );
  }
}