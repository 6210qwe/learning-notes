const crypto = require('crypto');
const CryptoJS = require('crypto-js');
var n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function o() {
    for (var e = "", t = 16; t > 0; --t)
        e += n[Math.floor(62 * Math.random())];
    return e
}


// 你提供的公钥
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSp5eYB2FfHSXhzaUuHHbMfeOJ
p2dJ/oew7EKwzhLYfRa29d2pXm+rtN4c2HdhR+NGwm/5fY8T3entKq/7qrNBagG8
R8tGl604vqteU+8Tjl4SRbQRpm0Il64ruz+xjE4NWJFtr8CWW0U6mA8yjSffSDbv
qm87bsxTpHIn2frr/QIDAQAB
-----END PUBLIC KEY-----`;

// RSA 加密函数
function rsaEncrypt(publicKey, plaintext) {
    try {
        const buffer = Buffer.from(plaintext, 'utf8');
        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING
            },
            buffer
        );
        return encrypted.toString('base64');
    } catch (err) {
        console.error('加密失败:', err);
        return null;
    }
}

function get_encrypt() {
    let text = '[{"queryType":1,"volume":0,"weight":1,"sendTime":1752665407996,"sendDetailAddress":"","receiveDetailAddress":"","sendProvinceId":"1","sendCityId":"72","sendCountyId":"55659","receiveProvinceId":"22","receiveCityId":"1930","receiveCountyId":"49318"},{"client":"4","entrance":"JDWL-GW"}]';
    const d = o();
    const u = o();
    const plaintext = d + u;
    const encryptedData = rsaEncrypt(publicKey, plaintext);
    const key = CryptoJS.enc.Utf8.parse(d);
    const iv = CryptoJS.enc.Utf8.parse(u);
    const cipher = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return {
        'ciphertext':encryptedData,
        "data":cipher.toString()
    }
}


