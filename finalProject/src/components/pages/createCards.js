import React, { Component } from 'react';
import PageTitler from '../helpers/pageTitler';
import CreateCard from './createCard';

export default class CreateCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      set_name: "",
      cards: []
    }

    this.handleAddCardToSet = this.handleAddCardToSet.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAddCardToSet(card) {
    this.setState(prevState => ({
      cards: [...prevState.cards, card]
    }))
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

// this.setState(prevState => ({
//   myArray: [...prevState.myArray, {"name": "object"}]
// }))

  handleSubmit() {
    console.log(this.state)
  }


  render () {
    return (
      <div className='create-cards-wrapper'>
        <PageTitler className="create-cards-title" title="Create Cards" />
        <div className='create-cards'>
          <div className='create-cards__instruction-label'>Fill out the card and press enter to submit it to the database</div>
          <label className='create-cards__course-label' htmlFor='create-cards__course'>What course is this set for?</label>
          <select className='create-cards__course' value={this.state.cards.course} name='course' onChange={this.handleChange}>Create Cards
            <option name={this.state.course} value="1-1" >TEIE 1-1</option>
            <option name={this.state.course} value="2-1" >TEIE 2-1</option>
            <option name={this.state.course} value="2-2" >TEIE 2-2</option>
            <option name={this.state.course} value="3-1" >TEIE 3-1</option>
          </select>
          <label className='create-cards__set-name-label' htmlFor='create-cards__set-name'>Set Name</label>
          <input className='create-cards__set-name-input' name='set_name' onChange={this.handleChange} value={this.state.set_name}/>
        </div>
        <div>
          <CreateCard className="create-cards__card" handleAddCardToSet={this.handleAddCardToSet} setName={this.state.set_name} />
          <div className="create-cards__created-cards-list">Cards created this session</div>
          {this.state.cards.map((card) => <div className="create-cards__card" key={card.word + card.meaning}>{card.word} = {card.meaning}</div>)}
        </div> 
      </div>
    );
  }
}