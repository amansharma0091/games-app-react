import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import LoginPage from './containers/LoginPage'
import GamesPage from './containers/GamesPage'
import {requireAuthentication} from './components/AuthenticatedComponent';

export default <Route path="/" component={App}>
  <Route path="/login"
         component={LoginPage} />
  <Route path="/games"
         component={requireAuthentication(GamesPage)} />
</Route>
