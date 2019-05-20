import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList, Alert
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createHouse } from '../api/house';
import { getUserHouse } from '../redux/actions/house';
import { getUserHouse1 } from '../api/house';
import { getUser } from '../api/auth.api';
import { connect } from 'react-redux';
import { userLogin} from '../redux/actions/userStatus.action'
import AsyncstorageHelper from '../helper/asyncstorage.helper'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
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
class ConfirmHouse extends Component {
    constructor(props) {
        let param = props.navigation.getParam('inforHouse');
        // console.log('------',param)
        super(props)
        this.state = {
            phone: '',
            title: param.type_room + ', ' + param.address_detail,
            description: '',
            check_save: false,
            point_pin: 10,
            date_pin: "5 ngày - 10 điểm",
            pin: 0
        }
    }
    async _createHouse() {
        // this.props.showLoading();
        // goi api 
        let text = 'Bài đăng của bạn cần 30 điểm đăng bài '
        if (this.state.pin === 1) {
            text = 'Bài đăng của bạn cần 30 điểm đăng bài và ' + this.state.point_pin + " điểm ghim bài viết"
        }
        Alert.alert(
            'Thông báo',
            text,
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
        let points = 30 + this.state.point_pin;
        let points_user = this.props.user_info.info_user.point;
        if (points_user >= points) {
            let user_point = points_user - points;
            let param = this.props.navigation.getParam('inforHouse');
            param = {
                ...param,
                phone: this.state.phone,
                title: this.state.title,
                description: this.state.description,
                pin: this.state.pin,
                point_pin: this.state.point_pin,
                user_point: user_point,
                user_id: this.props.user_info.info_user._id
            }
            this.props.showLoading();
            await createHouse(param);
            let user =await getUser(this.props.user_info.info_user);
            await this.props.userLogin(user);
            await AsyncstorageHelper._storeData('userData', JSON.stringify(user));
            let data = await getUserHouse1();
            await this.props.getUserHouse_(data)
            this.props.hideLoading();
            Alert.alert(
                'Thông báo',
                "Bạn đã tạo phòng thành công",
                [
                    { text: 'OK', onPress: () =>  this.props.navigation.navigate('HouseScreenUser')},
                ],
                { cancelable: false },
            )
            
             
        }
        else {
            Alert.alert(
                '',
                "Bạn không đủ điểm vui lòng nạp thêm điểm",
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
                    <CheckBox
                        title='Ghim bài đăng'
                        checked={this.state.pin === 1 ? true : false}
                        onPress={() => this.setState({ pin: this.state.pin === 1 ? 0 : 1 })}
                    />
                    {this.state.pin === 1 ? <View style={{ marginLeft: 10 }}>
                        <FlatList
                            ListEmptyComponent={<Text>Không có dữ liệu</Text>}
                            data={date_pin}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <CheckBoxItem
                                        value={item.title}
                                        point_pin={item.value}
                                        type={this.state.date_pin}
                                        _reset={(date_pin, point_pin) => {
                                            this.setState({ date_pin: date_pin, point_pin: point_pin })
                                        }}
                                    />

                                )
                            }}
                        ></FlatList>
                    </View> : <View></View>}

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
                            title="Tạo phòng"
                            color="#F05B36"
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
const date_pin = [
    { title: "5 ngày - 10 điểm", value: 10 },
    { title: "10 ngày - 20 điểm", value: 20 },
    { title: "15 ngày - 30 điểm", value: 30 },

]

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
        userLogin : (data) => {dispatch(userLogin(data))}

    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(ConfirmHouse)