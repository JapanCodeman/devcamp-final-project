import React, { Component } from 'react';

export default class CreateCard extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
    [event.target.value] : event.target.value})
  }

  render () {
    return (
      <div className='create-card'>
        <label className='create-card__word-label'>Word</label>
        <input className='create-card__word-input' placeholder='Your word' />

        <label className='create-card__meaning-label'>Meaning</label>
        <input className='create-card__meaning-input' placeholder='Meaning' />

        <label className='create-card__image-label'>Image Dropzone</label>
        <div className='create-card__image-drop' />
      </div>
    );
  }
}