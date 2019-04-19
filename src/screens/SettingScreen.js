import React, {Component} from 'react'
import {
    View, Text, StyleSheet
} from 'react-native'
import {STYLE_CONTAINER} from '../config/app.config'
import {sizeFont} from '../helper/size.helper'
export default class Setting extends Component {
    render () {
        return (
            <View style={[STYLE_CONTAINER, {alignItems:'center', justifyContent: 'center',}]}>
                <Text style={{fontSize: sizeFont(5)}}>
                    Home Screen
                </Text>
            </View>
        );
    }
}
// Day l branch tets