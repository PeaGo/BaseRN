import RequsetHelper from '../helper/request.helper'
import { BASE_URL_API } from '../config/app.config'
import AsyncstorageHelper from '../helper/asyncstorage.helper'
export const  createHouse = async (data) => {
     await AsyncstorageHelper._retrieveData('userData').then(userdata => {
        let userJson = JSON.parse(userdata);
        data = {
            ...data,
            created_by : userJson._id
        }
        return RequsetHelper.post(BASE_URL_API+'/house/createhouse', data).then((res)=>{
            console.log('----------------',res)
        }
        );
    })
}

export const getUserHouse = async (data) => {
    await AsyncstorageHelper._retrieveData('userData').then(userdata => {
       let userJson = JSON.parse(userdata);
       data = {
            created_by : userJson._id
       }
       return RequsetHelper.get(BASE_URL_API+'/house/getuserhouses', data);
   })
}