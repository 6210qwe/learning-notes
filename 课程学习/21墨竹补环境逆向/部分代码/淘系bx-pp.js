const fs = require('fs');
const deasync = require("deasync")
window = {}
p = {
    b: function () {
        return !0
    },
    c: function () {
        return Date.now()
    },
    d: function (e, t, n) {
        return i.copyWithin(e, t, t + n)
    },
    a: function (e) {
        0
    }
}
buffer = fs.readFileSync("program.wasm")
window.done = false
WebAssembly.instantiate(buffer, {
    a: p
}).then(t => {

    var o = t.instance.exports;
    a = o.e,
        r = a.buffer,
        i = new Uint8Array(r);
    var s = function (e) {
        return (s = o.g)(e)
    };
    t._pp = function (e, t, n, a, i, r, c, s, d, p, l) {
        return o.j(e, t, n, a, i, r, c, s, d, p, l)
    }
        ,
        t._free = function (e) {
            return o.i(e)
        }
        ,
        t._UTF8ToString = function (e, t, n) {
            return o.h(e, t, n)
        }
        ,
        t.stringToNewUTF8 = function (e) {
            var t = function (e) {
                for (var t = 0, n = 0; n < e.length; ++n) {
                    var a = e.charCodeAt(n);
                    a <= 127 ? t++ : a <= 2047 ? t += 2 : a >= 55296 && a <= 57343 ? (t += 4,
                        ++n) : t += 3
                }
                return t
            }(e) + 1
                , n = s(t);
            return n && function (e, t, n) {
                (function (e, t, n, a) {
                        if (!(a > 0))
                            return 0;
                        for (var i = n, r = n + a - 1, o = 0; o < e.length; ++o) {
                            var c = e.charCodeAt(o);
                            if (c >= 55296 && c <= 57343)
                                c = 65536 + ((1023 & c) << 10) | 1023 & e.charCodeAt(++o);
                            if (c <= 127) {
                                if (n >= r)
                                    break;
                                t[n++] = c
                            } else if (c <= 2047) {
                                if (n + 1 >= r)
                                    break;
                                t[n++] = 192 | c >> 6,
                                    t[n++] = 128 | 63 & c
                            } else if (c <= 65535) {
                                if (n + 2 >= r)
                                    break;
                                t[n++] = 224 | c >> 12,
                                    t[n++] = 128 | c >> 6 & 63,
                                    t[n++] = 128 | 63 & c
                            } else {
                                if (n + 3 >= r)
                                    break;
                                t[n++] = 240 | c >> 18,
                                    t[n++] = 128 | c >> 12 & 63,
                                    t[n++] = 128 | c >> 6 & 63,
                                    t[n++] = 128 | 63 & c
                            }
                        }
                        t[n] = 0
                    }
                )(e, i, t, n)
            }(e, n, t),
                n
        }

    if (!window._config_) {
        window._config_ = {};
    }
    // t.UTF8ToString = c
    window._config_.ppModule = t
    window.done = true
})
while (!window.done) {
    deasync.sleep(1)
}

var s = window._config_
d = s.pp
p = s.ppModule
b = p._pp
    , k = p.stringToNewUTF8
u = 0
f = 0
g = 'a'
h = "1752155414589"
m = "md5"
_ = "qweasdzxcg"
w = "7c07536aaacb1b51839d5d6cbccd0fae74dc7bee9a910a8fc6054924068098b9723595cb0b7ec5735cb01bc786048b56"
a = '1'

r = ''
v = 3000

function Ex(e, t) {
    var o = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

    return e ? function (e, t, n) {
        for (var a = t + n, i = t; e[i] && !(i >= a);)
            ++i;
        if (i - t > 16 && e.buffer && o)
            return o.decode(e.subarray(t, i));
        for (var r = ""; t < i;) {
            var c = e[t++];
            if (128 & c) {
                var s = 63 & e[t++];
                if (192 != (224 & c)) {
                    var d = 63 & e[t++];
                    if ((c = 224 == (240 & c) ? (15 & c) << 12 | s << 6 | d : (7 & c) << 18 | s << 12 | d << 6 | 63 & e[t++]) < 65536)
                        r += String.fromCharCode(c);
                    else {
                        var p = c - 65536;
                        r += String.fromCharCode(55296 | p >> 10, 56320 | 1023 & p)
                    }
                } else
                    r += String.fromCharCode((31 & c) << 6 | s)
            } else
                r += String.fromCharCode(c)
        }
        return r
    }(i, e, t) : ""
}
function get_bxpp(pp) {
    var C = b(0, 0, k(pp['q']), k(pp['t']), k(pp['f']), k(pp['k']), k(pp['enc']), k('1'), k('1'), k(r), v);
    // console.log(C)


    window._config_.ppSign = Ex(C)
    // console.log(Ex(C))
    return Ex(C)
}
pp={'enc': 'ac08a4ebb25ef5a3d4cc88c1119c7b5574b0e677acc9357b81a1351caf7fc27b6c36c34ddaba2cf05472751830ab46e0', 'f': 'md5', 'i': 0, 'k': 'qweasdzxcg', 'l': 0, 'mt': 3000, 'q': 'a', 't': '1752158785708'}
console.log(get_bxpp(pp))