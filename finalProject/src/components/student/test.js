import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';

import GreenButton from '../helpers/greenButton';
import StudyCard from '../helpers/studyCard';
import DailyTestModal from '../modals/dailyTestModal';

export default class StudentTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogBoxOpen: true,
      card_number: 0,
      card: [],
      todaysTestCards: []
    }

    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleSubmitAnswerAndLoadNextCard = this.handleSubmitAnswerAndLoadNextCard.bind(this)
  }

  async componentDidMount() {
    const overall_study_calendar = [[1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [6,1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [7,1], [2,1], [3,1], [6,2,1], [5,1], [4,2,1], [3,1], [2,1], [1]] 
    console.log("Overall_study_calendar length is: ", overall_study_calendar.length) 
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

    
    const todaysBoxes = overall_study_calendar[this.state.current_box_index]
    console.log("todaysBoxes is assigned to ", todaysBoxes)
    const cardGatherForStateUpdate = []
    todaysBoxes.forEach(box => {
      if (box === 1) {
        this.state.vocabulary_box_one.forEach(card => {
          axios
          .get(`http://127.0.0.1:5000/get-card-by-id/${card}`)
          .then(response => {
            cardGatherForStateUpdate.push(response.data.public_id)
          })
        })
      } 
      else if (box === 2) {
        this.state.vocabulary_box_two.forEach(card => {
          axios
          .get(`http://127.0.0.1:5000/get-card-by-id/${card}`)
          .then(response => {
            cardGatherForStateUpdate.push(response.data.public_id)
          })
        })
      } 
      else if (box === 3) {
        this.state.vocabulary_box_three.forEach(card => {
          axios
          .get(`http://127.0.0.1:5000/get-card-by-id/${card}`)
          .then(response => {
            cardGatherForStateUpdate.push(response.data.public_id)
          })
        })
      } 
      else if (box === 4) {
        this.state.vocabulary_box_four.forEach(card => {
          axios
          .get(`http://127.0.0.1:5000/get-card-by-id/${card}`)
          .then(response => {
            cardGatherForStateUpdate.push(response.data.public_id)
          })
        })
      } 
      else if (box === 5) {
        this.state.vocabulary_box_five.forEach(card => {
          axios
          .get(`http://127.0.0.1:5000/get-card-by-id/${card}`)
          .then(response => {
            cardGatherForStateUpdate.push(response.data.public_id)
          })
        })
      } 
      else if (box === 6) {
        this.state.vocabulary_box_six.forEach(card => {
          axios
          .get(`http://127.0.0.1:5000/get-card-by-id/${card}`)
          .then(response => {
            cardGatherForStateUpdate.push(response.data.public_id)
          })
        })
      }
      else if (box === 7) {
        this.state.vocabulary_box_seven.forEach(card => {
          axios
          .get(`http://127.0.0.1:5000/get-card-by-id/${card}`)
          .then(response => {
            cardGatherForStateUpdate.push(response.data.public_id)
          })
        })
      } else {
        console.log("No cards for test found")
      }
      this.setState({
        todaysTestCards: cardGatherForStateUpdate
      })
    })
    await axios
    .get(`http://127.0.0.1:5000/get-card-by-id/${this.state.todaysTestCards[this.state.card_number]}`)
    .then(response => 
      this.setState({card : [response.data]}))
    .catch(error => ("There was an error loading the card", error))
  }

  handleModalClose() {
    this.setState({
      dialogBoxOpen: false
    })
  }

  handleSubmitAnswerAndLoadNextCard() {
    let num = this.state.card_number + 1
    if (num >= this.state.todaysTestCards.length) {
      num = 0 // change this to axios patch request since this will indicate the end of the daily test? Upload results and append cardIds to appropriate vboxes
    }
    this.setState({
      card_number: num
  })
    axios
    .get(`http://127.0.0.1:5000/get-card-by-id/${this.state.todaysTestCards[this.state.card_number]}`)
    .then(response => 
      this.setState({card : [response.data]}))
    .catch(error => (
      console.log("Error loading card by id", error)))
  }

  render () {
    return (
      <div className='test-page'>
        <DailyTestModal modalIsOpen={this.state.dialogBoxOpen} handleModalClose={this.handleModalClose}/>
        {this.state.card.length === 0 ? <div className='test-page__no-cards'>You don't have any card sets yet, please check back later</div> : this.state.card.map(card => <StudyCard className="study-card" key={card.public_id} word={card.word} meaning={card.meaning} />)}
        <div className='test-page__button-wrapper'>
          <button className='test-page__next' onClick={this.handleSubmitAnswerAndLoadNextCard}>Next</button>
          <GreenButton className='test-page__quit-button' to='/home' text="Quit" onClick={this.handleModalClose} />
        </div>
      </div>
    );
  }
}