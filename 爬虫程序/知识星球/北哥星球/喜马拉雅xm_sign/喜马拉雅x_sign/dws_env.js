process_ = process;
require_ = require;
// delete Buffer;
delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;


dtavm = {
    // log : console.log,
    log: function () { },
    _log : console.log
}

no_print = ['window', 'globalThis','navigator','top','self','plugins'];
function setProxyArr(proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        const handler = `{
      get: function(target, property, receiver) {
        if(no_print.includes(property)){
            return target[property];
        }
        dtavm.log("方法:", "get  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]);
        return target[property];
      },
      set: function(target, property, value, receiver) {
      if("${proxyObjArr[i]}" === 'window'){
        dtavm.log("方法:", "set  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", value, ", 属性值类型：", typeof target[property]);
      }
        dtavm.log("方法:", "set  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", value, ", 属性值类型：", typeof target[property]);
        return Reflect.set(...arguments);
      }
    }`;
        eval(`try {
            ${proxyObjArr[i]};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        } catch (e) {
            ${proxyObjArr[i]} = {};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        }`);
    }
}
function proxy(obj, objname, type) {
    function getMethodHandler(WatchName, target_obj) {
        let methodhandler = {
            apply(target, thisArg, argArray) {
                if (this.target_obj) {
                    thisArg = this.target_obj
                }
                let result = Reflect.apply(target, thisArg, argArray)
                if (target.name !== "toString") {
                    if (target.name === "addEventListener") {
                        dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`)
                    } else if (WatchName === "window.console") {
                    } else {
                        dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${result}].`)
                    }
                } else {
                    dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${result}].`)
                }
                return result
            },
            construct(target, argArray, newTarget) {
                var result = Reflect.construct(target, argArray, newTarget)
                dtavm.log(`调用者 => [${WatchName}] 构造函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${(result)}].`)
                return result;
            }
        }
        methodhandler.target_obj = target_obj
        return methodhandler
    }

    function getObjhandler(WatchName) {
        let handler = {
            get(target, propKey, receiver) {
                let result = target[propKey]
                if (result instanceof Object) {
                    if (typeof result === "function") {
                        dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}] , 是个函数`)
                        return new Proxy(result, getMethodHandler(WatchName, target))
                    } else {
                        dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}], 结果 => [${(result)}]`);
                    }
                    return new Proxy(result, getObjhandler(`${WatchName}.${propKey}`))
                }
                if (typeof (propKey) !== "symbol") {
                    dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey?.description ?? propKey}], 结果 => [${result}]`);
                }
                return result;
            },
            set(target, propKey, value, receiver) {
                if (value instanceof Object) {
                    dtavm.log(`调用者 => [${WatchName}] 设置属性名 => [${propKey}], 值为 => [${(value)}]`);
                } else {
                    dtavm.log(`调用者 => [${WatchName}] 设置属性名 => [${propKey}], 值为 => [${value}]`);
                }
                return Reflect.set(target, propKey, value, receiver);
            },
            has(target, propKey) {
                var result = Reflect.has(target, propKey);
                dtavm.log(`针对in操作符的代理has=> [${WatchName}] 有无属性名 => [${propKey}], 结果 => [${result}]`)
                return result;
            },
            deleteProperty(target, propKey) {
                var result = Reflect.deleteProperty(target, propKey);
                dtavm.log(`拦截属性delete => [${WatchName}] 删除属性名 => [${propKey}], 结果 => [${result}]`)
                return result;
            },
            defineProperty(target, propKey, attributes) {
                var result = Reflect.defineProperty(target, propKey, attributes);
                dtavm.log(`拦截对象define操作 => [${WatchName}] 待检索属性名 => [${propKey.toString()}] 属性描述 => [${(attributes)}], 结果 => [${result}]`)
                // debugger
                return result
            },
            getPrototypeOf(target) {
                var result = Reflect.getPrototypeOf(target)
                dtavm.log(`被代理的目标对象 => [${WatchName}] 代理结果 => [${(result)}]`)
                return result;
            },
            setPrototypeOf(target, proto) {
                dtavm.log(`被拦截的目标对象 => [${WatchName}] 对象新原型==> [${(proto)}]`)
                return Reflect.setPrototypeOf(target, proto);
            },
            preventExtensions(target) {
                dtavm.log(`方法用于设置preventExtensions => [${WatchName}] 防止扩展`)
                return Reflect.preventExtensions(target);
            },
            isExtensible(target) {
                var result = Reflect.isExtensible(target)
                dtavm.log(`拦截对对象的isExtensible() => [${WatchName}] isExtensible, 返回值==> [${result}]`)
                return result;
            },
        }
        return handler;
    }

    if (type === "method") {
        return new Proxy(obj, getMethodHandler(objname, obj));
    }
    return new Proxy(obj, getObjhandler(objname));
}

Object.defineProperties(globalThis, {
    [Symbol.toStringTag]: {
        configurable: true,
        value: 'Window'
    }
});

!(function () {
    "use strict";
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
    const mytoString = function () {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };

    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        })
    };
    delete Function.prototype['toString'];
    set_native(Function.prototype, "toString", mytoString);
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");
    this.func_set_native = function (func) {
        set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, func.name || ''}() { [native code] }`)
    }
}).call(globalThis);

// 重写全局对象原型链
function setTostringAndstringTag(obj, dictValue) {
    Object.defineProperties(obj.prototype, {
        [Symbol.toStringTag]: {
            configurable: true,
            value: obj.name
        }
    });
    globalThis.func_set_native(obj);
};

// 创建标签原型
function createTagProto(propObj,portotypeObj) {
    let res = propObj + ' = ' + 'function ' + propObj + '() { throw new TypeError("Illegal constructor"); };\n';
    res += 'setTostringAndstringTag(' + propObj + ',null);\n';
    if (portotypeObj) {
        for (let key in portotypeObj) {
            res += propObj + '.prototype.' + portotypeObj[key] + '= function ' + portotypeObj[key] + '() {};\n';
            res += 'globalThis.func_set_native(' + propObj + '.prototype.' + portotypeObj[key] + ');\n';
        }
    }
    eval(res);
}

createTagProto('EventTarget',['addEventListener']);
createTagProto('WindowProperties');
createTagProto('Window');

window = global;
window.__proto__ = Window.prototype;
window.__proto__.__proto__ = WindowProperties.prototype;
window.__proto__.__proto__.__proto__ = EventTarget.prototype;

Window.__proto__ = EventTarget;

Object.defineProperty(window, 'WindowProperties', {
    get: function () {
        return undefined;
    }
})

window.dispatchEvent = function dispatchEvent() {
    dtavm.log('dispatchEvent:::',arguments)
}
window.addEventListener = function addEventListener() {
    if (arguments[0] === 'load') {
        window.loadc = arguments[1];
    }
    // dtavm._log('addEventListener:::',arguments[0],arguments[1]+'')
}

RTCPeerConnection = class {
}
RTCPeerConnection.prototype.getLocalStreams = function () {

}
RTCPeerConnection.prototype.createDataChannel = function () {
    return {
        onopen: function () {
        }, onclose: function () {
        }, onmessage: function () {
        }, send: function () {
        }, close: function () {
        },
    }
}
RTCPeerConnection.prototype.createAnswer = function () {

}
RTCPeerConnection.prototype.createOffer = function () {
    return new Promise((resolve, reject) => {
        const offer = {
            sdp: "v=0\r\no=- 7557661829766968651 2 IN IP4 {127.0.0.1}\r\ns=-\r\nt=0 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\n",
            type: "offer"
        };
        resolve(offer);
    });
}
RTCPeerConnection.prototype.setLocalDescription = function (sampleDescription) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
RTCPeerConnection.prototype.setConfiguration = function () {

}
RTCPeerConnection.prototype.addIceCandidate = function () {

}
RTCPeerConnection.prototype.addTrack = function () {

}
RTCPeerConnection.prototype.onicecandidate = function () {

}
RTCPeerConnection.prototype.localDescription = {
    sdp: "v=0\r\no=- 7557661829766968651 2 IN IP4 {127.0.0.1}\r\ns=-\r\nt=0 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\n",
    type: "offer"
}
RTCPeerConnection.prototype.sctp = {}
webkitRTCPeerConnection = RTCPeerConnection;

innerWidth = 1536
innerHeight = 715
outerWidth = 1536
outerHeight = 824
devicePixelRatio = 1.25;
screenLeft = 0;
screenX = 0;
screenTop = 0;
screenY = 0;
opener = null;

top = window.top = window;
self = window.self = window;
global = window.global = window;

createTagProto('Location');
location = {
    "ancestorOrigins": {},
    "href": "https://www.ximalaya.com/top/1/100149/",
    "origin": "https://www.ximalaya.com",
    "protocol": "https:",
    "host": "www.ximalaya.com",
    "hostname": "www.ximalaya.com",
    "port": "",
    "pathname": "/top/1/100149/",
    "search": "",
    "hash": ""
};

location.__proto__ = Location.prototype;
location.toString = function toString() {
    return this.href;
}

createTagProto('HTMLDocument');
document = {
    cookie:'HWWAFSESID=3d5a920226ab50ae276; HWWAFSESTIME=1752030682518; _xmLog=h5&108a91a1-40e5-4c95-aaf7-956a5efdebcc&process.env.sdkVersion; xm-page-viewid=ximalaya-web; wfp=ACNhNDZmNDBjYjYyMTZiMDgyv1eOi6inv5l4bXdlYl93d3c; DATE=1752030686930; impl=www.ximalaya.com.login; Hm_lvt_4a7d8ec50cfd6af753c4f8aee3425070=1752030689; HMACCOUNT=3647B18FEA224FB3; crystal=U2FsdGVkX1+2BkqzTPyFRiF4arsfaZV+coWrXZMgzqKut7CYG3n/pBakBPHxILynBtN33ynCy95Uxlcms1iWycjJUPTAMnplP5o9oRu59dL4MHaQuyNaXNopGGoi5E7m4usn2uAoVqzdBLidHz2CrutDy/Bp41eMtO8VK7TrbRS2r7kujdl130SxI0yuWQxuLHoxJin0oKe7v2HkPVt5f8t1dgBrcp/nDnUWiTKWYMtS4BTUcJa9ccwT/FjGglPh; Hm_lpvt_4a7d8ec50cfd6af753c4f8aee3425070=1752031257; vmce9xdq=U2FsdGVkX1+cBgXDuo5YjIxK+t1PxuzdEIYC4PIlNO2zqlgeB77C0KZenY7/cij+pwXQkoZyFJQj3Bx47pkaZHeYYoN/DFW9RQFwTX9aoHu4BetC9nmUqhB7c0xDNXjyCG8CMPcGzBQF5OkpwvUBZd6htTgQdQvOnC9nH3oMApg=; assva6=U2FsdGVkX1+bBuY7nGBQBGm6ryt31C02tIk0mODKl9k=; assva5=U2FsdGVkX19mJP4bwTq5q8FsHaREoPmr5axZAJ+wFv1m5Nhlawwm4AthoKKf3q1iN3PPp6FJoKVlrwEZ02Etjg==; cmci9xde=U2FsdGVkX19l7Eofj6YSPj0WQ4qxa6d6ERkUwwLXn/L12pIH7AjsheSKqDMZyHfcKAwcxSut5E4sTC6AZFvECQ==; pmck9xge=U2FsdGVkX1+mp6bNok06dTHE/S12PAWVZaRU/A+bjZY='
};
document.__proto__ = HTMLDocument.prototype;

createTagProto('Plugin');
createTagProto('PluginArray');
plugins0 = {
    name: 'PDF Viewer',
    filename: 'internal-pdf-viewer',
    description:'Portable Document Format',
    length: 2,
    '0': {
        type: 'application/pdf',
    },
    '1':{
        type:'text/pdf'
    }
}
plugins0['0'].enabledPlugin = plugins0;
plugins0['1'].enabledPlugin = plugins0;
plugins1 = {
    name: 'Chrome PDF Viewer',
    filename: 'internal-pdf-viewer',
    description:'Portable Document Format',
    length: 2,
    '0': {
        type:'application/pdf'
    },
    '1': {
        type:'text/pdf'
    }
}
plugins1['0'].enabledPlugin = plugins1;
plugins1['1'].enabledPlugin = plugins1;
plugins2 = {
    name: 'Chromium PDF Viewer',
    filename: 'internal-pdf-viewer',
    description:'Portable Document Format',
    length: 2,
    '0': {
        type:'application/pdf'
    },
    '1': {
        type:'text/pdf'
    }
}
plugins2['0'].enabledPlugin = plugins2;
plugins2['1'].enabledPlugin = plugins2;
plugins3 = {
    name: 'Microsoft Edge PDF Viewer',
    filename: 'internal-pdf-viewer',
    description:'Portable Document Format',
    length: 2,
    '0':{
        type:'application/pdf'
    },
    '1': {
        type:'text/pdf'
    }
}
plugins3['0'].enabledPlugin = plugins3;
plugins3['1'].enabledPlugin = plugins3;
plugins4 = {
    name: 'WebKit built-in PDF',
    filename: 'internal-pdf-viewer',
    description:'Portable Document Format',
    length: 2,
    '0': {
        type:'application/pdf'
    },
    '1':{
        type:'text/pdf'
    }
}
plugins4['0'].enabledPlugin = plugins4;
plugins4['1'].enabledPlugin = plugins4;
plugins = {
    length: 5,
    '0': plugins0,
    '1': plugins1,
    '2': plugins2,
    '3': plugins3,
    '4': plugins4,
    namedItem : function (name) {
        dtavm.log('Plugin-namedItem:', name)
    },
    item: function (index) {
        dtavm.log('Plugin-item:', index)
    },
    refresh: function () {
        dtavm.log('Plugin-refresh:',arguments)
    },
}
plugins.__proto__ = PluginArray.prototype;

// 创建电池管理器对象原型 
const BatteryManager = {
    level: 1,
    charging: true,
    chargingTime: 0,
    dischargingTime: Infinity,
    onchargingchange: null,
    onlevelchange: null,
    toString: function toString() {
      return `BatteryManager {
        charging: ${this.charging}, 
        level: ${this.level}, 
        chargingTime: ${this.chargingTime}, 
        dischargingTime: ${this.dischargingTime} 
      }`
    }
}

createTagProto('Bluetooth');
createTagProto('Navigator');
Navigator.prototype.hardwareConcurrency = 8;
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
Navigator.prototype.appVersion = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
Navigator.prototype.appName = 'Netscape';
Navigator.prototype.appCodeName = 'Mozilla';
Navigator.prototype.vendor = 'Google Inc.';
Navigator.prototype.maxTouchPoints = 10;
Navigator.prototype.platform = 'Win32';
Navigator.prototype.language = 'zh-CN';
Navigator.prototype.languages = ['zh-CN'];
Navigator.prototype.plugins = plugins;
Navigator.prototype.webdriver = false;
Navigator.prototype.cookieEnabled = true;
Navigator.prototype.onLine = true;
Navigator.prototype.doNotTrack = null;
Navigator.prototype.bluetooth = {};
Navigator.prototype.bluetooth.__proto__ = Bluetooth.prototype;
Navigator.prototype.javaEnabled = function javaEnabled() {
    return false
};
window.func_set_native(Navigator.prototype.javaEnabled)
Navigator.prototype.getBattery = function getBattery() {
    dtavm.log('getBattery:::', arguments)
    return Promise.resolve({
        __proto__: BatteryManager,
        // 动态参数配置（示例值）
        level: 1,
        charging: true,
        dischargingTime: 'Infinity' // 2小时放电时间 
    })
}
window.func_set_native(Navigator.prototype.getBattery)
Navigator.prototype.registerProtocolHandler = function registerProtocolHandler() {
    dtavm.log('registerProtocolHandler:::',arguments)
}
window.func_set_native(Navigator.prototype.registerProtocolHandler)

navigator = {};
navigator.__proto__ = Navigator.prototype;

createTagProto('Screen');
Screen.prototype = Object.assign(Screen.prototype,{
    availWidth: 1536,
    availHeight: 824,
    availLeft: 0,
    availTop: 0,
    colorDepth: 24,
    width: 1536,
    height: 864,
    pixelDepth: 24,
});
screen = {};
screen.__proto__ = Screen.prototype;

createTagProto('Storage');
local = {
    "crystal": "U2FsdGVkX1+2BkqzTPyFRiF4arsfaZV+coWrXZMgzqKut7CYG3n/pBakBPHxILynBtN33ynCy95Uxlcms1iWycjJUPTAMnplP5o9oRu59dL4MHaQuyNaXNopGGoi5E7m4usn2uAoVqzdBLidHz2CrutDy/Bp41eMtO8VK7TrbRS2r7kujdl130SxI0yuWQxuLHoxJin0oKe7v2HkPVt5f8t1dgBrcp/nDnUWiTKWYMtS4BTUcJa9ccwT/FjGglPh",
    "assva6": "U2FsdGVkX1+bBuY7nGBQBGm6ryt31C02tIk0mODKl9k=",
    "a29070": "1752031255147",
    "_antispam_": "cuid=RGE0NmY0MGNiNjIxNmIwODJd&acid=a2E0NmY0MGNiNjIxNmIwODKLSpm_4kEsjw&openid=ACNhNDZmNDBjYjYyMTZiMDgyv1eOi6inv5l4bXdlYl93d3c",
    "WWW_XM": "{\"lock\":true}",
    "pmck9xge": "U2FsdGVkX1+mp6bNok06dTHE/S12PAWVZaRU/A+bjZY=",
    "cid": "U2FsdGVkX1+0cKvYlUGMNUQsgkucKVCsnK09QQdF1zIfGO674BcewdQNHvX4k2/eVUquYEr5Gjp32aInorUZ8A==",
    "WWW_SETING": "{}",
    "assva5": "U2FsdGVkX19mJP4bwTq5q8FsHaREoPmr5axZAJ+wFv1m5Nhlawwm4AthoKKf3q1iN3PPp6FJoKVlrwEZ02Etjg==",
    "vmce9xdq": "U2FsdGVkX1+cBgXDuo5YjIxK+t1PxuzdEIYC4PIlNO2zqlgeB77C0KZenY7/cij+pwXQkoZyFJQj3Bx47pkaZHeYYoN/DFW9RQFwTX9aoHu4BetC9nmUqhB7c0xDNXjyCG8CMPcGzBQF5OkpwvUBZd6htTgQdQvOnC9nH3oMApg=",
    "Hm_lvt_4a7d8ec50cfd6af753c4f8aee3425070": "1783567257177|1752030689",
    "cmci9xde": "U2FsdGVkX19l7Eofj6YSPj0WQ4qxa6d6ERkUwwLXn/L12pIH7AjsheSKqDMZyHfcKAwcxSut5E4sTC6AZFvECQ==",
    "MqVUQava": "5",
    "DATE": "1752030686930",
    "PLAYER_STATE": "{\"playMode\":\"list\",\"volume\":1,\"playbackRate\":1,\"playlist\":[],\"currentTrack\":{},\"currentTrackId\":null,\"paginationInfo\":null,\"playQuality\":64}"
};
localStorage = {
    getItem: function getItem(key) {
        dtavm.log("localStorage.getItem::", arguments);
        if (!local[key]) {
            return null;
        }
        return local[key];
    },
    setItem: function setItem(key, value) {
        dtavm.log("localStorage.setItem::", arguments);
        local[key] = value;
    },
    clear: function clear() {
        local = {};
    },
    removeItem: function removeItem(key) {
        dtavm.log("localStorage.removeItem::", arguments);
        delete local[key];
    }
}
localStorage.__proto__ = Storage.prototype;
sessionStorage = {
    getItem: function getItem(key) {
        dtavm.log("sessionStorage.getItem::", arguments);
        if (!local[key]) {
            return null;
        }
        return local[key];
    },
    setItem: function setItem(key, value) {
        dtavm.log("sessionStorage.setItem::", arguments);
        local[key] = value;
    },
    clear: function clear() {
        local = {};
    },
    removeItem: function removeItem(key) {
        dtavm.log("sessionStorage.removeItem::", arguments);
        delete local[key];
    }
}
sessionStorage.__proto__ = Storage.prototype;

createTagProto('IDBOpenDBRequest');
treasure = {};
treasure.__proto__ = IDBOpenDBRequest.prototype;

createTagProto('IDBFactory');
indexedDB = {
    open: function open() {
        dtavm.log('indexedDB.open:::', arguments)
        if (arguments[0] === 'treasure') {
            return treasure
        }
    }
};
indexedDB.__proto__ = IDBFactory.prototype;

chrome = {
    app: {
        InstallState: { DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed' },
        RunningState: { CANNOT_RUN: 'cannot_run', READY_TO_RUN: 'ready_to_run', RUNNING: 'running' },
        getDetails:function getDetails(){},
        getIsInstalled:function getIsInstalled(){},
        installState:function installState(){},
        isInstalled: false,
        runningState: function runningState(){}
    },
    csi: function csi() { },
    loadTimes: function loadTimes() { },
}
window.func_set_native(chrome.app.getDetails);
window.func_set_native(chrome.app.getIsInstalled);
window.func_set_native(chrome.app.installState);
window.func_set_native(chrome.app.runningState);
window.func_set_native(chrome.csi);
window.func_set_native(chrome.loadTimes);

document.documentElement = {
    style:{}
};

Clipboard = function Clipboard() {
    dtavm.log('Clipboard::',arguments)
}
window.func_set_native(Clipboard)

openDatabase = function openDatabase() {
    dtavm.log('openDatabase:::',arguments)
}
window.func_set_native(openDatabase);
window.ActiveXObject = undefined;

createTagProto('CSSStyleDeclaration');
canvas_style = {};
canvas_style.__proto__ = CSSStyleDeclaration.prototype;

program = {
    link: function link() { },
    getUniformLocation: function getUniformLocation() { },
}
shader = {}

createTagProto('WebGLRenderingContext');
webgl = {
    drawingBufferColorSpace: "srgb",
    drawingBufferHeight: 150,
    drawingBufferWidth: 300,
    unpackColorSpace: "srgb",
    MAX_TEXTURE_SIZE: 3379,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    ARRAY_BUFFER: 34962,
    STATIC_DRAW: 35044,
    VERTEX_SHADER: 35633,
    FLOAT: 5126,
    TRIANGLE_STRIP: 5,
    RGBA: 6408,
    UNSIGNED_BYTE: 5121,
    VENDOR: 7936,
    RENDERER: 7937,
    VERSION: 7938,
    BLUE_BITS: 3412,
    DEPTH_BITS: 3414,
    GREEN_BITS: 3411,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
    MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
    MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
    MAX_RENDERBUFFER_SIZE: 34024,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_TEXTURE_SIZE: 3379,
    MAX_VARYING_VECTORS: 36348,
    MAX_VERTEX_ATTRIBS: 34921,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    MAX_VIEWPORT_DIMS: 3386,
    RED_BITS: 3410,
    RENDERER: 7937,
    SHADING_LANGUAGE_VERSION: 35724,
    STENCIL_BITS: 3415,
    VENDOR: 7936,
    VERSION: 7938,
    HIGH_FLOAT: 36338,
    MEDIUM_FLOAT: 36337,
    LOW_FLOAT: 36336,
    MEDIUM_INT: 36340,
    LOW_INT: 36339,
    HIGH_INT: 36341,
    clearColor:function clearColor(){},
    getExtension: function getExtension() {
        dtavm.log('getExtension:', arguments[0])
        if (arguments[0] === 'WEBGL_debug_renderer_info') {
            return {
                UNMASKED_RENDERER_WEBGL : 37446,
                UNMASKED_VENDOR_WEBGL : 37445
            }
        }
        if (arguments[0] === 'WEBGL_lose_context') {
            return {
                loseContext: function loseContext() { }
            }
        }
        if (arguments[0] === 'EXT_texture_filter_anisotropic') {
            return {
                MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047,
                TEXTURE_MAX_ANISOTROPY_EXT: 34046
            }
        }
    },
    getParameter: function getParameter() {
        dtavm.log('getParameter:', arguments[0])
        if (arguments[0] + '' === '37445') {
            return 'Google Inc. (Intel)'
        }
        if (arguments[0] + '' === '37446') {
            return 'ANGLE (Intel, Intel(R) UHD Graphics (0x00008A56) Direct3D11 vs_5_0 ps_5_0, D3D11)'
        }
        if (arguments[0] + '' === '3379') {
            return 16384
        }
        if (arguments[0] + '' === '34930') {
            return 16
        }
        if (arguments[0] + '' === '36347') {
            return 4096
        }
        if (arguments[0] + '' === '35660') {
            return 16
        }
        if (arguments[0] + '' === '33902') {
            return Float32Array.from([1, 1])
        }
        if (arguments[0] + '' === '33901') {
            return Float32Array.from([1, 1024])
        }
        if (arguments[0] + '' === '3413') {
            return 8
        }
        if (arguments[0] + '' === '3412') {
            return 8
        }
        if (arguments[0] + '' === '3414') {
            return 24
        }
        if (arguments[0] + '' === '3411') {
            return 8
        }
        if (arguments[0] + '' === '34047') {
            return 16
        }
        if (arguments[0] + '' === '35661') {
            return 32
        }
        if (arguments[0] + '' === '34076') {
            return 16384
        }
        if (arguments[0] + '' === '36349') {
            return 1024
        }
        if (arguments[0] + '' === '34024') {
            return 16384
        }
        if (arguments[0] + '' === '36348') {
            return 30
        }
        if (arguments[0] + '' === '34921') {
            return 16
        }
        if (arguments[0] + '' === '3410') {
            return 8
        }
        if (arguments[0] + '' === '7937') {
            return 'WebKit WebGL'
        }
        if (arguments[0] + '' === '35724') {
            return 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)'
        }
        if (arguments[0] + '' === '3415') {
            return 0
        }
        if (arguments[0] + '' === '7936') {
            return 'WebKit'
        }
        if (arguments[0] + '' === '7938') {
            return 'WebGL 1.0 (OpenGL ES 2.0 Chromium)'
        }
        if (arguments[0] + '' === '3386') {
            return Int32Array.from([32767, 32767])
        }
    },
    createProgram: function createProgram() {
        dtavm.log('createProgram:', arguments)
        return program
    },
    createShader: function createShader() {
        dtavm.log('createShader:', arguments)
        return shader
    },
    shaderSource: function () { },
    compileShader: function () { },
    attachShader: function () { },
    linkProgram: function () { },
    useProgram: function () { },
    bufferData: function () { },
    enableVertexAttribArray: function () { },
    vertexAttribPointer: function () { },
    drawArrays: function () { },
    uniform2f: function () { },
    clearColor: function () { },
    COMPILE_STATUS:35713,
    getShaderParameter: function getShaderParameter() {
        dtavm.log('getShaderParameter:', arguments)
        return false
    },
    deleteShader: function deleteShader() {
        dtavm.log('deleteShader:', arguments)
    },
};
webgl.__proto__ = WebGLRenderingContext.prototype;

createTagProto('CanvasRenderingContext2D');
twd2d = {
    rect: function rect() { },
    fillRect: function fillRect() { },
    fillText: function fillText() { },
    beginPath: function beginPath() { },
    arc: function arc() { },
    closePath: function closePath() { },
    fill: function fill() { },
    isPointInPath:function isPointInPath(){},
};
twd2d.__proto__ = CanvasRenderingContext2D.prototype;

createTagProto('HTMLCanvasElement',['getContext','toDataURL']);
canvas = {
    style: canvas_style,
    getContext: function getContext() {
        dtavm.log('canvas.getContext:::', arguments)
        if (arguments[0] === '2d') {
            return twd2d
        }
        if (arguments[0] === 'webgl') {
            return webgl
        }
    },
    toDataURL: function toDataURL() {
        return  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAAC3lJREFUeF7tnUuoJdUZhZcBFXRiQITugRhQsFt8DAz2RAUF4wMTdGRAxYkPjCFBFAUH4kBQFFGM4mMiKuhIUfERQUGdtOjAB3YLCgkOukEazEQhCib1S53O4ebee6pOVe36a9V3p12197++dXpxqs7e/z5C+f92SDpd0i5JJ0s6UdJOScdLOk7SMZKOrGX8JOkHSf+SdEjSAUnfSPpa0n5Jn0s6mF8yFUIAApsROCIhllMlXSDpXEl7JJ3Uc43/lLRX0geS3pX0Zc/jMxwEIDAQgSyBdY6kKyRdLmn3QFq3GnafpNckvSzpw8JzMx0EINCCwJiBFY9011WPa1dXYXFmi5qHvPTT6rHz+epb3TP1I+WQczE2BCDQksAYgRXvo/5UvV+6QdIY8zdB9J/qPdlTkh6r33s1uYdrIACBgQmUDIwIqtslXTOwpr6Hf07SAwRX31gZDwLtCZQIrHj0u7t6xLqlfXmp7vhb9Y3wHh4VU3lCMTMjMHRg3VwtObi3Xn7ggDaWS9wl6XEHMWiAwNQIDBVYsTThoepXt0umBqRhvW9KupUlEQ1pcRkEeiIwRGBdXy3qjMeno3qqMeswP9aPuU9nLZC6IOBGoO/AeqJaSX6jG6QVep6UdNPMNCMXAqMQ6CuwYrtM/Jp23igqxp/0/frXz9gGxB8EIDAQgT4CK1apvzjAFpqBJA82bGz5uYrV8oPxZWAIdF64eZGkl6p1SsfC8hcC30u6UtLb8IAABPon0OUb1mX1HrwuY/SvaPwRY5V87Il8ffxSqAACXgTWDZv4ZvVW4q01Y7sUoXUx37TGtoH53QisE1jxzuodHgNXfhTi8fBC3mmt5MQFEGhMoG1gxa+B7/GCvTHfeBF/ft1EsPFNXAgBCGxOoG1gRVjNdenCup+hWPIQocUfBCDQkUCbwJrjotCOeA/fzuLSvkgyzqwJNA2s2G4T/aH4W59A9P9iG8/6/LgTAo3WYcVG5ujE6b43cOiPQ+w9jM6q9JAfmjTj2xJo8g3rDeOuC6WNjS4Pl5aelPkg4EJgVWBFP6toE8xffwSiPTT9tPrjyUgzIrBdYEWn0K+Mmu9lsTWaAJ5C59IsdlDHlAhsF1iPGrQ1zupF9Av7c9biqAsCWQlsFVhxYMRnWYs2qesMDrYwcRIZxQhsFVjPTvB0m2LQepoo+odd29NYDAOBWRDYLLD4dlXOer5llWPNTAYENgssVrSXM5YV8OVYM5MBgY2BFb8MfkvbmGLORhuaE/jFsBhvJpo4gY2BdVt9yvHEZU2q/DgN+8FJVUyxEBiJwMbA+qTePjJSObOcNrY9nTVL5YiGQEsCy4EVjfn2tryfy/shsIdGf/2AZBRvAsuBdZ+kO7zlplV3v6Q701ZHYRBIQmA5sL6QtDtJXXMrY5+k0+YmGr0QaEtgEVjRQmZ/25u5vlcCu2g90ytPBjMksAgsujKMby5dHMb3gAqSE1gE1gv1qcXJy7UuL07P/qO1QsRBoCOBRWD9g5NwOpLsfnucsPOb7sMwAgR8CURg7ZB0wFfipJTtlHRwUhVTLAQKEojAilOc/15wTqbamsDvOC2ajwcEtiYQgfWXqqvow0BKQeCvkh5JUQlFQCAhgQgsOovmMYZOpHm8oJKEBCKwXpH0+4S1zbGkVyX9YY7C0QyBJgQisD6SdHaTi7lmcAIfS/rt4LMwAQQmSiACiyUNecxjaUMeL6gkIYEIrO84yiuNM3EE2K/TVEMhEEhGIALr3xxDn8aVOM7+6DTVUAgEkhGIwPqZlshpXImWyb9KUw2FQCAZAQIrlyEEVi4/qCYZAR4JcxnCI2EuP6gmGQFeuucyhJfuufygmmQEWNaQyxCWNeTyg2qSEWDhaC5DWDiayw+qSUaArTm5DGFrTi4/qCYZATY/5zKEzc+5/KCaZARoL5PLENrL5PKDapIRoIFfLkNo4JfLD6pJRoAWybkMoUVyLj+oJhkBDqHIYwhLGvJ4QSVJCXDMVx5jOOYrjxdUkpQAB6nmMYaDVPN4QSVJCXBUfR5jOKo+jxdUkpTAIrCivC8k7U5ap3tZ+ySd5i4SfRDoSmA5sO6TdEfXAbl/LQL3S7pzrTu5CQIzIrAcWOdI2jsj7Zmk7pH0YaaCqAUCGQksB1bU94mkMzMWalzTp5LOMtaHNAj0RmBjYN0m6YHeRmegJgRul/Rgkwu5BgJzJ7AxsI6X9C093ot9LKIl8gmSDhWbkYkgMGECGwMrpDwh6cYJa5pS6U9KumlKBVMrBMYksFlgnS7pszGLmtHcZ0j6fEZ6kQqBTgQ2C6wY8FlJ13QamZtXEXhO0rWrLuLfIQCB/xHYKrD4ljX8p4RvV8MzZgYzAlsFVsh8tHoZfIuZ3ixy6CyaxQnqmBSB7QIrfjH8StJxk1KUv9g4yusUfhnMbxQV5iOwXWBFtTdLeixf2ZOuiK4Mk7aP4scksCqworY3qm0jl4xZpNHcb0q61EgPUiBQlECTwDpVUmwfOapoZX6TxTH0se3pSz9pKIJAGQJNAisquV7SU2VKsp3lBklP26pDGAQKEGgaWFEKK+DXN4QV7euz404IHCbQJrDipvcknQe/VgTel3R+qzu4GAIQ2JRA28A6sQ6tk+DZiECchBNh9U2jq7kIAhDYlkDbwIrBotHfO1UbmmNhuy2B7yVdSGM+PiUQ6I/AOoEVs18k6S3a0GxpRLSNuVjS2/1ZxUgQgMC6gRXkLpP0GqH1fx+iCKvLJb3OxwsCEOiXQJfAWnzTeonHw8OmxGPglXyz6vdDymgQWBDoGliLd1pxavHcX8THC/areGfFfy4IDEegj8CK6uLXw+jvNNclD7F0IfqH8WvgcJ9VRoaA+gqsBco5Li5lUSj/kSBQiEDfgRVlxzae6Pfkvvcw9gZGvzC22xT6sDINBIYIrKAaG6YfMu7yEF0XbmUjM/+BIFCWwFCBtVAR/bTuNWoCGM337qqO5nq8rE3MBgEIBIGhAyvmiM6ldxu0W47H3HvoFMp/HAiMR6BEYC3UxcEWccrx1E7jiV8/4zRsjuMa73PKzBD4hUDJwFoOrmgTHP2hxpi/ifWxWj36f0V7aIKqCTGugUABAmMGRjwqXifp6roTZwG5K6eIzqrPV4tgn+HRbyUrLoBAcQJjBtay2OgAcUW9B293YQr76j2RL7NKvTB5poNASwJZAmu57FgScUHVwubcqiPEngG2/MQWmr1V65cPqpX577I0oeUnhsshMCKBjIG1EccOSfHCflf1uHZyvQ1oZ/3rY5yZeEy1dOLI+qafJP0gKZYfHKrekx2ot8t8LWl//T7q4Ii8mRoCEOhAYAqB1UEet0IAAk4ECCwnN9ECAXMCBJa5wciDgBMBAsvJTbRAwJwAgWVuMPIg4ESAwHJyEy0QMCdAYJkbjDwIOBEgsJzcRAsEzAkQWOYGIw8CTgQILCc30QIBcwIElrnByIOAEwECy8lNtEDAnACBZW4w8iDgRIDAcnITLRAwJ0BgmRuMPAg4ESCwnNxECwTMCRBY5gYjDwJOBAgsJzfRAgFzAgSWucHIg4ATAQLLyU20QMCcAIFlbjDyIOBEgMBychMtEDAnQGCZG4w8CDgRILCc3EQLBMwJEFjmBiMPAk4ECCwnN9ECAXMCBJa5wciDgBMBAsvJTbRAwJwAgWVuMPIg4ESAwHJyEy0QMCdAYJkbjDwIOBEgsJzcRAsEzAkQWOYGIw8CTgQILCc30QIBcwIElrnByIOAEwECy8lNtEDAnACBZW4w8iDgRIDAcnITLRAwJ0BgmRuMPAg4ESCwnNxECwTMCRBY5gYjDwJOBAgsJzfRAgFzAgSWucHIg4ATAQLLyU20QMCcAIFlbjDyIOBEgMBychMtEDAnQGCZG4w8CDgRILCc3EQLBMwJEFjmBiMPAk4ECCwnN9ECAXMC/wXnhQimK8ldWwAAAABJRU5ErkJggg=='
    }
};
canvas.__proto__ = HTMLCanvasElement.prototype;

createTagProto('HTMLDivElement');
div = {
    innerHTML: '',
    className: '',
    offsetHeight: '18',
    appendChild: function appendChild() {}
};
div.__proto__ = HTMLDivElement.prototype;

createTagProto('HTMLSpanElement');
span = {
    style: canvas_style,
    offsetWidth: '148',
    offsetHeight: '71',
};
span.__proto__ = HTMLSpanElement.prototype;

document.createElement = function createElement() {
    dtavm.log('createElement:::', arguments)
    if (arguments[0] === 'canvas') {
        return canvas
    }
    if (arguments[0] === 'div') {
        return div
    }
    if (arguments[0] === 'span') {
        return span
    }
}

document.body = {
    appendChild: function appendChild() {
        if(arguments[0].hasOwnProperty('className') && arguments[0].className === 'adsbox'){
            window.adsbox = arguments[0];
        }
    },
    removeChild:function removeChild(){}
};

document.getElementsByClassName = function getElementsByClassName() {
    dtavm.log('getElementsByClassName:::', arguments)
    if (arguments[0] === 'adsbox') {
        return [window.adsbox]
    }
}
document.getElementsByTagName = function getElementsByTagName() {
    dtavm.log('getElementsByTagName:::', arguments)
    if (arguments[0] === 'body') {
        return [document.body]
    }
}

document.addEventListener = function addEventListener() {
    // dtavm.log('addEventListener:::', arguments)
}
Navigator.prototype.webkitTemporaryStorage = {
    queryUsageAndQuota: function queryUsageAndQuota() {
        dtavm.log('webkitTemporaryStorage.queryUsageAndQuota:::', arguments)
        return {
            then: function then() {
                dtavm.log('webkitTemporaryStorage.queryUsageAndQuota.then:::', arguments)
                arguments[0]({
                    quota: 1024 * 1024 * 1024 * 1000000
                })

            }
        }
    }
};
Navigator.prototype.pdfViewerEnabled = true;
Navigator.prototype.deviceMemory = 8
Navigator.prototype.connection ={
    downlink: 10,
    effectiveType: "4g",
    onchange: null,
    rtt: 50,
    saveData: false,
}

matchMedia = function matchMedia(){
    dtavm.log('matchMedia::', arguments)
    if (arguments[0] === '(prefers-color-scheme: dark)') {
        return {matches: false}
    }
    if (arguments[0] === '(prefers-color-scheme: light)') {
        return {matches: true}
    }
}

_ArrayBufferTobase64 = function(arrayBuffer) {
    // 将 ArrayBuffer 转换为 Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = '';
    const len = uint8Array.byteLength;
    // 遍历 Uint8Array 并将每个字节转换为字符
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    // 使用 btoa 函数将二进制字符串转换为 Base64 字符串
    return btoa(binary);
}

window.XMLHttpRequestx = require_('xhr2');
XMLHttpRequest = function XMLHttpRequest() {
    xhr = new XMLHttpRequestx();
    xhr.withCredentials = false;
    xhr.open_ = xhr.open;
    xhr.open = function open() {
        this.__xmrep__ = {
            url: arguments[1],
            method: arguments[0]
        }
    }
    xhr.__sentry_xhr__ = xhr.__xmrep__;
    xhr.send_ = xhr.send;
    xhr.send = function send() {
        datac = _ArrayBufferTobase64(arguments[0])
        dtavm._log('xhr.send:::', this.__xmrep__.url + '||' + datac)
        process_.exit(0);
    }
    return xhr;
}

// _0x3e0e4c("124.04347527516074")

setProxyArr(['window', 'globalThis', 'global','XMLHttpRequest.prototype','navigator.connection','navigator.webkitTemporaryStorage','document.body','indexedDB','div','program','shader','webgl','twd2d','canvas','canvas.style','document.documentElement.style','document.documentElement','chrome', 'location','treasure', 'localStorage', 'sessionStorage','screen','document','navigator']);
require_('./dws.js');
window.loadc();

