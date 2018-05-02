import { ajaxByGet } from '../services/ajax';

const getFullUri = (type, uri) => {
    return type ? `http://wx.17u.cn/${uri}` : uri;
};

// 获取banner
export const getBanner = ({ params, that }) => {
    ajaxByGet(
        getFullUri(1, 'pubapi/home/Commercial.ashx'),
        params,
        ({ Adverts, Icons }) => {
            that.setState({
                Adverts, 
                Icons
            });
        }
    );
};

// 获取notice
export const getNotice = ({ params, that }) => {
    ajaxByGet(
        getFullUri(1, 'pubapi/home/notice.ashx'),
        params, 
        ({ Notice }) => {
            that.setState({
                notice: Notice
            });
        }
    );
};

export const getTab = ({ params, that }) => {
    ajaxByGet(
        getFullUri(1, 'pubapi/home/tabicon.ashx'),
        params, 
        (tabIcon) => {
            that.setState({
                tabIcon
            });
        }
    );
};

// 获取热门城市
export const getHotCities = ({ params, callback }) => {
    ajaxByGet(
        'http://www.ly.com/huochepiao/resource/station/GetHotCityListV1',
        params, 
        callback
    );
};

// 通过大写拼音字母获取城市列表
export const getCityListByLetter = ({ params, callback }) => {
    ajaxByGet(
        getFullUri(1, 'uniontrain/trainapi/GetCityStationList'),
        params, 
        callback
    );
};

// 获取火车时刻表
export const getTrainList = ({ params, callback }) => {
    ajaxByGet(
        getFullUri(1, 'uniontrain/trainapi/searchno.html'),
        params, 
        callback
    );
};

// 获取当前城市
export const getCurrentCity = ({ params, callback }) => {
    ajaxByGet(
        'http://restapi.amap.com/v3/geocode/regeo',
        params, 
        callback
    );
};

// 优选服务
export const getPackageInfo = ({ params, callback }) => {
    ajaxByGet(
        'http://train.17usoft.net/offticketsgateway/ots/Book/GetPackageInfo',
        params, 
        callback
    );
};

