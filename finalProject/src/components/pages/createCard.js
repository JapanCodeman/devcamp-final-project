import React, { Component } from 'react';

export default class CreateCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      set_name: this.props.setName,
      word: "",
      meaning: "",
      box_number: 0,
      guessed_correctly_count: 0 
      } 
  
      this.handleChange = this.handleChange.bind(this)
      this.setAndCreateCard = this.setAndCreateCard.bind(this)
    }

    handleChange(event) {
      this.setState({
      [event.target.name] : event.target.value
    })
    }

    setAndCreateCard() {
      this.setState({
        set_name: this.props.setName
      })
      this.setState({
        set_name: this.props.setName
      })
      {this.props.handleAddCardToSet(this.state)} 
    }


  render () {
    return (
      <div className='create-card'>
        <label className='create-card__word-label'>Word</label>
        <input className='create-card__word-input' placeholder='Your word' name="word" onChange={this.handleChange} />

        <label className='create-card__meaning-label'>Meaning</label>
        <input className='create-card__meaning-input' placeholder='Meaning' name="meaning" onChange={this.handleChange}/>

        <label className='create-card__image-label'>Image Dropzone</label>
        <div className='create-card__image-drop' />
        <button className='create-card__submit-button' onClick={this.setAndCreateCard}>Click Me</button>
      </div>
    );
  }
}