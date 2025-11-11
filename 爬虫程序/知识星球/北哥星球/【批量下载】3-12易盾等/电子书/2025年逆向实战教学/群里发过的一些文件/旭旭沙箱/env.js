/*
 * 配置项
 * xuxu_loginfo 决定是否开启日志打印
 * defaultFilterProps 过滤无需关注的对象或方法
 * windowEnumerable 网页中window存在的可枚举的对象或方法
 * docuemntEnumerable 网页document中存在的可枚举的对象或方法
 * navigatorEnumerable 网页navigator中存在的可枚举的对象或方法
 * doesnotexist 补出来的window中 document中 navigator中 不存在于 网页中的 对象或方法
 * 
 * 注意事项
 * Location.prototype=watch(Location.prototype, `方法原型:Location.prototype`)   代理方法原型必须要加上 方法原型 这四个字 因为代理里面需要判断
 * 用以下的顺序进行代理和指定原型 ，先代理对象，后代理方法原型，再代理方法，最后指定原型， 这样才不会有问题
 * location = watch({},'location');
 * Location.prototype=watch(Location.prototype, `方法原型:Location.prototype`)
 * Location=watch(Location, 'Location')
 * Object.setPrototypeOf(location, Location.prototype);
 */
xuxu_loginfo = true;
(()=>{
    const origin_log = console.log;
    xuxu_log = function(){
        if (xuxu_loginfo){
            return origin_log(...arguments)
        }
    }
})();


const defaultFilterProps=['Math','Proxy','Promise','Array','isNaN','encodeURI','Uint8Array','toJSON','parseInt',Symbol.toPrimitive,'String','Object','Symbol','ActiveXObject','mozHidden','attachEvent','Date','_phantom','domAutomation','XDomainRequest','emit','spawn','callPhantom','Buffer','__nightmare','_Selenium_IDE_Recorder','__$webdriverAsyncExecutor','__driver_evaluate','__driver_unwrapped','__fxdriver_evaluate','__fxdriver_unwrapped','__lastWatirAlert','__lastWatirConfirm','__lastWatirPrompt','__phantomas','__selenium_evaluate','__selenium_unwrapped','__webdriverFuncgeb','__webdriver__chr','__webdriver_evaluate','__webdriver_script_fn','__webdriver_script_func','__webdriver_unwrapped','callSelenium','calledPhantom','calledSelenium','domAutomationController','watinExpressionError','watinExpressionResult','spynner_additional_js_loaded','$chrome_asyncScriptInfo','__webdriver_script_function','SharedArrayBuffer','documentMode','opera','InstallTrigger','mozInnerScreenY'];


var existsobj = {
    'windowEnumerable': ["window","self","document","name","location","customElements","history","navigation","locationbar","menubar","personalbar","scrollbars","statusbar","toolbar","status","closed","frames","length","top","opener","parent","frameElement","navigator","origin","external","screen","innerWidth","innerHeight","scrollX","pageXOffset","scrollY","pageYOffset","visualViewport","screenX","screenY","outerWidth","outerHeight","devicePixelRatio","event","clientInformation","screenLeft","screenTop","styleMedia","onsearch","trustedTypes","performance","onappinstalled","onbeforeinstallprompt","crypto","indexedDB","sessionStorage","localStorage","onbeforexrselect","onabort","onbeforeinput","onbeforematch","onbeforetoggle","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontentvisibilityautostatechange","oncontextlost","oncontextmenu","oncontextrestored","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onsecuritypolicyviolation","onseeked","onseeking","onselect","onslotchange","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","onauxclick","ongotpointercapture","onlostpointercapture","onpointerdown","onpointermove","onpointerrawupdate","onpointerup","onpointercancel","onpointerover","onpointerout","onpointerenter","onpointerleave","onselectstart","onselectionchange","onanimationend","onanimationiteration","onanimationstart","ontransitionrun","ontransitionstart","ontransitionend","ontransitioncancel","onafterprint","onbeforeprint","onbeforeunload","onhashchange","onlanguagechange","onmessage","onmessageerror","onoffline","ononline","onpagehide","onpageshow","onpopstate","onrejectionhandled","onstorage","onunhandledrejection","onunload","isSecureContext","crossOriginIsolated","scheduler","alert","atob","blur","btoa","cancelAnimationFrame","cancelIdleCallback","captureEvents","clearInterval","clearTimeout","close","confirm","createImageBitmap","fetch","find","focus","getComputedStyle","getSelection","matchMedia","moveBy","moveTo","open","postMessage","print","prompt","queueMicrotask","releaseEvents","reportError","requestAnimationFrame","requestIdleCallback","resizeBy","resizeTo","scroll","scrollBy","scrollTo","setInterval","setTimeout","stop","structuredClone","webkitCancelAnimationFrame","webkitRequestAnimationFrame","chrome","caches","cookieStore","ondevicemotion","ondeviceorientation","ondeviceorientationabsolute","launchQueue","sharedStorage","documentPictureInPicture","fetchLater","getDigitalGoodsService","getScreenDetails","queryLocalFonts","showDirectoryPicker","showOpenFilePicker","showSaveFilePicker","originAgentCluster","onpageswap","onpagereveal","credentialless","fence","speechSynthesis","oncommand","onscrollend","onscrollsnapchange","onscrollsnapchanging","webkitRequestFileSystem","webkitResolveLocalFileSystemURL","arr","x","TEMPORARY","PERSISTENT","addEventListener","dispatchEvent","removeEventListener","when"],
    'documentEnumerable':  ["location","implementation","URL","documentURI","compatMode","characterSet","charset","inputEncoding","contentType","doctype","documentElement","xmlEncoding","xmlVersion","xmlStandalone","domain","referrer","cookie","lastModified","readyState","title","dir","body","head","images","embeds","plugins","links","forms","scripts","currentScript","defaultView","designMode","onreadystatechange","anchors","applets","fgColor","linkColor","vlinkColor","alinkColor","bgColor","all","scrollingElement","onpointerlockchange","onpointerlockerror","hidden","visibilityState","wasDiscarded","prerendering","featurePolicy","webkitVisibilityState","webkitHidden","onbeforecopy","onbeforecut","onbeforepaste","onfreeze","onprerenderingchange","onresume","onsearch","onvisibilitychange","timeline","fullscreenEnabled","fullscreen","onfullscreenchange","onfullscreenerror","webkitIsFullScreen","webkitCurrentFullScreenElement","webkitFullscreenEnabled","webkitFullscreenElement","onwebkitfullscreenchange","onwebkitfullscreenerror","rootElement","pictureInPictureEnabled","onbeforexrselect","onabort","onbeforeinput","onbeforematch","onbeforetoggle","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontentvisibilityautostatechange","oncontextlost","oncontextmenu","oncontextrestored","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onsecuritypolicyviolation","onseeked","onseeking","onselect","onslotchange","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","onauxclick","ongotpointercapture","onlostpointercapture","onpointerdown","onpointermove","onpointerrawupdate","onpointerup","onpointercancel","onpointerover","onpointerout","onpointerenter","onpointerleave","onselectstart","onselectionchange","onanimationend","onanimationiteration","onanimationstart","ontransitionrun","ontransitionstart","ontransitionend","ontransitioncancel","oncopy","oncut","onpaste","children","firstElementChild","lastElementChild","childElementCount","activeElement","styleSheets","pointerLockElement","fullscreenElement","adoptedStyleSheets","pictureInPictureElement","fonts","adoptNode","append","captureEvents","caretRangeFromPoint","clear","close","createAttribute","createAttributeNS","createCDATASection","createComment","createDocumentFragment","createElement","createElementNS","createEvent","createExpression","createNSResolver","createNodeIterator","createProcessingInstruction","createRange","createTextNode","createTreeWalker","elementFromPoint","elementsFromPoint","evaluate","execCommand","exitFullscreen","exitPictureInPicture","exitPointerLock","getAnimations","getElementById","getElementsByClassName","getElementsByName","getElementsByTagName","getElementsByTagNameNS","getSelection","hasFocus","hasStorageAccess","hasUnpartitionedCookieAccess","importNode","moveBefore","open","prepend","queryCommandEnabled","queryCommandIndeterm","queryCommandState","queryCommandSupported","queryCommandValue","querySelector","querySelectorAll","releaseEvents","replaceChildren","requestStorageAccess","requestStorageAccessFor","startViewTransition","webkitCancelFullScreen","webkitExitFullscreen","write","writeln","fragmentDirective","browsingTopics","hasPrivateToken","hasRedemptionRecord","oncommand","onscrollend","onscrollsnapchange","onscrollsnapchanging","caretPositionFromPoint","nodeType","nodeName","baseURI","isConnected","ownerDocument","parentNode","parentElement","childNodes","firstChild","lastChild","previousSibling","nextSibling","nodeValue","textContent","ELEMENT_NODE","ATTRIBUTE_NODE","TEXT_NODE","CDATA_SECTION_NODE","ENTITY_REFERENCE_NODE","ENTITY_NODE","PROCESSING_INSTRUCTION_NODE","COMMENT_NODE","DOCUMENT_NODE","DOCUMENT_TYPE_NODE","DOCUMENT_FRAGMENT_NODE","NOTATION_NODE","DOCUMENT_POSITION_DISCONNECTED","DOCUMENT_POSITION_PRECEDING","DOCUMENT_POSITION_FOLLOWING","DOCUMENT_POSITION_CONTAINS","DOCUMENT_POSITION_CONTAINED_BY","DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC","appendChild","cloneNode","compareDocumentPosition","contains","getRootNode","hasChildNodes","insertBefore","isDefaultNamespace","isEqualNode","isSameNode","lookupNamespaceURI","lookupPrefix","normalize","removeChild","replaceChild","addEventListener","dispatchEvent","removeEventListener","when"],
    'navigatorEnumerable': ["vendorSub","productSub","vendor","maxTouchPoints","scheduling","userActivation","doNotTrack","geolocation","connection","plugins","mimeTypes","pdfViewerEnabled","webkitTemporaryStorage","webkitPersistentStorage","windowControlsOverlay","hardwareConcurrency","cookieEnabled","appCodeName","appName","appVersion","platform","product","userAgent","language","languages","onLine","webdriver","getGamepads","javaEnabled","sendBeacon","vibrate","deprecatedRunAdAuctionEnforcesKAnonymity","protectedAudience","bluetooth","storageBuckets","clipboard","credentials","keyboard","managed","mediaDevices","storage","serviceWorker","virtualKeyboard","wakeLock","deviceMemory","userAgentData","login","ink","mediaCapabilities","devicePosture","hid","locks","gpu","mediaSession","permissions","presentation","serial","usb","xr","adAuctionComponents","runAdAuction","canLoadAdAuctionFencedFrame","canShare","share","clearAppBadge","getBattery","getUserMedia","requestMIDIAccess","requestMediaKeySystemAccess","setAppBadge","webkitGetUserMedia","clearOriginJoinedAdInterestGroups","createAuctionNonce","joinAdInterestGroup","leaveAdInterestGroup","updateAdInterestGroups","deprecatedReplaceInURN","deprecatedURNToURL","getInstalledRelatedApps","getInterestGroupAdAuctionData","registerProtocolHandler","unregisterProtocolHandler"],
}

!(function () {
    watch = function (obj, name) {
        return new Proxy(obj, {
            get(target, property, receiver) {
                if (name)
                    if (defaultFilterProps.includes(property)) {
                        var val = Reflect.get(...arguments);
                        return val
                    }
                    else {
                        var val = Reflect.get(...arguments);
                        if (property === Symbol.for('nodejs.util.inspect.custom') || property === Symbol.for('debug.description')){
                            var val = Reflect.get(...arguments);
                            return val
                        }
                        if (name.indexOf('方法原型') !== -1 && name.indexOf('方法原型') !== undefined){
                            if (property === "0" || property === Symbol.for('nodejs.util.inspect.custom')) {
                                var val = Reflect.get(...arguments);
                                return val
                            }
                            if (!(property === '__proto__') && (receiver === Navigator.prototype || receiver === HTMLDocument.prototype)){
                                debugger
                                throw new TypeError("Illegal constructor");
                            }
                        }
                        if (typeof val === 'function') {
                            xuxu_log(`取值:`, name, '.', property, `=>`, 'function');
                        }
                        else {
                            xuxu_log(`取值:`, name, '.', property, `=>`, val);
                        }
                        if (name === 'window' && val === undefined){
                            if (existsobj['windowEnumerable'].includes(property)){
                                xuxu_log(`存在于=>`,'window', `没有补=>`, property, `undefined`);
                            }
                        }
                        if (name === 'document' && val === undefined){
                            if (existsobj['documentEnumerable'].includes(property)){
                                xuxu_log(`存在于=>`,'document', `没有补=>`, property, `undefined`);
                            }
                        }
                        if (name === 'navigator' && val === undefined){
                            if (existsobj['navigatorEnumerable'].includes(property)){
                                xuxu_log(`存在于=>`,'navigator', `没有补=>`, property, `undefined`);
                            }
                        }
                        return val
                    }
            },
            set(target, property, newValue, receiver) {
                var val = Reflect.set(...arguments)
                if (typeof value === 'function') {
                    xuxu_log(`设置值:${name}.${property}=>function`);
                }
                else {
                    xuxu_log(`设置值:${name}.${property}=>`,newValue);
                }
                return val
            },
            has(target, key) {
                if (key.toString() === 'Symbol(Symbol.iterator)'){
                    return key in target;
                }
                xuxu_log(`检测属性存在性: ${name}.${key.toString()}`);
                return key in target;
            },
            ownKeys(target) {
                xuxu_log(`ownKeys检测: ${name}`);
                return Reflect.ownKeys(...arguments)
            }
        })
    }
})();


(()=> {
    'use strict';
    const $toString = Function.toString
    const syString = Symbol('ToString')
    function ToString() {
        if (this === objgetwindow.get){
            debugger
            return 'function get window() { [native code] }'
        }
        if (this === objgetdocument.get){
            debugger
            return 'function get document() { [native code] }' 
        }
        return typeof this == 'function' && this[syString] || $toString.call(this)
    }
    function to_native(fun, key, value) {
        Object.defineProperty(fun, key, {
            value: value,
            writable: false, // 可选，设置为不可写
            enumerable: false, // 可选，设置为不可枚举
            configurable: true, // 可选，设置为可配置
        });
    }
    delete Function.prototype['toString'];
    to_native(Function.prototype, 'toString', ToString)
    to_native(Function.prototype.toString, syString, "function toString() { [native code] }");
    to_native(Function.prototype.toString, 'name', "toString");
    global.fun_to_native=function (fun) {
        to_native(fun, syString, `function ${fun.name}() { [native code] }`)
    }
})(global);


const getwindow = function get_window(ele) {
  debugger;
};
objgetwindow={
    get:getwindow
}

const getdocument = function get_document(ele) {
  debugger;
};
objgetdocument={
    get:getdocument
}

// 检测点
getOwnPropertyDescriptor_=Object.getOwnPropertyDescriptor
Object.getOwnPropertyDescriptor = function (obj, prop) {
    debugger
    if (obj === navigator && prop === 'userAgent') {
        return undefined
    }
    if (obj === navigator && prop === 'webdriver'){
        return undefined
    }
    if(obj === window && prop === 'document'){
        debugger
        objgetdocument.configurable=false
        objgetdocument.set = undefined
        return objgetdocument
    }
    if(obj === window && prop === 'window'){
        debugger
        objgetwindow.configurable=false
        objgetwindow.set = undefined
        return objgetwindow
    }
    return getOwnPropertyDescriptor_(obj, prop)
}
Object.defineProperty(Object.getOwnPropertyDescriptor, 'name', {
  value: 'getOwnPropertyDescriptor',
  configurable: true
});
fun_to_native(Object.getOwnPropertyDescriptor);


// 检测点
(function () {
    const original = Object.getOwnPropertyDescriptors;
    Object.getOwnPropertyDescriptors = function (target) {
        debugger;
        return original.call(this, target);
    };
})();
// 检测点
(function () {
    const original = Object.keys;
    Object.keys = function (target) {
        debugger;
        return original.call(this, target);
    };
})();







EventTarget=function EventTarget(){}
addEventListener=function addEventListener() {
    if (this.__proto__ === HTMLIFrameElement.prototype){
        debugger
        this['add'] = arguments[0]
        this['addfun'] = arguments[1]
    }
    xuxu_log('addEventListener=>',arguments)
}
fun_to_native(addEventListener)
dispatchEvent=function dispatchEvent() {
    xuxu_log('dispatchEvent=>',arguments)
    return ""
}
fun_to_native(dispatchEvent)
removeEventListener=function removeEventListener(){
    xuxu_log('removeEventListener=>',arguments)
    return ""
}
fun_to_native(removeEventListener)

EventTarget.prototype={
    addEventListener:addEventListener,
    dispatchEvent:dispatchEvent,
    removeEventListener:removeEventListener,
    constructor:EventTarget,
}
Object.defineProperty(EventTarget.prototype, Symbol.toStringTag, {
    value: 'EventTarget',
    writable: false, // 可选，设置为不可写
    enumerable: false, // 可选，设置为不可枚举
    configurable: true, // 可选，设置为可配置
});
fun_to_native(EventTarget)

WindowProperties=new EventTarget()
Object.defineProperty(WindowProperties, Symbol.toStringTag, {
    value: 'WindowProperties',
    writable: false, // 可选，设置为不可写
    enumerable: false, // 可选，设置为不可枚举
    configurable: true, // 可选，设置为可配置
});;
WindowProperties=new EventTarget()
Object.defineProperty(WindowProperties, Symbol.toStringTag, {
    value: 'WindowProperties',
    writable: false, // 可选，设置为不可写
    enumerable: false, // 可选，设置为不可枚举
    configurable: true, // 可选，设置为可配置
});


Window=function Window(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

    }
} //不能new
Object.setPrototypeOf(Window, EventTarget)
Object.setPrototypeOf(Window.prototype, WindowProperties);
Window.prototype.PERSISTENT=1
Window.prototype.TEMPORARY=0
Object.defineProperty(Window.prototype, Symbol.toStringTag, {
    value: 'Window',
    writable: false, // 可选，设置为不可写
    enumerable: false, // 可选，设置为不可枚举
    configurable: true, // 可选，设置为可配置
});
fun_to_native(Window)


window = global;
window = watch(window,'window');
Object.defineProperty(window, 'window', {
    value: window,
    writable: false, // 可选，设置为不可写
    enumerable: false, // 可选，设置为不可枚举
    configurable: false, // 可选，设置为可配置
});
Object.defineProperty(window, Symbol.toStringTag, {
    value: 'Window',
    writable: false, // 可选，设置为不可写
    enumerable: false, // 可选，设置为不可枚举
    configurable: true, // 可选，设置为可配置
});
window.__proto__ = Window.prototype;

window.alert=function alert(){
    debugger
}
fun_to_native(alert)








Location=function(){
  if (new.target) {
  throw new TypeError('Illegal constructor');
} else {

}
}//不能new
Object.defineProperty(Location.prototype, Symbol.toStringTag, {
  value: 'Location',
  writable: false, // 可选，设置为不可写
  enumerable: false, // 可选，设置为不可枚举
  configurable: true, // 可选，设置为可配置
});
Object.defineProperty(Location, 'toString', {
    value: () => "function Location() { [native code] }"
});
fun_to_native(Location)

location = watch({},'location');
Location.prototype=watch(Location.prototype, `方法原型:Location.prototype`)
Location=watch(Location, 'Location')
Object.setPrototypeOf(location, Location.prototype);







Node=function Node(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}   //不能new
Object.setPrototypeOf(Node, EventTarget);
Object.setPrototypeOf(Node.prototype, EventTarget.prototype)
Node.prototype.ATTRIBUTE_NODE=2
Object.defineProperty(Node.prototype, Symbol.toStringTag, {
    value: 'Node',
    writable: false, // 可选，设置为不可写
    enumerable: false, // 可选，设置为不可枚举
    configurable: true, // 可选，设置为可配置
});


Document=function Document(){}  //能new
fun_to_native(Document)
Object.setPrototypeOf(Document, Node);
Object.setPrototypeOf(Document.prototype, Node.prototype);

HTMLDocument=function HTMLDocument(){
    if (new.target) {
        throw new TypeError('Illegal constructor');
    }
}  //不能new
Object.setPrototypeOf(HTMLDocument, Document);
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype);

Object.defineProperty(HTMLDocument.prototype, Symbol.toStringTag, {
  value: 'HTMLDocument',
  writable: false, // 可选，设置为不可写
  enumerable: false, // 可选，设置为不可枚举
  configurable: true, // 可选，设置为可配置
});
fun_to_native(HTMLDocument);

document = watch({
    [Symbol.toStringTag]:'HTMLDocument',
    visibilityState:'hidden',
    webkitHidden:false,
    hidden:false,
    cookie:'',
    createElement:function(ele){
        debugger
    }
}, 'document')
HTMLDocument.prototype=watch(HTMLDocument.prototype, `方法原型:HTMLDocument.prototype`)
Object.setPrototypeOf(document, HTMLDocument.prototype);


Navigator=function Navigator(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}  //不能new
Navigator.prototype = {
    [Symbol.toStringTag]:'Navigator',
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0',
    vendor: 'Google Inc.',
    product: 'Gecko',
    productSub: '20030107',
    language: 'zh-CN',
    languages: [
        "zh-CN",
        "en",
        "en-GB",
        "en-US"
    ],
    platform:'Win32',
    webdriver:false,
    maxTouchPoints:0,
    plugins: watch({}, 'plugins'),
    hardwareConcurrency:8,
}
fun_to_native(Navigator)

navigator = watch({},'navigator');
Navigator.prototype=watch(Navigator.prototype, `方法原型:Navigator.prototype`)
Navigator=watch(Navigator, 'Navigator')
Object.setPrototypeOf(navigator, Navigator.prototype);







window.window=window;
frames = parent = globalThis = self = top = window;
window.clientInformation = navigator;
document.location = location;

// 删除本地特征
delete WindowProperties; //这个对象并不在全局里，所以需要删掉
delete process; //node特征
delete clearImmediate;  //node特征
delete global;  //node特征
delete Buffer;  //node特征

// 清除执行代码前的控制台日志
console.clear();