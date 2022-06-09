import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';

import GreenButton from '../helpers/greenButton';
import StudyCard from '../helpers/studyCard';
import DialogBox from '../modals/dialogBoxModal';

export default class StudySet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogBoxOpen: true,
      cardIds: [],
      card_number: 0,
      cards: [],
      set: []
    }

    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleLoadCard = this.handleLoadCard.bind(this)
    this.handleLoadNextCard = this.handleLoadNextCard.bind(this)
  }

  async componentDidMount() {
    const studySet = window.sessionStorage.getItem("studySet")
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
    .get(`http://127.0.0.1:5000/card-public-id-by-setname/${studySet}`)
    .then(response => {
      this.setState({
        set: [...response.data]
      })
    })
    this.handleLoadNextCard()
  }

  handleModalClose() {
    this.setState({
      dialogBoxOpen: false
    })
  }

  handleLoadCard() {
    
    axios
    .get(`http://127.0.0.1:5000/get-card-by-id/${this.state.set[this.state.card_number]}`)
    .then(response => 
      this.setState({cards : [response.data]}))
    .catch(error => ("There was an error loading the card", error))
    this.setState({
      card_number : card_number + 1
    })
  }

  handleLoadNextCard() {
    let num = this.state.card_number + 1
    if (num >= this.state.set.length) {
      num = 0
    }
    this.setState({
      card_number: num
  })
    axios
    .get(`http://127.0.0.1:5000/get-card-by-id/${this.state.set[this.state.card_number]}`)
    .then(response => 
      this.setState({cards : [response.data]}))
  }

  render () {
    return (
      <div className='study-page'>
        <DialogBox text="In this mode, you will only study a certain set of cards based on their category. You will see fewer cards this way and can focus your efforts on a specific set." modalIsOpen={this.state.dialogBoxOpen} handleModalClose={this.handleModalClose}/>
        {this.state.set.length === 0 ? <div className='study-page__no-cards'>You don't have any card sets yet, please check back later</div> : this.state.cards.map(card => <StudyCard className="study-card" key={card.public_id} word={card.word} meaning={card.meaning} />)}
        <div className='study-page__button-wrapper'>
          <button className='study-page__next' onClick={this.handleLoadNextCard}>Next</button>
          <GreenButton className='study-page__quit-button' to='/home' text="Quit" onClick={this.handleModalClose} />
        </div>
      </div>
    );
  }
}