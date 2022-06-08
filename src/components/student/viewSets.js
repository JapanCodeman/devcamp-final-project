import axios from 'axios';
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import GreenButton from '../helpers/greenButton.js';
import PageTitler from '../helpers/pageTitler.js';

export default class ViewSets extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sets: []
    }

    this.selectedStudySet = this.selectedStudySet.bind(this)
  }

  async componentDidMount() {
    var token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token) 
    const userEmail = decoded.sub.email
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${token}`
        }
      }
    await axios.get(`http://127.0.0.1:5000/user-email/${userEmail}`, config)
    .then (user => {
      this.setState({...user.data}
    )  
    })
    .catch(error => {
      console.log("Error in getting user object", error);
    })

    await axios
    .get(`http://127.0.0.1:5000/cards-by-course/${this.state.course}`)
    .then (response => {
      this.setState({sets : [...response.data]})
    })
    .catch(error => {
      console.log("Error in getting cards by course", error)
    })
  }

  selectedStudySet(studySet) {
    window.sessionStorage.setItem("studySet", studySet)
  }

  render () {
    return (
      <div className='view-sets-wrapper'>
        <PageTitler className="page-titler" title={"View Sets"}/>
        <div className='setnames-wrapper'>
          {this.state.sets ? this.state.sets.map(set => <GreenButton className="modify-cards__set-entry" to={`/study-set/${set}`} key={set} text={set} onClick={() => this.selectedStudySet(set)}>{set}</GreenButton>) : null}
        </div>
      </div>
    );
  }
}