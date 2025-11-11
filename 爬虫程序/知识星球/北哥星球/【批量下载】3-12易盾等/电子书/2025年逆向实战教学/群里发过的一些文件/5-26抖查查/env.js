Object.prototype.toString = function ToString() {
    if (this == eval){
        return 'function eval() { [native code] }'
    }
    let code = $toString.call(this);
    code = code
        .replace(/\/\/.*$/gm, '')                // 去除单行注释
        .replace(/\/\*[\s\S]*?\*\//g, '')        // 去除多行注释
        .replace(/\n+/g, '')                     // 去除换行符
        .replace(/\s{2,}/g, ' ')                 // 多空格压缩为一个
        .replace(/\s*([{}();,:])\s*/g, '$1')     // 去掉标点前后空格
        .trim();                                 // 去掉首尾空格
    return code;
}

window = global;
window.XMLHttpRequest=function(){}
window.print=function(){};

location = {
    "ancestorOrigins": {},
    "href": "https://www.douchacha.com/",
    "origin": "https://www.douchacha.com",
    "protocol": "https:",
    "host": "www.douchacha.com",
    "hostname": "www.douchacha.com",
    "port": "",
    "pathname": "/",
    "search": "",
    "hash": ""
}

_documentElement = {
    getAttribute:function(ele){
        // console.log('_documentElement getAttribute=>',ele)
    }
}
document = {
    documentElement:_documentElement
}

navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    languages:[
        "zh-CN",
        "zh"
    ],
    platform:'Win32',
    webdriver:false,
    plugins:{length:5},
};


localStorage={}
localStorage['dt']= new Date().getTime()
localStorage['uid']="19268118999650013084"


delete global;
delete Buffer;


function ProxyDocumentObjects(proxyObjs) {
    for (let i = 0; i < proxyObjs.length; i++) {
        const documentObj = proxyObjs[i];
        const keys = Object.keys(documentObj);
        keys.forEach(key => {
            const value = documentObj[key];
            if (value && typeof value === "object") {
                documentObj[key] = new Proxy(value, {
                    get(target, property, receiver) {
                        const propValue = Reflect.get(target, property, receiver);
                        console.log("方法:", "get", "对象:", `${key}`, "属性:", property, "属性类型:", `${typeof property}`, "属性值:", propValue, "属性值类型:", `${typeof propValue}`);
                        return propValue;
                    },
                    set(target, property, newValue, receiver) {
                        console.log("方法:", "set", "对象:", `${key}`, "属性:", property, "属性类型:", `${typeof property}`, "属性值:", newValue, "属性值类型:", `${typeof newValue}`);
                        return Reflect.set(target, property, newValue, receiver);
                    },
                });
            }
        });
    }
}
// 这里需要写对象
// const proxyObjs = [window, document, navigator, localStorage];
// ProxyDocumentObjects(proxyObjs);


self = top = window