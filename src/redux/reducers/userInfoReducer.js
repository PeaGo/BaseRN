import {USER_STATUS_ACTION} from '../actions/userStatus.action'

let house = {
    info_user : {}
}

export default loadingReducer = (state = house, action) => {
    switch (action.type) {
        case USER_STATUS_ACTION.USER_LOGIN : {
            return {
                info_user : action.user_info
            }
        };
       
        default : return state
    }
}