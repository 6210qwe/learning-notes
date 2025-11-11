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
delete setImmediate;
delete clearImmediate;
delete SharedArrayBuffer;

const v8 = require_('v8');
const vm=require_('vm');
v8.setFlagsFromString('--allow-natives-syntax');
let undetectable = vm.runInThisContext("%GetUndetectable()");
v8.setFlagsFromString('--no-allow-natives-syntax');

dtavm = {}
dtavm.log = console.log
no_print = ['global','Buffer','process','require','module','exports','__filename','__dirname','setImmediate','clearImmediate','SharedArrayBuffer'];
no_console = ['window', 'globalThis'];
function setProxyArr(proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        const handler = `{
      get: function(target, property, receiver) {
        if(no_print.includes(property)){
            return undefined;
        }
        if(no_console.includes(property)){
            return target[property];
        }
        dtavm.log("方法:", "get  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]);
        return target[property];
      },
      set: function(target, property, value, receiver) {
        if(no_print.includes(property)){
            return undefined;
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
        eval(name__ + "=Object.prototype;");
    }
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
exports = undefined;
__dirname = undefined;
__filename = undefined;
clearImmediate = undefined;
SharedArrayBuffer = undefined;

createTagProto('Location');
location = {
    "ancestorOrigins": {},
    "href": "chrome://newtab/",
    "origin": "chrome://newtab",
    "protocol": "chrome:",
    "host": "newtab",
    "hostname": "newtab",
    "port": "",
    "pathname": "/",
    "search": "",
    "hash": ""
};

location.__proto__ = Location.prototype;
location.toString = function toString() {
    return this.href;
}

createTagProto('HTMLDocument');
createTagProto('Document',['createElement']);
createTagProto('Node',['removeChild']);
createTagProto(' EventTarget');

createTagProto('Element');
createTagProto('HTMLElement')
createTagProto('HTMLAnchorElement');
createA = {
    tagName: 'A',
    id: '',
    href:''
};
Object.defineProperty(createA, 'href', {
    get: function () {
        return location.href;
    },
    set: function () {
        return location.href;
    }
})

createA.__proto__ = HTMLAnchorElement.prototype;
createA.__proto__.__proto__ = HTMLElement.prototype;
createA.__proto__.__proto__.__proto__ = Element.prototype;
createA.__proto__.__proto__.__proto__.__proto__ = Node.prototype;
createA.__proto__.__proto__.__proto__.__proto__.__proto__ = EventTarget.prototype;

HTMLAnchorElement.__proto__ = HTMLElement;
HTMLAnchorElement.__proto__.__proto__ = Element;
HTMLAnchorElement.__proto__.__proto__.__proto__ = Node;
HTMLAnchorElement.__proto__.__proto__.__proto__.__proto__ = EventTarget;

HTMLElement.__proto__ = Element;
HTMLElement.__proto__.__proto__ = Node;
HTMLElement.__proto__.__proto__.__proto__ = EventTarget;

Element.__proto__ = Node;
Element.__proto__.__proto__ = EventTarget;

Node.__proto__ = EventTarget;

createTagProto('HTMLInputElement');
input = {
    tagName: 'INPUT',
    type: 'text',
    id: '',
    value:''
};
input.__proto__ = HTMLInputElement.prototype;
input.__proto__.__proto__ = HTMLElement.prototype;
input.__proto__.__proto__.__proto__ = Element.prototype;
input.__proto__.__proto__.__proto__.__proto__ = Node.prototype;
input.__proto__.__proto__.__proto__.__proto__.__proto__ = EventTarget.prototype;

HTMLInputElement.__proto__ = HTMLElement;
HTMLInputElement.__proto__.__proto__ = Element;
HTMLInputElement.__proto__.__proto__.__proto__ = Node;
HTMLInputElement.__proto__.__proto__.__proto__.__proto__ = EventTarget;


createTagProto('HTMLAllCollection');
all = undetectable;
all.__proto__ = HTMLAllCollection.prototype;
all.length = 153;

createTagProto('HTMLDivElement');
div = {
    numc:0
};
div.__proto__ = HTMLDivElement.prototype;

div.__proto__ = HTMLDivElement.prototype;
div.__proto__.__proto__ = HTMLElement.prototype;
div.__proto__.__proto__.__proto__ = Element.prototype;
div.__proto__.__proto__.__proto__.__proto__ = Node.prototype;
div.__proto__.__proto__.__proto__.__proto__.__proto__ = EventTarget.prototype;

function get_create_div() {
    div.numc = div.numc + 1;
    return div;
}

HTMLDivElement.__proto__ = HTMLElement;
HTMLDivElement.__proto__.__proto__ = Element;
HTMLDivElement.__proto__.__proto__.__proto__ = Node;
HTMLDivElement.__proto__.__proto__.__proto__.__proto__ = EventTarget;


createTagProto('HTMLBodyElement');
body = {
    childElementCount: 5,
    removeChild: function removeChild() {
        dtavm.log('removeChild:::', arguments)
        this.childElementCount = this.childElementCount - 1;

        delete document.all.xuxu;
        window.xuxu = undefined;
        // dtavm.log('removeChild之后xuxu:','xuxu' in document.all)
        return createA;
    },
    appendChild: function appendChild() {
        if (arguments[0] === createA) {
            document.all.xuxu = createA;
            window.xuxu = createA;
        }
    }
};
window.func_set_native(body.removeChild);

body.__proto__ = HTMLBodyElement.prototype;
body.__proto__.__proto__ = HTMLElement.prototype;
body.__proto__.__proto__.__proto__ = Element.prototype;
body.__proto__.__proto__.__proto__.__proto__ = Node.prototype;
body.__proto__.__proto__.__proto__.__proto__.__proto__ = EventTarget.prototype;

HTMLBodyElement.__proto__ = HTMLElement;
HTMLBodyElement.__proto__.__proto__ = Element;
HTMLBodyElement.__proto__.__proto__.__proto__ = Node;
HTMLBodyElement.__proto__.__proto__.__proto__.__proto__ = EventTarget;

all_divs = [div, null, {}];
Document.prototype.defaultView = window;
Node.ATTRIBUTE_NODE = 2;
Document.CDATA_SECTION_NODE = 4;
HTMLDocument.DOCUMENT_NODE = 9;
document = {
    all:all,
    body:body,
    createElement: function createElement() {
        dtavm.log('createElement:::', arguments)
        debugger;
        if (arguments[0] === 'a') {
            return createA
        }
        if (arguments[0] === 'input') {
            return input
        }
        if (arguments[0] === 'div') {
            res = all_divs.pop(0);
            if (res === div) {
                document.all.length += 1
            }
            return res
        }
    },
    URL: 'chrome://newtab/',
    readyState: 'complete',
    adoptNode:function adoptNode(){},
    appendChild:function appendChild(){}
};
window.func_set_native(document.createElement);

document.__proto__ = HTMLDocument.prototype;
document.__proto__.__proto__ = Document.prototype;
document.__proto__.__proto__.__proto__ = Node.prototype;
document.__proto__.__proto__.__proto__.__proto__ = EventTarget.prototype;

HTMLDocument.__proto__ = Document;
HTMLDocument.__proto__.__proto__ = Node;
HTMLDocument.__proto__.__proto__.__proto__ = EventTarget;

Document.__proto__ = Node;
Document.__proto__.__proto__ = EventTarget;

createTagProto('Navigator');
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
Navigator.prototype.appVersion = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
Navigator.prototype.appName = 'Netscape';
Navigator.prototype.appCodeName = 'Mozilla';
Navigator.prototype.vendor = 'Google Inc.';

navigator = {};
navigator.__proto__ = Navigator.prototype;

createTagProto('Screen');
Screen.prototype = {
    availWidth: 1536,
    availHeight: 824,
    availLeft: 0,
    availTop: 0
};
screen = {};
screen.__proto__ = Screen.prototype;

chrome = {
    loadTimes: function () { },
    csi: function () { },
    runtime: {},
    send: function () { },
    getVariableValue: function () { },
    timeTicks:{}
}
window.func_set_native(chrome.csi);
window.func_set_native(chrome.loadTimes);
Object.defineProperty(chrome.csi, 'name', {
    value: ''
});

createTagProto('Navigation');
createTagProto('HTMLCollection');

boolc_xuxu = ['undefined','object', 'object'];
eval_ = eval;
eval = function eval() {
    let res = eval_(arguments[0]);
    if (arguments[0] === 'typeof exports') {
        return undefined;
    }
    if (arguments[0] === 'typeof __dirname') {
        return undefined;
    }
    if (arguments[0] === 'typeof __filename') {
        return undefined;
    }
    if (arguments[0] === 'typeof xuxu') {
        res = boolc_xuxu.pop(0);
        dtavm.log('eval:::', arguments[0], res)
        return res;
    }
    dtavm.log('eval:::', arguments[0],res)
    return res;
}

Object.getOwnPropertyDescriptor_ = Object.getOwnPropertyDescriptor;
Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(){
    if (arguments[1] === 'all') {
        return undefined;
    }
    return Object.getOwnPropertyDescriptor_.apply(this.arguments);
}


// setProxyArr(['window', 'globalThis', 'top','document', 'document.body', 'location','div','input','document.all','screen','navigator']);
require_('./miaomiaodun.js');