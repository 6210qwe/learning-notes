dtavm = {}
dtavm.log = console.log
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
function proxy(obj, objname, type) {
    return obj;
}
function setProxyArr(proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        const handler = `{
      get: function(target, property, receiver) {
        if(property === "window"){
            return target[property];
        }
        if(property === "globalThis"){
            return target[property];
        }
        if(property === "console"){
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

require_ = require;
process_ = process;
delete __filename;
delete __dirname; 
delete global;
delete Buffer;
delete require;
delete process;

Window = function Window(){
    this.PERSISTENT = 1;
    this.TEMPORARY = 0;
}
Window.prototype.toString = function (){
    return '[object Window]'
}
Window.toString = function (){
    return 'function Window() { [native code] }'
}
Object.defineProperties(Window.prototype,{
    [Symbol.toStringTag]:{
        value:'Window'
    }
})
Object.defineProperties(globalThis,{
    [Symbol.toStringTag]:{
        value:'Window'
    }
})

HTMLDocument = function HTMLDocument(){}
HTMLDocument.prototype.toString = function (){
    return '[object HTMLDocument]'
}
HTMLDocument.toString = function (){
    return 'function HTMLDocument() { [native code] }'
}
Object.defineProperties(HTMLDocument.prototype,{
    [Symbol.toStringTag]:{
        value:'HTMLDocument'
    }
})
Document = function Document(){}
Document.prototype.toString = function (){
    return '[object Document]'
}
Document.toString = function (){
    return 'function Document() { [native code] }'
}
Object.defineProperties(Document.prototype,{
    [Symbol.toStringTag]:{
        value:'Document'
    }
});

Promise2 = {
    then: function () {
        return this;
    },
    catch: function (){},
};
Navigator = function Navigator(){};
Navigator.prototype.toString = function (){
    return '[object Navigator]'
}
NavigatorUAData = function NavigatorUAData() {
    this.brands = [{ brand: 'Not=A?Brand', version: '99' }, { brand: 'Chromium', version: '118' }];
    this.mobile = false;
    this.platform = 'Win32';
};
NavigatorUAData.prototype.toString = function (){
    return '[object NavigatorUAData]'
}
NavigatorUAData.toString = function (){
    return 'function NavigatorUAData() { [native code] }'
}
Object.defineProperties(NavigatorUAData.prototype,{
    [Symbol.toStringTag]:{
        value:'NavigatorUAData'
    }
})
userAgentDatac = new NavigatorUAData();
userAgentDatac = proxy(userAgentDatac, 'userAgentDatac');
Navigator.prototype.userAgentData = userAgentDatac;
MimeTypeArray = function MimeTypeArray() {
    this.length = 2;
    this['0'] = proxy({}, 'MimeTypeArray0');
    this['1'] = proxy({}, 'MimeTypeArray1');
};
MimeTypeArray.prototype.toString = function () { return '[object MimeTypeArray]'; }
MimeTypeArray.toString = function () { return 'function MimeTypeArray() { [native code] }'; }
Object.defineProperties(MimeTypeArray.prototype, { [Symbol.toStringTag]: { value: 'MimeTypeArray' } })
MimeTypeArrayc = new MimeTypeArray();
MimeTypeArrayc = proxy(MimeTypeArrayc, 'MimeTypeArrayc');
Navigator.prototype.mimeTypes = MimeTypeArrayc;
Navigator.prototype.connection = {
    downlink: 10,
    effectiveType: "4g",
    onchange: null,
    rtt: 50,
    saveData: false,
}

StorageManager = function StorageManager() {
    this.estimate = function estimate() {
        return proxy(Promise2,'Promise1');
    }
}
StorageManager.prototype.toString = function () { return '[object StorageManager]'; }
StorageManager.toString = function () { return 'function StorageManager() { [native code] }'; }
Object.defineProperties(StorageManager.prototype, { [Symbol.toStringTag]: { value: 'StorageManager' } })
storage = new StorageManager();
PluginArray = function PluginArray(){}
PluginArray.prototype.toString = function (){return '[object PluginArray]'}
PluginArray.toString = function (){return 'function PluginArray() { [native code] }'}
Object.defineProperties(PluginArray.prototype, { [Symbol.toStringTag]: { value: 'PluginArray' } })

Location = function Location(){}
Location.prototype.toString = function (){
    return '[object Location]'
}
Location.toString = function (){
    return 'function Location() { [native code] }'
}
Object.defineProperties(Location.prototype,{
    [Symbol.toStringTag]:{
        value:'Location'
    }
});

plugins = proxy({
    length: 5,
    '0': proxy({
        name: 'PDF Viewer',
        filename: 'internal-pdf-viewer',
        length: 2,
        '0': proxy({
            type:'application/pdf'
        }, 'plugins00'),
        '1': proxy({
            type:'text/pdf'
        },'plugins01')
    },'plugins0'),
    '1': proxy({
        name: 'Chrome PDF Viewer',
        filename: 'internal-pdf-viewer',
        length: 2,
        '0': proxy({
            type:'application/pdf'
        }, 'plugins10'),
        '1': proxy({
            type:'text/pdf'
        },'plugins11')
    },'plugins1'),
    '2': proxy({
        name: 'Chromium PDF Viewer',
        filename: 'internal-pdf-viewer',
        length: 2,
        '0': proxy({
            type:'application/pdf'
        }, 'plugins20'),
        '1': proxy({
            type:'text/pdf'
        },'plugins21')
    },'plugins2'),
    '3': proxy({
        name: 'Microsoft Edge PDF Viewer',
        filename: 'internal-pdf-viewer',
        length: 2,
        '0': proxy({
            type:'application/pdf'
        }, 'plugins30'),
        '1': proxy({
            type:'text/pdf'
        },'plugins31')
    },'plugins3'),
    '4': proxy({
        name: 'WebKit built-in PDF',
        filename: 'internal-pdf-viewer',
        length: 2,
        '0': proxy({
            type:'application/pdf'
        }, 'plugins40'),
        '1': proxy({
            type:'text/pdf'
        },'plugins41')
    },'plugins4')
}, 'plugins')
plugins.__proto__ = PluginArray.prototype;
Navigator.prototype.plugins = plugins
Navigator.prototype.requestMIDIAccess = function () {}
Navigator.prototype.cookieEnabled = true;
Navigator.prototype.webdriver = false;
Navigator.prototype.platform = 'Win32'
Navigator.prototype.vendor = 'Google Inc.'
Navigator.prototype.appCodeName = 'Mozilla'
Navigator.prototype.appName = 'Netscape'
Navigator.prototype.appVersion = "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
Navigator.prototype.deviceMemory = 8
Navigator.prototype.hardwareConcurrency = 8
Navigator.prototype.language = "zh-CN"
Navigator.prototype.languages = ['zh-CN', 'zh']
Navigator.prototype.maxTouchPoints = 10
Navigator.prototype.getBattery = function (){
    return proxy(Promise2,'Promise2'); // 电源状态信息
}
Navigator.prototype.storage = storage
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
Navigator.toString = function (){
    return 'function Navigator() { [native code] }'
}
Object.defineProperties(Navigator.prototype,{
    [Symbol.toStringTag]:{
        value:'Navigator'
    }
})

WebGLRenderingContext = function WebGLRenderingContext(){};
WebGLRenderingContext.prototype.toString = function (){
    return '[object WebGLRenderingContext]'
}
WebGLRenderingContext.toString = function (){
    return 'function WebGLRenderingContext() { [native code] }'
}
Object.defineProperties(WebGLRenderingContext.prototype,{
    [Symbol.toStringTag]:{
        value:'WebGLRenderingContext'
    }
})



window = globalThis;
window.__proto__ = Window.prototype;
window.outerWidth = 1536;
window.outerHeight = 824;
window.constructor.toString = function () { return 'function Window() { [native code] }'; }

HTMLImageElement = function HTMLImageElement() {
    this.src = '';
};
HTMLImageElement.prototype.toString = function (){
    return '[object HTMLImageElement]'
}
HTMLImageElement.toString = function (){
    return 'function HTMLImageElement() { [native code] }'
}
Object.defineProperties(HTMLImageElement.prototype,{
    [Symbol.toStringTag]:{
        value:'HTMLImageElement'
    }
})
imgc = new HTMLImageElement();
imgc = proxy(imgc, 'imgc');
document = {
    createElement: function (res) {
        if (res === 'img') {
            return imgc
        }
    },
    // incap_ses_893_1584510 访问首页得到
    cookie:'OptanonConsent=consentId=1da955c6-9d3e-4445-9d3c-0a239b3b88e3&datestamp=Mon+Feb+10+2025+11%3A35%3A55+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202211.2.0&interactionCount=0; incap_ses_893_1584510=+P29BL/e034pvMBj7JJkDCZ0qWcAAAAA45VlI3iefiZCG9domNmwWA=='
};
document.__proto__ = HTMLDocument.prototype;

navigator = {};
navigator.__proto__ = Navigator.prototype;

location = {
    "ancestorOrigins": {},
    "href": "https://www.thaiairways.com/",
    "origin": "https://www.thaiairways.com",
    "protocol": "https:",
    "host": "www.thaiairways.com",
    "hostname": "www.thaiairways.com",
    "port": "",
    "pathname": "/",
    "search": "",
    "hash": ""
};
location.__proto__ = Location.prototype;
Object.keys_ = Object.keys;
Object.keys = function (obj) {
    if (obj.toString() === '[object Window]') {
        return [
            "0",
            "1",
            "2",
            "window",
            "self",
            "document",
            "name",
            "location",
            "customElements",
            "history",
            "navigation",
            "locationbar",
            "menubar",
            "personalbar",
            "scrollbars",
            "statusbar",
            "toolbar",
            "status",
            "closed",
            "frames",
            "length",
            "top",
            "opener",
            "parent",
            "frameElement",
            "navigator",
            "origin",
            "external",
            "screen",
            "innerWidth",
            "innerHeight",
            "scrollX",
            "pageXOffset",
            "scrollY",
            "pageYOffset",
            "visualViewport",
            "screenX",
            "screenY",
            "outerWidth",
            "outerHeight",
            "devicePixelRatio",
            "clientInformation",
            "screenLeft",
            "screenTop",
            "styleMedia",
            "onsearch",
            "isSecureContext",
            "trustedTypes",
            "performance",
            "onappinstalled",
            "onbeforeinstallprompt",
            "crypto",
            "indexedDB",
            "sessionStorage",
            "localStorage",
            "onbeforexrselect",
            "onabort",
            "onbeforeinput",
            "onbeforetoggle",
            "onblur",
            "oncancel",
            "oncanplay",
            "oncanplaythrough",
            "onchange",
            "onclick",
            "onclose",
            "oncontextlost",
            "oncontextmenu",
            "oncontextrestored",
            "oncuechange",
            "ondblclick",
            "ondrag",
            "ondragend",
            "ondragenter",
            "ondragleave",
            "ondragover",
            "ondragstart",
            "ondrop",
            "ondurationchange",
            "onemptied",
            "onended",
            "onerror",
            "onfocus",
            "onformdata",
            "oninput",
            "oninvalid",
            "onkeydown",
            "onkeypress",
            "onkeyup",
            "onload",
            "onloadeddata",
            "onloadedmetadata",
            "onloadstart",
            "onmousedown",
            "onmouseenter",
            "onmouseleave",
            "onmousemove",
            "onmouseout",
            "onmouseover",
            "onmouseup",
            "onmousewheel",
            "onpause",
            "onplay",
            "onplaying",
            "onprogress",
            "onratechange",
            "onreset",
            "onresize",
            "onscroll",
            "onsecuritypolicyviolation",
            "onseeked",
            "onseeking",
            "onselect",
            "onslotchange",
            "onstalled",
            "onsubmit",
            "onsuspend",
            "ontimeupdate",
            "ontoggle",
            "onvolumechange",
            "onwaiting",
            "onwebkitanimationend",
            "onwebkitanimationiteration",
            "onwebkitanimationstart",
            "onwebkittransitionend",
            "onwheel",
            "onauxclick",
            "ongotpointercapture",
            "onlostpointercapture",
            "onpointerdown",
            "onpointermove",
            "onpointerrawupdate",
            "onpointerup",
            "onpointercancel",
            "onpointerover",
            "onpointerout",
            "onpointerenter",
            "onpointerleave",
            "onselectstart",
            "onselectionchange",
            "onanimationend",
            "onanimationiteration",
            "onanimationstart",
            "ontransitionrun",
            "ontransitionstart",
            "ontransitionend",
            "ontransitioncancel",
            "onafterprint",
            "onbeforeprint",
            "onbeforeunload",
            "onhashchange",
            "onlanguagechange",
            "onmessage",
            "onmessageerror",
            "onoffline",
            "ononline",
            "onpagehide",
            "onpageshow",
            "onpopstate",
            "onrejectionhandled",
            "onstorage",
            "onunhandledrejection",
            "onunload",
            "crossOriginIsolated",
            "scheduler",
            "alert",
            "atob",
            "blur",
            "btoa",
            "cancelAnimationFrame",
            "cancelIdleCallback",
            "captureEvents",
            "clearInterval",
            "clearTimeout",
            "close",
            "confirm",
            "createImageBitmap",
            "fetch",
            "find",
            "focus",
            "getComputedStyle",
            "getSelection",
            "matchMedia",
            "moveBy",
            "moveTo",
            "open",
            "postMessage",
            "print",
            "prompt",
            "queueMicrotask",
            "releaseEvents",
            "reportError",
            "requestAnimationFrame",
            "requestIdleCallback",
            "resizeBy",
            "resizeTo",
            "scroll",
            "scrollBy",
            "scrollTo",
            "setInterval",
            "setTimeout",
            "stop",
            "structuredClone",
            "webkitCancelAnimationFrame",
            "webkitRequestAnimationFrame",
            "chrome",
            "caches",
            "cookieStore",
            "ondevicemotion",
            "ondeviceorientation",
            "ondeviceorientationabsolute",
            "launchQueue",
            "documentPictureInPicture",
            "onbeforematch",
            "getScreenDetails",
            "openDatabase",
            "queryLocalFonts",
            "showDirectoryPicker",
            "showOpenFilePicker",
            "showSaveFilePicker",
            "originAgentCluster",
            "credentialless",
            "speechSynthesis",
            "oncontentvisibilityautostatechange",
            "onscrollend",
            "webkitRequestFileSystem",
            "webkitResolveLocalFileSystemURL",
            "$",
            "jQuery",
            "jQuery182008956579204758763",
            "urlStrArray",
            "siteName",
            "locationName",
            "pageType",
            "dataLayer",
            "cntryUrl",
            "a1_0x1f27",
            "a1_0x47e4",
            "reese84",
            "reese84interrogatorconstructor",
            "initializeProtection",
            "reeseScriptLoadCount",
            "protectionSubmitCaptcha",
            "_0x6911",
            "_0x1691",
            "numberA",
            "i",
            "j",
            "google_tag_manager",
            "postscribe",
            "google_tag_manager_external",
            "google_tag_data",
            "gtag",
            "fbq",
            "_fbq",
            "OneTrustStub",
            "OptanonWrapper",
            "GoogleAnalyticsObject",
            "ga",
            "gaAccounts",
            "gaDomain",
            "refGadomain",
            "_gaq",
            "tracker",
            "gd1",
            "dpnme",
            "dom",
            "path",
            "parameters",
            "url",
            "pnme",
            "OtTrustedType",
            "OnetrustActiveGroups",
            "OptanonActiveGroups",
            "otStubData",
            "Optanon",
            "OneTrust",
            "_gat",
            "gaGlobal",
            "gaplugins",
            "gaData",
            "__INSIDER_SCRIPT_VERSION_thaiairways__",
            "pm",
            "sQuery",
            "spApi",
            "Insider"
        ]
    }
    return Object.keys_(obj);
}

setProxyArr(['window']);
document = proxy(document, 'document');
navigator = proxy(navigator, 'navigator');
WebGLRenderingContext.prototype = proxy(WebGLRenderingContext.prototype, 'WebGLRenderingContext');
require_('./_Incapsula_Resource.js');

function get___utmvc_url() {
    return {
        '___utmvc': document.cookie.split(';')[0].split('=')[1],
        'yz_url':'https://www.thaiairways.com' + imgc.src
    }
}
console.log(get___utmvc_url())