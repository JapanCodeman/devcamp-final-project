import React, { Component } from 'react';

import ReactCardFlip from 'react-card-flip';

export default class StudyCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
      answer: "",
      lastAnswerResult: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCheckAnswer = this.handleCheckAnswer.bind(this)
    this.handleCheckAnswerButtonClick = this.handleCheckAnswerButtonClick.bind(this)
  };

  handleChange(event) {
    this.setState({
    [event.target.name]: event.target.value
    })
  }

  handleCheckAnswer(e) {
    this.setState({
      lastAnswerResult: ""
    })
    if (e.keyCode === 13)
    if (this.props.meaning.toLowerCase() === this.state.answer.toLowerCase()) {
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped,
      lastAnswerResult: "correct" }));
    } else {
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
  }

  handleCheckAnswerButtonClick() {
    this.setState({
      lastAnswerResult: ""
    })
    if (this.props.meaning.toLowerCase() === this.state.answer.toLowerCase()) {
      this.setState(
        prevState => ({ 
          isFlipped: !prevState.isFlipped,
          lastAnswerResult: "correct"}));
      
    } else {
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
  }

  

  render () {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
      <div className="study-card__front">
        <div className="study-card__front__word">
          {this.props.word}
        </div>
        <input 
          className="study-card__front__answer"
          type="text"
          name="answer"
          placeholder="Your answer"
          onFocus={(e) => e.target.placeholder = ''}
          value={this.state.answer}
          onChange={this.handleChange}
          onKeyDown={this.handleCheckAnswer}
          required
          />
        <button className="study-card__front__submit-answer-button" onClick={this.handleCheckAnswerButtonClick}>Submit Answer (or press Enter)</button>
      </div>

        <div className="study-card__back">
          <div className="study-card__back__word">
            Word: {this.props.word}
          </div>
          <div className="study-card__back__answer">
            Your answer: {this.state.answer}
          </div>
          {/* <div className="study-card__back__correct-answer">
            Correct Answer: {this.props.meaning}
          </div> */}
          <div>
            {this.state.lastAnswerResult === "correct" ? <div>Correct!</div> : <div>Incorrect!</div>}
          </div>
          <div className="study-card__back__meaning">
            Definition: {this.props.meaning}
          </div>
        </div>
      </ReactCardFlip>
    );
  }
}