Java.perform(function() {
    console.log("[*] 开始 Hook 美团 mtgsig 相关方法，特别关注 mtgsig2.4");
window = global;
null_fun = function (){
    console.log('使用了null_fun，参数为>>',arguments)
}
location = {
    "ancestorOrigins": {},
    "href": "https://scportal.taobao.com/quali_show.htm?spm=a1z10.1-c-s.0.0.34175249ZXLZDr&uid=2206833789551&qualitype=1",
    "origin": "https://scportal.taobao.com",
    "protocol": "https:",
    "host": "scportal.taobao.com",
    "hostname": "scportal.taobao.com",
    "port": "",
    "pathname": "/quali_show.htm",
    "search": "?spm=a1z10.1-c-s.0.0.34175249ZXLZDr&uid=2206833789551&qualitype=1",
    "hash": ""
}
localStorage = {
    getItem:function (arg){
        console.log('使用了localStorage.getItem,参数为》》',arg)
        if(arg=='lswucn'){
            return 'T2gAQ8oGzOYTVrzB6dSFKxVQU5jOr_PdPXY1JajJbLofpZRTCx2SWHGnnYlfhagmUFo=@@1719924931'
        }
        console.log('有漏余在localStorage.getItem,参数为》》',arg)
    },

}
navigator = {
    platform:'Win32',
    userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.289 Safari/537.36',
}

    // 辅助函数：将字节数组转换为十六进制字符串
    data ={
        "MaxMTLog": 300,
        "MTInterval": 4,
        "MinMTDwnLog": 30,
        "MaxKSLog": 14,
        "MaxFocusLog": 6,
        "MaxNGPLog": 200,
        "NGPInterval": 4,
        "Enable": 3,
        "location": "cn",
        "_umopt_npfp": 1,
        "timeout": 2000
    }

window = global;
null_fun = function (){
    console.log('使用了null_fun，参数为>>',arguments)
}
location = {
    "ancestorOrigins": {},
    "href": "https://scportal.taobao.com/quali_show.htm?spm=a1z10.1-c-s.0.0.34175249ZXLZDr&uid=2206833789551&qualitype=1",
    "origin": "https://scportal.taobao.com",
    "protocol": "https:",
    "host": "scportal.taobao.com",
    "hostname": "scportal.taobao.com",
    "port": "",
    "pathname": "/quali_show.htm",
    "search": "?spm=a1z10.1-c-s.0.0.34175249ZXLZDr&uid=2206833789551&qualitype=1",
    "hash": ""
}
localStorage = {
    getItem:function (arg){
        console.log('使用了localStorage.getItem,参数为》》',arg)
        if(arg=='lswucn'){
            return 'T2gAQ8oGzOYTVrzB6dSFKxVQU5jOr_PdPXY1JajJbLofpZRTCx2SWHGnnYlfhagmUFo=@@1719924931'
        }
        console.log('有漏余在localStorage.getItem,参数为》》',arg)
    },

}
navigator = {
    platform:'Win32',
    userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.289 Safari/537.36',
}
window = global;
null_fun = function (){
    console.log('使用了null_fun，参数为>>',arguments)
}
location = {
    "ancestorOrigins": {},
    "href": "https://scportal.taobao.com/quali_show.htm?spm=a1z10.1-c-s.0.0.34175249ZXLZDr&uid=2206833789551&qualitype=1",
    "origin": "https://scportal.taobao.com",
    "protocol": "https:",
    "host": "scportal.taobao.com",
    "hostname": "scportal.taobao.com",
    "port": "",
    "pathname": "/quali_show.htm",
    "search": "?spm=a1z10.1-c-s.0.0.34175249ZXLZDr&uid=2206833789551&qualitype=1",
    "hash": ""
}
localStorage = {
    getItem:function (arg){
        console.log('使用了localStorage.getItem,参数为》》',arg)
        if(arg=='lswucn'){
            return 'T2gAQ8oGzOYTVrzB6dSFKxVQU5jOr_PdPXY1JajJbLofpZRTCx2SWHGnnYlfhagmUFo=@@1719924931'
        }
        console.log('有漏余在localStorage.getItem,参数为》》',arg)
    },

}
navigator = {
    platform:'Win32',
    userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.289 Safari/537.36',
}

    log("[*] Hook 脚本加载完成");
});
// frida -U -f com.sankuai.meituan -l mtgsig2.4.js

