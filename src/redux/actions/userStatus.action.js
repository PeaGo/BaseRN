export const USER_STATUS_ACTION = {
    LOGIN_STATUS : 'LOGIN_STATUS',
    AUTHOR_STATUS : 'AUTHOR_STATUS',
    USER_LOGIN : 'USERLOGIN',
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
