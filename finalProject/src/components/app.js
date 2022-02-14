import React, { Component } from 'react';
import TitlePage from './body/titlePage';
import HeaderNavbar from './headerNavbar/headerNavbar';

export default class App extends Component {
  render() {
    return (
      <div>
        <HeaderNavbar />
        <TitlePage />
      </div>
    );
  }
}
