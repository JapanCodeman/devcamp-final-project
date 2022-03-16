import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GreenButton extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <Link className='green-button' to={this.props.to} text={this.props.text}>{this.props.text}</Link>
      </div>
    );
  }
}