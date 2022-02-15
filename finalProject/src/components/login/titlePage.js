import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ogLogo from '../../../static/images/OG_logo.jpg';
import history from '../../history';
import HeaderNavbar from '../headerNavbar/headerNavbar';

export default class TitlePage extends Component {
  render () {
    return (
      <div>
        <HeaderNavbar/>
        <div className='title-page-wrapper'>
          <div className='title-page-text'>
            <h1>Let's Go! Vocabulary Study System</h1>
          </div>
          <div className='title-page-logo'>
            <img src={ogLogo} />
          </div>
            
          <div className='button-wrapper'>
            <Link to='/register' className='green_button'>
              Register
            </Link>
            <Link to='/sign-in' className='green_button'>
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}