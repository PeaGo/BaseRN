import React, { Component } from 'react'
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import Logout from '../components/logout'
import HeaderNav from '../components/headerNav'
import Icon from 'react-native-vector-icons/FontAwesome'
import OneLine from '../components/oneline'

class ItemMenu extends Component {
    render() {
        const { navigation } = this.props
        const { icon, screen, title } = this.props.item;
        return (
            <View>
                <TouchableOpacity onPress={() => {

                    navigation.navigate(screen)


                }}>
                    <View style={styles.container_item}>
                        <View style={{ flexDirection: 'row', flex: 5 }}>
                            <Icon name={icon} size={sizeFont(6)} color={'#F05B36'}></Icon>
                            <Text style={styles.item_title}>{title}</Text>
                        </View>
                        <View style={{ flex: 5, alignItems: 'flex-end', marginRight: sizeWidth(3) }}>
                            <Icon name={'chevron-right'} size={sizeFont(6)} color={'#F05B36'}></Icon>
                        </View>
                    </View>
                </TouchableOpacity>
                <OneLine color={'#F05B36'} />
            </View>
        )
    }
}

export default class Profile extends Component {
    render() {
        const menu = [
            {
                title: 'Nạp điểm',
                icon: 'credit-card',
                screen: 'AddPoint'
            },
            {
                title: 'Lịch sử nạp điểm',
                icon: 'history',
                screen: 'HistoryAddPoint'
            },
        ]
        return (
            <View style={styles.container}>
                <HeaderNav
                    title="Profile"
                />
                <View style={styles.container_menu_view}>
                    <FlatList
                        data={menu}
                        renderItem={({ item }) => (<ItemMenu item={item} navigation={this.props.navigation} />)}
                    >

                    </FlatList>
                </View>
                <Logout navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    container_menu_view: {
        marginLeft: sizeWidth(5)
    },



    //item
    container_item: {
        height: sizeHeight(7),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    item_title: {
        flex: 1,
        marginLeft: sizeWidth(3),
        fontSize: sizeFont(4),
    },
    icon_end: {
        flex: 4,
        alignItems: 'flex-end',
        marginRight: sizeWidth(3),
        backgroundColor: 'blue'

    }
})