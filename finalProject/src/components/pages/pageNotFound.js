import React, { Component } from 'react';
import PageTitler from '../helpers/pageTitler';

export default class PageNotFound extends Component {
  render () {
    return (
      <div>
        <PageTitler title="Sorry, this page doesn't exist" />
      </div>
    );
  }
}