process_ = process;
require_ = require;
// delete Buffer;
// delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
delete setImmediate;
delete clearImmediate;

dtavm = {
    log : console.log,
    // log: function () { },
    _log : console.log
}

no_print = ['window', 'globalThis','navigator','top','self','plugins','parent'];
function setProxyArr(proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        const handler = `{
      get: function(target, property, receiver) {
        if(no_print.includes(property)){
            return target[property];
        }
        if(property === 'readyState'){
            debugger
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

window.addEventListener = function addEventListener() {
    dtavm._log('addEventListener:::',arguments)
}

top = window.top = window;
self = window.self = window;
parent = window.parent = window;

fetch = require_('node-fetch');
XMLHttpRequest = require_('xhr2');

createTagProto('Location');
location = {
    "ancestorOrigins": {},
    "href": "https://passport.suning.com/ids/login?service=https%3A%2F%2Floginst.suning.com%2F%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fwww.suning.com%252F&method=GET&loginTheme=b2c",
    "origin": "https://passport.suning.com",
    "protocol": "https:",
    "host": "passport.suning.com",
    "hostname": "passport.suning.com",
    "port": "",
    "pathname": "/ids/login",
    "search": "?service=https%3A%2F%2Floginst.suning.com%2F%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fwww.suning.com%252F&method=GET&loginTheme=b2c",
    "hash": ""
};

location.__proto__ = Location.prototype;
location.toString = function toString() {
    return this.href;
}

createTagProto('HTMLHeadElement');
head = {
    appendChild: function appendChild() {
        dtavm.log('appendChild:::', arguments)
        if (arguments[0].src && arguments[0].src.indexOf('webCollectInit') != -1) {
            fetch(arguments[0].src).then(response => response.text()) // 如果你期望JSON响应
            .then(data => {
                dtavm.log('xxxxxxxxxxx::', data);
                eval(data);
                // dtavm.log(bd.rst({'scene':'1'}));
                // require_('./mmds2.js');
                // bd.rst({ 'scene': '1' });
                dtavm.log(bd.rst({'scene':'1'}));
            })
        }
    },
    contains: function contains() {
        dtavm.log('contains:::', arguments)
        return true
    },
    removeChild:function removeChild(){}
};
head.__proto__ = HTMLHeadElement.prototype;

createTagProto('HTMLBodyElement');
body = {
    clientHeight: 676,
    clientWidth: 150,
    appendChild: function appendChild() {
        dtavm.log('body-appendChild:::', arguments)
    },
    removeChild:function removeChild(){}
};
body.__proto__ = HTMLBodyElement.prototype;

createTagProto('HTMLScriptElement');
script = {
    text: '',
    setAttribute: function setAttribute() {
        dtavm.log('setAttribute:::', arguments[0]+'',arguments[1]+'')
    }
};
script.__proto__ = HTMLScriptElement.prototype;

scripts = [
    {
        src: '',
        text:'\n       \n        var sn = sn || {};\n        //全局变量\n        var sn_domain = "http://www.suning.com";\n        var server_prefix_domain = "https://ssl.suning.com/emall/";\n        var srs_prefix_domain = "https://reg.suning.com/";\n        var asc_prefix_domain = "https://aq.suning.com/asc/";\n        var passport_domain   = "https://passport.suning.com";\n        var sop_prefix_domain = "https://sopssl.suning.com/";\n        var goUrl             = "http://www.suning.com/";\n    \tvar rdsy_prefix_domain = "https://rdsy.suning.com/";\n\t\tvar dt_Siller_Url     = "https://dt.suning.com/detect/dt/dragDetect.json";\n\t\tvar passport_prefix_domain = "https://passport.suning.com/";\n\n        var loginPBK="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQComqoAyvbCqO1EGsADwfNTWFQIUbm8CLdeb9TgjGLcz95mAo204SqTYdSEUxFsOnPfROOTxhkhfjbRxBV4/xjS06Y+kkUdiMGFtABIxRQHQIh0LrVvEZQs4NrixxcPI+b1bpE0gO/GAFSNWm9ejhZGj7UnqiHphnSJAVQNz2lgowIDAQAB";\n\n    \tvar companycard_url = srs_prefix_domain + "companycardshow.do";\n\t\t//人工审核地址\n\t\tvar asc_selfService_URL = asc_prefix_domain + "selfService/show.do";\n        //登录建议URL\n\t\tvar loginAdvise_Url = "https://qss.suning.com/ea486.htm";\n        //下载易购appURL\n\t\tvar downLoadApp_Url = "http://sale.suning.com/syb/20120419xsjkhd/index.html";\n\t\t//忘记密码\n\t\tvar forgetPwd_URL = asc_prefix_domain + "forgetpsw.do";\n\t\t//会员卡连接地址\n\t\tvar memberCard_URL = srs_prefix_domain + "b2cMemberCard/offline/cardLogin.do";\n        \n        var autoLoginCookie_expireDay = 30;\n    '
    }, {
        src: 'https://res.suning.cn/??/project/cmsWeb/suning/public/base/public/v3/js/jquery.js,/project/cmsWeb/suning/public/base/public/v3/js/sn_lazyload.js,/project/cmsWeb/suning/public/base/public/v3/js/lazyelem.min.js,/project/cmsWeb/suning/public/base/public/v3/js/SFE.base.min.js,/project/cmsWeb/suning/public/base/public/v3/js/assist-toolbar.js,/project/cmsWeb/suning/public/base/public/v3/js/search.min.js,/project/cmsWeb/suning/public/base/public/sidebar/build/js/sn-sidebar.min.js,/project/yunxin/js/chatCompat_mini.js?v=2024032202',
        text:''
    }, {
        src: 'https://res.suning.cn/javascript/sn_da/da_opt.js',
        text:''
    }, {
        src: 'https://sa.suning.cn/cc.js',
        text:''
    }, {
        src: 'https://mmds.suning.com/mmds/mmds.js?appCode=qEmt9X4YmoV2Vye8',
        text:''
    }
]

script_src = ''
Object.defineProperty(script, 'src', {
    get: function () {
        return script_src;
    },
    set: function (val) {
        script_src = val;
        scripts[5] = this;
        scripts[6] = {
            src: 'https://res.suning.cn/project/crdnode/common/suAES.min.js',
            text:''
        }
        scripts[7] = {
            src: '',
            text:'\n        <div class="send-voice-success-dialog">\n            <div class="dialing"></div>\n            <p class="tell">稍后苏宁客服将电话与您联系，告知验证码～</p>\n            <a name="Logon_index_denglu036" href="javascript:void(0)" class="button close">确 定</a>\n        </div>\n    '
        }
        scripts[8] = {
            src: 'https://res.suning.cn/public/v3/js/jquery.js',
            text:''
        }
        return script_src;
    }
})

createTagProto('HTMLIFrameElement');
iframe = {
    length:0
};
iframe.__proto__ = HTMLIFrameElement.prototype;

createTagProto('HTMLHtmlElement');
documentElement = {
    clientHeight: 676,
    clientWidth: 150,
};
documentElement.__proto__ = HTMLHtmlElement.prototype;

createTagProto('HTMLDocument');
document = {
    head: head,
    addEventListener: function addEventListener() {
        dtavm._log('document.addEventListener::', arguments)
    },
    getElementsByTagName: function getElementsByTagName() {
        dtavm._log('document.getElementsByTagName::', arguments,arguments[0]+'')
        if (arguments[0]+'' === 'head') {
            return [head]
        }
        if (arguments[0]+'' === 'script') {
            debugger
            return scripts
        }
        if (arguments[0] + '' === 'iframe') {
            return []
        }
        if (arguments[0] + '' === 'input') {
            return {length:21}
        }
    },
    createElement: function createElement() {
        dtavm.log('document.createElement::', arguments, arguments[0] + '')
        if (arguments[0] + '' === 'script') {
            return script
        }
    },
    readyState: "loading",
    forms: [{}],
    images: { length: 10 },
    referrer: '',
    domain: 'passport.suning.com',
    documentElement:documentElement
};
document.__proto__ = HTMLDocument.prototype;

numc_body = 0;
Object.defineProperty(document, 'body', {
    get: function () {
        if (numc_body <= 2) {
            numc_body++;
            return null;
        }
        return body;
    }
})

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
    height:864
});
screen = {};
screen.__proto__ = Screen.prototype;

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


createTagProto('Storage');
local = {
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

innerWidth = 1536
innerHeight = 715
outerWidth = 1536
outerHeight = 824
devicePixelRatio = 1.25;
screenLeft = 0;
screenX = 0;
screenTop = 0;
screenY = 0;

createTagProto('History');
history = {
    length:2
};
history.__proto__ = History.prototype;

postMessage = function postMessage() {
    dtavm.log('postMessage::',arguments);
}
window.func_set_native(postMessage)

setProxyArr(['window', 'globalThis', 'top', 'history','self','script','parent','document.forms','document.documentElement','document.images','scripts','iframe','scripts[0]','scripts[1]', 'body','document.head','head','document', 'location', 'navigator', 'screen', 'chrome', 'localStorage', 'sessionStorage']);
require_('./mmds.js');

