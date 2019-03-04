import { AsyncStorage } from 'react-native'
export default class AsyncStorageHelper {
    static async _storeData (field, value) {
        try {
            await AsyncStorage.setItem(field, value);
            console.log('set asyncStore for key: ' + field);   
        } catch (error) {
            console.log('error store item asyncStore: ' + error)
        }
    }
    static async _retrieveData (field) {
        try {
           const value = await  AsyncStorage.getItem(field);
            console.log('get asyncStore for key: ' + field);
            if(value === null) {
                return null
            }
            return value;
        } catch (error) {
            console.log('error get item asyncStore: ' + error)
        }
    }
    static async _removeData (field) {
        try {
            await AsyncStorage.removeItem(field);
            console.log('remove asyncStore for key: ' + field);
        } catch (error) {
            console.log('error remove item asyncStore: ' + error)
        }
    }
} 