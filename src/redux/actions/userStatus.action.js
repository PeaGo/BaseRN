export const USER_STATUS_ACTION = {
    LOGIN_STATUS : 'LOGIN_STATUS',
    AUTHOR_STATUS : 'AUTHOR_STATUS'
}

export const setUserStatus = (status) => {
    return {
        type : status
    }
}