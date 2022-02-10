import React, { Component } from 'react';
import './headerNavbar/headerNavbar';
import HeaderNavbar from './headerNavbar/headerNavbar';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <HeaderNavbar />
        <h1>Let's Go! Vocabulary Study System</h1>
        <img className='OG-logo' src='../static/images/OG_logo.jpg' />
      </div>
    );
  }
}
