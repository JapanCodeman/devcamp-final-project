import React, { Component } from 'react';
import ReactModal from 'react-modal';
import GreenButton from '../helpers/greenButton';

ReactModal.setAppElement(".app-wrapper");

export default class DailyTestModal extends Component {
  constructor(props) {
    super(props)

    this.customStyles = {
      overlay: {
        position: "fixed"
      },
      content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "375px",
        borderRadius: "20px",
        background:  "rgb(10,36,0)",
        backgroundColor: "linear-gradient(0 deg, rgba(10,36,0,1) 0%, rgba(15,171,45,1) 100%)",
        color: "white",
        fontFamily: "Roboto, sans-serif",
        fontSize: "20px",
        fontWeight: "700",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: "0"
      }
    };

  }
  render () {
    return (
      <div>
        <ReactModal 
        isOpen={this.props.modalIsOpen}
        onRequestClose={() => this.props.handleModalClose()}
        style={this.customStyles}>
          <h2>Welcome to your daily test. It is in your best interest to simply see if you can answer the words without looking them up. "Cheating" will only hurt your study habits, so be honest!</h2>
          <GreenButton className='green-button' to="/test" text="Let's Go!" onClick={() => this.props.handleModalClose()}/>
        </ReactModal>
      </div>
    );
  }
}