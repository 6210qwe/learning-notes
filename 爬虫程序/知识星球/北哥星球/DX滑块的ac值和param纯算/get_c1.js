function makeLocalID() {
    for (var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32, t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', n = [], o = 0; o < r; o++)
        n[o] = t.charAt(Math['floor'](Math['random']() * t['length']));
    return n['join']("")
}


encode = function encode(t, n) {
    for (var f, c, s, d, h, v, l, g = "", p = 0; p < t.length;)
        f = t["charCodeAt"](p++),
            c = t["charCodeAt"](p++),
            s = t.charCodeAt(p++),
            d = f >> 2,
            h = (3 & f) << 4 | c >> 4,
            v = (15 & c) << 2 | s >> 6,
            l = 63 & s,
            isNaN(c) ? v = l = 64 : isNaN(s) && (l = 64),
            g = g + n['charAt'](d) + n.charAt(h) + n.charAt(v) + n['charAt'](l);
    return g
}

let str1 = "S0DOZN9bBJyPV-qczRa3oYvhGlUMrdjW7m2CkE5_FuKiTQXnwe6pg8fs4HAtIL1x=";

function get_c1() {
    let obj1 = {
        "lid": (new Date).getTime() + makeLocalID(),
        "lidType": "0",
        "cache": true,
        "appKey": "90762f230adee6af3957d9a029269461"
    }
    return encode(JSON.stringify(obj1), str1);
}

function get_c2(lid) {
    let obj2 = {
        "lid": lid,
        "lidType": 1,
        "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "np": "Win32",
        "dm": 8,
        "cc": "unknown",
        "hc": 12,
        "lug": "en-AU",
        "lugs": "en-AU",
        "dnt": "unknown",
        "ce": 1,
        "rp": "386207752cb0f2afd038b54c8f2b1b29",
        "mts": "b2f0f0a1934eb1cd8e16d018a2c81051",
        "cd": 24,
        "res": "1920;1080",
        "ar": "1920;1040",
        "to": -480,
        "pr": 1,
        "ls": 1,
        "ss": 1,
        "ind": 1,
        "ab": 0,
        "od": 0,
        "adb": false,
        "ts": "10;false;false",
        "web": "8ee151ef1172d50037121818a47c1349",
        "gi": "Google Inc. (NVIDIA);ANGLE (NVIDIA, NVIDIA GeForce GTX 1650 (0x00001F82) Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "cpt": "24ad9cc615237606f491b369d04ed513",
        "hlb": false,
        "hlo": true,
        "hlr": false,
        "hll": false,
        "ct": 30,
        "appKey": "90762f230adee6af3957d9a029269461"
    };
    return encode(JSON.stringify(obj2), str1)
}


