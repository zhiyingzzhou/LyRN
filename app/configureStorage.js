import Storage from 'react-native-storage';
import { 
    AsyncStorage,
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

const storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: 1000 * 3600 * 24,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入
    // sync: require('你可以另外写一个文件专门处理sync')
    sync: require('./storage_sync.js')
});

// 全局范围内创建一个（且只有一个）storage实例，方便直接调用
global.Storage = storage;

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
