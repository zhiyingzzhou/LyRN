import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';

import Swiper from 'react-native-swiper';

const bannerHeight = scaleSize(116);

export default class BannerComponent extends Component {
    static propTypes = {
        data: PropTypes.array
    }

    render() {
        const { data } = this.props;

        return (
            <Swiper 
                height={bannerHeight} 
                autoplay={false} 
                dotStyle={{
                    width: scaleSize(6),
                    height: scaleSize(6)
                }}
                activeDotStyle={{
                    width: scaleSize(6),
                    height: scaleSize(6)
                }}
                paginationStyle={styles.paginationStyle}
                activeDotColor="#f63"
            >
                {
                    data.map((item, index) => {
                        const { ACImageUrl } = item;
                        
                        return (
                            <View style={styles.slide} key={index}>
                                <Image resizeMode ="stretch" style={styles.image} source={{ uri: ACImageUrl }} />
                            </View>
                        );
                    })
                }
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1
    },
    image: {
        flex: 1
    },
    paginationStyle: {
        bottom: bannerHeight * 0.06
    }
});
