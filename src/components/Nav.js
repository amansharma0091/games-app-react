import React, { Component } from 'react'
import { Typeahead } from 'react-typeahead'
//import NavWeb from './NavWeb'
import NavMobile from './NavMobile'
import './Nav.css'

export class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleDiscoverQuery = this.handleDiscoverQuery.bind(this)
    }

    handleDiscoverQuery(e) {
        const value = e.target.value
        this.setState({
            value: value,
            discoveries: ['loading...']
        })
        if (value.length > 1)
            this.props.discoverQuery(value)
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            discoveries: newProps.discoveries
        })
    }

    render() {
        if (this.props.isMobile) {
          return <NavMobile />
        }else{
          return (
                <nav className="nav">
          <div className="nav-left">
            <a className="nav-item">
              <h2 className="title">Games</h2>
            </a>
          </div>

          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>


          <div className="nav-center">
            <div className="nav-item">
              <Typeahead
                value = {this.state.value}
                options={this.state.discoveries}
                maxVisible={5}
                onKeyUp={this.handleDiscoverQuery}
                defaultValue='No matching results...'
              />
             </div>
          </div>

           <div className="nav-right nav-menu">
             <div className="nav-item">
                <div className="field is-grouped">
                </div>
             </div>
           </div>
        </nav>
        ); 
        }
    }
}
