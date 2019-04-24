import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncstorageHelper from '../helper/asyncstorage.helper'
import { connect } from "react-redux";
import { sizeHeight, sizeFont, sizeWidth } from "../helper/size.helper";
import { USER_STATUS_ACTION, setUserStatus } from "../redux/actions/userStatus.action"
import {show_loading, hide_loading} from '../redux/actions/loading.action'
import RNRestart from 'react-native-restart'
class Logout extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.view_item}
                onPress={() => {
                    Alert.alert(
                        'Đăng xuất ',
                        'Đăng xuất ',
                        [
                            { text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            {
                                text: 'YES', onPress: async () => {
                                    //this.props.updateUserStatus(USER_STATUS_ACTION.LOGIN_STATUS);
                                    await AsyncstorageHelper._removeData('userData');
                                    RNRestart.Restart();
                                    console.log(this.props);
                                }
                            },
                        ],
                        { cancelable: false }
                    )

                }}
            >
                <View style={styles.view_icon}>
                    <Icon name='power-off' size={sizeFont(6)} />
                </View>
                <View style={styles.view_text}>
                    <Text style={styles.text}>{'Đăng xuất'}</Text>
                </View>

            </TouchableOpacity>

        )
    }

}
const styles = StyleSheet.create({
    view_item: {
        marginLeft: sizeWidth(3),
        marginBottom: 1,
        height: sizeHeight(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    view_icon: {
        width: sizeWidth(11),
        justifyContent: 'center',
    },
    view_text: {
        justifyContent: 'center',
        flex: 1
    },
    text: {
        fontSize: sizeFont(4),
        fontWeight: 'bold',
    }
})
const mapsStateToProps = (state) => {
    return {
        userStatus: state.userStatus.userStatus
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        updateUserStatus: (status) => { dispatch(setUserStatus(status)) },
        showLoading : () => {dispatch(show_loading())},
        hideLoading : () => {dispatch(hide_loading())}
    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(Logout);
