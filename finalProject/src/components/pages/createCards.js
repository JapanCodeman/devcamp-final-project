import React, { Component } from 'react';
import PageTitler from '../helpers/pageTitler';
import CreateCard from './createCard';

export default class CreateCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

 /* componentDidMount() {
    console.log(this.state.cards)
    if (! this.state.cards.length >= 0) {
      
      this.setState({
      cards: this.state.cards.push({
      setName: "",
      word: "",
      meaning: "",
      box_number: 0,
      guessed_correctly_count: 0
    })
  })
}
}*/

  handleChange(event) {(
    this.setState({
      cards: {[event.target.name] : event.target.value}
    }))
  }

  handleAddCard() {
    console.log(this.state.cards)
    this.setState({
      cards: this.state.cards.push({
      setName: "",
      word: "",
      meaning: "",
      box_number: 0,
      guessed_correctly_count: 0
    })
  })
  console.log(this.state)
}


// this.setState(prevState => ({
//   myArray: [...prevState.myArray, {"name": "object"}]
// }))
    
  handleSubmit() {
    index = index++
    console.log(this.state)
  }

  handleWord(word) {
    this.setState({
      cards: word
    })
  }


  render () {
    return (
      <div className='create-cards-wrapper'>
        <PageTitler className="create-cards-title" title="Create Cards" />
        <div className='create-cards'>
          <label className='create-cards__count-label' htmlFor='count-input'>Fill out the card and press enter to submit it to the database</label>
          <select className='create-cards__create-cards-course' value={this.state.cards.course} name='course' onChange={this.handleChange}>Create Cards
            <option value="1-1">TEIE 1-1</option>
            <option value="1-1">TEIE 2-1</option>
            <option value="1-1">TEIE 2-2</option>
            <option value="1-1">TEIE 3-1</option>
          </select>
        </div>
        <form>
          <CreateCard className="create-cards__card" />
        </form> 
      </div>
    );
  }
}