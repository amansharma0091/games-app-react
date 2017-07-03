import React, { Component } from 'react'

export class Nav extends Component{
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
              <input placeholder="Discover Games..." className="input" />
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