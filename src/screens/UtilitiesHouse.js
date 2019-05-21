import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList, Image
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    maxWidth: 400,
    maxHeight: 400,
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */


class UtilitieItem extends Component {
    render() {

        return (
            <View style={{ width: sizeWidth(45), marginLeft: sizeWidth(3) }}>
                <CheckBox
                    title={this.props.item}
                    checked={this.props.isSelect}
                    onPress={() => { this.props.action(this.props.item) }}
                />
            </View>
        )
    }
}
export default class UtilitiesHouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            utilities: utilities_type,
            images: [],
            avatar: '',
            utilities_selected: [],
            change: false,
        }
    }

    showAvatar = _ => {
        ImagePicker.showImagePicker(options, (response) => {


            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                // let images = this.state.images;
                // images.push(response.data)
                // You can also display the image using data:
                this.setState({
                    images: [...this.state.images, response.data]
                }, () => console.log(this.state.images)
                )



            }
        });

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



        return (
            <View style={{ paddingBottom: 80 }}>
                <HeaderNav iconLeft='arrow-left'
                    title="Tiện ích phòng"
                    actionLeft={() => { this.props.navigation.goBack() }} />
            <KeyboardAwareScrollView >
                <TouchableOpacity onPress={() => { this.showAvatar() }}>
                    <View ><Text style={styles.textput}>+ Thêm ảnh</Text></View>
                </TouchableOpacity>
                <View style={{ width: sizeWidth(96), marginLeft: sizeWidth(2) }}>
                    <FlatList

                        data={this.state.images}
                        renderItem={({ item, index }) => {
                            let source = { uri: 'data:image/jpeg;base64,' + item };
                            return (
                                <View style={{ margin: 5, borderWidth: 0.2 }}>
                                    <Image style={styles.image} key={index} source={source} style={{ width: 100, height: 100 }} />
                                </View>
                            )
                        }}
                        numColumns='3'
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        style={styles.images}>
                    </FlatList>
                </View>

                <View>
                    <FlatList
                        style={{ marginTop: 30, marginBottom: 10 }}
                        data={this.state.utilities}
                        extraData={this.state.utilities_selected}
                        numColumns='2'
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
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                    <Button
                        onPress={() => {
                            if (this.state.images.length === 0) {
                                alert('Vui lòng thêm ít nhất 1 ảnh')
                            }
                            else {
                                param.quantity_room = parseInt(param.quantity_room)
                                param.total_area = parseInt(param.total_area)
                                param.quantity_people = parseInt(param.quantity_people)
                                param.price = parseFloat(param.price)
                                param.deposit = parseFloat(param.deposit)
                                param.electric_bill = parseInt(param.electric_bill)
                                param.water_bill = parseInt(param.water_bill)
                                param.check_bill = parseInt(param.check_bill)
                                param = {
                                    ...param,
                                    utilities: this.state.utilities_selected,
                                    images: this.state.images
                                }
                                this.props.navigation.navigate('ConfirmHouse', { inforHouse: param })
                            }
                        }}
                        style={{ margin: 40 }}
                        title="Tiếp theo"
                        color="#F05B36"
                    />
                </View>
            </KeyboardAwareScrollView>
            </View>
        );
    }
}
const utilities_type = [
    "Chỗ để xe",
    "Cửa sổ",
    "Wifi",
    "WC riêng",
    "Tủ đồ",
    "Giường",
    "Tủ lạnh",
    "An ninh",
    "Tivi",
    "Máy lạnh",
    "Chủ riêng",
    "Bếp",
    "Bình nóng lạnh",

]

const styles = StyleSheet.create({
    input_row: {
        margin: 20, padding: 10, borderWidth: 1, borderRadius: 5
    },
    images: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
    },
    image: {
        margin: 5,
        borderRadius: 50,

    },
    textput: {
        textAlign: 'center',
        backgroundColor: '#F05B36',
        width: 120,
        margin: 15,
        alignSelf: 'center',
        borderRadius: 50,
        color: "white",
        fontWeight: "bold"
    },

})

const mapsDispatchToProps = (dispatch) => {
    return {

    }
}