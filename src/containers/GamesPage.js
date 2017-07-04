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
      this.sortByName = this.sortByName.bind(this)
      this.sortByPlatform = this.sortByPlatform.bind(this)

      this.state = {
        gems : [],
        sortBy: { sortType: SortType.score, order: SortOrder.desc }
      }
  }

  toggleOrdering(sortType){
    const ordering = this.state.sortBy.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;

    this.setState({
      sortBy:{
        sortType : sortType,
        order : ordering
      }
    })

    return ordering
  }

  sortByScore(){

    const ordering = this.toggleOrdering(SortType.score)

    this.setState({
      gems : this.state.gems.sort((a, b) => {
        if (ordering === SortOrder.desc) {
            return (b.score) - (a.score);
        }
        return a.score - b.score;
      })
    })  

  }

  sortByName(){
    console.log("sorting by name")
    const ordering = this.toggleOrdering(SortType.name)

    this.setState({
      gems : this.state.gems.sort((a, b) => {
        if (ordering === SortOrder.desc) {
            return b.title.localeCompare(a.title);
        }
        return a.title.localeCompare(b.title);
      })
    })  
  }

  sortByPlatform(){
    
    const ordering = this.toggleOrdering(SortType.platform)

    this.setState({
      gems : this.state.gems.sort((a, b) => {
        if (ordering === SortOrder.asc) {
            return b.platform.localeCompare(a.platform);
        }
        return a.platform.localeCompare(b.platform);
      })
    })  
  }

  render(){

    return(
      <div className="container" style={{"marginTop":"0px !important"}}>
        <Nav />
        <GamesListTabs sortByScore={this.sortByScore} sortByPlatform={this.sortByPlatform} sortByName={this.sortByName} />
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