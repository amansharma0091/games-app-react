import React, { Component } from 'react'
import { Typeahead } from 'react-typeahead'

export class Nav extends Component{

    constructor(props){
      super(props)
      this.state = {
        value : ''
      }
      this.handleDiscoverQuery = this.handleDiscoverQuery.bind(this)
    }

    handleDiscoverQuery(e){
      const value = e.target.value
      this.setState({
        value: value
      })
      if(value.length>1)
        this.props.discoverQuery(value)
    }

    render(){
      return(
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
                options={this.props.discoveries}
                maxVisible={5}
                onKeyDown={this.handleDiscoverQuery}
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