import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import CityPage from '../pages/city'; // 选择城市
import CalendarPage from '../pages/calendar'; // 选择日历
import TrainListPage from '../pages/train_list'; // 火车时刻表页面
import TrainOrderPage from '../pages/train_order'; // 火车票订单
import ContactPage from '../pages/contact'; // 选择乘客
import AddContactPage from '../pages/add_contact'; // 新增乘客
import ComboPage from '../pages/combo'; // 优选服务
import TinsurancePage from '../pages/tinsurance'; // 行程保险
import OnlineSelectSeatPage from '../pages/online_select_seat'; // 在线选座

import backNavbar from '../components/back_navbar';
import order from './order';

const AppNavigator = createStackNavigator(
    {
        'Main': { // 首页
            screen: MainTabNavigator,
            navigationOptions: {
                header: null
            }
        },
        'City': { // 选择城市
            screen: CityPage,
            navigationOptions: {
                header: backNavbar
            }
        },
        'Calendar': { // 选择日期
            screen: CalendarPage,
            navigationOptions: {
                header: backNavbar
            }
        },
        'TrainList': { // 火车列表
            screen: TrainListPage,
            navigationOptions: {
                header: backNavbar
            }
        },
        'TrainOrder': { // 下订单
            screen: TrainOrderPage,
            navigationOptions: {
                header: backNavbar
            }
        },
        'Contact': { // 乘客列表
            screen: ContactPage,
            navigationOptions: {
                header: backNavbar
            }
        },
        'AddContact': { // 新增乘客
            screen: AddContactPage,
            navigationOptions: {
                header: backNavbar
            }
        },
        'Combo': { // 优选服务
            screen: ComboPage,
            navigationOptions: {
                header: backNavbar
            }
        },
        'Tinsurance': { // 行程保险
            screen: TinsurancePage,
            navigationOptions: {
                header: backNavbar
            }
        },
        'OnlineSelectSeat': { // 在线选座
            screen: OnlineSelectSeatPage,
            navigationOptions: {
                header: backNavbar
            }
        }
    },
    {
        initialRouteName: 'Main',
        cardStyle: {
            shadowOpacity: 0 // 去除顶部阴影
        },
        initialRouteParams: { from: { Name: '上海' }, to: { Name: '北京' }, tripTime: '2018-05-30' }, // eslint-disable-line
        initialRouteParams1: order
    }
);

const AppWithNavigationState = () => <AppNavigator />;

export default connect()(AppWithNavigationState);
