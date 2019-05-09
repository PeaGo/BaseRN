import RequsetHelper from '../helper/request.helper'
import { BASE_URL_API } from '../config/app.config'

url = 'https://maps.googleapis.com/maps/api/place/details/json?&key=AIzaSyAX2PANITOz9OwOu1oaj3QGZGQelGywIyA&placeid='
export const place_id = (id) => {
    console.log("-----------get lat long google api-----------");
    console.log(url + id);
    return new Promise((resolve, reject) => {
        return RequsetHelper.get(url + id)
            .then(response => {
            
                return resolve(response)
            })
            .catch(err => {
                console.log(err);
                reject(err.response)
            })
    })
}