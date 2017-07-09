import React from 'react'
import { Typeahead } from 'react-typeahead'

export default () => {
    return (
        <div>
            <nav className="nav">

         <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className="nav-left">
            <a className="nav-item">
              <h2 className="title">Games</h2>
            </a>
          </div>

          <div className="nav-center">
            <div className="nav-item">
              
            </div>
          </div>

           <div className="nav-right nav-menu">
             <div className="nav-item">
                <div className="field is-grouped">
                </div>
             </div>
           </div>
        </nav>
            <div className="th-mobile">
            <Typeahead
                    options={['hello','world']}
                    maxVisible={5}
                    defaultValue='No matching results...'
                  />
            </div>
        </div>
        

    );
}
