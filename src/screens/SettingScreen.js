import React, {Component} from 'react'
import {
    View, Text, StyleSheet,Button
} from 'react-native'
import {STYLE_CONTAINER} from '../config/app.config'
import {sizeFont} from '../helper/size.helper'
export default class Setting extends Component {
    render () {
        return (

            <View>
                <Button
                // onPress={}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}
// Day l branch tets