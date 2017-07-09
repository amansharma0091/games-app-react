import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './auth'
import data from './data'
import app from './app'

export default combineReducers({
 auth,
 data,
 app,
 routing
})