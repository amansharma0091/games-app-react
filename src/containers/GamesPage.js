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
    data        : PropTypes.object,
    token       : PropTypes.string,
    loadGames   : PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadGames(this.props.token)
  }


  render(){
    
    const gems = this.props.data ? Object.keys(this.props.data.games).map(val => this.props.data.games[val]) : [];

    return(
      <div className="container" style={{"marginTop":"0px !important"}}>
        <Nav />
        <GamesListTabs />
        <GamesList games={gems}/>
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