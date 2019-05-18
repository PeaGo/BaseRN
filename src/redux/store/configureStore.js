import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'

import loadingReducer from '../reducers/loading.reducer'
import userStatusReducer from '../reducers/userStatus.reducer'
import houseReducer from '../reducers/house'
import usersearchhouseReducer from '../reducers/usersearchhouse'
import userInfoReducer from '../reducers/userInfoReducer'

const appReducers = combineReducers({
    loadingState : loadingReducer,
    userStatus : userStatusReducer,
    userInfo : userInfoReducer,
    houseReducer : houseReducer,
    usersearchhouseReducer : usersearchhouseReducer,
})

export default configureStore = createStore(appReducers, applyMiddleware(thunk));