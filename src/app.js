import React, {Component} from 'react'
import Main from './main'
import configureStore from './redux/store/configureStore'
import {Provider} from 'react-redux'

class App extends Component {
    render () {
        return (
            <Provider store={configureStore}>
                <Main/>
            </Provider>
        );
    }
}
export default App;