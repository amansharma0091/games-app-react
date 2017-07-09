import React from 'react'
import './DummyGame.css'

export default () => {
    return (
      <div className="box">
        <div id="gameTitle" className="dummy-title animated">
        </div>
        <div className="dummy-sub-title animated">
        </div>
        <p className="dummy-genre animated"></p>
        <p className="dummy-score animated"></p>
      </div>
    );
}