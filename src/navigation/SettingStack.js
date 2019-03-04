import {createStackNavigator} from 'react-navigation'
import Setting from '../screens/SettingScreen'

export const SettingStack = createStackNavigator (
    {
        Setting : Setting
    },
    {
        headerMode : 'none'
    }
);