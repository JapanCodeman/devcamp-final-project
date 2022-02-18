import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ogLogo from '../../../static/images/OG_logo.jpg';
import HeaderNavbar from '../headerNavbar/headerNavbar';

export default class TitlePage extends Component {
  constructor(props){
    super(props);
    this.state={
      showImage: false
    }
  }

  render () {
    return (
      <div>
        <HeaderNavbar hideSmallLogo/> 
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
            <Link to='/login' className='green_button'>
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}