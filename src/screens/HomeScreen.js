import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, TouchableOpacity, TextInput, FlatList, Image
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import HeaderNav from '../components/headerNav'
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Slider from "react-native-slider";
import { getUserSearch } from '../api/usersearchhouse'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import { getUserSearchHouse } from '../redux/actions/usersearchhouse'
import { BASE_URL_API } from '../config/app.config'
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

                <View>
                    <Text style={styles.textView}>{item.title}</Text>
                    <Text style={styles.textView}>Giá: {Math.round(item.price / 1000000 * 10) / 10} triệu/tháng</Text>
                    <Text style={styles.textView}>Diện tích: {item.total_area} m2</Text>
                    <Text style={styles.textView}>Khoảng cách: {Math.round(item.distance / 1000 * 10) / 10} km</Text>
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

    }
    action(address, location) {
        this.setState({ address, location }, () => {
            this.setState({ address_detail: this.state.address },async () => {
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
        console.log('lat', this.state.lat)
        return (

            <View style={{ paddingBottom: 60 }}>
                <KeyboardAwareScrollView>
                    {this.state.filter_view ?
                        <View style={{ paddingBottom: 60 }}>
                            <HeaderNav iconLeft='arrow-left'
                                title="Tạo phòng mới"
                                actionLeft={() => { this.setState({ filter_view: false }) }} />
                            <View style={{ marginLeft: 10 }}>
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
                                        minimumTrackTintColor='#1fb28a'
                                        maximumTrackTintColor='#d3d3d3'
                                        thumbTintColor='#1a9274'
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
                                        minimumTrackTintColor='#1fb28a'
                                        maximumTrackTintColor='#d3d3d3'
                                        thumbTintColor='#1a9274'
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
                                        minimumTrackTintColor='#1fb28a'
                                        maximumTrackTintColor='#d3d3d3'
                                        thumbTintColor='#1a9274'
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
                                    color="#841584"
                                />
                            </View>
                        </View>
                        :
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.input_row} onPress={() => {
                                    this.props.navigation.navigate('LocationUserScreen', { action: (address, location) => this.action(address, location), address: this.state.address })
                                }}>
                                    <Text>{this.state.address == '' ? this.state.string : this.state.address}</Text>
                                </TouchableOpacity>
                                <FontAwesome5Pro style={styles.filter_row} name={'sliders'} size={25} color={'gray'}
                                    onPress={() => {
                                        this.setState({ filter_view: true })
                                    }}></FontAwesome5Pro>

                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <FlatList
                                    data={this.state.houses}
                                    renderItem={({ item }) =>
                                        (<Item item={item} navigation={this.props.navigation} />)
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        </View>
                    }
                </KeyboardAwareScrollView>
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
        marginTop: 20, padding: 10, borderWidth: 1, borderRadius: 5, width: sizeWidth(80), marginLeft: 20, marginBottom: 20
    },
    filter_row: {
        marginTop: 20, padding: 10, width: sizeWidth(10), marginLeft: 5, marginBottom: 20
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

    }
})
const mapsStateToProps = (state) => {
    return {
        list_user_search_house: state.usersearchhouseReducer.list_user_search_house
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