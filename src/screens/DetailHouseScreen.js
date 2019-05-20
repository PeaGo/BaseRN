import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, FlatList, Image, Alert
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HeaderNav from '../components/headerNav'
import { BASE_URL_API } from '../config/app.config'
import Swiper from 'react-native-swiper';
import { deleteHouse } from '../api/house';
import { getUserHouse } from '../redux/actions/house';
import { getUserHouse1 } from '../api/house';
class DetailHouse extends Component {
    constructor(props) {
        let param = props.navigation.getParam('inforHouse');
        super(props);
        this.state = {
            inforHouse: param,

        };
    }
    async _deleteHouse(data) {
        // this.props.showLoading();
        // goi api 
        console.log('1111111skkss')
        Alert.alert(
            'Thông báo',
            'Bạn muốn xóa bài đăng',
            [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this._confirmHouse(data) },
            ],
            { cancelable: false },
        )



    }
    async _confirmHouse(data) {

        let res = await deleteHouse(data).then(
            console.log(await getUserHouse1()),
            this.props.getUserHouse_(await getUserHouse1()).then(
                this.props.navigation.navigate('HouseScreenUser')
            ),
        )
    }
    render() {
        let data = this.state.inforHouse

        return (

            <View>
                <View>
                    <HeaderNav iconLeft='arrow-left'
                        title="Chi tiết phòng"
                        actionLeft={() => { this.props.navigation.goBack() }} />
                </View>
                <KeyboardAwareScrollView style={styles.body}>

                    <View style={styles.padding_bottom}>
                        {/* <View style={{ marginBottom: 5 }}>
                            <Image source={{ uri: BASE_URL_API + '/' + data.image_path[0] }} style={styles.imageView} />
                        </View> */}
                        <View style={{
                            width: sizeWidth(90),
                            height: sizeHeight(45),
                            paddingBottom: 10
                        }}>
                            <Swiper
                                loop={false}
                                bounces={true}
                                // onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                                dot={<View style={{ backgroundColor: "red", width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                                activeDot={<View style={{ backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                                paginationStyle={{
                                    alignSelf: 'center'
                                }}>
                                {
                                    data.image_path.map((item, index) => {
                                        return (
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                backgroundColor: 'transparent'
                                            }} key={index}>
                                                <Image source={{ uri: BASE_URL_API + '/' + item }} style={styles.imageView} />
                                            </View>
                                        )
                                    })
                                }
                            </Swiper>
                        </View>
                        <View>
                            <Text>{data.type_room}</Text>
                            <Text>Số người: {data.quantity_people}/Giới tính: {data.type_sex}</Text>
                        </View>
                        <View style={{ marginBottom: 5 }}><Text style={styles.title}>{data.title}</Text></View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{
                                width: sizeWidth(30), marginLeft: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text >Giá phòng</Text>

                            </View>
                            <View style={{
                                width: sizeWidth(30), marginLeft: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}><Text>Đặt cọc</Text></View>
                            <View style={{
                                width: sizeWidth(20), marginRight: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text >Diện tích</Text>

                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{
                                width: sizeWidth(30), marginLeft: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text style={{ color: '#dc3545' }}>{data.price} (triệu/tháng)</Text>

                            </View>
                            <View style={{
                                width: sizeWidth(30), marginLeft: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text style={{ color: '#dc3545' }}>{data.deposit} triệu</Text>
                            </View>
                            <View style={{
                                width: sizeWidth(20), marginRight: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text style={{ color: '#dc3545' }}>{data.total_area} m2</Text>

                            </View>

                        </View>

                    </View>
                    <View style={styles.padding_bottom}>
                        <View>
                            <Text style={styles.tienich}>Tiện ích</Text>
                            <FlatList
                                data={this.state.inforHouse.utilities}

                                numColumns='3'
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.tienichItem}><Text style={{ color: "white" }}>{item}</Text></View>
                                    )
                                }}
                                keyExtractor={(item, index) => item}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                    <View style={styles.padding_bottom}>
                        <View>
                            <Text style={styles.tienich}>Mô tả phòng</Text>
                            <View><Text>{this.state.inforHouse.description}</Text></View>
                        </View>
                    </View>
                    <View style={styles.padding_bottom}>
                        <View>
                            <View style={styles.bot_container}>
                                <Text style={styles.text} onPress={() => {
                                    this._deleteHouse({ _id: this.state.inforHouse._id })
                                }}>Xóa bài đăng</Text>
                                <Text style={styles.text} onPress={() => {
                                    this.props.navigation.navigate('ModifyDescriptionHouse', { inforHouse: data })
                                }}>Sửa bài đăng</Text>
                            </View>
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    backgroud: {

    },
    body: {

        backgroundColor: "#f1f1f1",
        marginBottom: 60

    },
    padding_bottom: {
        width: sizeWidth(95), padding: 10, borderRadius: 10, borderColor: 'black', flexDirection: "column", backgroundColor: '#fff', alignSelf: 'center', margin: sizeHeight(2)
    },
    imageView: {

        width: '100%',
        height: 380,

        borderRadius: 7

    },

    textView: {

        width: '65%',
        textAlignVertical: 'center',
        padding: 2,
        color: '#000'

    },
    title: {
        fontWeight: '600',
        fontSize: 20,
    },
    tienich: {

        fontWeight: '600',
        fontSize: 15,
    },
    tienichItem: {
        textAlignVertical: 'center',
        justifyContent: 'center',
        width: 120,
        height: 30,
        padding: 5,
        alignItems: "center",
        borderRadius: 20,
        margin: 2,
        backgroundColor: '#F05B36',


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

});
const mapsStateToProps = (state) => {
    return {

    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        getUserHouse_: (data) => { dispatch(getUserHouse(data)) },
    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(DetailHouse)