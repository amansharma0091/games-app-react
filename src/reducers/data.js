import {createReducer} from '../utils';
import {  RECEIVE_GAMES_REQUEST, RECEIVE_GAMES_SUCCESS, RECEIVE_GAMES_FAILURE  } from '../constants';

const initialState = {
    isFetching: false,
    isFailure: false,
    data: null
};

export default createReducer(initialState, {
    [RECEIVE_GAMES_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    },
    [RECEIVE_GAMES_SUCCESS]: (state, payload) => {
        console.log("payload "+JSON.stringify(payload))
        return Object.assign({}, state, {
            'isFetching': false,
            'data' : payload.entities.games
        });
    },
    [RECEIVE_GAMES_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching':false,
            'isFailure': true
        });
    }
});