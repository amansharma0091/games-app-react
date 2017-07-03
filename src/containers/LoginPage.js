import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import './LoginPage.css';

 class LoginPage extends Component {

  static propTypes = {

    isAuthenticating: PropTypes.bool,
    statusText: PropTypes.string,
    username : PropTypes.string,
    password : PropTypes.string

  }

  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.onUserChange = this.onUserChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.login = this.login.bind(this)
  }

  login(e) {
      e.preventDefault();
      this.props.loginUser(this.state.username, this.state.password, '/games');
  }

  onUserChange(event){
    this.setState({username : event.target.value});
  }

  onPasswordChange(event){
    this.setState({password : event.target.value});
  }

  render () {
    return (

      <div className="login">
        <h1>Login</h1>
          <form method="post">
            <input type="text" name="u" placeholder="Username" required="required" onChange={this.onUserChange}/>
            <input type="password" name="p" placeholder="Password" required="required" onChange={this.onPasswordChange}/>
             <button type="submit" className="btn btn-primary btn-block btn-large" disabled={this.props.isAuthenticating} onClick={this.login}>Let me in.</button>
          </form>
          <div>{this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}</div>
      </div>

    );
  }
}


function mapStateToProps(state){
return  {
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText,
    username           : state.auth.username,
    password           : state.auth.password
  }
}

export default connect(mapStateToProps, { loginUser })(LoginPage);