import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class CreateCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      setName: "",
      word: "",
      meaning: "",
      box_number: 0,
      guessed_correctly_count: 0 
      } 
  
      this.handleChange = this.handleChange.bind(this)
      this.handleWord = this.handleWord.bind(this)
    }

    handleChange(event) {
      this.setState({
      [event.target.value] : event.target.value
    })
    }

    handleMeaning(event) {
      this.setState({
        meaning: event.target.value
      })
    }

    handleWord(event) {
      this.setState({
        word: event.target.value
      })
    }
  

  render () {
    return (
      <div className='create-card'>
        <label className='create-card__word-label'>Word</label>
        <input className='create-card__word-input' placeholder='Your word' onChange={this.handleWord}/>

        <label className='create-card__meaning-label'>Meaning</label>
        <input className='create-card__meaning-input' placeholder='Meaning' onChange={this.handleMeaning}/>

        <label className='create-card__image-label'>Image Dropzone</label>
        <div className='create-card__image-drop' />
        <FontAwesomeIcon className='create-card__minus-icon' icon="fa-solid fa-minus" />
        <FontAwesomeIcon className='create-card__plus-icon' icon="fa-solid fa-plus" onClick={this.props.handleAddCard}/>
        <button className='create-card__submit-button' onClick={this.props.handleCallback}>Click Me</button>
      </div>
    );
  }
}