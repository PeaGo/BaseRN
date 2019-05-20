import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getUser, addPoint,gethistoryaddpoint } from '../api/auth.api';
import { connect } from 'react-redux';
import { userLogin} from '../redux/actions/userStatus.action'
import AsyncstorageHelper from '../helper/asyncstorage.helper'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import {
     Alert
} from 'react-native'
import { historyAddPoint } from '../redux/actions/userStatus.action'
class AddPointScreen extends Component {
   
    async componentWillMount() {
            this.props.showLoading();
            await addPoint(this.props.user_info.info_user);
            let user =await getUser(this.props.user_info.info_user);
            await this.props.userLogin(user);
            await AsyncstorageHelper._storeData('userData', JSON.stringify(user));
            let data = await gethistoryaddpoint(this.props.user_info.info_user);
            this.props.historyAddPoint(data);
            this.props.hideLoading();
            Alert.alert(
                'Thông báo',
                "Bạn đã được nạp 100 điểm vào tài khoản",
                [
                    { text: 'OK', onPress: () =>  this.props.navigation.navigate('Profile') },
                ],
                { cancelable: false },
            )
    }
    render() {


        return (
            <KeyboardAwareScrollView >
                
            </KeyboardAwareScrollView>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        user_info: state.userInfo
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        userLogin : (data) => {dispatch(userLogin(data))},
        historyAddPoint: (data) => { dispatch(historyAddPoint(data)) }

    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(AddPointScreen)