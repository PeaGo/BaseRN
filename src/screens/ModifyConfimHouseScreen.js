import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList, Alert
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { updateHouse } from '../api/house';
import { getUserHouse } from '../redux/actions/house';
import { getUserHouse1 } from '../api/house';
import { getUser } from '../api/auth.api';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/userStatus.action'
import AsyncstorageHelper from '../helper/asyncstorage.helper'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import ConfirmHouseScreen from './ConfirmHouseScreen';
class CheckBoxItem extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         checked: this.props.value == this.props.type_room ? true:false,
    //     }
    // }
    render() {



        return (
            <CheckBox
                title={this.props.value}
                checked={this.props.value == this.props.type ? true : false}
                onPress={() => {
                    if (this.props.value == this.props.type) {
                        return;
                    }
                    this.props._reset(this.props.value, this.props.point_pin)
                }}
            />
        )
    }
}
class ModifyConfirmHouse extends Component {
    constructor(props) {
        let param = props.navigation.getParam('inforHouse');
        // console.log('------',param)
        super(props)
        this.state = {
            phone: param.phone,
            title: param.type_room + ', ' + param.address_detail,
            description: param.description,
            check_save: false,

        }
    }
    async _createHouse() {
        // this.props.showLoading();
        // goi api 


        Alert.alert(
            'Thông báo',
            "Bạn có muốn sửa thông tin",
            [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this._confirmHouse() },
            ],
            { cancelable: false },
        )


        // console.log(res);

        // if (res.type == 1) {
        //     this.props.updateUserStatus(USER_STATUS_ACTION.AUTHOR_STATUS);
        //     await AsyncstorageHelper._storeData('userData', JSON.stringify(res));
        // }
        // this.props.hideLoading();
    }
    async _confirmHouse() {
        let param = this.props.navigation.getParam('inforHouse');
        param.description = this.state.description;
        param.phone = this.state.phone;
        param.title = this.state.titles
        this.props.showLoading();
        await updateHouse(param);
        let user = await getUser(this.props.user_info.info_user);
        await this.props.userLogin(user);
        await AsyncstorageHelper._storeData('userData', JSON.stringify(user));
        let data = await getUserHouse1();
        await this.props.getUserHouse_(data)
       
        this.props.hideLoading();
        Alert.alert(
            'Thông báo',
            "Bạn đã sửa thông tin phòng thành công",
            [
                { text: 'OK', onPress: () =>  this.props.navigation.navigate('HouseScreenUser')},
            ],
            { cancelable: false },
        )
        

    }
    render() {


        return (
            <KeyboardAwareScrollView >
                <View style={{ marginBottom: 30 }}>
                    <View>
                        <HeaderNav iconLeft='arrow-left'
                            title="Xác nhận phòng"
                            actionLeft={() => { this.props.navigation.goBack() }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text>Số điện thoại</Text>
                            <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })}></TextInput>
                            {this.state.phone === "" && this.state.check_save ? <Text style={{ color: "red", padding: 2 }}>Vui lòng nhập số điện thoại</Text> : <Text></Text>}
                        </View>
                    </View>
                    <View>
                        <View style={{ marginLeft: 10 }}>
                            <Text>Tiêu đề phòng</Text>
                            <TextInput style={styles.input_row} multiline={true} numberOfLines={2} value={this.state.title} onChangeText={(title) => this.setState({ title })}></TextInput>
                            {this.state.title === "" && this.state.check_save ? <Text style={{ color: "red", padding: 2 }}>Vui lòng nhập tiêu đề phòng</Text> : <Text></Text>}
                        </View>
                    </View>
                    <View>
                        <View style={{ marginLeft: 10 }}>
                            <Text>Mô tả phòng</Text>
                            <TextInput style={styles.input_row} multiline={true} numberOfLines={5} value={this.state.description} onChangeText={(description) => this.setState({ description })}></TextInput>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'column', marginTop: 5 }}>
                        <Button
                            onPress={() => {
                                if (this.state.phone === "" || this.state.title === "") {
                                    this.setState({ check_save: true })
                                }
                                else {
                                    this._createHouse();
                                }

                            }}
                            title="Sửa thông tin phòng"
                            color="#F05B36"
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input_row: {
        margin: 10, padding: 5, borderWidth: 1, borderRadius: 5
    },
})

const mapsStateToProps = (state) => {
    return {
        list_user_house: state.houseReducer.list_user_house,
        user_info: state.userInfo
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        getUserHouse_: (data) => { dispatch(getUserHouse(data)) },
        userLogin: (data) => { dispatch(userLogin(data)) }

    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(ModifyConfirmHouse)