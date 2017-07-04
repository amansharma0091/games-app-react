import React from 'react'
import ReactPaginate from 'react-paginate'


import Game from './Game'
import './GamesList.css'

export class GamesList extends React.Component{
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

    this.state = {
      currentPage : 0,
      itemsPerPage : 12,
      currentPageItems : []
    }

    this.pageChanged = this.pageChanged.bind(this)
    this.setCurrentPageItems = this.setCurrentPageItems.bind(this)

  }

  componentWillMount() {
    //this.setCurrentPageItems(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.setCurrentPageItems(newProps, 0)
  }


  pageChanged(event) {
    const newState = {currentPage : event.selected}
    console.log("page selected : "+event.selected)
    this.setState(newState)
    this.setCurrentPageItems(this.props, event.selected);
  }

  setCurrentPageItems(props, currentPage) {

        const startIndex = currentPage * this.state.itemsPerPage

        const endIndex = startIndex + this.state.itemsPerPage
        
        console.log(" startIndex :"+startIndex+", "+endIndex)
        this.setState({currentPageItems : props.games.slice(startIndex, endIndex)
          .map(game =>{
            return (
                <div key={game.id} className="column is-3 is-mobile">
                  <Game title={game.title} platform={game.platform} score={game.score} genre={game.genre} />
                </div>
            );
          })
        })

  }

}