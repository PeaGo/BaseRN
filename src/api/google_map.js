import RequsetHelper from '../helper/request.helper'
import { BASE_URL_API } from '../config/app.config'

url_1 = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&types=geocode&language=vi&region=vn&components=country:vn&key=AIzaSyAX2PANITOz9OwOu1oaj3QGZGQelGywIyA&input='
export const autocompletePlaces = (string) => {
    console.log("-----------get place google api-----------");
    console.log(url_1 + string);
    return new Promise((resolve, reject) => {
        return RequsetHelper.get(url_1 + string)
            .then(response => {
            
                return resolve(response)
            })
            .catch(err => {
                console.log(err);
                reject(err.response)
            })
    })
}