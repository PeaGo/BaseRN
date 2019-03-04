import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'

import loadingReducer from '../reducers/loading.reducer'

const appReducers = combineReducers({
    loadingState : loadingReducer,
})

export default configureStore = createStore(appReducers, applyMiddleware(thunk));