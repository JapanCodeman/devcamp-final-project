import React, { Component } from 'react';

export default class StudyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
  })

}
  render () {
    return (
      <div className='study-card'>
        <div className='study-card__word'>
          {this.props.word}
        </div>
        <input 
          className='study-card__answer'
          type="text"
          name="answer"
          placeholder="Your answer"
          value={this.state.answer}
          onChange={this.handleChange}
          required
          />
      </div>
    );
  }
}