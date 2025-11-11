// 参数加密
encrypt = function (n) {
    var e, t = "e98ae8878c264a7e";
    function r(n) {
        if (/^[\x00-\x7f]*$/.test(n))
            return n;
        for (var e = [], t = n.length, r = 0, i = 0; r < t; ++r,
        ++i) {
            var o = n.charCodeAt(r);
            if (o < 128)
                e[i] = n.charAt(r);
            else if (o < 2048)
                e[i] = String.fromCharCode(192 | o >> 6, 128 | 63 & o);
            else {
                if (!(o < 55296 || o > 57343)) {
                    if (r + 1 < t) {
                        var a = n.charCodeAt(r + 1);
                        if (o < 56320 && 56320 <= a && a <= 57343) {
                            var s = 65536 + ((1023 & o) << 10 | 1023 & a);
                            e[i] = String.fromCharCode(240 | s >> 18 & 63, 128 | s >> 12 & 63, 128 | s >> 6 & 63, 128 | 63 & s),
                            ++r;
                            continue
                        }
                    }
                    throw new Error("Malformed string")
                }
                e[i] = String.fromCharCode(224 | o >> 12, 128 | o >> 6 & 63, 128 | 63 & o)
            }
        }
        return e.join("")
    }
    function i(n) {
        return 4294967295 & n
    }
    function o(n, e, t, r, i, o) {
        return (t >>> 5 ^ e << 2) + (e >>> 3 ^ t << 4) ^ (n ^ e) + (o[3 & r ^ i] ^ t)
    }
    function a(n, e) {
        var t, r = n.length, i = r >> 2;
        0 != (3 & r) && ++i,
        e ? (t = new Array(i + 1))[i] = r : t = new Array(i);
        for (var o = 0; o < r; ++o)
            t[o >> 2] |= n.charCodeAt(o) << ((3 & o) << 3);
        return t
    }
    return null == n || 0 === n.length ? n : (n = r(n),
    t = r(t),
    function(n, e) {
        var t = n.length
          , r = t << 2;
        if (e) {
            var i = n[t - 1];
            if (i < (r -= 4) - 3 || i > r)
                return null;
            r = i
        }
        for (var o = 0; o < t; o++)
            n[o] = String.fromCharCode(255 & n[o], n[o] >>> 8 & 255, n[o] >>> 16 & 255, n[o] >>> 24 & 255);
        var a = n.join("");
        return e ? a.substring(0, r) : a
    }(function(n, e) {
        var t, r, a, s, c, l, d = n.length, u = d - 1;
        for (r = n[u],
        a = 0,
        l = 0 | Math.floor(6 + 52 / d); l > 0; --l) {
            for (s = (a = i(a + 2654435769)) >>> 2 & 3,
            c = 0; c < u; ++c)
                t = n[c + 1],
                r = n[c] = i(n[c] + o(a, t, r, c, s, e));
            t = n[0],
            r = n[u] = i(n[u] + o(a, t, r, u, s, e))
        }
        return n
    }(a(n, !0), ((e = a(t, !1)).length < 4 && (e.length = 4),
    e)), !1))
}
function get_data(n) {
    return btoa(encrypt(n));
}
// console.log(get_data("appid=201802274651|ctxid=9aa8b6f2fec98119308805b9f0fe08f5|a=15869854143|p=|r=0.44468048721336784"))

// 图片还原
var urlc = "https://smartvcode2.eastmoney.com/11/resources/e02b_160/2/0f/0f7043afbc6b72c251c374c144ed211c/0f7043afbc6b72c251c374c144ed211c.jpg";
var o = [];
var r = document.createElement("div");
r.className = "em_cut_fullbg em_hide";
var a = function() {
    for (var n, e = "6_11_7_10_4_12_3_1_0_5_2_9_8".split("_"), t = [], r = 0; r < 52; r++)
        n = 2 * parseInt(e[parseInt(r % 26 / 2)]) + r % 2,
        parseInt(r / 2) % 2 || (n += r % 2 ? -1 : 1),
        n += r < 26 ? 26 : 0,
        t.push(n);
    return t
}()
  , s = document.createElement("div");
s.className = "em_cut_" + "fullbg" + "_slice";
for (var l = 0, d = a.length; l < d; l++) {
    var u = "-" + (a[l] % 26 * 12 + 1) + "px " + (a[l] <= 25 ? (0 - "160") / 2 : 0) + "px"
      , p = s.cloneNode();
    p.style.backgroundImage = "url(" + urlc + ")",
    o.push(p),
    r.appendChild(p),
    p.style.backgroundPosition = u
}