import {ACTION_SHOW_LOADING, ACTION_HIDE_LOADING} from '../actions/loading.action'

let loadingState = {
    loading : false
}

export default loadingReducer = (state = loadingState, action) => {
    switch (action.type) {
        case ACTION_SHOW_LOADING : {
            return {
                loading : true
            }
        };
        case ACTION_HIDE_LOADING : {
            return {
                loading : false
            }
        };
        default : return state
    }
}