import React, { Component } from 'react';
import PageTitler from '../helpers/pageTitler';
import CreateCard from './createCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default class CreateCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: "",
      set_name: "",
      course: "1-1",
      cards: []
    }

    this.handleAddCardToSet = this.handleAddCardToSet.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClearState = this.handleClearState.bind(this)
    this.handleSetName = this.handleSetName.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token)
    const email = decoded.sub.email
    this.setState({
      user: email
    })
  }

  handleAddCardToSet(card) {
    if (this.state.cards.indexOf(card) != -1) {
      window.alert("You have already created that card")
    } else {
    this.setState(prevState => ({
      created_by: this.state.user,
      set_name: this.state.set_name,
      cards: [...prevState.cards, card]
    }))
  }}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClearState() {
    this.setState({
      set_name: "",
      course: "1-1",
      cards: []
    })
  }

  handleSetName(event) {
    this.setState({
      cards: {set_name: event.target.value}
    })
  }

  handleSubmit() {
    console.log(this.state)
  }

  handleUploadCards(cards) {
    axios
    .post('http://127.0.0.1:5000/create-cards', [...cards])
    .then(response => {
      if (response.status === 200) return response
      else alert("There was an error")})
    window.alert("Cards Uploaded to Database")
    this.props.history.push('/instructor/home')
  }


  render () {
    return (
      <div className='create-cards-wrapper'>
        <PageTitler className="create-cards-title" title="Create Cards" />
        <div className='create-cards'>
          <div className='create-cards__instruction-label'>Fill out the card and press enter to submit it to the database</div>
          <label className='create-cards__course-label' htmlFor='create-cards__course'>What course is this set for?</label>
          <select className='create-cards__course' value={this.state.course} name='course' onChange={this.handleChange}>Create Cards
            <option name={this.state.course} value="1-1" >TEIE 1-1</option>
            <option name={this.state.course} value="2-1" >TEIE 2-1</option>
            <option name={this.state.course} value="2-2" >TEIE 2-2</option>
            <option name={this.state.course} value="3-1" >TEIE 3-1</option>
          </select>
          <label className='create-cards__set-name-label' htmlFor='create-cards__set-name'>Set Name</label>
          {this.state.set_name ? null : <div className='create-cards__set-name-required'>Set Name Required</div>}
          <input className='create-cards__set-name-input' name='set_name' onChange={this.handleChange} value={this.state.set_name} />
        </div>
        
        {this.state.set_name ? <CreateCard className="create-cards__card" handleAddCardToSet={this.handleAddCardToSet} user={this.state.user} setName={this.state.set_name} course={this.state.course}/> : null}

        <div className='create-cards__card-and-created'>
          <div className='create-cards__clear-list'>Click to clear list <FontAwesomeIcon icon="fa-solid fa-trash-can" onClick={this.handleClearState}/></div>
          <div className="create-cards__created-cards-list">Cards created this session</div>
          <div className="create-cards__upload-cards" onClick={() => this.handleUploadCards(this.state.cards)}>Click to upload cards to database <FontAwesomeIcon icon="fa-solid fa-upload"/></div>
          {this.state.cards.map((card) => <div className="create-cards__card-entry" key={card.word + card.meaning}>{card.word} = {card.meaning}</div>)}
        </div> 
      </div>
    );
  }
}