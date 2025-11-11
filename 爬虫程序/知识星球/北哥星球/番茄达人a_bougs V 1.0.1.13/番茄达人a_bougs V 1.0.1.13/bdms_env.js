require_ = require;
process_ = process;
// delete global;
// delete Buffer;
// delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
// delete setImmediate;
// delete clearImmediate;

const v8 = require_('v8');
const vm=require_('vm');
v8.setFlagsFromString('--allow-natives-syntax');
let undetectable = vm.runInThisContext("%GetUndetectable()");
v8.setFlagsFromString('--no-allow-natives-syntax');

Object.defineProperties(globalThis, {
    [Symbol.toStringTag]: {
        configurable: true,
        value: 'Window'
    }
});

dtavm = {
    // log : console.log,
    log: function () { },
    _log : console.log
}

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
        if(property === 'self'){
            return target[property];
        }
        if(property === 'top'){
            return target[property];
        }
        if(property === 'parent'){
            return target[property];
        }
        dtavm.log("方法:", "get  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]);
        return target[property];
      },
      set: function(target, property, value, receiver) {
        //dtavm.log("方法:", "set  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", value, ", 属性值类型：", typeof target[property]);
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

createTagProto('EventTarget');
createTagProto('Window');
createTagProto('HTMLDocument',['createElement','createEvent','addEventListener']);
createTagProto('Document',['createElement','createEvent','addEventListener']);
createTagProto('Node');
createTagProto('Navigator');
createTagProto('HTMLHtmlElement');
createTagProto('Element');

window = globalThis;
window.__proto__ = Window.prototype;

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

window.requestAnimationFrame = function requestAnimationFrame() { }
window.func_set_native(requestAnimationFrame);

window.XMLHttpRequest = require_('xhr2');
Image = require_("node-js-image");

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
createTagProto('HTMLElement');

addEventListener = function addEventListener() {};
window.func_set_native(addEventListener);
addEventListener.prototype = null;

ActiveXObject = undefined;

postMessage = function postMessage() { };
window.func_set_native(postMessage);
postMessage.prototype = null;

webkitRequestAnimationFrame = function webkitRequestAnimationFrame() { };
window.func_set_native(webkitRequestAnimationFrame);
webkitRequestAnimationFrame.prototype = null;

alert = function alert() { };
window.func_set_native(alert);
alert.prototype = null;

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
createTagProto('StorageManager',['estimate']);
createTagProto('NavigatorUAData');
createTagProto('NetworkInformation',['onchange']);

Promise2 = {
    then: function () {
        return this;
    },
    catch: function (){},
};
storage = {
    estimate: function estimate() {
        return Promise2
    },
};
storage.__proto__ = StorageManager.prototype;
window.func_set_native(storage.estimate);

connection = {
    effectiveType: '4g', rtt: 100, downlink: 10, saveData: false,
    onchange: function onchange() {
        dtavm.log("onchange:", arguments);
    },
};
connection.__proto__ = NetworkInformation.prototype;
window.func_set_native(connection.onchange);

createTagProto('Plugin');
createTagProto('PluginArray');
createTagProto('MimeType');

Pluginitem = {
    type: "text/pdf",
    suffixes: 'pdf',
};
Pluginitem.__proto__ = MimeType.prototype;

Plugin.prototype.item = function item() {
    dtavm.log("Plugin-item:", arguments);
    if (arguments[0] === 0) {
        Pluginitem['type'] = "application/pdf"
    }
    if (arguments[0] === 1) {
        Pluginitem['type'] = "text/pdf"
    }
    return Pluginitem
}

pluginsone = {
    length:2
}
pluginsone.__proto__ = Plugin.prototype;

PluginArray.prototype.item = function item() {
    dtavm.log("item:", arguments);
    return pluginsone;
};

plugins = [{}, {}, {}, {}, {}];
plugins.__proto__ = PluginArray.prototype;

userAgentData = {
    brands: [
        { brand: 'Not=A?Brand', version: '99' },
        {brand: 'Chromium', version: '118'}
    ],
    mobile: false, platform: 'Windows'
};
userAgentData.__proto__ = NavigatorUAData.prototype;
Navigator.prototype = Object.assign(Navigator.prototype, {
    product: 'Gecko',
    productSub: '20030107',
    requestMediaKeySystemAccess: function requestMediaKeySystemAccess() {
        dtavm.log("requestMediaKeySystemAccess:", arguments);
    },
    storage: storage,
    vendorSub: '',
    vendorSubs:{ink: 1746713179238},
    vibrate: function vibrate() {
        dtavm.log("vibrate:", arguments);
    },
    webdriver: false,
    credentials: function credentials() {
        dtavm.log("credentials:", arguments);
    },
    connection: connection,
    userAgentData: userAgentData,
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
});
window.func_set_native(Navigator.prototype.requestMediaKeySystemAccess);
window.func_set_native(Navigator.prototype.vibrate);
Navigator.prototype.platform = 'Win32';
Navigator.prototype.maxTouchPoints = 0;
Navigator.prototype.language = 'zh-CN';
Navigator.prototype.languages = ['zh-CN'];
Navigator.prototype.doNotTrack = null;
Navigator.prototype.deviceMemory = 8;
bluetooth = {};
bluetooth.__proto__ = Bluetooth.prototype;
Navigator.prototype.bluetooth = bluetooth;
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
Navigator.prototype.vendor = 'Google Inc.';
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
Navigator.prototype.sendBeacon = function sendBeacon() {
    dtavm.log("sendBeacon:", arguments);
};
window.func_set_native(Navigator.prototype.sendBeacon);



navigator = {};
navigator.__proto__ = Navigator.prototype;

createTagProto('HTMLSpanElement');
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
span = {
    classList:span_classList
};
span.__proto__ = HTMLSpanElement.prototype;


createTagProto('HTMLAllCollection');
all = undetectable;
all.__proto__ = HTMLAllCollection.prototype;
all.length = 118;

documentElement = {};
documentElement.__proto__ = HTMLHtmlElement.prototype;

imagesc = [];
imagesc.length = 65;
imagesc.__proto__ = HTMLCollection.prototype;

createTagProto('HTMLBodyElement');
body = {
    clientWidth: 580,
    clientHeight: 710,
};
body.__proto__ = HTMLBodyElement.prototype;

createTagProto('FontFaceSet',['check']);
fonts = {
    check: function check() {
        if (arguments[0] === '72px MYRIAD PRO') {
            return false
        }
        if (arguments[0] === '72px Savoye LET') {
            return false
        }
        if (arguments[0] === '72px Arial Hebrew') {
            return false
        }
        if (arguments[0] === '72px AVENIR') {
            return false
        }
        if (arguments[0] === '72px Futura') {
            return false
        }
        if (arguments[0] === '72px OPTIMA') {
            return false
        }
        if (arguments[0] === '72px Palatino') {
            return false
        }
        if (arguments[0] === '72px IrisUPC') {
            return false
        }
        if (arguments[0] === '72px Aparajita') {
            return false
        }
        if (arguments[0] === '72px CordiaUPC') {
            return false
        }
        if (arguments[0] === '72px Vrinda') {
            return false
        }
        if (arguments[0] === '72px Gulim') {
            return false
        }
        if (arguments[0] === '72px Tunga') {
            return false
        }
        if (arguments[0] === '72px Meiryo') {
            return false
        }
        return true
    },
};
fonts.__proto__ = FontFaceSet.prototype;
window.func_set_native(fonts.check);

createTagProto('CanvasRenderingContext2D',['rect', 'fillRect', 'fillText', 'beginPath', 'arc', 'closePath', 'fill', 'isPointInPath']);
two2d = {
    rect: function rect() { },
    fillRect: function fillRect() { },
    fillText: function fillText() { },
    beginPath: function beginPath() { },
    arc: function arc() { },
    closePath: function closePath() { },
    fill: function fill() { },
    isPointInPath:function isPointInPath(){},
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

createTagProto('WebGLRenderingContext',['getParameter', 'getExtension']);
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
};
webgl.__proto__ = WebGLRenderingContext.prototype;
window.func_set_native(webgl.getExtension);
window.func_set_native(webgl.getParameter);

createTagProto('HTMLCanvasElement',['getContext', 'toDataURL']);
createTagProto('CSSStyleDeclaration');
canvas_style = {};
canvas_style.__proto__ = CSSStyleDeclaration.prototype;
canvas = {
    tagName: 'CANVAS',
    style: canvas_style,
    getContext: function getContext() {
        dtavm.log('canvas.getContext:', arguments);
        if (arguments[0] === '2d') {
            return two2d
        }
        if (arguments[0] === 'webgl') {
            return webgl
        }
    },
    toDataURL: function toDataURL() {
        debugger;
        return  'data:image/png;base64,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'
    }
};
canvas.__proto__ = HTMLCanvasElement.prototype;
window.func_set_native(canvas.getContext);
window.func_set_native(canvas.toDataURL);


document = {
    body:body,
    all: all,
    fonts:fonts,
    documentElement:documentElement,
    createElement: function createElement() {
        dtavm.log("createElement::", arguments);
        if (arguments[0] === 'span') {
            return span
        }
        if (arguments[0] === 'canvas') {
            return canvas
        }
    },
    addEventListener:function addEventListener() {
        if (arguments[0] === 'mousemove') {
            window.mousemoveXEvent = arguments[1];
            // dtavm.log("addEventListener::", arguments[1]+'');
        }
    },
    characterSet: 'UTF-8',
    compatMode: 'CSS1Compat',
    images: imagesc,
    createEvent: function createEvent() { },
    referrer:''
};
document.__proto__ = HTMLDocument.prototype;
window.func_set_native(document.createElement);
window.func_set_native(document.addEventListener);
window.func_set_native(document.createEvent);

createTagProto('Location');
location = {
    "ancestorOrigins": {},
    "href": "https://promoter.fanqieopen.com/page/affiliate/task?share_token=83DwPXv3",
    "origin": "https://promoter.fanqieopen.com",
    "protocol": "https:",
    "host": "promoter.fanqieopen.com",
    "hostname": "promoter.fanqieopen.com",
    "port": "",
    "pathname": "/page/affiliate/task",
    "search": "?share_token=83DwPXv3",
    "hash": ""
};
location.__proto__ = Location.prototype;

document.location = location;
document.cookie = 'x-web-secsdk-uid=38c8832e-cb81-498e-88ad-7124e1994b5a; gfkadpd=457699,27070; s_v_web_id=verify_mcstimow_7IgjZBYL_92rc_4I6k_B8w8_xt2xpdFFRvq1'

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
history = {};
history.__proto__ = History.prototype;

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

createTagProto('Storage',['getItem','setItem','removeItem','clear']);
local = {
    "__tea_cache_tokens_2018": "{\"web_id\":\"7524228842887874098\",\"user_unique_id\":\"verify_mcsqsiek_pAd2Hrf4_qYvB_4h6F_9Y8n_2BIST8EaVO7D\",\"timestamp\":1751871051546,\"_type_\":\"default\"}",
    "SLARDARnovel_kol_platform": "JTdCJTIydXNlcklkJTIyOiUyMjJjYWU3ZGM3LTc2NTUtNDMxZC1iNzc4LTQ4ZTEyMTkxMDY2YyUyMiwlMjJkZXZpY2VJZCUyMjolMjI0ZWViNjEyYS01YWY3LTRiZWItODM0NC1lZmMwNmE5YmU1MTQlMjIsJTIyZXhwaXJlcyUyMjoxNzU5NjQ3MDUxMjEyJTdE",
    "SLARDARpassport_account_api": "JTdCJTIydXNlcklkJTIyOiUyMjk2MmYwN2UzLTIxMzMtNGExZS1iODE2LTUwZTFjNjEzMzUxYyUyMiwlMjJkZXZpY2VJZCUyMjolMjI4MmI2NTRiYy1kY2YxLTQxNGUtYjkxOC1hYzhlNDEzNDZkZTAlMjIsJTIyZXhwaXJlcyUyMjoxNzU5NjQ3MDUxMjY0JTdE",
    "web_runtime_security_uid": "f5760c3e-03e8-497a-b784-d57f0e3afa02",
    "xmst": "Fyw8bJOBlrbWzkY34r69sj60Om1argYXTbLN2sh32WisWfbuM32M89Qjk-92xxtx_9baSdphdTBaRktrZbVlRd6LJVHXnUTjeIy_JQn4mOmIqtvGzijACOrdDa7ZvY0nnuj2VWpLBWIqRqgOTISkaiMTo_kPpg==",
    "web_runtime_switcher_isgray": "false",
    "__msuuid__": "2dabbc7a-ec45-4248-a352-8c09ddd7306a",
    "__tea_cache_tokens_457699": "{\"web_id\":\"7524228844262426163\",\"user_unique_id\":\"7524228844262426163\",\"timestamp\":1751871051269,\"_type_\":\"default\"}",
    "__tea_cache_first_457699": "1",
    "__tea_cache_first_2018": "1"
}
localStorage = {
    getItem: function (key) {
        return local[key];
    },
    setItem: function (key, value) {
        local[key] = value;
    },
    clear: function () {
        local = {};
    },
    removeItem: function (key) {
        delete local[key];
    }
}
localStorage.__proto__ = Storage.prototype;
sessionStorage = {
    getItem: function (key) {
        return local[key];
    },
    setItem: function (key, value) {
        local[key] = value;
    },
    clear: function () {
        local = {};
    },
    removeItem: function (key) {
        delete local[key];
    }
}
sessionStorage.__proto__ = Storage.prototype;

createTagProto('MutationObserver');
createTagProto('PromiseRejectionEvent');

dispatchEvent = function dispatchEvent() { };
window.func_set_native(dispatchEvent);
dispatchEvent.prototype = null;

window._sdkGlueVersionMap = {sdkGlueVersion: '1.0.0.60', bdmsVersion: '1.0.1.13', captchaVersion: '4.0.10'};
window.onwheelx = { _Ax: '0X21' }

EventSource = function EventSource() { };
window.func_set_native(EventSource);

ActiveXObject = undefined;
createTagProto('BluetoothUUID');

createTagProto('External');
external = {};
external.__proto__ = External.prototype;

createTagProto('BarProp');
locationbar = { visible: true };
locationbar.__proto__ = BarProp.prototype;
toolbar = { visible: true };
toolbar.__proto__ = BarProp.prototype;

Request = function Request() { }
window.func_set_native(Request)

matchMedia = function matchMedia() {
    dtavm.log('matchMedia:::',arguments)
}
window.func_set_native(matchMedia)

setInterval = function setInterval() { };
setTimeout = function setTimeout() { };
clearInterval = function clearInterval() { };
clearTimeout = function clearTimeout() { };

createTagProto('HTMLAudioElement');
Audio = function Audio() {
    dtavm.log("Audio", arguments);
}
window.func_set_native(Audio);
Audio.__proto__ = HTMLAudioElement.prototype;

setProxyArr(['globalThis', 'window','HTMLElement.prototype','self', 'top','navigator','span', 'document', 'document.all','document.documentElement', 'location', 'screen', 'history', 'localStorage', 'sessionStorage','document.body','document.images','document.fonts','canvas','webgl','two2d','navigator.plugins','pluginsone','Pluginitem']);

require_('./bdms1.13.js');

options = {
    "aid": 457699,
    "pageId": 27070,
    "paths": [
        "/api/platform/",
        "/passport"
    ]
}
window.bdms.init(options);

xhr = new XMLHttpRequest;
xhr.bdmsInvokeList = [
        {"args": ["POST", "/api/platform/user/invite_code/log_in/v:version?app_id=457699&aid=457699&origin_app_id=457699&host_app_id=457699", true], func: function(){}},
        {"args": ["Accept", "application/json, text/plain, */*"], func: function () { } },
        {"args": ["Content-Type", "application/json"], func: function(){}},
]
xhr.readyState = 1
xhr.openArgs = ["POST", "/api/platform/user/invite_code/log_in/v:version?app_id=457699&aid=457699&origin_app_id=457699&host_app_id=457699", true]
xhr._url = {
    'href': 'https://api.douyin.com/api/platform/user/invite_code/log_in/v:version?app_id=457699&aid=457699&origin_app_id=457699&host_app_id=457699',
    'pathname': '/api/platform/user/invite_code/log_in/v:version',
    'host':'api.douyin.com',
    'protocol':'https:'
}
xhr._method = 'POST'
xhr._reqHeaders = {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}
xhr._headers = {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}
xhr._loweredHeaders = {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}
xhr.send('{"share_token":"83DwPXv3","invite_code":"dawd12"}')