import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    Text,
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

class FlightPage extends Component {

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
        InteractionManager.runAfterInteractions(() => {
            // 获取通知
            getNotice({
                params: { projectId: 20 },
                that: this
            });
            // 获取banner
            getBanner({
                params: { projectId: 20 },
                that: this
            });
            getTab({
                params: {},
                that: this
            });
        });
    }

    handleCheckboxChange = (field, val) => {
        this.setState({
            [field]: val
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
        const { flightFromCity = {}, flightToCity = {} } = city;
        const { flightTripTime, flightTripTimeDesc } = date;
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
                        fromCity={flightFromCity}
                        toCity={flightToCity}
                        fromKey="flightFromCity"
                        toKey="flightToCity"
                    />
                    {/* 查询城市结束  */}
                    {/* 查询日期开始  */}
                    <QueryDateComponent 
                        handlePress={this.selectDate}
                        tripTime={flightTripTime}
                        tripTimeDes={flightTripTimeDesc}
                    />
                    {/* 查询日期结束  */}
                    <View style={styles.checkbox}>
                        <CheckboxComponent
                            onChange={this.handleCheckboxChange}
                            title={<Text>携带儿童<Text style={{ color: '#999' }}>(2-12岁)</Text></Text>}
                            name="child"
                        />
                        <CheckboxComponent title={<Text>携带婴儿<Text style={{ color: '#999' }}>(14天-2岁)</Text></Text>} />
                    </View>
                    {/* 查询按钮开始  */}
                    <ButtonComponent title="飞机票查询" />
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
    city: state.City,
    date: state.Date
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectCity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FlightPage);
