import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';

import LoadingComponent from '../components/train_list/loading';

import * as httpActions from '../actions/http';

export default class ComboPage extends Component {

    static propTypes = {
        navigation: PropTypes.object
    }

    state = {
        packages: [],
        showLoading: true
    }

    componentWillMount() {
        const { state: { params: { selectedSeats: { price } } } } = this.props.navigation;

        httpActions.getPackageInfo({
            params: {
                TicketPrice: price
            },
            callback: ({ packages }) => {
                this.setState({
                    packages,
                    showLoading: false
                });
            }
        });
    }

    _renderSubTitle = (item, index) => {
    }

    _renderList = (item, index) => {

        /**
         * charge 套餐价格
         * isDefault 是否是默认套餐
         * mainTitle 套餐名称
         */
        const { charge, isDefault, mainTitle, subTitles } = item;

        return (
            <View key={index} style={styles.card_panel}>
                <View style={styles.title}>
                    <Text style={styles.title_txt}>
                        {mainTitle} ¥{charge}/人
                    </Text>
                </View>
                {subTitles.map(this._renderSubTitle)}
            </View>
        );
    }

    render() {
        const { showLoading, packages } = this.state;

        return (
            <View style={styles.container}>
                {packages.length > 0 && packages.map(this._renderList)}
                {showLoading && <LoadingComponent />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f2f4f7'
    },
    'card_panel': {
        marginTop: scaleSize(12),
        marginLeft: scaleSize(6),
        marginRight: scaleSize(6),
        paddingBottom: scaleSize(10),
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,.1)',
                shadowOffset: { width: 1, 
                    height: 2 },
                shadowRadius: scaleSize(3),
                borderRadius: scaleSize(3)
            }
        })
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: scaleSize(12),
        paddingRight: scaleSize(12),
        height: scaleSize(44),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#eee'
    },
    'title_txt': {
        fontSize: setSpText(16),
        lineHeight: setSpText(16),
        color: '#333',
    }
});
