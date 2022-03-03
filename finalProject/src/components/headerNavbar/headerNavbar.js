import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SmallOgLogo from '../../../static/images/small_og_logo.png';


export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <div className='header-navbar'>
          <div>
            {this.props.hideSmallLogo ? null  : <img className='SmallOgLogo' src={SmallOgLogo}/>} 
          </div>
          <Link onClick={this.props.handleLogout} className='header-navbar__title' to='/'>Onomichi Junior and Senior High School</Link>
          {window.sessionStorage.token ? <FontAwesomeIcon onClick={this.props.handleLogout} className='header-navbar__logout-icon' icon="right-from-bracket" /> : null}
        </div>
      </div>
    );
  }
}