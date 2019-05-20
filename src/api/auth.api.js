import RequsetHelper from '../helper/request.helper'
import { BASE_URL_API } from '../config/app.config'

export const login = (userdata) => {
    return RequsetHelper.post(BASE_URL_API+'/user/login', userdata);
}
export const addPoint = (userdata) => {
    return RequsetHelper.post(BASE_URL_API+'/user/addPoint', userdata);
}
export const getUser = (data) => {
    return RequsetHelper.get(BASE_URL_API+'/user/getUser', data);
}
export const register = (registerdata) => {
    console.log(registerdata);
    
    return RequsetHelper.post(BASE_URL_API+'/user/register', registerdata);
}
export const updateUser = (data) => {
    return RequsetHelper.post(BASE_URL_API+'/user/updateuser', data);
}

export const gethistoryaddpoint = async(data) =>{
    let res = await RequsetHelper.get(BASE_URL_API + '/user/gethistoryaddpoint', data);
    return res;
}