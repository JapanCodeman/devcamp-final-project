import React, { Component } from 'react';

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>
        <div>{this.props.first}</div>
        <div>{this.props.last}</div>
      </div>
    );
  }
}