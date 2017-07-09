import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Nav } from '../components/Nav'
import GamesList from '../components/GamesList'
import { GamesListTabs } from '../components/GamesListTabs'

import { loadGames, loadDiscoveries } from '../actions'
import { SortType, SortOrder } from '../constants'
import './GamesPage.css'

class GamesPage extends Component {

    static propTypes = {
        isFailure: PropTypes.bool,
        isFetching: PropTypes.bool,
        data: PropTypes.object,
        token: PropTypes.string,
        loadGames: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(newProps) {
        if(newProps.isAuthenticated){
          const data = newProps.data

          if(data.games.length<1)
            this.props.loadGames(newProps.token)
          this.setDiscoveries(newProps)
        }
        
    }

    setDiscoveries(newProps){
        this.setGems(newProps.data)

        let discoveries = newProps.data ? Object.keys(newProps.data.discoveries).map(val => newProps.data.discoveries[val]) : []
        discoveries = discoveries.map(d => d.title)

        this.setState({
             discoveries: discoveries
        })
    }

    constructor(props) {
        super(props)

        this.discoverQuery = this.discoverQuery.bind(this)

        this.sortByScore = this.sortByScore.bind(this)
        this.sortByName = this.sortByName.bind(this)
        this.sortByPlatform = this.sortByPlatform.bind(this)

        this.filterGems = this.filterGems.bind(this)

        this.state = {
            discoveries: [],
            gems: [],
            sortBy: { sortType: SortType.score, order: SortOrder.desc }
        }
    }

    render() {

        return (
            <div className="container" style={{"marginTop":"0px !important"}}>
        <Nav 
          discoverQuery={this.discoverQuery}
          discoveries={this.state.discoveries}
          isMobile={this.props.isMobile}
        />
        <GamesListTabs 
            sortBy={this.state.sortBy} 
            sortByScore={this.sortByScore}
            sortByPlatform={this.sortByPlatform}
            sortByName={this.sortByName}
            filterGems={this.filterGems} 
            isMobile={this.props.isMobile}
        />
        <GamesList games={this.state.gems} isMobile={this.props.isMobile} />
      </div>
        )

    }

    discoverQuery(value) {
        this.setState({
            discoveries: ["loading..."]
        })
        this.props.loadDiscoveries(value, this.props.token)

    }

    toggleOrdering(sortType) {
        const ordering = this.state.sortBy.order === SortOrder.asc ? SortOrder.desc : SortOrder.asc;

        this.setState({
            sortBy: {
                sortType: sortType,
                order: ordering
            }
        })

        return ordering
    }

    sortByScore() {

        const ordering = this.toggleOrdering(SortType.score)

        this.setState({
            gems: this.state.gems.sort((a, b) => {
                if (ordering === SortOrder.desc) {
                    return (b.score) - (a.score);
                }
                return a.score - b.score;
            })
        })

    }

    sortByName() {
        console.log("sorting by name")
        const ordering = this.toggleOrdering(SortType.name)

        this.setState({
            gems: this.state.gems.sort((a, b) => {
                if (ordering === SortOrder.desc) {
                    return b.title.localeCompare(a.title);
                }
                return a.title.localeCompare(b.title);
            })
        })
    }

    sortByPlatform() {

        const ordering = this.toggleOrdering(SortType.platform)

        this.setState({
            gems: this.state.gems.sort((a, b) => {
                if (ordering === SortOrder.asc) {
                    return b.platform.localeCompare(a.platform);
                }
                return a.platform.localeCompare(b.platform);
            })
        })
    }

    filterGems(e) {
        const keyword = e.target.value.toLowerCase()
        const gems = this.state.gemsCopy.filter((a) => (a.title.toLowerCase().indexOf(keyword) > -1))
        this.setState({
            gems: gems
        })
    }

    setGems(data) {
        const gems = data ? Object.keys(data.games).map(val => data.games[val]) : []
        this.setState({
            gems: gems,
            gemsCopy: gems
        })
    }

}

function mapStateToProps(state) {

    return {
        isFailure: state.data.isFailure,
        isFetching: state.data.isFetching,
        data: state.data.data,
        token: state.auth.token,
        isMobile: state.app.isMobile,
        isAuthenticated: state.auth.isAuthenticated,
    }

}

export default connect(mapStateToProps, { loadGames, loadDiscoveries })(GamesPage)
