process_ = process;
require_ = require;
delete Buffer;
// delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
delete setImmediate;
// delete clearImmediate;
delete SharedArrayBuffer;

dtavm = {
    log : console.log,
    // log: function () { },
    _log : console.log
}

no_print = ['window', 'globalThis','navigator','top','self','plugins','__proto__'];
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


createTagProto('EventTarget');
createTagProto('WindowProperties');
createTagProto('Window');

window = global;
window.__proto__ = Window.prototype;
window.__proto__.__proto__ = WindowProperties.prototype;
window.__proto__.__proto__.__proto__ = EventTarget.prototype;
Window.__proto__ = EventTarget;

Object.defineProperties(window, {
    [Symbol.toStringTag]: {
        value: 'window',
        configurable: true
    }
});

Object.defineProperty(window, 'WindowProperties', {
    get: function () {
        return undefined;
    }
})

window.outerHeight = 831;
window.outerWidth = 784;
window.DeviceOrientationEvent = function(){
    debugger
}
window.func_set_native(DeviceOrientationEvent)
window.DeviceMotionEvent = function(){
    debugger
}
window.func_set_native(DeviceMotionEvent)

createTagProto('Node');
createTagProto('Element');
createTagProto('HTMLElement');

HTMLElement.__proto__ = Element;
HTMLElement.__proto__.__proto__ = Node;
HTMLElement.__proto__.__proto__.__proto__ = EventTarget;

Element.__proto__ = Node;
Element.__proto__.__proto__ = EventTarget;

Node.__proto__ = EventTarget;

createTagProto('HTMLDocument');
createTagProto('Document');
document = {
    getElementById: function(){
        debugger
    },
    cookie: '_nano_fp=XpmyX5dynqCjX0dxn9_yttW39KwQu0rDei61ixOx',
    referrer: 'https://pinduoduo.com/home/furniture/',
    addEventListener: function(){
    }
};

window.func_set_native(document.getElementById)
window.func_set_native(document.addEventListener)

document.__proto__ = HTMLDocument.prototype;
document.__proto__.__proto__ = Document.prototype;
document.__proto__.__proto__.__proto__ = Node.prototype;
document.__proto__.__proto__.__proto__.__proto__ = EventTarget.prototype;

createTagProto('Navigator');
navigator = {
    webdriver: false,
    languages: ['zh-CN', 'en-US', 'zh'],
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    plugins: [{}, {}, {}, {}, {}]
};
navigator.hasOwnProperty = function hasOwnProperty() {
    // console.log("调用了navigator.hasOwnProperty--->参数", arguments)
    if (arguments[0] === 'prototype') {
        return false
    } else if (arguments[0] === 'webdriver') {
        return false
    }
};
window.func_set_native(navigator.hasOwnProperty);
navigator.__proto__ = Navigator.prototype;

createTagProto('Location');
location = {
    href: 'https://pinduoduo.com/home/baby/',
    port: ''
};
location.__proto__ = Location.prototype;


createTagProto('Storage')
localStorage = {
    getItem: function(key){
        return this[key]
    },
    setItem: function(key, value){
        this[key] = value
    },
    _nano_fp: 'XpmyX5dynqCjX0dxn9_yttW39KwQu0rDei61ixOx'
};
window.func_set_native(localStorage.getItem)
window.func_set_native(localStorage.setItem)
localStorage.__proto__ = Storage.prototype;

createTagProto('History')
history = {
    back: function(){
        debugger
    }
};
window.func_set_native(history.back)
history.__proto__ = History.prototype;

createTagProto('Screen')
screen = {
    availWidth: 1536,
    availHeight: 824,
};
screen.__proto__ = Screen.prototype;

chrome = {}

// setProxyArr(['window', 'document', 'navigator', 'location', 'localStorage', 'sessionStorage', 'history', 'screen', 'chrome'])

require_('./code.js')

i = window.l_l("fbeZ")
r = new i({
    serverTime: new Date().getTime()
})
// debugger
 r.messagePackSync().then(res=>{
     console.log(res)
 })

