import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import api from '../../../src/middleware/api'


const middlewares = [api, thunk]
export const mockStore = configureStore(middlewares)