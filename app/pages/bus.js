import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    InteractionManager,
    StyleSheet
} from 'react-native';

import BannerComponent from '../components/home/banner';
import NoticeComponent from '../components/home/notice';
import QueryCityComponent from '../components/home/query_city';
import QueryDateComponent from '../components/home/query_date';
import ButtonComponent from '../components/home/button';
import OperationComponent from '../components/home/operation';
import PubOperationComponent from '../components/home/pub_operation';

import { getBanner, getNotice, getTab } from '../actions/http';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectCity } from '../actions';

class BusPage extends Component {

    static propTypes = {
        navigation: PropTypes.object,
        city: PropTypes.object,
        date: PropTypes.object,
        selectCity: PropTypes.func
    }

    state = {
        tabIcon: {}
    }

    componentWillMount() {
        // 获取通知
        getNotice({
            params: { projectId: 30 },
            that: this
        });
        // 获取banner
        getBanner({
            params: { projectId: 30 },
            that: this
        });
        getTab({
            params: {},
            that: this
        });
    }


    handleCheckbox = (field, val) => {
        this.setState({
            [field]: !val
        });
    }

    toSelectCityPage(key) {
        const { navigation } = this.props;

        navigation.navigate('City', {
            key,
            routeName: navigation.state.routeName
        });
    }

    selectDate = () => {
        const { navigation } = this.props;

        InteractionManager.runAfterInteractions(() => {
            navigation.navigate('Calendar', {
                routeName: navigation.state.routeName
            });
        });
    }

    render() {

        const { city, selectCity, date } = this.props;
        const { busFromCity = {}, busToCity = {} } = city;
        const { busTripTime, busTripTimeDesc } = date;
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
                        fromCity={busFromCity}
                        toCity={busToCity}
                        fromKey="busFromCity"
                        toKey="busToCity"
                    />
                    {/* 查询城市结束  */}
                    {/* 查询日期开始  */}
                    <QueryDateComponent 
                        handlePress={this.selectDate}
                        tripTime={busTripTime}
                        tripTimeDes={busTripTimeDesc}
                    />
                    {/* 查询日期结束  */}
                    {/* 查询按钮开始  */}
                    <ButtonComponent title="汽车票查询" />
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
});

const mapStateToProps = (state) => ({
    city: state.City,
    date: state.Date
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectCity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusPage);
