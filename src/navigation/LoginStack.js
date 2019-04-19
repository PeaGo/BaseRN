import {createStackNavigator, createAppContainer} from 'react-navigation'
import Login from '../screens/LoginScreen'
import Register from '../screens/RegisterScreen'

export const LoginStack = createStackNavigator (
    {
        Setting : Login,
        Register : Register
    },
    {
        headerMode : 'none'
    }
);

export default createAppContainer(LoginStack)