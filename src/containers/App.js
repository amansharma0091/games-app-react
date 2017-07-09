import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logoutAndRedirect} from '../actions'
import { loginUser, resizeApp } from '../actions';

import './App.css'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'

export class App extends React.Component {

    static propTypes = {
        logoutAndRedirect: PropTypes.func.isRequired,
        children: PropTypes.node
    }

    handleLogoutClick = e=>{
        this.props.logoutAndRedirect()
        e.preventDefault();
    }

    componentWillMount(){
        window.addEventListener('resize', this.handleWindowSizeChange)
    }

    componentDidMount(){
        this.props.loginUser('username', 'password', '/games');
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.props.resizeApp();
    }

    render () {
        return (            
            <span>{this.props.children}</span>
        );
    }
}
const mapStateToProps = (state) => ({
  width: state.app.width
});
export default connect(mapStateToProps,{
    logoutAndRedirect, loginUser, resizeApp
})(App)