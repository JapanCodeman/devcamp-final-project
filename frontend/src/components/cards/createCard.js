import React, { Component } from 'react';

export default class CreateCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      created_by: this.props.user,
      set_name: this.props.setName,
      course: this.props.course,
      word: "",
      meaning: "",
      guessed_correctly_count: 0 
      } 
  
      this.handleChange = this.handleChange.bind(this)
      this.handleSetName = this.handleSetName.bind(this)
      this.setAndCreateCard = this.setAndCreateCard.bind(this)
    }

    handleChange(event) {
      this.setState({
      [event.target.name] : event.target.value
      })
    }

    handleSetName() {
      this.setState({
        set_name: this.props.setName
      })
    }

    setAndCreateCard() {
      if (this.state.word && this.state.meaning) {
      {this.props.handleAddCardToSet(this.state)}

      this.setState({
          created_by: this.props.user,
          set_name: this.props.setName,
          word: "",
          meaning: "",
          guessed_correctly_count: 0 
      })} else {
        alert("You must fill in both the word and meaning fields before submitting")
      } 
    }


  render () {
    return (
      <div className='create-card'>
        <label className='create-card__word-label'>Word</label>
        <input className='create-card__word-input' placeholder='Your word' name="word" value={this.state.word} onChange={this.handleChange} onFocus={this.handleSetName} />

        <label className='create-card__meaning-label'>Meaning</label>
        <input className='create-card__meaning-input' placeholder='Meaning' name="meaning" value={this.state.meaning} onChange={this.handleChange} onFocus={this.handleSetName} />

        <label className='create-card__submit-label'>Add Card to Set</label>
        {/* <div className='create-card__image-drop' /> */}
        <button className='create-card__submit-button' onClick={this.setAndCreateCard}>Submit This Card</button>
      </div>
    );
  }
}