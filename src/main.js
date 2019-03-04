import React, {Component} from 'react'
import { 
    View, StyleSheet, Text, ActivityIndicator
} from 'react-native'
import {STYLE_CONTAINER} from './config/app.config'
import AppNavigation from './navigation/index'
import LoadingView from './components/loading'
export default class Main extends Component {
    render () {
        return (
            <View style={STYLE_CONTAINER}>
                <AppNavigation/>
                <LoadingView/>
            </View>
        );
    }
}