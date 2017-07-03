import {createReducer} from '../utils';
import {RECEIVE_GAMES_LIST, RECEIVE_GAMES_LIST_REQUEST} from '../constants';

const initialState = {
    data: null,
    isFetching: false
};

export default createReducer(initialState, {
    [RECEIVE_GAMES_LIST]: (state, payload) => {
        return Object.assign({}, state, {
            'data': payload.data,
            'isFetching': false
        });
    },
    [RECEIVE_GAMES_LIST_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    }
});