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
import { deleteHouse, pinHouse } from '../api/house';
import { getUserHouse } from '../redux/actions/house';
import { getUserHouse1 } from '../api/house';
import { getUser } from '../api/auth.api';
import { userLogin } from '../redux/actions/userStatus.action'
import AsyncstorageHelper from '../helper/asyncstorage.helper'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";

class DetailHouse extends Component {
    constructor(props) {
        let param = props.navigation.getParam('inforHouse');
        super(props);
        this.state = {
            inforHouse: param,
            point_pin: 0,
            pin: 0,
            check_click: false
        };
    }
    async _deleteHouse(data) {
        // this.props.showLoading();
        // goi api 

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
    async _pinHouse(data) {
        // this.props.showLoading();
        // goi api 

        Alert.alert(
            'Thông báo',
            'Bài đăng của bạn cần ' + data.point + ' để ghim bài',
            [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this._confirmPinHouse(data) },
            ],
            { cancelable: false },
        )



    }
    async _confirmPinHouse(data_pin) {
        console.log('---', this.props.user_info.info_user.point)
        let points_user = this.props.user_info.info_user.point;

        if (parseInt(points_user) >= parseInt(data_pin.point)) {
            console.log('---', data_pin.point)
            let user_point = points_user - data_pin.point;
            let param = {
                _id: data_pin._id,
                point: user_point,
                user_id: this.props.user_info.info_user._id
            }
            this.props.showLoading();
            await pinHouse(param);
            let user = await getUser(this.props.user_info.info_user);
            await this.props.userLogin(user);
            await AsyncstorageHelper._storeData('userData', JSON.stringify(user));
            let data = await getUserHouse1();
            await this.props.getUserHouse_(data)
            this.props.hideLoading();
            Alert.alert(
                'Thông báo',
                "Bạn đã ghim bài viết thành công",
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('HouseScreenUser') },
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
                        {data.check_bill === 1 ? 
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{
                                width: sizeWidth(40), marginLeft: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text >Điện nước giá dân</Text>

                            </View>
                        </View>
                            : <View><View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View style={{
                                    width: sizeWidth(30), marginLeft: 10, textAlignVertical: 'center',
                                    justifyContent: 'center', alignItems: "center"
                                }}>
                                    <Text >Tiền điện</Text>

                                </View>
                                <View style={{
                                    width: sizeWidth(30), marginLeft: 10, textAlignVertical: 'center',
                                    justifyContent: 'center', alignItems: "center"
                                }}><Text>Tiền nước</Text></View>
                                <View style={{
                                width: sizeWidth(20), marginRight: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text ></Text>

                            </View>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{
                                width: sizeWidth(30), marginLeft: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text style={{ color: '#dc3545' }}>{data.electric_bill}/kw</Text>

                            </View>
                            <View style={{
                                width: sizeWidth(30), marginLeft: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text style={{ color: '#dc3545' }}>{data.water_bill}/m3</Text>
                            </View>
                            <View style={{
                                width: sizeWidth(20), marginRight: 10, textAlignVertical: 'center',
                                justifyContent: 'center', alignItems: "center"
                            }}>
                                <Text style={{ color: '#dc3545' }}></Text>

                            </View>
                        </View>
                            </View>
                        }

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
                            {this.state.inforHouse.state_pin === 1 ? <Text>Bài viết của đạt đươc ghim đến ngày {moment(this.state.inforHouse.out_date).format('DD/MM/YYYY')}</Text> : <View>
                                <Text onPress={() => {
                                    this.setState({ check_click: !this.state.check_click })
                                }}><Icon name={'flag'} color={'gray'}></Icon> Ấn vào đây để ghim bài đăng của bạn</Text>
                                {this.state.check_click ? <View style={{ marginLeft: 10 }}>
                                    <FlatList
                                        ListEmptyComponent={<Text>Không có dữ liệu</Text>}
                                        data={date_pin}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ margin: 10, padding: 8, height: sizeHeight(5), borderRadius: 30, backgroundColor: "#F05B36" }}

                                                >
                                                    <Text onPress={() => {

                                                        this._pinHouse({ _id: this.state.inforHouse._id, point: item.value })
                                                    }} style={{ color: "white" }}>Ghim bài đăng {item.title}</Text>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>
                                </View> : <View></View>}
                            </View>}
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
const date_pin = [
    { title: "5 ngày - 10 điểm", value: 10 },
    { title: "10 ngày - 20 điểm", value: 20 },
    { title: "15 ngày - 30 điểm", value: 30 },

]
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
export default connect(mapsStateToProps, mapsDispatchToProps)(DetailHouse)