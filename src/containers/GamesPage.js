import React, { Component } from 'react'
import '../views/LoggedInView.css';

import { Nav } from '../components/Nav';
import { GamesList } from '../components/GamesList';
import { GamesListTabs } from '../components/GamesListTabs';
import 'bulma/css/bulma.css';

class GamesPage extends Component {
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

export default GamesPage;
