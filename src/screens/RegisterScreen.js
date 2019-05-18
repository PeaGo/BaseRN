import React, { Component } from 'react'
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity,Alert
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import Header from '../components/headerNav'
import { register } from '../api/auth.api'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import { USER_STATUS_ACTION } from '../redux/actions/userStatus.action'
import { setUserStatus } from '../redux/actions/userStatus.action'
import AsyncstorageHelper from '../helper/asyncstorage.helper'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { Avatar } from 'react-native-elements';

var options = {
    title: 'Select Avatar',
    // customButtons: [
    //   {name: 'fb', title: 'Choose Photo from Facebook'},
    // ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    maxWidth: 500,
    maxHeight: 500,
};
export const picker = (cb) => {
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            cb(source, response.data);
        }
    });
}
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            mobile: '',
            avatar: { uri: 'http://www.chicshelfpaper.com/images/P/0260.jpg' }, data: null, active: false, disabled: true
        };
    }
    async _register() {
        this.props.showLoading();
        // goi api 
        let res = await register(this.state).then(
            Alert.alert(
                'Thông báo',
                'Tạo tài khoản thành công',
                [
                 
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ],
                {cancelable: false},
              )
        );

       

        // if (res.type == 1) {
        //     this.props.updateUserStatus(USER_STATUS_ACTION.AUTHOR_STATUS);
        //     await AsyncstorageHelper._storeData('userData', JSON.stringify(res));
        // }
        this.props.hideLoading();
    }
    showAvatar = _ => {
        picker((source, data) => {
            console.log(source)
            this.setState({ avatar: source, data: data, active: true, disabled: false })
        })

    }
    render() {
        return (
            <View style={STYLE_CONTAINER}>
                <Header
                    iconLeft='arrow-left'
                    actionLeft={() => { this.props.navigation.goBack() }}
                    title={'Đăng ký'}
                />
                <View style={styles.head}>
                    <Text style={{ fontWeight: 'bold', color: '#F05B36', fontSize: sizeWidth(10) }}>Register</Text>
                </View>
                <View style={styles.avatar_container}>
                <Avatar
                    showEditButton
                    rounded
                    source={{
                        uri:
                            this.state.avatar.uri
                    }}
                    size = 'large'
                />
                </View>

                <View style={styles.input_container}>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Email</Text>
                        <TextInput keyboardType={'email-address'} style={styles.input} placeholder={'email'} value={this.state.email} onChangeText={(email) => this.setState({ email })}></TextInput>
                    </View>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Tên người dùng</Text>
                        <TextInput style={styles.input} placeholder={'tên đăng ký'} value={this.state.username} onChangeText={(username) => this.setState({ username })}></TextInput>
                    </View>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Mật khẩu</Text>
                        <TextInput style={styles.input} placeholder={'mật khẩu'} value={this.state.password} onChangeText={(password) => this.setState({ password })}></TextInput>
                    </View>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Số điện thoại</Text>
                        <TextInput keyboardType={'numeric'} style={styles.input} placeholder={'số điện thoại'} value={this.state.mobile} onChangeText={(mobile) => this.setState({ mobile })}></TextInput>
                    </View>
                    <TouchableOpacity style={[styles.input_row,
                    {
                        backgroundColor: '#F05B36', marginLeft: sizeWidth(10), marginRight: sizeWidth(10),
                        paddingTop: sizeHeight(1.5), paddingBottom: sizeHeight(1.5), borderRadius: 5

                    }]}
                        onPress={() => {
                            this._register();
                        }}
                    >
                        <Text color={{color:"white"}}> Đăng ký </Text>
                    </TouchableOpacity>

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
    },
    avatar_container : {
        alignItems: 'center',
        justifyContent : 'center',
        paddingBottom : 20
    }
})
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        updateUserStatus: (status) => { dispatch(setUserStatus(status)) }
    }
}
export default connect(null, mapsDispatchToProps)(Register)