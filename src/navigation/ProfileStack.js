import {createStackNavigator, createAppContainer} from 'react-navigation'
import Profile from '../screens/ProfileScreen'
import AddPoint from '../screens/AddPointScreen';
import HistoryAddPoint from '../screens/HistoryAddPoint'
import ChangePassWord from '../screens/ChangePassWord'
export const ProfileStack = createStackNavigator (
    {
        Profile : Profile,
        AddPoint : AddPoint,
        HistoryAddPoint : HistoryAddPoint,
        ChangePassWord:ChangePassWord
       
    },
    {
        headerMode : 'none'
    }
);

export default createAppContainer(ProfileStack)