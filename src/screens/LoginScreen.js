import React, { Component } from 'react'
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity
} from 'react-native'
import { STYLE_CONTAINER } from '../config/app.config'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'

class Login extends Component {
    render() {
        return (
            <View style={STYLE_CONTAINER}>
                <View style={styles.head}>
                    <Text>Login</Text>
                </View>
                <View style={styles.input_container}>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Email</Text>
                        <TextInput style={styles.input} placeholder={'email'}></TextInput>
                    </View>
                    <View style={styles.input_row}>
                        <Text style={styles.label_input}>Password</Text>
                        <TextInput style={styles.input} placeholder={'password'}></TextInput>
                    </View>
                    <TouchableOpacity style={[styles.input_row, 
                        {backgroundColor:'red', marginLeft:sizeWidth(10), marginRight:sizeWidth(10),
                        paddingTop: sizeHeight(1.5),paddingBottom: sizeHeight(1.5), borderRadius : 5
                        
                        }]}>
                        <Text> Đăng nhập </Text>
                    </TouchableOpacity>

                    <View style={styles.bot_container}>
                        <Text style={styles.text} onPress ={()=> {
                            this.props.navigation.navigate('Register')
                        }}>Chưa có tài khoản</Text>
                        <Text style={styles.text}>Quên mật khẩu</Text>
                    </View>
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

export default Login