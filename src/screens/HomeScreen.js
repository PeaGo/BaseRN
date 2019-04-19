import React, {Component} from 'react'
import {
    View, Text, StyleSheet, Button
} from 'react-native'
import {show_loading, hide_loading} from '../redux/actions/loading.action'
import {connect} from 'react-redux'
import {STYLE_CONTAINER} from '../config/app.config'
import {sizeFont} from '../helper/size.helper'
 class Home extends Component {
    render () {
        console.log(this.props);
        console.log('Home props');
        
        return (
            <View style={[STYLE_CONTAINER, {alignItems:'center', justifyContent: 'center',}]}>
                <Text style={{fontSize: sizeFont(5)}}>
                    Home Screen
                </Text>
                <Button title={'Show Loading'} onPress={()=>{
                    this.props.showLoading();
                    setTimeout(() => {
                        this.props.hideLoading()
                    }, 1000);
                }}/>
                
            </View>
        );
    }
}


const mapsStateToProps = (state) => {
    return {
        userStatus : state.userStatus.userStatus
    }
}

const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading : () => {
            dispatch(show_loading());
        },
        hideLoading : () => {
            dispatch(hide_loading())
        }
    }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Home)