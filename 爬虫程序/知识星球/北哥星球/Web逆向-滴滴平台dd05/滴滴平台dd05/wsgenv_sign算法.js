window = globalThis;
const CrytpJs = require('crypto-js');
const JsEncrypt = require('jsencrypt');
const pako = require('pako');
const { SM4 } = require('gm-crypto');
function byteLength(t) {
    for (var e = t.length, n = t.length - 1; n >= 0; n--) {
        var r = t.charCodeAt(n);
        r > 127 && r <= 2047 ? e++ : r > 2047 && r <= 65535 && (e += 2),
        r >= 56320 && r <= 57343 && n--
    }
    return e
}

diuu_func = function () {
    var strc = "0123456789abcdef";
    for (var n = 32, a = "", r = 0; r < n; r++)
        a += strc[Math.floor(16 * Math.random())];
    return a;
}

var bizId = 'bb0f5863b0c070ead101f00930311cc8';
var diuu = diuu_func();
var b = Math.floor(new Date / 1e3);
var E = '{"diuu":'+diuu+',"bizId":"'+bizId+'","sdkVer":"5.1.14","os":"4","appVer":"v3"}';
var k = CrytpJs.MD5("R4doMFFeMNlliIWM" + E).toString()
, T = [
    {
        "pn": "ts",
        "gn": b
    },
    {
        "pn": "v",
        "gn": "1"
    },
    {
        "pn": "os",
        "gn": "4"
    },
    {
        "pn": "av",
        "gn": "02"
    },
    {
        "pn": "kv",
        "gn": "0000010001"
    },
    {
        "pn": "vl",
        "gn": byteLength(E)
    },
    {
        "pn": "sig",
        "gn": k
    },
    {
        "pn": "sv",
        "gn": "5.1.14"
    },
    {
        "pn": "tbzz",
        "gn": bizId
    },
    {
        "pn": "fbvv",
        "gn": "v3"
    },
    {
        "pn": "ex",
        "gn": "-1"
    }
].map(function(e) {
    return e.pn + "=" + e.gn
}
)['join']("&");

function i(t, e) {
    for (var n = [], r = 0; r < e.length; r++)
        n[r] = t[r % 4] ^ e.charCodeAt(r);
    return n = Array.prototype.slice.apply(t).concat(n),
    String.fromCharCode.apply(null, n)
}
function r(t) {
    for (var e = "ABCDEFG0123456789abcdefgHIJKLMN+/hijklmnOPQRSTopqrstUVWXYZuvwxyz", n = "" + t, r = void 0, i = void 0, o = 0, a = ""; n.charAt(0 | o) || (e = "=",
    o % 1); a += e.charAt(63 & r >> 8 - o % 1 * 8)) {
        if ((i = n.charCodeAt(o += .75)) > 255)
            throw new Error("'base64' failed: The string to be encoded contains characters outside of the Latin1 range.");
        r = r << 8 | i
    }
    return a
}
// 得到初始化sign   signinit接口的请求头参数
random_Uint_arr = new Uint8Array(new Uint32Array([Math.floor(4294967296 * Math.random())]).buffer)
var sign = r(i(random_Uint_arr, T)).replace(/=*$/, "")
// console.log(sign)


//////////////////////////////////////////////
// 初始化 wsgenv的值
function gzip_encrypt(dataToCompress){
    // 将数据转换为Uint8Array
    dataUint8Array = new TextEncoder().encode(dataToCompress);

    // 使用pako库进行gzip压缩
    compressedDataUint8Array = pako.gzip(dataUint8Array);

    // 将压缩后的数据以Base64编码
    compressedBase64String = Buffer.from(compressedDataUint8Array).toString('base64');
    return compressedBase64String;
};
function encryptWithSmCrypto(text, key) {
    return SM4.encrypt(text,  key);
}

function decryptWithSmCrypto(ciphertext, key) {
    return SM4.decrypt(ciphertext,  key);
}
// 指纹
zhiw = '{"fields":{"104":true,"106":true,"107":"Win32","109":"Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36","110":"zh-CN","111":["zh-CN"],"117":8,"120":824,"121":1536,"122":0,"123":0,"124":24,"125":864,"126":24,"127":1536,"129":"passport.didichuxing.com","132":"/common/pc-login/v3/index.html","134":"https:","400":"","503":8,"504":-480,"505":"Asia/Shanghai","511":[10,false,false],"521":"33e39bfb6ac19a0902cbe5c4fba3d89f"},"config_id":265,"rid":"f7366585-3614-4dd6-b9c2-b7ae4332e8b5","uid":"-1","event_type":"epassport.diditaxi.com.cn/pc-login/common","time":1753153187003,"app_id":"01051001","config_version":1729665448440,"os_type":"4","config_type":"obtain","bfield":{"D":"-1"}}';
// 对指纹进行gzip压缩加密
zhiw_gzip_encrypt = gzip_encrypt(zhiw)

// 取随机32字符串
sj_zfc = diuu_func();
// key值  default_public_exponent： "010001"
publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDnU7xqHsQ94TCohf2lvcMvER2oQy71rXgByqhrFgc9LXKn5XII8HkWEZdDL9CMUWkC1gcSJxVvB4ouVaYHnWSB0ItS0Bn5ZCbff5UfPz+eO9nRgaX/lCvIWy4mWBM3EuzuwBfoVPvbMuqpq54ThAjF+Yltbf0/PhlONRYmlE4bmQIDAQAB'
// 对随机字符串加密
var encrypt = new JsEncrypt();
encrypt.setPublicKey(publicKey);
var sj_zfc_encrypt = encrypt.encrypt(sj_zfc);

// 取随机32字符串
sj_zfc = diuu_func();
zhiw_sm4 = encryptWithSmCrypto("H4sIAAAAAAAAA1VSTW+cMBT8K8inROLDxh9gcopSqVXT5LKRcoiqyBizWGExAu92m2j/e59Zom0ueMbM05sZ+QO11vTNjKoPRDBDlZ/2JgYoLrBAFXq2A81RYBLYg3u3fa8ynuLoCn417s8cPT5FBKf4JvppN/vr6HYce/Ns6nvrM06LlIro6v7H08OvOOrtm4m+G/3mrqO7bnI7kxFSpjQlaRFtVKsmu46EjQTDxvcuuXtcGEHVy0p/Bw7uSjhzUJU5CwgUhFMRYI4qHE66nhDwrOGgFgsSn1fFZSxkHNU8j27yaWMbq7v90Q7bVLtdMAFVVCgDsnNDNuqkd1s7ZAeaQRXmmHZ+1y8yWIc678e5AspwCAKAY7p45qHvhJU4QDCEbmersk2nhm2nbBAuYQmOW9XP5vyFzDwkRJQaKuu2FkoTqbDEua4N16ytFW1K2aJTjLQbWrt9tQ1kFDxGU0DIFLUUKmdJy7FKWK50ImVBkkZpRlmeSyFq2L5fxAkBaA5m8K/+72jC+JdmvDraUEuq/2vi3AwMeruDEVJwSkTOMCFSxkiN42IJYYI5wThsWJ0ezDRbmISRYIMzVjIG/bj5czu7iNcbV3tlw7J6ecrhJX87Gz+d/gH4usy83wIAAA==", "e337b6ca51a4b65999bc2b006e94bdd7")
// 输出16进制字符串
zhiw_sm4_hex = Buffer.from(zhiw_sm4, 'base64').toString('hex')

