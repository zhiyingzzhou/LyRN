import {
    findNodeHandle,
    UIManager
} from 'react-native';
import lodash from './lodash.custom.min.js';

const Util = () => { };
const class2type = {},
    { toString } = class2type;

[
    'String', 
    'Number', 
    'Array',
    'Boolean', 
    'Function',
    'Object'
].forEach((i) => {
    class2type[`[object ${i}]`] = i.toLowerCase();
});

function type(obj) {
    return obj === null ? String(obj) : class2type[toString.call(obj)] || 'object';
}

Util.prototype = {
    constructor: Util
};

Util.prototype.debounce = lodash.debounce;

/**
 * @description 判断元素是否为字符串
 * @param {*} 要判断的元素
 * @return {boolean}
 */

Util.prototype.isString = function(value) {
    return type(value) === 'string';
};

/**
 * @description 判断元素是否为null
 * @param {*} 要判断的元素
 * @return {boolean}
 */

Util.prototype.isNull = function (value) {
    return value === null;
};

/**
 * @description 判断元素是否为函数
 * @param {*} 要判断的元素
 * @return {boolean}
 */

Util.prototype.isFunction = function (value) {
    return type(value) === 'function';
};

/**
 * @description 判断元素是否为数字
 * @param {*} 要判断的元素
 * @return {boolean}
 */

Util.prototype.isNumber = function (value) {
    return type(value) === 'number';
};

/**
 * @description 将数组分割成相等数量的块
 * @param {array} arr 要切割的数组
 * @param {number} num 块的数量 
 * @return {array}
 */

Util.prototype.chunk = function (arr, num) {
    num = Number(num) || 1;
    const ret = [];

    arr.forEach((item, i) => {
        if (i % num === 0) {
            ret.push([]);
        }
        ret[ret.length - 1].push(item);
    });

    return ret;
};

/** 
 * @description 获取组件的宽度和高度及位置信息
 * @param {ReactElement} ref 组件实例
 * @returns {promise} x,y组件的相对坐标,width组件的宽度,height组件的高度,pageX,pageY组件相对于屏幕的绝对坐标
 * @example
 * const layout = await _.getLayout(this._ref);
 * @return {object}
 */

Util.prototype.getLayout = function (ref) {
    const handle = findNodeHandle(ref);

    return new Promise((resolve) => {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            resolve({
                x,
                y,
                width,
                height,
                pageX,
                pageY
            });
        });
    });
};

const _ = new Util();

export default _;
