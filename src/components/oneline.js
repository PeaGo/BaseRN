import React, { Component } from "react";
import { View } from "react-native";
import {sizeWidth} from '../helper/size.helper'
class OneLineColumn extends Component {

    render() {
        return (
            <View style={{ width: 0.5, height: "100%", backgroundColor: 'gary', alignSelf: 'flex-end' }}>
            </View>
        )
    }
}
class OneLine extends Component {

    render() {
        const {color} = this.props;
        return (
            <View style={{ width: '100%', height: 0.5, backgroundColor: color ? color : 'gray', alignSelf: 'flex-end', marginRight: sizeWidth(3), }}>
            </View>
        )
    }
}
export {
    OneLineColumn
}
export default OneLine