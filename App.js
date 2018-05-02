/**
 * @flow
 */
import React from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store/configureStore';
// 配置react-native-storage
import './app/configureStorage';

import AppWithNavigationState from './app/navigators/AppNavigator';

export default class LyRN extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#efeff4',
                }}>
                    <AppWithNavigationState />
                </View>
            </Provider>
        );
    }
}
