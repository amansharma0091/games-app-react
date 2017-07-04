import {createReducer} from '../utils';
import {  DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE  } from '../constants';

const initialState = {
    isFetching: false,
    isFailure: false,
    data: {
        games : [],
        discoveries : []
    }
};

export default createReducer(initialState, {
    [DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    },
    [DATA_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': false,
            'data' : Object.assign({}, state.data, payload ? payload.entities : null)
        });
    },
    [DATA_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching':false,
            'isFailure': true
        });
    }
});