export const USER_STATUS_ACTION = {
    LOGIN_STATUS : 'LOGIN_STATUS',
    AUTHOR_STATUS : 'AUTHOR_STATUS',
    USER_LOGIN : 'USERLOGIN',
    HISTORY_ADD_PONINT : "HISTORY_ADD_PONINT",
}

export const setUserStatus = (status) => {
    return {
        type : status
    }
}
export const userLogin = (data) => {
 console.log('data',data)
    return {
        type : USER_STATUS_ACTION.USER_LOGIN,
        user_info : data
    }
}
export const historyAddPoint = (data) => {
    console.log('data',data)
       return {
           type : USER_STATUS_ACTION.HISTORY_ADD_PONINT,
           history_add_point : data
       }
   }
