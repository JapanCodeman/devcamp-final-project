import React, { Component } from 'react';
import PageTitler from '../helpers/pageTitler';
import CreateCard from './createCard';

export default class CreateCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {(
    this.setState({
      [event.target.value] : event.target.value})
  )}

  handleSubmit(event) {
    console.log(this.state)
  }

  render () {
    return (
      <div className='create-cards-wrapper'>
        <PageTitler className="create-cards-title" title="Create Cards" />
        <CreateCard className="create-cards-card"/>
      </div>
    );
  }
}