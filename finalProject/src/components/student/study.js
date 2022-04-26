import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';

import GreenButton from '../helpers/greenButton';
import StudyCard from '../helpers/studyCard';
import DialogBox from '../modals/dialogBoxModal';

export default class StudentStudy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogBoxOpen: true,
      cardIds: [],
      cards: []
    }

    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleLoadNextCard = this.handleLoadNextCard.bind(this)
  }

  async componentDidMount() {
    const token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token)
    const email = decoded.sub.email
    await axios
    .get(`http://127.0.0.1:5000/student-email/${email}`)
    .then(response => {
      this.setState({
        ...response.data
      })
    })
    .catch(error => {
      console.log("Error in retrieving user info on component mount", error)
    })
    await axios
    .get(`http://127.0.0.1:5000/get-new-cards/${this.state.course}`)
    .then(response => {
      this.setState({
        cardIds: [...response.data]
      })
    })
    .catch (error => {
      console.log("Error in getting student data", error)
    })
    {this.state.cardIds.forEach(card =>
      this.state.vocabulary_box_one.push(card))}
    
    const studyArray = []
    for (let i = 0; i < this.state.vocabulary_box_one.length; i++) {
    await axios
    .get(`http://127.0.0.1:5000/get-card-by-id/${this.state.vocabulary_box_one[i]}`)
    .then(response => 
      studyArray.push(response.data)
      )
    }
    this.setState({
      cards: [...studyArray]
    })
  }
    

  handleModalClose() {
    this.setState({
      dialogBoxOpen: false
    })
  }

  handleLoadNextCard() {
    let card_number = 0
    axios
    .get(`http://127.0.0.1:5000/get-card-by-id/${this.state.vocabulary_box_one[card_number]}`)
    .then(response => 
      console.log(response.data.word))
      card_number++
  }

  render () {
    return (
      <div className='study-page'>
        <DialogBox modalIsOpen={this.state.dialogBoxOpen} handleModalClose={this.handleModalClose}/>
        {/* {this.state.cards.map(card => <EditCard key={card._id} id={card._id} handleUpdateCard={this.handleUpdateCard} created_by={card.created_by} set_name={card.set_name} course={card.course} word={card.word} meaning={card.meaning} />)} */}
        {this.state.cards.map(card => <StudyCard key={card.public_id} word={card.word} meaning={card.meaning} />)}
        <button onClick={this.handleLoadNextCard}>Click to load next card</button>
        <GreenButton className='study-page__quit-button' to='/home' text="Quit" onClick={this.handleModalClose} />
      </div>
    );
  }
}