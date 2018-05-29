import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    InteractionManager,
} from 'react-native';

import DateHeaderComponent from '../components/train_list/date-header';
import ListComponent from '../components/train_list/list';
import SfzMaskComponent from '../components/train_list/sfz-mask';
import Loading1Component from '../components/train_list/loading';

import Loading2Component from '../components/loading';

import { getTrainList, } from '../actions/http';

import fakeData from '../fake/trainlist';

export default class TrainListPage extends Component {

    static navigationOptions = ({ navigation, }) => {
        const { state: { params: { from, to, }, }, } = navigation;        

        return {
            headerTitle: `${from.Name}-${to.Name}`,
        };
    }

    static propTypes = {
        navigation: PropTypes.object,
    }

    state = {
        showLoading1: true,
        showLoading2: false,
        data: {},
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            const { navigation: { state: { params: { tripTime, }, }, }, } = this.props;
            
            this.requestTrainList(tripTime); 
        });
    }

    requestTrainList = (date, showLoading) => {
        const { navigation: { state: { params: { from, to, }, }, }, } = this.props;

        if (showLoading) {
            this.setState({
                showLoading2: true,
            });
        }

        // 列表重新滚动到顶部
        this.FlatList && this.FlatList.scrollToOffset({ 
            animated: false, 
            offset: 0, 
        });        

        // 保存选择的时间给订单页面用
        Storage.save({
            key: 'bDate',
            data: date,
            expires: null,
        });
        
        // getTrainList({
        //     params: {
        //         para:{
        //             "TimeStamp": 1527576421.705,
        //             "ConstId": "5b0cf720cid8uOBPRHMAgXCqkmEoP6Ir5A8w46i1",
        //             "PlatId": 432,
        //             "From": "上海",
        //             "To": "北京",
        //             "Date": "2018-05-30",
        //             "OrderBy": 0,
        //             "IsStudent": false,
        //             "TrainNo": ""
        //         },
        //         sign: 'c1899d2506b2631bc4b8e1357a10b613'
        //     },
        //     callback: ({ data, }) => {
        setTimeout(()=>{
            if (this.hasChildOpen) { // itemCompnent子组件的上下文
                this.childContext.close(); 
            }
            if (this.state.showLoading1) {
                this.setState({
                    showLoading1: false,
                });
            }
            this.setState({ 
                data: fakeData,
                showLoading2: false,
            });
        }, 2000);
                
            // },
        // });
    }

    render() {
        const { navigation } = this.props;
        const { data, showLoading1, showLoading2, } = this.state;

        return (
            <View style={styles.container}>
                <DateHeaderComponent getTrainList={this.requestTrainList} navigation={navigation} />
                <ListComponent data={data || {}} parentContext={this} navigation={navigation} />
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
        backgroundColor: '#f2f4f7',
    },
});
