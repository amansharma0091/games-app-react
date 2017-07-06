import React, { Component } from 'react';

export default class Game extends Component{
	  render(){

        return(
            <div className="box">
              <div id="gameTitle" className="title">
                {this.props.title}
              </div>
              <div className="sub-title">
                <strong>Platform</strong>
                <span id="gamePlatform">{this.props.platform}</span>
              </div>
              <p><strong>Genre</strong> <span id="gameGenre">{this.props.genre}</span></p>
              <p><strong>Score</strong> <span id="gameScore">{this.props.score}</span></p>
            </div>
        );
    }
}