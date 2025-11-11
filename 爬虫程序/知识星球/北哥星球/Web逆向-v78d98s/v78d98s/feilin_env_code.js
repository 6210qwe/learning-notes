deviceConfig={'key': 'd6e736bcb74f0281', 'switch': 1, 'sessionId': 'ab034ec0643f91399eb33e062dc7fae1-h-1749534400590-ed10723b2eda4075b0bc347674541156', 'version': '1.2.0/feilin135.99588a50341893687210', 'pluginElements': '', 'pluginResource': '', 'globalVariable': '', 'timestamp': '1749534400592', 'ip': '39.170.28.69'};require_ = require;
process_ = process;
delete global;
delete Buffer;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
delete setImmediate;
delete clearImmediate;

const v8 = require_('v8');
const vm = require_('vm');
deasync = require('deasync')
v8.setFlagsFromString('--allow-natives-syntax');
let undetectable = vm.runInThisContext("%GetUndetectable()");
v8.setFlagsFromString('--no-allow-natives-syntax');
const CryptoJs = require_('crypto-js');

Object.defineProperties(globalThis, {
    [Symbol.toStringTag]: {
        configurable: true,
        value: 'Window'
    }
});

dtavm = {
    // log: console.log,
    log: function () {
    },
    _log: console.log
}
no_print = ['String', 'parseFloat', 'Array', 'Symbol', 'Object', 'Number', 'btoa', 'document', '__ALIYUN_CRYPT', 'navigator'];

function setProxyArr(proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        const handler = `{
      get: function(target, property, receiver) {
      if(property === 'window'){
            return target[property];
        }
        if(property === 'globalThis'){
            return target[property];
        }
        if(property === 'top'){
            return target[property];
        }
        if(property === 'self'){
            return target[property];
        }
            if("${proxyObjArr[i]}" === '__ALIYUN_CRYPT'){
            return target[property];
        }
        if(no_print.includes(property)){
            return target[property];
        }
        dtavm.log("方法:", "get  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]);
        return target[property];
      },
      set: function(target, property, value, receiver) {
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
function createTagProto(propObj, portotypeObj) {
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

createTagProto('EventTarget', ['addEventListener', 'removeEventListener']);
createTagProto('Window');
createTagProto('HTMLDocument', ['createElement', 'createEvent', 'addEventListener', 'appendChild', 'getElementsByTagName']);
createTagProto('Document', ['createElement', 'createEvent', 'addEventListener', 'getElementsByTagName', 'appendChild']);
createTagProto('Node');
createTagProto('Navigator');
createTagProto('HTMLHtmlElement', ['getAttribute']);
createTagProto('Element', ['getAttribute', 'getElementsByTagName', 'querySelectorAll', 'appendChild']);
createTagProto('HTMLScriptElement');

window = globalThis;
window.__proto__ = Window.prototype;

XMLHttpRequest_ = require_('xhr2');

self = window.self = window;
top = window.top = window;
parent = window.parent = window;
frames = window.frames = window;

innerWidth = 1536
innerHeight = 715
outerWidth = 1536
outerHeight = 824
screenX = 0
screenY = 0
pageYOffset = 0
pageXOffset = 0
devicePixelRatio = 1.25
isSecureContext = true
screenLeft = 0
screenTop = 0

sharedStorage = {};


img = {};
Image = function Image() {
    return img
}
Attr = function Attr() {
    debugger
}
CSSRule = function c() {
    debugger
}

addEventListener = function addEventListener() {
    dtavm.log("window.addEventListener::", arguments);
    if (arguments[0] === 'deviceorientation') {
        arguments[1]({
            alpha: null,
            beta: null,
            gamma: null,
        })
    }
}
window.func_set_native(addEventListener);

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
createTagProto('StorageManager', ['estimate']);
createTagProto('NavigatorUAData');
createTagProto('NetworkInformation', ['onchange']);

Promise2 = {
    then: function () {
        return this;
    },
    catch: function () {
    },
};
storage = {
    estimate: function estimate() {
        return Promise2
    },
};
storage.__proto__ = StorageManager.prototype;
window.func_set_native(storage.estimate);

createTagProto('Permissions', ['query']);
permissions = {
    query: function query() {
        return Promise2
    }
};
permissions.__proto__ = Permissions.prototype;
window.func_set_native(permissions.query);

createTagProto('Plugin');
createTagProto('PluginArray');
plugins0 = {
    name: 'PDF Viewer',
    filename: 'internal-pdf-viewer',
    description: 'Portable Document Format',
    length: 2,
    '0': {
        type: 'application/pdf',
    },
    '1': {
        type: 'text/pdf'
    }
}
plugins0['0'].enabledPlugin = plugins0;
plugins0['1'].enabledPlugin = plugins0;
plugins1 = {
    name: 'Chrome PDF Viewer',
    filename: 'internal-pdf-viewer',
    description: 'Portable Document Format',
    length: 2,
    '0': {
        type: 'application/pdf'
    },
    '1': {
        type: 'text/pdf'
    }
}
plugins1['0'].enabledPlugin = plugins1;
plugins1['1'].enabledPlugin = plugins1;
plugins2 = {
    name: 'Chromium PDF Viewer',
    filename: 'internal-pdf-viewer',
    description: 'Portable Document Format',
    length: 2,
    '0': {
        type: 'application/pdf'
    },
    '1': {
        type: 'text/pdf'
    }
}
plugins2['0'].enabledPlugin = plugins2;
plugins2['1'].enabledPlugin = plugins2;
plugins3 = {
    name: 'Microsoft Edge PDF Viewer',
    filename: 'internal-pdf-viewer',
    description: 'Portable Document Format',
    length: 2,
    '0': {
        type: 'application/pdf'
    },
    '1': {
        type: 'text/pdf'
    }
}
plugins3['0'].enabledPlugin = plugins3;
plugins3['1'].enabledPlugin = plugins3;
plugins4 = {
    name: 'WebKit built-in PDF',
    filename: 'internal-pdf-viewer',
    description: 'Portable Document Format',
    length: 2,
    '0': {
        type: 'application/pdf'
    },
    '1': {
        type: 'text/pdf'
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
    namedItem: function (name) {
        dtavm.log('Plugin-namedItem:', name)
    },
    item: function (index) {
        dtavm.log('Plugin-item:', index)
    },
    refresh: function () {
        dtavm.log('Plugin-refresh:', arguments)
    },
}
plugins.__proto__ = PluginArray.prototype;

createTagProto('MimeTypeArray');
mimeTypes = {
    '0': {type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format'},
    '1': {type: 'text/pdf', suffixes: 'pdf', description: 'Portable Document Format'},
    'application/pdf': {type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format'},
    'text/pdf': {type: 'text/pdf', suffixes: 'pdf', description: 'Portable Document Format'},
    'length': 2
}
mimeTypes[Symbol.iterator] = function* () {
    for (let key in this) {
        yield this[key];
    }
}
mimeTypes.__proto__ = MimeTypeArray.prototype;

createTagProto('NavigatorUAData');
userAgentData = {
    brands: [
        {brand: 'Not=A?Brand', version: '99'},
        {brand: 'Chromium', version: '118'}
    ],
    mobile: false, platform: 'Windows',
    getHighEntropyValues: function getHighEntropyValues() {
        return Promise2;
    }
};
userAgentData.__proto__ = NavigatorUAData.prototype;
Navigator.prototype = Object.assign(Navigator.prototype, {
    userAgentData: userAgentData,
    product: 'Gecko',
    productSub: "20030107",
    requestMediaKeySystemAccess: function requestMediaKeySystemAccess() {
        dtavm.log("requestMediaKeySystemAccess:", arguments);
    },
    storage: storage,
    vendorSub: '',
    vibrate: function vibrate() {
        dtavm.log("vibrate:", arguments);
    },
    webdriver: false,
    credentials: function credentials() {
        dtavm.log("credentials:", arguments);
    },
    appVersion: "5.0 (Windows)",
    permissions: permissions
});
window.func_set_native(Navigator.prototype.requestMediaKeySystemAccess);
window.func_set_native(Navigator.prototype.vibrate);
Navigator.prototype.platform = 'Win32';
Navigator.prototype.maxTouchPoints = 0;
Navigator.prototype.language = 'zh-CN';
Navigator.prototype.languages = ["zh-CN"];
Navigator.prototype.doNotTrack = null;
Navigator.prototype.deviceMemory = 8;
Navigator.prototype.bluetooth = {};
Navigator.prototype.mimeTypes = mimeTypes;
Navigator.prototype.bluetooth.__proto__ = Bluetooth.prototype;
Navigator.prototype.appName = 'Netscape';
Navigator.prototype.appCodeName = 'Mozilla';
Navigator.prototype.getBattery = function getBattery() {
    dtavm.log("getBattery", arguments);
    return Promise.resolve({
        __proto__: BatteryManager,
        // 动态参数配置（示例值）
        level: 0.99,
        charging: true,
        dischargingTime: 'Infinity' // 2小时放电时间
    })
};
window.func_set_native(Navigator.prototype.getBattery);
Navigator.prototype.hardwareConcurrency = 8;
Navigator.prototype.plugins = plugins;
Navigator.prototype.cookieEnabled = true;
Navigator.prototype.deprecatedRunAdAuctionEnforcesKAnonymity = false;
Navigator.prototype.vendor = '';
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36';
Navigator.prototype.getGamepads = function getGamepads() {
    dtavm.log("getGamepads", arguments);

};
window.func_set_native(Navigator.prototype.getGamepads);
createTagProto('MediaDevices');
Navigator.prototype.mediaDevices = {
    enumerateDevices: function enumerateDevices() {
        dtavm.log("enumerateDevices", arguments);
        return Promise2
    }
};
Navigator.prototype.mediaDevices.__proto__ = MediaDevices.prototype;
Navigator.prototype.registerProtocolHandler = function registerProtocolHandler() {
    dtavm.log("registerProtocolHandler", arguments);
};
window.func_set_native(Navigator.prototype.registerProtocolHandler);
Navigator.prototype.sendBeacon = function sendBeacon() {
    dtavm.log("sendBeacon", arguments);
};
window.func_set_native(Navigator.prototype.sendBeacon);
createTagProto('ServiceWorkerContainer');
Navigator.prototype.serviceWorker = {};
Navigator.prototype.serviceWorker.__proto__ = ServiceWorkerContainer.prototype;

createTagProto('DeprecatedStorageQuota');
Navigator.prototype.adAuctionComponents = function adAuctionComponents() {
    dtavm.log("adAuctionComponents", arguments);
};
Navigator.prototype.adAuctionComponents = function adAuctionComponents() {
    dtavm.log("adAuctionComponents", arguments);
};
Navigator.prototype.runAdAuction = function runAdAuction() {
    dtavm.log("runAdAuction", arguments);
};
Navigator.prototype.canLoadAdAuctionFencedFrame = function canLoadAdAuctionFencedFrame() {
    dtavm.log("canLoadAdAuctionFencedFrame", arguments);
};
Navigator.prototype.deprecatedReplaceInURN = function deprecatedReplaceInURN() {
    dtavm.log("deprecatedReplaceInURN", arguments);
};
Navigator.prototype.deprecatedURNToURL = function deprecatedURNToURL() {
    dtavm.log("deprecatedURNToURL", arguments);
};
Navigator.prototype.joinAdInterestGroup = function joinAdInterestGroup() {
    dtavm.log("joinAdInterestGroup", arguments);
};
Navigator.prototype.leaveAdInterestGroup = function leaveAdInterestGroup() {
    dtavm.log("leaveAdInterestGroup", arguments);
};
;Navigator.prototype.updateAdInterestGroups = function updateAdInterestGroups() {
    dtavm.log("updateAdInterestGroups", arguments);
};
Navigator.prototype.webkitTemporaryStorage = {};
Navigator.prototype.webkitTemporaryStorage.__proto__ = DeprecatedStorageQuota.prototype;
Navigator.prototype.onLine = true;
Navigator.prototype.connection = {
    onchange: null, effectiveType: '4g', rtt: 50, downlink: 10, saveData: false
}

navigator = {};
navigator.__proto__ = Navigator.prototype;
clientInformation = navigator;
setProxyArr(['navigator.mediaDevices', 'navigator.serviceWorker', 'navigator.webkitTemporaryStorage', 'navigator.bluetooth'])

createTagProto('Location');
createTagProto('DOMStringList');
DOMStringListc = [];
DOMStringListc.__proto__ = DOMStringList.prototype;
location = {
    "ancestorOrigins": {},
    "href": "https://console.beeize.com/login",
    "origin": "https://console.beeize.com",
    "protocol": "https:",
    "host": "console.beeize.com",
    "hostname": "console.beeize.com",
    "port": "",
    "pathname": "/login",
    "search": "",
    "hash": ""
};
location.__proto__ = Location.prototype;
createTagProto('CSSStyleDeclaration');
createTagProto('HTMLAllCollection');
all = undetectable;
all.__proto__ = HTMLAllCollection.prototype;

de_style = {};
de_style.__proto__ = CSSStyleDeclaration.prototype;

documentElement = {
    style: de_style,
    clientHeight: 715,
    clientWidth: 1536,
};
documentElement.__proto__ = HTMLHtmlElement.prototype;

createTagProto('DOMTokenList');
DOMTokenList.prototype.values = function values() {
    dtavm.log("values:", arguments);
}
DOMTokenList.prototype.keys = function keys() {
    dtavm.log("keys:", arguments);
}
DOMTokenList.prototype.entries = function entries() {
    dtavm.log("entries:", arguments);
}
window.func_set_native(DOMTokenList.prototype.values);
window.func_set_native(DOMTokenList.prototype.keys);
window.func_set_native(DOMTokenList.prototype.entries);
span_classList = [];
span_classList.__proto__ = DOMTokenList.prototype;


createTagProto('HTMLSpanElement');
span = {
    classList: span_classList,
};
span.__proto__ = HTMLSpanElement.prototype;

createTagProto('HTMLIFrameElement');
iframe = {};
iframe.__proto__ = HTMLIFrameElement.prototype;

createTagProto('WebGLRenderingContext', ['getParameter', 'getExtension']);
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
    readPixels: function readPixels() {
    },
    getContextAttributes: function () {
        return {
            "alpha": true,
            "antialias": true,
            "depth": true,
            "desynchronized": false,
            "failIfMajorPerformanceCaveat": false,
            "powerPreference": "default",
            "premultipliedAlpha": true,
            "preserveDrawingBuffer": false,
            "stencil": false,
            "xrCompatible": false
        }
    },
    getExtension: function getExtension() {
        dtavm.log('getExtension:', arguments[0])
        if (arguments[0] === 'WEBGL_debug_renderer_info') {
            return {
                UNMASKED_RENDERER_WEBGL: 37446,
                UNMASKED_VENDOR_WEBGL: 37445
            }
        }
        if (arguments[0] === 'WEBGL_lose_context') {
            return {
                loseContext: function loseContext() {
                }
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
};
webgl.__proto__ = WebGLRenderingContext.prototype;
window.func_set_native(webgl.getExtension);
window.func_set_native(webgl.getParameter);

createTagProto('CanvasRenderingContext2D', ['rect', 'fillRect', 'fillText', 'beginPath', 'arc', 'closePath', 'fill', 'isPointInPath']);
two2d = {
    rect: function rect() {
    },
    fillRect: function fillRect() {
    },
    fillText: function fillText() {
    },
    beginPath: function beginPath() {
    },
    arc: function arc() {
    },
    closePath: function closePath() {
    },
    fill: function fill() {
    },
    isPointInPath: function isPointInPath() {
    }
};
two2d.__proto__ = CanvasRenderingContext2D.prototype;
window.func_set_native(two2d.rect);
window.func_set_native(two2d.fillRect);
window.func_set_native(two2d.fillText);
window.func_set_native(two2d.beginPath);
window.func_set_native(two2d.arc);
window.func_set_native(two2d.closePath);
window.func_set_native(two2d.fill);
window.func_set_native(two2d.isPointInPath);

createTagProto('HTMLCanvasElement');
canvas = {
    getContext: function getContext() {
        dtavm.log("canvas.getContext::", arguments);
        if (arguments[0] === 'webgl') {
            return webgl
        }
        if (arguments[0] === '2d') {
            return two2d
        }
    },
    toDataURL: function toDataURL() {
        return 'data:image/png;base64,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'
    },
    'width': 300,
    'height': 150
};
canvas.__proto__ = HTMLCanvasElement.prototype;
window.func_set_native(canvas.getContext);
window.func_set_native(canvas.toDataURL);

script = {
    setAttribute: function setAttribute() {
        dtavm.log("script.setAttribute::", arguments);
        this[arguments[0]] = arguments[1];
    }
};
script.__proto__ = HTMLScriptElement.prototype;

createTagProto('HTMLDivElement');
div = {
    style: de_style,
};
div.__proto__ = HTMLDivElement.prototype;

createTagProto('HTMLBodyElement');
body = {
    appendChild: function appendChild() {
        dtavm.log("body.appendChild::", arguments)
    }
};
body.__proto__ = HTMLBodyElement.prototype;

document = {
    body: body,
    hasFocus: function hasFocus() {
        return false
    },
    referrer: '',
    hidden: false,
    webkitHidden: true,
    createElement: function createElement() {
        dtavm.log("document.createElement::", arguments);
        if (arguments[0] === 'span') {
            return span
        }
        if (arguments[0] === 'iframe') {
            return iframe
        }
        if (arguments[0] === 'canvas') {
            return canvas
        }
        if (arguments[0] === 'script') {
            return script
        }
        if (arguments[0] === 'div') {
            return div
        }
    },
    all: all,
    documentElement: documentElement,
    hasPrivateToken: function hasPrivateToken() {
        dtavm.log("hasPrivateToken::", arguments);
    },
    hasRedemptionRecord: function hasRedemptionRecord() {
        dtavm.log("hasRedemptionRecord::", arguments);
    },
    getElementsByTagName: function getElementsByTagName() {
        dtavm.log("getElementsByTagName::", arguments);
        if (arguments[0] === 'script') {
            return []
        }
    },
    browsingTopics: function browsingTopics() {
        dtavm.log("hasRedemptionRecord::", arguments);
    },
    hasStorageAccess: function hasStorageAccess() {
        dtavm.log("hasStorageAccess::", arguments);
    },

    requestStorageAccessFor: function requestStorageAccessFor() {
        dtavm.log("requestStorageAccessFor::", arguments);
    },
    requestStorageAccess: function requestStorageAccess() {
        dtavm.log("requestStorageAccess::", arguments);
    }
};
document.__proto__ = HTMLDocument.prototype;
window.func_set_native(document.createElement);
window.func_set_native(document.hasPrivateToken);
window.func_set_native(document.hasRedemptionRecord);
window.func_set_native(document.getElementsByTagName);
window.func_set_native(document.hasFocus);

createTagProto('Screen');
createTagProto('ScreenOrientation');
orientation = {
    angle: 0,
    type: "landscape-primary",
    onchange: null
};
orientation.__proto__ = ScreenOrientation.prototype;
screen = {
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
    orientation: orientation
};
screen.__proto__ = Screen.prototype;

createTagProto('History');
history = {
    length: 4
};
history.__proto__ = History.prototype;

chrome = {
    app: {
        InstallState: {DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed'},
        RunningState: {CANNOT_RUN: 'cannot_run', READY_TO_RUN: 'ready_to_run', RUNNING: 'running'},
        getDetails: function getDetails() {
        },
        getIsInstalled: function getIsInstalled() {
        },
        installState: function installState() {
        },
        isInstalled: false,
        runningState: function runningState() {
        }
    },
    csi: function csi() {
    },
    loadTimes: function loadTimes() {
    },
}
window.func_set_native(chrome.app.getDetails);
window.func_set_native(chrome.app.getIsInstalled);
window.func_set_native(chrome.app.installState);
window.func_set_native(chrome.app.runningState);
window.func_set_native(chrome.csi);
window.func_set_native(chrome.loadTimes);


Image = function Image() {
    dtavm.log("Image::", arguments);
}
window.func_set_native(Image);
blur = function blur() {
    dtavm.log("blur::", arguments);
}
window.func_set_native(blur);

createTagProto('Storage', ['getItem', 'setItem', 'removeItem', 'clear']);
local = {};
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


createTagProto('CSSRuleList');
createTagProto('CSSStyleDeclaration');
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
createTagProto('MutationObserver');

PromiseRejectionEvent = function PromiseRejectionEvent() {
    dtavm.log("PromiseRejectionEvent::", arguments);
};
window.func_set_native(PromiseRejectionEvent);
dispatchEvent = function dispatchEvent() {
    dtavm.log("dispatchEvent::", arguments);
}
window.func_set_native(dispatchEvent);

__ALIYUN_CRYPT = CryptoJs;
prompt = function prompt() {
    dtavm.log("prompt::", arguments);
}
window.func_set_native(prompt);
resizeTo = function resizeTo() {
    dtavm.log("resizeTo::", arguments);
}
window.func_set_native(resizeTo);
Text = function Text() {
    dtavm.log("Text::", arguments);
}
window.func_set_native(Text);
Option = function Option() {
    dtavm.log("Option::", arguments);
}
window.func_set_native(Option);
open = function open() {
    dtavm.log("open::", arguments);
}
window.func_set_native(open);
alert = function alert() {
    dtavm.log("alert::", arguments);
}
window.func_set_native(alert);
close = function close() {
    dtavm.log("close::", arguments);
}
window.func_set_native(close);
focus = function focus() {
    dtavm.log("focus::", arguments);
}
window.func_set_native(focus);
resizeBy = function resizeBy() {
    dtavm.log("resizeBy::", arguments);
}
window.func_set_native(resizeBy);
PointerEvent = function PointerEvent() {
    dtavm.log("PointerEvent::", arguments);
}
window.func_set_native(PointerEvent);
openDatabase = function openDatabase() {
    dtavm.log("openDatabase::", arguments);
}
window.func_set_native(openDatabase);

documentx = function documentx() {
};
documentx.toString = function toString() {
    return 'function get document() { [native code] }';
}
documentx.name = 'get document'

screenx = function screenx() {
};
screenx.toString = function toString() {
    return 'function get screen() { [native code] }';
}
screenx.name = 'get screen'

screeny = function screeny() {
};
screeny.toString = function toString() {
    return 'function set screen() { [native code] }';
}
screeny.name = 'get screen'

navigatorx = function navigatorx() {
};
navigatorx.toString = function toString() {
    return 'function get navigator() { [native code] }';
}
navigatorx.name = 'get navigator'

localStoragex = function localStoragex() {
};
localStoragex.toString = function toString() {
    return 'function get localStorage() { [native code] }';
}
localStoragex.name = 'get localStorage'

webdriverx = function webdriverx() {
};
webdriverx.toString = function toString() {
    return 'undefined';
}
webdriverx.name = 'webdriver'

platformx = function platformx() {
};
platformx.toString = function toString() {
    return 'function get platform() { [native code] }';
}
platformx.name = 'get platform'

vendorx = function vendor() {
};
vendorx.toString = function toString() {
    return 'function get vendor() { [native code] }';
}
vendorx.name = 'get vendor'

userAgentx = function userAgentx() {
};
userAgentx.toString = function toString() {
    return 'function get userAgent() { [native code] }';
}
userAgentx.name = 'get userAgent'

languagex = function languagex() {
};
languagex.toString = function toString() {
    return 'function get language() { [native code] }';
}
languagex.name = 'get language'

languagesx = function languagesx() {
};
languagesx.toString = function toString() {
    return 'function get languages() { [native code] }';
}
languagesx.name = 'get languages'

storagex = function storagex() {
};
storagex.toString = function toString() {
    return 'function get storage() { [native code] }';
}
storagex.name = 'get storage'
hardwareConcurrencyx = function hardwareConcurrencyx() {
};
hardwareConcurrencyx.toString = function toString() {
    return 'function get hardwareConcurrency() { [native code] }';
}
hardwareConcurrencyx.name = 'get hardwareConcurrency'
deviceMemoryx = function deviceMemoryx() {
};
deviceMemoryx.toString = function toString() {
    return 'function get deviceMemory() { [native code] }';
}
deviceMemoryx.name = 'get deviceMemory'
cookieEnabledx = function cookieEnabledx() {
};
cookieEnabledx.toString = function toString() {
    return 'function get cookieEnabled() { [native code] }';
}
cookieEnabledx.name = 'get cookieEnabled'
maxTouchPointsx = function maxTouchPointsx() {
};
maxTouchPointsx.toString = function toString() {
    return 'function get maxTouchPoints() { [native code] }';
}
maxTouchPointsx.name = 'get maxTouchPoints'
productx = function productx() {
};
productx.toString = function toString() {
    return 'function get product() { [native code] }';
}
productx.name = 'get product'
appCodeNamex = function appVersionx() {
};
appCodeNamex.toString = function toString() {
    return 'function get appCodeName() { [native code] }';
}
appCodeNamex.name = 'get appCodeName';

appVersionx = function appVersionx() {
};
appVersionx.toString = function toString() {
    return 'function get appVersion() { [native code] }';
}
appVersionx.name = 'get appVersion';

fetch = function fetch() {
};
window.func_set_native(fetch);

Request = function Request() {
};
window.func_set_native(Request);

Headers = function Headers() {
};
window.func_set_native(Headers);

queueMicrotask = function queueMicrotask() {
};
window.func_set_native(queueMicrotask);

Object.getOwnPropertyDescriptor_ = Object.getOwnPropertyDescriptor;
Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, property) {
    let res = Object.getOwnPropertyDescriptor_(target, property);

    if (property === 'document') {
        return {
            configurable: false,
            enumerable: true,
            get: documentx,
            set: undefined
        }
    }
    if (target === navigator && property === 'webdriver') {
        return undefined
    }
    if (target === navigator.__proto__ && property === 'webdriver') {
        return {
            configurable: true,
            enumerable: true,
            get: webdriverx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'platform') {
        return {
            configurable: true,
            enumerable: true,
            get: platformx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'vendor') {
        return {
            configurable: true,
            enumerable: true,
            get: vendorx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'userAgent') {
        return {
            configurable: true,
            enumerable: true,
            get: userAgentx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'appVersion') {
        return {
            configurable: true,
            enumerable: true,
            get: appVersionx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'language') {
        return {
            configurable: true,
            enumerable: true,
            get: languagex,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'languages') {
        return {
            configurable: true,
            enumerable: true,
            get: languagesx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'storage') {
        return {
            configurable: true,
            enumerable: true,
            get: storagex,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'hardwareConcurrency') {
        return {
            configurable: true,
            enumerable: true,
            get: hardwareConcurrencyx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'deviceMemory') {
        return {
            configurable: true,
            enumerable: true,
            get: deviceMemoryx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'cookieEnabled') {
        return {
            configurable: true,
            enumerable: true,
            get: cookieEnabledx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'maxTouchPoints') {
        return {
            configurable: true,
            enumerable: true,
            get: maxTouchPointsx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'product') {
        return {
            configurable: true,
            enumerable: true,
            get: productx,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'appCodeName') {
        return {
            configurable: true,
            enumerable: true,
            get: appCodeNamex,
            set: undefined
        }
    }
    if (target === navigator.__proto__ && property === 'plugins') {
        return undefined
    }
    if (property === 'screen') {
        return {
            configurable: true,
            enumerable: true,
            get: screenx,
            set: screeny
        }
    }
    if (property === 'navigator') {
        return {
            configurable: true,
            enumerable: true,
            get: navigatorx,
            set: undefined
        }
    }
    if (property === 'localStorage') {
        return {
            configurable: true,
            enumerable: true,
            get: localStoragex,
            set: undefined
        }
    }
    if (property === 'fetch') {
        return {
            configurable: true,
            enumerable: true,
            value: fetch,
            writable: true
        }
    }
    if (property === 'Request') {
        return {
            configurable: true,
            enumerable: false,
            value: Request,
            writable: true
        }
    }
    if (property === 'Headers') {
        return {
            configurable: true,
            enumerable: false,
            value: Headers,
            writable: true
        }
    }
    if (property === 'queueMicrotask') {
        return {
            configurable: true,
            enumerable: true,
            value: queueMicrotask,
            writable: true
        }
    }
    dtavm.log("Object.getOwnPropertyDescriptor::", target + '', property, res);
    return res;
}
window.func_set_native(Object.getOwnPropertyDescriptor);


Worker = function Worker() {
    dtavm.log("Worker::", arguments);
}
window.func_set_native(Worker);
File = function File() {
    dtavm.log("File::", arguments);
}
window.func_set_native(File);
Range = function Range() {
    dtavm.log("Range::", arguments);
}
window.func_set_native(Range);
confirm = function confirm() {
    dtavm.log("confirm::", arguments);
}
window.func_set_native(confirm);
scrollTo = function scrollTo() {
    dtavm.log("scrollTo::", arguments);
}
window.func_set_native(scrollTo);
scroll = function scroll() {
    dtavm.log("scroll::", arguments);
}
window.func_set_native(scroll);
createTagProto('IDBFactory');
indexedDB = {};
indexedDB.__proto__ = IDBFactory.prototype;

MimeType = function MimeType() {
    dtavm.log("MimeType::", arguments);
}
window.func_set_native(MimeType);
moveTo = function moveTo() {
    dtavm.log("moveTo::", arguments);
}
window.func_set_native(moveTo);
originAgentCluster = false;

Audio = function Audio() {
    dtavm.log("Audio::", arguments);
}
window.func_set_native(Audio);
print = function print() {
    dtavm.log("print::", arguments);
}
window.func_set_native(print);
moveBy = function moveBy() {
    dtavm.log("moveBy::", arguments);
}
window.func_set_native(moveBy);
matchMedia = function matchMedia() {
    dtavm.log("matchMedia::", arguments);
    if (arguments[0] === '(color-gamut: rec2020)') {
        return {matches: false}
    }
    if (arguments[0] === '(color-gamut: p3)') {
        return {matches: false}
    }
    if (arguments[0] === '(color-gamut: srgb)') {
        return {matches: true}
    }
    if (arguments[0] === '(forced-colors: none)') {
        return {matches: true}
    }
    if (arguments[0] === '(inverted-colors: inverted)') {
        return {matches: false}
    }
    if (arguments[0] === '(dynamic-range: high)') {
        return {matches: false}
    }
    if (arguments[0] === '(min-monochrome: 0)') {
        return {matches: true}
    }
    if (arguments[0] === '(min-monochrome: 0)') {
        return {matches: true}
    }
    if (arguments[0] === '(min-monochrome: 0)') {
        return {matches: true}
    }
    if (arguments[0] === '(max-monochrome: 0)') {
        return {matches: true}
    }
    if (arguments[0].indexOf('max-monochrome:') != -1) {
        return {matches: true}
    }
    if (arguments[0] === '(dynamic-range: standard)') {
        return {matches: true}
    }
    if (arguments[0] === '(prefers-contrast: no-preference)') {
        return {matches: true}
    }
    if (arguments[0] === '(prefers-reduced-motion: no-preference)') {
        return {matches: true}
    }
    return {matches: false}
}
window.func_set_native(matchMedia);

scrollBy = function scrollBy() {
    dtavm.log("scrollBy::", arguments);
}
window.func_set_native(scrollBy);
getComputedStyle = function getComputedStyle() {
    dtavm.log("getComputedStyle::", arguments);
}
window.func_set_native(getComputedStyle);
setProxyArr(['window', 'globalThis', 'localStorage', 'indexedDB', 'MimeType', 'div', 'document.body', 'performance', 'two2d', 'webgl', 'PointerEvent.prototype', 'navigator.mimeTypes', 'navigator.mimeTypes[0]', 'navigator.mimeTypes[1]', '__ALIYUN_CRYPT', 'iframe', 'script', 'canvas', 'sessionStorage', 'navigator', 'span', 'span.classList', 'document', 'document.all', 'document.documentElement', 'document.documentElement.style', 'location', 'history', 'chrome', 'screen', 'img', 'sharedStorage']);

let Ee = {
    "preCollectData": {
        "fontsNum": 132
    },
    "ENDPOINTS": [
        "https://cloudauth-device-dualstack.cn-shanghai.aliyuncs.com",
        "https://cn-shanghai.device.saf.aliyuncs.com"
    ],
    "sceneId": "1almkyfs",
    "appName": "saf-captcha",
    "appKey": "ab034ec0643f91399eb33e062dc7fae1",
    "endpoints": [
        "https://cloudauth-device-dualstack.cn-shanghai.aliyuncs.com",
        "https://cn-shanghai.device.saf.aliyuncs.com"
    ],
    "DeviceConfig": "zxTPIXWufE4lfe+KyX3E58EQm/6efypgN5XMAXioqly4+krFPltVxGDNalk2ivLH037S1g1ZTgJ6OnNwHVpAO5qcqshe+z305qMYN6k+1Xm3HczhwnISIRli29v1dhMWzcFdZNXCATnHgUB3tJPB4JLfbDaFlBOQsdatSV8lU+j4djBCk6/UgQaOERyl1+IY6m85Khh9wwhz5FH4Of6jmgw0+foREtFlSMWEwI8lQ+N/ObPaZcnITncFdL7/X7Qw",
    "deviceConfig": deviceConfig,
    "timestamp": "1749450666861",
    "feilinLoad": true
}
ecx = function (t, r) {
    debugger
}

require_('./feilin.js');


window.FEILIN.initFeiLin(Ee, ecx).then((function (t) {
    // console.log(t)
    debugger;
}))
deasync.sleep(20)
Object.defineProperty(window, '__ORDVD', {
    set: function (value) {
        dtavm._log("__ORDVD::", JSON.parse(value)['v78d98s']);
        process_.exit(0);
    }
});


