import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logoutAndRedirect} from '../actions'
import { loginUser } from '../actions';

import './App.css'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'

export class App extends React.Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        logoutAndRedirect: PropTypes.func.isRequired,

        children: PropTypes.node
    }

    handleLogoutClick = e=>{
        this.props.logoutAndRedirect()
        e.preventDefault();
    }

    componentWillMount(){
        this.props.loginUser('username', 'password', '/games');
    }

    render () {
        return (            
            <span>{this.props.children}</span>
        );
    }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{
    logoutAndRedirect, loginUser
})(App)