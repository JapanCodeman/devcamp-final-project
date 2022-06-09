import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

export default class LoadingPage extends Component {
  render () {
    return (
      <div className='loading-page'>
        <FontAwesomeIcon className='spinner' icon="fa-solid fa-spinner" spin />
        <h2 className='loading-message'>Loading... Please wait</h2>
      </div>
    );
  }
}