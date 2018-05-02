import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import _ from '../../util';

export default class PubOperationComponent extends Component {

    static propTypes = {
        data: PropTypes.array
    }

    shouldComponentUpdate(nextProps) {
        return this.props.data !== nextProps.data;
    }

    _render(data) {
        return data.map((slideData, index) => 
            <View style={styles.slide} key={index}>
                {
                    slideData.map((item, i) => {
                        const { ICImageUrl, ICTitle } = item;

                        return <View style={styles.slide_item} key={ICImageUrl + i}>
                            {ICImageUrl !== '' && <Image style={styles.image} source={{ uri: ICImageUrl }} />}
                            {ICTitle !== '' && <Text style={styles.slide_txt}>{ICTitle}</Text>}
                        </View>;
                    })
                }
            </View>
        );
    }

    render() {
        const { data } = this.props;
        const ret = data.length % 5;

        if (ret !== 0) {
            for (let i = 0; i < 5 - ret; i++) {
                data.push({
                    ICTitle: '',
                    ICImageUrl: ''
                });
            }
        }
        
        return (
            <View style={styles.wrap}>
                <View style={styles.title}>
                    <View style={styles.line}></View>
                    <Text style={styles.title_txt}>同程更多产品</Text>
                    <View style={styles.line}></View>
                </View>
                <Swiper
                    height={81} 
                    index={0}
                    loop={false}
                    dotStyle={{
                        width: scaleSize(6),
                        height: scaleSize(6)
                    }}
                    activeDotStyle={{
                        width: scaleSize(6),
                        height: scaleSize(6)
                    }}
                    paginationStyle={{
                        bottom: scaleSize(0)
                    }}
                    activeDotColor="#10ce10"
                >
                    {this._render(_.chunk(data, 5))}
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        marginTop: scaleSize(10),
        paddingBottom: scaleSize(10),
        backgroundColor: '#FFF',
        marginBottom: scaleSize(20)    
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: scaleSize(15),
        paddingBottom: scaleSize(15)
    },
    'title_txt': {
        fontSize: setSpText(11),
        lineHeight: scaleSize(11),
        color: '#999',
        marginRight: scaleSize(8),
        marginLeft: scaleSize(8)
    },
    line: {
        width: scaleSize(30),
        backgroundColor: '#ccc',
        height: StyleSheet.hairlineWidth
    },
    slide: {
        flexDirection: 'row'
    },
    'slide_item': {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: scaleSize(30),
        height: scaleSize(30)
    },
    'slide_txt': {
        fontSize: setSpText(12),
        lineHeight: scaleSize(12),
        marginTop: scaleSize(5),
        color: '#666'
    }
});
