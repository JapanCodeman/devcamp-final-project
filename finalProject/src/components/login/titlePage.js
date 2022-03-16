import React, { Component } from 'react';

import ogLogo from '../../../static/images/OG_logo.jpg';
import HeaderNavbar from '../headerNavbar/headerNavbar';
import GreenButton from '../helpers/greenButton';

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
        <div className='title-page-wrapper'>
          <div className='title-page-text'>
            <h1>Let's Go! Vocabulary Study System</h1>
          </div>
          <div className='title-page-logo'>
            <img src={ogLogo} />
          </div>
            
          <div className='button-wrapper'>
            <GreenButton to='/register' text='Register'/>
            <GreenButton to='/login' text='Login' />
          </div>
        </div>
      </div>
    );
  }
}