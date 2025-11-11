require_ = require;
process_ = process;
delete global;
delete Buffer;
delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
delete clearImmediate;
delete setImmediate;

dtavm = {}
dtavm.log = console.log
dtavm._log = console.log
dtavm.log = function (){}
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
                        if (`${propKey}` === 'top') {
                            return window
                        }
                        if (`${propKey}` === 'self') {
                            return self
                        }
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
            preventcExtensions(target) {
                dtavm.log(`方法用于设置preventcExtensions => [${WatchName}] 防止扩展`)
                return Reflect.preventcExtensions(target);
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
function proxy(obj, objname, type) {
    return obj;
}

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

// 重写全局对象名称
Object.defineProperties(globalThis, {
    [Symbol.toStringTag]: {
        value: 'Window'
    }
});
// 重写全局对象原型链
function setTostringAndstringTag(obj, dictValue) {
    // 重写toString方法
    obj.toString = function toString() {
        return 'function ' + obj.name + '() { [native code] }';
    }
    // 重写Symbol.toStringTag属性
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: '' + obj.name,
    });
    // 重写原型链toString方法
    obj.prototype.toString = function toString() {
        return '[object ' + obj.name + ']';
    }

    if (dictValue) {
        // 重写原型链属性或者方法
        if (dictValue['prototype_func_type']) {
            dictValuep = dictValue['prototype_func_type'];
            for (let key in dictValuep) {
                if (!obj.prototype.hasOwnProperty(key)) {
                    obj.prototype[key] = dictValuep[key];
                }
            }
        }
        // 重写对象属性或者方法
        if (dictValue['object_func_type']) {
            dictValueo = dictValue['object_func_type'];
            for (let key in dictValueo) {
                if (!obj.hasOwnProperty(key)) {
                    obj[key] = dictValueo[key];
                }
            }
        }
    }
};
// 重写原型链
function setprotoof(prototypes) {
    for (let i = 0; i < prototypes.length; i++) {
        let ctx = prototypes[i] + '.__proto__';
        let name__ = ctx;
        let boolc = false;
        for (let j = 0; j < prototypes.length; j++){
            if (boolc) {
                ctx += '.__proto__';
                name__ += '=' + prototypes[j] + '.prototype;\n' + ctx;
            }
            if (prototypes[j] === prototypes[i]) {
                boolc = true;
            }
        }
        eval(name__);
    }
}

EventTarget = function EventTarget() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(EventTarget, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
WindowProperties = function Window() {throw new TypeError("Illegal constructor");};
setTostringAndstringTag(WindowProperties, {
    // 重写对象属性或者方法
    'object_func_type': {
        PERSISTENT: 1,
        TEMPORARY: 2,
    },
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        PERSISTENT: 1,
        TEMPORARY: 2,
        addEventListener: function addEventListener() { },
        removeEventListener: function removeEventListener() { },
        dispatchEvent: function dispatchEvent() { },
    }
});

Window = function Window() {throw new TypeError("Illegal constructor");};
setTostringAndstringTag(Window, {
    // 重写对象属性或者方法
    'object_func_type': {
        PERSISTENT: 1,
        TEMPORARY: 2,
    },
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        PERSISTENT: 1,
        TEMPORARY: 2,
        addEventListener: function addEventListener() { },
        removeEventListener: function removeEventListener() { },
        dispatchEvent: function dispatchEvent() { },
    }
});

Location = function Location() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Location, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});


Promise2 = {
    then: function () {
        return this;
    },
    catch: function (){},
};

StorageManager = function StorageManager() {
    this.estimate = function estimate() {
        return proxy(Promise2,'Promise1');
    }
}
setTostringAndstringTag(StorageManager, null);
storage = new StorageManager();

PluginArray = function PluginArray() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(PluginArray, null);

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
    '4': plugins4
}
plugins.__proto__ = PluginArray.prototype;
MimeTypeArray = function MimeTypeArray() {
    this.length = 2;
    this['0'] = proxy({
        suffixes: 'pdf',
        type: 'application/pdf',
        enabledPlugin: plugins0
    }, 'MimeTypeArray0');
    this['1'] = proxy({
        suffixes: 'pdf',
        type: 'text/pdf',
        enabledPlugin: plugins0
    }, 'MimeTypeArray1');
};
setTostringAndstringTag(MimeTypeArray, null);
MimeTypeArrayc = new MimeTypeArray();
MimeTypeArrayc = proxy(MimeTypeArrayc, 'MimeTypeArrayc');

NavigatorUAData = function NavigatorUAData() {
    this.brands = [{ brand: 'Not=A?Brand', version: '99' }, { brand: 'Chromium', version: '118' }];
    this.mobile = false;
    this.platform = 'Win32';
    this.getHighEntropyValues = function (keys) {
        dtavm.log('getHighEntropyValues:', arguments);
        if (keys.includes('platformVersion') || keys.includes('fullVersionList')) {
            // 伪造高熵值数据 
            const fakeData = {
                platformVersion: '13.5.1',       // 示例值 
                fullVersionList: [
                { brand: 'Chromium', version: '112.0.0.0' },
                { brand: 'Not.A/Brand', version: '24.0.0.0' }
                ]
            };
        
            // 过滤请求的 keys 并返回对应数据 
            const result = {};
            keys.forEach(key  => {
                if (fakeData.hasOwnProperty(key))  {
                result[key] = fakeData[key];
                }
            });
        
            return Promise.resolve(result); 
        }
    }
};
setTostringAndstringTag(NavigatorUAData,null);
userAgentDatac = new NavigatorUAData();

Permissions = function Permissions() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Permissions, null);
permissions = proxy({
    query: function () {
        return Promise2
    }
}, 'permissions')
permissions.__proto__ = Permissions.prototype;

MediaDevices = function MediaDevices() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(MediaDevices, null);
mediaDevices = {
    getUserMedia: function getUserMedia() {
        dtavm.log('getUserMedia:', arguments);
    }
}
mediaDevices.__proto__ = MediaDevices.prototype;
globalThis.func_set_native(mediaDevices.getUserMedia);

Navigator = function Navigator() { throw new TypeError("Illegal constructor");};
setTostringAndstringTag(Navigator, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        vendorSub:"",
        productSub:"20030107",
        vendor:"Google Inc.",
        maxTouchPoints:0,
        scheduling:{},
        userActivation:{},
        doNotTrack:null,
        geolocation: {
            getCurrentPosition: function getCurrentPosition() {
                return Promise2
            },
        },
        connection:{
            downlink: 10,
            effectiveType: "4g",
            onchange: null,
            rtt: 50,
            saveData: false,
        },
        plugins:plugins,
        mimeTypes:MimeTypeArrayc,
        pdfViewerEnabled:true,
        webkitTemporaryStorage:{},
        webkitPersistentStorage:{},
        hardwareConcurrency:8,
        cookieEnabled:true,
        appCodeName:"Mozilla",
        appName: "Netscape",
        appVersion:"5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36",
        platform:"Win32",
        product:"Gecko",
        userAgent:"Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36",
        language:"zh-CN",
        languages:['zh-CN', 'zh'],
        onLine:true,
        webdriver:false,
        getGamepads:function getGamepads(){},
        javaEnabled:function javaEnabled(){return false},
        sendBeacon: function sendBeacon() {
            dtavm.log('sendBeacon:', arguments[1]);
        },
        vibrate:function vibrate(){},
        bluetooth:{},
        clipboard:{},
        credentials:{},
        keyboard:{},
        managed:{},
        mediaDevices:proxy(mediaDevices,'mediaDevices'),
        storage:{},
        serviceWorker:{},
        virtualKeyboard:{},
        wakeLock:{},
        deviceMemory:8,
        ink:{},
        hid:{},
        locks:{},
        gpu:{},
        mediaCapabilities:{},
        mediaSession:{},
        permissions:permissions,
        presentation:{},
        usb:{},
        xr:{},
        serial:{},
        windowControlsOverlay:{},
        userAgentData:userAgentDatac,
        canShare:function canShare(){},
        share:function share(){},
        clearAppBadge:function clearAppBadge(){},
        getBattery: function getBattery() {
            return Promise2
        },
        getUserMedia:function getUserMedia(){},
        requestMIDIAccess:function requestMIDIAccess(){},
        requestMediaKeySystemAccess:function requestMediaKeySystemAccess(){},
        setAppBadge:function setAppBadge(){},
        webkitGetUserMedia:function webkitGetUserMedia(){},
        getInstalledRelatedApps:function getInstalledRelatedApps(){},
        registerProtocolHandler:function registerProtocolHandler(){},
        unregisterProtocolHandler:function unregisterProtocolHandler(){}
    }
});
Node = function Node() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Node, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
Document = function Document() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Document, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        createEvent: function createEvent() { },
        createElement: function createElement() { },
        addEventListener: function addEventListener() { },
        getElementsByTagName: function getElementsByTagName() { },
    }
});
HTMLDocument = function HTMLDocument() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLDocument, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
Screen = function Screen() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Screen, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        availHeight: 824,
        availLeft: 0,
        availTop: 0,
        availWidth: 1536,
        colorDepth: 24,
        height: 864,
        isExtended: true,
        onchange: null,
        pixelDepth: 24,
        width: 1536,
        orientation: {
            angle: 0,
            type: "landscape-primary",
            onchange: null
        }
    }
});
History = function History() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(History, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        length: 2,
        back: function back() {
            dtavm.log('History back:', arguments);
        },
        forward: function forward() { },
        go: function go() {
            dtavm.log('History go:', arguments);
        },
        pushState: function pushState() { },
        replaceState: function replaceState() { },
        scrollRestoration: "auto",
        state: null
    }
});
Storage = function Storage() { throw new TypeError("Illegal constructor"); };
local = {
    "dfp_params_list": "{\"auto_init\":0,\"black_host\":[\"gatewaydsp.meituan.com\",\"portal-portm.meituan.com\",\"dd.sankuai.com\",\"dd.meituan.com\",\"catfront.dianping.com\",\"catfront.51ping.com\",\"report.meituan.com\",\"dreport.meituan.net\",\"postreport.meituan.com\",\"wreport1.meituan.net\",\"lx0.meituan.com\",\"lx1.meituan.net\",\"lx2.meituan.net\",\"plx.meituan.com\",\"hlx.meituan.com\",\"ad.e.waimai.sankuai.com:80\",\"speech-inspection.vip.sankuai.com\",\"kms.sankuai.com\",\"r.dianping.com\",\"r1.dianping.com\",\"api-channel.waimai.meituan.com\",\"lion-monitor.sankuai.com\",\"cat-config.sankuai.com\",\"catdot.sankuai.com\",\"s3plus.meituan.net\",\"ebooking.meituan.com\",\"eb.hotel.test.sankuai.com\",\"eb.vip.sankuai.com\",\"eb.meituan.com\",\"logan.sankuai.com\",\"mads.meituan.com\",\"mlog.dianping.com\",\"oneservice.meituan.com\",\"api-unionid.meituan.com\",\"fe-config.meituan.com\",\"fe-config0.meituan.com\",\"h.meituan.com\",\"p.meituan.com\",\"peisong-collector.meituan.com\",\"wreport2.meituan.net\",\"hreport.meituan.com\",\"c.qcs.test.sankuai.com\",\"dache.st.meituan.com\",\"dache.meituan.com\"],\"black_url\":[\"syncloud.meituan.com/be/chp/takeaway/\",\"syncloud.meituan.com/be/chp/takeawayClassifyManagement/\",\"syncloud.meituan.com/be/chp/createSkuToTakeaway/\",\"i.meituan.com/api/address\",\"i.meituan.com/api/maf\",\"mapi.dianping.com/mapi/mlog/applog.bin\",\"mapi.dianping.com/mapi/mlog/zlog.bin\",\"mapi.dianping.com/mapi/mlog/mtmidas.bin\",\"mapi.dianping.com/mapi/mlog/mtzmidas.bin\",\"m.dianping.com/adp/log\",\"mlog.meituan.com/log\",\"mlog.dianping.com/log\",\"m.api.dianping.com/mapi/mlog/applog.bin\",\"m.api.dianping.com/mapi/mlog/zlog.bin\",\"m.api.dianping.com/mapi/mlog/mtmidas.bin\",\"m.api.dianping.com/mapi/mlog/mtzmidas.bin\",\"peisong.meituan.com/collector/report/logdata/short/batch\",\"transcode-video.sankuai.com/pfop\",\"peisong.meituan.com/api/collector/collector/report/logdata/short/batch\",\"api-map.meituan.com/tile/style\",\"api-map01.meituan.com/tile/style\",\"api-map02.meituan.com/tile/style\",\"api-map03.meituan.com/tile/style\",\"api-map04.meituan.com/tile/style\",\"api-map05.meituan.com/tile/style\",\"api-map.meituan.com/tile/source\",\"api-map01.meituan.com/tile/source\",\"api-map02.meituan.com/tile/source\",\"api-map03.meituan.com/tile/source\",\"api-map04.meituan.com/tile/source\",\"api-map05.meituan.com/tile/source\",\"api-map.meituan.com/tile/font\",\"api-map01.meituan.com/tile/font\",\"api-map02.meituan.com/tile/font\",\"api-map03.meituan.com/tile/font\",\"api-map04.meituan.com/tile/font\",\"api-map05.meituan.com/tile/font\",\"api-map.meituan.com/tile/grid\",\"api-map01.meituan.com/tile/grid\",\"api-map02.meituan.com/tile/grid\",\"api-map03.meituan.com/tile/grid\",\"api-map04.meituan.com/tile/grid\",\"api-map05.meituan.com/tile/grid\",\"api-map.meituan.com/tile/dem\",\"api-map01.meituan.com/tile/dem\",\"api-map02.meituan.com/tile/dem\",\"api-map03.meituan.com/tile/dem\",\"api-map04.meituan.com/tile/dem\",\"api-map05.meituan.com/tile/dem\",\"api-map.meituan.com/render/traffic\",\"api-map01.meituan.com/render/traffic\",\"api-map02.meituan.com/render/traffic\",\"api-map03.meituan.com/render/traffic\",\"api-map04.meituan.com/render/traffic\",\"api-map05.meituan.com/render/traffic\",\"api-map.meituan.com/tile/model\",\"api-map01.meituan.com/tile/model\",\"api-map02.meituan.com/tile/model\",\"api-map03.meituan.com/tile/model\",\"api-map04.meituan.com/tile/model\",\"api-map05.meituan.com/tile/model\",\"spotter-relay.sankuai.com/auk01/\",\"spotter-livevod.vip.sankuai.com/recordings/auk01/\",\"e.dianping.com/joy/merchant/newuploadimage\",\"e.51ping.com/joy/merchant/newuploadimage\",\"spotter-relay.sankuai.com/maiot/\",\"wx-shangou.meituan.com/quickbuy/v2/activity/supersale/getLocationByIp\",\"wx-shangou.meituan.com/quickbuy/v2/activity/supersale/bigPromotionHeadInfo\",\"wx-shangou.meituan.com/quickbuy/v2/activity/supersale/bigPromotionResourceInfo\",\"wx-shangou.meituan.com/quickbuy/v1/user/address/posname\",\"wx-shangou.meituan.com/quickbuy/v1/activity/supersale/grab/queryUserSubscription\",\"transcode-video.cloud.test.sankuai.com/pfop\",\"ecom.meituan.com/emis/gw/PublishAssistantQueryService/queryFieldRequirements\",\"ecom.meituan.com/emis/gw/PublishAssistantValidateService/realTimeValidateProduct\",\"ecom.meishi.test.meituan.com/emis/gw/PublishAssistantQueryService/queryFieldRequirements\",\"ecom.meishi.test.meituan.com/emis/gw/PublishAssistantValidateService/realTimeValidateProduct\"],\"close_knb_sign\":0,\"header_white_host\":[],\"init_black_host\":[],\"init_black_url\":[],\"init_white_host\":[],\"init_white_url\":[],\"package_info\":{\"min\":\"4.0.0\",\"url\":\"https://msp.meituan.net/h5guard-files/package-1.0.0.js\",\"url_backup\":\"https://msp-backup.meituan.net/h5guard-files/package-1.0.0.js\",\"ver\":\"1.0.0\"},\"swim_black_host\":[\"ebooking.meituan.com\",\"eb.hotel.test.sankuai.com\",\"eb.vip.sankuai.com\",\"eb.meituan.com\",\"c.qcs.test.sankuai.com\",\"dache.st.meituan.com\",\"dache.meituan.com\"],\"white_host\":[\".dianping.com\",\".meituan.com\",\".sankuai.com\",\".maoyan.com\",\".neixin.cn\",\".51ping.com\",\".baobaoaichi.cn\",\".dper.com\",\".jchunuo.com\"]}",
    "localId": "1753674554191QGAGMCKfd79fef3d01d5e9aadc18ccd4d0c95073768",
    "__lxsdk__lxsdk_cuid": "\"1984f260afcc8-0b8b31138953ef-1854352f-144000-1984f260afcc8\"",
    "dfpId": "3z8wyxu9wzx75v9vzyuu846uu609u35v8015u7373v597958980v8003",
    "dfp_timestamp": "1753760955853"
};
setTostringAndstringTag(Storage, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        clear: function clear() {
            local = {};
        },
        getItem: function getItem(key) {
            if (!Object.keys(local).includes(key)) {
                return null;
            }
            return local[key];
        },
        setItem: function setItem(key, value) {
            local[key] = value;
        },
        removeItem: function removeItem(key) {
            delete local[key];
        },
        key: function key(index) {
            return Object.keys(local)[index];
        },
        length: 0,
        get length() {
            return Object.keys(local).length;
        }
    }
});
XMLHttpRequest = function XMLHttpRequest() {

};
setTostringAndstringTag(XMLHttpRequest, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        open: function open() {
            debugger
            dtavm.log('open:',arguments)
        },
        send: function send() {
            dtavm.log('send:',arguments)
        },
        abort: function abort() { },
        setRequestHeader: function setRequestHeader() { },
        getAllResponseHeaders: function getAllResponseHeaders() { },
        getResponseHeader: function getResponseHeader() { },
        overrideMimeType: function overrideMimeType() { },
        addEventListener : function addEventListener() { },
        removeEventListener : function removeEventListener() { },
        dispatchEvent: function dispatchEvent() { },
        onreadystatechange : function onreadystatechange() { },
        responseURL: "",
        status: 0,
        statusText: "",
        responseType: "",
        response: null,
        responseXML: null,
        responseText: "",
        timeout: 0,
        withCredentials: false,
        upload: null,
        readyState: 0,
    }
});
Element = function Element() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Element, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
HTMLElement = function HTMLElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLElement, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
HTMLHtmlElement = function HTMLHtmlElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLHtmlElement, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});

window = globalThis;
setprotoof(['window', 'Window', 'WindowProperties','EventTarget'])

top = window.top = window;
self = window.self = window;
parent = window.parent = window;
frames = window.frames = window;
Object.defineProperty(window, "top", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function top(){
        return window
    }
})
Object.defineProperty(window, "self", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function self(){
        return window
    }
})
Object.defineProperty(window, "parent", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function parent(){
        return window
    }
})
Object.defineProperty(window, "frames", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function frames(){
        return window
    }
})


navigator = {};
navigator.__proto__ = Navigator.prototype;
clientInformation = navigator;
Object.defineProperty(window, "clientInformation", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function clientInformation(){
        return navigator
    }
})

location = {
    "ancestorOrigins": {},
    "href": "https://account.dianping.com/pclogin?redir=https://m.dianping.com/dphome",
    "origin": "https://account.dianping.com",
    "protocol": "https:",
    "host": "account.dianping.com",
    "hostname": "account.dianping.com",
    "port": "",
    "pathname": "/pclogin",
    "search": "?redir=https://m.dianping.com/dphome",
    "hash": ""
};
location.__proto__ = Location.prototype;


documentElement = {
    hasAttribute: function hasAttribute() {
        dtavm.log('hasAttribute:', arguments);
        return false;
    },
    getAttribute:function getAttribute() {
        dtavm.log('getAttribute:', arguments);
        return null;
    },
    attributes:{length:0},
    clientWidth: 1519,
    clientHeight: 715,
    scrollTop:0
};
setprotoof(['documentElement', 'HTMLHtmlElement', ' HTMLElement', 'Element', ' Node', 'EventTarget'])
window.func_set_native(documentElement.hasAttribute);
window.func_set_native(documentElement.getAttribute);

WebGLShaderPrecisionFormat = function WebGLShaderPrecisionFormat() {
    this.rangeMin = 127;
    this.rangeMax = 127;
    this.precision = 23;
}
WebGLShaderPrecisionFormat.prototype.toString = function () { return '[object WebGLShaderPrecisionFormat]' }
WebGLShaderPrecisionFormat.toString = function () { return 'function WebGLShaderPrecisionFormat() { [native code] }' }
Object.defineProperties(WebGLShaderPrecisionFormat.prototype, { [Symbol.toStringTag]: { value: 'WebGLShaderPrecisionFormat' } })

WebGLRenderingContext = function WebGLRenderingContext() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(WebGLRenderingContext, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        getSupportedExtensions: function getSupportedExtensions() { },
        getExtension: function getExtension() { },
        getParameter: function getParameter() { },
        createBuffer: function createBuffer() { },
        bindBuffer: function bindBuffer() { },
        bufferData: function bufferData() { },
        createProgram: function createProgram() { },
        createShader: function createShader() { },
        shaderSource: function shaderSource() { },
        compileShader: function compileShader() { },
        attachShader: function attachShader() { },
        linkProgram: function linkProgram() { },
        useProgram: function useProgram() { },
        getAttribLocation: function getAttribLocation() { },
        getUniformLocation: function getUniformLocation() { },
        enableVertexAttribArray: function enableVertexAttribArray() { },
        vertexAttribPointer: function vertexAttribPointer() { },
        uniform2f: function uniform2f() { },
        drawArrays: function drawArrays() { },
        getSupportedExtensions: function getSupportedExtensions() { },
        clearColor: function clearColor() { },
        enable: function enable() { },
        depthFunc: function depthFunc() { },
        clear: function clear() { },
        getShaderPrecisionFormat: function getShaderPrecisionFormat() { },
        createTexture: function createTexture() { },
        bindTexture: function bindTexture() { },
        texImage2D: function texImage2D() { },
        texParameteri: function texParameteri() { },
        texParameterf: function texParameterf() { },
        texSubImage2D: function texSubImage2D() { },
    }
});
webgl = proxy({
    canvas: proxy({
        toDataURL: function () {
            return 'data:image/png;base64,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'
        }
    },'webgl-canvas'),
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
    readPixels: function () {
    },
    getError: function () {
        return 0
    },
    getSupportedExtensions: function () {
        return ['ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_color_buffer_half_float', 'EXT_disjoint_timer_query', 'EXT_float_blend', 'EXT_frag_depth', 'EXT_shader_texture_lod', 'EXT_texture_compression_bptc', 'EXT_texture_compression_rgtc', 'EXT_texture_filter_anisotropic', 'EXT_sRGB', 'KHR_parallel_shader_compile', 'OES_element_index_uint', 'OES_fbo_render_mipmap', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_color_buffer_float', 'WEBGL_compressed_texture_s3tc', 'WEBGL_compressed_texture_s3tc_srgb', 'WEBGL_debug_renderer_info', 'WEBGL_debug_shaders', 'WEBGL_depth_texture', 'WEBGL_draw_buffers', 'WEBGL_lose_context', 'WEBGL_multi_draw']
    },
    getExtension: function () {
        dtavm.log('getExtension:', arguments[0])
        if (arguments[0] === 'WEBGL_debug_renderer_info') {
            return {
                UNMASKED_RENDERER_WEBGL : 37446,
                UNMASKED_VENDOR_WEBGL : 37445
            }
        }
        if (arguments[0] === 'WEBGL_lose_context') {
            return proxy({
                loseContext: function () { }
            }, 'webgl-lose-context')
        }
    },
    getParameter: function () {
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
    createBuffer: function () {
        return proxy({
            name: 'webgl_buffer',
            itemSize: 3,
            numItems:3
        }, 'webgl-buffer')
    },
    bindBuffer: function () {
    },
    bufferData: function () {
    },
    createProgram: function () {
        return {vertexPosAttrib: 0}
    },
    createShader: function () {
        return {}
    },
    shaderSource: function () {
    },
    compileShader: function () {
    },
    attachShader: function () {
    },
    linkProgram: function () {
    },
    useProgram: function () {
    },
    getAttribLocation: function () {
        return 0
    },
    getUniformLocation: function () {
        return proxy({}, 'WebGLUniformLocation')
    },
    enableVertexAttribArray: function () {
    },
    vertexAttribPointer: function () {
    },
    uniform2f: function () {
    },
    drawArrays: function () {
    },
    getSupportedExtensions: function () {
        return [
            "ANGLE_instanced_arrays",
            "EXT_blend_minmax",
            "EXT_color_buffer_half_float",
            "EXT_disjoint_timer_query",
            "EXT_float_blend",
            "EXT_frag_depth",
            "EXT_shader_texture_lod",
            "EXT_texture_compression_bptc",
            "EXT_texture_compression_rgtc",
            "EXT_texture_filter_anisotropic",
            "EXT_sRGB",
            "KHR_parallel_shader_compile",
            "OES_element_index_uint",
            "OES_fbo_render_mipmap",
            "OES_standard_derivatives",
            "OES_texture_float",
            "OES_texture_float_linear",
            "OES_texture_half_float",
            "OES_texture_half_float_linear",
            "OES_vertex_array_object",
            "WEBGL_color_buffer_float",
            "WEBGL_compressed_texture_s3tc",
            "WEBGL_compressed_texture_s3tc_srgb",
            "WEBGL_debug_renderer_info",
            "WEBGL_debug_shaders",
            "WEBGL_depth_texture",
            "WEBGL_draw_buffers",
            "WEBGL_lose_context",
            "WEBGL_multi_draw"
        ]
    },
    clearColor: function () {
    },
    enable: function () {
    },
    depthFunc: function () {
    },
    DEPTH_TEST: 2929,
    LEQUAL: 515,
    COLOR_BUFFER_BIT: 16384,
    DEPTH_BUFFER_BIT: 256,
    clear: function () {
    },
    getShaderPrecisionFormat: function () {
        if (arguments[0] === 35633 && arguments[1] === 36338) {
            return new WebGLShaderPrecisionFormat()
        }
        if (arguments[0] === 35633 && arguments[1] === 36337) {
            return new WebGLShaderPrecisionFormat()
        }
        if (arguments[0] === 35633 && arguments[1] === 36336) {
            return new WebGLShaderPrecisionFormat()
        }
        if (arguments[0] === 35632 && arguments[1] === 36338) {
            return new WebGLShaderPrecisionFormat()
        }
        if (arguments[0] === 35632 && arguments[1] === 36337) {
            return new WebGLShaderPrecisionFormat()
        }
        if (arguments[0] === 35632 && arguments[1] === 36336) {
            return new WebGLShaderPrecisionFormat()
        }
        if (arguments[0] === 35633 && arguments[1] === 36341) {
            obj = new WebGLShaderPrecisionFormat();
            obj.rangeMin = 31;
            obj.rangeMax = 30;
            obj.precision = 0;
            return obj
        }
        if (arguments[0] === 35633 && arguments[1] === 36340) {
            obj = new WebGLShaderPrecisionFormat();
            obj.rangeMin = 31;
            obj.rangeMax = 30;
            obj.precision = 0;
            return obj
        }
        if (arguments[0] === 35633 && arguments[1] === 36339) {
            obj = new WebGLShaderPrecisionFormat();
            obj.rangeMin = 31;
            obj.rangeMax = 30;
            obj.precision = 0;
            return obj
        }
        if (arguments[0] === 35632 && arguments[1] === 36341) {
            obj = new WebGLShaderPrecisionFormat();
            obj.rangeMin = 31;
            obj.rangeMax = 30;
            obj.precision = 0;
            return obj
        }
        if (arguments[0] === 35632 && arguments[1] === 36340) {
            obj = new WebGLShaderPrecisionFormat();
            obj.rangeMin = 31;
            obj.rangeMax = 30;
            obj.precision = 0;
            return obj
        }
        if (arguments[0] === 35632 && arguments[1] === 36339) {
            obj = new WebGLShaderPrecisionFormat();
            obj.rangeMin = 31;
            obj.rangeMax = 30;
            obj.precision = 0;
            return obj
        }
    }
}, 'webgl');
webgl.__proto__ = WebGLRenderingContext.prototype;
window.func_set_native(webgl.createBuffer);
window.func_set_native(webgl.bindBuffer);
window.func_set_native(webgl.bufferData);
window.func_set_native(webgl.createProgram);
window.func_set_native(webgl.createShader);
window.func_set_native(webgl.shaderSource);
window.func_set_native(webgl.compileShader);
window.func_set_native(webgl.attachShader);
window.func_set_native(webgl.linkProgram);
window.func_set_native(webgl.useProgram);
window.func_set_native(webgl.getAttribLocation);
window.func_set_native(webgl.getUniformLocation);
window.func_set_native(webgl.enableVertexAttribArray);
window.func_set_native(webgl.vertexAttribPointer);
window.func_set_native(webgl.uniform2f);
window.func_set_native(webgl.drawArrays);
window.func_set_native(webgl.getSupportedExtensions);
window.func_set_native(webgl.clearColor);
window.func_set_native(webgl.enable);
window.func_set_native(webgl.depthFunc);
window.func_set_native(webgl.clear);
window.func_set_native(webgl.getShaderPrecisionFormat);

CanvasRenderingContext2D = function CanvasRenderingContext2D() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(CanvasRenderingContext2D, null);

canvas2d = {
    moveTo:function(){},
    stroke:function(){},
    lineTo:function(){},
    canvas: this,
    direction: "ltr",
    fillStyle: "#000000",
    filter: "none",
    font: "24px Arial",
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "low",
    lineCap: "butt",
    lineDashOffset: 0,
    lineJoin: "miter",
    lineWidth: 1,
    miterLimit: 10,
    shadowBlur: 0,
    shadowColor: "rgba(0, 0, 0, 0)",
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    strokeStyle: "#000000",
    textAlign: "start",
    textBaseline: "alphabetic",
    fillRect: function(v1, v2, v3, v4) {},
    fillText: function (v1, v2, v3) { },
    rect: function (v1, v2, v3, v4) { },
    isPointInPath: function () {
        if (arguments[0] === 6 && arguments[1] === 6 && arguments[2] === "evenodd") {
            return false;
        }
    },
    beginPath: function () { },
    closePath: function () { },
    strokeRect: function (v1, v2, v3, v4) { },
    strokeText: function (v1, v2, v3) { },
    clearRect: function (v1, v2, v3, v4) { },
    fill: function () { },
    fillStyle: function (v1) { },
    arc: function (v1, v2, v3, v4, v5, v6) { },
    getImageData: function () {
        return {width: 100, height: 100}
    },
    putImageData: function () { },
    createImageData: function () {
        return {
            data:{set:function(v1,v2,v3,v4){}}
        }
    },
    measureText: function () {
        dtavm.log("measureText:", arguments[0]);
        return {
            "width": 396,
            "actualBoundingBoxLeft": 0,
            "actualBoundingBoxRight": 389,
            "fontBoundingBoxAscent": 62,
            "fontBoundingBoxDescent": 10,
            "actualBoundingBoxAscent": 51,
            "actualBoundingBoxDescent": -1,
            "hangingBaseline": 49.599998474121094,
            "alphabeticBaseline": 0,
            "ideographicBaseline": -10
        }
    }
};
canvas2d.__proto__ = CanvasRenderingContext2D.prototype;
window.func_set_native(canvas2d.fill);
window.func_set_native(canvas2d.fillRect);
window.func_set_native(canvas2d.stroke);
window.func_set_native(canvas2d.strokeRect);
window.func_set_native(canvas2d.clearRect);
window.func_set_native(canvas2d.beginPath);
window.func_set_native(canvas2d.closePath);
window.func_set_native(canvas2d.arc);
window.func_set_native(canvas2d.fillText);
window.func_set_native(canvas2d.strokeText);
window.func_set_native(canvas2d.measureText);
window.func_set_native(canvas2d.isPointInPath);
window.func_set_native(canvas2d.createImageData);
window.func_set_native(canvas2d.getImageData);
window.func_set_native(canvas2d.putImageData);
window.func_set_native(canvas2d.rect);
window.func_set_native(canvas2d.fillStyle);
canvas2d = proxy(canvas2d, "canvas2d");

HTMLCanvasElement = function HTMLCanvasElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLCanvasElement, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        getContext: function getContext() { },
        toDataURL: function toDataURL() { }, 
    }
});
canvas = {
    canvas:this,
    clientWidth:'',
    accessKey: '',
    childNodes: [],
    contentEditable: 'inherit',
    height: 150,
    hidden: false,
    innerHTML: '',
    namespaceURI: "http://www.w3.org/1999/xhtml",
    localName: 'canvas',
    nodeName: 'CANVAS',
    offsetHeight: 0,
    offsetLeft: 0,
    offsetParent: 0,
    getAttributeNames: function () {
    },
    offsetTop: 0,
    outerHTML: "<canvas></canvas>",
    width: 300,
    style: CSSStyleDeclaration = {
        webkitTransform: "",
        webkitTransformOrigin: "",
        webkitTransformOriginX: "",
        webkitTransformOriginY: "",
        webkitTransformOriginZ: "",
        webkitTransformStyle: "",
        webkitTransition: "",
        webkitTransitionDelay: "",
        webkitTransitionDuration: "",
        webkitTransitionProperty: "",
        webkitTransitionTimingFunction: "",
        webkitUserDrag: "",
        webkitUserModify: "",
        webkitUserSelect: "",
        webkitWritingMode: "",
        whiteSpace: "",
        widows: "",
        width: "",
        willChange: "",
        wordBreak: "",
        wordSpacing: "",
        wordWrap: "",
        writingMode: "",
        x: "",
        y: "",
        zIndex: "",
        zoom: "",

    },
    getContext: function getContext() {
        dtavm.log('getContext:', arguments)
        if (arguments[0] === 'webgl') {
            return webgl
        }
        if (arguments[0] === '2d') {
            return canvas2d
        }
    },
    toDataURL: function toDataURL() {
        return 'data:image/png;base64,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'
    },
};
canvas.__proto__ = HTMLCanvasElement.prototype;
window.func_set_native(canvas.getContext);
window.func_set_native(canvas.toDataURL);

HTMLDivElement = function HTMLDivElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLDivElement, null)
// WritingTest id="WritingTest" style="display:none;">

HTMLCollection = function HTMLCollection() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLCollection, null)

HTMLScriptElement = function HTMLScriptElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLScriptElement, null)

HTMLAudioElement = function HTMLAudioElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLAudioElement, null)
audio = {
    canPlayType: function canPlayType() {
        dtavm.log('audio-canPlayType::', arguments)
        if (arguments[0] === 'audio/ogg; codecs="vorbis"' || arguments[0] === 'audio/mpeg;' || arguments[0] === 'audio/wav; codecs="1"' || arguments[0] === 'audio/aac;') {
            return 'probably'
        }
        if (arguments[0] === 'audio/x-m4a;') {
            return 'maybe'
        }
        return ''
    }
};
audio.__proto__ = HTMLAudioElement.prototype;

HTMLVideoElement = function HTMLAudioElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLVideoElement, null)
video = {
    canPlayType: function canPlayType() {
        dtavm.log('video-canPlayType::', arguments)
        if (arguments[0] === 'video/ogg; codecs="theora"' || arguments[0] === 'video/mp4; codecs="avc1.42E01E"' || arguments[0] === 'video/webm; codecs="vp8, vorbis"') {
            return 'probably'
        }
        return ''
    }
};
video.__proto__ = HTMLVideoElement.prototype;

HTMLBodyElement = function HTMLBodyElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLBodyElement, null)
body = {
    scrollTop: 0,
    appendChild: function appendChild() {
        dtavm.log('appendChild:', arguments);
    },
    removeChild: function removeChild() {
        dtavm.log('removeChild:', arguments);
    },
};
body.__proto__ = HTMLBodyElement.prototype;
frame_num = 0;
document = {
    body:proxy(body, 'body'),
    readyState: "complete",
    createEvent: function createEvent() {
        dtavm.log('createEvent:', arguments);
        throw new TypeError("Uncaught DOMException: Failed to execute 'createEvent' on 'Document': The provided event type ('TouchEvent') is invalid.");
    },
    createElement: function createElement() {
        dtavm.log('createElement:', arguments);
        if (arguments[0] === 'canvas') {
            return proxy(canvas,'canvas')
        }
        if (arguments[0] === 'div') {
            div = {
                tagName: 'DIV',
                appendChild: function appendChild() {
                    dtavm.log('div-appendChild:', this,arguments[0]);
                },
                style: {
                    display: 'none',
                }
            };
            div.__proto__ = HTMLDivElement.prototype;
            return proxy(div, 'div')
        }
        if (arguments[0] === 'audio') {
            return proxy(audio, 'audio')
        }
        if (arguments[0] === 'video') {
            return proxy(video, 'video')
        }
    },
    getElementsByTagName: function getElementsByTagName() {
        // dtavm.log('getElementsByTagName:', arguments);
        if (arguments[0] === 'script') {
            lists = [
                {
                    src: 'https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/jsencrypt.min.js',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return '//s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/jsencrypt.min.js';
                        }
                    },
                },
                {
                    src: 'https://s0.meituan.net/mxx/yoda/yoda.seed.js',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return 'https://s0.meituan.net/mxx/yoda/yoda.seed.js';
                        }
                    },
                },
                {
                    src: '',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return null;
                        }
                    },
                },
                {
                    src: '',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return null;
                        }
                    },
                },
                {
                    src: 'https://s3.meituan.net/v1/mss_eb9ea9cfff9840198c3ae909b17b4270/production/logan-websdk/async_dependencies.787c36adfcd0290faef6.js',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return '//s3.meituan.net/v1/mss_eb9ea9cfff9840198c3ae909b17b4270/production/logan-websdk/async_dependencies.787c36adfcd0290faef6.js';
                        }
                    },
                },
                {
                    src: 'https://s3.meituan.net/v1/mss_eb9ea9cfff9840198c3ae909b17b4270/production/logan-websdk/logan_2.1.5.js',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return '//s3.meituan.net/v1/mss_eb9ea9cfff9840198c3ae909b17b4270/production/logan-websdk/logan_2.1.5.js';
                        }
                    },
                },
                {
                    src: 'https://www.dpfile.com/app/owl/static/owl_1.9.3.js',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return '//www.dpfile.com/app/owl/static/owl_1.9.3.js';
                        }
                    },
                },
                {
                    src: '',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return null;
                        }
                    },
                },
                {
                    src: 'https://lx.meituan.net/lx.js',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return '//lx.meituan.net/lx.js';
                        }
                    },
                },
                {
                    src: 'https://appsec-mobile.meituan.com/h5guard/H5guard.js?v=1744681957430',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return 'https://appsec-mobile.meituan.com/h5guard/H5guard.js?v=1744681957430';
                        }
                    },
                },
                {
                    src: '',
                    getAttribute: function getAttribute() {
                        dtavm.log('getAttribute:', arguments);
                        if (arguments[0] === 'src') {
                            return null;
                        }
                    },
                },
            ];
            lists.__proto__ = HTMLCollection.prototype;
            for (var i = 0; i < lists.length; i++) {
                lists[0].__proto__ = HTMLScriptElement;
            }
            return proxy(lists,'scripts')
        }
        if (arguments[0] === 'iframe') {
            return {length: 0}
        }
        if (arguments[0] === 'frame') {
            if (frame_num == 0) {
                frame_num += 1;
                return {length: 0}
            } else {
                // window.H5guard.sign({
                //     "url": "https://accountapi.dianping.com/mlogin/dp/api/v3/account/mobileloginapply",
                //     "headers": {
                //         "Content-Type": "application/x-www-form-urlencoded"
                //     },
                //     "data": "encryptMobile=U%2Bc5gGS1bdqQ8HJoWzBk4pVcmHoiuqOTqtBAFAvWDVlV9JoVhnfWN9H1Nct%2BkBabol094Rd0JxuSfLVRtPZuzeaXDVcifFyVr6ORi3cGEZnLrvi50SS2WXvoAYDPbwkVJGBX9rhAuQAzh4oZAfPcIOL2RvGPNTrSYPMkeDSV8Ldl5Nirx0p0B7sS69qlwoahtBQAs0BZAVmJDjDS%2BDTk7n20cNaFJERfblXtuA4nx4Y5BQDIyneQVHyTFqpZaLPuyYoG8%2B2myBEcUN7m27fupQwaZqBowyAXXGvempFf9pCVmomxj0fU1WWAhSs0a%2BM%2BsSjjxx3uusRNjUZrpxA1BQ%3D%3D&countryCode=86&uuid=196381de812c8-08fa311018d228-1854352f-144000-196381de812c8&cx=cxcxcx&platform=1&app=216&partner=26&risk_platform=1&risk_app=216&risk_partner=26&siteType=PC&h5_fingerprint=H5dfp_3.1.0_tttt_S8AyLxTc3KUE%2BvNKDMMAj0hkXjKoHZZPIA96jYCUyO6ld5KejRKTmmJA6GZLU%2F8Bg4X1Vp%2BoPWeRhUnuwpXmoMpuziYTR0QhQZ99VVtKVnj7nCOSNLHPL21Y2h9zC1vzQT%2BNOR9sx%2BTEhDGF2%2BzABXoeLljrBbgs24MqRiDDHDj9yoVaPdPSUhmWPl%2BPUCczLwgpHzk5O9JlVJZx4VE3AiIcLSdf0jMUyQ5DZzWJkEOXohVFE7sDyvSjyEttbaaCMWV52hhgX8eRbTj9yHyaZVJdeTBlU99jeCPEVlF4%2FA7KMEzgpquuzmhmMtSRtw6FqkYljMlXH52qjebkng9vW%2Fwpj3sdYlFdgj9d1rM6nkSLEhA8u47bkMJG57WQH38b2ShzzKV6nb3J6VDRFqh9Vj58bnxs78SH2i1N9Uf%2B1ogvJh%2BKat9JTcy10dnHZwi83xgvzTlMF4YqilSnNuneqfPk3Z1ro2Mqab9Kz2t%2FeZxfWf5bo24vJEXvEKUNvjsMQmUUMwQn0yERgb8CKoEFG0Fzs8Wu83xQ8PHapzSBnrqqQu87cwLuG4jAIFdqgq8q8Hh9xt80Yem9YDwxWUsV3I9vKBeTnUnoDkgL2JJ%2BzULfuEntpisfJjnpCuZZuWG53oc8KYvwK0ZKCd08ud0G2bi7dW1gs%2FzIiMnkZ2vNBt1ZAbeg8avvxgCkho0Y%2F0dH5hBmethV4LSObbiHk38TbQhlfAAV1%2BLbw0kaP7GYIYPbTTY1UO0ey45xwiNTIh%2Fc0AFJgbWiU%2BCnAcxnljq3LXSBGl524c%2Bdqu5miBM5LFq9wy2%2FN6nWwO8N53haiVlyZ8XGNZ3WJ8RzPbb4eXl9YtAHYSmheCY%2FvESZEKy6yb%2B%2FS3%2Bpvng9dL9oNUGRVgaSnyoMfrgViyHhEA1qElXXp2An%2BJ%2BUm04J4BXgCGiiszxJsUNdCL3at284BSJBDHEORcsy0n3pplQI%2FfhdImR7u170x0vRSeA2hQHS8cVyZ5Bkz77zOnHSqqE0yzi5FGixzH5XhY0XdSSriSbEb%2F7Lgt8nzS6Dl88LBNnHMRmaFTApvmAZZO7ZI5%2FtnvhCGCP1f%2F9hMgDrfCg%2Fpqqo4qyqFWCEiTXHvjHe6TBXxdZJGQUffcH2z7QxVRCLUWr7rwaJI2KI5yKlIj76tMayyVcK6XtstI5k3W%2BCmGwCZb7ZavwiDJ8yt6RescUaA1aE%2BR50kTPIwXZpQOb7kSNJCMOd4DaDyZmmgvAAHTvzuGxOqej%2FKmRjclNiGpwz1FGGAzpUkpYUs1EOkXova427xiXIsouznK80zmOR4Xc3WGf1EMSX6E5jHlBaSGDHJTXkYpL3%2Fcu41TAaueQ%2FfM5x8E7mvDceEkDgvRXmgR3ucU1ehVq0KFd4mApZrTLMBAoNv75pPsvZXUQEqjraagVPdTX5Sq5vhyMIik5CJ1kAqbgIrve5w2drJnWxzoc0WatAVZCerTyvMjpq8mKDPUzEawrrS6GM7ww31eq37lFJe%2Bli2JykmT0eVmpXkPIDEd%2BKmSNcrIKv4I5L0DSsp%2FZV%2BkbryLDwnJgiup3ucwQFeeusN4TVZxcYe%2BnXta0zrO668nB4BBuGG9gQMeG2LZbWjxKz55343viQqV8DeEmCIWlm5Y1YYZO%2FOP4z%2FhfsU9MO7HsD1%2Bgi7CV3ek9vW2ulMtN2L7iXJDluBOFWQyxd5Ywc3iw0pQfGmlZsMu%2FiH5pCRXqwWD%2FEc88Ll6rWErBeb04AZDP4Osq5uPDWsl1BxWT2wPLecirY64e7k4rr0yveD5FNBrZ6LEApSZUV3B7AcSV1TAZdnNH27abCs0ADSqgWsADAi6HwmQCbOd87Yon1oC7CMqEIF51HsyoMj4TNu352%2BIeYs6QoBJLBugyoKcB56HV76ceDxsU%2B6OPrzjkYRsEiBxbHjdRHN8n1%2F1Q5MlDg2KuNfxGb7E1jlgFRnL93tdpNqx%2B9T13SUsxhzSoBgTPd0CFzZ328MDsHIEzdcrLv9xp9jM4RxI2%2FUOcCk59K%2FjZElZapI602I3OZ%2B4%2B46YyEEfuTnIWZO%2FEgJOqaZBE5Lbo44GH1vcoJFOtV%2BUmxhJqc2VqqqCIq9dWi1Uq65w5dnZYYo%2BQgFUm0ugft%2FJuAI1WJiHKQxGgSS9GjXH%2F5tQh4UfJiPuE8Hcgfedhg26Qhd27rKd6D9x3WM70z13IMd2A0rrDKHBIRT5tde7fKmbSBm%2F6j%2FeWNJ9TOTvhe68qziYhbix9LzOmiv7QontF2k%2B4I868I5%2F9j%2FqXON8FB5FgbKIf840myuSW69omZQf57peqXI6fI0G3CWteViTiF4IxfBffsSyXsDCFr%2Bfn4tkuEM0ElBQ4fdWj99gQrSdQz0%2Fg1fQ1CWsoG0IxWQS2yK%2FkXUQ1cya%2BDuGJUfwQrS3gVT8h5l1FhO3w3apQADf%2F5v9VjpbAtX3O9w9LtM3HYT3EBCaBEFfZZrLCmY%2F18AM26FCa90YgBMFoRS5YAhHHW%2B%2BVPF4G4gMVUAFXQzEa%2FdOUbXRAhGnbr3uNbr0rBXDCZ%2FZLDqKNCd1ONwsyck4uEl3nqk4QHFF5atJfv1wb3dxnzbuC7GSWJ5D%2BeiWx21zb%2FZC0XPvXOhMo65tMNKyoNvPOb%2B2KfhWrpouseQyEU13BGVBmYTIhIsmHbGaMCp%2Fc0uCdC7qUA6R0PmIzAPaCGPrpgFqLH%2B0KfHntu7Juc5dVz3ptwSlUoQ7bVNqeQai7Y%2Fpx0EGbcdOnJh9KSxAVALrTYeuZ%2BHS%2BpiSOXCKZJxHBVCJQHpXxif6AS8%2BMJauCtuztKEjZpIfB9vKzQVjTVtNT0zq0rwjI9mGSy6yUJdwiHPb6XWwN2t9iuBHojx4iIdtH3PSlu1DMLlNNONmWJUw%2FWpFaW9rEo2k14ERbXQFfZcBcl3cObRHw%2BkcjbTQRptlWu5Fqlq4v0JXmgR%2FVu%2BVU0eS3gKvn4I7FNfPdpyUbtCfxpUyqKmKrpmpA5s4j36l%2BsDo98nkQxG9k3RI92qpFZLYEwM9TBV%2FxpdidmaK5B2f7j7UadEngtWr1j%2BuDT7nn1FEfTqzl9FcccR%2FwNzhwc6DUgjhWMb6TymNF0borX0F0xtRPAtMoOm2O%2BVJCCQcfQSZda0BdAbErcn1YVo82I5pN%2BXcEj5dyongUXyk%2Bg7dnT0jT1nrsDYTG9nYkkq1E8VoQFGLoE7qBDMd6iIEATPP3tsklLwClUnqriYq9iwmlBWnRHMfpEsKJ1A%2BPT%2FvrZE7O0pJBsctI9MORxFXlLNQPpOaEcG4gotwk6EbZ276ZcoEr1D%2BzHBAGFQqgxDlM9Hf71DD3ezy4eABxtHTMzo0hd88O0cZC1ai1%2Bln4gHnuWLOLkuzlGlTeYvu1a3WhXT7lDpm1B5%2Fg6atZmOtaVF6n4m8rBEalsjaHC3jvVtFp4bbD77wSMgrLB1mMS1tsVp%2B3YwJ4E7ZVFicMn%2BpHosDoYO5kGzHrD3JGyalvGYQY0zklIHk8GwIOKmCFdzANWvHWf8%2BWsW7ThNkNZXNyP59GjSJTGxxdKCGyVhcc5QwDmcGS9AhRSHw588W16gAWARB6vAuTCVgrSn%2B2oQ5fFsL6SKy5KD2qzv6mRDJzCZWJSK4hnxNMJD069A%2FlitcoIebOVozMcL%2FaN7oaDgLHF7Cr9UNtnPMw9AdJa7Scdc29MjPWIPEykgH4w1iLPL9sOEO3VavL2Ibw6mJhVF9v0qBoxp9F3vEQhXtXk82rMRv1VuRlUukid4CPM9PodlOKv8PxCffXnJ42jH2IYsp11ImQyYzZwUcGd9AU7kfHyXOqjBhRwHGEsZCuwpRVBFCpw%2Bq7yx1gqSi2E92xJkZQufYiT7tfeXpvJoDvvP5lnePzO5Nr8XWj4kGbQBc1i%2BMUc0q6Y7XzyK3DIOCwVfgtCUKGLXyXVb53ON0HQvRZ1HKh2G94cs8pbbqXFcnpQ043kTGPrcGi0sjagnWyzScQAtNxfPxuUAvxVKuYC3pA7z9gEO0vF55BHXASpFNiUhCnPBbNKlIBGFEVt8XZ2lj241xGEXuP4A84kFubxHbL2p7o1HojhXJwh2KsYZ30Qps5w4QRMRDGUX3swgoJS3misSBZA7SXulv0qAjHnOnFz2z2ICdJVYRmW6NlWM1Ax84Btxx%2FATNL1%2BNfLjFfOIqsE5f4AxyM%2FL7RjHCyP45VJ6RJV7N6XSDpvjwrPEK5Q36L86VkE%2BRh7RaVpTwq3RzaejBei%2BvzMw9Wmvxo%2FhiYKig%2FjM4gdYneDZ6dPgGOeqJ7jLc29IKr2h5xDnvOuDuO6y0B74S1aAp3U0MJWfJshd9At58iJZwtFlh2lw7kglO3DTtlTZJGVkKl7uYcj%2BLp7n%2B3pyHhkJMPewhiKf54E98x57xcLgCBmPVJKgdSvJnYKZ2wuyNUQf%2B1tpbYZ2On9MJn2ukjjeD3YGlGJXCbSPKPuilP1%2Bu5s5lk3ZHkPmu%2B%2BI9allkjqp1AN9TbQ8gUl46aAgwVSr9s7IIJ0QtqEZKXIli%2BnwMru4w07oh%2B%2BThJpjnqhD8dbxuB2Qwuh1AqEqwF5jfTq6cObJX5o2wBw%2BPOdicQGpc41ymDCLgw2y2ObI%2FN8Qgs%2BGB7wnLuPjIZx73biaK2614TRi%2F2cMOITAoD0Gk43kYobVbAn5cYr9d8bp1aKa5KsrrpXKMB%2B9J0n%2FVJy0FsnFSYL8H%2BkyRPkmKUPnTe3y7r1GbLEmfLf4XZpkqtFKaM9CzmPYPBbSnsl0sS91F8E68ha%2Bto3vBEwF18gzqySHMWTniSkW6fZ%2FvTHBCeDOURCfhtrdS2R%2BO3fymb91zOuK2MOiG9PThSsVv3HLT4uyrGSouzOupNRB9kjyXy5CakkCF0Jk1IyeG4dLJlapgMrNBOKRGhyrU6YFyjJwOUlyrpgcCXwz%2BiTXP%2Fj7onvglYjHw%2BaImffKWZLolXHWaxfryJ6xiJxC85kDDJSmwT0RjHEMWW4E3dpkEaD327mi7Me7SoXULEBq52ffVyYpPa2Eq3aG6eOkQ%3D%3D",
                //     "method": "POST"
                // }).then(function (result) {
                //     dtavm.log('H5guard.sign:', result);
                //     process_.exit(0);
                // })
                return {length: 0}
            }
            
        }
    },
    getElementById: function getElementById() {
        dtavm.log('getElementById:', arguments);
        return {
            clientHeight: 58,
            clientWidth:27
        }
    },
    referrer:'',
    documentElement: proxy(documentElement, 'documentElement'),
    addEventListener: function addEventListener() { },
    onwheel: null,
    onmousewheel: null,
    oncopy: null,
    onpaste:null,
    cookie: '_lx_utm=utm_source%3DBaidu%26utm_medium%3Dorganic; _lxsdk_cuid=1984f260afcc8-0b8b31138953ef-1854352f-144000-1984f260afcc8; _lxsdk=1984f260afcc8-0b8b31138953ef-1854352f-144000-1984f260afcc8; _hc.v=a24c3ca1-4265-17df-0b9a-fbbe03342c12.1753674550; fspop=test; utm_source_rg=; WEBDFPID=3z8wyxu9wzx75v9vzyuu846uu609u35v8015u7373v597958980v8003-1753760955853-1753674554191QGAGMCKfd79fef3d01d5e9aadc18ccd4d0c95073768; logan_session_token=adipq9wii9icwl9semkd; qruuid=51d1b00a-8b1b-4e96-a2e2-246337fde601; _lxsdk_s=1984f876305-64e-983-440%7C%7C3'
    // cookie:'logan_session_token=y5f1fmszeqpwws0780d7; _lxsdk_cuid=196381de812c8-08fa311018d228-1854352f-144000-196381de812c8; _lxsdk=196381de812c8-08fa311018d228-1854352f-144000-196381de812c8; _hc.v=bffd29cb-0853-1738-9570-66d655457cf7.1744698209; WEBDFPID=5325316090vx57uz005vzu3y38y95609803618wvw7v97958zux95u5v-1744784609025-1744698206407WKUOSUIfd79fef3d01d5e9aadc18ccd4d0c95072111; qruuid=e8fb42e6-f2c0-4515-90da-d0f71a3abc77; _lxsdk_s=196381de814-0c6-dfc-742%7C%7C3'
};
setprotoof(['document', 'HTMLDocument', 'Document', 'Node', 'EventTarget'])
window.func_set_native(document.createEvent);
window.func_set_native(document.createElement);
window.func_set_native(document.addEventListener);

screen = {};
setprotoof(['screen', 'Screen', 'EventTarget'])

chrome = {
    app: {
        InstallState: { DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed' },
        RunningState: { CANNOT_RUN: 'cannot_run', READY_TO_RUN: 'ready_to_run', RUNNING: 'running' },
        getDetails:function(){},
        getIsInstalled:function(){},
        installState:function(){},
        isInstalled: false,
        runningState: function(){}
    },
    csi: function () { },
    loadTimes: function () { },
}
chrome.__proto__ = Object.prototype;

history = {};
history.__proto__ = History.prototype;

localStorage = {};
sessionStorage = {};
localStorage.__proto__ = Storage.prototype;
sessionStorage.__proto__ = Storage.prototype;

indexedDB = proxy({}, "indexedDB");
indexedDB.toString = function () { return "[object IDBFactory]"; };

openDatabase = function openDatabase() {
    dtavm.log('openDatabase:', arguments);
}
window.func_set_native(openDatabase);

AudioContext = function AudioContext() {
    return {
        sampleRate: "48000",
        destination: {
            maxChannelCount: 2,
            numberOfInputs: 1,
            numberOfOutputs: 0,
            channelCount: 2,
            channelCountMode: 'explicit',
            channelInterpretation: 'speakers'
        }
    }
};
window.func_set_native(AudioContext);

// Owl = proxy({
//     OWL: function () {
//         dtavm.log('OWL:',arguments)
//     },
// }, "Owl");
// Owl.OWL.addApi = function () {
//     dtavm.log('Owl.OWL.addApi:', arguments)
// }

window.innerWidth = 1536;
window.innerHeight = 715;
window.outerWidth = 1536;
window.outerHeight = 715;
window.opener = null;
window.screenLeft = 0;
window.screenTop = 0;
window.scrollX = 0;
window.scrollY = 0;
window.screenX = 0;
window.screenY = 0;
window.pageXOffset = 0;
window.pageYOffset = 0;
window.devicePixelRatio = 1.25;
window.length = 1;
window.closed = false;
window.name = '';
window.status = '';
window.origin = 'https://account.dianping.com';
window.onsearch = null;
window.isSecureContext = true;
window.Window = Window;

CustomElementRegistry = function CustomElementRegistry() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(CustomElementRegistry, null);
customElements = proxy({},'customElements');
CustomElementRegistry.__proto__ = CustomElementRegistry.prototype;

BarProp = function BarProp() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(BarProp, null);
locationbar = proxy({ visible: true }, 'locationbar');
menubar = proxy({ visible: true },'menubar');
personalbar = proxy({ visible: true }, 'personalbar');
scrollbars = proxy({ visible: true },'scrollbars');
statusbar = proxy({ visible: true },'statusbar');
toolbar = proxy({ visible: true }, 'toolbar');

VisualViewport = function VisualViewport(){throw new TypeError("Illegal constructor");};
visualViewport = proxy({
    height: 715.2000122070312,
    offsetLeft: 0,
    offsetTop: 0,
    onresize: null,
    onscroll: null,
    pageLeft: 0,
    pageTop: 0,
    scale: 1,
    width: 1519.199951171875,
},'visualViewport');
visualViewport.__proto__ = VisualViewport.prototype;

External = function External() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(External, null);
external = proxy({}, 'external');
external.__proto__ = External.prototype;

styleMedia = proxy({type: 'screen'}, 'styleMedia');;
styleMedia.toString = function toString() { return '[object StyleMedia]'; };

// 多层toString检测
const $toString = Function.prototype.toString;
Function.prototype.toString = function toString() {
    const t = $toString.call(this);
    const names = `function ${this.name}() { [native code] }`;
    if (new.target) {
        throw new TypeError("toString is not a constructor");
    };
    // 函数：压缩 JavaScript 代码
    if (typeof this === "function") {
        if (this.name === "toString") {
            return names;
        };
        if (t.includes("TypeError")) {
            return names;
        };
        return t;
    }
    return t;
};

stop = function stop() {
    dtavm.log("stop");
}
window.func_set_native(stop);
open = function open() {
    dtavm.log("open");
}
window.func_set_native(open);
alert = function alert() {
    dtavm.log("alert");
}
window.func_set_native(alert);
confirm = function confirm() {
    dtavm.log("confirm");
}
window.func_set_native(confirm);
prompt = function prompt() {
    dtavm.log("prompt");
}
window.func_set_native(prompt);
print = function print() {
    dtavm.log("print");
}
window.func_set_native(print);

requestAnimationFrame = function requestAnimationFrame() {
    dtavm.log('requestAnimationFrame')
}
window.func_set_native(requestAnimationFrame);
cancelAnimationFrame = function cancelAnimationFrame() {
    dtavm.log('cancelAnimationFrame')
}
window.func_set_native(cancelAnimationFrame);
captureEvents = function captureEvents() {
    dtavm.log('captureEvents')
}
window.func_set_native(captureEvents);

releaseEvents = function releaseEvents() {
    dtavm.log('releaseEvents')
}
window.func_set_native(releaseEvents);

requestIdleCallback = function requestIdleCallback() {
    dtavm.log('requestIdleCallback')
}
window.func_set_native(requestIdleCallback);
cancelIdleCallback = function cancelIdleCallback() {
    dtavm.log('cancelIdleCallback')
}
window.func_set_native(cancelIdleCallback);

getComputedStyle = function getComputedStyle() {
    dtavm.log('getComputedStyle')
}
window.func_set_native(getComputedStyle);
matchMedia = function matchMedia() {
    dtavm.log('matchMedia:', arguments)
    if (arguments[0] === '(color-gamut: rec2020)') {
        return {
            matches: false,
            media: "(color-gamut: rec2020)",
            onchange: null
        }
    }
    if (arguments[0] === '(color-gamut: p3)') {
        return {
            matches: false,
            media: "(color-gamut: p3)",
            onchange: null
        }
    }
    if (arguments[0] === '(color-gamut: srgb)') {
        return {
            matches: true,
            media: "(color-gamut: srgb)",
            onchange: null
        }
    }
}
window.func_set_native(matchMedia);
moveTo = function moveTo() {
    dtavm.log('moveTo')
}
window.func_set_native(moveTo);
moveBy = function moveBy() {
    dtavm.log('moveBy')
}
window.func_set_native(moveBy);
resizeTo = function resizeTo() {
    dtavm.log('resizeTo')
}
window.func_set_native(resizeTo);
resizeBy = function resizeBy() {
    dtavm.log('resizeBy')
}
window.func_set_native(resizeBy);
scroll = function scroll() {
    dtavm.log('scroll')
}
window.func_set_native(scroll);
scrollTo = function scrollTo() {
    dtavm.log('scrollTo')
}
window.func_set_native(scrollTo);
scrollBy = function scrollBy() {
    dtavm.log('scrollBy')
}
window.func_set_native(scrollBy);
getSelection = function getSelection() {
    dtavm.log('getSelection')
}
window.func_set_native(getSelection);
find = function find() {
    dtavm.log('find')
}
window.func_set_native(find);

createImageBitmap = function createImageBitmap() {
    dtavm.log('createImageBitmap')
}
window.func_set_native(createImageBitmap);
close = function close() {
    dtavm.log('close')
}
window.func_set_native(close);
focus = function focus() {
    dtavm.log('focus')
}
window.func_set_native(focus);
blur = function blur() {
    dtavm.log('blur')
}
window.func_set_native(blur);
postMessage = function postMessage() {
    dtavm.log('postMessage')
}
window.func_set_native(postMessage);
onappinstalled = null;
onbeforeinstallprompt = null;
onpointerrawupdate = null;
ondevicemotion = null;
ondeviceorientation = null;
ondeviceorientationabsolute = null;
onabort = null;
onblur = null;
oncancel = null;
oncanplay = null;
oncanplaythrough = null;
onchange = null;
onclick = null;
onclose = null;
oncontextmenu = null;
oncuechange = null;
ondblclick = null;
ondrag = null;
ondragend = null;
ondragenter = null;
ondragexit = null;
ondragleave = null;
ondragover = null;
ondragstart = null;
ondrop = null;
ondurationchange = null;
onemptied = null;
onended = null;
onerror = null;
onfocus = null;
onformdata = null;
oninput = null;
oninvalid = null;
onkeydown = null;
onkeypress = null;
onkeyup = null;
onload = null;
onloadeddata = null;
onloadedmetadata = null;
onloadstart = null;
onmousedown = null;
onmouseenter = null;
onmouseleave = null;
onmousemove = null;
onmouseout = null;
onmouseover = null;
onmouseup = null;
onmousewheel = null;
onpause = null;
onplay = null;
onplaying = null;
onprogress = null;
onratechange = null;
onreset = null;
onresize = null;
onscroll = null;
onseeked = null;
onseeking = null;
onselect = null;
onshow = null;
onsort = null;
onstalled = null;
onsubmit = null;
onsuspend = null;
ontimeupdate = null;
ontoggle = null;
onvolumechange = null;
onwaiting = null;
onwebkitanimationend = null;
onwebkitanimationiteration = null;
onwebkitanimationstart = null;
onwebkittransitionend = null;
onwheel = null;
onauxclick = null;
ongotpointercapture = null;
onlostpointercapture = null;
onpointerdown = null;
onpointermove = null;
onpointerup = null;
onpointercancel = null;
onpointerover = null;
onpointerout = null;
onpointerenter = null;
onpointerleave = null;
onselectstart = null;
onselectionchange = null;
onanimationend = null;
onanimationiteration = null;
onanimationstart = null;
ontransitionend = null;
onafterprint = null;
onbeforeprint = null;
onbeforeunload = null;
onhashchange = null;
onlanguagechange = null;
onmessage = null;
onmessageerror = null;
onoffline = null;
ononline = null;
onpagehide = null;
onpageshow = null;
onpopstate = null;
onrejectionhandled = null;
onstorage = null;
onunhandledrejection = null;
onunload = null;

DOMRectList = function DOMRectList() { }
window.func_set_native(DOMRectList)
RTCPeerConnectionIceEvent = function RTCPeerConnectionIceEvent() { }
window.func_set_native(RTCPeerConnectionIceEvent);
SVGGeometryElement = function SVGGeometryElement() { }
window.func_set_native(SVGGeometryElement)
ontransitioncancel = null;

function randoms(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomValues(buf) {
    var min = 0,
        max = 255;
    if (buf instanceof Uint16Array) {
        max = 65535;
    } else if (buf instanceof Uint32Array) {
        max = 4294967295;
    }
    for (var element in buf) {
        buf[element] = randoms(min, max);
    }
    return buf;
}

Crypto = function Crypto() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Crypto, null);
crypto = {
    getRandomValues:getRandomValues
};
crypto.__proto__ = Crypto.prototype;
window.func_set_native(crypto.getRandomValues);

SpeechSynthesis = function SpeechSynthesis() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(SpeechSynthesis, null);
speechSynthesis = proxy({
    onvoiceschanged: null,
    paused: false,
    pending: false,
    speaking: false,
},'speechSynthesis');
speechSynthesis.__proto__ = SpeechSynthesis.prototype;

TrustedTypePolicyFactory = function TrustedTypePolicyFactory() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(TrustedTypePolicyFactory, null);
trustedTypes = proxy({
    defaultPolicy:null
}, 'trustedTypes');
trustedTypes.__proto__ = TrustedTypePolicyFactory.prototype;

CacheStorage = function CacheStorage() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(CacheStorage, null);
caches = proxy({}, 'caches');
caches.__proto__ = CacheStorage.prototype;

Performance = function Performance() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Performance, null);
performance = {
    timing:{
        "connectStart": 1706541557492,
        "navigationStart": 1706541557491,
        "secureConnectionStart": 0,
        "fetchStart": 1706541557492,
        "domContentLoadedEventStart": 1706541557744,
        "responseStart": 1706541557640,
        "domInteractive": 1706541557744,
        "domainLookupEnd": 1706541557492,
        "responseEnd": 1706541557641,
        "redirectStart": 0,
        "requestStart": 1706541557502,
        "unloadEventEnd": 1706541557646,
        "unloadEventStart": 1706541557646,
        "domLoading": 1706541557648,
        "domComplete": 1706541558477,
        "domainLookupStart": 1706541557492,
        "loadEventStart": 1706541558477,
        "domContentLoadedEventEnd": 1706541557744,
        "loadEventEnd": 1706541558477,
        "redirectEnd": 0,
        "connectEnd": 1706541557492
    },
    memory:{
        jsHeapSizeLimit: 2172649472,
        totalJSHeapSize: 44881441,
        usedJSHeapSize: 41911065,
    },
    timeOrigin: 1744681023126.6,
    getEntries: function () {
        return [
            {
                "name": "https://account.dianping.com/pclogin?redir=https://m.dianping.com/dphome",
                "entryType": "navigation",
                "startTime": 0,
                "duration": 0,
                "initiatorType": "navigation",
                "deliveryType": "",
                "nextHopProtocol": "http/1.1",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 3.699999988079071,
                "domainLookupStart": 17.19999998807907,
                "domainLookupEnd": 17.19999998807907,
                "connectStart": 17.19999998807907,
                "secureConnectionStart": 44.40000003576279,
                "connectEnd": 76.5,
                "requestStart": 76.90000003576279,
                "responseStart": 116.40000003576279,
                "firstInterimResponseStart": 0,
                "responseEnd": 118.60000002384186,
                "transferSize": 6852,
                "encodedBodySize": 6552,
                "decodedBodySize": 20152,
                "responseStatus": 200,
                "serverTiming": [],
                "unloadEventStart": 125.80000001192093,
                "unloadEventEnd": 125.80000001192093,
                "domInteractive": 0,
                "domContentLoadedEventStart": 0,
                "domContentLoadedEventEnd": 0,
                "domComplete": 0,
                "loadEventStart": 0,
                "loadEventEnd": 0,
                "type": "reload",
                "redirectCount": 0,
                "activationStart": 0,
                "criticalCHRestart": 0
            },
            {
                "name": "visible",
                "entryType": "visibility-state",
                "startTime": 0,
                "duration": 0
            },
            {
                "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/css/index.css",
                "entryType": "resource",
                "startTime": 139.5,
                "duration": 72.60000002384186,
                "initiatorType": "link",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 139.5,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 212.10000002384186,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/css/pclogin/index.css",
                "entryType": "resource",
                "startTime": 140.30000001192093,
                "duration": 162.69999998807907,
                "initiatorType": "link",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 140.30000001192093,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 303,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/jsencrypt.min.js",
                "entryType": "resource",
                "startTime": 140.69999998807907,
                "duration": 196.20000004768372,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 140.69999998807907,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 336.9000000357628,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://s0.meituan.net/mxx/yoda/yoda.seed.js",
                "entryType": "resource",
                "startTime": 141.19999998807907,
                "duration": 14435.700000047684,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "h2",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 141.19999998807907,
                "domainLookupStart": 14543.100000023842,
                "domainLookupEnd": 14543.100000023842,
                "connectStart": 14543.100000023842,
                "secureConnectionStart": 14551,
                "connectEnd": 14564.100000023842,
                "requestStart": 14564.300000011921,
                "responseStart": 14573.5,
                "firstInterimResponseStart": 0,
                "responseEnd": 14576.900000035763,
                "transferSize": 21576,
                "encodedBodySize": 21276,
                "decodedBodySize": 21276,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://s3.meituan.net/v1/mss_eb9ea9cfff9840198c3ae909b17b4270/production/logan-websdk/logan_2.1.5.js",
                "entryType": "resource",
                "startTime": 141.30000001192093,
                "duration": 53,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 141.30000001192093,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 194.30000001192093,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 200,
                "serverTiming": []
            },
            {
                "name": "https://www.dpfile.com/app/owl/static/owl_1.9.3.js",
                "entryType": "resource",
                "startTime": 142.10000002384186,
                "duration": 59.30000001192093,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "http/1.1",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 142.10000002384186,
                "domainLookupStart": 173.9000000357628,
                "domainLookupEnd": 174.10000002384186,
                "connectStart": 174.10000002384186,
                "secureConnectionStart": 180.10000002384186,
                "connectEnd": 188.80000001192093,
                "requestStart": 188.9000000357628,
                "responseStart": 196.9000000357628,
                "firstInterimResponseStart": 0,
                "responseEnd": 201.4000000357628,
                "transferSize": 22226,
                "encodedBodySize": 21926,
                "decodedBodySize": 73856,
                "responseStatus": 200,
                "serverTiming": []
            },
            {
                "name": "https://appsec-mobile.meituan.com/h5guard/H5guard.js?v=1744695337887",
                "entryType": "resource",
                "startTime": 143,
                "duration": 516.6000000238419,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 143,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 659.6000000238419,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://p0.meituan.net/dppclogin/eb8b5352f99809d07449f3289e78beb417299.png",
                "entryType": "resource",
                "startTime": 143.5,
                "duration": 91.5,
                "initiatorType": "img",
                "deliveryType": "",
                "nextHopProtocol": "h2",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 143.5,
                "domainLookupStart": 143.5,
                "domainLookupEnd": 143.5,
                "connectStart": 143.5,
                "secureConnectionStart": 143.5,
                "connectEnd": 143.5,
                "requestStart": 209.5,
                "responseStart": 233.9000000357628,
                "firstInterimResponseStart": 0,
                "responseEnd": 235,
                "transferSize": 7452,
                "encodedBodySize": 7152,
                "decodedBodySize": 7152,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://p0.meituan.net/dppclogin/d8bf152b38388feed5920ebdda8005af3663.png",
                "entryType": "resource",
                "startTime": 144,
                "duration": 90.80000001192093,
                "initiatorType": "img",
                "deliveryType": "",
                "nextHopProtocol": "h2",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 144,
                "domainLookupStart": 174.80000001192093,
                "domainLookupEnd": 174.80000001192093,
                "connectStart": 174.80000001192093,
                "secureConnectionStart": 182.5,
                "connectEnd": 209.19999998807907,
                "requestStart": 209.30000001192093,
                "responseStart": 233.69999998807907,
                "firstInterimResponseStart": 0,
                "responseEnd": 234.80000001192093,
                "transferSize": 2808,
                "encodedBodySize": 2508,
                "decodedBodySize": 2508,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/react.js",
                "entryType": "resource",
                "startTime": 144.5,
                "duration": 4073.300000011921,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 144.5,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 4217.800000011921,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/react-dom.js",
                "entryType": "resource",
                "startTime": 144.69999998807907,
                "duration": 4211.600000023842,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 144.69999998807907,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 4356.300000011921,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 0,
                "serverTiming": []
            },
            {
                "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/index.js",
                "entryType": "resource",
                "startTime": 144.80000001192093,
                "duration": 14478.399999976158,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 144.80000001192093,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 14623.199999988079,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 200,
                "serverTiming": []
            },
            {
                "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/pclogin/index.js",
                "entryType": "resource",
                "startTime": 144.9000000357628,
                "duration": 14645.599999964237,
                "initiatorType": "script",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 144.9000000357628,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 14790.5,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 200,
                "serverTiming": []
            },
            {
                "name": "hidden",
                "entryType": "visibility-state",
                "startTime": 442.19999998807907,
                "duration": 0
            },
            {
                "name": "https://catfront.dianping.com/api/pv?v=1&sdk=1.9.3&webVersion=1.0.0&project=com.sankuai.dpaccountweb.maccount&pageurl=https%3A%2F%2Faccount.dianping.com%2Fpclogin&pageId=owl-ffb46ac9-a56b-0fa3-0f88-fcea-1744695351822&timestamp=1744695351833&region=&operator=&network=&container=&os=&unionid=",
                "entryType": "resource",
                "startTime": 14513.900000035763,
                "duration": 158.89999997615814,
                "initiatorType": "xmlhttprequest",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 14513.900000035763,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 14672.800000011921,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 200,
                "serverTiming": []
            },
            {
                "name": "https://portal-portm.meituan.com/horn/v1/modules/H5guard_BaseSec/prod?appKey=&dfpId=1744695351907CICIKCIfd79fef3d01d5e9aadc18ccd4d0c95071990&utm_medium=h5&ver=3.1.0&host=account.dianping.com&ref=account.dianping.com%2Fpclogin&i18n=CN",
                "entryType": "resource",
                "startTime": 14688.600000023842,
                "duration": 220.0999999642372,
                "initiatorType": "xmlhttprequest",
                "deliveryType": "",
                "nextHopProtocol": "",
                "renderBlockingStatus": "non-blocking",
                "workerStart": 0,
                "redirectStart": 0,
                "redirectEnd": 0,
                "fetchStart": 14688.600000023842,
                "domainLookupStart": 0,
                "domainLookupEnd": 0,
                "connectStart": 0,
                "secureConnectionStart": 0,
                "connectEnd": 0,
                "requestStart": 0,
                "responseStart": 0,
                "firstInterimResponseStart": 0,
                "responseEnd": 14908.699999988079,
                "transferSize": 0,
                "encodedBodySize": 0,
                "decodedBodySize": 0,
                "responseStatus": 200,
                "serverTiming": []
            },
            {
                "name": "visible",
                "entryType": "visibility-state",
                "startTime": 24283.19999998808,
                "duration": 0
            },
            {
                "name": "first-paint",
                "entryType": "paint",
                "startTime": 24338.80000001192,
                "duration": 0
            },
            {
                "name": "first-contentful-paint",
                "entryType": "paint",
                "startTime": 24338.80000001192,
                "duration": 0
            },
            {
                "name": "hidden",
                "entryType": "visibility-state",
                "startTime": 26002.30000001192,
                "duration": 0
            }
        ]
    },
    getEntriesByType: function () {
        dtavm.log('getEntriesByType:', arguments)
        if (arguments[0] === 'paint') {
            return [
                {
                    "name": "first-paint",
                    "entryType": "paint",
                    "startTime": 24338.80000001192,
                    "duration": 0
                },
                {
                    "name": "first-contentful-paint",
                    "entryType": "paint",
                    "startTime": 24338.80000001192,
                    "duration": 0
                }
            ]
        }
        if (arguments[0] === 'resource') {
            return [
                {
                    "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/css/index.css",
                    "entryType": "resource",
                    "startTime": 139.5,
                    "duration": 72.60000002384186,
                    "initiatorType": "link",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 139.5,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 212.10000002384186,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/css/pclogin/index.css",
                    "entryType": "resource",
                    "startTime": 140.30000001192093,
                    "duration": 162.69999998807907,
                    "initiatorType": "link",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 140.30000001192093,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 303,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/jsencrypt.min.js",
                    "entryType": "resource",
                    "startTime": 140.69999998807907,
                    "duration": 196.20000004768372,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 140.69999998807907,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 336.9000000357628,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://s0.meituan.net/mxx/yoda/yoda.seed.js",
                    "entryType": "resource",
                    "startTime": 141.19999998807907,
                    "duration": 14435.700000047684,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "h2",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 141.19999998807907,
                    "domainLookupStart": 14543.100000023842,
                    "domainLookupEnd": 14543.100000023842,
                    "connectStart": 14543.100000023842,
                    "secureConnectionStart": 14551,
                    "connectEnd": 14564.100000023842,
                    "requestStart": 14564.300000011921,
                    "responseStart": 14573.5,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 14576.900000035763,
                    "transferSize": 21576,
                    "encodedBodySize": 21276,
                    "decodedBodySize": 21276,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://s3.meituan.net/v1/mss_eb9ea9cfff9840198c3ae909b17b4270/production/logan-websdk/logan_2.1.5.js",
                    "entryType": "resource",
                    "startTime": 141.30000001192093,
                    "duration": 53,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 141.30000001192093,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 194.30000001192093,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 200,
                    "serverTiming": []
                },
                {
                    "name": "https://www.dpfile.com/app/owl/static/owl_1.9.3.js",
                    "entryType": "resource",
                    "startTime": 142.10000002384186,
                    "duration": 59.30000001192093,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "http/1.1",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 142.10000002384186,
                    "domainLookupStart": 173.9000000357628,
                    "domainLookupEnd": 174.10000002384186,
                    "connectStart": 174.10000002384186,
                    "secureConnectionStart": 180.10000002384186,
                    "connectEnd": 188.80000001192093,
                    "requestStart": 188.9000000357628,
                    "responseStart": 196.9000000357628,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 201.4000000357628,
                    "transferSize": 22226,
                    "encodedBodySize": 21926,
                    "decodedBodySize": 73856,
                    "responseStatus": 200,
                    "serverTiming": []
                },
                {
                    "name": "https://appsec-mobile.meituan.com/h5guard/H5guard.js?v=1744695337887",
                    "entryType": "resource",
                    "startTime": 143,
                    "duration": 516.6000000238419,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 143,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 659.6000000238419,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://p0.meituan.net/dppclogin/eb8b5352f99809d07449f3289e78beb417299.png",
                    "entryType": "resource",
                    "startTime": 143.5,
                    "duration": 91.5,
                    "initiatorType": "img",
                    "deliveryType": "",
                    "nextHopProtocol": "h2",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 143.5,
                    "domainLookupStart": 143.5,
                    "domainLookupEnd": 143.5,
                    "connectStart": 143.5,
                    "secureConnectionStart": 143.5,
                    "connectEnd": 143.5,
                    "requestStart": 209.5,
                    "responseStart": 233.9000000357628,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 235,
                    "transferSize": 7452,
                    "encodedBodySize": 7152,
                    "decodedBodySize": 7152,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://p0.meituan.net/dppclogin/d8bf152b38388feed5920ebdda8005af3663.png",
                    "entryType": "resource",
                    "startTime": 144,
                    "duration": 90.80000001192093,
                    "initiatorType": "img",
                    "deliveryType": "",
                    "nextHopProtocol": "h2",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 144,
                    "domainLookupStart": 174.80000001192093,
                    "domainLookupEnd": 174.80000001192093,
                    "connectStart": 174.80000001192093,
                    "secureConnectionStart": 182.5,
                    "connectEnd": 209.19999998807907,
                    "requestStart": 209.30000001192093,
                    "responseStart": 233.69999998807907,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 234.80000001192093,
                    "transferSize": 2808,
                    "encodedBodySize": 2508,
                    "decodedBodySize": 2508,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/react.js",
                    "entryType": "resource",
                    "startTime": 144.5,
                    "duration": 4073.300000011921,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 144.5,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 4217.800000011921,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/react-dom.js",
                    "entryType": "resource",
                    "startTime": 144.69999998807907,
                    "duration": 4211.600000023842,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 144.69999998807907,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 4356.300000011921,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 0,
                    "serverTiming": []
                },
                {
                    "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/index.js",
                    "entryType": "resource",
                    "startTime": 144.80000001192093,
                    "duration": 14478.399999976158,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 144.80000001192093,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 14623.199999988079,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 200,
                    "serverTiming": []
                },
                {
                    "name": "https://s3plus.sankuai.com/static-prod01/com.sankuai.dpaccountweb.maccount-files/c252062/js/pclogin/index.js",
                    "entryType": "resource",
                    "startTime": 144.9000000357628,
                    "duration": 14645.599999964237,
                    "initiatorType": "script",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 144.9000000357628,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 14790.5,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 200,
                    "serverTiming": []
                },
                {
                    "name": "https://catfront.dianping.com/api/pv?v=1&sdk=1.9.3&webVersion=1.0.0&project=com.sankuai.dpaccountweb.maccount&pageurl=https%3A%2F%2Faccount.dianping.com%2Fpclogin&pageId=owl-ffb46ac9-a56b-0fa3-0f88-fcea-1744695351822&timestamp=1744695351833&region=&operator=&network=&container=&os=&unionid=",
                    "entryType": "resource",
                    "startTime": 14513.900000035763,
                    "duration": 158.89999997615814,
                    "initiatorType": "xmlhttprequest",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 14513.900000035763,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 14672.800000011921,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 200,
                    "serverTiming": []
                },
                {
                    "name": "https://portal-portm.meituan.com/horn/v1/modules/H5guard_BaseSec/prod?appKey=&dfpId=1744695351907CICIKCIfd79fef3d01d5e9aadc18ccd4d0c95071990&utm_medium=h5&ver=3.1.0&host=account.dianping.com&ref=account.dianping.com%2Fpclogin&i18n=CN",
                    "entryType": "resource",
                    "startTime": 14688.600000023842,
                    "duration": 220.0999999642372,
                    "initiatorType": "xmlhttprequest",
                    "deliveryType": "",
                    "nextHopProtocol": "",
                    "renderBlockingStatus": "non-blocking",
                    "workerStart": 0,
                    "redirectStart": 0,
                    "redirectEnd": 0,
                    "fetchStart": 14688.600000023842,
                    "domainLookupStart": 0,
                    "domainLookupEnd": 0,
                    "connectStart": 0,
                    "secureConnectionStart": 0,
                    "connectEnd": 0,
                    "requestStart": 0,
                    "responseStart": 0,
                    "firstInterimResponseStart": 0,
                    "responseEnd": 14908.699999988079,
                    "transferSize": 0,
                    "encodedBodySize": 0,
                    "decodedBodySize": 0,
                    "responseStatus": 200,
                    "serverTiming": []
                }
            ]
        }
    }
};
performance.__proto__ = Performance.prototype;

OfflineAudioContext = function OfflineAudioContext() {
    dtavm.log('OfflineAudioContext')
    return proxy({
        destination: {},
        startRendering: function () { },
        createAnalyser: function () {
            dtavm.log('createAnalyser:', arguments);
            return proxy({
                connect: function () { }
            }, 'AnalyserNode');
        },
        createOscillator: function () {
            dtavm.log('createOscillator:', arguments);
            return proxy({
                connect: function () { },
                start: function () { },
                frequency: proxy({
                    value: 440, automationRate: 'a-rate', defaultValue: 440, minValue: -22050, maxValue: 22050,
                    setValueAtTime: function () {
                        return proxy({
                            value: 440, automationRate: 'a-rate', defaultValue: 440, minValue: -22050, maxValue: 22050
                        },'setValueAtTime')
                    },
                },'AudioParam')
            }, 'OscillatorNode');
        },
        createDynamicsCompressor: function () {
            dtavm.log('createDynamicsCompressor:', arguments);
            return proxy({
                threshold: {
                    value: -24, automationRate: 'k-rate', defaultValue: -24, minValue: -100, maxValue: 0,
                    setValueAtTime: function () {
                        return proxy({
                            value: 440, automationRate: 'a-rate', defaultValue: 440, minValue: -22050, maxValue: 22050
                        },'setValueAtTime')
                    }
                },
                knee: {
                    value: 30, automationRate: 'k-rate', defaultValue: 30, minValue: 0, maxValue: 40,
                    setValueAtTime: function () {
                        return proxy({
                            value: 440, automationRate: 'a-rate', defaultValue: 440, minValue: -22050, maxValue: 22050
                        },'setValueAtTime')
                    }
                },
                ratio: {
                    value: 12, automationRate: 'k-rate', defaultValue: 12, minValue: 1, maxValue: 20,
                    setValueAtTime: function () {
                        return proxy({
                            value: 440, automationRate: 'a-rate', defaultValue: 440, minValue: -22050, maxValue: 22050
                        },'setValueAtTime')
                    }
                },
                reduction: 0,
                attack: {
                    value: 0.003000000026077032, automationRate: 'k-rate', defaultValue: 0.003000000026077032, minValue: 0, maxValue: 1,
                    setValueAtTime: function () {
                        return proxy({
                            value: 440, automationRate: 'a-rate', defaultValue: 440, minValue: -22050, maxValue: 22050
                        },'setValueAtTime')
                    }
                },
                release: {
                    value: 0.25, automationRate: 'k-rate', defaultValue: 0.25, minValue: 0, maxValue: 1,
                    setValueAtTime: function () {
                        return proxy({
                            value: 440, automationRate: 'a-rate', defaultValue: 440, minValue: -22050, maxValue: 22050
                        },'setValueAtTime')
                    }
                },
                connect: function () { },
                
            }, 'DynamicsCompressorNode');
        },
        currentTime:0,
    }, 'OfflineAudioContext');
}
window.func_set_native(OfflineAudioContext);

PerformanceObserver = function PerformanceObserver() {
    // dtavm.log('PerformanceObserver:', arguments)
    return proxy({
        observe: function () { },
        disconnect: function () { }
    }, 'PerformanceObserver');
}

Object.getOwnPropertyDescriptor_ = Object.getOwnPropertyDescriptor;
Object.getOwnPropertyDescriptor = function (obj, prop) {
    var desc = Object.getOwnPropertyDescriptor_(obj, prop);
    // console.log('Object.getOwnPropertyDescriptor:', obj+'',prop);
    if (prop + '' === 'window') {
        return {
            configurable: false,
            enumerable: true,
            get: {window(){}}.window,
            set:undefined
        };
    }
    if (prop + '' === 'document') {
        return {
            configurable: false,
            enumerable: true,
            get: {document(){}}.document,
            set:undefined
        };
    }
    if (prop + '' === 'navigator') {
        return {
            configurable: false,
            enumerable: true,
            get: {navigator(){}}.navigator,
            set:undefined
        };
    }
    if (prop + '' === 'location') {
        return {
            configurable: false,
            enumerable: true,
            get: {location(){}}.location,
            set:{location(){}}.location
        };
    }
    if (obj+'' === '[object Window]' && prop + '' === 'undefined') {
        return {
            configurable: false,
            enumerable: false,
            value: undefined,
            writable:false
        };
    }
    if (obj+'' === '[object Navigator]' && prop + '' === 'undefined') {
        return undefined;
    }
    if (prop + '' === 'top') {
        return {
            configurable: false,
            enumerable: true,
            get: {top(){}}.top,
            set:undefined
        };
    }
    return desc;
}

DeviceMotionEvent = function DeviceMotionEvent() {
    
}
window.func_set_native(DeviceMotionEvent)

Object.key_ = Object.keys;
Object.keys = function (obj) {
    var keys = Object.key_(obj);
    if ('Window,Navigator,window,navigator' === keys + '') {
        obj['Window']['Object']['type'] = '[object Function]'
        obj['Navigator']['Object']['type'] = '[object Function]'
    }
    if ('parse,stringify,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,escape,unescape,atob,btoa' === keys + '') {
        obj['atob']['function'] = 'function atob() { [native code] }'
        obj['btoa']['function'] = 'function btoa() { [native code] }'
    }
    // dtavm.log('Object.keys:', obj);
    return keys;
}

matchMedia = function matchMedia() {
    dtavm.log('matchMedia:', arguments)
    if (arguments[0] === '(color-gamut: rec2020)') {
        return {
            matches: false,
            media: "(color-gamut: rec2020)",
            onchange: null
        }
    }
    if (arguments[0] === '(color-gamut: p3)') {
        return {
            matches: false,
            media: "(color-gamut: p3)",
            onchange: null
        }
    }
    if (arguments[0] === '(color-gamut: srgb)') {
        return {
            matches: true,
            media: "(color-gamut: srgb)",
            onchange: null
        }
    }
    if (arguments[0] === '(max-width:1536px) and (max-height:715px)') {
        return {
            matches: true,
            media: "(max-width:1536px) and (max-height:715px)",
            onchange: null
        }
    }
}
window.func_set_native(matchMedia);

setInterval = function setInterval() { };
setTimeout = function setTimeout() { };

window.all_data_params_cookies = JSON.parse(process_.argv.slice(2));

window = proxy(window, "window");
navigator = proxy(navigator, "navigator");
location = proxy(location, "location");
document = proxy(document, "document");
screen = proxy(screen, "screen");
history = proxy(history, "history");
localStorage = proxy(localStorage, "localStorage");
sessionStorage = proxy(sessionStorage, "sessionStorage");
crypto = proxy(crypto, "crypto");

!function() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "_Owl_"
      , a = window;
    a[e] || (a[e] = {
        isRunning: !1,
        isReady: !1,
        preTasks: [],
        dataSet: [],
        pageData: [],
        disableMutaObserver: !1,
        observer: null,
        use: function(e, t) {
            this.isReady && a.Owl && a.Owl[e](t),
            this.preTasks.push({
                api: e,
                data: [t]
            })
        },
        add: function(e) {
            this.dataSet.push(e)
        },
        run: function() {
            var t = this;
            if (!this.isRunning) {
                this.isRunning = !0;
                var e = a.onerror;
                a.onerror = function() {
                    this.isReady || this.add({
                        type: "jsError",
                        data: arguments
                    }),
                    e && e.apply(a, arguments)
                }
                .bind(this),
                (a.addEventListener || a.attachEvent)("error", function(e) {
                    t.isReady || t.add({
                        type: "resError",
                        data: [e]
                    })
                }, !0);
                var i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
                  , r = window.performance || window.WebKitPerformance;
                if (i && r) {
                    var n = -1
                      , s = window.navigator.userAgent;
                    if (-1 < s.indexOf("compatible") && -1 < s.indexOf("MSIE") ? (new RegExp("MSIE (\\d+\\.\\d+);").test(s),
                    n = parseFloat(RegExp.$1)) : -1 < s.indexOf("Trident") && -1 < s.indexOf("rv:11.0") && (n = 11),
                    -1 !== n && n <= 11)
                        return void (this.disableMutaObserver = !0);
                    try {
                        this.observer = new i(function(e) {
                            t.pageData.push({
                                mutations: e,
                                startTime: r.now()
                            })
                        }
                        ),
                        this.observer.observe(document, {
                            childList: !0,
                            subtree: !0
                        })
                    } catch (e) {
                        console.log("mutationObserver err")
                    }
                } else
                    this.disableMutaObserver = !0
            }
        }
    },
    a[e].run())
}();

require_('./owl.js');

Owl.start({
    project: 'com.sankuai.dpaccountweb.maccount',
    // 项目名
    devMode: false,
    // 数据上报环境，true - 线下，false - 线上
    webVersion: '1.0.0',
    // 应用版本号
    logan: {
        enable: true,
        Logan: proxy({
            log : function () { }
        }, "Logan"),
        reportTrigger: null
    }
});

require_('./c.js');

window.H5guard.init({});
window.H5guard.sign({
    "url": window.all_data_params_cookies.url,
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": window.all_data_params_cookies.data,
    "method": window.all_data_params_cookies.method
}).then(function (result) {
    dtavm._log(result.headers.mtgsig);
    process_.exit(0);
})
// window.H5guard.sign({
//     "url": "https://accountapi.dianping.com/mlogin/dp/api/v3/account/mobileloginapply?yodaReady=h5&csecplatform=4&csecversion=3.2.1",
//     "headers": {
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     "data": 'encryptMobile=JBCtIHMKHCem2MvShDYPrOu9qeFonZB83JP1QgMRHrfbwJiaBF4sG%2F1HUJArEkqkYEfDWENi42sJf3OLBhdDafaTRlONzVdHJzjfmT9jj0RtRghdEh29HtS9Q%2FvPP1GWVA0y2w97D0JASCruCDXfgIFOPTUycdBOqAPXSUkJ7Degby2FW151ogEBvzQQ60pfvDm2RheYPF%2FyRBTfMzPed6B3ylnvX6wcBxCFMX89QVvmV%2BNx%2FqCsW1XjY8rB%2BhyWjjW5%2Fm1Ot9zvbfndhvKqfPKtkLNRRr6F%2Bkd3wqHm9Gv8WzCcZw0eqC5iTCAWC9soKXwcyWS8e6fecx6lMrIJmg%3D%3D&countryCode=86&uuid=1984f260afcc8-0b8b31138953ef-1854352f-144000-1984f260afcc8&cx=cxcxcx&platform=1&app=216&partner=26&risk_platform=1&risk_app=216&risk_partner=26&siteType=PC&h5_fingerprint=H5dfp_3.2.1_tttt_hOUyiYQuaq%2Fh6uH%2FghKNjkM8E4vLwBWReZw9RfywJQfQbmSWbzPpvBGdsRiwMllUJqya1qGKT7CfX1vIvreWOKZRqYjT5wS1blZ828zscY0%2BJYp3HugA77%2Ff7CLj0V0dG8CGm3MCp1R%2BCKwQvoJ2Pgq19iDoJSmev8fE8wQ3DXBczsgZD0ZWUrYzqZepBcEHC%2F5bU13rdCQPPJ7WRBVrHN%2F6qTrORzcVp%2FpWt7R5N6aMaIuHN27LT1Dali71%2BonirJc9Jh3%2BF9U%2FXHzqFHfXD2iOSzdg4BpvtOgm7%2F4KpQs68oXyXUKl5wK5Cvcl0YdGRPyG5sMFfrH89MhB4InSEVOD%2BAkX2IL9Ng5Kj9aF7hQvWg%2BiS13EkXY5WkRHuYbGNz2fxsrWRTKTnbnsxjvsnwN4%2BbgpybWV0dQ%2FJMVrsChM9AModLUZXDnSpVOr0%2BgPc6f9RfY94Pa0%2B04%2FWAPWvf0zy%2Bwl7QaUoicQ5cnKiUbMmVe7a%2BAqH5HeGI2J52JITbJYSdMUwonZSlQSmXjXWpf7vK%2Fh9hW1tJO9IC5fjhrAl%2BOhAZT3Wu78uGlMHLlHw7XgxHut33TLFdZ%2FwatVw22JV46Wp7Rmp%2BKQWQtN7%2Bg8wD4%2BqfynWXomgMiGawHKtiaV7qD5V5GsdrVsUJbASv1sMZRJWWxOd0d16CCcnfT6XMN2hbCckktyDWawrXEmpiz6ZwZY%2BGaKWLzVhlt5QRhA5OgM2vrjrzCXl%2FXsk8wkDfCJJsZphvdBm%2FAQyrPt3vagMWUoY0VOeHj687ZEvDIgrA3s5fHKXnVnLyNgpMjZycXONaFXiieu0Wvrh0cgvZlmvEPjv0HmFIj4TT7vmb5BO%2F913NIgoMe%2FXZVyQ3JF7XxHsxVoOCUm5hVF%2F7%2BCW2vogx2LA4Q%2FVvYaszixNDqKN0Q8SampMaJRUXookfyxZXYvRwHgmEeDrRVhpWTMCSQPvwGubicSBrIVkUqS2ia2uiE%2FkqZ%2BiNgIe9WHnp7HsJ8SiJkOJWfQnFEy2P9uxVlywURCxHxRXVuq7Sf6%2Bi2dj%2BwcRdbo2bD0H8UX8lc4B%2FmrxonAQ3gNU%2B%2B4yCDe2aXi2nKCnzotDX2fb9oFAjfRXVxpn1%2BLAi8vwN%2FO2plnqiAJ2CQVObzXEDb787dZOaB2ULmF10tKvQo4%2BjpqDCFvcA1IJY00WTdwuAqyEwYG%2BaK66Ah2QkpRgWhRBFOippDakT4b712HwhocJPTo8b49CZnxD9sqjVnH%2BgexSr2ftF40MqFF0any2D8ehMlxDH0F%2FE1gGvKys3xtNtOUIvFL4b%2FZyBhGrkgMUQnTuxrds%2F7O0z1wB09RsnF0zhtXRD7Wz%2F%2BCre2IpbSBCulZqvnYMPGTnp0uKxSfTn5k3siV5RHCQGR5kc%2FasrgGkNYSBydlz3iaA7Xp31650DSzDyI%2BW0guGu9tqZSriCqcR2ZjKqxldBQ59XEs3CRLrwuLb%2FcW2Z86h13jv1m1USW6wnLAiUK1CRHTgn7WxMMuvFs8k2mAjvsdads8PuWRH0ZPUBthPrBqbvC9a74dJErGMz7SoFUK746WgHXzn45Z1vs%2FfTggfI8cSVdbnUbZ0xlIgm%2B3wxwlWCnb5IeB8Zv327niXIaysPQA5QnUNa3%2B0%2Bm4mehbd%2BfRRKq2N1ttj1Jx6KdAakm4qJB39mCgiJG3UnWbnQq0zrjJwUCRJGkVN5P9IaAyVbsGDFVSZOHAJhAvMhsc5iz3u628rlMYY%2Fx5%2F9BM22u8dbT%2FqX8xbGYII5SayXINxe2n3%2FgS6Rw1%2FKQvMAUlTv1gdJn9DyPPFEY%2BtLXsSo8rsw9Pj6%2BuM0A5v3PcbKuTyHK%2FsF3npgs%2FvCTfqCnxUenokVbnN0QNBlIAEMDbzvi5EhFO0ity%2Bui0UKMAuwBDp2EDRFfBGADQ6f8%2BubkJDZAZJSN%2BHBHWvbHUa2YgJUbk%2BlIvzOlfoDFhNaeAKF1tXFzjl%2FMCPBdqQTmg%2Bel6utWljG7Wa2Y4WFdMlOht6VT0c9gVNvc7hRR0FCjbgPQl8dr0%2BJHHprlb7VqNxYy5%2FAZRchX6TwAFE2jTlUfGybmKTqscmWDuxIxYwKosPRIIKPT3SCgGjYc7DYEfq7t629reaUJWALEqYbw962l%2FmEEu3XQPlzVftWvbWrP0Dz5Ca3PlzzAMpicxqDHENsqez3EZPzfkVgdkGg2SRFzkPmDQorCI7gW%2FMXSZ0kztzbLzdKtAHzsYKU5jkM4ArAV199tLmeYW%2BSqOaAiG7U9wrhCWAb0iO6YjWvb9sg8eQhX0FvcjqKfXZRwNshJMtxIIiAWqm4MP2WKntL0IbnY4mC1%2FBhgC9gpV1vCv3uRD8W9x26hZW7PIunhhaPQ8D5qPo84JQ0v5FCLZ35L68E0BAWu5EjVtMJh1EYMo%2BxC%2BC1JdrOXn7nKcyOnXNpqiQvZNbRSFjNC2nm%2BE%2BsHj0QfOlO4MIj88otX1U4q8lASrNr4LAx5xtv%2FnykJ6D1HmO3%2FGwUH2q%2B37i%2BjyudIARLbnOP0uRz791tZcqH16JT%2FYRIzvDBnFrXb8zZOKW4gD6DoE5OAAVFiMNqS69S%2BVbGveC%2BQpJfP%2BLBRBQeChwzBRfUap1M7yYz1pc0YuyboYD5ZrRoQtXpDQ9G18DGFMIrBV9YsSp27ReHzbh4iKtxAO%2BtJXDYJMcwfzet0%2FikW4vwpM1KbhYaOyV%2FrChzDo%2FFAYRVbPSYHkXvujzJ78yYY9k5iwAuiDHiw0gO84L7ww6MC6Ad1cArh%2FtOrHLA3O4MeH3kryvTLWYpn2ShdYLMasYYjIf6H9jk31SBrFZvA16BpvGMTyhFaltXsUr%2BtTfwMemkNQhFmGY%2B0Hmwn73bEtVdPRxX5udBplfAYRf3wRM8W9%2FCBSTQp5y1Oj2l8vHlIU2PLyng7MLS7lChxsUsQsURyEG9%2Fxo3v28ZOsNexNw6HieQf8cbYh479JVqp2mORv4I%2BuHZNfPDhBE7Pd1o90RsU7fF%2Fp8hmWWdvb1kXYrvGBgmQrmUZd0aQLnIeo1rG53NTgRFhdWvAZQRarVugL25%2BAW6p9hES51rWml1EK%2B%2Bb175Em6JP0XyK9jz5JIO7zDC8T%2BHkjGGZ7ZG7770PjxBdludusSLF5%2BtgRvimiEckBgvRjFznB6Y08m5oe82fRm7r4gsiQjr%2FUas9adsGW0dmgIUg82Ox51ys%2FAG9nCANhM6uJZqFuNYfN86jq6UllYm9peOMLYFhAsJ%2B0cX2zk6kIZ2dTWaU0NvUeRCSwB7SkQYbabJ8Umnb6ALblzAXPiVZXZx4Fo%2Fic2B8SALwDXJrStlXHPRP33%2BK1oU9znAkzxBkGvoin0oQ5HGydD2X%2B3FwPg80QZQ%2F3aCeekeDY1WZF9rZHtsRswmriXbtonfkfjqQx5yPLr2zjZt9s5An2JrDYwRKQxfxlFtbcTiQo9jPV1caHo7GfurvQp5SO7CYSZu2%2BS2%2B%2FdFGTdvdiRJKLC2lN42iJY6YiNQ1nvcjm96OkaE8X08rSlsdYO%2FJD5geCIEhiiwlar%2BMCmL5TKHdgFA0bg4VT0wtGw5dyefFod2PVGULzmr4v5Kt8F5N62mjaw5Arc4doJDVirafQYENKn%2BRuOnhH9aHr6fpH0MnHi%2BQaJOiuGAlOjeCyM3Oi2bUzUqbp2fA%2BToKi4JMR0rGXpGjLcNBzJYBJksuGyd5nV6H2dToOjrcCqo%2ByEoQBzvKlZ9xKnnIKZzsRke2OtPZ%2B7%2BXqXxWRSJNlZAEDJOP7t0m78RSaK7wiAxMpV94m%2F7Zg0qmF0ZZWPYAfZbv%2Fk2pWeD0qSfHcfMYDqMWd0yMy88C%2Bjameu0iFU37as0ebrblhB8tpaFxsBlUrxn1sOG4khZaU%2FHlgffJXrTQ40ZkWtT3W9a1132FDDGxw%2BfuY4bo0toRnrFoTkto3MsJeBpVQ33VYcKmF4zJdpI%2B0xsLae4LtO%2BaytTz0DqkMscqJvhMpHfnzNpL5u29n1%2BtWbqGBPYoBtTnaGoaVz8RocwzN9bBtcDZIgn1cGlyrZfDdOD2wZlnWdUYV7bW3hl4dq2yLWahb%2FWIOCFRzBmW55ECAPB9XY2AfZzp96zk%2BiTL7jDazlub26h9ueDhJm1XzA9qguIyUEtAYblnSR4T5XyH2OPDjb67SBCR7b4Kh%2FFuqBzD8QHIp5I91GaTrKzupwNwJk%2BwC50QKC00orivRHw57Hebv1C8mCP6EGp6oPK%2BObfZ1WVF2vv5D8tXDLE8K46uG3IeajYIZSAA5INbjCdGnaZi0wLyfQ1rTFYqrdazfCBG16GCfeRkyK3pU%2Bj%2Bhy6i%2FcSHp9lNFoRbj4PuxlpmN%2FyQZCSfXUuci87UZFrg61GHmJ4NbB%2B9MZj8tkwgsG9Tu1hkLpFQqHJQ1%2BkpmbKJprzv4G4JQNYUgBDvuRpisQyAy2b%2BtA2PZXPoirDoWsygakTHjE3MVtabhOh88fDC7LpsWXQxwE%2BA%2B6FiUgySkRJkMixAXSOPkNx2DkFPl6G844uAQV4ihyi8mwmiB9XWl%2BQebt30vAdjXwtdF6TAvstRhLGrwgGGZbRv9m1cEAAQy7vWwXyLLqvCZRVDyidxL3xy%2B23XFF6JGr%2FGa1ObHqyglEBcvEYUsYDQCiIvp0DDQPE29CVWTFfwtLkMmSn7ojRM0SL%2BbHxLepEeqFfMlfUc3dr5XTSU6LzrBFOFS8a2h7godb9zirvJZ6IRFM83MkFx9FUiJEc1AcSEISpIgxps5sheTBaTLJITtC5LcEq2DdWaMRcYfI7C83a9YfZnAIinH4KFGcx0DeJiLUWv8IAhVsKLyxaBWrIt12DQB6%2FDowoFSIjNMoeDHolZQDS1NQ5xQeRg5BM4FIFxPAz%2BmD7g3kuaVuZAnN%2FUZ%2BYotxk%2Fzvyi1k8JiffGKdHhZ5D05MDNctPrNJj2Tc8AsVKzEwawYBf%2B0UzYNUnUyZv4j1LJRNPaM2C%2BzuScW%2B5GfsEjCI5kxhD2t4WmTjfDmEyi8E4IrzQTqRdrU395CDgrpgN6clLEGG1CslOgHh6H7prWFRJsW%2BCuRN%2BiXkxO2usbz',
//     "method": "POST"
// }).then(function (result) {
//     dtavm._log(result.headers.mtgsig);
//     process_.exit(0);
// })