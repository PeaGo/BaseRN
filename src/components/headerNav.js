import React, { Component } from 'react'
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity
} from 'react-native'
import { sizeFont, sizeHeight, sizeWidth } from '../helpers/size.helper'
import { PRIMARY_COLOR } from '../config/app.config'
import Icon from 'react-native-vector-icons/FontAwesome5Pro'
export default class headerNav extends Component {
    render() {
        const { actionLeft, actionRight, iconLeft, iconRight, title } = this.props
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.left}  
                                onPress={() => {actionLeft()}}
                >
                    {
                        iconLeft ? 
                        <Icon name={iconLeft} size={sizeFont(6)} color={PRIMARY_COLOR} light></Icon>
                        : 
                        <View></View>
                    }
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.text_title}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.right} 
                            onPress={() => {actionRight()}}
                    >
                    {
                        iconRight ? 
                        <Icon name={iconRight} size={sizeFont(6)} color={PRIMARY_COLOR}></Icon>
                        : 
                        <View></View>
                    }
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height : sizeHeight(8),
        width : sizeWidth(100),
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        
    },
    text_title:{
        fontSize: sizeFont(5),
        color: `${PRIMARY_COLOR}`,
        fontWeight: 'normal',
    },
    left : {
        flex:1,
        justifyContent: 'flex-start',
        paddingLeft: sizeWidth(4),
    },
    right: {
        flex:1,
        justifyContent: 'flex-end',
        paddingRight: sizeWidth(4),
    }
})