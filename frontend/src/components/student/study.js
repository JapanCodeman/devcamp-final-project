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
      card_number: 0,
      cards: []
    }

    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleLoadCard = this.handleLoadCard.bind(this)
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
      response.data.forEach(id => {
        if (!this.state.full_card_collection.includes(id)) {
          this.state.full_card_collection.push(id)
        }
      })
    })
    .catch (error => {
      console.log("Error in getting student data", error)
    })

    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${token}`
        }
    }
    
    await axios
    .patch(`http://127.0.0.1:5000/update-user/${this.state._id}`, 
    {
      vocabulary_box_one : this.state.vocabulary_box_one,
      full_card_collection : this.state.full_card_collection
    }, config)

    this.handleLoadCard()
  }

  handleModalClose() {
    this.setState({
      dialogBoxOpen: false
    })
  }

  handleLoadCard() {
    axios
    .get(`http://127.0.0.1:5000/get-card-by-id/${this.state.full_card_collection[this.state.card_number]}`)
    .then(response => 
      this.setState({cards : [response.data]}))
    .catch(error => ("There was an error loading the card", error))
  }

  handleLoadNextCard() {
    let num = this.state.card_number + 1
    if (num >= this.state.full_card_collection.length) {
      num = 0
    }
    this.setState({
      card_number: num
  })
    axios
    .get(`http://127.0.0.1:5000/get-card-by-id/${this.state.full_card_collection[this.state.card_number]}`)
    .then(response => 
      this.setState({cards : [response.data]}))
  }

  render () {
    return (
      <div className='study-page'>
        <DialogBox text="Welcome to the study page! Here you can study today's set of cards for as long as you like. Simply type the definition in the box below and press enter. After entering your answer and either clicking submit answer or pushing the enter key, the card will flip over to reveal the answer. Go to the next card by clicking the next button. You can end at any time by clicking the quit button in the lower right. Happy studying!" className='study-page__modal' modalIsOpen={this.state.dialogBoxOpen} to={"/study"} handleModalClose={this.handleModalClose} />
        {this.state.cards.length === 0 ? <div className='study-page__no-cards'>You don't have any card sets yet, please check back later</div> : this.state.cards.map(card => <StudyCard className="study-card" key={card.public_id} word={card.word} meaning={card.meaning} />)}
        <div className='study-page__button-wrapper'>
          <button className='study-page__next' onClick={this.handleLoadNextCard}>Next</button>
          <GreenButton className='study-page__quit-button' to='/home' text="Quit" onClick={this.handleModalClose} />
        </div>
      </div>
    );
  }
}