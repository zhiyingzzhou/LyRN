import React from 'react';
import { Image } from 'react-native';
import { createTabNavigator } from 'react-navigation';

import ShopMallView from '../views/shopmall'; // 商城页面
import ProfileView from '../views/profile'; // 我的页面

import TrainPage from '../pages/train'; // 火车票 
import FlightPage from '../pages/flight'; // 机票
import BusPage from '../pages/bus'; // 汽车/船票

const HomeTabNavigator = createTabNavigator(
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

const MainTabNavigator = createTabNavigator(MainRouterConfigs, MainTabNavigatorConfig);
export default MainTabNavigator;