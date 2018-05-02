import { 
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

// px 转换成dp
const deviceWidth = Dimensions.get('window').width; // 设备的宽度
const deviceHeight = Dimensions.get('window').height; // 设备的高度
const fontScale = PixelRatio.getFontScale(); // 返回字体大小缩放比例

let pixelRatio = PixelRatio.get(); // 当前设备的像素密度
const defaultPixel = 2; // iphone6的像素密度
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2); // 获取缩放比例

if (Platform.OS === 'ios') {
    if (pixelRatio >= 2) {
        pixelRatio = 2;
    }
} else if (Platform.OS === 'android') {
    pixelRatio = 1;
}

global.setSpText = function(size) {
    size = Math.round(size * scale / fontScale);
    
    return size;
};

global.scaleSize = function(size) {
    return Math.round(size * scale + 0.5);
    // return size;
};