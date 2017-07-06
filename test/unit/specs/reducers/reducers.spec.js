import authReducers from '../../../../src/reducers/auth'
import {initialState} from '../initialState'

describe('Reducers',()=>{
  it('LOGIN_USER_REQUEST sets isAuthenticating to true', ()=>{
    expect(authReducers(initialState.auth, { type: 'LOGIN_USER_REQUEST' })).toEqual({
		token: null,
		userName: null,
		isAuthenticated: false,
		isAuthenticating: true,
		statusText: null
    })
  })
})