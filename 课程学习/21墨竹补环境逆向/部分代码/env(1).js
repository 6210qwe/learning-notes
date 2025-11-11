console.log=function(){}
xuxu_loginfo = false;
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
};
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
    function ToString() {arg
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
const si = require('systeminformation');
Location=function(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}//不能new
fun_to_native(Location)

location = {
    "ancestorOrigins": {},
    "href": "http://www.czce.com.cn/cn/jysj/mrhq/H770301index_1.htm",
    "origin": "http://www.czce.com.cn",
    "protocol": "http:",
    "host": "www.czce.com.cn",
    "hostname": "www.czce.com.cn",
    "port": "",
    "pathname": "/cn/jysj/mrhq/H770301index_1.htm",
    "search": "",
    "hash": ""
}
location.__proto__=Location.prototype

window = globalThis;
const xhr2 = require('xhr2');
global.XMLHttpRequest = xhr2; // 关键点：全局注册
window.etrprtrt =0.01
Window=function(){}
fun_to_native(Window)
Object.setPrototypeOf(window, Window.prototype); 
window.Window=Window

window.crypto=function(arg){
    console.log("crypto  arg is=>",arg)
}
window.addEventListener=function(arg){
    console.log('addEventListener  arg is=>',arg)
}
fun_to_native(addEventListener)
window.Element=function(arg){
    console.log('Element  arg is=>',arg)
}
fun_to_native(Element)
window.webkitRTCPeerConnection =function(arg){
    console.log('webkitRTCPeerConnection  arg is=>',arg)
}
fun_to_native(webkitRTCPeerConnection)
window.postMessage =function(arg){
    console.log('postMessage arg is=>',arg)
}
fun_to_native(postMessage)
window.removeEventListener =function(arg){
    console.log('removeEventListener  arg is=>',arg)
}
window.PerformanceEntry =function(arg){
    console.log('PerformanceEntry  arg is=>',arg)
}
fun_to_native(PerformanceEntry)
window.open=function(arg){
    console.log('open arg is=>',arg)
}
fun_to_native(open)
window.screenLeft=962
window.screenTop =0
window.innerHeight =150
window.outerWidth =581
window.innerWidth = 566
window.outerHeight =823
window.Image=function(arg){
    console.log('Image arg is===>',arg)
}
function ImageMock() {}
ImageMock.prototype = {
    [Symbol.toStringTag]: 'HTMLImageElement',
    toString: function () {
        return '[object HTMLImageElement]';
    }
};
window.Image = watch(ImageMock,'Image')
fun_to_native(removeEventListener)
window.origin='https://login.taobao.com'
self=top=window
window.WindVane=watch({
    version: "3.0.7"
},'WindVane')
window.alert =function(arg){
    console.log('alert arg is=>',arg)
}
fun_to_native(alert)
window.MouseEvent=function(arg){
    console.log('MouseEvent  arg is=>',arg)
}
fun_to_native(MouseEvent)
window.TouchEvent=function(arg){
    console.log('TouchEvent  arg is=>',arg)
}
fun_to_native(TouchEvent)
window.HTMLMediaElement =function(arg){
    console.log('HTMLMediaElement   arg is=>',arg)
}
fun_to_native(HTMLMediaElement )
window.PointerEvent=function(arg){
    console.log('PointerEvent  arg is=>',arg)
}
fun_to_native(PointerEvent)
// window.AWSCInner=watch({
// },'AWSCInner')
window=watch(window,'window')
HTMLDocument=function HTMLDocument(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}  //不能new
fun_to_native(HTMLDocument)


document= {
    [Symbol.toStringTag]:'HTMLDocument',
    getElementsByTagName :function(arg){
        console.log('getElementsByTagName  arg is ==>',arg)
        if(arg === 'head'){
            let fakeHead = watch({
                onwheel: null,
                style: watch({}, 'getElementsByTagName("head")[0].style')
            }, 'getElementsByTagName("head")[0]');
            
            let result = [fakeHead]; 
            return watch(result, 'getElementsByTagName("head")');
        }
        if(arg=='div'){
            return watch({},'getElementsByTagName("head")')
        }
        if(arg=='base'){
            return watch({},'getElementsByTagName("base")')
        }
        if (arg=='script'){
            
            return watch({
                0:watch({
                    parentNode:watch({
                        insertBefore :function(newNode, referenceNode){
                            console.log('getElementsByTagName("script").0.parentNode.insertBefore==>',newNode,referenceNode)
                            return newNode
                        }
                    },'getElementsByTagName("script").0.parentNode ')
                },'getElementsByTagName("script").0')
            },'getElementsByTagName("script")')
        }
        debugger
    },
    cookie:'',
    referrer:'https://ads.taobao.com/',
    hidden :false,
    createElement :function(arg){
        console.log('createElement  arg is==>',arg)
        if(arg=='canvas'){
            return watch({
                getContext :function(ele){
                    if (ele=='webgl'){
                        return watch({
                            getExtension:function(ele){
                                if (ele=='WEBGL_debug_renderer_info'){
                                    return watch({
                                        UNMASKED_RENDERER_WEBGL: 37446,
                                        UNMASKED_VENDOR_WEBGL: 37445
                                    },'getExtension.WEBGL_debug_renderer_info')
                                }
                                if (ele=='WEBGL_lose_context'){
                                    return watch({
                                        loseContext : function(arg){
                                            return watch({},'getExtension.WEBGL_lose_context."loseContext"')
                                        }
                                    },'getExtension.WEBGL_lose_context')
                                }
                                debugger
                            },
                            getParameter:function(ele){
                                if(ele==37445){
                                    return 'Google Inc. (NVIDIA)'
                                }
                                if (ele==37446){
                                    return 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Laptop GPU (0x00002520) Direct3D11 vs_5_0 ps_5_0, D3D11)'
                                }
                                debugger
                            }
                        },'getContext.webgl')
                    }
                    if(ele=='2d'){
                        return watch({
                            fillRect:function(arg){
                                console.log('fillRect arg is ==>',arg)
                            },
                            fillText:function(arg){
                                console.log('fillText arg is==>',arg)
                            }
                        },'2d')
                    }
                    debugger
                    console.log('createElement.canvas.getContext ==>',ele)
                },
                getAttributeNames:function(ele){
                    debugger
                    console.log('createElement.canvas.getAttributeNames ==>',ele)
                },
                style:watch({},'createElement("canvas").style'),
                toDataURL :function(){
                    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg=='
                }
            },'createElement("canvas")')
        }
        if (arg=='a'){
            return watch({},'createElement."a"')
        }
        if(arg=='script'){
            return watch({},'createElement."script"')
        }
        debugger
    },
    currentScript :null,
    addEventListener:window.addEventListener,
    onmousewheel:null,
    querySelector:function(arg){
        console.log("querySelector  arg is=>",arg)
    },
    createEvent:function(arg){
        console.log('createEvent arg is=>',arg)
        debugger
    },
    readyState:'interactive',
    body:watch({
        appendChild :function(arg){
            console.log('document.body.appendChild==>',arg)
        }
    },'document.body'),
    head:watch({},'document.head')
}
fun_to_native(document.querySelector)
document.__proto__=HTMLDocument.prototype

document =watch( document,'document')
function Navigator(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}  //不能new
fun_to_native(Navigator)

Navigator.prototype={
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion:'5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    languages:["zh-CN","en","en-GB","en-US"],
    platform:'MacIntel',
};
webdriver=function webdriver(){
    console.log('webdriver=>',arguments)
}
fun_to_native(webdriver)
Object.defineProperty(Navigator.prototype,'webdriver', {
    get:webdriver,
    set:undefined,
    enumerable: true, // 可选，设置为不可枚举
    configurable: true, // 可选，设置为可配置
});
function createPlugin(name, filename, description, mimeTypes, tag) {
    const plugin = {
        name,
        filename,
        description,
        version: '1.0',       // 可加上 version 字段
        length: mimeTypes.length
    };

    // 让 plugin[0], plugin[1] 能访问到 mimeTypes
    mimeTypes.forEach((mime, i) => {
        plugin[i] = mime;
    });

    return watch(plugin, tag);
}

// 模拟的 MimeType 对象结构
function createMimeType(type, description, suffixes) {
    return {
        type,
        description,
        suffixes
    };
}
let plugins = [
    createPlugin(
        "PDF Viewer",
        "internal-pdf-viewer",
        "Portable Document Format",
        [
            createMimeType("application/pdf", "Portable Document Format", "pdf"),
            createMimeType("application/x-google-chrome-pdf", "Portable Document Format", "pdf")
        ],
        "plugins_0"
    ),
    createPlugin(
        "Chrome PDF Viewer",
        "internal-pdf-viewer",
        "Portable Document Format",
        [
            createMimeType("application/pdf", "Portable Document Format", "pdf"),
            createMimeType("application/x-google-chrome-pdf", "Portable Document Format", "pdf")
        ],
        "plugins_1"
    ),
    createPlugin(
        "Chrome PDF Viewer",
        "internal-pdf-viewer",
        "Portable Document Format",
        [
            createMimeType("application/pdf", "Portable Document Format", "pdf"),
            createMimeType("application/x-google-chrome-pdf", "Portable Document Format", "pdf")
        ],
        "plugins_2"
    ),
    createPlugin(
        "Microsoft Edge PDF Viewer",
        "internal-pdf-viewer",
        "Portable Document Format",
        [
            createMimeType("application/pdf", "Portable Document Format", "pdf"),
            createMimeType("application/x-google-chrome-pdf", "Portable Document Format", "pdf")
        ],
        "plugins_3"
    ),
    createPlugin(
        "WebKit built-in PDF",
        "internal-pdf-viewer",
        "Portable Document Format",
        [
            createMimeType("application/pdf", "Portable Document Format", "pdf"),
            createMimeType("application/x-google-chrome-pdf", "Portable Document Format", "pdf")
        ],
        "plugins_4"
    ),
];
navigator={
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    languages:["zh-CN","en","en-GB","en-US"],
    platform:'MacIntel',
    webdriver:false,
    maxTouchPoints:0,
    getBattery: async function () {
        const battery = await si.battery();

        // 构造类 BatteryManager 的对象
        const batteryManager = {
            charging: battery.isCharging,
            chargingTime: battery.acConnected ? 0 : Infinity,
            dischargingTime: battery.acConnected ? Infinity : null,
            level: battery.hasBattery ? battery.percent / 100 : 1,

            // 模拟事件回调注册（无实际触发机制）
            onchargingchange: null,
            onlevelchange: null,
            onchargingtimechange: null,
            ondischargingtimechange: null,

            // 提供 addEventListener 模拟（仅记录，非真实触发）
            addEventListener: function (event, handler) {
                console.log(`Listener registered for: ${event}`);
                this[`on${event}`] = handler;
            },
            removeEventListener: function (event) {
                this[`on${event}`] = null;
            }
        };

        return batteryManager;
    },
    vendor:'Google Inc.',
    hardwareConcurrency:20,
    language:'zh-CN',
    plugins : watch(plugins,'plugins')
}
navigator = watch(navigator,'navigator');
navigator.__proto__=Navigator.prototype

function Storage(){
    this.clear = function (ele){console.log("[native code] localStorage clear:::",ele)};
    this.getItem = function (ele){
        console.log("[native code] localStorage getItem:::",ele)
        return this[ele]
    };
    this.key = function (ele){console.log("[native code] localStorage key:::",ele)};
    this.removeItem = function (ele){
        console.log("[native code] localStorage removeItem:::",ele)
        delete this[ele]
    };
    this.setItem = function (key, value){
        console.log("[native code] localStorage setItem:::",key,value)
        this[key] = value;
    };

}

localStorage = new Storage()
localStorage.syfhs='2504829221'
localStorage.auyst='1754206992'
function Screen(){
    this.availWidth = 1536;
    this.availHeight = 816;
    this.width = 1536;
    this.height = 864;
    this.colorDepth = 24;
    this.pixelDepth = 24;
}
screen = new Screen()
screen=watch(screen,'screen')
localStorage=watch(localStorage ,'localStorage')

function History(){
    this.length = 2;
    this.scrollRestoration = "auto";
    this.state = null;
}

history = new History()
history=watch(history,'history')
window.Screen=Screen
window.Navigator=Navigator
require('./AWSC')
require('./et_f')
console.info(document.cookie)
// function extractTfstk() {
//     cookieString=document.cookie
//   const match = cookieString.match(/tfstk=([^;]+);/);
//   return match ? `tfstk=${match[1]}` : null;
// }
//
// console.info(extractTfstk())