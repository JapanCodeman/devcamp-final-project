import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import GreenButton from '../helpers/greenButton';
import PageTitler from '../helpers/pageTitler';


export default class ModifyCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: []
    }

    // this.getCards = this.getCards.bind(this)
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token)
    const email = decoded.sub.email

    // axios
    // .get(`http://127.0.0.1:5000/user-email/${email}`)
    // .then(response => {
    //   this.setState({
    //     ...response.data
    //   })
    //   console.log(this.state)
    // })
    // .catch(error => {
    //   "There was an error", error
    // })
    axios
    .get(`http://127.0.0.1:5000/sets-by-instructor/${email}`)
    .then(response =>
      this.setState({
      cards: [...response.data]
      })
    )
    .catch(error => {
      "Error in retrieving cards", error
    })
  }

  // get this instructor's card sets
  // getCards() {
  //   axios
  //   .get(`http://127.0.0.1:5000/sets-by-instructor/${this.state.email}`)
  //   .then(response =>
  //     this.setState({
  //     cards: [...response.data]
  //     })
  //   )
  //   .catch(error => {
  //     "Error in retrieving cards", error
  //   })
  // }



  render () {
    return (
      <div className='modify-cards'>
        <PageTitler className='modify-cards__page-titler' title="Modify Cards" />
        <div className="modify-cards__your-sets">Your sets</div>
        <div className='modify-cards__set-wrapper'>
          {this.state.cards.map(set => <GreenButton className="modify-cards__set-entry" to={`/instructor/modify/${set}`} key={set} text={set}>{set}</GreenButton>)}
        </div>
      </div>
    );
  }
}