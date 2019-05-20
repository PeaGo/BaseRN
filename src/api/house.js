import RequsetHelper from '../helper/request.helper'
import { BASE_URL_API } from '../config/app.config'
import AsyncstorageHelper from '../helper/asyncstorage.helper'
export const createHouse = async (data) => {
    await AsyncstorageHelper._retrieveData('userData').then(userdata => {
        let userJson = JSON.parse(userdata);
        data = {
            ...data,
            created_by: userJson._id
        }
        console.log('111', data)
        return RequsetHelper.post(BASE_URL_API + '/house/createhouse', data)
    })
}
export const updateHouse = async (data) => {

    return  RequsetHelper.post(BASE_URL_API + '/house/updatehouse', data)
}
export const deleteHouse = async (data) => {

    await RequsetHelper.post(BASE_URL_API + '/house/deletehouse', data).then((res) => {
        console.log('--------', res)
        return res
    }
    )
}
export const pinHouse = async (data) => {
    console.log('--------', data)
    await RequsetHelper.post(BASE_URL_API + '/house/pinhouse', data).then((res) => {
        
        return res
    }
    )
}
export const getUserHouse1 = async () => {
    //  AsyncstorageHelper._retrieveData('userData').then( async(userdata) => {
    //    let userJson = JSON.parse(userdata);
    //    let data = {
    //         created_by : userJson._id
    //    }
    let userData = await AsyncstorageHelper._retrieveData('userData').then(data => JSON.parse(data));
    let data = {
        created_by: userData._id,
        status: 1
    }
    let res = await RequsetHelper.get(BASE_URL_API + '/house/getuserhouses', data);
    return res;
    //    })
}