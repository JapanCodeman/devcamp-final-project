import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import jwtDecode from 'jwt-decode';

import SmallOgLogo from '../../../static/images/small_og_logo.png';

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      role: ""
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.logState = this.logState.bind(this)
  }
  
  handleLogout() {
    this.setState({role: ""})
    window.sessionStorage.clear();
    this.props.history.push('/');
    location.reload()
  }

  handleRedirect(role) {
    console.log(this.state.role)
    if (role === 'Student') {
    this.props.history.push('/home')
    }
    else if (role === 'Instructor') {
    this.props.history.push('/instructor/home')
    }
    else if (role === 'Administrator') {
      this.props.history.push('/admin/home')
    } else {
      this.props.history.push('/')
    }
}

  componentDidMount() {
    if (window.sessionStorage.getItem("token")) {
    let token = window.sessionStorage.getItem("token")
    var decoded = jwtDecode(token)
    this.setState({loggedInStatus: "LOGGED_IN"})
    this.setState({role:decoded.sub.role})
    }

  }

  logState() {
    console.log("this is headerNavbar's state---->", this.state)
  }

  render () {
    return (
      <div>
        <div className='header-navbar'>
          <div>
            {this.props.hideSmallLogo ? null  : <img className='SmallOgLogo' src={SmallOgLogo}/>} 
          </div>
          <div className='header-navbar__title' onClick={() => this.handleRedirect(this.state.role)}>Onomichi Junior and Senior High School</div>
          <div className='header-navbar__logout-button'>{this.state.loggedInStatus === "LOGGED_IN" ? <FontAwesomeIcon onClick={this.handleLogout} className='header-navbar__logout-icon' icon="right-from-bracket" /> : null}</div>
          <button onClick={this.logState}>See State</button>
        </div>
      </div>
    );
  }
}

withRouter(HeaderNavbar)