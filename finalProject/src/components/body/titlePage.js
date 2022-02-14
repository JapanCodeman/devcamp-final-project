import React, { Component } from 'react';

import ogLogo from '../../static/images/OG_logo.jpg';

export default class TitlePage extends Component {
  render () {
    return (
      <div>
        <div className='title-page-wrapper'>
          <div className='title-page-text'>
            <h1>Let's Go! Vocabulary Study System</h1>
          </div>
          <div className='title-page-logo-wrapper'>
            <img className='OG-logo' src={ogLogo} />
          </div>
          <div className='button-wrapper'>
            <button className='register'>
              Register
            </button>
            <button className='Login'>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}