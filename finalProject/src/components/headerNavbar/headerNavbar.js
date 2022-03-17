import React, { Component, PureComponent } from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import jwtDecode from 'jwt-decode';

import SmallOgLogo from '../../../static/images/small_og_logo.png';

export default class HeaderNavbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
      role: ""
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }
  
  handleLogout() {
    this.setState({role: ""})
    window.sessionStorage.clear();
    window.location.replace('/');
  }

  handleRedirect() {
    console.log(this.state.role)
    if(this.state.role == 'Student') {
    window.location.replace('/home') 
    };
    if(this.state.role == 'Instructor') {
    window.location.replace('/instructor/home')
    } else {
      window.location.replace('/')
    }
}

  componentDidMount() {
    console.log(this.state)
    if(window.sessionStorage.getItem("token")){
    let token = window.sessionStorage.getItem("token")
    var decoded = jwtDecode(token)
    console.log( "-->",decoded.sub.role)
    this.setState({isLogged: true})
    this.setState({role:decoded.sub.role})
    }
  }

//   shouldComponentUpdate() {
//     console.log(this.state)
//     if(window.sessionStorage.getItem("token")){
//     let token = window.sessionStorage.getItem("token")
//     var decoded = jwtDecode(token)
//     console.log( "-->",decoded.sub.role)
//     this.setState({role:decoded.sub.role})
//   }
// }


  render () {
    return (
      <div>
        <div className='header-navbar'>
          <div>
            {this.props.hideSmallLogo ? null  : <img className='SmallOgLogo' src={SmallOgLogo}/>} 
          </div>
          <div className='header-navbar__title' onClick={this.handleRedirect}>Onomichi Junior and Senior High School</div>
          <div className='header-navbar__logout-button'>{this.state.isLogged ? <FontAwesomeIcon onClick={this.handleLogout} className='header-navbar__logout-icon' icon="right-from-bracket" /> : null}</div>
        </div>
      </div>
    );
  }
}

withRouter(HeaderNavbar)