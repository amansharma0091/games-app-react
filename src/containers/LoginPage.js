import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

 class LoginPage extends Component {

  static propTypes = {

    isAuthenticating: PropTypes.string,
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

  onUserChange(value){
    this.setState({username : value});
  }

  onPasswordChange(value){
    this.setState({password : value});
  }

  render () {
    return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
        <h3>Log in to view protected content!</h3>
        <p>Hint: hello@test.com / test</p>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
        <form role='form'>
        <div className='form-group'>
            <input type='text'
              className='form-control input-lg'
              onChange={this.onUserChange}
              placeholder='Username' />
            </div>
          <div className='form-group'>
            <input type='password'
              className='form-control input-lg'
              onChange={this.onPasswordChange}
              placeholder='Password' />
          </div>
          <button type='submit'
            className='btn btn-lg'
            disabled={this.props.isAuthenticating}
            onClick={this.login}>Submit</button>
      </form>
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