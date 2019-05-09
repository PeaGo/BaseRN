import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class UtilitieItem extends Component {
    render() {

        return (
            <CheckBox
                title={this.props.item}
                checked={this.props.isSelect}
                onPress={() => { this.props.action(this.props.item) }}
            />
        )
    }
}
export default class UtilitiesHouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            utilities: utilities_type,
            utilities_selected: [],
            change: false,
        }
    }
    selectUtilitie = (item) => {
        is_selected = false
        new_selected = []
        this.state.utilities_selected.forEach(utilitie => {
            if (utilitie == item) {
                is_selected = true
            }
        })

        if (is_selected) {
            new_selected = this.state.utilities_selected.filter((item_) => item_ != item)
            this.setState({ utilities_selected: new_selected, change: true }, () => {
                return;
            })
        } else {
            new_selected = this.state.utilities_selected.filter((item_) => item_)
            new_selected = [...this.state.utilities_selected, item]
            this.setState({ utilities_selected: new_selected, change: true }, () => {
                return;
            })
        }

    }
    render() {
        let param = this.props.navigation.getParam('inforHouse');
        console.log('----------',param);
        
        
        return (
            <KeyboardAwareScrollView>
                <View>
                    <HeaderNav iconLeft='arrow-left'
                        title="Tiện ích phòng"
                        actionLeft={() => { this.props.navigation.goBack() }} />
                </View>
                <View>
                    <FlatList
                        data={this.state.utilities}
                        extraData={this.state.utilities_selected}
                        renderItem={({ item, index }) => {
                            var selected = false;
                            for (utilitie of this.state.utilities_selected) {
                                if (utilitie === item) {
                                    selected = true
                                }
                            }
                            return (
                                <UtilitieItem
                                    key={index}
                                    item={item}
                                    isSelect={selected}
                                    action={() => this.selectUtilitie(item)}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => item}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                        <Button
                            onPress={() => {
                                param.quantity_room =  parseInt(param.quantity_room)
                                param.total_area =  parseInt(param.total_area)
                                param.quantity_people =  parseInt(param.quantity_people)
                                param.price =  parseInt(param.price)
                                param.deposit =  parseInt(param.deposit)
                                param.electric_bill =  parseInt(param.electric_bill)
                                param.water_bill =  parseInt(param.water_bill)
                    
                                param = {
                                    ...param,
                                    utilities: this.state.utilities_selected
                                }
                                this.props.navigation.navigate('ConfirmHouse',{inforHouse:param})
                            }}
                            title="Tiếp theo"
                            color="#841584"
                        />
                    </View>
            </KeyboardAwareScrollView>
        );
    }
}
const utilities_type = [
    "Chỗ để xe",
    "Cửa sổ",
    "WC riêng",
    "Máy lạnh",
    "Tủ lạnh",
    "Bếp ga",
    "Bình nóng lạnh",
    "Giường",
    "Wifi",
    "An ninh",
    "Chủ riêng",

]

const styles = StyleSheet.create({
    input_row: {
        margin: 20, padding: 10, borderWidth: 1, borderRadius: 5
    },
})

const mapsDispatchToProps = (dispatch) => {
    return {

    }
}