import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import SmallOgLogo from '../../../static/images/small_og_logo.png';

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "",
      role: this.props.role
    }

    this.handleRedirect = this.handleRedirect.bind(this)
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.loggedInStatus !== nextProps.loggedInStatus) {
      return {
        loggedInStatus: nextProps.loggedInStatus,
        role: nextProps.role
      }
    }
    return null
  }

  handleRedirect(role) {
    if (role === 'Student') {
    this.props.handleLogin
    this.props.history.push('/home')
    }
    else if (role === 'Instructor') {
    this.props.handleLogin
    this.props.history.push('/instructor/home')
    }
    else if (role === 'Administrator') {
      this.props.history.push('/admin/home')
    } else {
      this.props.history.push('/')
    }
}

  render () {
    return (
        <div className='header-navbar'>
          <div>
            {this.props.loggedInStatus === "LOGGED_IN" ? <img className='SmallOgLogo' src={SmallOgLogo} /> : null } 
          </div>
          <div className='header-navbar__title' onClick={() => this.handleRedirect(this.state.role)}>Junior and Senior High School</div>
          <div className='header-navbar__logout-button'>{this.state.loggedInStatus === "LOGGED_IN" ? <FontAwesomeIcon onClick={this.props.handleLogout} className='header-navbar__logout-icon' icon="right-from-bracket" /> : null}</div>
        </div>
    );
  }
}

withRouter(HeaderNavbar)