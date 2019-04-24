import RequsetHelper from '../helper/request.helper'
import { BASE_URL_API } from '../config/app.config'
export const login = (userdata) => {
    return RequsetHelper.post(BASE_URL_API+'/login', userdata);
}
