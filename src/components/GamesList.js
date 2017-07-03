import React from 'react';
import Game from './Game';

export class GamesList extends React.Component{
  render() {
    const gamesList = this.props.games.map(game =>{
        return (
            <div key={game.id} className="column is-3 is-mobile">
              <Game title={game.title} platform={game.platform} score={game.score} genre={game.genre} />
            </div>
        );
    });
    return (
      <div style={{"text-align":"center"}}>
        <div className="columns is-multiline" style={{"marginTop":"50px"}} >
          {gamesList}
        </div>
        <nav className="pagination is-right" style={{width: "300px",display: "inline-block"}}>
          <a className="pagination-previous">Previous</a>
          <a className="pagination-next">Next page</a>
        </nav>
      </div>
    );
  }
}