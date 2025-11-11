// hook 打印函数

;
;
;
;
;
;
;
;
;
;
;
;
;
XXY = {}
XXY.log = function () {
}
XXY.clear = console.clear;

require_ = require;
process_ = process;

//函数toSting 保护
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
    globalThis.func_set_native = function (func) {
        set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, func.name || ''}() { [native code] }`)
    }
}).call(this);

function obj_toString(obj, name) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: name
    });
    Object.defineProperties(obj, {
        [Symbol.toStringTag]: {
            value: name
        }
    })
};

if (typeof clearImmediate != 'undefined') {
    clearImmediate = undefined
}
if (typeof setImmediate != 'undefined') {
    setImmediate = undefined
}

Window = function Window() {
    debugger;
};
func_set_native(Window);

window = globalThis;
top = self = window;
outerHeight = 1040;
outerWidth = 1920;
innerHeight = 919;
innerWidth = 1920;
screenLeft = 0;
screenTop = 0;
innerWidth = 1920;
addEventListener = function addEventListener() {
    debugger;
};
func_set_native(addEventListener);

obj_toString(window, "Window");
Object.setPrototypeOf(window, Window.prototype);

HTMLDocument = function HTMLDocument() {
    debugger;
};
func_set_native(HTMLDocument);
HTMLHtmlElement = function HTMLHtmlElement() {
    debugger;
};
func_set_native(HTMLHtmlElement);
documentElement = {
    "getAttribute": function getAttribute(arg) {
        XXY.log("documentElement.getAttribute", arguments);
        if (arg === 'webdriver') {
            return null
        }
        if (arg === 'driver') {
            return null
        }
        if (arg === 'selenium') {
            return null
        }
        if (arg === 'name') {
            return null
        }
        if (arg === 'content') {
            return null
        }


    }

};
func_set_native(documentElement.getAttribute);
obj_toString(documentElement, "HTMLHtmlElement");
Object.setPrototypeOf(documentElement, HTMLHtmlElement.prototype);

document = {
    "readyState": 'complete',
    "referrer": '',
    "title": '顶象验证码 - 智能无感验证_滑动拼图验证｢免费体验｣'
};
HTMLCollection = function HTMLCollection() {
    debugger;
};
func_set_native(HTMLCollection);

meta_0 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_0.getAttribute", arguments);
        if (args === "name") {
            return null
        } else if (args === 'content') {
            return null
        }
    }
};
meta_1 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_1.getAttribute", arguments);
        if (args === "name") {
            return 'keywords'
        } else if (args === 'content') {
            return '智能无感验证,验证码,滑动拼图验证码,滑块验证码,行为验证码'
        }
    }
};
meta_2 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_2.getAttribute", arguments);
        if (args === "name") {
            return 'description'
        } else if (args === 'content') {
            return '顶象验证码,以设备环境､行为特征等多风险判断要素,通过智能无感验证､滑动拼图验证等13种验证方式,帮助客户进行人机风险防控,阻挡机器风险行为.免费体验!'
        }
    }
};
meta_3 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_3.getAttribute", arguments);
        if (args === "name") {
            return 'viewport'
        } else if (args === 'content') {
            return 'width=1280,initial-scale=0.2'
        }
    }
};
meta_4 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_4.getAttribute", arguments);
        if (args === "name") {
            return 'format-detection'
        } else if (args === 'content') {
            return 'telephone=no,address=no,email=no'
        }
    }
};

meta_5 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_5.getAttribute", arguments);
        if (args === "name") {
            return 'apple-mobile-web-app-capable'
        } else if (args === 'content') {
            return 'yes'
        }
    }
};
meta_6 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_6.getAttribute", arguments);
        if (args === "name") {
            return 'apple-mobile-web-app-status-bar-style'
        } else if (args === 'content') {
            return 'black'
        }
    }
};
meta_7 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_7.getAttribute", arguments);
        if (args === "name") {
            return null
        } else if (args === 'content') {
            return 'IE=edge,chrome=1'
        }
    }
};
meta_8 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_8.getAttribute", arguments);
        if (args === "name") {
            return 'renderer'
        } else if (args === 'content') {
            return 'webkit'
        }
    }
};
meta_9 = {
    "getAttribute": function getAttribute(args) {
        XXY.log("meta_9.getAttribute", arguments);
        if (args === "name") {
            return 'baidu-site-verification'
        } else if (args === 'content') {
            return 'codeva-AlwGd8jNSD'
        }
    }
};

meta_ = {
    "0": meta_0,
    "1": meta_1,
    "2": meta_2,
    "3": meta_3,
    "4": meta_4,
    "5": meta_5,
    "6": meta_6,
    "7": meta_7,
    "8": meta_8,
    "9": meta_9,
    "length": 10
};
obj_toString(meta_, "HTMLCollection");
Object.setPrototypeOf(meta_, HTMLCollection.prototype);


head_0 = {
    "innerHTML": {"length": 155594}
}
head = {
    "0": head_0,
    "length": 1
};

head_ = {
    "innerHTML": {"length": 155594}
}
document.getElementsByTagName = function getElementsByTagName() {
    XXY.log("document.getElementsByTagName", arguments);
    let args = arguments[0];
    if (args === 'meta') {
        return meta_
    } else if (args === 'head') {
        return head
    }
}

body_ = {
    "appendChild": function appendChild() {
        XXY.log("body_.appendChild", arguments);
        return arguments[0]
    },
    "removeChild": function removeChild() {
        XXY.log("body_.removeChild", arguments);
        return arguments[0]
    },
    "innerHTML": {
        "length": "143180", "substr": function substr() {
            XXY.log("body_.innerHTML.substr", arguments)
            return {}
        }
    }

};
func_set_native(body_.appendChild);
func_set_native(body_.removeChild);
document.body = body_
document.head = head_


document.addEventListener = function addEventListener() {
}
func_set_native(document.addEventListener);

style_iframe = {};
iframe = {
    "style": style_iframe,
    "contentWindow": new Proxy({}, {
        get: function (target, property) {
            debugger
            // 如果属性存在于window上，返回window的属性
            if (property in window) {
                if (property + '' === 'top') {
                    top_ = watches_dom({}, "contentWindow.top")
                    return top_;
                }
                return window[property];
            }
            // 否则返回undefined或者自定义的默认值
            return undefined;
        },
        set: function (target, property, value) {
            debugger
            // 如果属性存在于window上，设置window的属性
            if (property in window) {
                window[property] = value;
            } else {
                // 否则设置到fakeWindow上
                target[property] = value;
            }
            return true;
        }

    })
};
document.createElement = function createElement(tag_name) {
    XXY.log("document.createElement", arguments);
    if (tag_name === 'iframe') {
        return iframe
    }
}
func_set_native(document.createElement);

document.documentElement = documentElement
obj_toString(document, "HTMLDocument");
Object.setPrototypeOf(document, HTMLDocument.prototype);


Navigator = function Navigator() {
    debugger;
};
func_set_native(Navigator);
Navigator.prototype.platform = 'Win32';
Navigator.prototype.webdriver = false;
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36';
navigator = {};
obj_toString(navigator, "Navigator");
Object.setPrototypeOf(navigator, Navigator.prototype);


Screen = function Screen() {
    debugger;
};
func_set_native(Screen);
screen = {
    "width": 1920,
    "height": 1080,
    "availWidth": 1920,
    "availHeight": 1040,
};
obj_toString(screen, "Screen");
Object.setPrototypeOf(screen, Screen.prototype);

Location = function Location() {
    debugger;
};
func_set_native(Location);
location = {
    "href": 'https://www.dingxiang-inc.com/business/captcha'
};
obj_toString(location, "Location");
Object.setPrototypeOf(location, Location.prototype);

function watches(obj, objname, type) {
    function getMethodHandler(WatchName, target_obj) {
        let methodhandler = {
            apply(target, thisArg, argArray) {
                if (this.target_obj) {
                    thisArg = this.target_obj
                }
                let result = Reflect.apply(target, thisArg, argArray)
                if (target.name !== "toString") {
                    if (target.name === "addEventListener") {
                        XXY.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`)
                    } else if (WatchName === "window.console") {
                    } else {
                        if (target.name !== 'parseInt') {
                            XXY.log(`调用者 => [${WatchName}] 函数名1 => [${target.name}], 传参 => [${argArray}], 结果 => [${result}].`)
                        }
                        // if (target.name !== 'bufferData') {
                        //     //debugger;
                        // }

                    }
                } else {
                    XXY.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${result}].`)
                }
                return result
            },
            construct(target, argArray, newTarget) {
                var result = Reflect.construct(target, argArray, newTarget)
                XXY.log(`调用者 => [${WatchName}] 构造函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${(result)}].`)
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
                        if (propKey === 'String') {

                        } else {
                            XXY.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}] , 是个函数`)

                        }
                        return new Proxy(result, getMethodHandler(WatchName, target))
                    } else {
                        XXY.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}], 结果 => [${(result)}]`);
                    }
                    return new Proxy(result, getObjhandler(`${WatchName}.${propKey}`))
                }
                if (typeof (propKey) !== "symbol") {
                    XXY.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey?.description ?? propKey}], 结果 => [${result}]`);
                }
                return result;
            },
            set(target, propKey, value, receiver) {
                if (value instanceof Object) {
                    XXY.log(`调用者 => [${WatchName}] 设置属性名 => [${propKey}], 值为 => [${(value)}]`);
                } else {
                    XXY.log(`调用者 => [${WatchName}] 设置属性名 => [${propKey}], 值为 => [${value}]`);
                }
                return Reflect.set(target, propKey, value, receiver);
            },
            has(target, propKey) {
                var result = Reflect.has(target, propKey);
                XXY.log(`针对in操作符的代理has=> [${WatchName}] 有无属性名 => [${propKey}], 结果 => [${result}]`)
                //debugger;
                return result;
            },
            deleteProperty(target, propKey) {
                var result = Reflect.deleteProperty(target, propKey);
                XXY.log(`拦截属性delete => [${WatchName}] 删除属性名 => [${propKey}], 结果 => [${result}]`)
                return result;
            },
            defineProperty(target, propKey, attributes) {
                var result = Reflect.defineProperty(target, propKey, attributes);
                XXY.log(`拦截对象define操作 => [${WatchName}] 待检索属性名 => [${propKey.toString()}] 属性描述 => [${(attributes)}], 结果 => [${result}]`)
                // //debugger
                return result
            },
            getPrototypeOf(target) {
                var result = Reflect.getPrototypeOf(target)
                XXY.log(`被代理的目标对象 => [${WatchName}] 代理结果 => [${(result)}]`)
                return result;
            },
            setPrototypeOf(target, proto) {
                XXY.log(`被拦截的目标对象 => [${WatchName}] 对象新原型==> [${(proto)}]`)
                return Reflect.setPrototypeOf(target, proto);
            },
            preventExtensions(target) {
                XXY.log(`方法用于设置preventExtensions => [${WatchName}] 防止扩展`)
                return Reflect.preventExtensions(target);
            },
            isExtensible(target) {
                var result = Reflect.isExtensible(target)
                XXY.log(`拦截对对象的isExtensible() => [${WatchName}] isExtensible, 返回值==> [${result}]`)
                return result;
            },
        }
        return handler;
    }

    if (type === "method") {
        return new Proxy(obj, getMethodHandler(objname, obj));
    }
    return new Proxy(obj, getObjhandler(objname));
};


///
// window = watches(window, "window");
// document = watches(document, "document");
// documentElement = watches(documentElement, "documentElement");
// navigator = watches(navigator, "navigator");
// screen = watches(screen, "screen");
// location = watches(location, "location");
// body_ = watches(body_, "body_");
// iframe = watches(iframe, "iframe");
// style_iframe = watches(style_iframe, "style_iframe");
// meta_ = watches(meta_, "meta_");
// meta_0 = watches(meta_0, "meta_0");
// head = watches(head, "head");
// head_0 = watches(head_0, "head_0");
//
// head_ = watches(head_, "head_");
Object.defineProperty(window, "top", {
    configurable: false,
    enumerable: true,
    set: undefined,
    get: function top() {
        return window
    }
})
Object.defineProperty(window, "self", {
    configurable: false,
    enumerable: true,
    set: undefined,
    get: function self() {
        return window
    }
})

require("D:\\JS逆向代码\\北哥星球\\Web逆向-顶象滑块\\顶象滑块\\js_code\\init_js.js");


function getAc(x, y, sid) {
    let mousemove = [
    {
        "pageX": 691,
        "pageY": 731
    },
    {
        "pageX": 1130,
        "pageY": 142
    },
    {
        "pageX": 797,
        "pageY": 222
    },
    {
        "pageX": 388,
        "pageY": 188
    },
    {
        "pageX": 346,
        "pageY": 263
    },
    {
        "pageX": 293,
        "pageY": 446
    },
    {
        "pageX": 162,
        "pageY": 368
    },
    {
        "pageX": 488,
        "pageY": 151
    },
    {
        "pageX": 340,
        "pageY": 82
    },
    {
        "pageX": 299,
        "pageY": 169
    },
    {
        "pageX": 410,
        "pageY": 509
    },
    {
        "pageX": 912,
        "pageY": 186
    },
    {
        "pageX": 1100,
        "pageY": 163
    },
    {
        "pageX": 1295,
        "pageY": 291
    },
    {
        "pageX": 1233,
        "pageY": 213
    },
    {
        "pageX": 900,
        "pageY": 195
    },
    {
        "pageX": 543,
        "pageY": 150
    },
    {
        "pageX": 431,
        "pageY": 85
    },
    {
        "pageX": 504,
        "pageY": 14
    },
    {
        "pageX": 160,
        "pageY": 191
    },
    {
        "pageX": 657,
        "pageY": 167
    },
    {
        "pageX": 84,
        "pageY": 403
    },
    {
        "pageX": 380,
        "pageY": 261
    },
    {
        "pageX": 317,
        "pageY": 302
    },
    {
        "pageX": 403,
        "pageY": 608
    },
    {
        "pageX": 840,
        "pageY": 587
    },
    {
        "pageX": 791,
        "pageY": 600
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 793,
        "pageY": 595
    },
    {
        "pageX": 796,
        "pageY": 595
    },
    {
        "pageX": 796,
        "pageY": 595
    },
    {
        "pageX": 796,
        "pageY": 595
    },
    {
        "pageX": 796,
        "pageY": 595
    },
    {
        "pageX": 796,
        "pageY": 595
    },
    {
        "pageX": 796,
        "pageY": 595
    },
    {
        "pageX": 796,
        "pageY": 595
    },
    {
        "pageX": 798,
        "pageY": 595
    },
    {
        "pageX": 798,
        "pageY": 595
    },
    {
        "pageX": 798,
        "pageY": 595
    },
    {
        "pageX": 798,
        "pageY": 595
    },
    {
        "pageX": 798,
        "pageY": 595
    },
    {
        "pageX": 798,
        "pageY": 595
    },
    {
        "pageX": 798,
        "pageY": 595
    },
    {
        "pageX": 804,
        "pageY": 595
    },
    {
        "pageX": 804,
        "pageY": 595
    },
    {
        "pageX": 804,
        "pageY": 595
    },
    {
        "pageX": 804,
        "pageY": 595
    },
    {
        "pageX": 804,
        "pageY": 595
    },
    {
        "pageX": 804,
        "pageY": 595
    },
    {
        "pageX": 804,
        "pageY": 595
    },
    {
        "pageX": 812,
        "pageY": 595
    },
    {
        "pageX": 812,
        "pageY": 595
    },
    {
        "pageX": 812,
        "pageY": 595
    },
    {
        "pageX": 812,
        "pageY": 595
    },
    {
        "pageX": 812,
        "pageY": 595
    },
    {
        "pageX": 812,
        "pageY": 595
    },
    {
        "pageX": 812,
        "pageY": 595
    },
    {
        "pageX": 824,
        "pageY": 595
    },
    {
        "pageX": 824,
        "pageY": 595
    },
    {
        "pageX": 824,
        "pageY": 595
    },
    {
        "pageX": 824,
        "pageY": 595
    },
    {
        "pageX": 824,
        "pageY": 595
    },
    {
        "pageX": 824,
        "pageY": 595
    },
    {
        "pageX": 824,
        "pageY": 595
    },
    {
        "pageX": 837,
        "pageY": 595
    },
    {
        "pageX": 837,
        "pageY": 595
    },
    {
        "pageX": 837,
        "pageY": 595
    },
    {
        "pageX": 837,
        "pageY": 595
    },
    {
        "pageX": 837,
        "pageY": 595
    },
    {
        "pageX": 837,
        "pageY": 595
    },
    {
        "pageX": 837,
        "pageY": 595
    },
    {
        "pageX": 851,
        "pageY": 595
    },
    {
        "pageX": 851,
        "pageY": 595
    },
    {
        "pageX": 851,
        "pageY": 595
    },
    {
        "pageX": 851,
        "pageY": 595
    },
    {
        "pageX": 851,
        "pageY": 595
    },
    {
        "pageX": 851,
        "pageY": 595
    },
    {
        "pageX": 851,
        "pageY": 595
    },
    {
        "pageX": 865,
        "pageY": 595
    },
    {
        "pageX": 865,
        "pageY": 595
    },
    {
        "pageX": 865,
        "pageY": 595
    },
    {
        "pageX": 865,
        "pageY": 595
    },
    {
        "pageX": 865,
        "pageY": 595
    },
    {
        "pageX": 865,
        "pageY": 595
    },
    {
        "pageX": 865,
        "pageY": 595
    },
    {
        "pageX": 880,
        "pageY": 595
    },
    {
        "pageX": 880,
        "pageY": 595
    },
    {
        "pageX": 880,
        "pageY": 595
    },
    {
        "pageX": 880,
        "pageY": 595
    },
    {
        "pageX": 880,
        "pageY": 595
    },
    {
        "pageX": 880,
        "pageY": 595
    },
    {
        "pageX": 880,
        "pageY": 595
    },
    {
        "pageX": 894,
        "pageY": 595
    },
    {
        "pageX": 894,
        "pageY": 595
    },
    {
        "pageX": 894,
        "pageY": 595
    },
    {
        "pageX": 894,
        "pageY": 595
    },
    {
        "pageX": 894,
        "pageY": 595
    },
    {
        "pageX": 894,
        "pageY": 595
    },
    {
        "pageX": 894,
        "pageY": 595
    },
    {
        "pageX": 907,
        "pageY": 595
    },
    {
        "pageX": 907,
        "pageY": 595
    },
    {
        "pageX": 907,
        "pageY": 595
    },
    {
        "pageX": 907,
        "pageY": 595
    },
    {
        "pageX": 907,
        "pageY": 595
    },
    {
        "pageX": 907,
        "pageY": 595
    },
    {
        "pageX": 907,
        "pageY": 595
    },
    {
        "pageX": 919,
        "pageY": 595
    },
    {
        "pageX": 919,
        "pageY": 595
    },
    {
        "pageX": 919,
        "pageY": 595
    },
    {
        "pageX": 919,
        "pageY": 595
    },
    {
        "pageX": 919,
        "pageY": 595
    },
    {
        "pageX": 919,
        "pageY": 595
    },
    {
        "pageX": 919,
        "pageY": 595
    },
    {
        "pageX": 930,
        "pageY": 595
    },
    {
        "pageX": 930,
        "pageY": 595
    },
    {
        "pageX": 930,
        "pageY": 595
    },
    {
        "pageX": 930,
        "pageY": 595
    },
    {
        "pageX": 930,
        "pageY": 595
    },
    {
        "pageX": 930,
        "pageY": 595
    },
    {
        "pageX": 930,
        "pageY": 595
    },
    {
        "pageX": 939,
        "pageY": 595
    },
    {
        "pageX": 939,
        "pageY": 595
    },
    {
        "pageX": 939,
        "pageY": 595
    },
    {
        "pageX": 939,
        "pageY": 595
    },
    {
        "pageX": 939,
        "pageY": 595
    },
    {
        "pageX": 939,
        "pageY": 595
    },
    {
        "pageX": 939,
        "pageY": 595
    },
    {
        "pageX": 947,
        "pageY": 595
    },
    {
        "pageX": 947,
        "pageY": 595
    },
    {
        "pageX": 947,
        "pageY": 595
    },
    {
        "pageX": 947,
        "pageY": 595
    },
    {
        "pageX": 947,
        "pageY": 595
    },
    {
        "pageX": 947,
        "pageY": 595
    },
    {
        "pageX": 947,
        "pageY": 595
    },
    {
        "pageX": 951,
        "pageY": 595
    },
    {
        "pageX": 951,
        "pageY": 595
    },
    {
        "pageX": 951,
        "pageY": 595
    },
    {
        "pageX": 951,
        "pageY": 595
    },
    {
        "pageX": 951,
        "pageY": 595
    },
    {
        "pageX": 951,
        "pageY": 595
    },
    {
        "pageX": 951,
        "pageY": 595
    },
    {
        "pageX": 954,
        "pageY": 595
    },
    {
        "pageX": 954,
        "pageY": 595
    },
    {
        "pageX": 954,
        "pageY": 595
    },
    {
        "pageX": 954,
        "pageY": 595
    },
    {
        "pageX": 954,
        "pageY": 595
    },
    {
        "pageX": 954,
        "pageY": 595
    },
    {
        "pageX": 954,
        "pageY": 595
    },
    {
        "pageX": 957,
        "pageY": 595
    },
    {
        "pageX": 957,
        "pageY": 595
    },
    {
        "pageX": 957,
        "pageY": 595
    },
    {
        "pageX": 957,
        "pageY": 595
    },
    {
        "pageX": 957,
        "pageY": 595
    },
    {
        "pageX": 957,
        "pageY": 595
    },
    {
        "pageX": 957,
        "pageY": 595
    },
    {
        "pageX": 958,
        "pageY": 595
    },
    {
        "pageX": 958,
        "pageY": 595
    },
    {
        "pageX": 958,
        "pageY": 595
    },
    {
        "pageX": 958,
        "pageY": 595
    },
    {
        "pageX": 958,
        "pageY": 595
    },
    {
        "pageX": 958,
        "pageY": 595
    },
    {
        "pageX": 958,
        "pageY": 595
    },
    {
        "pageX": 959,
        "pageY": 595
    },
    {
        "pageX": 959,
        "pageY": 595
    },
    {
        "pageX": 959,
        "pageY": 595
    },
    {
        "pageX": 959,
        "pageY": 595
    },
    {
        "pageX": 959,
        "pageY": 595
    },
    {
        "pageX": 959,
        "pageY": 595
    },
    {
        "pageX": 959,
        "pageY": 595
    },
    {
        "pageX": 959,
        "pageY": 595
    },
    {
        "pageX": 960,
        "pageY": 595
    },
    {
        "pageX": 960,
        "pageY": 595
    },
    {
        "pageX": 960,
        "pageY": 595
    },
    {
        "pageX": 960,
        "pageY": 595
    },
    {
        "pageX": 960,
        "pageY": 595
    },
    {
        "pageX": 960,
        "pageY": 595
    },
    {
        "pageX": 960,
        "pageY": 595
    },
    {
        "pageX": 961,
        "pageY": 595
    },
    {
        "pageX": 961,
        "pageY": 595
    },
    {
        "pageX": 961,
        "pageY": 595
    },
    {
        "pageX": 961,
        "pageY": 595
    },
    {
        "pageX": 961,
        "pageY": 595
    },
    {
        "pageX": 961,
        "pageY": 595
    },
    {
        "pageX": 961,
        "pageY": 595
    },
    {
        "pageX": 962,
        "pageY": 595
    },
    {
        "pageX": 962,
        "pageY": 595
    },
    {
        "pageX": 962,
        "pageY": 595
    },
    {
        "pageX": 962,
        "pageY": 595
    },
    {
        "pageX": 962,
        "pageY": 595
    },
    {
        "pageX": 962,
        "pageY": 595
    },
    {
        "pageX": 962,
        "pageY": 595
    },
    {
        "pageX": 963,
        "pageY": 595
    },
    {
        "pageX": 963,
        "pageY": 595
    },
    {
        "pageX": 963,
        "pageY": 595
    },
    {
        "pageX": 963,
        "pageY": 595
    },
    {
        "pageX": 963,
        "pageY": 595
    },
    {
        "pageX": 963,
        "pageY": 595
    },
    {
        "pageX": 963,
        "pageY": 595
    },
    {
        "pageX": 964,
        "pageY": 595
    },
    {
        "pageX": 964,
        "pageY": 595
    },
    {
        "pageX": 964,
        "pageY": 595
    },
    {
        "pageX": 964,
        "pageY": 595
    },
    {
        "pageX": 964,
        "pageY": 595
    },
    {
        "pageX": 964,
        "pageY": 595
    },
    {
        "pageX": 964,
        "pageY": 595
    },
    {
        "pageX": 966,
        "pageY": 595
    },
    {
        "pageX": 966,
        "pageY": 595
    },
    {
        "pageX": 966,
        "pageY": 595
    },
    {
        "pageX": 966,
        "pageY": 595
    },
    {
        "pageX": 966,
        "pageY": 595
    },
    {
        "pageX": 966,
        "pageY": 595
    },
    {
        "pageX": 966,
        "pageY": 595
    },
    {
        "pageX": 967,
        "pageY": 595
    },
    {
        "pageX": 967,
        "pageY": 595
    },
    {
        "pageX": 967,
        "pageY": 595
    },
    {
        "pageX": 967,
        "pageY": 595
    },
    {
        "pageX": 967,
        "pageY": 595
    },
    {
        "pageX": 967,
        "pageY": 595
    },
    {
        "pageX": 967,
        "pageY": 595
    },
    {
        "pageX": 970,
        "pageY": 594
    },
    {
        "pageX": 970,
        "pageY": 594
    },
    {
        "pageX": 970,
        "pageY": 594
    },
    {
        "pageX": 970,
        "pageY": 594
    },
    {
        "pageX": 970,
        "pageY": 594
    },
    {
        "pageX": 970,
        "pageY": 594
    },
    {
        "pageX": 970,
        "pageY": 594
    },
    {
        "pageX": 972,
        "pageY": 594
    },
    {
        "pageX": 972,
        "pageY": 594
    },
    {
        "pageX": 972,
        "pageY": 594
    },
    {
        "pageX": 972,
        "pageY": 594
    },
    {
        "pageX": 972,
        "pageY": 594
    },
    {
        "pageX": 972,
        "pageY": 594
    },
    {
        "pageX": 972,
        "pageY": 594
    },
    {
        "pageX": 976,
        "pageY": 593
    },
    {
        "pageX": 976,
        "pageY": 593
    },
    {
        "pageX": 976,
        "pageY": 593
    },
    {
        "pageX": 976,
        "pageY": 593
    },
    {
        "pageX": 976,
        "pageY": 593
    },
    {
        "pageX": 976,
        "pageY": 593
    },
    {
        "pageX": 976,
        "pageY": 593
    },
    {
        "pageX": 981,
        "pageY": 592
    },
    {
        "pageX": 981,
        "pageY": 592
    },
    {
        "pageX": 981,
        "pageY": 592
    },
    {
        "pageX": 981,
        "pageY": 592
    },
    {
        "pageX": 981,
        "pageY": 592
    },
    {
        "pageX": 981,
        "pageY": 592
    },
    {
        "pageX": 981,
        "pageY": 592
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 590
    },
    {
        "pageX": 994,
        "pageY": 590
    },
    {
        "pageX": 994,
        "pageY": 590
    },
    {
        "pageX": 994,
        "pageY": 590
    },
    {
        "pageX": 994,
        "pageY": 590
    },
    {
        "pageX": 994,
        "pageY": 590
    },
    {
        "pageX": 994,
        "pageY": 590
    },
    {
        "pageX": 1002,
        "pageY": 588
    },
    {
        "pageX": 1002,
        "pageY": 588
    },
    {
        "pageX": 1002,
        "pageY": 588
    },
    {
        "pageX": 1002,
        "pageY": 588
    },
    {
        "pageX": 1002,
        "pageY": 588
    },
    {
        "pageX": 1002,
        "pageY": 588
    },
    {
        "pageX": 1002,
        "pageY": 588
    },
    {
        "pageX": 1010,
        "pageY": 586
    },
    {
        "pageX": 1010,
        "pageY": 586
    },
    {
        "pageX": 1010,
        "pageY": 586
    },
    {
        "pageX": 1010,
        "pageY": 586
    },
    {
        "pageX": 1010,
        "pageY": 586
    },
    {
        "pageX": 1010,
        "pageY": 586
    },
    {
        "pageX": 1010,
        "pageY": 586
    },
    {
        "pageX": 1019,
        "pageY": 585
    },
    {
        "pageX": 1019,
        "pageY": 585
    },
    {
        "pageX": 1019,
        "pageY": 585
    },
    {
        "pageX": 1019,
        "pageY": 585
    },
    {
        "pageX": 1019,
        "pageY": 585
    },
    {
        "pageX": 1019,
        "pageY": 585
    },
    {
        "pageX": 1019,
        "pageY": 585
    },
    {
        "pageX": 1027,
        "pageY": 584
    },
    {
        "pageX": 1027,
        "pageY": 584
    },
    {
        "pageX": 1027,
        "pageY": 584
    },
    {
        "pageX": 1027,
        "pageY": 584
    },
    {
        "pageX": 1027,
        "pageY": 584
    },
    {
        "pageX": 1027,
        "pageY": 584
    },
    {
        "pageX": 1027,
        "pageY": 584
    },
    {
        "pageX": 1034,
        "pageY": 583
    },
    {
        "pageX": 1034,
        "pageY": 583
    },
    {
        "pageX": 1034,
        "pageY": 583
    },
    {
        "pageX": 1034,
        "pageY": 583
    },
    {
        "pageX": 1034,
        "pageY": 583
    },
    {
        "pageX": 1034,
        "pageY": 583
    },
    {
        "pageX": 1034,
        "pageY": 583
    },
    {
        "pageX": 1038,
        "pageY": 583
    },
    {
        "pageX": 1038,
        "pageY": 583
    },
    {
        "pageX": 1038,
        "pageY": 583
    },
    {
        "pageX": 1038,
        "pageY": 583
    },
    {
        "pageX": 1038,
        "pageY": 583
    },
    {
        "pageX": 1038,
        "pageY": 583
    },
    {
        "pageX": 1038,
        "pageY": 583
    },
    {
        "pageX": 1042,
        "pageY": 583
    },
    {
        "pageX": 1042,
        "pageY": 583
    },
    {
        "pageX": 1042,
        "pageY": 583
    },
    {
        "pageX": 1042,
        "pageY": 583
    },
    {
        "pageX": 1042,
        "pageY": 583
    },
    {
        "pageX": 1042,
        "pageY": 583
    },
    {
        "pageX": 1042,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1045,
        "pageY": 583
    },
    {
        "pageX": 1045,
        "pageY": 583
    },
    {
        "pageX": 1045,
        "pageY": 583
    },
    {
        "pageX": 1045,
        "pageY": 583
    },
    {
        "pageX": 1045,
        "pageY": 583
    },
    {
        "pageX": 1045,
        "pageY": 583
    },
    {
        "pageX": 1045,
        "pageY": 583
    },
    {
        "pageX": 1046,
        "pageY": 583
    },
    {
        "pageX": 1046,
        "pageY": 583
    },
    {
        "pageX": 1046,
        "pageY": 583
    },
    {
        "pageX": 1046,
        "pageY": 583
    },
    {
        "pageX": 1046,
        "pageY": 583
    },
    {
        "pageX": 1046,
        "pageY": 583
    },
    {
        "pageX": 1046,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1044,
        "pageY": 583
    },
    {
        "pageX": 1007,
        "pageY": 19
    },
    {
        "pageX": 237,
        "pageY": 419
    },
    {
        "pageX": 821,
        "pageY": 615
    },
    {
        "pageX": 790,
        "pageY": 594
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 790,
        "pageY": 591
    },
    {
        "pageX": 791,
        "pageY": 591
    },
    {
        "pageX": 791,
        "pageY": 591
    },
    {
        "pageX": 791,
        "pageY": 591
    },
    {
        "pageX": 791,
        "pageY": 591
    },
    {
        "pageX": 791,
        "pageY": 591
    },
    {
        "pageX": 791,
        "pageY": 591
    },
    {
        "pageX": 791,
        "pageY": 591
    },
    {
        "pageX": 791,
        "pageY": 591
    },
    {
        "pageX": 793,
        "pageY": 591
    },
    {
        "pageX": 793,
        "pageY": 591
    },
    {
        "pageX": 793,
        "pageY": 591
    },
    {
        "pageX": 793,
        "pageY": 591
    },
    {
        "pageX": 793,
        "pageY": 591
    },
    {
        "pageX": 793,
        "pageY": 591
    },
    {
        "pageX": 793,
        "pageY": 591
    },
    {
        "pageX": 793,
        "pageY": 591
    },
    {
        "pageX": 795,
        "pageY": 591
    },
    {
        "pageX": 795,
        "pageY": 591
    },
    {
        "pageX": 795,
        "pageY": 591
    },
    {
        "pageX": 795,
        "pageY": 591
    },
    {
        "pageX": 795,
        "pageY": 591
    },
    {
        "pageX": 795,
        "pageY": 591
    },
    {
        "pageX": 795,
        "pageY": 591
    },
    {
        "pageX": 795,
        "pageY": 591
    },
    {
        "pageX": 797,
        "pageY": 591
    },
    {
        "pageX": 797,
        "pageY": 591
    },
    {
        "pageX": 797,
        "pageY": 591
    },
    {
        "pageX": 797,
        "pageY": 591
    },
    {
        "pageX": 797,
        "pageY": 591
    },
    {
        "pageX": 797,
        "pageY": 591
    },
    {
        "pageX": 797,
        "pageY": 591
    },
    {
        "pageX": 797,
        "pageY": 591
    },
    {
        "pageX": 799,
        "pageY": 591
    },
    {
        "pageX": 799,
        "pageY": 591
    },
    {
        "pageX": 799,
        "pageY": 591
    },
    {
        "pageX": 799,
        "pageY": 591
    },
    {
        "pageX": 799,
        "pageY": 591
    },
    {
        "pageX": 799,
        "pageY": 591
    },
    {
        "pageX": 799,
        "pageY": 591
    },
    {
        "pageX": 799,
        "pageY": 591
    },
    {
        "pageX": 802,
        "pageY": 591
    },
    {
        "pageX": 802,
        "pageY": 591
    },
    {
        "pageX": 802,
        "pageY": 591
    },
    {
        "pageX": 802,
        "pageY": 591
    },
    {
        "pageX": 802,
        "pageY": 591
    },
    {
        "pageX": 802,
        "pageY": 591
    },
    {
        "pageX": 802,
        "pageY": 591
    },
    {
        "pageX": 802,
        "pageY": 591
    },
    {
        "pageX": 805,
        "pageY": 591
    },
    {
        "pageX": 805,
        "pageY": 591
    },
    {
        "pageX": 805,
        "pageY": 591
    },
    {
        "pageX": 805,
        "pageY": 591
    },
    {
        "pageX": 805,
        "pageY": 591
    },
    {
        "pageX": 805,
        "pageY": 591
    },
    {
        "pageX": 805,
        "pageY": 591
    },
    {
        "pageX": 805,
        "pageY": 591
    },
    {
        "pageX": 808,
        "pageY": 591
    },
    {
        "pageX": 808,
        "pageY": 591
    },
    {
        "pageX": 808,
        "pageY": 591
    },
    {
        "pageX": 808,
        "pageY": 591
    },
    {
        "pageX": 808,
        "pageY": 591
    },
    {
        "pageX": 808,
        "pageY": 591
    },
    {
        "pageX": 808,
        "pageY": 591
    },
    {
        "pageX": 808,
        "pageY": 591
    },
    {
        "pageX": 811,
        "pageY": 591
    },
    {
        "pageX": 811,
        "pageY": 591
    },
    {
        "pageX": 811,
        "pageY": 591
    },
    {
        "pageX": 811,
        "pageY": 591
    },
    {
        "pageX": 811,
        "pageY": 591
    },
    {
        "pageX": 811,
        "pageY": 591
    },
    {
        "pageX": 811,
        "pageY": 591
    },
    {
        "pageX": 811,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 815,
        "pageY": 591
    },
    {
        "pageX": 819,
        "pageY": 591
    },
    {
        "pageX": 819,
        "pageY": 591
    },
    {
        "pageX": 819,
        "pageY": 591
    },
    {
        "pageX": 819,
        "pageY": 591
    },
    {
        "pageX": 819,
        "pageY": 591
    },
    {
        "pageX": 819,
        "pageY": 591
    },
    {
        "pageX": 819,
        "pageY": 591
    },
    {
        "pageX": 819,
        "pageY": 591
    },
    {
        "pageX": 823,
        "pageY": 591
    },
    {
        "pageX": 823,
        "pageY": 591
    },
    {
        "pageX": 823,
        "pageY": 591
    },
    {
        "pageX": 823,
        "pageY": 591
    },
    {
        "pageX": 823,
        "pageY": 591
    },
    {
        "pageX": 823,
        "pageY": 591
    },
    {
        "pageX": 823,
        "pageY": 591
    },
    {
        "pageX": 823,
        "pageY": 591
    },
    {
        "pageX": 827,
        "pageY": 591
    },
    {
        "pageX": 827,
        "pageY": 591
    },
    {
        "pageX": 827,
        "pageY": 591
    },
    {
        "pageX": 827,
        "pageY": 591
    },
    {
        "pageX": 827,
        "pageY": 591
    },
    {
        "pageX": 827,
        "pageY": 591
    },
    {
        "pageX": 827,
        "pageY": 591
    },
    {
        "pageX": 827,
        "pageY": 591
    },
    {
        "pageX": 833,
        "pageY": 591
    },
    {
        "pageX": 833,
        "pageY": 591
    },
    {
        "pageX": 833,
        "pageY": 591
    },
    {
        "pageX": 833,
        "pageY": 591
    },
    {
        "pageX": 833,
        "pageY": 591
    },
    {
        "pageX": 833,
        "pageY": 591
    },
    {
        "pageX": 833,
        "pageY": 591
    },
    {
        "pageX": 833,
        "pageY": 591
    },
    {
        "pageX": 837,
        "pageY": 591
    },
    {
        "pageX": 837,
        "pageY": 591
    },
    {
        "pageX": 837,
        "pageY": 591
    },
    {
        "pageX": 837,
        "pageY": 591
    },
    {
        "pageX": 837,
        "pageY": 591
    },
    {
        "pageX": 837,
        "pageY": 591
    },
    {
        "pageX": 837,
        "pageY": 591
    },
    {
        "pageX": 837,
        "pageY": 591
    },
    {
        "pageX": 842,
        "pageY": 591
    },
    {
        "pageX": 842,
        "pageY": 591
    },
    {
        "pageX": 842,
        "pageY": 591
    },
    {
        "pageX": 842,
        "pageY": 591
    },
    {
        "pageX": 842,
        "pageY": 591
    },
    {
        "pageX": 842,
        "pageY": 591
    },
    {
        "pageX": 842,
        "pageY": 591
    },
    {
        "pageX": 842,
        "pageY": 591
    },
    {
        "pageX": 848,
        "pageY": 591
    },
    {
        "pageX": 848,
        "pageY": 591
    },
    {
        "pageX": 848,
        "pageY": 591
    },
    {
        "pageX": 848,
        "pageY": 591
    },
    {
        "pageX": 848,
        "pageY": 591
    },
    {
        "pageX": 848,
        "pageY": 591
    },
    {
        "pageX": 848,
        "pageY": 591
    },
    {
        "pageX": 848,
        "pageY": 591
    },
    {
        "pageX": 853,
        "pageY": 591
    },
    {
        "pageX": 853,
        "pageY": 591
    },
    {
        "pageX": 853,
        "pageY": 591
    },
    {
        "pageX": 853,
        "pageY": 591
    },
    {
        "pageX": 853,
        "pageY": 591
    },
    {
        "pageX": 853,
        "pageY": 591
    },
    {
        "pageX": 853,
        "pageY": 591
    },
    {
        "pageX": 853,
        "pageY": 591
    },
    {
        "pageX": 859,
        "pageY": 591
    },
    {
        "pageX": 859,
        "pageY": 591
    },
    {
        "pageX": 859,
        "pageY": 591
    },
    {
        "pageX": 859,
        "pageY": 591
    },
    {
        "pageX": 859,
        "pageY": 591
    },
    {
        "pageX": 859,
        "pageY": 591
    },
    {
        "pageX": 859,
        "pageY": 591
    },
    {
        "pageX": 859,
        "pageY": 591
    },
    {
        "pageX": 864,
        "pageY": 591
    },
    {
        "pageX": 864,
        "pageY": 591
    },
    {
        "pageX": 864,
        "pageY": 591
    },
    {
        "pageX": 864,
        "pageY": 591
    },
    {
        "pageX": 864,
        "pageY": 591
    },
    {
        "pageX": 864,
        "pageY": 591
    },
    {
        "pageX": 864,
        "pageY": 591
    },
    {
        "pageX": 864,
        "pageY": 591
    },
    {
        "pageX": 871,
        "pageY": 591
    },
    {
        "pageX": 871,
        "pageY": 591
    },
    {
        "pageX": 871,
        "pageY": 591
    },
    {
        "pageX": 871,
        "pageY": 591
    },
    {
        "pageX": 871,
        "pageY": 591
    },
    {
        "pageX": 871,
        "pageY": 591
    },
    {
        "pageX": 871,
        "pageY": 591
    },
    {
        "pageX": 871,
        "pageY": 591
    },
    {
        "pageX": 878,
        "pageY": 591
    },
    {
        "pageX": 878,
        "pageY": 591
    },
    {
        "pageX": 878,
        "pageY": 591
    },
    {
        "pageX": 878,
        "pageY": 591
    },
    {
        "pageX": 878,
        "pageY": 591
    },
    {
        "pageX": 878,
        "pageY": 591
    },
    {
        "pageX": 878,
        "pageY": 591
    },
    {
        "pageX": 878,
        "pageY": 591
    },
    {
        "pageX": 886,
        "pageY": 591
    },
    {
        "pageX": 886,
        "pageY": 591
    },
    {
        "pageX": 886,
        "pageY": 591
    },
    {
        "pageX": 886,
        "pageY": 591
    },
    {
        "pageX": 886,
        "pageY": 591
    },
    {
        "pageX": 886,
        "pageY": 591
    },
    {
        "pageX": 886,
        "pageY": 591
    },
    {
        "pageX": 886,
        "pageY": 591
    },
    {
        "pageX": 894,
        "pageY": 591
    },
    {
        "pageX": 894,
        "pageY": 591
    },
    {
        "pageX": 894,
        "pageY": 591
    },
    {
        "pageX": 894,
        "pageY": 591
    },
    {
        "pageX": 894,
        "pageY": 591
    },
    {
        "pageX": 894,
        "pageY": 591
    },
    {
        "pageX": 894,
        "pageY": 591
    },
    {
        "pageX": 894,
        "pageY": 591
    },
    {
        "pageX": 903,
        "pageY": 591
    },
    {
        "pageX": 903,
        "pageY": 591
    },
    {
        "pageX": 903,
        "pageY": 591
    },
    {
        "pageX": 903,
        "pageY": 591
    },
    {
        "pageX": 903,
        "pageY": 591
    },
    {
        "pageX": 903,
        "pageY": 591
    },
    {
        "pageX": 903,
        "pageY": 591
    },
    {
        "pageX": 903,
        "pageY": 591
    },
    {
        "pageX": 911,
        "pageY": 591
    },
    {
        "pageX": 911,
        "pageY": 591
    },
    {
        "pageX": 911,
        "pageY": 591
    },
    {
        "pageX": 911,
        "pageY": 591
    },
    {
        "pageX": 911,
        "pageY": 591
    },
    {
        "pageX": 911,
        "pageY": 591
    },
    {
        "pageX": 911,
        "pageY": 591
    },
    {
        "pageX": 911,
        "pageY": 591
    },
    {
        "pageX": 918,
        "pageY": 591
    },
    {
        "pageX": 918,
        "pageY": 591
    },
    {
        "pageX": 918,
        "pageY": 591
    },
    {
        "pageX": 918,
        "pageY": 591
    },
    {
        "pageX": 918,
        "pageY": 591
    },
    {
        "pageX": 918,
        "pageY": 591
    },
    {
        "pageX": 918,
        "pageY": 591
    },
    {
        "pageX": 918,
        "pageY": 591
    },
    {
        "pageX": 926,
        "pageY": 591
    },
    {
        "pageX": 926,
        "pageY": 591
    },
    {
        "pageX": 926,
        "pageY": 591
    },
    {
        "pageX": 926,
        "pageY": 591
    },
    {
        "pageX": 926,
        "pageY": 591
    },
    {
        "pageX": 926,
        "pageY": 591
    },
    {
        "pageX": 926,
        "pageY": 591
    },
    {
        "pageX": 926,
        "pageY": 591
    },
    {
        "pageX": 932,
        "pageY": 591
    },
    {
        "pageX": 932,
        "pageY": 591
    },
    {
        "pageX": 932,
        "pageY": 591
    },
    {
        "pageX": 932,
        "pageY": 591
    },
    {
        "pageX": 932,
        "pageY": 591
    },
    {
        "pageX": 932,
        "pageY": 591
    },
    {
        "pageX": 932,
        "pageY": 591
    },
    {
        "pageX": 932,
        "pageY": 591
    },
    {
        "pageX": 938,
        "pageY": 591
    },
    {
        "pageX": 938,
        "pageY": 591
    },
    {
        "pageX": 938,
        "pageY": 591
    },
    {
        "pageX": 938,
        "pageY": 591
    },
    {
        "pageX": 938,
        "pageY": 591
    },
    {
        "pageX": 938,
        "pageY": 591
    },
    {
        "pageX": 938,
        "pageY": 591
    },
    {
        "pageX": 938,
        "pageY": 591
    },
    {
        "pageX": 942,
        "pageY": 591
    },
    {
        "pageX": 942,
        "pageY": 591
    },
    {
        "pageX": 942,
        "pageY": 591
    },
    {
        "pageX": 942,
        "pageY": 591
    },
    {
        "pageX": 942,
        "pageY": 591
    },
    {
        "pageX": 942,
        "pageY": 591
    },
    {
        "pageX": 942,
        "pageY": 591
    },
    {
        "pageX": 942,
        "pageY": 591
    },
    {
        "pageX": 945,
        "pageY": 591
    },
    {
        "pageX": 945,
        "pageY": 591
    },
    {
        "pageX": 945,
        "pageY": 591
    },
    {
        "pageX": 945,
        "pageY": 591
    },
    {
        "pageX": 945,
        "pageY": 591
    },
    {
        "pageX": 945,
        "pageY": 591
    },
    {
        "pageX": 945,
        "pageY": 591
    },
    {
        "pageX": 945,
        "pageY": 591
    },
    {
        "pageX": 949,
        "pageY": 591
    },
    {
        "pageX": 949,
        "pageY": 591
    },
    {
        "pageX": 949,
        "pageY": 591
    },
    {
        "pageX": 949,
        "pageY": 591
    },
    {
        "pageX": 949,
        "pageY": 591
    },
    {
        "pageX": 949,
        "pageY": 591
    },
    {
        "pageX": 949,
        "pageY": 591
    },
    {
        "pageX": 949,
        "pageY": 591
    },
    {
        "pageX": 951,
        "pageY": 591
    },
    {
        "pageX": 951,
        "pageY": 591
    },
    {
        "pageX": 951,
        "pageY": 591
    },
    {
        "pageX": 951,
        "pageY": 591
    },
    {
        "pageX": 951,
        "pageY": 591
    },
    {
        "pageX": 951,
        "pageY": 591
    },
    {
        "pageX": 951,
        "pageY": 591
    },
    {
        "pageX": 951,
        "pageY": 591
    },
    {
        "pageX": 954,
        "pageY": 591
    },
    {
        "pageX": 954,
        "pageY": 591
    },
    {
        "pageX": 954,
        "pageY": 591
    },
    {
        "pageX": 954,
        "pageY": 591
    },
    {
        "pageX": 954,
        "pageY": 591
    },
    {
        "pageX": 954,
        "pageY": 591
    },
    {
        "pageX": 954,
        "pageY": 591
    },
    {
        "pageX": 954,
        "pageY": 591
    },
    {
        "pageX": 956,
        "pageY": 591
    },
    {
        "pageX": 956,
        "pageY": 591
    },
    {
        "pageX": 956,
        "pageY": 591
    },
    {
        "pageX": 956,
        "pageY": 591
    },
    {
        "pageX": 956,
        "pageY": 591
    },
    {
        "pageX": 956,
        "pageY": 591
    },
    {
        "pageX": 956,
        "pageY": 591
    },
    {
        "pageX": 956,
        "pageY": 591
    },
    {
        "pageX": 958,
        "pageY": 591
    },
    {
        "pageX": 958,
        "pageY": 591
    },
    {
        "pageX": 958,
        "pageY": 591
    },
    {
        "pageX": 958,
        "pageY": 591
    },
    {
        "pageX": 958,
        "pageY": 591
    },
    {
        "pageX": 958,
        "pageY": 591
    },
    {
        "pageX": 958,
        "pageY": 591
    },
    {
        "pageX": 958,
        "pageY": 591
    },
    {
        "pageX": 960,
        "pageY": 591
    },
    {
        "pageX": 960,
        "pageY": 591
    },
    {
        "pageX": 960,
        "pageY": 591
    },
    {
        "pageX": 960,
        "pageY": 591
    },
    {
        "pageX": 960,
        "pageY": 591
    },
    {
        "pageX": 960,
        "pageY": 591
    },
    {
        "pageX": 960,
        "pageY": 591
    },
    {
        "pageX": 960,
        "pageY": 591
    },
    {
        "pageX": 963,
        "pageY": 591
    },
    {
        "pageX": 963,
        "pageY": 591
    },
    {
        "pageX": 963,
        "pageY": 591
    },
    {
        "pageX": 963,
        "pageY": 591
    },
    {
        "pageX": 963,
        "pageY": 591
    },
    {
        "pageX": 963,
        "pageY": 591
    },
    {
        "pageX": 963,
        "pageY": 591
    },
    {
        "pageX": 963,
        "pageY": 591
    },
    {
        "pageX": 965,
        "pageY": 591
    },
    {
        "pageX": 965,
        "pageY": 591
    },
    {
        "pageX": 965,
        "pageY": 591
    },
    {
        "pageX": 965,
        "pageY": 591
    },
    {
        "pageX": 965,
        "pageY": 591
    },
    {
        "pageX": 965,
        "pageY": 591
    },
    {
        "pageX": 965,
        "pageY": 591
    },
    {
        "pageX": 965,
        "pageY": 591
    },
    {
        "pageX": 968,
        "pageY": 591
    },
    {
        "pageX": 968,
        "pageY": 591
    },
    {
        "pageX": 968,
        "pageY": 591
    },
    {
        "pageX": 968,
        "pageY": 591
    },
    {
        "pageX": 968,
        "pageY": 591
    },
    {
        "pageX": 968,
        "pageY": 591
    },
    {
        "pageX": 968,
        "pageY": 591
    },
    {
        "pageX": 968,
        "pageY": 591
    },
    {
        "pageX": 970,
        "pageY": 591
    },
    {
        "pageX": 970,
        "pageY": 591
    },
    {
        "pageX": 970,
        "pageY": 591
    },
    {
        "pageX": 970,
        "pageY": 591
    },
    {
        "pageX": 970,
        "pageY": 591
    },
    {
        "pageX": 970,
        "pageY": 591
    },
    {
        "pageX": 970,
        "pageY": 591
    },
    {
        "pageX": 970,
        "pageY": 591
    },
    {
        "pageX": 973,
        "pageY": 591
    },
    {
        "pageX": 973,
        "pageY": 591
    },
    {
        "pageX": 973,
        "pageY": 591
    },
    {
        "pageX": 973,
        "pageY": 591
    },
    {
        "pageX": 973,
        "pageY": 591
    },
    {
        "pageX": 973,
        "pageY": 591
    },
    {
        "pageX": 973,
        "pageY": 591
    },
    {
        "pageX": 973,
        "pageY": 591
    },
    {
        "pageX": 976,
        "pageY": 591
    },
    {
        "pageX": 976,
        "pageY": 591
    },
    {
        "pageX": 976,
        "pageY": 591
    },
    {
        "pageX": 976,
        "pageY": 591
    },
    {
        "pageX": 976,
        "pageY": 591
    },
    {
        "pageX": 976,
        "pageY": 591
    },
    {
        "pageX": 976,
        "pageY": 591
    },
    {
        "pageX": 976,
        "pageY": 591
    },
    {
        "pageX": 979,
        "pageY": 591
    },
    {
        "pageX": 979,
        "pageY": 591
    },
    {
        "pageX": 979,
        "pageY": 591
    },
    {
        "pageX": 979,
        "pageY": 591
    },
    {
        "pageX": 979,
        "pageY": 591
    },
    {
        "pageX": 979,
        "pageY": 591
    },
    {
        "pageX": 979,
        "pageY": 591
    },
    {
        "pageX": 979,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 981,
        "pageY": 591
    },
    {
        "pageX": 983,
        "pageY": 591
    },
    {
        "pageX": 983,
        "pageY": 591
    },
    {
        "pageX": 983,
        "pageY": 591
    },
    {
        "pageX": 983,
        "pageY": 591
    },
    {
        "pageX": 983,
        "pageY": 591
    },
    {
        "pageX": 983,
        "pageY": 591
    },
    {
        "pageX": 983,
        "pageY": 591
    },
    {
        "pageX": 983,
        "pageY": 591
    },
    {
        "pageX": 985,
        "pageY": 591
    },
    {
        "pageX": 985,
        "pageY": 591
    },
    {
        "pageX": 985,
        "pageY": 591
    },
    {
        "pageX": 985,
        "pageY": 591
    },
    {
        "pageX": 985,
        "pageY": 591
    },
    {
        "pageX": 985,
        "pageY": 591
    },
    {
        "pageX": 985,
        "pageY": 591
    },
    {
        "pageX": 985,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 987,
        "pageY": 591
    },
    {
        "pageX": 990,
        "pageY": 591
    },
    {
        "pageX": 990,
        "pageY": 591
    },
    {
        "pageX": 990,
        "pageY": 591
    },
    {
        "pageX": 990,
        "pageY": 591
    },
    {
        "pageX": 990,
        "pageY": 591
    },
    {
        "pageX": 990,
        "pageY": 591
    },
    {
        "pageX": 990,
        "pageY": 591
    },
    {
        "pageX": 990,
        "pageY": 591
    },
    {
        "pageX": 992,
        "pageY": 591
    },
    {
        "pageX": 992,
        "pageY": 591
    },
    {
        "pageX": 992,
        "pageY": 591
    },
    {
        "pageX": 992,
        "pageY": 591
    },
    {
        "pageX": 992,
        "pageY": 591
    },
    {
        "pageX": 992,
        "pageY": 591
    },
    {
        "pageX": 992,
        "pageY": 591
    },
    {
        "pageX": 992,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 591
    },
    {
        "pageX": 994,
        "pageY": 591
    },
    {
        "pageX": 997,
        "pageY": 591
    },
    {
        "pageX": 997,
        "pageY": 591
    },
    {
        "pageX": 997,
        "pageY": 591
    },
    {
        "pageX": 997,
        "pageY": 591
    },
    {
        "pageX": 997,
        "pageY": 591
    },
    {
        "pageX": 997,
        "pageY": 591
    },
    {
        "pageX": 997,
        "pageY": 591
    },
    {
        "pageX": 997,
        "pageY": 591
    },
    {
        "pageX": 1000,
        "pageY": 591
    },
    {
        "pageX": 1000,
        "pageY": 591
    },
    {
        "pageX": 1000,
        "pageY": 591
    },
    {
        "pageX": 1000,
        "pageY": 591
    },
    {
        "pageX": 1000,
        "pageY": 591
    },
    {
        "pageX": 1000,
        "pageY": 591
    },
    {
        "pageX": 1000,
        "pageY": 591
    },
    {
        "pageX": 1000,
        "pageY": 591
    },
    {
        "pageX": 1003,
        "pageY": 591
    },
    {
        "pageX": 1003,
        "pageY": 591
    },
    {
        "pageX": 1003,
        "pageY": 591
    },
    {
        "pageX": 1003,
        "pageY": 591
    },
    {
        "pageX": 1003,
        "pageY": 591
    },
    {
        "pageX": 1003,
        "pageY": 591
    },
    {
        "pageX": 1003,
        "pageY": 591
    },
    {
        "pageX": 1003,
        "pageY": 591
    },
    {
        "pageX": 1006,
        "pageY": 591
    },
    {
        "pageX": 1006,
        "pageY": 591
    },
    {
        "pageX": 1006,
        "pageY": 591
    },
    {
        "pageX": 1006,
        "pageY": 591
    },
    {
        "pageX": 1006,
        "pageY": 591
    },
    {
        "pageX": 1006,
        "pageY": 591
    },
    {
        "pageX": 1006,
        "pageY": 591
    },
    {
        "pageX": 1006,
        "pageY": 591
    },
    {
        "pageX": 1009,
        "pageY": 591
    },
    {
        "pageX": 1009,
        "pageY": 591
    },
    {
        "pageX": 1009,
        "pageY": 591
    },
    {
        "pageX": 1009,
        "pageY": 591
    },
    {
        "pageX": 1009,
        "pageY": 591
    },
    {
        "pageX": 1009,
        "pageY": 591
    },
    {
        "pageX": 1009,
        "pageY": 591
    },
    {
        "pageX": 1009,
        "pageY": 591
    },
    {
        "pageX": 1012,
        "pageY": 591
    },
    {
        "pageX": 1012,
        "pageY": 591
    },
    {
        "pageX": 1012,
        "pageY": 591
    },
    {
        "pageX": 1012,
        "pageY": 591
    },
    {
        "pageX": 1012,
        "pageY": 591
    },
    {
        "pageX": 1012,
        "pageY": 591
    },
    {
        "pageX": 1012,
        "pageY": 591
    },
    {
        "pageX": 1012,
        "pageY": 591
    },
    {
        "pageX": 1014,
        "pageY": 591
    },
    {
        "pageX": 1014,
        "pageY": 591
    },
    {
        "pageX": 1014,
        "pageY": 591
    },
    {
        "pageX": 1014,
        "pageY": 591
    },
    {
        "pageX": 1014,
        "pageY": 591
    },
    {
        "pageX": 1014,
        "pageY": 591
    },
    {
        "pageX": 1014,
        "pageY": 591
    },
    {
        "pageX": 1014,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1016,
        "pageY": 591
    },
    {
        "pageX": 1017,
        "pageY": 591
    },
    {
        "pageX": 1017,
        "pageY": 591
    },
    {
        "pageX": 1017,
        "pageY": 591
    },
    {
        "pageX": 1017,
        "pageY": 591
    },
    {
        "pageX": 1017,
        "pageY": 591
    },
    {
        "pageX": 1017,
        "pageY": 591
    },
    {
        "pageX": 1017,
        "pageY": 591
    },
    {
        "pageX": 1017,
        "pageY": 591
    },
    {
        "pageX": 1018,
        "pageY": 591
    },
    {
        "pageX": 1018,
        "pageY": 591
    },
    {
        "pageX": 1018,
        "pageY": 591
    },
    {
        "pageX": 1018,
        "pageY": 591
    },
    {
        "pageX": 1018,
        "pageY": 591
    },
    {
        "pageX": 1018,
        "pageY": 591
    },
    {
        "pageX": 1018,
        "pageY": 591
    },
    {
        "pageX": 1018,
        "pageY": 591
    },
    {
        "pageX": 1019,
        "pageY": 591
    },
    {
        "pageX": 1019,
        "pageY": 591
    },
    {
        "pageX": 1019,
        "pageY": 591
    },
    {
        "pageX": 1019,
        "pageY": 591
    },
    {
        "pageX": 1019,
        "pageY": 591
    },
    {
        "pageX": 1019,
        "pageY": 591
    },
    {
        "pageX": 1019,
        "pageY": 591
    },
    {
        "pageX": 1019,
        "pageY": 591
    },
    {
        "pageX": 1020,
        "pageY": 591
    },
    {
        "pageX": 1020,
        "pageY": 591
    },
    {
        "pageX": 1020,
        "pageY": 591
    },
    {
        "pageX": 1020,
        "pageY": 591
    },
    {
        "pageX": 1020,
        "pageY": 591
    },
    {
        "pageX": 1020,
        "pageY": 591
    },
    {
        "pageX": 1020,
        "pageY": 591
    },
    {
        "pageX": 1020,
        "pageY": 591
    },
    {
        "pageX": 1021,
        "pageY": 591
    },
    {
        "pageX": 1021,
        "pageY": 591
    },
    {
        "pageX": 1021,
        "pageY": 591
    },
    {
        "pageX": 1021,
        "pageY": 591
    },
    {
        "pageX": 1021,
        "pageY": 591
    },
    {
        "pageX": 1021,
        "pageY": 591
    },
    {
        "pageX": 1021,
        "pageY": 591
    },
    {
        "pageX": 1021,
        "pageY": 591
    },
    {
        "pageX": 1023,
        "pageY": 591
    },
    {
        "pageX": 1023,
        "pageY": 591
    },
    {
        "pageX": 1023,
        "pageY": 591
    },
    {
        "pageX": 1023,
        "pageY": 591
    },
    {
        "pageX": 1023,
        "pageY": 591
    },
    {
        "pageX": 1023,
        "pageY": 591
    },
    {
        "pageX": 1023,
        "pageY": 591
    },
    {
        "pageX": 1023,
        "pageY": 591
    },
    {
        "pageX": 1024,
        "pageY": 591
    },
    {
        "pageX": 1024,
        "pageY": 591
    },
    {
        "pageX": 1024,
        "pageY": 591
    },
    {
        "pageX": 1024,
        "pageY": 591
    },
    {
        "pageX": 1024,
        "pageY": 591
    },
    {
        "pageX": 1024,
        "pageY": 591
    },
    {
        "pageX": 1024,
        "pageY": 591
    },
    {
        "pageX": 1024,
        "pageY": 591
    },
    {
        "pageX": 1025,
        "pageY": 591
    },
    {
        "pageX": 1025,
        "pageY": 591
    },
    {
        "pageX": 1025,
        "pageY": 591
    },
    {
        "pageX": 1025,
        "pageY": 591
    },
    {
        "pageX": 1025,
        "pageY": 591
    },
    {
        "pageX": 1025,
        "pageY": 591
    },
    {
        "pageX": 1025,
        "pageY": 591
    },
    {
        "pageX": 1025,
        "pageY": 591
    },
    {
        "pageX": 1027,
        "pageY": 590
    },
    {
        "pageX": 1027,
        "pageY": 590
    },
    {
        "pageX": 1027,
        "pageY": 590
    },
    {
        "pageX": 1027,
        "pageY": 590
    },
    {
        "pageX": 1027,
        "pageY": 590
    },
    {
        "pageX": 1027,
        "pageY": 590
    },
    {
        "pageX": 1027,
        "pageY": 590
    },
    {
        "pageX": 1027,
        "pageY": 590
    },
    {
        "pageX": 1028,
        "pageY": 590
    },
    {
        "pageX": 1028,
        "pageY": 590
    },
    {
        "pageX": 1028,
        "pageY": 590
    },
    {
        "pageX": 1028,
        "pageY": 590
    },
    {
        "pageX": 1028,
        "pageY": 590
    },
    {
        "pageX": 1028,
        "pageY": 590
    },
    {
        "pageX": 1028,
        "pageY": 590
    },
    {
        "pageX": 1028,
        "pageY": 590
    },
    {
        "pageX": 1029,
        "pageY": 590
    },
    {
        "pageX": 1029,
        "pageY": 590
    },
    {
        "pageX": 1029,
        "pageY": 590
    },
    {
        "pageX": 1029,
        "pageY": 590
    },
    {
        "pageX": 1029,
        "pageY": 590
    },
    {
        "pageX": 1029,
        "pageY": 590
    },
    {
        "pageX": 1029,
        "pageY": 590
    },
    {
        "pageX": 1029,
        "pageY": 590
    },
    {
        "pageX": 1032,
        "pageY": 590
    },
    {
        "pageX": 1032,
        "pageY": 590
    },
    {
        "pageX": 1032,
        "pageY": 590
    },
    {
        "pageX": 1032,
        "pageY": 590
    },
    {
        "pageX": 1032,
        "pageY": 590
    },
    {
        "pageX": 1032,
        "pageY": 590
    },
    {
        "pageX": 1032,
        "pageY": 590
    },
    {
        "pageX": 1032,
        "pageY": 590
    },
    {
        "pageX": 1033,
        "pageY": 590
    },
    {
        "pageX": 1033,
        "pageY": 590
    },
    {
        "pageX": 1033,
        "pageY": 590
    },
    {
        "pageX": 1033,
        "pageY": 590
    },
    {
        "pageX": 1033,
        "pageY": 590
    },
    {
        "pageX": 1033,
        "pageY": 590
    },
    {
        "pageX": 1033,
        "pageY": 590
    },
    {
        "pageX": 1033,
        "pageY": 590
    },
    {
        "pageX": 1034,
        "pageY": 590
    },
    {
        "pageX": 1034,
        "pageY": 590
    },
    {
        "pageX": 1034,
        "pageY": 590
    },
    {
        "pageX": 1034,
        "pageY": 590
    },
    {
        "pageX": 1034,
        "pageY": 590
    },
    {
        "pageX": 1034,
        "pageY": 590
    },
    {
        "pageX": 1034,
        "pageY": 590
    },
    {
        "pageX": 1034,
        "pageY": 590
    },
    {
        "pageX": 1035,
        "pageY": 590
    },
    {
        "pageX": 1035,
        "pageY": 590
    },
    {
        "pageX": 1035,
        "pageY": 590
    },
    {
        "pageX": 1035,
        "pageY": 590
    },
    {
        "pageX": 1035,
        "pageY": 590
    },
    {
        "pageX": 1035,
        "pageY": 590
    },
    {
        "pageX": 1035,
        "pageY": 590
    },
    {
        "pageX": 1035,
        "pageY": 590
    },
    {
        "pageX": 1036,
        "pageY": 590
    },
    {
        "pageX": 1036,
        "pageY": 590
    },
    {
        "pageX": 1036,
        "pageY": 590
    },
    {
        "pageX": 1036,
        "pageY": 590
    },
    {
        "pageX": 1036,
        "pageY": 590
    },
    {
        "pageX": 1036,
        "pageY": 590
    },
    {
        "pageX": 1036,
        "pageY": 590
    },
    {
        "pageX": 1036,
        "pageY": 590
    },
    {
        "pageX": 1037,
        "pageY": 590
    },
    {
        "pageX": 1037,
        "pageY": 590
    },
    {
        "pageX": 1037,
        "pageY": 590
    },
    {
        "pageX": 1037,
        "pageY": 590
    },
    {
        "pageX": 1037,
        "pageY": 590
    },
    {
        "pageX": 1037,
        "pageY": 590
    },
    {
        "pageX": 1037,
        "pageY": 590
    },
    {
        "pageX": 1037,
        "pageY": 590
    },
    {
        "pageX": 1038,
        "pageY": 589
    },
    {
        "pageX": 1038,
        "pageY": 589
    },
    {
        "pageX": 1038,
        "pageY": 589
    },
    {
        "pageX": 1038,
        "pageY": 589
    },
    {
        "pageX": 1038,
        "pageY": 589
    },
    {
        "pageX": 1038,
        "pageY": 589
    },
    {
        "pageX": 1038,
        "pageY": 589
    },
    {
        "pageX": 1038,
        "pageY": 589
    },
    {
        "pageX": 1039,
        "pageY": 589
    },
    {
        "pageX": 1039,
        "pageY": 589
    },
    {
        "pageX": 1039,
        "pageY": 589
    },
    {
        "pageX": 1039,
        "pageY": 589
    },
    {
        "pageX": 1039,
        "pageY": 589
    },
    {
        "pageX": 1039,
        "pageY": 589
    },
    {
        "pageX": 1039,
        "pageY": 589
    },
    {
        "pageX": 1039,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 589
    },
    {
        "pageX": 1040,
        "pageY": 590
    },
    {
        "pageX": 1040,
        "pageY": 590
    },
    {
        "pageX": 1040,
        "pageY": 590
    },
    {
        "pageX": 1040,
        "pageY": 590
    },
    {
        "pageX": 1040,
        "pageY": 590
    },
    {
        "pageX": 1040,
        "pageY": 590
    },
    {
        "pageX": 1040,
        "pageY": 590
    },
    {
        "pageX": 1040,
        "pageY": 590
    },
    {
        "pageX": 1040,
        "pageY": 591
    },
    {
        "pageX": 1040,
        "pageY": 591
    },
    {
        "pageX": 1040,
        "pageY": 591
    },
    {
        "pageX": 1040,
        "pageY": 591
    },
    {
        "pageX": 1040,
        "pageY": 591
    },
    {
        "pageX": 1040,
        "pageY": 591
    },
    {
        "pageX": 1040,
        "pageY": 591
    },
    {
        "pageX": 1040,
        "pageY": 591
    },
    {
        "pageX": 1039,
        "pageY": 592
    },
    {
        "pageX": 1039,
        "pageY": 592
    },
    {
        "pageX": 1039,
        "pageY": 592
    },
    {
        "pageX": 1039,
        "pageY": 592
    },
    {
        "pageX": 1039,
        "pageY": 592
    },
    {
        "pageX": 1039,
        "pageY": 592
    },
    {
        "pageX": 1039,
        "pageY": 592
    },
    {
        "pageX": 1039,
        "pageY": 592
    },
    {
        "pageX": 1039,
        "pageY": 594
    },
    {
        "pageX": 1039,
        "pageY": 594
    },
    {
        "pageX": 1039,
        "pageY": 594
    },
    {
        "pageX": 1039,
        "pageY": 594
    },
    {
        "pageX": 1039,
        "pageY": 594
    },
    {
        "pageX": 1039,
        "pageY": 594
    },
    {
        "pageX": 1039,
        "pageY": 594
    },
    {
        "pageX": 1039,
        "pageY": 594
    },
    {
        "pageX": 1038,
        "pageY": 594
    },
    {
        "pageX": 1038,
        "pageY": 594
    },
    {
        "pageX": 1038,
        "pageY": 594
    },
    {
        "pageX": 1038,
        "pageY": 594
    },
    {
        "pageX": 1038,
        "pageY": 594
    },
    {
        "pageX": 1038,
        "pageY": 594
    },
    {
        "pageX": 1038,
        "pageY": 594
    },
    {
        "pageX": 1038,
        "pageY": 594
    },
    {
        "pageX": 1037,
        "pageY": 594
    },
    {
        "pageX": 1037,
        "pageY": 594
    },
    {
        "pageX": 1037,
        "pageY": 594
    },
    {
        "pageX": 1037,
        "pageY": 594
    },
    {
        "pageX": 1037,
        "pageY": 594
    },
    {
        "pageX": 1037,
        "pageY": 594
    },
    {
        "pageX": 1037,
        "pageY": 594
    },
    {
        "pageX": 1037,
        "pageY": 594
    },
    {
        "pageX": 1036,
        "pageY": 595
    },
    {
        "pageX": 1036,
        "pageY": 595
    },
    {
        "pageX": 1036,
        "pageY": 595
    },
    {
        "pageX": 1036,
        "pageY": 595
    },
    {
        "pageX": 1036,
        "pageY": 595
    },
    {
        "pageX": 1036,
        "pageY": 595
    },
    {
        "pageX": 1036,
        "pageY": 595
    },
    {
        "pageX": 1036,
        "pageY": 595
    },
    {
        "pageX": 1034,
        "pageY": 595
    },
    {
        "pageX": 1034,
        "pageY": 595
    },
    {
        "pageX": 1034,
        "pageY": 595
    },
    {
        "pageX": 1034,
        "pageY": 595
    },
    {
        "pageX": 1034,
        "pageY": 595
    },
    {
        "pageX": 1034,
        "pageY": 595
    },
    {
        "pageX": 1034,
        "pageY": 595
    },
    {
        "pageX": 1034,
        "pageY": 595
    },
    {
        "pageX": 996,
        "pageY": 595
    },
    {
        "pageX": 827,
        "pageY": 595
    },
    {
        "pageX": 1601,
        "pageY": 125
    },
    {
        "pageX": 1650,
        "pageY": 100
    },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {
        "pageX": 508,
        "pageY": 279
    },
    {
        "pageX": 531,
        "pageY": 278
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 550,
        "pageY": 276
    },
    {
        "pageX": 494,
        "pageY": 268
    },
    {
        "pageX": 488,
        "pageY": 268
    },
    {
        "pageX": 488,
        "pageY": 268
    },
    {
        "pageX": 488,
        "pageY": 268
    },
    {
        "pageX": 488,
        "pageY": 268
    },
    {
        "pageX": 488,
        "pageY": 268
    },
    {
        "pageX": 585,
        "pageY": 400
    },
    {
        "pageX": 876,
        "pageY": 502
    },
    {
        "pageX": 1147,
        "pageY": 661
    },
    {
        "pageX": 1216,
        "pageY": 702
    },
    {
        "pageX": 1223,
        "pageY": 685
    },
    {
        "pageX": 1255,
        "pageY": 594
    },
    {
        "pageX": 1258,
        "pageY": 591
    },
    {
        "pageX": 1258,
        "pageY": 591
    },
    {
        "pageX": 1258,
        "pageY": 591
    },
    {
        "pageX": 1258,
        "pageY": 591
    },
    {
        "pageX": 1258,
        "pageY": 591
    },
    {
        "pageX": 1258,
        "pageY": 591
    },
    {
        "pageX": 1250,
        "pageY": 594
    },
    {
        "pageX": 1182,
        "pageY": 602
    },
    {
        "pageX": 591,
        "pageY": 464
    }
]
    var ua = window._dx.UA.init({"token": sid});
    for (let index = 0; index < mousemove.length; index++) {
        ua.__proto__.tm = new Date().getTime()
        ua.recordSA({'pageX': mousemove[index]['pageX'], 'pageY': mousemove[index]['pageY']});
    }
    ua.sendSA();
    ua.sendTemp({"xpath": "/html/body/div[11]", "x": parseInt(x), "y": parseInt(y)});
    return ua.getUA()
}

// let sid = "da38c7778527ac47b70ef051a6779945"
// let x = 133
// let y = 42
//
//
// ac = getAc(x, y, sid)
// console.log(ac)
//
// console.log(ac.length)