import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import GreenButton from '../helpers/greenButton';

export default class StudentStudy extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    // this.getTodaysCards = this.getTodaysCards.bind(this)
  }

  // getTodaysCards() {
  //   axios
  //   .get(`http://127.0.0.1:5000/get-unboxed-cards/${this.state.user.course}`)
  // }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token)
    const email = decoded.sub.email
    axios
    .get(`http://127.0.0.1:5000/student-email/${email}`)
    .then(response => {
      this.setState({
        ...response.data
      })
    })
    .catch(error => {
      console.log("Error in retrieving user info on component mount", error)
    })

    // this.setState({
    //   user: [...this.props.user]
    // })
    // this.getTodaysCards()
  }

  render () {
    return (
      <div className='study-page'>
        <div className='study-page__green-square'>
          <div className='study-page__study-explanation'>
            Welcome to the study page! Here you can study today's set of cards for as long as you like. Simply type the definition in the box below and press enter. If you are correct, the next card will come. If you are incorrect, the card will flip over to reveal the answer. You can end at any time by clicking the "quit" button in the lower right. Happy studying!
            <GreenButton className='study-page__lets_go_button' to="" text="Let's Go!" onClick={null} />
          </div>
        </div>
        <GreenButton to='/home' text="Quit" onClick={null} />
      </div>
    );
  }
}