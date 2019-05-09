import React, { Component } from 'react'
import {
    View, Text, StyleSheet, Button, FlatList, Image
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont } from '../helper/size.helper'
import { getUserHouse } from '../api/house'
export default class HouseUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [
                {
                    "location": {
                        "coordinates": [
                            105.8450141,
                            21.0011367
                        ],
                        "type": "Point"
                    },
                    "status": 1,
                    "utilities": [
                        "Chỗ để xe",
                        "Cửa sổ",
                        "WC riêng",
                        "Máy lạnh",
                        "Tủ lạnh",
                        "Bếp ga"
                    ],
                    "images": [],
                    "_id": "5cd2f19683c7b626489ec5ad",
                    "created_by": "5cc186075cb4b821e47a622f",
                    "address_detail": "67 Lê Thanh Nghị, Đồng Tâm, Hai Bà Trưng, Hà Nội",
                    "type_room": "Phòng cho thuê",
                    "quantity_room": 1,
                    "total_area": 25,
                    "quantity_people": 3,
                    "price": 2000000,
                    "deposit": 3000000,
                    "electric_bill": 0,
                    "water_bill": 0,
                    "check_bill": true,
                    "phone": "0342064718",
                    "title": "Phòng cho thuê, 67 Lê Thanh Nghị, Đồng Tâm, Hai Bà Trưng, Hà Nội",
                    "description": "Nhà của huy\n",
                    "created_at": "2019-05-08T15:11:18.155Z",
                    "updated_at": "2019-05-08T15:11:18.155Z",
                    "__v": 0
                },
                {
                    "location": {
                        "coordinates": [
                            105.7932615,
                            20.9868078
                        ],
                        "type": "Point"
                    },
                    "status": 1,
                    "utilities": [
                        "Tủ lạnh",
                        "Bếp ga",
                        "Bình nóng lạnh",
                        "Giường",
                        "Wifi"
                    ],
                    "images": [],
                    "_id": "5cd300083b7fd318087a5291",
                    "address_detail": "67 Phùng Khoang, Trung Văn, Hà Đông, Hà Nội",
                    "type_room": "Phòng cho thuê",
                    "quantity_room": 1,
                    "total_area": 10,
                    "quantity_people": 3,
                    "price": 2000000,
                    "deposit": 200000,
                    "electric_bill": 0,
                    "water_bill": 0,
                    "check_bill": true,
                    "phone": "0342064718",
                    "title": "Phòng cho thuê, 67 Phùng Khoang, Trung Văn, Hà Đông, Hà Nội",
                    "description": "Tgvh hjjj",
                    "created_by": "5cc186075cb4b821e47a622f",
                    "created_at": "2019-05-08T16:12:56.966Z",
                    "updated_at": "2019-05-08T16:12:56.966Z",
                    "__v": 0
                }
            ]
        };
    }
    async componentWillMount() {
        // this.props.showLoading();
        getUserHouse().then(data => {
            console.log(data)
        })


        // this.setState({ houses : data[0] })

        // this.props.hideLoading();
    }
    render() {

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
                        renderItem={({ item, index }) => {

                            return (
                                <View style={{ flex: 1, flexDirection: 'row' }} onPress={() => {
                                    this.props.navigation.navigate('DetailHouse',{inforHouse:houses})
                                }}>
                                    <Image source={{ uri: "http://i.imgur.com/ykHuo4y.jpg" }} style={styles.imageView} />
                                    <View>
                                        <Text style={styles.textView}>{item.title}</Text>
                                        <Text style={styles.textView}>Giá: {item.price}VND/tháng</Text>
                                        <Text style={styles.textView}>Diện tích: {item.total_area} m2</Text>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => item}
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