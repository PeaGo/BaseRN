import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createHouse } from '../api/house';
import { getUserHouse } from '../redux/actions/house';
import { getUserHouse1 } from '../api/house';
import { connect } from 'react-redux';
class ConfirmHouse extends Component {
    constructor(props) {
        let param = props.navigation.getParam('inforHouse');
        // console.log('------',param)
        super(props)
        this.state = {
            phone: '',
            title: param.type_room + ', ' + param.address_detail,
            description: '',
        }
    }
    async _createHouse() {
        // this.props.showLoading();
        // goi api 
        let param = this.props.navigation.getParam('inforHouse');
        param = {
            ...param,
            phone: this.state.phone,
            title: this.state.title,
            description: this.state.description
        }
        let res = await createHouse(param).then(
            console.log(await getUserHouse1()),
            this.props.getUserHouse_(await getUserHouse1()).then(
                this.props.navigation.navigate('HouseScreenUser')
            ),
        )
        
        // console.log(res);

        // if (res.type == 1) {
        //     this.props.updateUserStatus(USER_STATUS_ACTION.AUTHOR_STATUS);
        //     await AsyncstorageHelper._storeData('userData', JSON.stringify(res));
        // }
        // this.props.hideLoading();
    }
    render() {
    
    
        return (
            <KeyboardAwareScrollView>
                <View>
                    <HeaderNav iconLeft='arrow-left'
                        title="Xác nhận phòng"
                        actionLeft={() => { this.props.navigation.goBack() }} />
                </View>
                <View>
                    <View style={{marginLeft:10}}>
                        <Text>Số điện thoại</Text>
                        <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })}></TextInput>
                    </View>
                </View>
                <View>
                    <View style={{marginLeft:10}}>
                        <Text>Tiêu đề phòng</Text>
                        <TextInput style={styles.input_row}  multiline={true} numberOfLines={2} value={this.state.title} onChangeText={(title) => this.setState({ title})}></TextInput>
                    </View>
                </View>
                <View>
                    <View style={{marginLeft:10}}>
                        <Text>Mô tả phòng</Text>
                        <TextInput style={styles.input_row} multiline={true} numberOfLines={5} value={this.state.description} onChangeText={(description) => this.setState({ description })}></TextInput>
                    </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                    <Button
                        onPress={() => {
                            this._createHouse();
                        }}
                        title="Tạo phòng"
                        color="#841584"
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input_row: {
        margin: 20, padding: 10, borderWidth: 1, borderRadius: 5
    },
})

const mapsStateToProps = (state) => {
    return {
        list_user_house: state.houseReducer.list_user_house
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        getUserHouse_: (data) => { dispatch(getUserHouse(data)) }
    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(ConfirmHouse)