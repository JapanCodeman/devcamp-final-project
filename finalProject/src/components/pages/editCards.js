import axios from 'axios';
import React, { Component } from 'react';

export default class EditCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      set_name: this.props.match.params.slug,
      cards: []
    }
    
    this.getCards = this.getCards.bind(this)
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

  render () {
    return (
      <div>
        {this.state.cards.map(card => <div className="card">{card.word}</div>)}
      </div>
    );
  }
}