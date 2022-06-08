import React, { Component } from 'react';
import GreenButton from '../helpers/greenButton';
import PageTitler from '../helpers/pageTitler';

export default class PageNotFound extends Component {
  render() {
    return (
      <div className="page-not-found-wrapper">
        <PageTitler className="page-not-found" title="Sorry, this page doesn't exist" />
        <GreenButton className="page-not-found__green-button" to="/" text="Back to Title Screen" />
      </div>
    );
  }
}