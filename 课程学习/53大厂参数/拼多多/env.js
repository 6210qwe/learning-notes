window=global
delete global
delete Buffer

document={
    addEventListener:function (){},
    cookie:'_nano_fp=XpmyXqdYX0XyX5XxX9_vEiM8tPs4smwX510ADCID'
}
screen={
    availWidth: 1464,
    availHeight: 867,
}

navigator={
    webdriver: false,
    userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0',
    productSub: '20030107',
    vendor: 'Google Inc.',
    maxTouchPoints: 0,
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0"
}

history={
    back:function (){}
}
location={
    ancestorOrigins: {},
    href: "https://www.pinduoduo.com/home/medical/",
    origin: "https://www.pinduoduo.com",
    protocol: "https:",
    host: "www.pinduoduo.com",
    hostname: "www.pinduoduo.com",
    port: "",
    pathname: "/home/medical/",
    search: "",
    hash: ""
}



// function setProxyArr(proxyObjArr) {
//     for (let i = 0; i < proxyObjArr.length; i++) {
//         const objName = proxyObjArr[i]; // "yuan"
//
//         const handler = {
//             get(target, property, receiver) {
//                 console.log("方法:", "get", "对象:", objName, "属性:", property, "属性类型：", typeof property, "属性值：", target[property], "属性值类型：", typeof target[property]);
//
//                 return target[property];
//             }
//         };
//         // 检查并初始化对象
//         let targetObject = global[objName] || {};  // 在 Node.js 环境中使用 global
//         global[objName] = new Proxy(targetObject, handler);  // 在 Node.js 中使用 global
//     }
// }
// setProxyArr(['window', 'document','location','screen','history','navigator'])
// //