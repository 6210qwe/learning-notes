process_ = process;
require_ = require;
delete Buffer;
delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
delete setImmediate;
delete clearImmediate;

dtavm = {
    // log : console.log,
    log: function () { },
    _log : console.log
}

no_print = ['window', 'globalThis', 'crypto', 'global','navigator','top','plugins'];
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
        if(no_print.includes(property)){
            return target[property];
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


window = global;
top = window.top = window;

devicePixelRatio = 1.25

crypto = require_('crypto');
window.addEventListener = function addEventListener() { }

ActiveXObject = undefined;
ActivteXObject = undefined;

HTMLElement = function HTMLElement() { }
HTMLFormElement = function HTMLFormElement() { }
HTMLFormElement.prototype.submit = function submit() { }
XMLHttpRequest = function XMLHttpRequest() { }
WebGLRenderingContext = function WebGLRenderingContext(){}
fetch = function fetch(){}

window.creep = {
    tagName:'DIV'
};
div = {
    getElementsByTagName: function getElementsByTagName() {
        dtavm.log('div-getElementsByTagName::', arguments)
        if (arguments[0] === 'i') {
            return []
        }
    },
    appendChild: function appendChild() { },
    setAttribute: function setAttribute() {
        dtavm.log('div-setAttribute::', arguments)
        if (arguments[1] === 'creep-system-styles') {
            window.creep = this;
        }
    }
}

a = {};

two2d = {
    rect: function rect() { },
    isPointInPath: function isPointInPath() {
        return true
    },
    fillRect: function fillRect() { },
    fillText: function fillText() { },
    beginPath: function beginPath() { },
    arc: function arc() { },
    closePath: function closePath() { },
    fill:function fill(){}
};

createBufferc = {
    name: 'webgl_buffer',
    itemSize: 3,
    numItems:3
};
createProgramc = {
    name: 'webgl_Program',
    vertexPosAttrib: 0
}
createShaderc = {
    name: 'webgl_Shader',
}
getUniformLocationc = {
    name: 'getUniformLocationc',
}
WEBGL_lose_contextc = {
    loseContext: function loseContext() { }
}
setProxyArr(['createBufferc','createProgramc','createShaderc','getUniformLocationc','WEBGL_lose_contextc']);
webgl = {
    canvas: {
        toDataURL: function toDataURL() {
            return  'data:image/png;base64,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'
        }
    },
    getSupportedExtensions : function getSupportedExtensions() {
        return [
            "EXT_color_buffer_float",
            "EXT_color_buffer_half_float",
            "EXT_disjoint_timer_query_webgl2",
            "EXT_float_blend",
            "EXT_texture_compression_bptc",
            "EXT_texture_compression_rgtc",
            "EXT_texture_filter_anisotropic",
            "EXT_texture_norm16",
            "KHR_parallel_shader_compile",
            "OES_draw_buffers_indexed",
            "OES_texture_float_linear",
            "OVR_multiview2",
            "WEBGL_compressed_texture_s3tc",
            "WEBGL_compressed_texture_s3tc_srgb",
            "WEBGL_debug_renderer_info",
            "WEBGL_debug_shaders",
            "WEBGL_lose_context",
            "WEBGL_multi_draw",
            "WEBGL_provoking_vertex"
        ]
    },
    createBuffer: function createBuffer() {
        return createBufferc
    },
    createProgram: function createProgram() {
        return createProgramc
    },
    createShader: function createShader() {
        return createShaderc
    },
    bindBuffer: function bindBuffer() { },
    bufferData: function bufferData() { },
    shaderSource: function shaderSource() { },
    compileShader: function compileShader() { },
    attachShader: function attachShader() { },
    linkProgram: function linkProgram() { },
    useProgram: function useProgram() { },
    enableVertexAttribArray: function enableVertexAttribArray() { },
    vertexAttribPointer: function vertexAttribPointer() { },
    drawArrays: function drawArrays() { },
    uniform2f: function uniform2f() { },
    clearColor: function clearColor() { },
    getAttribLocation: function getAttribLocation() {
        return 0;  
    },
    getUniformLocation: function () {
        return getUniformLocationc
    },
    ALIASED_LINE_WIDTH_RANGE: 33902,
    ALIASED_POINT_SIZE_RANGE: 33901,
    drawingBufferColorSpace: "srgb",
    drawingBufferHeight: 150,
    drawingBufferWidth: 300,
    unpackColorSpace: "srgb",
    MAX_TEXTURE_SIZE: 3379,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    FRAGMENT_SHADER: 35632,
    ARRAY_BUFFER: 34962,
    STATIC_DRAW: 35044,
    VERTEX_SHADER: 35633,
    FLOAT: 5126,
    TRIANGLE_STRIP: 5,
    RGBA: 6408,
    UNSIGNED_BYTE: 5121,
    VENDOR: 7936,
    RENDERER: 7937,
    VERSION: 7938,
    BLUE_BITS: 3412,
    DEPTH_BITS: 3414,
    GREEN_BITS: 3411,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
    MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
    MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
    MAX_RENDERBUFFER_SIZE: 34024,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_TEXTURE_SIZE: 3379,
    MAX_VARYING_VECTORS: 36348,
    MAX_VERTEX_ATTRIBS: 34921,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    MAX_VIEWPORT_DIMS: 3386,
    RED_BITS: 3410,
    RENDERER: 7937,
    SHADING_LANGUAGE_VERSION: 35724,
    STENCIL_BITS: 3415,
    VENDOR: 7936,
    VERSION: 7938,
    HIGH_FLOAT: 36338,
    MEDIUM_FLOAT: 36337,
    LOW_FLOAT: 36336,
    MEDIUM_INT: 36340,
    LOW_INT: 36339,
    HIGH_INT: 36341,
    getContextAttributes: function () {
        return {
            "alpha": true,
            "antialias": true,
            "depth": true,
            "desynchronized": false,
            "failIfMajorPerformanceCaveat": false,
            "powerPreference": "default",
            "premultipliedAlpha": true,
            "preserveDrawingBuffer": false,
            "stencil": false,
            "xrCompatible": false
        }
    },
    getExtension: function getExtension() {
        dtavm.log('getExtension:', arguments[0])
        if (arguments[0] === 'WEBGL_debug_renderer_info') {
            return {
                UNMASKED_RENDERER_WEBGL : 37446,
                UNMASKED_VENDOR_WEBGL : 37445
            }
        }
        if (arguments[0] === 'WEBGL_lose_context') {
            return WEBGL_lose_contextc
        }
        if (arguments[0] === 'EXT_texture_filter_anisotropic') {
            return {
                MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047,
                TEXTURE_MAX_ANISOTROPY_EXT: 34046
            }
        }
    },
    enable: function enable() { },
    DEPTH_TEST: 2929,
    depthFunc: function depthFunc() { },
    LEQUAL: 515,
    clear: function () { },
    COLOR_BUFFER_BIT: 16384,
    DEPTH_BUFFER_BIT: 256,
    ALPHA_BITS: 3413,
    getParameter: function getParameter() {
        dtavm.log('getParameter:', arguments[0])
        if (arguments[0] + '' === '37445') {
            return 'Google Inc. (Intel)'
        }
        if (arguments[0] + '' === '37446') {
            return 'ANGLE (Intel, Intel(R) UHD Graphics (0x00008A56) Direct3D11 vs_5_0 ps_5_0, D3D11)'
        }
        if (arguments[0] + '' === '3379') {
            return 16384
        }
        if (arguments[0] + '' === '34930') {
            return 16
        }
        if (arguments[0] + '' === '36347') {
            return 4096
        }
        if (arguments[0] + '' === '35660') {
            return 16
        }
        if (arguments[0] + '' === '33902') {
            return Float32Array.from([1, 1])
        }
        if (arguments[0] + '' === '33901') {
            return Float32Array.from([1, 1024])
        }
        if (arguments[0] + '' === '3413') {
            return 8
        }
        if (arguments[0] + '' === '3412') {
            return 8
        }
        if (arguments[0] + '' === '3414') {
            return 24
        }
        if (arguments[0] + '' === '3411') {
            return 8
        }
        if (arguments[0] + '' === '34047') {
            return 16
        }
        if (arguments[0] + '' === '35661') {
            return 32
        }
        if (arguments[0] + '' === '34076') {
            return 16384
        }
        if (arguments[0] + '' === '36349') {
            return 1024
        }
        if (arguments[0] + '' === '34024') {
            return 16384
        }
        if (arguments[0] + '' === '36348') {
            return 30
        }
        if (arguments[0] + '' === '34921') {
            return 16
        }
        if (arguments[0] + '' === '3410') {
            return 8
        }
        if (arguments[0] + '' === '7937') {
            return 'WebKit WebGL'
        }
        if (arguments[0] + '' === '35724') {
            return 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)'
        }
        if (arguments[0] + '' === '3415') {
            return 0
        }
        if (arguments[0] + '' === '7936') {
            return 'WebKit'
        }
        if (arguments[0] + '' === '7938') {
            return 'WebGL 1.0 (OpenGL ES 2.0 Chromium)'
        }
        if (arguments[0] + '' === '3386') {
            return Int32Array.from([32767, 32767])
        }
    },
};

canvas = {
    style:{},
    getContext: function getContext() {
        dtavm.log('canvas-getContext::',arguments)
        if (arguments[0] === '2d') {
            return two2d
        }
        if (arguments[0] === 'webgl') {
            return webgl
        }
    },
    toDataURL: function toDataURL() {
        return  'data:image/png;base64,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'
    }
};

span = {
    tagName: 'SPAN',
    style: {},
    offsetWidth: 148,
    offsetHeight:76
};

audio = {
    canPlayType: function canPlayType() {
        dtavm.log('audio-canPlayType::', arguments)
        return 'probably'
    }
};
video = {
    canPlayType: function canPlayType() {
        dtavm.log('video-canPlayType::', arguments)
        return 'probably'
    }
};

window.adsbox = {
    tagName:'DIV'
};

location = {
    "ancestorOrigins": {},
    "href": "https://memberprod.alipay.com/account/reg/email.htm",
    "origin": "https://memberprod.alipay.com",
    "protocol": "https:",
    "host": "memberprod.alipay.com",
    "hostname": "memberprod.alipay.com",
    "port": "",
    "pathname": "/account/reg/email.htm",
    "search": "",
    "hash": ""
};

// datasc = ["0420e4157c8f80000000003a000000006852684100000001475d5f5b43b15d0e"];
datasc = process_.argv.slice(2);
document = {
    head: {
        appendChild:function appendChild(){}
    },
    body: {
        appendChild: function appendChild() {
            if (arguments[0].hasOwnProperty('className')) {
                window.adsbox = arguments[0];
                window.adsbox['offsetHeight'] = 141;
            }
        },
        removeChild: function removeChild() { },
        append:function append(){}
    },
    documentElement: {
        getAttribute: function getAttribute() {
            return null
        },
        attributes:{}
    },
    getElementsByTagName: function getElementsByTagName() {
        dtavm.log('document-getElementsByTagName::',arguments)
        if (arguments[0] === 'meta') {
            return [
                {
                    "name": "T1NNyWiqmCIX2raGlMG",
                    "content": datasc[0]
                },
                {
                    "name": "pageType",
                    "content": "1"
                },
                {
                    "name": "pageTitle",
                    "content": "江西中医药大学"
                },
                {
                    "name": "keywords",
                    "content": "江西中医药大学"
                },
                {
                    "name": "pageType",
                    "content": "1"
                },
                {
                    "name": "pageTitle",
                    "content": "江西中医药大学主页"
                },
                {
                    "name": "",
                    "content": "IE=EDGE"
                },
                {
                    "name": "renderer",
                    "content": "text/html; charset=UTF-8"
                }
            ]
        }
        if (arguments[0] === 'form') {
            return []
        }
        if (arguments[0] === 'body') {
            return [this.body]
        }
    },
    createElement: function createElement() {
        dtavm.log('document-createElement::',arguments)
        if (arguments[0] === 'div') {
            return div
        }
        if (arguments[0] === 'a') {
            return a
        }
        if (arguments[0] === 'canvas') {
            return canvas
        }
        if (arguments[0] === 'span') {
            return span
        }
        if (arguments[0] === 'audio') {
            return audio
        }
        if (arguments[0] === 'video') {
            return video
        }
    },
    scripts: [],
    getElementById: function getElementById() {
        dtavm.log('getElementById::', arguments)
        if (arguments[0] === 'creep-system-styles') {
            return window.creep
        }
        return null;
    },
    getElementsByClassName: function getElementsByClassName() {
        dtavm.log('getElementsByClassName::', arguments)
        if (arguments[0] === 'adsbox') {
            return [window.adsbox]
        }
    },
    createEvent:function createEvent(){
        dtavm.log('createEvent::',arguments)
    }
};

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
navigator = {
    cookieEnabled: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36',
    platform: 'Win32',
    productSub: '20030107',
    language: 'zh-CN',
    webdriver: false,
    connection:{
        effectiveType: '3g', rtt: 600, downlink: 1.45, saveData: false,
        onchange: function onchange() {}
    },
    deviceMemory: 8,
    hardwareConcurrency: 8,
    doNotTrack: null,
    plugins: plugins,
    languages: ['zh-CN'],
    maxTouchPoints: 0,
    vendor:'Google Inc.'
};
local = {
};
localStorage = {
    getItem: function (key) {
        dtavm.log('localStorage-getItem::',key)
        return local[key];
    },
    setItem: function (key, value) {
        dtavm.log('localStorage-setItem::',key,value)
        local[key] = value;
    },
    clear: function () {
        local = {};
    },
    removeItem: function (key) {
        delete local[key];
    }
}
sessionStorage = {
    getItem: function (key) {
        dtavm.log('sessionStorage-getItem::',key)
        return local[key];
    },
    setItem: function (key, value) {
        dtavm.log('sessionStorage-setItem::',key,value)
        local[key] = value;
    },
    clear: function () {
        local = {};
    },
    removeItem: function (key) {
        delete local[key];
    }
}
chrome = {
    app: {
        InstallState: { DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed' },
        RunningState: { CANNOT_RUN: 'cannot_run', READY_TO_RUN: 'ready_to_run', RUNNING: 'running' },
        getDetails:function(){},
        getIsInstalled:function(){},
        installState:function(){},
        isInstalled: false,
        runningState: function(){}
    },
    csi: function () { },
    loadTimes: function () { },
}

external = {};
external[Symbol.toStringTag] = 'External';
external.toString = function toString() { return '[object External]'; };

indexedDB = {};
indexedDB[Symbol.toStringTag] = 'IDBFactory';
indexedDB.toString = function toString() { return '[object IDBFactory]'; };

history = {
    pushState: function pushState() { },
    replaceState:function replaceState(){}
};

alert = function alert() { }
openDatabase = function openDatabase(){}

screen = {
    availHeight: 824,
    availLeft: 0,
    availTop: 0,
    availWidth: 1536,
    colorDepth: 24,
    height: 864,
    isExtended: true,
    onchange: null,
    pixelDepth: 24,
    width: 1536,
    orientation: {
        angle: 0,
        type: "landscape-primary",
        onchange: null
    }
};
(function () {
    'use strict';
    var cookieTemp = 'F14B3CEF1='+datasc[0];
    Object.defineProperty(document, 'cookie', {
        set: function (val) {
        if (val.length > 60) {
            dtavm._log(val);
        }
        cookieTemp = val;
        return val;
      },
      get: function () {
        return cookieTemp;
      },
    });
  })();
// setProxyArr(['window', 'global','history','top','span','creep','audio','location','video','span.style','webgl','adsbox','webgl.canvas','two2d','canvas','WebGLRenderingContext.prototype','canvas.style','document.head','screen','navigator.plugins','indexedDB','document.body', 'a','globalThis','document.documentElement','document.documentElement.attributes','external','div','document','navigator','HTMLElement.prototype','XMLHttpRequest.prototype','HTMLFormElement.prototype','performance','localStorage','sessionStorage']);
require_('./edu.js');
