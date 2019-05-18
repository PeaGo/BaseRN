import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, FlatList, Image,
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HeaderNav from '../components/headerNav'
import { BASE_URL_API } from '../config/app.config'
class DetailHouse extends Component {
    constructor(props) {
        let param = props.navigation.getParam('inforHouse');
        super(props);
        this.state = {
            inforHouse: param,

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
                        <View style={{ marginBottom: 5 }}>
                            <Image source={{ uri: BASE_URL_API + '/' + data.image_path[0] }} style={styles.imageView} />
                        </View>
                        <View>
                            <Text>{data.type_room}</Text>
                            <Text>Số người: {data.quantity_people}/Giới tính: {data.type_sex}</Text>
                        </View>
                        <View style={{ marginBottom: 5 }}><Text style={styles.title}>{data.title}</Text></View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{ width: 120, marginLeft: 20 }}>
                                <Text >Giá phòng</Text>

                            </View>
                            <View style={{ width: 120, marginLeft: 40 }}><Text>Đặt cọc</Text></View>
                            <View style={{ width: 120, marginRight: 20 }}>
                                <Text >Diện tích</Text>

                            </View>

                        </View>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{ width: 120, marginLeft: 20 }}>
                                <Text style={{ color: '#dc3545' }}>{Math.round(data.price / 1000000 * 10) / 10}triệu/tháng</Text>

                            </View>
                            <View style={{ width: 120, marginLeft: 40 }}>
                                <Text style={{ color: '#dc3545' }}>{Math.round(data.deposit / 1000000 * 10) / 10}triệu</Text>
                            </View>
                            <View style={{ width: 120, marginRight: 20 }}>
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
                                        <View style={styles.tienichItem}><Text style={{color:"white"}}>{item}</Text></View>
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
                            <Text style={styles.tienich}>Liên hệ</Text>
                            <View style={{ margin: 10 }}>
                                <Text><Text style={{ fontWeight: "bold" }}>Số điện thoại</Text>  : {this.state.inforHouse.phone}</Text>
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
    },
    tienichItem: {
        textAlignVertical: 'center',
        justifyContent: 'center',
        width: 120,
        height: 30,
        padding: 5,
        alignItems:"center",
        borderRadius: 20,
        margin: 2,
        backgroundColor: '#F05B36',
        

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