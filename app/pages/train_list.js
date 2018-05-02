import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    InteractionManager
} from 'react-native';

import DateHeaderComponent from '../components/train_list/date-header';
import ListComponent from '../components/train_list/list';
import SfzMaskComponent from '../components/train_list/sfz-mask';
import Loading1Component from '../components/train_list/loading';

import Loading2Component from '../components/loading';

import { getTrainList } from '../actions/http';

export default class TrainListPage extends Component {

    childContextTypes= {
        navigation: PropTypes.object
    }

    getChildContext= {
        navigation: this.props.navigation
    }

    static navigationOptions = ({ navigation }) => {
        const { state: { params: { from, to } } } = navigation;        

        return {
            headerTitle: `${from.Name}-${to.Name}`
        };
    }

    static propTypes = {
        navigation: PropTypes.object
    }

    state = {
        showLoading1: true,
        showLoading2: false,
        data: {}
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            const { navigation: { state: { params: { tripTime } } } } = this.props;
            
            this.requestTrainList(tripTime); 
        });
    }

    requestTrainList = (date, showLoading) => {
        const { navigation: { state: { params: { from, to } } } } = this.props;

        if (showLoading) {
            this.setState({
                showLoading2: true
            });
        }

        // 列表重新滚动到顶部
        this.FlatList && this.FlatList.scrollToOffset({ 
            animated: false, 
            offset: 0 
        });        

        // 保存选择的时间给订单页面用
        Storage.save({
            key: 'bDate',
            data: date,
            expires: null
        });
        
        getTrainList({
            params: {
                para: { 
                    'from': from.Name,
                    'to': to.Name, 
                    'oby': '0', 
                    date,
                    'platId': 501, 
                    'requestType': 4,
                    'headct': 1, 
                    'headus': 1, 
                    'headver': '2.14.0.2', 
                    'isstu': false, 
                    'headtime': Number(new Date()) 
                }
            },
            callback: ({ data }) => {
                if (this.hasChildOpen) { // itemCompnent子组件的上下文
                    this.childContext.close(); 
                }
                setTimeout(() => {
                    if (this.state.showLoading1) {
                        this.setState({
                            showLoading1: false
                        });
                    }
                    this.setState({ 
                        data,
                        showLoading2: false
                    });
                }, 500);
            }
        });
    }

    render() {
        const { data, showLoading1, showLoading2 } = this.state;
        
        return (
            <View style={styles.container}>
                <DateHeaderComponent getTrainList={this.requestTrainList} />
                <ListComponent data={data} parentContext={this} />
                <SfzMaskComponent />
                {showLoading1 ? <Loading1Component /> : null}
                {showLoading2 ? <Loading2Component /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7'
    },
});
