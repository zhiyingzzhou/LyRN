import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View, 
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';

class BackNavbarComponent extends Component {

    static propTypes = {
        navigator: PropTypes.object
    }

    titleMap = {
        City: '选择城市',
        Calendar: '选择日期',
        TrainOrder: '订单',
        Contact: '选择乘客',
        AddContact: '新增乘客',
        Combo: '优选服务',
        Tinsurance: '行程保险',
        OnlineSelectSeat: '在线选座'
    }

    render() {
        let title = '';
        const { scene: { route }, navigation: { goBack } } = this.props.navigator,
            { routeName, params } = route;

        // console.log(Platform.OS);
        if (routeName === 'TrainList') {
            const { from, to } = params;

            title = `${from.Name} - ${to.Name}`;
        } else if (this.titleMap[routeName]) {
            title = this.titleMap[routeName];
        }
        
        return (
            <View style={styles.navbar}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={ () => { 
                        requestAnimationFrame(() => {
                            goBack();
                        });
                    } }
                >
                    <Image 
                        source={require('../images/icon_back.png')}
                        style={{
                            width: scaleSize(32),
                            height: scaleSize(28)
                        }}
                    />
                </TouchableOpacity>
                {/* 中间标题开始 */}
                <View
                    style={styles.center}
                >
                    <Text style={styles.title}>{title}</Text>
                </View>
                {/* 中间标题结束 */}
            </View>
        );
    }
}

const backNavbar = (navigator) => {
    return <BackNavbarComponent navigator={navigator} />;
};

export default backNavbar;

const styles = StyleSheet.create({
    navbar: {
        height: scaleSize(50),
        flexDirection: 'row',
        justifyContent: Platform.OS === 'ios' ? 'space-between' : 'flex-start',
        alignItems: 'center',
        paddingLeft: scaleSize(5),
        paddingRight: scaleSize(5),
        backgroundColor: '#FFF',
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    center: {
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
        zIndex: -1,
        ...Platform.select({
            ios: {
                alignItems: 'center',
            },
            android: {
            }
        })
    },
    title: {
        ...Platform.select({
            ios: {
                fontSize: setSpText(18)
            },
            android: {
                fontSize: setSpText(20),
                marginLeft: scaleSize(37)
            }
        })
    }
});
