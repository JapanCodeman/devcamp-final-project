import React, { Component } from 'react';

export default class StudyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleName: "study-card",
      answer: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCheckAnswer = this.handleCheckAnswer.bind(this)

    const root = document.documentElement;
    root?.style.setProperty(
      "--bg",
      styleName ? "#262833" : "#fff"
    );
  };

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    })
  }

  handleCheckAnswer(e) {
    if (e.keyCode === 13) 
    if (this.props.meaning === this.state.answer) {
      console.log("Answer is correct")
    } else {
      // this.setState({
      //   styleName: "study-card-wrong"
      // })
      console.log("Answer is incorrect")
    }
  }

  

  render () {
    return (
      <div className={this.state.styleName}>
        <div className='study-card__word'>
          {this.props.word}
        </div>
        <input 
          className='study-card__answer'
          type="text"
          name="answer"
          placeholder="Your answer"
          onFocus={(e) => e.target.placeholder = ''}
          value={this.state.answer}
          onChange={this.handleChange}
          onKeyDown={this.handleCheckAnswer}
          required
          />
          {/* <button button type="submit" onKeyDown={(e) => e.key === this.handleLoadNextCard}>Submit Answer</button> */}
      </div>
    );
  }
}