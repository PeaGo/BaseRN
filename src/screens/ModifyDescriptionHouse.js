import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
                    this.props._reset(this.props.value)
                }}
            />
        )
    }
}
export default class ModifyDescriptionHouse extends Component {
    constructor(props) {
        super(props)
        let param = this.props.navigation.getParam('inforHouse');
        console.log('qqq',param.check_bill)
        this.state = {
            address_detail: param.address_detail,
            type_room: param.type_room,
            quantity_room: param.quantity_room,
            total_area: param.total_area,
            type_sex: param.type_sex,
            price: param.price,
            deposit: param.deposit,
            electric_bill: param.electric_bill,
            water_bill: param.water_bill,
            check_bill: param.check_bill,
            check_save: false,
            quantity_people:param.quantity_people

        }
    }
   
    render() {
        let state = this.state
        let param = this.props.navigation.getParam('inforHouse');
        return (

            <View style={{ paddingBottom: 80 }}>
                <HeaderNav iconLeft='arrow-left'
                    title="Tạo phòng mới"
                    actionLeft={() => { this.props.navigation.goBack() }} />
                <KeyboardAwareScrollView>
                    <View style={{ marginLeft: 10, marginTop: 10 }}>
                        <Text>Loại phòng</Text>
                        <FlatList
                            ListEmptyComponent={<Text>Không có dữ liệu</Text>}
                            data={type_room}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <CheckBoxItem
                                        value={item.value}
                                        type={this.state.type_room}
                                        _reset={(type_room) => {
                                            this.setState({ type_room: type_room })
                                        }}
                                    />

                                )
                            }}
                        ></FlatList>
                        {this.state.type_room === "" && this.state.check_save ? <Text style={{ color: "red", padding: 2 }}>Vui lòng chọn loại phòng</Text> : <Text></Text>}
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text>Địa chỉ chi tiết</Text>
                        <TextInput style={styles.input_row} editable={false} placeholder={'Địa chỉ chi tiết phòng trọ'} value={this.state.address_detail} onChangeText={(address_detail) => this.setState({ address_detail })}></TextInput>

                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text>Sức chứa</Text>
                        <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.quantity_people.toString()} onChangeText={(quantity_people) => this.setState({ quantity_people })}></TextInput>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text>Diện tích phòng(m2)</Text>
                        <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.total_area.toString()} onChangeText={(total_area) => this.setState({ total_area })}></TextInput>
                        {this.state.total_area === 0 && this.state.check_save? <Text style={{ color: "red", padding: 2 }}>Vui lòng nhập diện tích phòng</Text> : <Text></Text>}
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text>Giới tính</Text>
                        <FlatList
                            ListEmptyComponent={<Text>Không có dữ liệu</Text>}
                            data={type_sex}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <CheckBoxItem
                                        value={item.value}
                                        type={this.state.type_sex}
                                        _reset={(type_sex) => {
                                            this.setState({ type_sex: type_sex })
                                        }}
                                    />

                                )
                            }}
                        ></FlatList>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text>Giá cho thuê/phòng (triệu/tháng)</Text>
                        <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.price.toString()} onChangeText={(price) => this.setState({ price})}></TextInput>
                        {this.state.price === 0 && this.state.check_save? <Text style={{ color: "red", padding: 2 }}>Vui lòng nhập giá phòng</Text> : <Text></Text>}
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text>Tiền cọc (triệu)</Text>
                        <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.deposit.toString()} onChangeText={(deposit) => this.setState({deposit })}></TextInput>
                    </View >
                    <CheckBox
                        title='Điện nước giá dân'
                        checked={parseInt(this.state.check_bill) == 1 ? true : false}
                        onPress={() => this.setState({ check_bill: parseInt(this.state.check_bill) == 1 ? 0 : 1, electric_bill: 0, water_bill: 0 })}
                    />
                    {parseInt(this.state.check_bill) == 1 ? null :
                        <View>
                            <View style={{ marginLeft: 10 }}>
                                <Text>Tiền điện/kw</Text>
                                <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.electric_bill.toString()} onChangeText={(electric_bill) => this.setState({ electric_bill })}></TextInput>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text>Tiền nước/m3</Text>
                                <TextInput style={styles.input_row} keyboardType={'numeric'} value={this.state.water_bill.toString()} onChangeText={(water_bill) => this.setState({ water_bill })}></TextInput>
                            </View>
                        </View>}
                    <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                        <Button
                            onPress={() => {
                                if(state.total_area === 0 || state.type_room === "" || state.address_detail === "" || state.price === 0){
                                    this.setState({check_save : true})
                                    alert("Vui lòng nhập đủ các thông tin bắt buộc")
                                }
                                else{
                                    this.setState({check_save : false})
                                   
                                    param.type_room =  this.state.type_room;
                                    param.quantity_room = this.state.quantity_room;
                                    param.total_area = this.state.total_area;
                                    param.type_sex = this.state.type_sex;
                                    param.price = this.state.price;
                                    param.deposit = this.state.deposit;
                                    param.electric_bill = this.state.electric_bill;
                                    param.water_bill = this.state.water_bill;
                                    param.check_bill = this.state.check_bill;
                            
                                    param.quantity_people = this.state.quantity_people
                                    this.props.navigation.navigate('ModifyUtilitiesHouse', { inforHouse: param })
                                }
                                
                            }}
                            title="Tiếp theo"
                            color="#F05B36"
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>

        );
    }
}
const type_room = [
    {
        value: "Phòng cho thuê"
    },
    {
        value: "Phòng ở ghép"
    },
]
const type_sex = [
    {
        value: "Tất cả"
    },
    {
        value: "Nam"
    },
    {
        value: "Nữ"
    },
]
const styles = StyleSheet.create({
    input_row: {
        margin: 10, padding: 5, borderWidth: 1, borderRadius: 5
    },
})

const mapsDispatchToProps = (dispatch) => {
    return {

    }
}