import axios from 'axios';
import React, { Component } from 'react';

export default class StudentStudy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }

    // this.getTodaysCards = this.getTodaysCards.bind(this)
  }

  // getTodaysCards() {
  //   axios
  //   .get(`http://127.0.0.1:5000/get-unboxed-cards/${this.state.user.course}`)
  // }

  componentDidMount() {
    this.setState({
      user: [...this.props.user]
    })
    // this.getTodaysCards()
  }

  render () {
    return (
      <div>
        Student Study Page
      </div>
    );
  }
}