import React from 'react';
import { shallow, mount } from 'enzyme'
import Game from '../../../../src/components/Game'

let props = null;
let gameWrapper = null;

beforeAll(()=>{
	 props = {title: 'LittleBigPlanet PS Vita', platform: 'PlayStation Vita', genre: 'Platformer', score: 9}
	 gameWrapper = shallow(<Game {...props} />)
})

describe('<Game />',()=>{
	
	it('contains game title',()=>{
		expect(gameWrapper.find('#gameTitle').text()).toBe(props.title)
	})

	it('contains game platform',()=>{
		expect(gameWrapper.find('#gamePlatform').text()).toBe(props.platform)
	})

	it('contains game genre',()=>{
		expect(gameWrapper.find('#gameGenre').text()).toBe(props.genre)
	})

	it('contains game score',()=>{
		expect(gameWrapper.find('#gameScore').text()).toBe(''+props.score)
	})
});