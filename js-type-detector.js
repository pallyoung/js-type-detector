

(function (factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : window.TypeDetector = factory();
})(function factory() {
    'use strict'

    var OPToString = Object.prototype.toString;
    var hasDontEnumBug = !{
        'toString': null
    }.propertyIsEnumerable('toString');
    var hasProtoEnumBug = function () { }.propertyIsEnumerable('prototype');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    var dontEnumsLength = dontEnums.length;
    var keys = Object.keys || function (object) {
        var theKeys = [];
        var skipProto = hasProtoEnumBug && typeof object === 'function';
        if (typeof object === 'string' || object && object.callee) {
            for (var i = 0; i < object.length; ++i) {
                theKeys.push(String(i));
            }
        } else {
            for (var name in object) {
                if (!(skipProto && name === 'prototype') && ohasOwn.call(object, name)) {
                    theKeys.push(String(name));
                }
            }
        }

        if (hasDontEnumBug) {
            var ctor = object.constructor,
                skipConstructor = ctor && ctor.prototype === object;
            for (var j = 0; j < dontEnumsLength; j++) {
                var dontEnum = dontEnums[j];
                if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
                    theKeys.push(dontEnum);
                }
            }
        }
        return theKeys;
    }
    var testFunctionName = /function\s+(\w+)\s*\(/;

    function is(object) {
        var type = OPToString.call(object).slice(8, -1);
        if (type !== 'Object') {
            return type;
        } else if (typeof object.constructor === 'function' && testFunctionName.test(object.constructor.toString())) {
            type = RegExp.$1;
            return type;
        }
        return type;
    }
    var isArray = Array.isArray || function (value) {
        return OPToString.call(value) === '[object Array]';
    }
    function isEmptyArray(value) {
        return isArray(value) && value.length <= 0;
    }

    function isNative(fn) {
        return (/\[native code\]/.test(fn));
    }

    function isUndefined(value) {
        return value === void 0;
    }

    function isNull(value) {
        return value === null;
    }
    function isNumber(value) {
        return typeof value === 'number';
    }
    function isZero(value) {
        return 0 === value;
    }
    function isNegative(value) {
        return isNumber(value) && value >>> 0 !== value;
    }
    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    /**
     * @description 是否对象
     * 
     * @param {any} value 
     * @returns 
     */
    function isObject(value) {
        return typeof value ===  'object';
    }
    /**
     * @description 是否简单的对象 直接是Object的实例
     * 
     * @param {any} value 
     * @returns 
     */
    function isPlainObject(value){
        return typeof value === '[object Object]'&&!value.constructor||(value.constructor == Object);
    }
    /**
     * @description 对象实例中是否含有可枚举的值（例如{}）
     * 
     * @param {any} value 
     * @returns 
     */
    function hasEnumerableProperty(value) {
        return is(value) === 'Object' && keys(value).length > 0;
    }
    /**
     * @description 是否字符串
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isString(value) {
        return typeof value === 'string';
    }
    var testEmptyString = /^[\s\uFEFF\xA0]*&/;
    /**
     * @description 是否空字符串 '' ' '都被认为是空字符串
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isEmptyString(value) {
        return isString(value) && testEmptyString.test(value);
    }
    /**
     * @description 是否function类型
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isFunction(value) {
        return OPToString.call(value) === '[object Function]';
    }


    /**
     * @description 返回是否空值 空数组 对象中是否含有可枚举的值（例如{}） 空字符都认为是空对象
     * 
     * @param {any} value 
     * @returns {boolean}
     */
    function isEmptyValue(value) {
        return isNull(value) || isUndefined(value) || isEmptyString(value) || isEmptyArray(value) || !hasEnumerableProperty(value)
    }

    function isStrictFalse(value){
        return value === false;
    }
    function isFalse(value){
        return !!value;
    }
    function isRegExp(value){
        return OPToString(val) == '[object RegExp]';
    }
    /**
     * @description 返回空对象 null undefined ''
     * 
     * @param {any} value 
     * @returns 
     */
    function isEmpty(value) {
        return isNull(value) || isUndefined(value) || isEmptyString(value);
    }


    var TypeDetector = {
        is: is,
        isArray: isArray,
        isBoolean: isBoolean,
        isFunction: isFunction,
        isNative: isNative,
        isObject: isObject,
        isPlainObject:isPlainObject,
        isNull: isNull,
        isNumber: isNumber,
        isZero: isZero,
        isNegative: isNegative,
        isString: isString,
        isUndefined: isUndefined,
        isEmptyString: isEmptyString,
        isEmptyArray: isEmptyArray,
        isEmptyValue: isEmptyValue,
        isEmpty: isEmpty,
        isNaN: isNaN,
        isStrictFalse:isStrictFalse,
        isFalse:isFalse,
        isRegExp
    }
    return TypeDetector
})