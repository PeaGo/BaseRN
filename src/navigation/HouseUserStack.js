import {createStackNavigator} from 'react-navigation'
import HouseScreenUser from '../screens/HouseScreenUser'
import LocationHouseScreen from '../screens/CreateLocationHouseScreen'
import DescriptionHouse from '../screens/DescriptionHouse'
import UtilitiesHouse from '../screens/UtilitiesHouse'
import ConfirmHouse from '../screens/ConfirmHouseScreen'

export const HouseUserStack = createStackNavigator (
    {
        HouseScreenUser : HouseScreenUser,
        LocationHouseScreen : LocationHouseScreen,
        DescriptionHouse : DescriptionHouse,
        UtilitiesHouse : UtilitiesHouse,
        ConfirmHouse : ConfirmHouse,
    },
    {
        headerMode : 'none'
    }
);