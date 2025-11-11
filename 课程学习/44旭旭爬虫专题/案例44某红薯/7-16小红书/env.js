/* * 配置项
 * xuxu_loginfo 决定是否开启日志打印
 * defaultFilterProps 过滤无需关注的对象或方法
 * windowEnumerable 网页中window存在的可枚举的对象或方法
 * docuemntEnumerable 网页document中存在的可枚举的对象或方法
 * navigatorEnumerable 网页navigator中存在的可枚举的对象或方法
 * doesnotexist 补出来的window中 document中 navigator中 不存在于 网页中的 对象或方法
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
                            if (!(property === '__proto__') && (receiver === Navigator.prototype)){
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
                if(name === window){
                    debugger
                }
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
        return typeof this == 'function' && this[syString] || $toString.call(this)
    }
    function to_native(fun, key, value) {
        Object.defineProperty(fun, key, {
            value: value,
            writable: true, // 可选，设置为不可写
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



getOwnPropertyDescriptor_=Object.getOwnPropertyDescriptor
Object.getOwnPropertyDescriptor = function (obj, prop) {
    debugger
    if (obj === navigator && prop === 'userAgent') {
        return undefined
    }
    if (obj === navigator && prop === 'webdriver'){
        return undefined
    }
    return getOwnPropertyDescriptor_(obj, prop)
}
fun_to_native(Object.getOwnPropertyDescriptor);




window = global;
window = watch(window,'window')
Object.defineProperty(window, Symbol.toStringTag, {
    value: 'Window',
    writable: false, // 可选，设置为不可写
    enumerable: false, // 可选，设置为不可枚举
    configurable: true, // 可选，设置为可配置
});

window.innerWidth=350;
window.innerHeight=708;
window.outerWidth=1536;
window.outerHeight=816;
window.devicePixelRatio=1.25
window.pageXOffset=0;
window.pageYOffset=0;
window.scrollX=0;
window.scrollY=0;


window.addEventListener=function(){}
fun_to_native(window.addEventListener)

window.MouseEvent=function MouseEvent(){
    debugger
}
fun_to_native(window.MouseEvent)

window.TouchEvent=function TouchEvent(){
    debugger
}
fun_to_native(window.TouchEvent)


window.requestAnimationFrame=function requestAnimationFrame(){
    debugger
}
fun_to_native(window.requestAnimationFrame)

window.requestIdleCallback=function requestIdleCallback(){
    debugger
}
fun_to_native(window.requestIdleCallback)

window.XMLHttpRequest=function XMLHttpRequest(){
    debugger
}
fun_to_native(window.XMLHttpRequest)


window.Event=function Event(){
    debugger
}
fun_to_native(window.Event)


window.chrome=watch({
    "app": {
        "isInstalled": false,
        "InstallState": {
            "DISABLED": "disabled",
            "INSTALLED": "installed",
            "NOT_INSTALLED": "not_installed"
        },
        "RunningState": {
            "CANNOT_RUN": "cannot_run",
            "READY_TO_RUN": "ready_to_run",
            "RUNNING": "running"
        }
    }
},'chrome')


location = watch({
    "ancestorOrigins": {},
    "href": "https://www.xiaohongshu.com/explore",
    "origin": "https://www.xiaohongshu.com",
    "protocol": "https:",
    "host": "www.xiaohongshu.com",
    "hostname": "www.xiaohongshu.com",
    "port": "",
    "pathname": "/explore",
    "search": "",
    "hash": ""
},'location')



document = watch({
    addEventListener:window.addEventListener,
    all:watch({
        length:967
    },'all'),
    createElement:function(ele){
        debugger
        xuxu_log('document.createElement=>',ele)
    },
    documentElement:watch({
        getAttribute:function(ele){
            xuxu_log('document.documentElement.getAttribute=>',ele)
        }
    }, 'documentElement'),
    getElementsByTagName:function(ele){
        xuxu_log('document.getElementsByTagName=>',ele)
        if (ele === '*'){
            // var allobj = watch({
            //     length:967
            // },'allobj')
            // return allobj
            return []
        }
    },
    body:watch({
        removeChild:function(ele){
            xuxu_log('document.body.removeChild=>',ele)
        }
    },'body'),
    cookie:'abRequestId=d40e3f59-73e6-5f4d-942c-92877072842a; a1=194da5a76c3k7crl0wbwz6o368qk8rfu2h2rtoncb50000123296; webId=b099ac742ff39b0e1f0e5609430db70c; gid=yj4f0Kyf2yJ2yj4f020WKxlISqTWSF18EDEuJSDKlqKYAF28TYFi79888yJqJjK8q4J0J4KW; xsecappid=xhs-pc-web; webBuild=4.72.0; loadts=1752792586223; websectiga=cf46039d1971c7b9a650d87269f31ac8fe3bf71d61ebf9d9a0a87efb414b816c; unread={%22ub%22:%22686f5ea3000000002001aa46%22%2C%22ue%22:%22686a5fe60000000010013910%22%2C%22uc%22:25}',
},'document')



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
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0',
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
    plugins: watch({
        0:watch({
            name:'PDF Viewer'
        }, 'plugins0'),
        1:watch({
            name:'Chrome PDF Viewer'
        }, 'plugins0'),
        2:watch({
            name:'Chromium PDF Viewer'
        }, 'plugins0'),
        3:watch({
            name:'Microsoft Edge PDF Viewer'
        }, 'plugins0'),
        4:watch({
            name:'WebKit built-in PDF'
        }, 'plugins0'),
        length:5,
    }, 'plugins'),
    hardwareConcurrency:8,
    doNotTrack:null,
    cookieEnabled:true,
}
fun_to_native(Navigator)

navigator = watch({},'navigator');
Navigator.prototype=watch(Navigator.prototype, `方法原型:Navigator.prototype`)
Navigator=watch(Navigator, 'Navigator')
navigator.__proto__=Navigator.prototype;




Screen=function Screen(){
    if (new.target) {
        throw new TypeError('Illegal constructor');
    }
}
fun_to_native(Screen)

Screen.prototype={
    [Symbol.toStringTag]: 'Screen',
    availHeight: 816,
    availLeft: 0,
    availTop: 0,
    availWidth: 1536,
    colorDepth: 24,
    height: 864,
    isExtended:false,
    onchange:null,
    pixelDepth: 24,
    width: 1536
}

screen=watch({},'screen');
Screen.prototype=watch(Screen.prototype, `方法原型:Screen.prototype`)
Screen=watch(Screen, 'Screen')
screen.__proto__=Screen.prototype





// 删除本地特征
delete Buffer;
delete VMError;
delete process;
delete clearImmediate;
delete global;


window.process = {
    "env": {
        "BROWSER": true,
        "BUILD_ENV": "production"
    }
}
self = top = globalThis = window;