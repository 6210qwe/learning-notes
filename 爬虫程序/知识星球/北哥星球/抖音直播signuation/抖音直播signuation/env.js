require_ = require;
process_ = process;
delete global;
delete process;
delete require;
delete module;
delete exports;
delete define;
delete __filename;
delete __dirname;
delete setImmediate;
delete clearImmediate;
delete SharedArrayBuffer;

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
        if(property === 'global'){
            return target[property];
        }
        if(property === 'Buffer'){
            return undefined;
        }
        if(property === 'require_'){
            return undefined;
        }
        if(property === 'process_'){
            return undefined;
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

createTagProto('Window',['addEventListener']);
window = globalThis;
window.__proto__ = Window.prototype;


global = window.global = window;

setTimeout = function setTimeout() {
    dtavm.log('setTimeout::', arguments)
    arguments[0]();
}

createTagProto('Location');
location = {
    "ancestorOrigins": {},
    "href": "https://live.douyin.com/290455238981?from_search=true",
    "origin": "https://live.douyin.com",
    "protocol": "https:",
    "host": "live.douyin.com",
    "hostname": "live.douyin.com",
    "port": "",
    "pathname": "/290455238981",
    "search": "?from_search=true",
    "hash": ""
};
location.__proto__ = Location.prototype;

location.toString = function toString() {
    return this.href;
};

createTagProto('HTMLCanvasElement');
canvas = {
    toDataURL: function toDataURL() {
        return  'data:image/png;base64,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'
    }
};
canvas.__proto__ = HTMLCanvasElement.prototype;
window.func_set_native(canvas.toDataURL)

createTagProto('HTMLDocument');
createTagProto('Document',['addEventListener','createElement']);
createTagProto('Node');
document = {
    hidden: false,
    webkitHidden:true,
    referrer: '',
    visibilityState: 'visible',
    createElement:function createElement() {
        dtavm.log('createElement::', arguments)
        if (arguments[0] === 'canvas') {
            return canvas
        }
    },
    cookie:'enter_pc_once=1; UIFID_TEMP=e35d48d50542e069836dcfd6c1b7719d3f3cf385c1bd9d7d6a168d32a6a94fd1176ba8bdb63a368ffc9ad69910f1ebd6ccbe279779cd8373b3172a3aff5f1ea645fbf66167ca88e8496a7f2f51e79e03; x-web-secsdk-uid=5a96bb2e-0fe4-4200-9d68-e1407cec667e; douyin.com; s_v_web_id=verify_md7jjux1_l75toO3t_1CkJ_4MHm_8uah_L6lSrFNkVqJf; device_web_cpu_core=8; device_web_memory_size=8; hevc_supported=true; dy_swidth=1536; dy_sheight=864; passport_csrf_token=cf9cda0948de6685ba63d52ca8305682; passport_csrf_token_default=cf9cda0948de6685ba63d52ca8305682; is_dash_user=1; __security_mc_1_s_sdk_cert_key=b778262e-4aab-8703; __security_mc_1_s_sdk_sign_data_key_web_protect=15610fe2-417d-a325; fpk1=U2FsdGVkX18++UvRs0U2fIX7RzukNHW2QZ4BcSyOmEWZMOO6RzXNkYu45I/1ohAE+WLI5lCjG6RrB0ZVqdfKfw==; fpk2=b75db699cce29d174140fd884d454724; __security_mc_1_s_sdk_crypt_sdk=4786c503-4020-b201; bd_ticket_guard_client_web_domain=2; xgplayer_device_id=99760079920; xgplayer_user_id=198931267168; __live_version__=%221.1.3.5921%22; live_use_vvc=%22false%22; h265ErrorNum=-1; webcast_leading_last_show_time=1752765971958; webcast_leading_total_show_times=1; webcast_local_quality=sd; UIFID=e35d48d50542e069836dcfd6c1b7719d3f3cf385c1bd9d7d6a168d32a6a94fd10e63a79e705f5a192db41ba4c34f64cf0afbeadd963fc2ddaed3a15f5654cabab60293769c00c6611a1c4dc6b263eb071bc5a9204d02b1e0e61b5be7d60f2dd5374f82e658a7d168cf62b67cdbea5eaad33d5d91147ae7181bd7be15d8f9fac62c388fff4bf188a7b3ed851cfce58af94e1d4c4ec46ca5da8a6688c333c150f1; strategyABtestKey=%221752801726.209%22; xg_device_score=7.658235294117647; biz_trace_id=e282a690; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCRFZvSWFNRmU3d1pyUVZhMGRjb25GdGh1YldKcjZleVBqVW1KSjhjWm5ibUp0cDFrTjZwVGtzbkJrcjg3UDlDa3dIWkI1QVJtTmJJVXFaQUNsWGZvek09IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; download_guide=%223%2F20250718%2F0%22; __ac_signature=_02B4Z6wo00f0132DnPgAAIDDxMn2ry05Hb99o5hAALck3a; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1536%2C%5C%22screen_height%5C%22%3A864%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A8%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A1.25%2C%5C%22effective_type%5C%22%3A%5C%223g%5C%22%2C%5C%22round_trip_time%5C%22%3A500%7D%22; volume_info=%7B%22isUserMute%22%3Atrue%2C%22isMute%22%3Atrue%2C%22volume%22%3A0.5%7D; home_can_add_dy_2_desktop=%221%22; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A1%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22; live_can_add_dy_2_desktop=%221%22; IsDouyinActive=false'
};
window.func_set_native(document.createElement)
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

createTagProto('Screen');
Screen.prototype = {
    availHeight: 824,
    availLeft: 0,
    availTop: 0,
    availWidth: 1536,
    colorDepth: 24,
    height: 864,
    isExtended: true,
    onchange: null,
    pixelDepth: 24,
    width: 1536
}
screen = {};
screen.__proto__ = Screen.prototype;

createTagProto('History');
history = {};
history.__proto__ = History.prototype;

chrome = {};

createTagProto('Storage', ['getItem', 'setItem', 'removeItem', 'clear']);
local = {

};
localStorage = {
    getItem: function (key) {
        dtavm.log('localStorage.getItem', key)
        if (!local[key]) {
            return null;
        }
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
        dtavm.log('sessionStorage.getItem', key)
        if (!local[key]) {
            return null;
        }
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
    },
    item: function item() {
        dtavm.log('item::', arguments)
        if (arguments[0] === 0) {
            return {
                type:'application/pdf'
            }
        }
        return {type:'text/pdf'}
    }
}
window.func_set_native(plugins0.item)
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
    },
    item: function item() {
        dtavm.log('item::', arguments)
        if (arguments[0] === 0) {
            return {
                type:'application/pdf'
            }
        }
        return {type:'text/pdf'}
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
    },
    item: function item() {
        dtavm.log('item::', arguments)
        if (arguments[0] === 0) {
            return {
                type:'application/pdf'
            }
        }
        return {type:'text/pdf'}
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
    },
    item: function item() {
        dtavm.log('item::', arguments)
        if (arguments[0] === 0) {
            return {
                type:'application/pdf'
            }
        }
        return {type:'text/pdf'}
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
    },
    item: function item() {
        dtavm.log('item::', arguments)
        if (arguments[0] === 0) {
            return {
                type:'application/pdf'
            }
        }
        return {type:'text/pdf'}
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

createTagProto('Navigator');
Navigator.prototype.plugins = plugins;
Navigator.prototype.webdriver = false;
Navigator.prototype.vendor = 'Google Inc.';
Navigator.prototype.platform = 'Win32';
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
navigator = {};
navigator.__proto__ = Navigator.prototype;

createTagProto('HTMLImageElement');
image = {};
image.__proto__ = HTMLImageElement.prototype;

createTagProto('HTMLElement');
Image = function Image() {
    dtavm.log('Image::', arguments)
    return image
}
window.func_set_native(Image)
document.createEvent = function createEvent() { }
window.func_set_native(document.createEvent)
CryptoJs = require_('crypto-js');

setProxyArr(['window','globalThis','document','global','location','navigator','screen','history','chrome','localStorage','sessionStorage'])
require_('./webmessdk.js');


function get_xb(sigua) {
    return window.byted_acrawler.frontierSign({
        "X-MS-STUB": CryptoJs.MD5(sigua.substring(1)).toString()
    })['X-Bogus']
}
sigua = ",live_id=1,aid=6383,version_code=180800,webcast_sdk_version=1.0.14-beta.0,room_id=7528066010578979584,sub_room_id=,sub_channel_id=,did_rule=3,user_unique_id=7463820862840931852,device_platform=web,device_type=,ac=,identity=audience"
dtavm._log(CryptoJs.MD5(sigua.substring(1)).toString())