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
    .get(`http://127.0.0.1:5000/get-unboxed-cards/${this.state.course}`)
    .then(response => {
      this.setState({
        cardIds: [...response.data]
      })
    })
    .catch (error => {
      console.log("Error in getting student data", error)
    })
    await axios
    .get(`http://127.0.0.1:5000/`)
  }

  handleModalClose() {
    this.setState({
      dialogBoxOpen: false
    })
  }

  render () {
    let studyCardsArr = []
    return (
      <div className='study-page'>
        <DialogBox modalIsOpen={this.state.dialogBoxOpen} handleModalClose={this.handleModalClose}/>
        <StudyCard word="test"/>
        <GreenButton className='study-page__quit-button' to='/home' text="Quit" onClick={this.handleModalClose} />
      </div>
    );
  }
}