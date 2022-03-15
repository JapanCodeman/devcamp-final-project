import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SmallOgLogo from '../../../static/images/small_og_logo.png';

class HeaderNavbar extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleLogout() {
    window.sessionStorage.clear();
    this.props.history.push('/');
  }

  handleRedirect() {
    this.props.history.push('/home')
  }


  render () {
    return (
      <div>
        <div className='header-navbar'>
          <div>
            {this.props.hideSmallLogo ? null  : <img className='SmallOgLogo' src={SmallOgLogo}/>} 
          </div>
          <div className='header-navbar__title' onClick={this.handleRedirect}>Onomichi Junior and Senior High School</div>
          <div className='header-navbar__logout-button'>{window.sessionStorage.token ? <FontAwesomeIcon onClick={this.handleLogout} className='header-navbar__logout-icon' icon="right-from-bracket" /> : null}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderNavbar)