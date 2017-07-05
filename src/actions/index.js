import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router'

import { CALL_API, Schemas } from '../middleware/api'

import { 
        LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,
        DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE
       } 
from '../constants';


const baseUrl = "https://games-api-dev.herokuapp.com/api";


export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
    }
}

export function loginUser(username, password, redirect="/") {
  console.log(username+","+password)
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch(`${baseUrl}/auth`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.token));
                    browserHistory.push(redirect);
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}




const fetchGames = (token) => ({
  [CALL_API]: {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `findall`,
    schema: Schemas.GAME_ARRAY,
    token: token
  }
})


export const loadGames = (token) => (dispatch, getState) => {
  return dispatch(fetchGames(token))
}

const fetchDiscoveries = (keyword, token) =>({
  [CALL_API] : {
    types: [ DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE ],
    endpoint: `/find?title=${keyword}`,
    schema: Schemas.DISCOVERY_ARRAY,
    token: token
  }
})

export const loadDiscoveries = (keyword, token) => (dispatch, getState) => {
  return dispatch(fetchDiscoveries(keyword, token))
}