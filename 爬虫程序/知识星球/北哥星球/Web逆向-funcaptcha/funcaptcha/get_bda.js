window = global;
const crypto = require('crypto');
deasync = require('deasync')
document = {};
document.currentScript = {}

window.code1;

ur = function (t) {
    "use strict";
    var e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    function r(t, e) {
        var r = t[0]
            , n = t[1]
            , o = t[2]
            , i = t[3];
        n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & o | ~n & i) + e[0] - 680876936 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & o) + e[1] - 389564586 | 0) << 12 | i >>> 20) + r | 0) & r | ~i & n) + e[2] + 606105819 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & r) + e[3] - 1044525330 | 0) << 22 | n >>> 10) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & o | ~n & i) + e[4] - 176418897 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & o) + e[5] + 1200080426 | 0) << 12 | i >>> 20) + r | 0) & r | ~i & n) + e[6] - 1473231341 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & r) + e[7] - 45705983 | 0) << 22 | n >>> 10) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & o | ~n & i) + e[8] + 1770035416 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & o) + e[9] - 1958414417 | 0) << 12 | i >>> 20) + r | 0) & r | ~i & n) + e[10] - 42063 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & r) + e[11] - 1990404162 | 0) << 22 | n >>> 10) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & o | ~n & i) + e[12] + 1804603682 | 0) << 7 | r >>> 25) + n | 0) & n | ~r & o) + e[13] - 40341101 | 0) << 12 | i >>> 20) + r | 0) & r | ~i & n) + e[14] - 1502002290 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & r) + e[15] + 1236535329 | 0) << 22 | n >>> 10) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & i | o & ~i) + e[1] - 165796510 | 0) << 5 | r >>> 27) + n | 0) & o | n & ~o) + e[6] - 1069501632 | 0) << 9 | i >>> 23) + r | 0) & n | r & ~n) + e[11] + 643717713 | 0) << 14 | o >>> 18) + i | 0) & r | i & ~r) + e[0] - 373897302 | 0) << 20 | n >>> 12) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & i | o & ~i) + e[5] - 701558691 | 0) << 5 | r >>> 27) + n | 0) & o | n & ~o) + e[10] + 38016083 | 0) << 9 | i >>> 23) + r | 0) & n | r & ~n) + e[15] - 660478335 | 0) << 14 | o >>> 18) + i | 0) & r | i & ~r) + e[4] - 405537848 | 0) << 20 | n >>> 12) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & i | o & ~i) + e[9] + 568446438 | 0) << 5 | r >>> 27) + n | 0) & o | n & ~o) + e[14] - 1019803690 | 0) << 9 | i >>> 23) + r | 0) & n | r & ~n) + e[3] - 187363961 | 0) << 14 | o >>> 18) + i | 0) & r | i & ~r) + e[8] + 1163531501 | 0) << 20 | n >>> 12) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n & i | o & ~i) + e[13] - 1444681467 | 0) << 5 | r >>> 27) + n | 0) & o | n & ~o) + e[2] - 51403784 | 0) << 9 | i >>> 23) + r | 0) & n | r & ~n) + e[7] + 1735328473 | 0) << 14 | o >>> 18) + i | 0) & r | i & ~r) + e[12] - 1926607734 | 0) << 20 | n >>> 12) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n ^ o ^ i) + e[5] - 378558 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ o) + e[8] - 2022574463 | 0) << 11 | i >>> 21) + r | 0) ^ r ^ n) + e[11] + 1839030562 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ r) + e[14] - 35309556 | 0) << 23 | n >>> 9) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n ^ o ^ i) + e[1] - 1530992060 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ o) + e[4] + 1272893353 | 0) << 11 | i >>> 21) + r | 0) ^ r ^ n) + e[7] - 155497632 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ r) + e[10] - 1094730640 | 0) << 23 | n >>> 9) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n ^ o ^ i) + e[13] + 681279174 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ o) + e[0] - 358537222 | 0) << 11 | i >>> 21) + r | 0) ^ r ^ n) + e[3] - 722521979 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ r) + e[6] + 76029189 | 0) << 23 | n >>> 9) + o | 0,
            n = ((n += ((o = ((o += ((i = ((i += ((r = ((r += (n ^ o ^ i) + e[9] - 640364487 | 0) << 4 | r >>> 28) + n | 0) ^ n ^ o) + e[12] - 421815835 | 0) << 11 | i >>> 21) + r | 0) ^ r ^ n) + e[15] + 530742520 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ r) + e[2] - 995338651 | 0) << 23 | n >>> 9) + o | 0,
            n = ((n += ((i = ((i += (n ^ ((r = ((r += (o ^ (n | ~i)) + e[0] - 198630844 | 0) << 6 | r >>> 26) + n | 0) | ~o)) + e[7] + 1126891415 | 0) << 10 | i >>> 22) + r | 0) ^ ((o = ((o += (r ^ (i | ~n)) + e[14] - 1416354905 | 0) << 15 | o >>> 17) + i | 0) | ~r)) + e[5] - 57434055 | 0) << 21 | n >>> 11) + o | 0,
            n = ((n += ((i = ((i += (n ^ ((r = ((r += (o ^ (n | ~i)) + e[12] + 1700485571 | 0) << 6 | r >>> 26) + n | 0) | ~o)) + e[3] - 1894986606 | 0) << 10 | i >>> 22) + r | 0) ^ ((o = ((o += (r ^ (i | ~n)) + e[10] - 1051523 | 0) << 15 | o >>> 17) + i | 0) | ~r)) + e[1] - 2054922799 | 0) << 21 | n >>> 11) + o | 0,
            n = ((n += ((i = ((i += (n ^ ((r = ((r += (o ^ (n | ~i)) + e[8] + 1873313359 | 0) << 6 | r >>> 26) + n | 0) | ~o)) + e[15] - 30611744 | 0) << 10 | i >>> 22) + r | 0) ^ ((o = ((o += (r ^ (i | ~n)) + e[6] - 1560198380 | 0) << 15 | o >>> 17) + i | 0) | ~r)) + e[13] + 1309151649 | 0) << 21 | n >>> 11) + o | 0,
            n = ((n += ((i = ((i += (n ^ ((r = ((r += (o ^ (n | ~i)) + e[4] - 145523070 | 0) << 6 | r >>> 26) + n | 0) | ~o)) + e[11] - 1120210379 | 0) << 10 | i >>> 22) + r | 0) ^ ((o = ((o += (r ^ (i | ~n)) + e[2] + 718787259 | 0) << 15 | o >>> 17) + i | 0) | ~r)) + e[9] - 343485551 | 0) << 21 | n >>> 11) + o | 0,
            t[0] = r + t[0] | 0,
            t[1] = n + t[1] | 0,
            t[2] = o + t[2] | 0,
            t[3] = i + t[3] | 0
    }

    function n(t) {
        var e, r = [];
        for (e = 0; e < 64; e += 4)
            r[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
        return r
    }

    function o(t) {
        var e, r = [];
        for (e = 0; e < 64; e += 4)
            r[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
        return r
    }

    function i(t) {
        var e, o, i, a, c, u, s = t.length, f = [1732584193, -271733879, -1732584194, 271733878];
        for (e = 64; e <= s; e += 64)
            r(f, n(t.substring(e - 64, e)));
        for (o = (t = t.substring(e - 64)).length,
                 i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 e = 0; e < o; e += 1)
            i[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
        if (i[e >> 2] |= 128 << (e % 4 << 3),
        e > 55)
            for (r(f, i),
                     e = 0; e < 16; e += 1)
                i[e] = 0;
        return a = (a = 8 * s).toString(16).match(/(.*?)(.{0,8})$/),
            c = parseInt(a[2], 16),
            u = parseInt(a[1], 16) || 0,
            i[14] = c,
            i[15] = u,
            r(f, i),
            f
    }

    function a(t) {
        var e, n, i, a, c, u, s = t.length, f = [1732584193, -271733879, -1732584194, 271733878];
        for (e = 64; e <= s; e += 64)
            r(f, o(t.subarray(e - 64, e)));
        for (n = (t = e - 64 < s ? t.subarray(e - 64) : new Uint8Array(0)).length,
                 i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 e = 0; e < n; e += 1)
            i[e >> 2] |= t[e] << (e % 4 << 3);
        if (i[e >> 2] |= 128 << (e % 4 << 3),
        e > 55)
            for (r(f, i),
                     e = 0; e < 16; e += 1)
                i[e] = 0;
        return a = (a = 8 * s).toString(16).match(/(.*?)(.{0,8})$/),
            c = parseInt(a[2], 16),
            u = parseInt(a[1], 16) || 0,
            i[14] = c,
            i[15] = u,
            r(f, i),
            f
    }

    function c(t) {
        var r, n = "";
        for (r = 0; r < 4; r += 1)
            n += e[t >> 8 * r + 4 & 15] + e[t >> 8 * r & 15];
        return n
    }

    function u(t) {
        var e;
        for (e = 0; e < t.length; e += 1)
            t[e] = c(t[e]);
        return t.join("")
    }

    function s(t) {
        return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))),
            t
    }

    function f(t, e) {
        var r, n = t.length, o = new ArrayBuffer(n), i = new Uint8Array(o);
        for (r = 0; r < n; r += 1)
            i[r] = t.charCodeAt(r);
        return e ? i : o
    }

    function l(t) {
        return String.fromCharCode.apply(null, new Uint8Array(t))
    }

    function p(t, e, r) {
        var n = new Uint8Array(t.byteLength + e.byteLength);
        return n.set(new Uint8Array(t)),
            n.set(new Uint8Array(e), t.byteLength),
            r ? n : n.buffer
    }

    function v(t) {
        var e, r = [], n = t.length;
        for (e = 0; e < n - 1; e += 2)
            r.push(parseInt(t.substr(e, 2), 16));
        return String.fromCharCode.apply(String, r)
    }

    function h() {
        this.reset()
    }

    return u(i("hello")),
    "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function () {
        function e(t, e) {
            return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
        }

        ArrayBuffer.prototype.slice = function (r, n) {
            var o, i, a, c, u = this.byteLength, s = e(r, u), f = u;
            return n !== t && (f = e(n, u)),
                s > f ? new ArrayBuffer(0) : (o = f - s,
                    i = new ArrayBuffer(o),
                    a = new Uint8Array(i),
                    c = new Uint8Array(this, s, o),
                    a.set(c),
                    i)
        }
    }(),
        h.prototype.append = function (t) {
            return this.appendBinary(s(t)),
                this
        }
        ,
        h.prototype.appendBinary = function (t) {
            this._buff += t,
                this._length += t.length;
            var e, o = this._buff.length;
            for (e = 64; e <= o; e += 64)
                r(this._hash, n(this._buff.substring(e - 64, e)));
            return this._buff = this._buff.substring(e - 64),
                this
        }
        ,
        h.prototype.end = function (t) {
            var e, r, n = this._buff, o = n.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (e = 0; e < o; e += 1)
                i[e >> 2] |= n.charCodeAt(e) << (e % 4 << 3);
            return this._finish(i, o),
                r = u(this._hash),
            t && (r = v(r)),
                this.reset(),
                r
        }
        ,
        h.prototype.reset = function () {
            return this._buff = "",
                this._length = 0,
                this._hash = [1732584193, -271733879, -1732584194, 271733878],
                this
        }
        ,
        h.prototype.getState = function () {
            return {
                buff: this._buff,
                length: this._length,
                hash: this._hash.slice()
            }
        }
        ,
        h.prototype.setState = function (t) {
            return this._buff = t.buff,
                this._length = t.length,
                this._hash = t.hash,
                this
        }
        ,
        h.prototype.destroy = function () {
            delete this._hash,
                delete this._buff,
                delete this._length
        }
        ,
        h.prototype._finish = function (t, e) {
            var n, o, i, a = e;
            if (t[a >> 2] |= 128 << (a % 4 << 3),
            a > 55)
                for (r(this._hash, t),
                         a = 0; a < 16; a += 1)
                    t[a] = 0;
            n = (n = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/),
                o = parseInt(n[2], 16),
                i = parseInt(n[1], 16) || 0,
                t[14] = o,
                t[15] = i,
                r(this._hash, t)
        }
        ,
        h.hash = function (t, e) {
            return h.hashBinary(s(t), e)
        }
        ,
        h.hashBinary = function (t, e) {
            var r = u(i(t));
            return e ? v(r) : r
        }
        ,
        h.ArrayBuffer = function () {
            this.reset()
        }
        ,
        h.ArrayBuffer.prototype.append = function (t) {
            var e, n = p(this._buff.buffer, t, !0), i = n.length;
            for (this._length += t.byteLength,
                     e = 64; e <= i; e += 64)
                r(this._hash, o(n.subarray(e - 64, e)));
            return this._buff = e - 64 < i ? new Uint8Array(n.buffer.slice(e - 64)) : new Uint8Array(0),
                this
        }
        ,
        h.ArrayBuffer.prototype.end = function (t) {
            var e, r, n = this._buff, o = n.length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (e = 0; e < o; e += 1)
                i[e >> 2] |= n[e] << (e % 4 << 3);
            return this._finish(i, o),
                r = u(this._hash),
            t && (r = v(r)),
                this.reset(),
                r
        }
        ,
        h.ArrayBuffer.prototype.reset = function () {
            return this._buff = new Uint8Array(0),
                this._length = 0,
                this._hash = [1732584193, -271733879, -1732584194, 271733878],
                this
        }
        ,
        h.ArrayBuffer.prototype.getState = function () {
            var t = h.prototype.getState.call(this);
            return t.buff = l(t.buff),
                t
        }
        ,
        h.ArrayBuffer.prototype.setState = function (t) {
            return t.buff = f(t.buff, !0),
                h.prototype.setState.call(this, t)
        }
        ,
        h.ArrayBuffer.prototype.destroy = h.prototype.destroy,
        h.ArrayBuffer.prototype._finish = h.prototype._finish,
        h.ArrayBuffer.hash = function (t, e) {
            var r = u(a(new Uint8Array(t)));
            return e ? v(r) : r
        }
        ,
        h
}()

function bn(t) {
    var e = 239
        , r = 235
        , n = 233
        , o = 233
        , i = 245
        , a = 236
    if (TextEncoder)
        return (new TextEncoder)['encode'](t);
    for (var u = new Uint8Array(t['length']), s = 0; s < u['length']; s += 1)
        u[s] = t['charCodeAt'](s);
    return u
}

$r = function (t) {
    var e = 406
        , r = 425
        , n = 403
        , o = 406
        , i = Jr
        , a = Math[i(425)](Math[i(e)](2, 32) / t) * t
        , c = 0;
    do {
        c = Math[i(r)](Math[i(n)]() * Math[i(o)](2, 32))
    } while (c >= a);
    return c %= t
}
tn = function (t, e) {
    var r = 421
        , n = 415
        , o = 417
        , i = 401
        , a = 414
        , c = 417
        , u = 401
        , s = 398
        , f = 405
        , p = new t(e)
        , v = crypto;
    if (v && v["getRandomValues"] && typeof v['getRandomValues'] == 'function')
        return v['getRandomValues'](p);
    for (var h = 0; h < p['length']; h += 1)
        p[h] = $r(256);
    return p
};

xn = function (t) {
    for (var e = 459, r = 444, n = 409, o = 441, i = 449, c = [], u = 0; u < t["length"]; u += 1)
        c[u] = t[u];
    return c["map"]((function (t) {
            ;
            return t["toString"](16)['padStart'](2, "0")
        }
    ))["join"]("")
}
var En = function (t) {
    for (var e = 429, r = 455, n = 412, o = 456, i = 402, c = "", u = new Uint8Array(t), s = u["byteLength"], f = 0; f < s; f++)
        c += String['fromCharCode'](u[f]);
    return window['btoa'](c)
}

function get_bda() {
    Zr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    Sn = function (t, e) {
        var r = 435
            , n = 404
            , o = 454
            , i = 470
            , c = t + function (t) {
            for (var e, r, n = 411, o = 418, i = 404, a = 411, c = 418, u = 396, s = 419, l = t['length'], p = "", v = 0; l > 1;)
                e = t['charAt'](v++)['charCodeAt'](0),
                    r = t['charAt'](v++)['charCodeAt'](0),
                    p += String['fromCharCode']((Zr[e] << 4) + Zr[r]),
                    l -= 2;
            return p
        }(e)
            , u = [];
        u[0] = ur["hashBinary"](c, !0);
        for (var s = u[0], f = 1; f < 3; f++)
            u[f] = ur['hashBinary'](u[f - 1] + c, !0),
                s += u[f];
        return function (t) {
            for (var e = 405, r = 418, n = 404, i = new Uint8Array(t['length']), a = 0, c = t['length']; a < c; ++a)
                i[a] = t['charCodeAt'](a);
            return i
        }(s["substring"](0, 32))
    }
    let obj1 = [
        {
            "key": "api_type",
            "value": "js"
        },
        {
            "key": "f",
            "value": "639083e3eaedcef0a893ea1fd1038f1c"
        },
        {
            "key": "n",
            "value": "MTc1MjAyOTg4Ng=="
        },
        {
            "key": "wh",
            "value": "96d9ee0861c6a3bb8322eadfbcad9b54|cc7fecdd5c8bec57541ae802c7648eed"
        },
        {
            "key": "enhanced_fp",
            "value": [
                {
                    "key": "webgl_extensions",
                    "value": "ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode"
                },
                {
                    "key": "webgl_extensions_hash",
                    "value": "7300c23f4e6fa34e534fc99c1b628588"
                },
                {
                    "key": "webgl_renderer",
                    "value": "WebKit WebGL"
                },
                {
                    "key": "webgl_vendor",
                    "value": "WebKit"
                },
                {
                    "key": "webgl_version",
                    "value": "WebGL 1.0 (OpenGL ES 2.0 Chromium)"
                },
                {
                    "key": "webgl_shading_language_version",
                    "value": "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)"
                },
                {
                    "key": "webgl_aliased_line_width_range",
                    "value": "[1, 1]"
                },
                {
                    "key": "webgl_aliased_point_size_range",
                    "value": "[1, 1024]"
                },
                {
                    "key": "webgl_antialiasing",
                    "value": "yes"
                },
                {
                    "key": "webgl_bits",
                    "value": "8,8,24,8,8,0"
                },
                {
                    "key": "webgl_max_params",
                    "value": "16,32,16384,1024,16384,16,16384,30,16,16,4095"
                },
                {
                    "key": "webgl_max_viewport_dims",
                    "value": "[32767, 32767]"
                },
                {
                    "key": "webgl_unmasked_vendor",
                    "value": "Google Inc. (NVIDIA)"
                },
                {
                    "key": "webgl_unmasked_renderer",
                    "value": "ANGLE (NVIDIA, NVIDIA GeForce GTX 1650 (0x00001F82) Direct3D11 vs_5_0 ps_5_0, D3D11)"
                },
                {
                    "key": "webgl_vsf_params",
                    "value": "23,127,127,23,127,127,23,127,127"
                },
                {
                    "key": "webgl_vsi_params",
                    "value": "0,31,30,0,31,30,0,31,30"
                },
                {
                    "key": "webgl_fsf_params",
                    "value": "23,127,127,23,127,127,23,127,127"
                },
                {
                    "key": "webgl_fsi_params",
                    "value": "0,31,30,0,31,30,0,31,30"
                },
                {
                    "key": "webgl_hash_webgl",
                    "value": "8b7d060bb84464b7ffd8d90659a9408e"
                },
                {
                    "key": "user_agent_data_brands",
                    "value": "Not)A;Brand,Chromium,Google Chrome"
                },
                {
                    "key": "user_agent_data_mobile",
                    "value": false
                },
                {
                    "key": "navigator_connection_downlink",
                    "value": 10
                },
                {
                    "key": "navigator_connection_downlink_max",
                    "value": null
                },
                {
                    "key": "network_info_rtt",
                    "value": 250
                },
                {
                    "key": "network_info_save_data",
                    "value": false
                },
                {
                    "key": "network_info_rtt_type",
                    "value": null
                },
                {
                    "key": "screen_pixel_depth",
                    "value": 24
                },
                {
                    "key": "navigator_device_memory",
                    "value": 8
                },
                {
                    "key": "navigator_pdf_viewer_enabled",
                    "value": true
                },
                {
                    "key": "navigator_languages",
                    "value": "zh-CN"
                },
                {
                    "key": "window_inner_width",
                    "value": 0
                },
                {
                    "key": "window_inner_height",
                    "value": 0
                },
                {
                    "key": "window_outer_width",
                    "value": 1920
                },
                {
                    "key": "window_outer_height",
                    "value": 1040
                },
                {
                    "key": "browser_detection_firefox",
                    "value": false
                },
                {
                    "key": "browser_detection_brave",
                    "value": false
                },
                {
                    "key": "browser_api_checks",
                    "value": [
                        "permission_status: true",
                        "eye_dropper: true",
                        "audio_data: true",
                        "writable_stream: true",
                        "css_style_rule: true",
                        "navigator_ua: true",
                        "barcode_detector: false",
                        "display_names: true",
                        "contacts_manager: false",
                        "svg_discard_element: false",
                        "usb: defined",
                        "media_device: defined",
                        "playback_quality: true"
                    ]
                },
                {
                    "key": "browser_object_checks",
                    "value": "554838a8451ac36cb977e719e9d6623c"
                },
                {
                    "key": "29s83ih9",
                    "value": "68934a3e9455fa72420237eb05902327⁣"
                },
                {
                    "key": "audio_codecs",
                    "value": "{\"ogg\":\"probably\",\"mp3\":\"probably\",\"wav\":\"probably\",\"m4a\":\"maybe\",\"aac\":\"probably\"}"
                },
                {
                    "key": "audio_codecs_extended_hash",
                    "value": "805036349642e2569ec299baed02315b"
                },
                {
                    "key": "video_codecs",
                    "value": "{\"ogg\":\"\",\"h264\":\"probably\",\"webm\":\"probably\",\"mpeg4v\":\"\",\"mpeg4a\":\"\",\"theora\":\"\"}"
                },
                {
                    "key": "video_codecs_extended_hash",
                    "value": "67b509547efe3423d32a3a70a2553c16"
                },
                {
                    "key": "media_query_dark_mode",
                    "value": false
                },
                {
                    "key": "f9bf2db",
                    "value": "{\"pc\":\"no-preference\",\"ah\":\"hover\",\"ap\":\"coarse\",\"p\":\"fine\",\"h\":\"hover\",\"u\":\"fast\",\"prm\":\"no-preference\",\"prt\":\"no-preference\",\"s\":\"enabled\",\"fc\":\"none\"}"
                },
                {
                    "key": "headless_browser_phantom",
                    "value": false
                },
                {
                    "key": "headless_browser_selenium",
                    "value": false
                },
                {
                    "key": "headless_browser_nightmare_js",
                    "value": false
                },
                {
                    "key": "headless_browser_generic",
                    "value": 4
                },
                {
                    "key": "1l2l5234ar2",
                    "value": "1752029886183⁣"
                },
                {
                    "key": "document__referrer",
                    "value": ""
                },
                {
                    "key": "window__ancestor_origins",
                    "value": [
                        "https://www.arkoselabs.com"
                    ]
                },
                {
                    "key": "window__tree_index",
                    "value": [
                        0
                    ]
                },
                {
                    "key": "window__tree_structure",
                    "value": "[[]]"
                },
                {
                    "key": "window__location_href",
                    "value": "https://client-api.arkoselabs.com/v2/2.15.0/enforcement.cb91e3cd81d7571c86ff1f4512db1ade.html"
                },
                {
                    "key": "client_config__sitedata_location_href",
                    "value": "https://www.arkoselabs.com/arkose-matchkey/"
                },
                {
                    "key": "client_config__language",
                    "value": null
                },
                {
                    "key": "client_config__surl",
                    "value": "https://client-api.arkoselabs.com"
                },
                {
                    "key": "c8480e29a",
                    "value": "165ee51d4a3e27bfeee660c40851de9f⁢"
                },
                {
                    "key": "client_config__triggered_inline",
                    "value": false
                },
                {
                    "key": "mobile_sdk__is_sdk",
                    "value": false
                },
                {
                    "key": "audio_fingerprint",
                    "value": "124.04347527516074"
                },
                {
                    "key": "navigator_battery_charging",
                    "value": true
                },
                {
                    "key": "media_device_kinds",
                    "value": [
                        "audiooutput"
                    ]
                },
                {
                    "key": "media_devices_hash",
                    "value": "eba8b0db4bf7d1f1bfb964d48f6c1784"
                },
                {
                    "key": "1f220c9",
                    "value": "d99a347770ecf166460560b1c06f8e42"
                },
                {
                    "key": "math_fingerprint",
                    "value": "0ce80c69b75667d69baedc0a70c82da7"
                },
                {
                    "key": "supported_math_functions",
                    "value": "67d1759d7e92844d98045708c0a91c2f"
                },
                {
                    "key": "screen_orientation",
                    "value": "landscape-primary"
                },
                {
                    "key": "rtc_peer_connection",
                    "value": 5
                },
                {
                    "key": "4b4b269e68",
                    "value": "89ce2f4e-ba8a-41b0-ab19-df08fac0d0f9"
                },
                {
                    "key": "6a62b2a558",
                    "value": "cb91e3cd81d7571c86ff1f4512db1ade"
                },
                {
                    "key": "is_keyless",
                    "value": false
                },
                {
                    "key": "c2d2015",
                    "value": "29d13b1af8803cb86c2697345d7ea9eb"
                },
                {
                    "key": "43f2d94",
                    "value": []
                },
                {
                    "key": "20c15922",
                    "value": true
                },
                {
                    "key": "4f59ca8",
                    "value": null
                },
                {
                    "key": "3ea7194",
                    "value": {
                        "supported": true,
                        "formats": [
                            "HDR10",
                            "HLG"
                        ],
                        "isHDR": false
                    }
                },
                {
                    "key": "05d3d24",
                    "value": "7bd8fe2b950ecd77778f4bf4c2c1b213"
                },
                {
                    "key": "speech_default_voice",
                    "value": "Microsoft Huihui - Chinese (Simplified, PRC) || zh-CN"
                },
                {
                    "key": "speech_voices_hash",
                    "value": "73ad71db4552328df27e3d2c113ddeb2"
                },
                {
                    "key": "83eb055",
                    "value": false
                },
                {
                    "key": "4ca87df3d1",
                    "value": "MTI3LDAsMTM2MywxNjY4OzE0NiwwLDEzNTksMTU2MTszMTUsMCwxNDczLDEzNzQ7MzI2LDAsMTQ3MiwxMjkxOzMzNiwwLDE0NjYsMTI5MzszNDYsMCwxNDYyLDEyNDE7MzUyLDAsMTQ1NywxMjQ0OzM1OSwwLDE0NTIsMTI0NzszNjcsMCwxNDQ2LDEyNTE7Mzc2LDAsMTQ0MSwxMjU3OzM4NywwLDE0MzUsMTI2MzszOTEsMCwxNDMwLDEyNzI7NDAzLDAsMTQyNCwxMjc5OzQyMSwwLDE0MTQsMTI5MDs0MzEsMCwxNDA5LDEyOTU7NDQ3LDAsMTQwNCwxMjk3OzQ3NSwwLDEzOTgsMTI5OTs1NjgsMSwxMzk0LDEzMDE7NjYzLDIsMTM5NCwxMzAxOw=="
                },
                {
                    "key": "867e25e5d4",
                    "value": "Ow=="
                },
                {
                    "key": "d4a306884c",
                    "value": "Ow=="
                }
            ]
        },
        {
            "key": "fe",
            "value": [
                "DNT:unknown",
                "L:zh-CN",
                "D:24",
                "PR:1",
                "S:1920,1080",
                "AS:1920,1040",
                "TO:-480",
                "SS:true",
                "LS:true",
                "IDB:true",
                "B:false",
                "ODB:false",
                "CPUC:unknown",
                "PK:Win32",
                "CFP:16163036",
                "FR:false",
                "FOS:false",
                "FB:false",
                "JSF:Arial,Arial Black,Arial Narrow,Calibri,Cambria,Cambria Math,Comic Sans MS,Consolas,Courier,Courier New,Georgia,Helvetica,Impact,Lucida Console,Lucida Sans Unicode,Microsoft Sans Serif,MS Gothic,MS PGothic,MS Sans Serif,MS Serif,Palatino Linotype,Segoe Print,Segoe Script,Segoe UI,Segoe UI Light,Segoe UI Semibold,Segoe UI Symbol,Tahoma,Times,Times New Roman,Trebuchet MS,Verdana,Wingdings",
                "P:Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,PDF Viewer,WebKit built-in PDF",
                "T:10,false,false",
                "H:12",
                "SWF:false"
            ]
        },
        {
            "key": "ife_hash",
            "value": "6c6b1f89c1792791e897f1594996bf15"
        },
        {
            "key": "jsbd",
            "value": "{\"HL\":2,\"NCE\":true,\"DT\":\"\",\"NWD\":\"false\",\"DMTO\":1,\"DOTO\":1}"
        }
    ];
    Et = (new Date)['getTime']() / 1e3;
    St = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36';
    xt = Math['round'](Et - Et % 21600)
    It = JSON['stringify'](obj1)
    At = bn(It)
    kt = St + xt
    Pt = tn(Uint8Array, 16)
    jt = tn(Uint8Array, 8)
    Rt = xn(Pt)
    Tt = xn(jt)
    Ct = Sn(kt, Tt)
    Lt = null;
    re = {
        'name': "AES-CBC",
        "iv": Pt
    };
    crypto.subtle.importKey("raw", Ct, re, false, [
        "encrypt"
    ]).then(J => {
        return crypto.subtle.encrypt(re, J, At);
    }).then(buffer_ => {
        data = JSON.stringify({
            ct: En(buffer_),
            s: Tt,
            iv: Rt
        })
        window.code1 = btoa(data);
    });
    deasync.sleep(20)
    return window.code1
}

console.log(get_bda());

