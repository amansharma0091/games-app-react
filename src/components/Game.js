import React from 'react';

export default class Game extends React.Component{
	  render(){

        return(
            <div className="box">
              <div className="title">
                {this.props.title}
              </div>
              <div className="sub-title">
                <strong>Platform</strong>
                {this.props.platform}
              </div>
              <p><strong>Genre </strong>{this.props.genre}</p>
              <p><strong>Score </strong>{this.props.score}</p>
            </div>
        );
    }
}