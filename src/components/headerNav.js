import React, { Component } from 'react'
import {
    View, Text, StyleSheet, SafeAreaView, TouchableOpacity
} from 'react-native'
import { sizeFont, sizeHeight, sizeWidth } from '../helper/size.helper'
import { PRIMARY_COLOR } from '../config/app.config'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux';
 class headerNav extends Component {
    render() {
        const { actionLeft, actionRight, iconLeft, iconRight, title } = this.props
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.left}
                    onPress={() => { actionLeft() }}
                >
                    {
                        iconLeft ?
                            <Icon name={iconLeft} size={sizeFont(6)} color={"white"} light></Icon>
                            :
                            <View></View>
                    }
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.text_title}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.right}
                    onPress={() => { actionRight() }}
                >
                    {
                        // iconRight ? 
                        // <Icon name={iconRight} size={sizeFont(6)} color={PRIMARY_COLOR}></Icon>
                        // : 
                        // <View></View>
                        title ==="Đăng ký"?<View></View>:
                        <View style={{ borderRadius: 30, backgroundColor: "white", justifyContent: 'center', alignItems: 'center',
                        flexDirection: 'row',}}>
                            <Icon light name={'product-hunt'} size={sizeFont(6)} color={'#F8B21C'}></Icon>
                            <Text style={{marginRight:10}}> {this.props.user_info.info_user.point}</Text>
                        </View>
                    }
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F05B36',
        height: sizeHeight(8),
        width: sizeWidth(100),
        flexDirection: 'row',
        alignItems: 'center',

    },
    title: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
       

    },
    text_title: {
        fontSize: sizeFont(4),
        //color: `${PRIMARY_COLOR}`,
        fontWeight: 'normal',
        color :"white"
    },
    left: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingLeft: sizeWidth(4),
    },
    right: {
        flex: 1,
        justifyContent: 'center', 
        alignItems:'flex-end',
        paddingRight: sizeWidth(4),
    }
})
const mapsStateToProps = (state) => {
    return {
        user_info : state.userInfo
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
      
    }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(headerNav)