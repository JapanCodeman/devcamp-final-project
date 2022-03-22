import React, { Component } from 'react';
import PageTitler from '../helpers/pageTitler';
import CreateCard from './createCard';

export default class CreateCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numberOfCards: 1,
      cards: []
    }

  const newCardsArray = []

    // this.generateCardSetter = this.generateCardSetter.bind(this)
    this.handleAddManyCards = this.handleAddManyCards.bind(this)
    this.handleAddCard = this.handleAddCard.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log(this.state.cards)
    if (this.state.cards[0] == null) {
        this.setState({
          cards: {
          index: 0,  
          setName: "",
          word: "",
          meaning: "",
          box_number: 0,
          guessed_correctly_count: 0
        }
      })
     } else {
      var newIndex = this.state.cards.slice(-1)[index]++
      this.setState({
      cards: this.state.cards.push({
      index: newIndex,  
      setName: "",
      word: "",
      meaning: "",
      box_number: 0,
      guessed_correctly_count: 0
    })
  })
}
}

  handleChange(event) {(
    this.setState({
      [event.target.value] : event.target.value})
  )}

  handleNumberChange(event) {
    this.setState({
      numberOfCards: event.target.value})
    }
  

  handleAddCard() {
    console.log(this.state.cards)
    var newIndex = this.state.cards.slice(-1).index++
    this.setState({
      cards: this.state.cards.push({
      index: newIndex,  
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

  handleAddManyCards(number) {
    number = this.state.numberOfCards
    console.log(this.state.cards)
    for (let i = 0; i < number; i++) {
    this.setState(prevState => ({
        cards: [...prevState.cards,
        { 
          index: number - 1,  
          setName: "",
          word: "",
          meaning: "",
          box_number: 0,
          guessed_correctly_count: 0
        }
      ]
    }))}
  }
    
  handleCallback(childData) {
    newCardsArray.push(childData)
    console.log(newCardsArray)
    this.setState(prevState => ({
      cards: [...prevState.cards,
      {...childData}
    ]
    }))
  }
  
  handleSubmit() {
    index = index++
    console.log(this.state)
  }


  render () {
    return (
      <div className='create-cards-wrapper'>
        <PageTitler className="create-cards-title" title="Create Cards" />
        <div className='create-cards'>
          <label className='create-cards__count-label' htmlFor='count-input'>How many cards would you like to make?</label>
          <input className='create-cards__count-input' name='numberOfCards' type='number' defaultValue={1} onChange={this.handleNumberChange}/>
          <button className='create-cards__create-cards-button' name='createCardsButton' onClick={this.handleAddManyCards}>Create Cards</button>
        </div>
        <form>
          {this.state.cards[0] ? this.state.cards.map(card => <CreateCard className="create-cards__card" key={card.index} handleAddCard={this.handleAddCard}handleCallback={this.handleCallback}/>) : "Hi there"}
        </form> 
      </div>
    );
  }
}