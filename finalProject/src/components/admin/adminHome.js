import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import HeaderNavbar from '../headerNavbar/headerNavbar';
import GreenButton from '../helpers/greenButton';


export default class AdministratorHome extends Component {
  constructor(props) {
    super(props)
  
      this.state = {
        admin:{}
      }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    var token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token) 
    console.log(decoded)
    const adminEmail = decoded.sub.email
    axios.patch(`http://127.0.0.1:5000/update-admin-by-email/${adminEmail}`, {logged_in:"false"}, { headers: {"Authorization" : `Bearer ${token}`}})
    .catch(error => {
      console.log("Patch log status error", error)
    })
    window.sessionStorage.clear()
    this.props.history.push('/admin/login')
  }

  componentDidMount(){
    var token = window.sessionStorage.getItem("token")
    const decoded = jwtDecode(token) 
    const adminEmail = decoded.sub.email
    console.log(adminEmail)
    axios.patch(`http://127.0.0.1:5000/update-administrator-by-email/${adminEmail}`, { logged_in:"true" }, { headers: {"Authorization" : `Bearer ${token}`}})
    .catch(error => {
      console.log("Patch log status error", error)
    })
    axios.get(`http://127.0.0.1:5000/administrator-by-email/${adminEmail}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then (Admin => {
      console.log(Admin)
      this.setState({
        admin : Admin.data
      })
    })
    .catch(error => {
      console.log("Error in getting admin object", error);
    })
  }
  
  componentWillUnmount() {
    window.sessionStorage.clear()
  }

  render () {
    return (
      <div>
        <HeaderNavbar handleLogout={this.handleLogout}/>
        <div className="admin-home-wrapper">
          <div className='admin-home__welcome-message'>Welcome back, {this.state.admin.first}!</div>
            <div className='admin-home__page-name'>Home</div>

          <div className="admin-home__management-tools">
            <GreenButton className={"admin-home__management-tools__users"} to={"/admin/userstatus"} text={"Manage Users/Check Status"} />
            <GreenButton className={"admin-home__management-tools__passwords"} to={"/admin/password-reset"} text={"Password Reset Options"} />
            <GreenButton className={"admin-home__management-tools__placeholder"} to={"/admin/password-reset"} text={"Placeholder"} />
          </div>
        </div>
      </div>
    );
  }
}