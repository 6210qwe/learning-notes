process_ = process;
require_ = require;
// delete Buffer;
delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
delete global;
// delete clearImmediate;
// delete setImmediate;

const v8 = require_('v8');
const vm=require_('vm');
v8.setFlagsFromString('--allow-natives-syntax');
let undetectable = vm.runInThisContext("%GetUndetectable()");
v8.setFlagsFromString('--no-allow-natives-syntax');

dtavm = {
    // log : console.log,
    log: function () { },
    _log : console.log
}

set_print = ['wang','qc_dict','all_func'];
no_print = ['window', 'globalThis','wang','self','qc_dict','all_func'];
setProxyArr = function setProxyArr(proxyObjArr) {
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
        if(set_print.includes(property)){
            return Reflect.set(...arguments);
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
createTagProto = function createTagProto(propObj,portotypeObj) {
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

window = globalThis;
window.__proto__ = Window.prototype;
window.__proto__.__proto__ = WindowProperties.prototype;
window.__proto__.__proto__.__proto__ = EventTarget.prototype;

Window.__proto__ = EventTarget;

Object.defineProperty(window, 'WindowProperties', {
    get: function () {
        return undefined;
    }
})

top = window.top = window;
self = window.self = window;
parent = window.parent = window;
frames = window.frames = window;
global = window.global = window;

createTagProto('PromiseRejectionEvent');
createTagProto('MutationObserver');
createTagProto('CSSStyleDeclaration');
createTagProto('CSSRuleList');
createTagProto('DOMRectList');
createTagProto('DOMStringList');
createTagProto('DataTransferItemList');
createTagProto('FileList');
createTagProto('HTMLCollection');
createTagProto('HTMLFormElement');
createTagProto('HTMLSelectElement');
createTagProto('MediaList');
createTagProto('MimeTypeArray');
createTagProto('NamedNodeMap');
createTagProto('NodeList');
createTagProto('SVGLengthList');
createTagProto('SVGNumberList');
createTagProto('SVGPointList');
createTagProto('SVGStringList');
createTagProto('SVGTransformList');
createTagProto('SourceBufferList');
createTagProto('StyleSheetList');
createTagProto('TextTrackCueList');
createTagProto('TextTrackList');
createTagProto('TouchList');
createTagProto('HTMLAllCollection');
createTagProto('DOMTokenList');
DOMTokenList.prototype[Symbol.iterator] = function values() {
    dtavm.log('DOMTokenList.prototype[Symbol.iterator]::',arguments)
}
DOMTokenList.prototype[Symbol.iterator].toString = function toString() {
    return 'function values() { [native code] }'
}
DOMTokenList.prototype.values = function values() {
    dtavm.log("values:", arguments);
}
DOMTokenList.prototype.keys = function keys() {
    dtavm.log("keys:", arguments);
}
DOMTokenList.prototype.entries = function entries() {
    dtavm.log("entries:", arguments);
}
DOMTokenList.prototype.forEach = function forEach() {
    dtavm.log("forEach:", arguments);
}
window.func_set_native(DOMTokenList.prototype.values);
window.func_set_native(DOMTokenList.prototype.keys);
window.func_set_native(DOMTokenList.prototype.entries);
window.func_set_native(DOMTokenList.prototype.forEach);

createTagProto('Location');
location = {
    "ancestorOrigins": {},
    "href": "https://passport.didichuxing.com/common/pc-login/v3/index.html#/",
    "origin": "https://passport.didichuxing.com",
    "protocol": "https:",
    "host": "passport.didichuxing.com",
    "hostname": "passport.didichuxing.com",
    "port": "",
    "pathname": "/common/pc-login/v3/index.html",
    "search": "",
    "hash": "#/"
};

location.__proto__ = Location.prototype;
location.toString = function toString() {
    return this.href;
}

createTagProto('HTMLHtmlElement');
documentElement = {};
documentElement.__proto__ = HTMLHtmlElement.prototype;

all = undetectable;
all.__proto__ = HTMLAllCollection.prototype;
all.__proto__.__proto__ = Object.prototype;
all.length = 94;


createTagProto('HTMLCanvasElement',['getContext', 'toDataURL']);
createTagProto('CSSStyleDeclaration');
canvas_style = {};
canvas_style.__proto__ = CSSStyleDeclaration.prototype;
canvas = {
    tagName: 'CANVAS',
    style: canvas_style,
    getContext: function getContext() {
        dtavm.log('canvas.getContext:', arguments);
        // if (arguments[0] === '2d') {
        //     return two2d
        // }
        // if (arguments[0] === 'webgl') {
        //     return webgl
        // }
    },
    toDataURL: function toDataURL() {
        debugger;
        return  'data:image/png;base64,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'
    }
};
canvas.__proto__ = HTMLCanvasElement.prototype;
window.func_set_native(canvas.getContext);
window.func_set_native(canvas.toDataURL);

createTagProto('HTMLAnchorElement',['setAttribute']);
createA = {
    setAttribute: function setAttribute() {
        this[arguments[0]] = arguments[1];
    },
    "href": "https://passport.didichuxing.com/common/pc-login/v3/index.html#/",
    "protocol": "https",
    "host": "passport.didichuxing.com",
    "search": "",
    "hash": "/",
    "hostname": "passport.didichuxing.com",
    "port": "",
    "pathname": "/common/pc-login/v3/index.html",
    dispatchEvent: function dispatchEvent() {
        dtavm.log('createA.dispatchEvent:', arguments)
    }
};
createA.__proto__ = HTMLAnchorElement.prototype;

createTagProto('HTMLFormElement');
createTagProto('NodeList');
form = {}
__hexl__ = [form]
form.__proto__ = HTMLFormElement.prototype;
__hexl__.__proto__ = NodeList.prototype;

ctfrom = {};
ctfrom.__proto__ = HTMLFormElement.prototype;

createTagProto('HTMLBodyElement');
body = {
    appendChild: function appendChild() {
        dtavm.log('body.appendChild:', arguments)
    },
    removeChild: function removeChild() {
        dtavm.log('body.removeChild:', arguments)
    }
};
body.__proto__ = HTMLBodyElement.prototype;

createTagProto('HTMLDocument');
createTagProto('Document', ['createElement', 'createEvent', 'querySelectorAll']);
Document.prototype.all = all;
createTagProto('Node');
document = {
    body:body,
    createElement: function createElement() {
        dtavm.log('createElement::', arguments)
        if (arguments[0] === 'canvas') {
            return canvas
        }
        if (arguments[0] === 'a') {
            debugger
            return createA
        }
        if (arguments[0] === 'form') {
            return ctfrom
        }
    },
    documentElement: documentElement,
    createEvent: function createEvent() {
        dtavm.log('createEvent::',arguments)
    },
    querySelectorAll: function querySelectorAll() {
        dtavm.log('querySelectorAll::', arguments)
        if (arguments[0] === 'body form#__hexl__') {
            form.parentNode = document.body;
            return __hexl__;
        }
    }
};
window.func_set_native(document.createElement)
window.func_set_native(document.createEvent)
window.func_set_native(document.querySelectorAll)

document.__proto__ = HTMLDocument.prototype;
document.__proto__.__proto__ = Document.prototype;
document.__proto__.__proto__.__proto__ = Node.prototype;
document.__proto__.__proto__.__proto__.__proto__ = EventTarget.prototype;

HTMLDocument.__proto__ = Document;
HTMLDocument.__proto__.__proto__ = Node;
HTMLDocument.__proto__.__proto__.__proto__ = EventTarget;

Document.__proto__ = Node;
Document.__proto__.__proto__ = EventTarget;

Node.__proto__ = EventTarget;

createTagProto('MimeType');
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
plugins0.__proto__ = Plugin.prototype;
plugins0['0'].enabledPlugin = plugins0;
plugins0['1'].enabledPlugin = plugins0;
plugins0['0'].__proto__ = MimeType.prototype;
plugins0['1'].__proto__ = MimeType.prototype;
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
plugins1.__proto__ = Plugin.prototype;
plugins1['0'].enabledPlugin = plugins1;
plugins1['1'].enabledPlugin = plugins1;
plugins1['0'].__proto__ = MimeType.prototype;
plugins1['1'].__proto__ = MimeType.prototype;
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
plugins2.__proto__ = Plugin.prototype;
plugins2['0'].enabledPlugin = plugins2;
plugins2['1'].enabledPlugin = plugins2;
plugins2['0'].__proto__ = MimeType.prototype;
plugins2['1'].__proto__ = MimeType.prototype;
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
plugins3.__proto__ = Plugin.prototype;
plugins3['0'].enabledPlugin = plugins3;
plugins3['1'].enabledPlugin = plugins3;
plugins3['0'].__proto__ = MimeType.prototype;
plugins3['1'].__proto__ = MimeType.prototype;
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
plugins4.__proto__ = Plugin.prototype;
plugins4['0'].enabledPlugin = plugins4;
plugins4['1'].enabledPlugin = plugins4;
plugins4['0'].__proto__ = MimeType.prototype;
plugins4['1'].__proto__ = MimeType.prototype;
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
Navigator.prototype.permissions = function permissions() {
    dtavm.log('permissions:::', arguments)
};
window.func_set_native(Navigator.prototype.permissions)
Navigator.prototype.clipboard = function clipboard() {
    dtavm.log('clipboard:::', arguments)
}
window.func_set_native(Navigator.prototype.clipboard)

navigator = {};
navigator.__proto__ = Navigator.prototype;

createTagProto('Screen');
orientation= {angle: 0, type: 'landscape-primary', onchange: null}
Screen.prototype = Object.assign(Screen.prototype,{
    availWidth: 1536,
    availHeight: 824,
    availLeft: 0,
    availTop: 0,
    colorDepth: 24,
    width: 1536,
    height: 864,
    pixelDepth: 24,
    orientation:orientation
});
screen = {};
screen.__proto__ = Screen.prototype;

createTagProto('Storage');
local = {
    '40806488982be631':"233b11df3c699268b2e1307658f5ab19,85315f768a3d0352728b30414dc84c45,17529783667550.4048558110984404,baed3527"
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

createTagProto('History')
history = {};
history.__proto__ = History.prototype;

XMLHttpRequest_ = require_('xhr2');
XMLHttpRequest = function XMLHttpRequest() {
    debugger
    xhr = new XMLHttpRequest_;
    xhr.open_ = xhr.open;
    xhr.open = function open() {
        dtavm._log('xhr请求:', arguments)
        xhr.open_.apply(this,arguments)
    }
    xhr.send_ = xhr.send;
    xhr.send = function send() {
        dtavm._log('xhr发送:', arguments)
        this._url.protocol = 'https:'
        xhr.send_.apply(this,arguments)
    }
    xhr.setRequestHeader_ = xhr.setRequestHeader;
    xhr.setRequestHeader = function setRequestHeader() {
        dtavm._log('xhr设置请求头:', arguments)
        xhr.setRequestHeader_.apply(this,arguments)
    }
    return xhr;
}
window.func_set_native(XMLHttpRequest)

dispatchEvent = function dispatchEvent() {
    dtavm.log('dispatchEvent:::',arguments)
}
window.func_set_native(dispatchEvent)

window.crypto = require_('crypto');
window.crypto.toString = function toString() {
    return '[object Crypto]'
}

Omega = {
    trackEvent: function trackEvent() {
        dtavm._log('Omega.trackEvent:::',arguments)
    },
};

setTimeout_ = setTimeout;
setTimeout = function setTimeout() {
    dtavm.log('setTimeout:::', arguments)
    if (arguments[1] > 6000) {
        data = {
            body: {
                "q": "{\"domain\":\"https://epassport.diditaxi.com.cn\",\"source\":null,\"appid\":null,\"role\":null,\"api_version\":\"1.0.1\",\"lang\":\"zh-CN\",\"country_id\":156,\"auto_fill_phone\":true,\"password_encrypt_type\":0,\"app_version\":\"v3\",\"imei\":\"fe2d57d6629c54f21500eb99b05850fa\",\"cell\":\"158698541412\",\"country_calling_code\":\"+86\",\"wsgenv\":\"{\\\"sdkEncodeVersion\\\":\\\"100\\\",\\\"source\\\":\\\"4\\\",\\\"reportSource\\\":\\\"4\\\",\\\"data\\\":\\\"NDc1eGZHcVVGQ2RId1dpWXFGOXZOdFE0b000c2JPY09HNnRRVzBWRktaTWExaGQ2QTdqOUxwQXBPbm8ybWlyaHg5K0pSdlZHdlJJend6T25OeGx6M0FFUGZsNWFMbXB5SjRwYTRTb1huZzB4dWtvbkhSVGZ5dndlZjRoVjU0TXZUaVR3TDFMUEpjSEkwVUVxS0J4MUFaejM2Y08xTnpBWnV6eG5JSkdwSVE4PWUzZmI0NTk1MWNjNjM2ZmI4Y2MyYmUyM2E3NjhiMjU4ZDlkMGM3NzgxNDRjZjE1Y2UyODkyYmU1ODg3ZTMxYTUzYTkzMGFhNTZkODk5YzhjZjQyMDFmZGJmNWY5YmE5YjEzNzBjY2NiNjk3MTliZjA2ODc0MzE5M2JjYjc0ODJmYzA5OGJmNTlkNGNkMzQ0OWM3OGM3OTA3Yzg1ZDA2OGUxNzMyY2I2YWJiOTk1YmU3NDk3ZGZkMzIyOTMyZGNlYjBjNzQxZjE3YTJkNjQwYTMwZWJiOTI0NzExZTY2YzI3ZTY5NTBhY2M2NDQ3NGZiMWZkNWM2YTAyMTNhZjUwMDM4ZjBiOGEyYmI1N2FjYmI1NDc1ZTJjODc4NmNlMGRlNzMzYjYwNjMyNTAzMTA1ZDczNDU4Y2Y2ZmMxMmQ3NTIxNTkyYTIxMjE2ZmM4NWE0YzlkMTYzMzkyZTM0ZWU4YmIwMDBmZWY5MWM1ZjA1NWFiMGZiMTQwYjJhZDFmYWRhODE5OWU4OWYxYjBkNTJkZjk1OGU5ZjI4OTEyMTBlOGM1ODVmOTMzODEzNTZkYTVmZDk5ZGE1YmU5MzM5NTRmM2EwZDE3NjdiYjc0MzVkYWQwYWE3OTRhNDgxMzU1MWYyZTBlNDU3YzgwMDM0NDg3NjQxODU2OWYwZDBlN2NkMGZlNmNhZmZjYzdkNTkwYmU3ZDJiMGY5MzlkZTI3ODgwMjI0OGVhM2VhN2U5MDlhODYwMGIyZTcyNDQxYzVlMjI1MDU0NzUyNWFhZmM1M2UyY2U3ZGNhNGU4MDQwZGQ4MWNlM2UyNWUzZWEyMmU0MGU3NDNmMzgxYzE0Y2NhMWNmYWRiYTgwNTU5MTgzYjYzMjU3MjMwMWY5MDlmY2ViM2MxM2E4MmIxNmVjZWUxNGVjMDMyM2M0NTc0MDYzOGZkMGJkMjViZGI1NzM5YzU3NjdhZTFmZDg5ODBjYWRkZmM2MzQ2ODJiMGUzOWNmYTMzMGQ5ZGVhZjAwNjFkYjZhOWE2MjNjNDlkM2JjY2UyOGY3MWY1NzY1ZGY5YjkwNzY3YjUwMzM4OWEwZjM0MTVjYzZmMjRjZGI3MmY1NmI5YTU3ZDEyODAwMzA1NThjOGY2M2EzNzlhNmNkNmY2ZTU2NTIyYmI2MGU1MjI1ODg1ZGJmMjQzZWZkMTcwNzM2ZjM5MzJhOTQzMTVkMzE2Yzk2MWY5NTRhYzY1OTM2MWRjN2Y2MmY2YWZmZTAyNjAyMDM0YzdjZThiNDE1ZmFhYzUzY2MwYTdiMzBkMjUwZGVkZDY5MGZmMmI0ZmM0MTczMWE5YzEyOWM4NjBiZjZkYzk3OGY0N2M2NGI4ZTYwNzI1MmY0NGI3MjVmNTIzYmM1YWExMGQ0NmUwOGE0OTMyMjQ4MTc0MmFjNjJkMDY0ODQxNWI0M2IyZjIyNjJkNTljZDE0Y2YzYTBjMzg4YTg3MzZiMzAxYTRhZGNmYjUxZTUwYmI0N2FlNjUyNTFiY2RjYmRiYzFkYTliNTM1NWFhNmViMjk2NjM2ODI4MGRjOTFhNWNkZGVjOTY4NmI5NjY5OGM5MDdiYzgzNDZkMDRjM2M1N2MyYjA3YjMwZmZiZDAxM2NlOWY2ZWM4OWQ1NzQ0YzM4OTFjN2QzMTBjNWQ2OGRiNjExM2NjZGYwYjNkODg5YmFmNjUzODBiMzNmM2ExYzNlOTdlODU1ZmU4NGQyZGM5YjJkNWM0YmYzMjUwZDgwZDU0NzQ3MGU2NmMzOGQxNTIyZWU4NTM2N2I2MzY2YjRkMGFhYQ==\\\"}\"}"
            },
            noDomainCheck: !0,
            signUpgrade: true,
            contentType: "application/x-www-form-urlencoded"
        }
        dtavm._log('wsgsig值:::', itc.a(data))
        process_.exit(0);
    } else {    
        arguments[0]();
    }
}

setProxyArr(['window', 'globalThis','global','ctfrom','Document.prototype','__hexl__','__hexl__[0]','document.body','Omega','canvas','createA','canvas.style','document.all','DOMTokenList.prototype','performance','document.documentElement','top', 'self', 'frames', 'parent', 'chrome', 'location', 'localStorage', 'sessionStorage', 'screen', 'document', 'navigator']);
//////////////////////////////////////////////////
require_('./dd05.js');
itc = window.wang("4bf1");
rtc = (window.wang("caad"), window.wang("7f3e"));

init = {
    "env": "CN",
    "bizId": "bb0f5863b0c070ead101f00930311cc8",
    "appId": "01051001",
    "os": "4",
    "appVer": "v3",
    "domainList": [
        "epassport.diditaxi.com.cn"
    ],
    "byQuery": true,
    "httpEnable": false
}
rtc.a(init);

