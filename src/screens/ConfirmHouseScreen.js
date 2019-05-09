import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createHouse } from '../api/house'
export default class ConfirmHouse extends Component {
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
            this.props.navigation.navigate('HouseScreenUser')
        );
        
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
                    <View>
                        <Text>Số điện thoại</Text>
                        <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })}></TextInput>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>Tiêu đề phòng</Text>
                        <TextInput style={styles.input_row}  multiline={true} numberOfLines={2} value={this.state.title} onChangeText={(title) => this.setState({ title})}></TextInput>
                    </View>
                </View>
                <View>
                    <View>
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

const mapsDispatchToProps = (dispatch) => {
    return {

    }
}