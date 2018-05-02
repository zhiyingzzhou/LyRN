import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    StyleSheet,
    InteractionManager
} from 'react-native';

import BannerComponent from '../components/home/banner';
import NoticeComponent from '../components/home/notice';
import QueryCityComponent from '../components/home/query_city';
import QueryDateComponent from '../components/home/query_date';
import CheckboxComponent from '../components/home/checkbox';
import ButtonComponent from '../components/home/button';
import OperationComponent from '../components/home/operation';
import PubOperationComponent from '../components/home/pub_operation';

import { getBanner, getNotice, getTab } from '../actions/http';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectCity } from '../actions';

class TrainPage extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        fromCity: PropTypes.object,
        toCity: PropTypes.object,
        tripTime: PropTypes.string,
        tripTimeDesc: PropTypes.string,
        selectCity: PropTypes.func
    }

    state = {
        tabIcon: {}
    }

    componentWillMount() {
        // this.props.getBanner();
        // this.props.getNotice();
        // this.props.getTab();
        // 获取通知
        getNotice({
            params: { projectId: 10 },
            that: this
        });
        // 获取banner
        getBanner({
            params: {},
            that: this
        });
        getTab({
            params: {},
            that: this
        });
    }

    toSelectCityPage(key) {
        const { navigation } = this.props;

        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('City', {
                key
            });
        });
    }

    selectDate = () => {
        // tripTime year-month-day 2017-10-06
        const { navigation, tripTime } = this.props;

        InteractionManager.runAfterInteractions(() => {
            // 去除日期中的0，因为年月日中的日如果为两位数的话时间戳显示的是8点的时间戳
            
            navigation.navigate('Calendar', {
                key: 'trainTripTime',
                selectedTime: new Date(tripTime).getTime() - 8 * 60 * 60 * 1000
            });
        });
    }

    searchTrainList = () => {
        const { fromCity, toCity, tripTime, navigation } = this.props;
        
        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('TrainList', {
                from: fromCity,
                to: toCity,
                tripTime
            });
        });
    }

    render() {
        const { fromCity, toCity, selectCity, tripTime, tripTimeDesc } = this.props;
        const { notice = {}, Adverts = { List: [] }, Icons = { List: [] }, tabIcon: { OperationIcon = [] } } = this.state;

        return (
            <ScrollView style={styles.wrap}>
                <View style={styles.container}>
                    {/* Notice start  */}
                    {notice.IsShow && <NoticeComponent data={notice} />}
                    {/* Notice end  */}
                    {/* Banner start  */}
                    {Adverts.List.length > 0 && <BannerComponent data={Adverts.List} />}
                    {/* Banner end  */}
                    {/* 查询城市开始  */}
                    <QueryCityComponent
                        toSelectCityPage={(key) => this.toSelectCityPage(key)}
                        selectCity={selectCity}
                        fromCity={fromCity}
                        toCity={toCity}
                        fromKey="trainFromCity"
                        toKey="trainToCity"
                    />
                    {/* 查询城市结束  */}
                    {/* 查询日期开始  */}
                    <QueryDateComponent
                        handlePress={this.selectDate}
                        tripTime={tripTime}
                        tripTimeDes={tripTimeDesc}
                    />
                    {/* 查询日期结束  */}
                    <View style={styles.checkbox}>
                        <CheckboxComponent title="学生票" />
                        <CheckboxComponent title="高铁/动车" />
                    </View>
                    {/* 查询按钮开始  */}
                    <ButtonComponent
                        handlePress={this.searchTrainList}
                        title="火车票查询"
                    />
                    {/* 查询按钮结束  */}
                    {Icons.List.length > 0 && <OperationComponent data={Icons.List} />}
                </View>
                {OperationIcon.length > 0 && <PubOperationComponent data={OperationIcon} />}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#f3f4f8',
    },
    container: {
        backgroundColor: '#FFF',
    },
    'checkbox': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
        marginLeft: 15,
        // Height: 18,
        paddingTop: 15,
        paddingBottom: 18
    },
});

const mapStateToProps = (state) => ({
    fromCity: state.City.trainFromCity,
    toCity: state.City.trainToCity,
    tripTime: state.Date.trainTripTime,
    tripTimeDesc: state.Date.trainTripTimeDesc
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectCity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TrainPage);
