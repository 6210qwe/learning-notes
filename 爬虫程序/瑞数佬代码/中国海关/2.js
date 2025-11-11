delete __dirname
delete __filename
ActiveXObject = undefined




function watch(obj, name) {
    return new Proxy(obj, {
        get(target, p, receiver) {
            // 处理特殊属性
            if (p === 'Match' || p === 'isNaN' || p === 'encodeURL' || p === 'Uint8Array' || typeof p === 'symbol') {
                return Reflect.get(target, p, receiver);
            } else {
                if (p === 'crypto') {
                    return crypto;
                }
                let val = Reflect.get(target, p, receiver);
                if (p === 'globalThis') {
                    console.log('取值:', name, '.globalThis');
                } else {
                    console.log('取值:', name, '.', p, '=>', val);
                }
                return val;
            }
        },
        set(target, p, value, receiver) {
            let oldValue = Reflect.get(target, p, receiver);
            console.log(`设置值: ${name}.${p}, ${oldValue} => ${value}`);
            return Reflect.set(target, p, value, receiver);
        }
    });
}


Window = function(){}
window = global;
Object.setPrototypeOf(window,Window.prototype)
setTimeout = function (){}
setInterval = function (){
    arguments[0]();
}
delete global;
delete Buffer;
window.Request=function(){}
window . prompt  =function(){}
window.TEMPORARY = 0
window.webkitRequestFileSystem=function(){}
window.DOMParser = function(res){
    console.log('window.DOMParser ===>',res)
}
window.XMLHttpRequest = function(res){
    console.log('window.XMLHttpRequest ===>',res)
}
//window.localStorage = {
//    "$_YWTU": "9vkIh7H8VPcO5fBqxaMOe16tEBB1JVp_UKnLMX.FNMq",
//    "_$rc": "X_jaswn7amSclMe2M37WXLjdKiGcDsL6RfSx8LUMrFe8yAIkpOurc6PtHx2lCZpu8lO4LUBi6N1AXXZ0Ek3lYrgymDC0mb7V90zPqFjiZUKbi55AIl2xq3GfY_r6pD49Ub9kla8e0nvrNUXM8SBTL2JtJalbJp3TyjECymkMvy3PKWxEq8Ny6gorIXI502eyTNfyZ0YyBh9nyq3h1iC5PGmZAnl6cOOvFWgdI3O7bB4GhUc27Li5VlLIOWPWmIxu62WrCg3T7lEkEd4PHAADeIOBoLh5N5rmK6noSgiRhsFqCt4b39EWCKMueEj0N4dPDLBRkly7wuqwR1x3WwqcfZYcJqrwNcFE4Uc2Xr2vEj9f5ei9sWaqVifgkT48FYK3b942bDQYdFQZPXIOdG97MDvh.cGyCnfHYRtlw.BbBcDliMi.RFOoYdVhluve1EFDpcCrTCn812NiSKhiXDA9oSihrsEKZ82eIGHUcYqI_s5gZJpU_.QkSBQeg0PFd.vQv4KEIqJU.NkeQD.oMMof4QeTpiTTAtuU_vmWLzQNBiKFwuTlKnBPMsVBPJ5lxzLyB27p22u8FXSZ8xw4KmciZ.tJKHY2U8bLkW9kVebzkR3jWBD_KBw6OrYfAaU1xSBHAvqp9teOfD2_siKJJI3ijiqicdYJDRW5gyYibQWXTnWsJDSitL7e3.kkJs4mLcQBnFQ4VS06ESTzzijJH8g2z3aeBWOJPE.vCnKcNwsh6avWcRqTCv7u.LUDqKoOY4shuKxq7Mg6DV9vRCru",
//    "__#classType": "localStorage",
//    "$_YVTX": "Ws9"
//}
//window.sessionStorage = {
//    "$_YWTU": "9vkIh7H8VPcO5fBqxaMOe16tEBB1JVp_UKnLMX.FNMq",
//    "__darkreader__wasEnabledForHost": "false",
//    "$_YVTX": "Ws9"
//}
window.indexedDB = watch({},'window.indexedDB')
window.PointerEvent =function(res){
    console.log('window.PointerEvent====>',res);

}
window.addEventListener = function(res){console.log('window.addEventListener====>',res);
}
window.webkitRequestFileSystem  = function(res){console.log('window.webkitRequestFileSystem ====>',res)}
window.WebSocket  = function(res){console.log('window.WebSocket ====>',res)}
window.name =''
window.history = {
   length: 1,
   scrollRestoration: "auto",
   state: null
}

window.indexedDB.open = function(){}
window.open = function(){}
window.Navigator = function(){}
window.HTMLFormElement = function(){}
window.innerHeight = 650
window.innerWidth = 1432
window.outerHeight = 762
window.outerWidth = 1440
window.chrome = {
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
}

meta = {
    length:2,
    1:watch({
        content:'$$content$$',
        parentNode:watch({
            removeChild:function(){}
        },'meta_1_parentNode')
    },'meta_1')
}
meta = [
    {
        'http-equiv':"Content-Type",
        content:"text/html; charset=utf-8",
        parentNode:{
            removeChild:function (){}
        },
        getAttribute: function(res){
            if(res === 'r'){
                return "m"
            }
        },
    },
    {
        content:'$$content$$',
        parentNode:{
            removeChild:function (){}
        },
        getAttribute: function(res){
            if(res === 'r'){
                return "m"
            }
        },
    }
]



div = {
    getElementsByTagName:function(arg){
        if (arg === 'i'){
            return {length:0}
        }
    }
}
a = {
    getAttribute: function(res) {
        if (res === 'r') {
            return "m"
        }
    },
    parentElement:{
        removeChild:function (res){
        }
    }
}

script = [
    {
        getAttribute: function(res){
            if(res === 'r'){
                return "m"
            }
        },
        parentElement:{
            removeChild:function (res){
            }
        },
        innerText:''
    }
]


document = {
    createElement: function (arg) {
        if (arg === 'div') {
            return div
        }
        if (arg === 'a') {
            return location
        }
        if(res === 'form'){
            return {}
        }
    },
    appendChild:function(arg){
    },
    removeChild:function(arg){
    },
    getElementsByTagName:function (arg){
        if(arg === 'script'){
            return script
        }
        if(arg === 'meta'){
            return meta
        }
        if(arg === 'base'){
            return {}
        }
    },
    getElementById:function(tag_name){},
    attachEvent: function (res) {},
    addEventListener: function (res) {},
    documentElement:{
        addEventListener: function (res) {}
    },
    createExpression:function (res) {
        return {}
    },
    cookie:''
}
location = {
    "ancestorOrigins": {},
    "href": "http://www.customs.gov.cn/",
    "origin": "http://www.customs.gov.cn",
    "protocol": "http:",
    "host": "www.customs.gov.cn",
    "hostname": "www.customs.gov.cn",
    "port": "",
    "pathname": "/",
    "search": "",
    "hash": ""
};
local = {}
localStorage ={
    getItem:function(k){
        return local[k]
    },
    setItem:function(k,v){
        local[k] = v
    },
    clear:function(){
        local = {}
    },
    removeItem:function(k){
        delete local[k]
    }
}

window . CanvasRenderingContext2D = function (){
    this.direction = 'ltr';
    this.fillRect = '#000000';
    this.filter = 'none';
    this.font = '10px sans-serif';
    this.fontKerning = 'auto';
    this.fontStretch = 'normal';
    this.fontVariantCaps = 'normal';
    this.globalAlpha = 1;
    this.globalCompossiteOperation = 'source-over'
    this.imageSmoothingEnabled = true;
    this.imageSmoothingQuality = 'low';
    this.letterSpacing = '0px';
    this.lineCap = 'butt';
    this.lineDashOffset = 0;
    this.lineJoin = 'miter';
    this.lineWidth = 1;
    this.miterLimit = 10;
    this.shadowBlur = 0;
    this.shadowColor = 'rgba(0; 0; 0; 0)';
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.strokeStyle = '#000000';
    this.textAlign = 'start';
    this.textBaseline = 'alphabetic';
    this.textRendering = 'auto';
    this.wordSpacing = '0px'
    this.fillRect = function(ele){
        console.log('CanvasRenderingContext2D.fillRect:',ele);
    };
    this.arc = function(ele){
        console.log('CanvasRenderingContext2D.arc:',ele);
    };
    this.stroke = function(ele){
        console.log('CanvasRenderingContext2D.stroke:',ele);
    };
    this.fillText = function(ele){
        console.log('CanvasRenderingContext2D.fillText:',ele);
    }
}
canvas2d = new CanvasRenderingContext2D()

window.HTMLCanvasElement = function(){
    this.getContext = function(ele){
        console.log('canvas.getContext:',ele);
        if(ele==='2d'){
            return canvas2d
        }
    };
    this.toDataURL = function(ele){
        console.log('canvas.toDataURL:',ele);
    };
    this.getAttributeNames = function(ele){
        console.log('canvas.getAttributeNames:',ele);
    };
    this.width = 300;
    this.height = 150;
    this.style = {};
}
// document.attachEvent = function(){},
document.addEventListener = function(){}
document.visibilityState = 'hidden'
document.all = watch({},'document.all ====>')
document.body = null
navigator = {
    appCodeName:"Mozilla",
    appName:"Netscape",
    appVersion:"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
    language:"zh-CN",
    cookieEnabled:true,
    doNotTrack:null,
    geolocation:{},
    hardwareConcurrency:8,
    languages:['zh-CN', 'en', 'en-GB', 'en-US'],
    maxTouchPoints: 0,
    mediaCapabilities:{},
    mediaSession:{metadata:null,playbackState:'none'},
    platform:"Win32",
    product:"Gecko",
    productSub:"20030107",
    onLine:true,
    scheduling:{},
    permissions:{},
    pdfViewerEnabled:true,
    userActivation:{hasBeenActive:true,isActive:false},
    userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
    vendor:"Google Inc.",
    vendorSub:"",
    webdriver:false,
    connection:{
        downlink: 5.65,
        effectiveType: "4g",
        onchange: null,
        rtt: 150,
        saveData: false
    },
    ink:{},
    mimeTypes:{
        0:{type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format', enabledPlugin: {}},
        1:{type: 'text/pdf', suffixes: 'pdf', description: 'Portable Document Format', enabledPlugin: {}},
        'application/pdf':{type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format', enabledPlugin: {}},
        'text/pdf':{type: 'text/pdf', suffixes: 'pdf', description: 'Portable Document Format', enabledPlugin: {}},
        length:2
    },
    plugins: {
          0: {
              0: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "application/x-google-chrome-pdf"
              },
              1: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "text/pdf"
              },
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              length: 2,
              name: "PDF Viewer"

          },
          1: {
              0: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "application/x-google-chrome-pdf"
              },
              1: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "text/pdf"
              },
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              length: 2,
              name: "Chrome PDF Viewer"

          },
          2: {
              0: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "application/x-google-chrome-pdf"
              },
              1: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "text/pdf"
              },
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              length: 2,
              name: "Chrome PDF Viewer"

          },
          3: {
              0: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "application/x-google-chrome-pdf"
              },
              1: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "text/pdf"
              },
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              length: 2,
              name: "Microsoft Edge PDF Viewer"

          },
          4: {
              0: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "application/x-google-chrome-pdf"
              },
              1: {
                  description: "Portable Document Format",
                  enabledPlugin: {
                      0: {},
                      1: {},
                      description: "Portable Document Format",
                      filename: "internal-pdf-viewer",
                      length: 2,
                      name: "Chromium PDF Plugin"
                  },
                  suffixes: "pdf",
                  type: "text/pdf"
              },
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              length: 2,
              name: "WebKit built-in PDF"

          },
          length: 5
        },
    webkitPersistentStorage:{},
    webkitTemporaryStorage:function (){},
    windowControlsOverlay:{ongeometrychange:null,visible:false},
    getBattery: function() {
        // console.log('getBattery:',arguments);
          return new Promise(function(resolve, reject){
            resolve
          })
      }
}
navigator.languages = [
    "zh-CN",
    "en",
    "en-GB",
    "en-US"
]
navigator.connection = {
   downlink: 10,
   effectiveType: "4g",
   onchange: null,
   rtt: 150,
   saveData: false
}
navigator . sendBeacon = function(){}
navigator.getBattery = function(){}
navigator . webkitPersistentStorage = function(res){
    console.log('navigator . webkitPersistentStorage====>',res);

}
window . HTMLAnchorElement = function(){}
window = watch(window,'window')
document = watch(document,'document')
location = watch(location,'location')
navigator = watch(navigator,'navigator')
window.top = window
window.self  = window
clientInformation = navigator

'$$ts$$'
'$$function$$'

function get_cookie(){
    return document.cookie;
}

// console.log(get_cookie());


