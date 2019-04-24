import {createStackNavigator, createAppContainer} from 'react-navigation'
import Profile from '../screens/ProfileScreen'

export const ProfileStack = createStackNavigator (
    {
        Profile : Profile
    },
    {
        headerMode : 'none'
    }
);

export default createAppContainer(ProfileStack)