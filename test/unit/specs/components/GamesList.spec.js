import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme'
import GamesList from '../../../../src/components/GamesList'
import Game from '../../../../src/components/Game'
import ReactPaginate from 'react-paginate'

let props = null
let gameListWrapper = null

beforeAll(()=>{
	let gems = []

	let gem = {id:0, title: 'LittleBigPlanet PS Vita', platform: 'PlayStation Vita', genre: 'Platformer', score: 9}

	for(i=0;i<13;i++){
		gem.id=i
		gems.push(gem)
	}

	props = {games : gems}
	gameListWrapper = shallow(<GamesList {...props} />)
})

describe('<GameList />',()=>{
	
	it('contains a game',()=>{
		expect(gameListWrapper.find(Game).length).toBe(12)
	})

	it('contains pagination', ()=>{		
		expect(gameListWrapper.find(ReactPaginate).length).toBe(1)
	})

});