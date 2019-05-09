import React, { Component } from 'react'
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import { connect } from 'react-redux'
import { login } from '../api/auth.api'
import { USER_STATUS_ACTION } from '../redux/actions/userStatus.action'
import { setUserStatus } from '../redux/actions/userStatus.action'
import AsyncstorageHelper from '../helper/asyncstorage.helper'
import RequestHelper from '../helper/request.helper';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: '',
        };
    }

    // _fake_call_api() {
    //         let fake_data = { type: 1, id: 1, name: 'Tien' };
    //         return new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 resolve(fake_data);
    //             },
    //             2000)
    //         });
       
    // }
    async _login() {
        // goi api 
        //--  let res  = await login(userdata);

        //fake api call
        // this.props.showLoading();
        let res = await login(this.state); 
        console.log(res);
        
        if (res.token !== undefined && res.user !== null && res.user !== undefined && res.user !== {}) {
            console.log('1');
            
            this.props.updateUserStatus(USER_STATUS_ACTION.AUTHOR_STATUS);
            await AsyncstorageHelper._storeData('userData', JSON.stringify(res.user));
        }
        else{
            if(res.message){
                alert(res.message)
            }
            else{
                alert('Vui lòng bạn nhập đúng tài khoản và mật khẩu')
            }
            
        }
        this.props.hideLoading();
    }
    render() {
        return (
            <View style={STYLE_CONTAINER}>
                <View style={styles.head}>
                    <Text style={{ fontWeight: 'bold', color: 'green', fontSize: sizeWidth(10) }}>Login</Text>
                </View>
                <View style={styles.input_container}>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Email</Text>
                        <TextInput keyboardType={'email-address'} style={styles.input} placeholder={'email'} value={this.state.email} onChangeText={(email) => this.setState({email})}></TextInput>
                    </View>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Password</Text>
                        <TextInput style={styles.input} placeholder={'mật khẩu'} secureTextEntry={true} password={true} value={this.state.password} onChangeText={(password) => this.setState({password})}></TextInput>
                    </View>
                    <TouchableOpacity style={[styles.input_row,
                    {
                        backgroundColor: 'red', marginLeft: sizeWidth(10), marginRight: sizeWidth(10),
                        paddingTop: sizeHeight(1.5), paddingBottom: sizeHeight(1.5), borderRadius: 5

                    }]}
                    onPress = {() => {
                        this._login();
                    }}
                    >
                        <Text> Đăng nhập </Text>
                    </TouchableOpacity>

                    <View style={styles.bot_container}>
                        <Text style={styles.text} onPress={() => {
                            this.props.navigation.navigate('Register')
                        }}>Chưa có tài khoản</Text>
                        <Text style={styles.text}>Quên mật khẩu</Text>
                    </View>
                </View>
            </View>
        )
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

const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        updateUserStatus : (status) => {dispatch(setUserStatus(status))}
    }
}
export default connect(null, mapsDispatchToProps)(Login)