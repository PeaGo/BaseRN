import {createStackNavigator} from 'react-navigation'
import Home from '../screens/HomeScreen'

export const HomeStack = createStackNavigator(
    {
        Home : {
            screen : Home,
           
        }
    },
    {
        headerMode: 'none'
    }

);