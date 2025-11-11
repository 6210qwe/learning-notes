var CryptoJS = require('crypto-js')

function aes_encrypt(e) {
    var t = 'L4fBtD5fLC9FQw22'
        , n = CryptoJS.enc.Utf8.parse(t)
        , o = CryptoJS.AES.encrypt(e, n, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return o.toString()
}

function aes_decrypt(e) {
    var n = CryptoJS.enc.Utf8.parse('aahc3TfyfCEmER33')
        , o = CryptoJS.AES.decrypt(e, n, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return o.toString(CryptoJS.enc.Utf8)
}

