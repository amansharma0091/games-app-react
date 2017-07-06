import nock from 'nock'
import { initialState } from '../initialState'
import { mockStore } from '../mockStore'
import { loginUser } from '../../../../src/actions/index.js'
import { LOGIN_USER_SUCCESS } from '../../../../src/constants'

let store = null;
const API_ROOT = 'https://games-api-dev.herokuapp.com/api/'
const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VybmFtZSIsImNyZWF0ZWQiOjE0OTkzMzEzNDQ0MjksImV4'
    	+ 'cCI6MTQ5OTkzNjE0NH0.yHt-M9W0t3dntHJMfNSSJ4HUTzIJVENVUV4E4R7v5K3jTt-dTveq8jqHL7M64F0_3BpPaB91skC4ZXI0p0uKTQ'

function loginSuccess(){
	return {
		type: LOGIN_USER_SUCCESS,
	    payload: {
	      token: TOKEN
	    }
	}
}

beforeAll(()=>{
	store = mockStore(initialState)

	nock(`${API_ROOT}/auth`)
    .post('/auth',{
    	username: 'username',
    	password: 'password'
    })
    .reply(200, { 
    	token : TOKEN
    })

})

describe('Actions', ()=>{
	it('loginUser work for defaults', ()=>{
		store.dispatch(loginUser('username','password'))
			.then(()=>{
				const actions = store.getActions()
				expect(actions[0]).toBe(loginSuccess())
			})		
	})
})