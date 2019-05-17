import {createStackNavigator} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import LocationUserScreen from '../screens/LocationUserScreen'
import DetailHouseSearch from '../screens/DetailHouseSearch'
export const HomeStack = createStackNavigator (
    {
        HomeScreen : HomeScreen,
        LocationUserScreen : LocationUserScreen,
        DetailHouseSearch:DetailHouseSearch
    },
    {
        headerMode : 'none'
    }
);