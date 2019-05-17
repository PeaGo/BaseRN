import {USER_SEARCH_HOUSE_ACTION} from '../actions/usersearchhouse'

let house = {
    list_user_search_house : []
}

export default loadingReducer = (state = house, action) => {
    switch (action.type) {
        case USER_SEARCH_HOUSE_ACTION.GET_USER_SEARCH_HOUSE : {
            return {
                list_user_search_house : action.list_user_search_house
            }
        };
       
        default : return state
    }
}