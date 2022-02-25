import React, { Component } from 'react';

import Profile from './profile';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
  }

  handleSuccessfulLogin(data) {
    // TODO update parent component
    this.props.history.push("/profile")
  }

  render () {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <Profile handleSuccessfulLogin={this.handleSuccessfulLogin}/>
      </div>
    );
  }
}