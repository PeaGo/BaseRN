export const HOUSE_ACTION = {
    GET_USER_HOUSE : 'GET_USER_HOUSE'
}

export const getUserHouse = (data) => {
    console.log('acton data');
    
    console.log(data);
    
    return {
        type : HOUSE_ACTION.GET_USER_HOUSE,
        list_user_house : data
    }
}