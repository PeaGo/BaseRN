import {USER_STATUS_ACTION} from '../actions/userStatus.action'


const defaultState = {
    userStatus : USER_STATUS_ACTION.LOGIN_STATUS,
 
}

export default userStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_STATUS_ACTION.AUTHOR_STATUS : {
            return {
                userStatus : USER_STATUS_ACTION.AUTHOR_STATUS
            }
        }
        case USER_STATUS_ACTION.LOGIN_STATUS : {
            return {
                userStatus : USER_STATUS_ACTION.LOGIN_STATUS
            }
        }
        
        default : return state
    }
}