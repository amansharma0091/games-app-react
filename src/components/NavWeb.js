import React from 'react'
import { Typeahead } from 'react-typeahead'

export default () => {
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