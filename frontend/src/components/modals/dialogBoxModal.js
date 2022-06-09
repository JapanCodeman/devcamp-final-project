import React, { Component } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement(".app-wrapper");

export default class DialogBox extends Component {
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
        style={this.customStyles}
        text={this.props.text}>
          <h2>{this.props.text}</h2>
          <button className='green-button' to={this.props.to} onClick={() => this.props.handleModalClose()}>Let's Go!</button>
        </ReactModal>
      </div>
    );
  }
}