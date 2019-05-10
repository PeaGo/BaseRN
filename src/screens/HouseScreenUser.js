import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, FlatList, Image,TouchableOpacity
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont } from '../helper/size.helper'
import { getUserHouse1 } from '../api/house'
import {show_loading,hide_loading} from '../redux/actions/loading.action'
import {getUserHouse} from '../redux/actions/house'
import {connect} from 'react-redux'
class Item extends Component {
    render () {
        const {item, navigation} = this.props;
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => {
                navigation.navigate('DetailHouse',{inforHouse:item})
            }}>
                <Image source={{ uri: "http://i.imgur.com/ykHuo4y.jpg" }} style={styles.imageView} />
                <View>
                    <Text style={styles.textView}>{item.title}</Text>
                    <Text style={styles.textView}>Giá: {item.price}VND/tháng</Text>
                    <Text style={styles.textView}>Diện tích: {item.total_area} m2</Text>
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
    async componentWillMount() {
         this.props.showLoading();
        let data = await getUserHouse1();
        
        console.log(data);
        
        this.props.getUserHouse_(data);
        this.setState({
            houses : this.props.list_user_house
        })
        this.props.hideLoading();

    }
    render() {
        console.log('store');
        console.log(this.state.houses);
        
        return (

            <View style={{ alignItems: 'center', paddingTop: 50, flexDirection: 'column' }}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('DescriptionHouse')
                    }}
                    title="Tạo Phòng"
                    color="#841584"
                    accessibilityLabel="Tạo phòng mới của bạn"
                />
                <View style={{ paddingTop: 10}}> 
                    <FlatList
                        data={this.state.houses}
                        renderItem={({ item }) => 
                           (<Item item = {item} navigation = {this.props.navigation}/>)
                        }
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
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
        list_user_house : state.houseReducer.list_user_house
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        getUserHouse_: (data) =>{ dispatch(getUserHouse(data))}
    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(HouseUser)