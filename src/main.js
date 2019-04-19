import React, {Component} from 'react'
import { 
    View, StyleSheet, Text, ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
import {STYLE_CONTAINER} from './config/app.config'
import AppNavigation from './navigation/index'
import LoadingView from './components/loading'
import Login from './navigation/LoginStack'
class Main extends Component {
    render () {
        return (
            <View style={STYLE_CONTAINER}>
                {
                    this.props.userStatus == 'LOGIN_STATUS' ?
                    <Login/>
                    :
                    <AppNavigation/>
                }
                <LoadingView/>
            </View>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        userStatus : state.userStatus.userStatus
    }
}
export default connect(mapsStateToProps, null)(Main)

