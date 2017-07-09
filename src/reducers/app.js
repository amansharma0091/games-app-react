import {createReducer} from '../utils';
import { RESIZE_APP } from '../constants';

const initialState = {
    isMobile : (window.innerWidth<=500)
};

export default createReducer(initialState, {
    [RESIZE_APP]: (state, payload) => {
    	console.log('resizing'+window.innerWidth);
    	const isMobile = window.innerWidth<=500
        return Object.assign({}, state, {
            isMobile : isMobile
        });
    }
});