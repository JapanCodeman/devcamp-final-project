import React, { Component } from 'react';

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div>
        {this.props.first} {this.props.last} {this.props.email} {this.props.logged_in} {this.props.role}
      </div>
    );
  }
}