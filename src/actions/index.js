import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router'

import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,
		 FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA, RECEIVE_GAMES_LIST, RECEIVE_GAMES_LIST_REQUEST } from '../constants';


const baseUrl = "https://games-api-dev.herokuapp.com/api";

export function requestPosts(){
	return {
    type: RECEIVE_GAMES_LIST,
  }

}

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
        // dispatch(pushState(null, '/login'));
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
                    let decoded = jwtDecode(response.token);
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

function receivePosts(json) {
  return {
    type: RECEIVE_GAMES_LIST,
    games: json,
    receivedAt: Date.now()
  }
}

function fetchAllGames() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch(`${baseUrl}/findall`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}


export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch('http://localhost:3000/getData/', {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.data));
            })
            .catch(error => {
                if(error.response.status === 401) {
                  dispatch(loginUserFailure(error));
                  // dispatch(pushState(null, '/login'));
                }
            })
       }
}