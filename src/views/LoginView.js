import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

export class LoginView extends Component {

  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      username: '',
      password: '',
      redirectTo: redirectRoute
    };
    this.onUserChange = this.onUserChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  login(e) {
      e.preventDefault();
      this.props.actions.loginUser(this.state.username, this.state.password, this.state.redirectTo);
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
              onChange={e => this.onUserChange(e.target.value)}
              placeholder='Username' />
            </div>
          <div className='form-group'>
            <input type='password'
              className='form-control input-lg'
              onChange={e => this.onPasswordChange(e.target.value)}
              placeholder='Password' />
          </div>
          <button type='submit'
            className='btn btn-lg'
            disabled={this.props.isAuthenticating}
            onClick={this.login.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}


function mapStateToProps(state){
return  {
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText
  }
}

export default connect(mapStateToProps, { loginUser })(LoginView);