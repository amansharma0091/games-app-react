import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'


import Game from './Game'
import './GamesList.css'

export default class GamesList extends Component{
  render() {
    
    const pageCount = this.props.games.length/this.state.itemsPerPage;

    return (
      <div style={{"text-align":"center"}}>
        <div className="columns is-multiline" style={{"marginTop":"50px"}} >
          {this.state.currentPageItems}
        </div>
        <nav className="pagination-container">
          <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={pageCount}
                       marginPagesDisplayed={0}
                       pageRangeDisplayed={5}
                       onPageChange={this.pageChanged}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </nav>
      </div>
    );
  }

  constructor(props){
    super(props)

    this.setCurrentPageItems = this.getCurrentPageItems.bind(this)
    this.pageChanged = this.pageChanged.bind(this)

    this.state = {
      currentPage : 0,
      itemsPerPage : 12,
      currentPageItems : this.getCurrentPageItems(props, 0,  12)
    }
    
    
  }

  componentWillMount() {
    //this.setCurrentPageItems(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.setState(
        {currentPageItems : this.getCurrentPageItems(newProps, 0, this.state.itemsPerPage)}
    )
  }


  pageChanged(event) {
    const newState = {currentPage : event.selected}
    this.setState(newState)
    this.setState(
        { currentPageItems : this.getCurrentPageItems(this.props, event.selected, this.state.itemsPerPage) }
    )    
  }

  getCurrentPageItems(props, currentPage, itemsPerPage) {

        const startIndex = currentPage * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        
        console.log(" startIndex :"+startIndex+", "+endIndex)

        return props.games.slice(startIndex, endIndex)
          .map(game =>{
            return (
                <div key={game.id} className="column is-3 is-mobile myGame">
                  <Game title={game.title} platform={game.platform} score={game.score} genre={game.genre} />
                </div>
            );
        })

  }

}