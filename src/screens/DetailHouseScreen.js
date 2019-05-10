import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, FlatList, Image,
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HeaderNav from '../components/headerNav'
class DetailHouse extends Component {
    constructor(props) {
        let param = props.navigation.getParam('inforHouse');
        super(props);
        this.state = {
            inforHouse: param
        };
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
                        <View>
                            <Image source={{ uri: "http://i.imgur.com/ykHuo4y.jpg" }} style={styles.imageView} />
                        </View>
                        <View>
                            <Text>{data.type_room}</Text>
                            <Text>Số người: {data.quantity_people}/Giới tính: {data.type_sex}</Text>
                        </View>
                        <View><Text style={styles.title}>{data.title}</Text></View>
                    </View>
                    <View style={styles.padding_bottom}>
                    <View>
                        <Text style={styles.tienich}>Tiện ích</Text>
                    </View>
                    </View>
                

                </KeyboardAwareScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    backgroud: {

    },
    body: {

        backgroundColor: "#f1f1f1",

    },
    padding_bottom: {
        width: sizeWidth(95),padding: 10, borderRadius: 10, borderColor: 'black', flexDirection: "column", backgroundColor: '#fff', alignSelf: 'center', margin: sizeHeight(2)
    },
    imageView: {

        width: '100%',
        height: 200,

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
    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(DetailHouse)