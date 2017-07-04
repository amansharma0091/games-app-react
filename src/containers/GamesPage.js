import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { Nav } from '../components/Nav'
import { GamesList } from '../components/GamesList'
import { GamesListTabs } from '../components/GamesListTabs'

import { loadGames } from '../actions'
import { SortType, SortOrder } from '../constants'
import './GamesPage.css'

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

  componentWillReceiveProps(newProps) {
    this.setGems(newProps.data)
  }

  constructor(props){
      super(props)
      this.sortByScore = this.sortByScore.bind(this)
      this.state = {
        gems : [],
        sortBy: { sortType: SortType.score, order: SortOrder.desc }
      }
  }

  sortByScore(){
    console.log("sorting by score!")

    const ordering = this.state.sortBy.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;

    this.setState({
      sortBy:{
        sortType : SortType.score,
        order : ordering
      }
    })

    this.setState({
      gems : this.state.gems.sort((a, b) => {
        if (ordering == SortOrder.desc) {
            return (b.score) - (a.score);
        }
        return a.score - b.score;
      })
    })  

  }

  sortByName(){

  }

  sortByPlatform(){

  }

  render(){

    return(
      <div className="container" style={{"marginTop":"0px !important"}}>
        <Nav />
        <GamesListTabs sortByScore={this.sortByScore}/>
        <GamesList games={this.state.gems}/>
      </div>
    )
      
  }


  setGems(data){
    const gems = data ? Object.keys(data.games).map(val => data.games[val]) : []
    this.setState({
      gems : gems
    })
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