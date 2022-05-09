import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GreenButton extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <Link className={this.props.className} to={this.props.to} text={this.props.text} onClick={this.props.onClick}>{this.props.text}</Link>
      </div>
    );
  }
}