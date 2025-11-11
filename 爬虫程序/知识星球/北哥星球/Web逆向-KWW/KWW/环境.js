// hook 打印函数
XXY = {}
XXY.log = console.log;
XXY.clear = console.clear;

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


/*框架初始化文件 存储着框架初始化需要用到的东西*/
require_ = require;
process_ = process;

// 对象toString保护
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

// 剔除node 特征
if (typeof __dirname != 'undefined') {
    __dirname = undefined
}
if (typeof __filename != 'undefined') {
    __filename = undefined
}
if (typeof require != 'undefined') {
    require = undefined
}
if (typeof exports != 'undefined') {
    exports = undefined
}
if (typeof module != 'undefined') {
    module = undefined
}
if (typeof Buffer != 'undefined') {
    Buffer = undefined
}
if (typeof process != 'undefined') {
    process = undefined
}
if (typeof global != 'undefined') {
    global = undefined
}

if (typeof clearImmediate != 'undefined') {
    clearImmediate = undefined
}
if (typeof setImmediate != 'undefined') {
    setImmediate = undefined
}


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
                        if (target.name === 'floor' || target.name === 'Math') {

                        } else {
                            XXY.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`)

                        }
                    } else if (WatchName === "window.console") {
                    } else {
                        if (target.name !== 'parseInt' && target.name !=='floor') {
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
                            if (propKey === 'Math' || propKey === 'floor') {
                                aaaaaaaaa = 1

                            } else {
                                XXY.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}] , 是个函数`)

                            }

                        }
                        return new Proxy(result, getMethodHandler(WatchName, target))
                    } else {
                        if (propKey === 'Math' || propKey === 'floor') {
                            aaaaaaaaa = 1

                        } else {
                            XXY.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}], 结果 => [${(result)}]`);

                        }
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
                // debugger;
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

Object.defineProperties(globalThis, {
    [Symbol.toStringTag]: {
        value: 'Window'
    }
});


AudioContext = function AudioContext(){
    XXY.log("AudioContext",arguments)
}

Window = function Window() {
    debugger;
};
window = globalThis;

MediaQueryList = {
    matches: false,
    media: "(prefers-color-scheme: dark)",
    onchange: null
};
matchMedia = function matchMedia() {
    XXY.log("window.matchMedia", arguments)
    return MediaQueryList['media'] = arguments[0]
}

Object.setPrototypeOf(window, Window.prototype);
obj_toString(window, "Window")
obj_toString(Window.prototype, "Window")

Navigator = function Navigator() {
    debugger;
};
navigator = {};
Navigator.prototype.language = 'zh-CN';
Navigator.prototype.onLine = true;
Navigator.prototype.webdriver = false;
Navigator.prototype.hardwareConcurrency = 12;
Navigator.prototype.pdfViewerEnabled = true;
Navigator.prototype.languages = [
    "zh-CN"
];

Object.setPrototypeOf(navigator, Navigator.prototype);
obj_toString(navigator, "Navigator")
obj_toString(Navigator.prototype, "Navigator")


HTMLDocument = function HTMLDocument() {
    debugger;
};
document = {
    "cookie": ""
};
HTMLHtmlElement = function HTMLHtmlElement() {
    debugger;
};
documentElement = {
    "getAttribute": function getAttribute() {
        XXY.log("documentElement.getAttribute", arguments)
        if (arguments[0] === 'selenium') {
            return null
        }
        if (arguments[0] === 'webdriver') {
            return null
        }
        if (arguments[0] === 'driver') {
            return null
        }
    }
};
Object.setPrototypeOf(documentElement, HTMLHtmlElement.prototype);
obj_toString(documentElement, "HTMLHtmlElement")
obj_toString(HTMLHtmlElement.prototype, "HTMLHtmlElement")

document.documentElement = documentElement;
WEBGL_debug_renderer_info = {
    "UNMASKED_VENDOR_WEBGL": 37445,
    'UNMASKED_RENDERER_WEBGL': 37446
};
webgl = {
    "getExtension": function getExtension() {
        XXY.log("webgl.getExtension", arguments)
        let args1 = arguments[0]
        if (args1 === 'WEBGL_debug_renderer_info') {
            return WEBGL_debug_renderer_info
        }
    },
    "getParameter": function getParameter(type_srt) {
        XXY.log("webgl.getParameter", type_srt)
        switch (type_srt) {
            case 37445:
                return 'Google Inc. (NVIDIA)';
            case 37446:
                return 'ANGLE (NVIDIA, NVIDIA GeForce GTX 1650 (0x00001F82) Direct3D11 vs_5_0 ps_5_0, D3D11)';
            case 3379:
                return 16384;
            case 35661:
                return 32;
            case 34076:
                return 16384;
            case 34930:
                return 16;
            case 35660:
                return 16;
            case 36347:
                return 4095;
            case 3413:
                return 8;
            case 36348:
                return 30;
            case 33902:
                return new Float32Array([1, 1])
            case 33901:
                return new Float32Array([1, 1024])
            case 36349:
                return 1024;
            case 34024:
                return 16384;
            case 3386:
                return new Int32Array([32767, 32767]);
            case 34921:
                return 16
            case 3410:
                return 8
            case 7937:
                return 'WebKit WebGL'
            case 35724:
                return 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)'
            case 3415:
                return 0
            case 7936:
                return 'WebKit'
            case 7938:
                return 'WebGL 1.0 (OpenGL ES 2.0 Chromium)'
            case 3411:
                return 8
            case 3414:
                return 24
            case 3412:
                return 8
            default:
                //debugger;
                break;
        }


    }
};
canvas = {
    "getContext": function getContext() {
        XXY.log("canvas.getContext", arguments)
        let args1 = arguments[0]
        if (args1 === 'webgl' || args1 === 'experimental-webgl') {
            return webgl
        }
    }
};
iframe = {};
document.createElement = function createElement() {
    XXY.log("document.createElement", arguments)
    let args = arguments[0]
    if (args === 'iframe') {
        return iframe
    } else if (args === 'canvas') {
        return canvas
    }
}

Object.setPrototypeOf(document, HTMLDocument.prototype);


obj_toString(document, "HTMLDocument")
obj_toString(HTMLDocument.prototype, "HTMLDocument")

location = {
    "hostname": 'newtab'
};


stronge_ = {}
localStorage = {};
localStorage.getItem = function getItem() {
    XXY.log("localStorage.getItem", arguments)
    return stronge_[arguments[0]]
}
localStorage.setItem = function setItem() {
    XXY.log("localStorage.setItem", arguments)
    stronge_[arguments[0]] = arguments[1]
}


Screen = function Screen(){
    XXY.log("Screen",arguments);
};


MouseEvent = function MouseEvent(){
    XXY.log("MouseEvent",arguments);
};

runtime = {};
chrome = {
    "runtime":runtime
};


window.Reflect.getOwnPropertyDescriptor_ = window.Reflect.getOwnPropertyDescriptor;
window.Reflect.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(){
    debugger;
}
window = watches(window, "window");
webgl = watches(webgl, "webgl");
location = watches(location, "location");
document = watches(document, "document");
iframe = watches(iframe, "iframe");
navigator = watches(navigator, "navigator");
documentElement = watches(documentElement, "documentElement");
localStorage = watches(localStorage, "localStorage");
canvas = watches(canvas, "canvas");
WEBGL_debug_renderer_info = watches(WEBGL_debug_renderer_info, "WEBGL_debug_renderer_info");
chrome = watches(chrome, "chrome");
runtime = watches(runtime, "runtime");
require_("./KWW")