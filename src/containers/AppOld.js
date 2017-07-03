import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutAndRedirect} from '../actions';

export class App extends React.Component {

    static propTypes = {

        isAuthenticated: PropTypes.string,
        logoutAndRedirect: PropTypes.func.isRequired,

        children: PropTypes.node
    }

    handleLogoutClick = e=>{
        this.props.logoutAndRedirect()
        e.preventDefault();
    }


    render () {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">React Redux JWT Auth Example</Link>
                        </div>
                        <div id="navbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/protected">Protected Content</Link></li>
                                <li><Link to="/login">Login</Link></li>
                                {this.props.isAuthenticated
                                 ? <li><a href='#' onClick={this.handleLogoutClick}>Logout</a> </li>
                                 : ''
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{
    logoutAndRedirect
})(App)