export const USER_SEARCH_HOUSE_ACTION = {
    GET_USER_SEARCH_HOUSE : 'GET_USER_SEARCH_HOUSE'
}

export const getUserSearchHouse = (data) => {
  
    return {
        type : USER_SEARCH_HOUSE_ACTION.GET_USER_SEARCH_HOUSE,
        list_user_search_house : data
    }
}