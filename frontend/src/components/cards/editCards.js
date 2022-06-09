import axios from 'axios';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EditCard from './editCard';
import PageTitler from '../helpers/pageTitler';

export default class EditCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      set_name: this.props.match.params.slug,
      cards: []
    }
    
    this.getCards = this.getCards.bind(this)
    this.handleDeleteSet = this.handleDeleteSet.bind(this)
  }

  getCards() {
    axios
    .get(`http://127.0.0.1:5000/cards-by-setname/${this.state.set_name}`)
    .then(response => {
      this.setState({
        cards: [...response.data]
      })
    })
    .catch(error => {
      console.log("There was an error getting the cards", error)
    })
  }

  componentDidMount() {
    this.getCards()
  }

  handleUpdateCard(updateData, id) {
    axios
    .patch(`http://127.0.0.1:5000/update-card/${id}`, updateData)
    .catch(error => {
      "There was an error updating the card", error
    })
  }

  handleDeleteSet() {
    axios
    .delete(`http://127.0.0.1:5000/delete-card-set/${this.state.set_name}`)
    .catch(error => {
      "Error in handleDeleteSet function in editCards.js", error
    })
    window.alert("Set Deleted - returning to home")
    this.props.history.push('/instructor/home')
  }

  render () {
    return (
      <div>
        <PageTitler className='page-titler' title="Edit Cards" />
        <div className='delete-set'>Click to delete entire set <FontAwesomeIcon icon="fa-solid fa-trash-can" onClick={this.handleDeleteSet}/></div>
        {this.state.cards.map(card => <EditCard key={card._id} id={card._id} handleUpdateCard={this.handleUpdateCard} created_by={card.created_by} set_name={card.set_name} course={card.course} word={card.word} meaning={card.meaning} />)}
      </div>
    );
  }
}