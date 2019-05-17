import RequsetHelper from '../helper/request.helper'
import { BASE_URL_API } from '../config/app.config'
import AsyncstorageHelper from '../helper/asyncstorage.helper'

export const getUserSearch = async (data_search) => {
    //  AsyncstorageHelper._retrieveData('userData').then( async(userdata) => {
    //    let userJson = JSON.parse(userdata);
    //    let data = {
    //         created_by : userJson._id
    //    }
    let userData = await AsyncstorageHelper._retrieveData('userData').then(data => JSON.parse(data));
    // data_search = {
    //     ...data_search,
    //     created_by: userData._id
    // }
    let res = await RequsetHelper.get(BASE_URL_API + '/house/getusersearch', data_search);
    return res;
    //    })
}