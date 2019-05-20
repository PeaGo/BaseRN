import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList, Image, SafeAreaView
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Slider from "react-native-slider";
import { getUserSearch } from '../api/usersearchhouse'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import { getUserSearchHouse } from '../redux/actions/usersearchhouse'
import { BASE_URL_API } from '../config/app.config';
class CheckBoxItem extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         checked: this.props.value == this.props.type_room ? true:false,
    //     }
    // }
    render() {
        console.log(this.props);


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
class Item extends Component {
    render() {
        const { item, navigation } = this.props;
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => {
                navigation.navigate('DetailHouseSearch', { inforHouse: item })
            }}>
                <Image source={{ uri: BASE_URL_API + '/' + item.image_path[0] }} style={styles.imageView} />

                <View style={{ width: '75%' }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Text style={[styles.textView, { width: "90%" }]}><Icon name={"home"} color={'#F05B36'}></Icon> {item.title}</Text>
                        <View style={{ width: "10%" }}>{item.state_pin === 1 ?<Icon name={'flag'} color={'gray'}></Icon> : <View></View>}</View>
                    </View>
                    {/* <Text style={styles.textView}><Icon name={"home"}></Icon> {item.title}</Text> */}
                    <Text style={styles.textView}><Icon name={"dollar"} color={'#F05B36'}></Icon> Giá: {item.price} (triệu/tháng)</Text>
                    <Text style={styles.textView}><Icon name={"th-large"} color={'#F05B36'}></Icon> Diện tích: {item.total_area} m2</Text>
                    <Text style={styles.textView}><Icon name={"road"} color={'#F05B36'}></Icon> Khoảng cách: {Math.round(item.distance / 1000 * 10) / 10} km</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: {},
            lat: 21.0513,
            lng: 105.8102,
            string: 'Nhập địa chỉ của bạn',
            address: '',
            type_room: 'Tất cả',
            total_area: 1000,
            price: 50,
            filter_view: false,
            distance: 5,
            houses: [],


        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.list_user_house !== this.props.list_user_house) {
            this.setState({
                houses: nextProps.list_user_search_house
            })
        }
    }
    async componentWillMount() {
        this.props.showLoading();
        let data_search = {
            lat: this.state.lat,
            lng: this.state.lng,
            distance: 100,
            price: this.state.price,
            total_area: this.state.total_area,
            type_room: this.state.type_room
        }
        let data = await getUserSearch(data_search);
        this.props.getUserSearchHouse(data);
        this.setState({
            houses: this.props.list_user_search_house
        })
        this.props.hideLoading();

    }
    action(address, location) {
        this.setState({ address, location }, () => {
            this.setState({ address_detail: this.state.address }, async () => {
                this.setState({ lat: location.lat, lng: location.lng })
                this.props.showLoading();
                let data_search = {
                    lat: location.lat,
                    lng: location.lng,
                    distance: this.state.distance,
                    price: this.state.price,
                    total_area: this.state.total_area,
                    type_room: this.state.type_room
                }
                let data = await getUserSearch(data_search);
                this.props.getUserSearchHouse(data);
                this.setState({
                    houses: this.props.list_user_search_house
                })
                this.props.hideLoading();
            })
        })
    }
    render() {
        console.log('lat', this.props.user_info)
        return (

            <View style={{ paddingBottom: 10 }}>

                {this.state.filter_view ?
                    <View style={{ paddingBottom: 60 }}>
                        <HeaderNav iconLeft='arrow-left'
                            title="Lọc tiêu chí phòng"
                            actionLeft={() => { this.setState({ filter_view: false }) }} />
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
                        </View>
                        <View style={{ width: '100%', marginLeft: 10, marginRight: 20 }}>
                            <View style={styles.view_title_sort}>
                                <Text>Giá phòng</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View style={{ width: 30 }}>
                                    <Text >0</Text>

                                </View>
                                <Text style={{ width: 90, marginLeft: 40 }}>{Math.round(this.state.price * 10) / 10} triệu</Text>
                                <View style={{ width: 60, marginRight: 20 }}>
                                    <Text >50 triệu</Text>

                                </View>

                            </View>
                            <View style={{ marginRight: 25 }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={50}
                                    value={this.state.price}
                                    minimumTrackTintColor='#F05B36'
                                    maximumTrackTintColor='#d3d3d3'
                                    thumbTintColor='#F05B36'
                                    onValueChange={(value) => this.setState({ price: value })}
                                />

                            </View>
                        </View>
                        <View style={{ width: '100%', marginLeft: 10, marginRight: 20 }}>
                            <View style={styles.view_title_sort}>
                                <Text>Khoảng cách</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View style={{ width: 30 }}>
                                    <Text >0</Text>

                                </View>
                                <Text style={{ width: 90, marginLeft: 40 }}>{Math.round(this.state.distance * 10) / 10} km</Text>
                                <View style={{ width: 60, marginRight: 20 }}>
                                    <Text >10 km</Text>

                                </View>

                            </View>
                            <View style={{ marginRight: 25 }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={10}
                                    value={this.state.distance}
                                    minimumTrackTintColor='#F05B36'
                                    maximumTrackTintColor='#d3d3d3'
                                    thumbTintColor='#F05B36'
                                    onValueChange={(value) => this.setState({ distance: value })}
                                />

                            </View>
                        </View>
                        <View style={{ width: '100%', marginLeft: 10, marginRight: 20 }}>
                            <View style={styles.view_title_sort}>
                                <Text>Diện tích phòng</Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <View style={{ width: 30 }}>
                                    <Text >0</Text>

                                </View>
                                <Text style={{ width: 90, marginLeft: 40 }}>{Math.round(this.state.total_area * 10) / 10} m2</Text>
                                <View style={{ width: 60, marginRight: 20 }}>
                                    <Text >1000m2</Text>

                                </View>

                            </View>
                            <View style={{ marginRight: 25 }}>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={1000}
                                    value={this.state.total_area}
                                    minimumTrackTintColor='#F05B36'
                                    maximumTrackTintColor='#d3d3d3'
                                    thumbTintColor='#F05B36'
                                    onValueChange={(value) => this.setState({ total_area: value })}
                                />

                            </View>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                            <Button
                                onPress={async () => {
                                    this.props.showLoading();
                                    let data_search = {
                                        lat: this.state.lat,
                                        lng: this.state.lng,
                                        distance: this.state.distance,
                                        price: this.state.price,
                                        total_area: this.state.total_area,
                                        type_room: this.state.type_room
                                    }
                                    let data = await getUserSearch(data_search);
                                    this.props.getUserSearchHouse(data);
                                    this.setState({
                                        houses: this.props.list_user_search_house,
                                        filter_view: false
                                    })
                                    this.props.hideLoading();

                                }}
                                style={{ margin: 30 }}
                                title="Áp dụng"
                                color="#F05B36"
                            />
                        </View>
                    </View>
                    :
                    <View>

                        <SafeAreaView style={styles.container}>
                            <TouchableOpacity style={styles.left}

                            >
                                <Text style={styles.text_title}>Tìm phòng</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.right}

                            >
                                {
                                    <View style={{
                                        borderRadius: 30, backgroundColor: "white", justifyContent: 'center', alignItems: 'center',
                                        flexDirection: 'row',
                                    }}>
                                        <Icon light name={'product-hunt'} size={sizeFont(6)} color={'#F8B21C'}></Icon>
                                        <Text style={{ marginRight: 10 }}> {this.props.user_info.info_user.point}</Text>
                                    </View>
                                }
                            </TouchableOpacity>

                        </SafeAreaView>
                        <SafeAreaView style={{
                            backgroundColor: "#F05B36", height: sizeHeight(6),
                            width: sizeWidth(100),
                        }}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <TouchableOpacity style={styles.input_row} onPress={() => {
                                    this.props.navigation.navigate('LocationUserScreen', { action: (address, location) => this.action(address, location), address: this.state.address })
                                }}>
                                    <Text style={{ color: "white" }}>{this.state.address == '' ? this.state.string : this.state.address}</Text>
                                </TouchableOpacity>
                                <Icon style={styles.filter_row} name={'sliders'} size={25} color={'white'}
                                    onPress={() => {
                                        this.setState({ filter_view: true })
                                    }}></Icon>
                            </View>
                        </SafeAreaView>
                        <KeyboardAwareScrollView >
                            <View style={{ paddingTop: 10, paddingBottom: 30 }}>
                                <FlatList
                                    data={this.state.houses}
                                    renderItem={({ item }) =>
                                        (<Item item={item} navigation={this.props.navigation} />)
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        </KeyboardAwareScrollView>

                    </View>

                }
            </View>

        );
    }
}
const type_room = [
    {
        value: "Tất cả"
    },
    {
        value: "Phòng cho thuê"
    },
    {
        value: "Phòng ở ghép"
    },
]

const styles = StyleSheet.create({
    input_row: {
        padding: 5, borderRadius: 5, width: sizeWidth(80), marginLeft: 20, marginBottom: 10,
        backgroundColor: "#fe8668"
    },
    filter_row: {
        padding: 5, width: sizeWidth(10), marginLeft: 5, marginBottom: 10
    },
    imageView: {

        width: '25%',
        height: 110,
        margin: 7,
        borderRadius: 7

    },

    textView: {

        width: '65%',
        textAlignVertical: 'center',
        padding: 2,
        color: '#000'

    },
    container: {
        backgroundColor: '#F05B36',
        height: sizeHeight(5),
        width: sizeWidth(100),
        flexDirection: 'row',
        alignItems: 'center',

    },
    title: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',


    },
    text_title: {
        fontSize: sizeFont(3),
        //color: `${PRIMARY_COLOR}`,
        fontWeight: 'normal',
        color: "white"
    },
    left: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingLeft: sizeWidth(4),
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: sizeWidth(4),
    }
})
const mapsStateToProps = (state) => {
    return {
        list_user_search_house: state.usersearchhouseReducer.list_user_search_house,
        user_info: state.userInfo
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        getUserSearchHouse: (data) => { dispatch(getUserSearchHouse(data)) }
    }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(HomeScreen)