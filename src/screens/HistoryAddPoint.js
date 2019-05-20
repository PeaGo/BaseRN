import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { gethistoryaddpoint } from '../api/auth.api';
import { connect } from 'react-redux';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity
} from 'react-native'
import { show_loading, hide_loading } from '../redux/actions/loading.action'
import { historyAddPoint } from '../redux/actions/userStatus.action'
import HeaderNav from '../components/headerNav'
import moment from "moment";
class HistoryAddPointScreen extends Component {

    async componentWillMount() {
        this.props.showLoading();
        let data = await gethistoryaddpoint(this.props.user_info.info_user);
        this.props.historyAddPoint(data);
        this.props.hideLoading();
    }
    render() {


        return (
            <View>
                <HeaderNav iconLeft='arrow-left'
                    title="Lịch sử nạp điểm của bạn"
                    actionLeft={() => { this.props.navigation.goBack() }}
                />
                <KeyboardAwareScrollView >
                    <View style={{ paddingTop: 10 }}>
                        <FlatList
                            data={this.props.user_info.history_add_point}
                            renderItem={({ item }) =>
                                (<View style={{
                                    marginLeft: 20, borderBottomColor: 'red',
                                    borderBottomWidth: 1,
                                    borderRadius: 5
                                }}>
                                    <Text>{item.title}</Text>
                                    <Text>{item.description}</Text>
                                    <Text>{moment(item.created_at).format('HH:mm DD/MM/YYYY')}</Text>
                                </View>)
                            }
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>

        );
    }
}

const mapsStateToProps = (state) => {
    return {
        user_info: state.userInfo
    }
}
const mapsDispatchToProps = (dispatch) => {
    return {
        showLoading: () => { dispatch(show_loading()) },
        hideLoading: () => { dispatch(hide_loading()) },
        historyAddPoint: (data) => { dispatch(historyAddPoint(data)) }

    }
}
export default connect(mapsStateToProps, mapsDispatchToProps)(HistoryAddPointScreen)