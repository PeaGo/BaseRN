import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'

import loadingReducer from '../reducers/loading.reducer'
import userStatusReducer from '../reducers/userStatus.reducer'
import houseReducer from '../reducers/house'

const appReducers = combineReducers({
    loadingState : loadingReducer,
    userStatus : userStatusReducer,
    houseReducer : houseReducer
})

export default configureStore = createStore(appReducers, applyMiddleware(thunk));