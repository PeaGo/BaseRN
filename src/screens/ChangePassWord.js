import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert
} from 'react-native'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import HeaderNav from '../components/headerNav'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import { updateUser } from '../api/auth.api';
import AsyncstorageHelper from '../helper/asyncstorage.helper'
import { userLogin } from '../redux/actions/userStatus.action'
import { getUser } from '../api/auth.api';
class ChangePassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            repassword: '',
            oldpassword: '',
        };
    }
    async _changePass() {
        if (this.state.password !== this.state.repassword) {
            Alert.alert(
                'Thông báo',
                "Mật khẩu không khớp",
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            )
        }
        else if (this.state.password === "" || this.state.oldpassword === "") {
            Alert.alert(
                'Thông báo',
                "Vui lòng nhập mật khẩu",
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            )
        }
        else if (this.state.password === this.state.repassword) {
            this.props.showLoading();
            let mes = await updateUser({ _id: this.props.user_info.info_user._id, password: this.state.password,oldpassword:this.state.oldpassword });
            let user = await getUser(this.props.user_info.info_user);
            await this.props.userLogin(user);
            await AsyncstorageHelper._storeData('userData', JSON.stringify(user));

            Alert.alert(
                'Thông báo',
                mes.message,
                [
                    { text: 'OK', onPress: () => this.props.navigation.goBack() },
                ],
                { cancelable: false },
            )
            this.props.hideLoading();
        }

    }
    render() {


        return (
            <View>
                <HeaderNav iconLeft='arrow-left'
                    title="Thay đổi mật khẩu"
                    actionLeft={() => { this.props.navigation.goBack() }}
                />
                <KeyboardAwareScrollView >
                    <View style={{ paddingTop: 10 }}>
                        <View style={styles.input_container}>
                            <View style={styles.input_row}>
                                <Text style={styles.label_input}>Mật khẩu cũ</Text>
                                <TextInput style={styles.input} placeholder={'mật khẩu mới'} secureTextEntry={true} password={true} value={this.state.oldpassword} onChangeText={(oldpassword) => this.setState({ oldpassword })}></TextInput>
                            </View>
                            <View style={styles.input_row}>
                                <Text style={styles.label_input}>Mật khẩu mới</Text>
                                <TextInput style={styles.input} placeholder={'mật khẩu mới'} secureTextEntry={true} password={true} value={this.state.password} onChangeText={(password) => this.setState({ password })}></TextInput>
                            </View>
                            <View style={styles.input_row}>
                                <Text style={styles.label_input}>Nhập lại mật khẩu</Text>
                                <TextInput style={styles.input} placeholder={'nhập lại mật khẩu'} secureTextEntry={true} password={true} value={this.state.repassword} onChangeText={(repassword) => this.setState({ repassword })}></TextInput>
                            </View>
                            <TouchableOpacity style={[styles.input_row,
                            {
                                backgroundColor: '#F05B36', marginLeft: sizeWidth(10), marginRight: sizeWidth(10),
                                paddingTop: sizeHeight(1.5), paddingBottom: sizeHeight(1.5), borderRadius: 5

                            }]}
                                onPress={() => {
                                    this._changePass();
                                }}
                            >
                                <Text style={{ color: "white" }}> Thay đổi mật khẩu </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    head: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input_container: {
        flex: 2,
    },
    input_row: {
        paddingLeft: sizeWidth(10),
        paddingRight: sizeWidth(10),
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        paddingLeft: sizeWidth(5),
        paddingRight: sizeWidth(5),
        paddingTop: sizeHeight(1),
        paddingBottom: sizeHeight(1),
        color: 'red',
        width: sizeWidth(60),
        borderRadius: 5,

    },
    label_input: {
        width: sizeWidth(20)
    },
    bot_container: {
        marginLeft: sizeWidth(10),
        marginRight: sizeWidth(10),
        paddingTop: sizeHeight(1.5),
        paddingBottom: sizeHeight(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        borderRadius: 5,
    }
})
const mapsStateToProps = (state) => {
    return {
        user_info: state.userInfo
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        userLogin: (data) => { dispatch(userLogin(data)) }
    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(ChangePassWord)