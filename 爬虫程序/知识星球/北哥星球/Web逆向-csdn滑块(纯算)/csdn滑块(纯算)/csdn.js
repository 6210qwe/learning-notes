window = global;
const CryptoJS = require('crypto-js');
const pako = require('pako');
const JSEncrypt = require('jsencrypt');

_bsc_cv = {
    guid2 : function () {
        function _0x28c256() {
          return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
        }
        return _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256() + _0x28c256();
    },
    signature : function () {
        var _0x1b0b44 = _bsc_cv.guid2().substring(0, 16);
        var _0xfbc344 = CryptoJS.MD5(_0x1b0b44 + "shyundun").toString().substring(0, 16);
        return _0x1b0b44 + _0xfbc344;
    },
    pubk : "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaaTUpL2aaZMcf3xluTrCga+WF\n2H9n/yKVAugdGJfTfvkCaGxX5HM16rgvHrsmiveAQYBEUkWN5mIJuM6bZS/tltzy\nKaykrfj/uM1ayyU51NGyH//t3PhZpDb6For00DadsNSyBlh5WFcxc9ufNODC88Fw\ngD7adZD/yxSk/mAvRwIDAQAB\n-----END PUBLIC KEY-----",
    guid : function () {
        function _0x4a4ddd() {
          return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
        }
        return _0x4a4ddd() + _0x4a4ddd() + "-" + _0x4a4ddd() + "-" + _0x4a4ddd() + "-" + _0x4a4ddd() + "-" + _0x4a4ddd() + _0x4a4ddd() + _0x4a4ddd();
    },
    
};
var _0x478615 = new Object();
_0x478615.name = "captcha_protect";
_0x478615.clickTimes = 0;
_0x478615.moveTimes = 0;
_0x478615.touchTimes = 0;
_0x478615.start_time = new Date().getTime();
_0x478615.clickArr = [];
_0x478615.iswebdriver = false;
_0x478615.isphantom = false;
_0x478615.iscallPhantom = false;
_0x478615.ischrome = true;
_0x478615.outerWidth = 1536;
_0x478615.outerHeight = 824;
_0x478615.innerWidth = 410;
_0x478615.innerHeight = 566;
_0x478615.fpv = window._bsc_cv.guid2();
_0x478615.isMobile = false;
_0x478615.location_host = 'passport.csdn.net';
_0x478615.userAgent = 'Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36';
_0x478615.iscookieEnabled = true;

rsaEncrypt = function (_0x3fdbf6) {
    var _0x451220 = new JSEncrypt();
    _0x451220.setPublicKey(_bsc_cv.pubk);
    var _0x17b775 = _0x451220.encrypt(_0x3fdbf6);
    return _0x17b775;
};
function _0x3ebdd2(_0xc98b5d, _0x5e2713, _0x1dcb32) {
    var _0x44ca5d = CryptoJS.AES.encrypt(_0xc98b5d, _0x5e2713, {
      iv: _0x1dcb32,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return _0x44ca5d.toString();
}
aesEncryptKey = function (_0x59fe45, _0x36a96f) {
    var _0x353eb7 = CryptoJS.MD5(_0x59fe45).toString();
    var _0x3c5afe = CryptoJS.enc.Utf8.parse(_0x353eb7.substring(0, 16));
    var _0xa7fe4a = CryptoJS.enc.Utf8.parse(_0x353eb7.substring(16));
    var _0x3d5e5e = _0x3ebdd2(_0x36a96f, _0x3c5afe, _0xa7fe4a);
    return _0x3d5e5e;
};
aesEncrypt = function (fpv_all,_0x1f96f3) {
    var _0x132fa1 = CryptoJS.MD5(fpv_all).toString();
    var _0x2afe7e = CryptoJS.enc.Utf8.parse(_0x132fa1.substring(0, 16));
    var _0x13d566 = CryptoJS.enc.Utf8.parse(_0x132fa1.substring(16));
    var _0x20b3ba = _0x3ebdd2(_0x1f96f3, _0x2afe7e, _0x13d566);
    return _0x20b3ba;
};

window.gzip = function (_0x1911db) {
    var _0x1048d6 = pako.gzip(_0x1911db);
    return Buffer.from(_0x1048d6).toString('base64');
};

wlocation = {
    "host": "passport.csdn.net",
    "href": "https://passport.csdn.net/login?code=applets",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36",
    "platform": "Win32",
    "language": "zh-CN",
    "time": new Date().getTime()
}

captcha_protect = function () {
    _0x478615.end_time = new Date().getTime();
    _0x478615.guid = window._bsc_cv.guid();
    var _0x29e761 = CryptoJS.MD5(_0x478615.name + "_" + _0x478615.fpv).toString();
    var _0x36ae83 = window.rsaEncrypt(_0x29e761);
    var _0x6c0312 = window.aesEncryptKey(_0x29e761, JSON.stringify(_0x478615));
    return encodeURIComponent(window.gzip(_0x36ae83 + "captcha_protect" + _0x6c0312));
};

function get_cdn_cgi_bs_captcha() {
    window.fpv_all = _0x478615.fpv;
    data = {
        captcha_protect: captcha_protect(),
        fpv: window.gzip(_0x478615.fpv),
        isUpgrade: false,
        type: window.gzip('slide_pic'),
        wlocation: window.gzip(JSON.stringify(wlocation)),
        fpv_all: _0x478615.fpv,
        Token:_bsc_cv.signature()
    }
    return data;
}
// console.log(get_cdn_cgi_bs_captcha())

function get_csdn_verify_code(fpv_all,data_slide) {
    return {
        captcha_protect: captcha_protect(),
        body:window.aesEncrypt(fpv_all,window.gzip(JSON.stringify(data_slide))),
        fpv: window.rsaEncrypt(fpv_all),
        isUpgrade:'false',
        refreshTimes:'0',
        type: 'slide',
        wlocation: window.gzip(JSON.stringify(wlocation)),
        Token:_bsc_cv.signature()
    }
}



