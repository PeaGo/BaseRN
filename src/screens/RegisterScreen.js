import React, { Component } from 'react'
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import Header from '../components/headerNav'

class Register extends Component {
    render() {
        return (
            <View style={STYLE_CONTAINER}>
                   <Header
                        iconLeft='arrow-left'
                        actionLeft={() => { this.props.navigation.goBack() }}
                        title = {'Đăng ký'}
        />
                <View style={styles.head}>
                    <Text>Register</Text>
                </View>
                <View style={styles.input_container}>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Email</Text>
                        <TextInput style={styles.input} placeholder={'email'}></TextInput>
                    </View>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Tên người dùng</Text>
                        <TextInput style={styles.input} placeholder={'tên đăng ký'}></TextInput>
                    </View>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Mật khẩu</Text>
                        <TextInput style={styles.input} placeholder={'mật khẩu'}></TextInput>
                    </View>
                    <TouchableOpacity style={[styles.input_row, 
                        {backgroundColor:'red', marginLeft:sizeWidth(10), marginRight:sizeWidth(10),
                        paddingTop: sizeHeight(1.5),paddingBottom: sizeHeight(1.5), borderRadius : 5
                        
                        }]}>
                        <Text> Đăng ký </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input_row: {
        paddingLeft: sizeWidth(10),
        paddingRight: sizeWidth(10),
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        paddingLeft: sizeWidth(5),
        paddingRight: sizeWidth(5),
        paddingTop: sizeHeight(1),
        paddingBottom: sizeHeight(1),
        color: '#fff',
        width : sizeWidth(60),
        borderRadius: 5,

    },
    label_input : {
        width : sizeWidth(20)
    },
    bot_container : {
        marginLeft:sizeWidth(10),
        marginRight:sizeWidth(10),
        paddingTop: sizeHeight(1.5),
        paddingBottom: sizeHeight(1.5),
        flexDirection: 'row',
        justifyContent : 'space-between'
    },
    text: {
        borderBottomColor : 'red',
        borderBottomWidth: 1,
        borderRadius:   5,
    }
})

export default Register