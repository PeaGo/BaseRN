import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont } from '../helper/size.helper'
import { getUserHouse1 } from '../api/house'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import { getUserHouse } from '../redux/actions/house'
import { connect } from 'react-redux';
import { BASE_URL_API } from '../config/app.config';
import HeaderNav from '../components/headerNav';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class Item extends Component {
    render() {
        const { item, navigation } = this.props;
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => {
                navigation.navigate('DetailHouse', { inforHouse: item })
            }}>
                <Image source={{ uri: BASE_URL_API + '/' + item.image_path[0] }} style={styles.imageView} />

                <View  style={{width:'75%'}}>
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <Text style={[styles.textView,{width:"90%"}]}><Icon name={"home"} color={'#F05B36'}></Icon> {item.title}</Text>
                        <View style={{width:"10%"}}>{item.state_pin ===1 ?<Icon name={'flag'} color={'gray'} ></Icon>:<View></View>}</View>
                    </View>
                    {/* <Text style={styles.textView}><Icon name={"home"}></Icon> {item.title}</Text> */}
                    <Text style={styles.textView}><Icon name={"dollar"} color={'#F05B36'}></Icon> Giá: {item.price} (triệu/tháng)</Text>
                    <Text style={styles.textView}><Icon name={"th-large"} color={'#F05B36'}></Icon> Diện tích: {item.total_area} m2</Text>
                    
                </View>
            </TouchableOpacity>
        )
    }
}
class HouseUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: []
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.list_user_house !== this.props.list_user_house) {
            this.setState({
                houses: nextProps.list_user_house
            })
        }
    }
    async componentWillMount() {
        this.props.showLoading();
        let data = await getUserHouse1();

        console.log(data);

        this.props.getUserHouse_(data);
        this.setState({
            houses: this.props.list_user_house
        })
        this.props.hideLoading();

    }
    render() {

        return (
            <View>
                <HeaderNav iconLeft='arrow-left'
                    title="Danh sách phòng của bạn"
                />
                <KeyboardAwareScrollView>
                    <View style={{ alignItems: 'center', flexDirection: 'column', padding: 10,paddingBottom: 60 }}>

                        <Button

                            onPress={() => {
                                this.props.navigation.navigate('DescriptionHouse')
                            }}
                            title="Tạo phòng mới"
                            color="#F05B36"
                            accessibilityLabel="Tạo phòng mới của bạn"
                        />
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
                </KeyboardAwareScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({


    imageView: {

        width: '25%',
        height: 100,
        margin: 7,
        borderRadius: 7

    },

    textView: {

        width: '65%',
        textAlignVertical: 'center',
        padding: 2,
        color: '#000'

    }

});
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
export default connect(mapsStateToProps, mapsDispatchToProps)(HouseUser)