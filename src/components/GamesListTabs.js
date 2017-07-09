import React from 'react';
import { SortType, SortOrder } from '../constants'
import GameListTabsMobile from './GameListTabsMobile'

export class GamesListTabs extends React.Component{

  constructor(props){
    super(props)

    this.state={
      sortByScoreClass : 'fa fa-arrow-down',
      sortByNameClass : '',
      sortByPlatformClass : ''
    }
  }

  componentWillReceiveProps(newProps){
    switch(newProps.sortBy.sortType){
      case SortType.score:
        this.setState({
          sortByScoreClass : newProps.sortBy.order===SortOrder.desc ? 'fa fa-arrow-down' : 'fa fa-arrow-up',
          sortByNameClass : '',
          sortByPlatformClass : ''
        })
        break;
      case SortType.name:
        this.setState({
          sortByScoreClass : '',
          sortByNameClass : newProps.sortBy.order===SortOrder.desc ? 'fa fa-arrow-down' : 'fa fa-arrow-up',
          sortByPlatformClass : ''
        })
        break;
      case SortType.platform:
        this.setState({
          sortByScoreClass : '',
          sortByNameClass : '',
          sortByPlatformClass : newProps.sortBy.order===SortOrder.desc ? 'fa fa-arrow-down' : 'fa fa-arrow-up'
        })
        break;
      default:
        this.setState({
          sortByScoreClass : newProps.sortBy.order===SortOrder.desc ? 'fa fa-arrow-down' : 'fa fa-arrow-up',
          sortByNameClass : '',
          sortByPlatformClass : ''
        })
    }
  }

  render(){
        if (this.props.isMobile) {
          return <GameListTabsMobile />
        }else{
           return(
            <div className="tabs is-right">
              <div style={{"borderBottom":"1px solid #ccc"}}>
                <p className="control">
                  <input className="input" type="text" placeholder="Find by name..." onKeyUp={this.props.filterGems}/>
                </p>
              </div>
              <ul>
                <li>Sort By</li>
                <li className="active" onClick={this.props.sortByScore}><a><span  className="sort-anchor">Score</span>
                    <i className={this.state.sortByScoreClass}></i></a>
                </li>
                <li onClick={this.props.sortByName}><a><span  className="sort-anchor">Name</span>
                    <i className={this.state.sortByNameClass}></i></a>
                </li>
                <li onClick={this.props.sortByPlatform}><a><span  className="sort-anchor">Platform</span>
                    <i className={this.state.sortByPlatformClass}></i></a>
                </li>
              </ul>
            </div>
          );
        }
   
  }
}