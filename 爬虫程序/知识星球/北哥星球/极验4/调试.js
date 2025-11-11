window = global;
navigator = {}
var MD5 = require("crypto-js/md5");
function e() {
    return (65536 * (1 + Math["random"]()) | 0)["toString"](16)["substring"](1);
}

function guid() {
    return e() + e() + e() + e();
}

guid_ = guid()
console.log(guid_)
function aes() {
    var n = function () {
        var e;
        var s = Object["create"] || function () {
            function s() {
            }

            return function (e) {
                var t;
                return s["prototype"] = e, t = new s(), s["prototype"] = null, t;
            };
        }();
        var t = {};
        var n = t["lib"] = {};
        var i = n["Base"] = {
            "extend": function (e) {
                var t = s(this);
                return e && t["mixIn"](e), t["hasOwnProperty"]("init") && this["init"] !== t["init"] || (t["init"] = function () {
                    t["$super"]["init"]["apply"](this, arguments);
                }), (t["init"]["prototype"] = t)["$super"] = this, t;
            },
            "create": function () {
                var e = this["extend"]();
                return e["init"]["apply"](e, arguments), e;
            },
            "init": function () {
            },
            "mixIn": function (e) {
                for (var t in e) e["hasOwnProperty"](t) && (this[t] = e[t]);
                e["hasOwnProperty"]("toString") && (this["toString"] = e["toString"]);
            }
        };
        var c = n["WordArray"] = i["extend"]({
            "init": function (e, t) {
                e = this["words"] = e || [], t != undefined ? this["sigBytes"] = t : this["sigBytes"] = 4 * e["length"];
            },
            "concat": function (e) {
                var t = this["words"];
                var s = e["words"];
                var n = this["sigBytes"];
                var i = e["sigBytes"];
                if (this["clamp"](), n % 4) for (var r = 0; r < i; r++) {
                    var o = s[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    t[n + r >>> 2] |= o << 24 - (n + r) % 4 * 8;
                } else for (r = 0; r < i; r += 4) t[n + r >>> 2] = s[r >>> 2];
                return this["sigBytes"] += i, this;
            },
            "clamp": function () {
                var e = this["words"];
                var t = this["sigBytes"];
                e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, e["length"] = Math["ceil"](t / 4);
            }
        });
        var r = t["enc"] = {};
        var h = r["Latin1"] = {
            "parse": function (e) {
                for (var t = e["length"], s = [], n = 0; n < t; n++) s[n >>> 2] |= (255 & e["charCodeAt"](n)) << 24 - n % 4 * 8;
                return new c["init"](s, t);
            }
        };
        var o = r["Utf8"] = {
            "parse": function (e) {
                return h["parse"](unescape(encodeURIComponent(e)));
            }
        };
        var a = n["BufferedBlockAlgorithm"] = i["extend"]({
            "reset": function () {
                this["$_JBN"] = new c["init"](), this["$_BDFq"] = 0;
            },
            "$_BDGq": function (e) {
                "string" == typeof e && (e = o["parse"](e)), this["$_JBN"]["concat"](e), this["$_BDFq"] += e["sigBytes"];
            },
            "$_BDHW": function (e) {
                var t = this["$_JBN"];
                var s = t["words"];
                var n = t["sigBytes"];
                var i = this["blockSize"];
                var r = n / (4 * i);
                var o = (r = e ? Math["ceil"](r) : Math["max"]((0 | r) - this["$_BDId"], 0)) * i;
                var a = Math["min"](4 * o, n);
                if (o) {
                    for (var _ = 0; _ < o; _ += i) this["$_BDJD"](s, _);
                    var u = s["splice"](0, o);
                    t["sigBytes"] -= a;
                }
                return new c["init"](u, a);
            },
            "$_BDId": 0
        });
        var _ = t["algo"] = {};
        var u = n["Cipher"] = a["extend"]({
            "cfg": i["extend"](),
            "createEncryptor": function (e, t) {
                return this["create"](this["$_BEAy"], e, t);
            },
            "init": function (e, t, s) {
                this["cfg"] = this["cfg"]["extend"](s), this["$_BEBN"] = e, this["$_BECE"] = t, this["reset"]();
            },
            "reset": function () {
                a["reset"]["call"](this), this["$_BEDW"]();
            },
            "process": function (e) {
                return this["$_BDGq"](e), this["$_BDHW"]();
            },
            "finalize": function (e) {
                return e && this["$_BDGq"](e), this["$_BEEM"]();
            },
            "keySize": 4,
            "ivSize": 4,
            "$_BEAy": 1,
            "$_BEFM": 2,
            "$_BEGp": function (u) {
                return {
                    "encrypt": function (e, t, s) {
                        t = h["parse"](t), s && s["iv"] || ((s = s || {})["iv"] = h["parse"]("0000000000000000"));
                        for (var n = v["encrypt"](u, e, t, s), i = n["ciphertext"]["words"], r = n["ciphertext"]["sigBytes"], o = [], a = 0; a < r; a++) {
                            var _ = i[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                            o["push"](_);
                        }
                        return o;
                    }
                };
            }
        });
        var p = t["mode"] = {};
        var l = n["BlockCipherMode"] = i["extend"]({
            "createEncryptor": function (e, t) {
                return this["Encryptor"]["create"](e, t);
            },
            "init": function (e, t) {
                this["$_BEHl"] = e, this["$_BEIc"] = t;
            }
        });
        var f = p["CBC"] = ((e = l["extend"]())["Encryptor"] = e["extend"]({
            "processBlock": function (e, t) {
                var s = this["$_BEHl"];
                var n = s["blockSize"];
                (function o(e, t, s) {
                    var n = this["$_BEIc"];
                    if (n) {
                        var i = n;
                        this["$_BEIc"] = undefined;
                    } else var i = this["$_BEJZ"];
                    for (var r = 0; r < s; r++) e[t + r] ^= i[r];
                })["call"](this, e, t, n), s["encryptBlock"](e, t), this["$_BEJZ"] = e["slice"](t, t + n);
            }
        }), e);
        var d = (t["pad"] = {})["Pkcs7"] = {
            "pad": function (e, t) {
                for (var s = 4 * t, n = s - e["sigBytes"] % s, i = n << 24 | n << 16 | n << 8 | n, r = [], o = 0; o < n; o += 4) r["push"](i);
                var a = c["create"](r, n);
                e["concat"](a);
            }
        };
        var g = n["BlockCipher"] = u["extend"]({
            "cfg": u["cfg"]["extend"]({
                "mode": f,
                "padding": d
            }),
            "reset": function () {
                u["reset"]["call"](this);
                var e = this["cfg"];
                var t = e["iv"];
                var s = e["mode"];
                if (this["$_BEBN"] == this["$_BEAy"]) var n = s["createEncryptor"];
                this["$_BFAR"] && this["$_BFAR"]["$_BFBl"] == n ? this["$_BFAR"]["init"](this, t && t["words"]) : (this["$_BFAR"] = n["call"](s, this, t && t["words"]), this["$_BFAR"]["$_BFBl"] = n);
            },
            "$_BDJD": function (e, t) {
                this["$_BFAR"]["processBlock"](e, t);
            },
            "$_BEEM": function () {
                var e = this["cfg"]["padding"];
                if (this["$_BEBN"] == this["$_BEAy"]) {
                    e["pad"](this["$_JBN"], this["blockSize"]);
                    var t = this["$_BDHW"](!0);
                }
                return t;
            },
            "blockSize": 4
        });
        var m = n["CipherParams"] = i["extend"]({
            "init": function (e) {
                this["mixIn"](e);
            }
        });
        var v = n["SerializableCipher"] = i["extend"]({
            "cfg": i["extend"](),
            "encrypt": function (e, t, s, n) {
                n = this["cfg"]["extend"](n);
                var i = e["createEncryptor"](s, n);
                var r = i["finalize"](t);
                var o = i["cfg"];
                return m["create"]({
                    "ciphertext": r,
                    "key": s,
                    "iv": o["iv"],
                    "algorithm": e,
                    "mode": o["mode"],
                    "padding": o["padding"],
                    "blockSize": e["blockSize"],
                    "formatter": n["format"]
                });
            }
        });
        var b = [];
        var w = [];
        var y = [];
        var x = [];
        var k = [];
        var T = [];
        var C = [];
        var E = [];
        var A = [];
        var B = [];
        !function () {
            for (var e = [], t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
            var s = 0;
            var n = 0;
            for (t = 0; t < 256; t++) {
                var i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4;
                i = i >>> 8 ^ 255 & i ^ 99, b[s] = i;
                var r = e[w[i] = s];
                var o = e[r];
                var a = e[o];
                var _ = 257 * e[i] ^ 16843008 * i;
                y[s] = _ << 24 | _ >>> 8, x[s] = _ << 16 | _ >>> 16, k[s] = _ << 8 | _ >>> 24, T[s] = _;
                _ = 16843009 * a ^ 65537 * o ^ 257 * r ^ 16843008 * s;
                C[i] = _ << 24 | _ >>> 8, E[i] = _ << 16 | _ >>> 16, A[i] = _ << 8 | _ >>> 24, B[i] = _, s ? (s = r ^ e[e[e[a ^ r]]], n ^= e[e[n]]) : s = n = 1;
            }
        }();
        var S = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        var D = _["AES"] = g["extend"]({
            "$_BEDW": function () {
                if (!this["$_BFCB"] || this["$_BFDz"] !== this["$_BECE"]) {
                    for (var e = this["$_BFDz"] = this["$_BECE"], t = e["words"], s = e["sigBytes"] / 4, n = 4 * (1 + (this["$_BFCB"] = 6 + s)), i = this["$_BFER"] = [], r = 0; r < n; r++) if (r < s) i[r] = t[r]; else {
                        var o = i[r - 1];
                        r % s ? 6 < s && r % s == 4 && (o = b[o >>> 24] << 24 | b[o >>> 16 & 255] << 16 | b[o >>> 8 & 255] << 8 | b[255 & o]) : (o = b[(o = o << 8 | o >>> 24) >>> 24] << 24 | b[o >>> 16 & 255] << 16 | b[o >>> 8 & 255] << 8 | b[255 & o], o ^= S[r / s | 0] << 24), i[r] = i[r - s] ^ o;
                    }
                    for (var a = this["$_BFFa"] = [], _ = 0; _ < n; _++) {
                        r = n - _;
                        if (_ % 4) o = i[r]; else o = i[r - 4];
                        a[_] = _ < 4 || r <= 4 ? o : C[b[o >>> 24]] ^ E[b[o >>> 16 & 255]] ^ A[b[o >>> 8 & 255]] ^ B[b[255 & o]];
                    }
                }
            },
            "encryptBlock": function (e, t) {
                this["$_BFGK"](e, t, this["$_BFER"], y, x, k, T, b);
            },
            "$_BFGK": function (e, t, s, n, i, r, o, a) {
                for (var _ = this["$_BFCB"], u = e[t] ^ s[0], c = e[t + 1] ^ s[1], h = e[t + 2] ^ s[2], p = e[t + 3] ^ s[3], l = 4, f = 1; f < _; f++) {
                    var d = n[u >>> 24] ^ i[c >>> 16 & 255] ^ r[h >>> 8 & 255] ^ o[255 & p] ^ s[l++];
                    var g = n[c >>> 24] ^ i[h >>> 16 & 255] ^ r[p >>> 8 & 255] ^ o[255 & u] ^ s[l++];
                    var m = n[h >>> 24] ^ i[p >>> 16 & 255] ^ r[u >>> 8 & 255] ^ o[255 & c] ^ s[l++];
                    var v = n[p >>> 24] ^ i[u >>> 16 & 255] ^ r[c >>> 8 & 255] ^ o[255 & h] ^ s[l++];
                    u = d, c = g, h = m, p = v;
                }
                d = (a[u >>> 24] << 24 | a[c >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & p]) ^ s[l++], g = (a[c >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[p >>> 8 & 255] << 8 | a[255 & u]) ^ s[l++], m = (a[h >>> 24] << 24 | a[p >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & c]) ^ s[l++], v = (a[p >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[c >>> 8 & 255] << 8 | a[255 & h]) ^ s[l++];
                e[t] = d, e[t + 1] = g, e[t + 2] = m, e[t + 3] = v;
            },
            "keySize": 8
        });
        return t["AES"] = g["$_BEGp"](D), t["AES"];
    }();
    window.aes = n;
}

aes()

;

function rsa() {
    var i = function () {
        function s() {
            this["i"] = 0, this["j"] = 0, this["S"] = [];
        }

        s["prototype"]["init"] = function C(e) {
            var t;
            var s;
            var n;
            for (t = 0; t < 256; ++t) this["S"][t] = t;
            for (t = s = 0; t < 256; ++t) s = s + this["S"][t] + e[t % e["length"]] & 255, n = this["S"][t], this["S"][t] = this["S"][s], this["S"][s] = n;
            this["i"] = 0, this["j"] = 0;
        }, s["prototype"]["next"] = function E() {
            var e;
            return this["i"] = this["i"] + 1 & 255, this["j"] = this["j"] + this["S"][this["i"]] & 255, e = this["S"][this["i"]], this["S"][this["i"]] = this["S"][this["j"]], this["S"][this["j"]] = e, this["S"][e + this["S"][this["i"]] & 255];
        };
        var n;
        var i;
        var r;
        var t;
        var o = 256;
        if (null == i) {
            var a;
            if (i = [], r = 0, window["crypto"] && window["crypto"]["getRandomValues"]) {
                var _ = new Uint32Array(256);
                for (window["crypto"]["getRandomValues"](_), a = 0; a < _["length"]; ++a) i[r++] = 255 & _[a];
            }
            var u = 0;
            var c = function c(t) {
                if (256 <= (u = u || 0) || o <= r) window["removeEventListener"] ? (u = 0, window["removeEventListener"]("mousemove", c, !1)) : window["detachEvent"] && (u = 0, window["detachEvent"]("onmousemove", c)); else try {
                    var s = t["x"] + t["y"];
                    i[r++] = 255 & s, u += 1;
                } catch (e) {
                }
            };
            window["addEventListener"] ? window["addEventListener"]("mousemove", c, !1) : window["attachEvent"] && window["attachEvent"]("onmousemove", c);
        }

        function h() {
            if (null == n) {
                n = function t() {
                    return new s();
                }();
                while (r < o) {
                    var e = Math["floor"](65536 * Math["random"]());
                    i[r++] = 255 & e;
                }
                for (n["init"](i), r = 0; r < i["length"]; ++r) i[r] = 0;
                r = 0;
            }
            return n["next"]();
        }

        function p() {
        }

        p["prototype"]["nextBytes"] = function A(e) {
            var t;
            for (t = 0; t < e["length"]; ++t) e[t] = h();
        };

        function b(e, t, s) {
            null != e && ("number" == typeof e ? this["fromNumber"](e, t, s) : null == t && "string" != typeof e ? this["fromString"](e, 256) : this["fromString"](e, t));
        }

        function w() {
            return new b(null);
        }

        t = "Microsoft Internet Explorer" == navigator["appName"] ? (b["prototype"]["am"] = function B(e, t, s, n, i, r) {
            var o = 32767 & t;
            var a = t >> 15;
            while (0 <= --r) {
                var _ = 32767 & this[e];
                var u = this[e++] >> 15;
                var c = a * _ + u * o;
                i = ((_ = o * _ + ((32767 & c) << 15) + s[n] + (1073741823 & i)) >>> 30) + (c >>> 15) + a * u + (i >>> 30), s[n++] = 1073741823 & _;
            }
            return i;
        }, 30) : "Netscape" != navigator["appName"] ? (b["prototype"]["am"] = function S(e, t, s, n, i, r) {
            while (0 <= --r) {
                var o = t * this[e++] + s[n] + i;
                i = Math["floor"](o / 67108864), s[n++] = 67108863 & o;
            }
            return i;
        }, 26) : (b["prototype"]["am"] = function D(e, t, s, n, i, r) {
            var o = 16383 & t;
            var a = t >> 14;
            while (0 <= --r) {
                var _ = 16383 & this[e];
                var u = this[e++] >> 14;
                var c = a * _ + u * o;
                i = ((_ = o * _ + ((16383 & c) << 14) + s[n] + i) >> 28) + (c >> 14) + a * u, s[n++] = 268435455 & _;
            }
            return i;
        }, 28), b["prototype"]["DB"] = t, b["prototype"]["DM"] = (1 << t) - 1, b["prototype"]["DV"] = 1 << t;
        b["prototype"]["FV"] = Math["pow"](2, 52), b["prototype"]["F1"] = 52 - t, b["prototype"]["F2"] = 2 * t - 52;
        var l;
        var f;
        var d = "0123456789abcdefghijklmnopqrstuvwxyz";
        var g = [];
        for (l = "0"["charCodeAt"](0), f = 0; f <= 9; ++f) g[l++] = f;
        for (l = "a"["charCodeAt"](0), f = 10; f < 36; ++f) g[l++] = f;
        for (l = "A"["charCodeAt"](0), f = 10; f < 36; ++f) g[l++] = f;

        function m(e) {
            return d["charAt"](e);
        }

        function v(e) {
            var t = w();
            return t["fromInt"](e), t;
        }

        function y(e) {
            var t;
            var s = 1;
            return 0 != (t = e >>> 16) && (e = t, s += 16), 0 != (t = e >> 8) && (e = t, s += 8), 0 != (t = e >> 4) && (e = t, s += 4), 0 != (t = e >> 2) && (e = t, s += 2), 0 != (t = e >> 1) && (e = t, s += 1), s;
        }

        function x(e) {
            this["m"] = e;
        }

        function k(e) {
            this["m"] = e, this["mp"] = e["invDigit"](), this["mpl"] = 32767 & this["mp"], this["mph"] = this["mp"] >> 15, this["um"] = (1 << e["DB"] - 15) - 1, this["mt2"] = 2 * e["t"];
        }

        function T() {
            this["n"] = null, this["e"] = 0, this["d"] = null, this["p"] = null, this["q"] = null, this["dmp1"] = null, this["dmq1"] = null, this["coeff"] = null;
            this["setPublic"]("00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81", "10001");
        }

        return x["prototype"]["convert"] = function z(e) {
            return e["s"] < 0 || 0 <= e["compareTo"](this["m"]) ? e["mod"](this["m"]) : e;
        }, x["prototype"]["revert"] = function F(e) {
            return e;
        }, x["prototype"]["reduce"] = function M(e) {
            e["divRemTo"](this["m"], null, e);
        }, x["prototype"]["mulTo"] = function O(e, t, s) {
            e["multiplyTo"](t, s), this["reduce"](s);
        }, x["prototype"]["sqrTo"] = function R(e, t) {
            e["squareTo"](t), this["reduce"](t);
        }, k["prototype"]["convert"] = function I(e) {
            var t = w();
            return e["abs"]()["dlShiftTo"](this["m"]["t"], t), t["divRemTo"](this["m"], null, t), e["s"] < 0 && 0 < t["compareTo"](b["ZERO"]) && this["m"]["subTo"](t, t), t;
        }, k["prototype"]["revert"] = function P(e) {
            var t = w();
            return e["copyTo"](t), this["reduce"](t), t;
        }, k["prototype"]["reduce"] = function j(e) {
            while (e["t"] <= this["mt2"]) e[e["t"]++] = 0;
            for (var t = 0; t < this["m"]["t"]; ++t) {
                var s = 32767 & e[t];
                var n = s * this["mpl"] + ((s * this["mph"] + (e[t] >> 15) * this["mpl"] & this["um"]) << 15) & e["DM"];
                e[s = t + this["m"]["t"]] += this["m"]["am"](0, n, e, t, 0, this["m"]["t"]);
                while (e[s] >= e["DV"]) e[s] -= e["DV"], e[++s]++;
            }
            e["clamp"](), e["drShiftTo"](this["m"]["t"], e), 0 <= e["compareTo"](this["m"]) && e["subTo"](this["m"], e);
        }, k["prototype"]["mulTo"] = function N(e, t, s) {
            e["multiplyTo"](t, s), this["reduce"](s);
        }, k["prototype"]["sqrTo"] = function q(e, t) {
            e["squareTo"](t), this["reduce"](t);
        }, b["prototype"]["copyTo"] = function L(e) {
            for (var t = this["t"] - 1; 0 <= t; --t) e[t] = this[t];
            e["t"] = this["t"], e["s"] = this["s"];
        }, b["prototype"]["fromInt"] = function H(e) {
            this["t"] = 1, this["s"] = e < 0 ? -1 : 0, 0 < e ? this[0] = e : e < -1 ? this[0] = e + this["DV"] : this["t"] = 0;
        }, b["prototype"]["fromString"] = function $(e, t) {
            var s;
            if (16 == t) s = 4; else if (8 == t) s = 3; else if (256 == t) s = 8; else if (2 == t) s = 1; else if (32 == t) s = 5; else {
                if (4 != t) return void this["fromRadix"](e, t);
                s = 2;
            }
            this["t"] = 0, this["s"] = 0;
            var n;
            var i;
            var r = e["length"];
            var o = !1;
            var a = 0;
            while (0 <= --r) {
                var _ = 8 == s ? 255 & e[r] : (n = r, null == (i = g[e["charCodeAt"](n)]) ? -1 : i);
                _ < 0 ? "-" == e["charAt"](r) && (o = !0) : (o = !1, 0 == a ? this[this["t"]++] = _ : a + s > this["DB"] ? (this[this["t"] - 1] |= (_ & (1 << this["DB"] - a) - 1) << a, this[this["t"]++] = _ >> this["DB"] - a) : this[this["t"] - 1] |= _ << a, (a += s) >= this["DB"] && (a -= this["DB"]));
            }
            8 == s && 0 != (128 & e[0]) && (this["s"] = -1, 0 < a && (this[this["t"] - 1] |= (1 << this["DB"] - a) - 1 << a)), this["clamp"](), o && b["ZERO"]["subTo"](this, this);
        }, b["prototype"]["clamp"] = function V() {
            var e = this["s"] & this["DM"];
            while (0 < this["t"] && this[this["t"] - 1] == e) --this["t"];
        }, b["prototype"]["dlShiftTo"] = function U(e, t) {
            var s;
            for (s = this["t"] - 1; 0 <= s; --s) t[s + e] = this[s];
            for (s = e - 1; 0 <= s; --s) t[s] = 0;
            t["t"] = this["t"] + e, t["s"] = this["s"];
        }, b["prototype"]["drShiftTo"] = function X(e, t) {
            for (var s = e; s < this["t"]; ++s) t[s - e] = this[s];
            t["t"] = Math["max"](this["t"] - e, 0), t["s"] = this["s"];
        }, b["prototype"]["lShiftTo"] = function G(e, t) {
            var s;
            var n = e % this["DB"];
            var i = this["DB"] - n;
            var r = (1 << i) - 1;
            var o = Math["floor"](e / this["DB"]);
            var a = this["s"] << n & this["DM"];
            for (s = this["t"] - 1; 0 <= s; --s) t[s + o + 1] = this[s] >> i | a, a = (this[s] & r) << n;
            for (s = o - 1; 0 <= s; --s) t[s] = 0;
            t[o] = a, t["t"] = this["t"] + o + 1, t["s"] = this["s"], t["clamp"]();
        }, b["prototype"]["rShiftTo"] = function W(e, t) {
            t["s"] = this["s"];
            var s = Math["floor"](e / this["DB"]);
            if (s >= this["t"]) t["t"] = 0; else {
                var n = e % this["DB"];
                var i = this["DB"] - n;
                var r = (1 << n) - 1;
                t[0] = this[s] >> n;
                for (var o = s + 1; o < this["t"]; ++o) t[o - s - 1] |= (this[o] & r) << i, t[o - s] = this[o] >> n;
                0 < n && (t[this["t"] - s - 1] |= (this["s"] & r) << i), t["t"] = this["t"] - s, t["clamp"]();
            }
        }, b["prototype"]["subTo"] = function Z(e, t) {
            var s = 0;
            var n = 0;
            var i = Math["min"](e["t"], this["t"]);
            while (s < i) n += this[s] - e[s], t[s++] = n & this["DM"], n >>= this["DB"];
            if (e["t"] < this["t"]) {
                n -= e["s"];
                while (s < this["t"]) n += this[s], t[s++] = n & this["DM"], n >>= this["DB"];
                n += this["s"];
            } else {
                n += this["s"];
                while (s < e["t"]) n -= e[s], t[s++] = n & this["DM"], n >>= this["DB"];
                n -= e["s"];
            }
            t["s"] = n < 0 ? -1 : 0, n < -1 ? t[s++] = this["DV"] + n : 0 < n && (t[s++] = n), t["t"] = s, t["clamp"]();
        }, b["prototype"]["multiplyTo"] = function Y(e, t) {
            var s = this["abs"]();
            var n = e["abs"]();
            var i = s["t"];
            t["t"] = i + n["t"];
            while (0 <= --i) t[i] = 0;
            for (i = 0; i < n["t"]; ++i) t[i + s["t"]] = s["am"](0, n[i], t, i, 0, s["t"]);
            t["s"] = 0, t["clamp"](), this["s"] != e["s"] && b["ZERO"]["subTo"](t, t);
        }, b["prototype"]["squareTo"] = function K(e) {
            var t = this["abs"]();
            var s = e["t"] = 2 * t["t"];
            while (0 <= --s) e[s] = 0;
            for (s = 0; s < t["t"] - 1; ++s) {
                var n = t["am"](s, t[s], e, 2 * s, 0, 1);
                (e[s + t["t"]] += t["am"](s + 1, 2 * t[s], e, 2 * s + 1, n, t["t"] - s - 1)) >= t["DV"] && (e[s + t["t"]] -= t["DV"], e[s + t["t"] + 1] = 1);
            }
            0 < e["t"] && (e[e["t"] - 1] += t["am"](s, t[s], e, 2 * s, 0, 1)), e["s"] = 0, e["clamp"]();
        }, b["prototype"]["divRemTo"] = function Q(e, t, s) {
            var n = e["abs"]();
            if (!(n["t"] <= 0)) {
                var i = this["abs"]();
                if (i["t"] < n["t"]) return null != t && t["fromInt"](0), void (null != s && this["copyTo"](s));
                null == s && (s = w());
                var r = w();
                var o = this["s"];
                var a = e["s"];
                var _ = this["DB"] - y(n[n["t"] - 1]);
                0 < _ ? (n["lShiftTo"](_, r), i["lShiftTo"](_, s)) : (n["copyTo"](r), i["copyTo"](s));
                var u = r["t"];
                var c = r[u - 1];
                if (0 != c) {
                    var h = c * (1 << this["F1"]) + (1 < u ? r[u - 2] >> this["F2"] : 0);
                    var p = this["FV"] / h;
                    var l = (1 << this["F1"]) / h;
                    var f = 1 << this["F2"];
                    var d = s["t"];
                    var g = d - u;
                    var m = null == t ? w() : t;
                    r["dlShiftTo"](g, m), 0 <= s["compareTo"](m) && (s[s["t"]++] = 1, s["subTo"](m, s)), b["ONE"]["dlShiftTo"](u, m), m["subTo"](r, r);
                    while (r["t"] < u) r[r["t"]++] = 0;
                    while (0 <= --g) {
                        var v = s[--d] == c ? this["DM"] : Math["floor"](s[d] * p + (s[d - 1] + f) * l);
                        if ((s[d] += r["am"](0, v, s, g, 0, u)) < v) {
                            r["dlShiftTo"](g, m), s["subTo"](m, s);
                            while (s[d] < --v) s["subTo"](m, s);
                        }
                    }
                    null != t && (s["drShiftTo"](u, t), o != a && b["ZERO"]["subTo"](t, t)), s["t"] = u, s["clamp"](), 0 < _ && s["rShiftTo"](_, s), o < 0 && b["ZERO"]["subTo"](s, s);
                }
            }
        }, b["prototype"]["invDigit"] = function J() {
            if (this["t"] < 1) return 0;
            var e = this[0];
            if (0 == (1 & e)) return 0;
            var t = 3 & e;
            return 0 < (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this["DV"]) % this["DV"]) ? this["DV"] - t : -t;
        }, b["prototype"]["isEven"] = function ee() {
            return 0 == (0 < this["t"] ? 1 & this[0] : this["s"]);
        }, b["prototype"]["exp"] = function te(e, t) {
            if (4294967295 < e || e < 1) return b["ONE"];
            var s = w();
            var n = w();
            var i = t["convert"](this);
            var r = y(e) - 1;
            i["copyTo"](s);
            while (0 <= --r) if (t["sqrTo"](s, n), 0 < (e & 1 << r)) t["mulTo"](n, i, s); else {
                var o = s;
                s = n, n = o;
            }
            return t["revert"](s);
        }, b["prototype"]["toString"] = function se(e) {
            if (this["s"] < 0) return "-" + this["negate"]()["toString"](e);
            var t;
            if (16 == e) t = 4; else if (8 == e) t = 3; else if (2 == e) t = 1; else if (32 == e) t = 5; else {
                if (4 != e) return this["toRadix"](e);
                t = 2;
            }
            var s;
            var n = (1 << t) - 1;
            var i = !1;
            var r = "";
            var o = this["t"];
            var a = this["DB"] - o * this["DB"] % t;
            if (0 < o--) {
                a < this["DB"] && 0 < (s = this[o] >> a) && (i = !0, r = m(s));
                while (0 <= o) a < t ? (s = (this[o] & (1 << a) - 1) << t - a, s |= this[--o] >> (a += this["DB"] - t)) : (s = this[o] >> (a -= t) & n, a <= 0 && (a += this["DB"], --o)), 0 < s && (i = !0), i && (r += m(s));
            }
            return i ? r : "0";
        }, b["prototype"]["negate"] = function ne() {
            var e = w();
            return b["ZERO"]["subTo"](this, e), e;
        }, b["prototype"]["abs"] = function ie() {
            return this["s"] < 0 ? this["negate"]() : this;
        }, b["prototype"]["compareTo"] = function re(e) {
            var t = this["s"] - e["s"];
            if (0 != t) return t;
            var s = this["t"];
            if (0 != (t = s - e["t"])) return this["s"] < 0 ? -t : t;
            while (0 <= --s) if (0 != (t = this[s] - e[s])) return t;
            return 0;
        }, b["prototype"]["bitLength"] = function oe() {
            return this["t"] <= 0 ? 0 : this["DB"] * (this["t"] - 1) + y(this[this["t"] - 1] ^ this["s"] & this["DM"]);
        }, b["prototype"]["mod"] = function ae(e) {
            var t = w();
            return this["abs"]()["divRemTo"](e, null, t), this["s"] < 0 && 0 < t["compareTo"](b["ZERO"]) && e["subTo"](t, t), t;
        }, b["prototype"]["modPowInt"] = function $_CEd(e, t) {
            var s;
            return s = e < 256 || t["isEven"]() ? new x(t) : new k(t), this["exp"](e, s);
        }, b["ZERO"] = v(0), b["ONE"] = v(1), T["prototype"]["doPublic"] = function ue(e) {
            return e["modPowInt"](this["e"], this["n"]);
        }, T["prototype"]["setPublic"] = function ce(e, t) {
            null != e && null != t && 0 < e["length"] && 0 < t["length"] ? (this["n"] = function s(e, t) {
                return new b(e, t);
            }(e, 16), this["e"] = parseInt(t, 16)) : console && console["error"] && console["error"]("Invalid RSA public key");
        }, T["prototype"]["encrypt"] = function he(e) {
            var t = function a(e, t) {
                if (t < e["length"] + 11) return console && console["error"] && console["error"]("Message too long for RSA"), null;
                var s = [];
                var n = e["length"] - 1;
                while (0 <= n && 0 < t) {
                    var i = e["charCodeAt"](n--);
                    i < 128 ? s[--t] = i : 127 < i && i < 2048 ? (s[--t] = 63 & i | 128, s[--t] = i >> 6 | 192) : (s[--t] = 63 & i | 128, s[--t] = i >> 6 & 63 | 128, s[--t] = i >> 12 | 224);
                }
                s[--t] = 0;
                var r = new p();
                var o = [];
                while (2 < t) {
                    o[0] = 0;
                    while (0 == o[0]) r["nextBytes"](o);
                    s[--t] = o[0];
                }
                return s[--t] = 2, s[--t] = 0, new b(s);
            }(e, this["n"]["bitLength"]() + 7 >> 3);
            if (null == t) return null;
            var s = this["doPublic"](t);
            if (null == s) return null;
            var n = s["toString"](16);
            return 0 == (1 & n["length"]) ? n : "0" + n;
        }, T;
    }();
    window.rsa = i;
};
rsa()

function arrayToHex(e) {
    for (var t = [], s = 0, n = 0; n < 2 * e["length"]; n += 2) t[n >>> 3] |= parseInt(e[s], 10) << 24 - n % 8 * 4, s++;
    for (var i = [], r = 0; r < e["length"]; r++) {
        var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
        i["push"]((o >>> 4)["toString"](16)), i["push"]((15 & o)["toString"](16));
    }
    return i["join"]("");
}
;

function i(e) {
    var n = guid_;
    a = '1'
    var r = {
        "1": {
            "symmetrical": window.aes,
            "asymmetric": new window.rsa()
        }
    };
    var _ = r[a]["asymmetric"]["encrypt"](n);
    while (true && (!_ || 256 !== _["length"])) n = guid_, _ = new window.rsa()["encrypt"](n);
    var u = r[a]["symmetrical"]["encrypt"](e, n);
    return (0, arrayToHex)(u) + _;
}

function pow_msg(datetime, captcha_id, lot_number) {
    return "1" + "|" + 13 + "|" + "sha1" + "|" + datetime + "|" + captcha_id + "|" + lot_number + "|" + "" + "|" + guid;
}

function get_w(setLeft, lot_number, datetime, captcha_id) {
    var params = {
        "setLeft": setLeft,
        "passtime": Math.floor(Math.random() * (3200 - 1800 + 1)) + 1800,  //通过时间,
        "userresponse": setLeft / 1.0059466666666665 + 2,
        "device_id": "",
        "lot_number": lot_number,
        "pow_msg": pow_msg(datetime, captcha_id, lot_number),
        "pow_sign": MD5(pow_msg(datetime, captcha_id, lot_number)).toString(), //MD5,
        "geetest": "captcha",
        "lang": "zh",
        "ep": "123",
        "biht": "1426265548",
        "vmYI": "Msta",
        "em": {
            "ph": 0,
            "cp": 0,
            "ek": "11",
            "wd": 1,
            "nt": 0,
            "si": 0,
            "sc": 0
        }
    }
    www = i(JSON.stringify(params))
    console.log(www)
    return www
}


