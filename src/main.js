import React, { Component } from 'react'
import {
    View, StyleSheet, Text, ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { STYLE_CONTAINER } from './config/app.config'
import AppNavigation from './navigation/index'
import LoadingView from './components/loading'
import Login from './navigation/LoginStack'
import AsyncstorageHelper from './helper/asyncstorage.helper'
import { setUserStatus, USER_STATUS_ACTION } from './redux/actions/userStatus.action'
import { show_loading, hide_loading } from './redux/actions/loading.action'

class Main extends Component {
    
    async componentWillMount() {
        this.props.showLoading();
        await AsyncstorageHelper._retrieveData('userData').then(userdata => {
            let userJson = JSON.parse(userdata);
            if (userJson != null) {
                if (userJson.id) {
                    this.props.updateUserStatus(USER_STATUS_ACTION.AUTHOR_STATUS);
                }
            }
        })
        this.props.hideLoading();
    }
    render() {
        return (
            <View style={STYLE_CONTAINER}>
                {
                    this.props.userStatus === USER_STATUS_ACTION.LOGIN_STATUS ?
                        <Login />
                        :
                        <AppNavigation />
                }
                <LoadingView />
            </View>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        userStatus: state.userStatus.userStatus
    }
}
const mapsDispatchToProps = (disptach) => {
    return {
        updateUserStatus: (status) => { disptach(setUserStatus(status)) },
        showLoading : () => {disptach(show_loading())},
        hideLoading : () => {disptach(hide_loading())}
    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(Main)

