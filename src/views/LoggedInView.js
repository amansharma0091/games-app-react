import React from 'react';
import './LoggedInView.css';

import { Nav, Game, GamesList, GamesListTabs } from '../components';

//import '../../node_modules/bulma/css/bulma.css';

class LoggedInView extends React.Component {
  render(){
    const games = [
      {
        id : 1,
        title: "LittleBigPlanet PS Vita",
        platform : "PlayStation Vita",
        genre : "Platformer",
        score : 9
      },
      {
        id : 2,
        title: "LittleBigPlanet PS Vita",
        platform : "PlayStation Vita",
        genre : "Platformer",
        score : 9
      }
    ];

    return(
      <div className="container" style={{"marginTop":"0px !important"}}>
        <Nav />
        <GamesListTabs />
        <GamesList games={games}/>
      </div>
    );
      
  }
}

export default LoggedInView;
