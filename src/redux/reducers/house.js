import {HOUSE_ACTION} from '../actions/house'

let house = {
    list_user_house : []
}

export default loadingReducer = (state = house, action) => {
    switch (action.type) {
        case HOUSE_ACTION.GET_USER_HOUSE : {
            return {
                list_user_house : action.list_user_house
            }
        };
       
        default : return state
    }
}