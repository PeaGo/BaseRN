import {USER_STATUS_ACTION} from '../actions/userStatus.action'

let house = {
    info_user : {},
    history_add_point: [],
}

export default loadingReducer = (state = house, action) => {
    switch (action.type) {
        case USER_STATUS_ACTION.USER_LOGIN : {
            return {
                ...state,
                info_user : action.user_info
            }
        };
        case USER_STATUS_ACTION.HISTORY_ADD_PONINT : {
            return {
                ...state,
                history_add_point : action.history_add_point
            }
        }
       
        default : return state
    }
}