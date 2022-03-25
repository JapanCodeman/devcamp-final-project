import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import jwtDecode from 'jwt-decode';

import SmallOgLogo from '../../../static/images/small_og_logo.png';

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
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
  }

  handleRedirect() {
    console.log(this.state.role)
    if(this.state.role == 'Student') {
    this.props.history.push('/home') 
    }
    if(this.state.role == 'Instructor') {
    this.props.history.push('/instructor/home')
    }
    if(this.state.role == 'Administrator') {
      this.props.history.push('/admin/home')
    } else {
      this.props.history.push('/')
    }
}

  componentDidMount() {
    if(window.sessionStorage.getItem("token")){
    let token = window.sessionStorage.getItem("token")
    var decoded = jwtDecode(token)
    this.setState({isLogged: true})
    this.setState({role:decoded.sub.role})
    }
  }

  logState() {
    console.log("this is headerNavbar's state---->", this.state)
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
          <button onClick={this.logState}>See State</button>
        </div>
      </div>
    );
  }
}

withRouter(HeaderNavbar)