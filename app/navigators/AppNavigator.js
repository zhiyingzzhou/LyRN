import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ShopMallView from '../views/shopmall'; // 商城页面
import ProfileView from '../views/profile'; // 我的页面

import TrainPage from '../pages/train'; // 火车票 
import FlightPage from '../pages/flight'; // 机票
import BusPage from '../pages/bus'; // 汽车/船票
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

const HomeTabNavigator = TabNavigator(
    {
        Train: {
            screen: TrainPage,
            navigationOptions: {
                tabBarLabel: '火车票'
            }
        },
        Flight: {
            screen: FlightPage,
            navigationOptions: {
                tabBarLabel: '机票'
            }
        },
        Bus: {
            screen: BusPage,
            navigationOptions: {
                tabBarLabel: '汽车/船票'
            }
        }
    },
    {
        tabBarPosition: 'top',
        lazyLoad: false,
        lazy: true,
        scrollEnabled: true,
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            // 是否显示icon
            showIcon: false,
            // 底部标签栏样式
            style: {
                height: scaleSize(50),
                backgroundColor: '#FFF',
                borderWidth: 0
            },
            labelStyle: {
                fontSize: 14,
                color: '#666',
                borderWidth: 0
            },
            activeTintColor: '#09bb07',
            // 底部标签栏指示器的样式
            indicatorStyle: {
                backgroundColor: '#09bb07'
            }
        }
    }
);

const MainTabNavigatorConfig = {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        // 是否显示icon
        showIcon: true,
        // 底部标签栏样式
        style: {
            height: 52,
            backgroundColor: '#FFF'
        },
        labelStyle: {
            fontSize: 12,
            margin: 0,
            color: 'rgb(122, 131, 137)'
        },
        activeTintColor: '#09bb07',
        // 底部标签栏指示器的样式
        indicatorStyle: {
            height: 0
        }
    }
};

/**
 * 路由配置
 */
const MainNavigatorMapObj = {
    Home: {
        screen: HomeTabNavigator,
        tabBarLabel: '首页',
        activeIcon: require('../images/tab_icon/home_active.png'),
        unactiveIcon: require('../images/tab_icon/home.png')
    },
    ShopMall: {
        screen: ShopMallView,
        tabBarLabel: '商城',
        activeIcon: require('../images/tab_icon/shopmall_active.png'),
        unactiveIcon: require('../images/tab_icon/shopmall.png')
    },
    Profile: {
        screen: ProfileView,
        tabBarLabel: '我的',
        activeIcon: require('../images/tab_icon/profile_active.png'),
        unactiveIcon: require('../images/tab_icon/profile.png')
    }
};

const generateMainRouteConfig = (routerMap) => ({
    screen: routerMap.screen,
    navigationOptions: {
        tabBarLabel: routerMap.tabBarLabel,
        tabBarIcon({ focused }) {
            return <Image
                style={{
                    width: 68,
                    height: 68 / 1.125
                }}
                source={focused ? routerMap.activeIcon : routerMap.unactiveIcon}
            />;
        }
    }
});

const MainRouterConfigs = {};
const MainRouterKeys = [
    'Home',
    'ShopMall',
    'Profile'
];

MainRouterKeys.forEach((key) => {
    MainRouterConfigs[key] = generateMainRouteConfig(MainNavigatorMapObj[key]);
});

export const MainNavigator = TabNavigator(MainRouterConfigs, MainTabNavigatorConfig);

const AppNavigator = StackNavigator(
    {
        'Main': { // 首页
            screen: MainNavigator,
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
        initialRouteParams1: { from: { Name: '上海' }, to: { Name: '北京' }, tripTime: '2017-10-10' }, // eslint-disable-line
        initialRouteParams: { data: { 'trainno': 'G102',
            'fmtime': '06:30',
            'fmtimeps': 630, 
            'totime': '12:18', 
            'totimeps': 1218, 
            'bgplace': '上海虹桥',
            'endplace': '北京南', 
            'fmcity': '上海虹桥', 
            'fmcitypy': 'shanghaihongqiao',
            'tocity': '北京南',
            'tocitypy': 'beijingnan', 
            'usedtime': '5小时48分钟', 
            'usedtimeps': 348, 
            'fmtype': 0,
            'totype': 2,
            'ifbook': 1,
            'priority': 0, 
            'sort': 'GD',
            'note': '', 
            'notetype': 0,
            'notetime': '', 
            'ticketstatus': { 'secseats': { 'cn': '二等座', 
                'price': 553, 
                'state': 1, 
                'seats': '99', 
                'isorder': '1', 
                'upPrice': 0, 
                'midPrice': 0, 
                'downPrice': 0 }, 
            'firtseats': { 'cn': '一等座', 
                'price': 933,
                'state': 1,
                'seats': '99', 
                'isorder': '1', 
                'upPrice': 0, 
                'midPrice': 0, 
                'downPrice': 0 },
            'busseats': { 'cn': '商务座',
                'price': 1748,
                'state': 1,
                'seats': '99', 
                'isorder': '1',
                'upPrice': 0, 
                'midPrice': 0, 
                'downPrice': 0 }, 
            'specseats': null, 
            'hardseats': null, 
            'noseats': { 'cn': '无座', 
                'price': 553,
                'state': 0,
                'seats': '0', 
                'isorder': '1', 
                'upPrice': 0,
                'midPrice': 0, 
                'downPrice': 0 }, 
            'hardslp': null, 
            'softslp': null, 
            'softsleeperdown': null, 
            'advancedsoftsleeper': null, 
            'dsleeperdown': null }, 
            'isbook': 1, 
            'bothmile': 0, 
            'accbyidcard': 1, 
            'trianid': 1, 
            'trainflag': '0', 
            'trainflagmsg': '正常车次，不受控',
            'selectedSeats': { 'cn': '二等座',
                'price': 553, 
                'state': 1, 
                'seats': '99',
                'isorder': '1', 
                'upPrice': 0, 
                'midPrice': 0, 
                'downPrice': 0 } } },
        cardStyle: {
            shadowOpacity: 0 // 去除顶部阴影
        }
    }
);

const AppWithNavigationState = () => <AppNavigator />;

export default connect()(AppWithNavigationState);
