import React, { Component } from 'react';

export default class EditCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      created_by: "",
      set_name: "",
      course: "",
      word: "",
      meaning: "",
      box_number: 0,
      guessed_correctly_count: 0 
      } 
  
      this.handleChange = this.handleChange.bind(this)
      this.handleSetName = this.handleSetName.bind(this)
      this.setAndUpdateCard = this.setAndUpdateCard.bind(this)
    }

    componentDidMount() {
      this.setState({
        created_by: this.props.created_by,
        set_name: this.props.set_name,
        course: this.props.course,
        word: this.props.word,
        meaning: this.props.meaning,
        box_number: 0,
        guessed_correctly_count: 0 
      })
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

    setAndUpdateCard() {
      if (this.state.word && this.state.meaning) {
      {this.props.handleUpdateCard({...this.state}, this.props.id)}

      this.setState({
          created_by: this.props.user,
          set_name: this.props.setName,
          word: this.state.word,
          meaning: this.state.meaning,
          box_number: 0,
          guessed_correctly_count: 0 
      })
    alert("Card Updated")} else {
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

        <label className='create-card__submit-label'>Click Below to Update Card</label>
        {/* <div className='create-card__submit-button' /> */}
        <button className='create-card__submit-button' onClick={this.setAndUpdateCard}>Update Card</button>
      </div>
    );
  }
}