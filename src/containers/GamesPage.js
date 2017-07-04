import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { Nav } from '../components/Nav'
import { GamesList } from '../components/GamesList'
import { GamesListTabs } from '../components/GamesListTabs'

import { loadGames } from '../actions'
import 'bulma/css/bulma.css'
import '../views/LoggedInView.css'

class GamesPage extends Component {

  static propTypes = {
    isFailure   : PropTypes.bool,
    isFetching  : PropTypes.bool,
    data        : PropTypes.string,
    token       : PropTypes.string,
    loadGames   : PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadGames(this.props.token)
  }

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
    ]

    return(
      <div className="container" style={{"marginTop":"0px !important"}}>
        <Nav />
        <GamesListTabs />
        <GamesList games={games}/>
      </div>
    )
      
  }
}

function mapStateToProps(state){
return  {
    isFailure   : state.data.isFailure,
    isFetching  : state.data.isFetching,
    data        : state.data.data,
    token       : state.auth.token
  }
}

export default connect(mapStateToProps, { loadGames })(GamesPage)