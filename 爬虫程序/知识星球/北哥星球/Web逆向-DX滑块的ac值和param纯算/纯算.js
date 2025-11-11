var version = "s_v3";

function random_(r, t) {
    return r + Math["floor"](Math["random"]() * (t - r + 1));
}

function getBrowserAndVersion() {
    var o = "0",
        i = 0,
        a = [[15, new RegExp("(?:SogouMSE|SogouMobileBrowser)\\/([\\d.]+)", "i")], [6, new RegExp("qqbrowser\\/([\\d.]+)", "i")], [7, new RegExp("edge?\\/([\\d.]+)", "i")], [8, new RegExp("360se", "i")], [9, new RegExp(g("ee063"), "i")], [13, new RegExp("micromessenger\\/([\\d.]+)", "i")], [11, new RegExp(g(")+].d\\[(/\\resworboat"), g("i"))], [12, new RegExp("(?:ba?idubrowser|baiduhd)[/ ]?([\\d.x]+)", "i")], [14, new RegExp("miuibrowser\\/([\\d.]+)", "i")], [2, new RegExp("(?:MSIE |Trident\\/.*; rv:)(\\d+)")], [5, new RegExp("opr\\/([\\d.]+)", "i")], [10, new RegExp("uc?browser\\/([\\d.]+)", "i")], [10, new RegExp("uc\\/([\\d.]+)", "i")], [1, new RegExp("chrome\\/([\\d.]+)", "i")], [4, new RegExp("version\\/([\\d.]+).*safari", "i")], [3, new RegExp("firefox\\/([\\d.]+)", "i")]];
    l["each"](a, function (e) {
        var t = p["match"](e[1]);
        if (t) {
            i = e[0];
            o = t[1] || "0";
            return false;
        }
    });
    o = o["split"](".")[0];
    return [i, "0"];
};

function Promise(t) {
    if (!(this instanceof q)) {
        return new q(t);
    }
    this["_state"] = K;
    this["_onFulfilled"] = [];
    this["_onRejected"] = [];
    this["_value"] = null;
    this["_reason"] = null;
    X[U("noitcnuFsi")](t) && t(Q(this["resolve"], this), Q(this["reject"], this));
};

function getScreenInfo() {
    return g["map"](p, function (e) {
        return l["bs2"](e() || 0);
    });
};

function toCodeArray(t) {
    t += O("");
    for (var i = [], a = t["length"], c = 0; c < a; c++) {
        i["push"](t["charCodeAt"](c));
    }
    return i;
};

function btoa_(t) {
    let v = "XmYj3u1PnvisIZUF8ThR/a6DfO+kW4JHrCELycAzSxleoQp02MtwV9Nd57qGgbKB=";
    if (!t) {
        return "";
    }
    for (var g, l, j, p, m, C, w, b = "", A = 0; A < t["length"];) {
        g = t["charCodeAt"](A++);
        l = t["charCodeAt"](A++);
        j = t["charCodeAt"](A++);
        p = g >> 2;
        m = (g & 3) << 4 | l >> 4;
        C = (l & 15) << 2 | j >> 6;
        w = j & 63;
        isNaN(l) ? C = w = 64 : isNaN(j) && (w = 64);
        b = b + v["charAt"](p) + v["charAt"](m) + v["charAt"](C) + v["charAt"](w);
    }
    return b;
};

function v(t, o, i) {
    return t >> o & Math["pow"](2, (typeof i == "undefined" ? 1 : i) * 8) - 1;
}

function f(e) {
    return [v(e, 8), v(e, 0)];
}

function s(r) {
    return f(v(r, 16, 2))["concat"](f(v(r, 0, 2)));
}

function bs8(t) {
    var g = Math["floor"](t / Math["pow"](2, 32)),
        l = t - g * Math["pow"](2, 32);
    return s(g)["concat"](s(l));
};

function bs2(e) {
    return [v(e, 8), v(e, 0)];
}

function U(t, o, i) {
    if (t) {
        var a = 0,
            c = t["length"];
        if (c === +c) {
            for (; a < c && o["call"](i, t[a], a, t) !== false; a++) {
            }
        } else {
            for (a in t) {
                if (t["hasOwnProperty"](a) && o["call"](i, t[a], a, t) === false) {
                    break;
                }
            }
        }
    }
}

function flatten(t) {
    var o = [];
    U(t, function (t) {
        if (typeof t === "undefined") {
            return;
        }
        Array["isArray"](t) ? o = o["concat"](t) : o["push"](t);
    });
    return o;
};

function toStr(e) {
    return String["fromCharCode"]["apply"](String, e);
};

function process(t) {
    var o = []["slice"]["call"](arguments);
    t = o["length"] === 1 && Array["isArray"](t) ? t : o;
    t = flatten(t);
    return toStr(t);
};

function encrypt_jrk7m86fvtabp7zcnwue(t) {
    for (var i = "", a = 4, c = 15273, u = 0; u < t["length"]; u++) {
        var f = t["charCodeAt"](u),
            s = (f >> a) + (f << 8 - a) + c & 255;
        i += String["fromCharCode"](s);
    }
    return i;
};

function b98ft7st0842150jodul_tpyrcne(t) {
    for (var o = "", i = 821, a = 4, c = 7, u = i, f = 0; f < t["length"]; f++) {
        u = ((u << a ^ u) & 240) + (u >> c);
        o += String["fromCharCode"]((t["charCodeAt"](f) ^ u) & 255);
    }
    return o;
};

function hnnzhv47cjpc4mrec4r4_tpyrcne(t) {
    for (var o = "", i = 312, a = 2, c = 5, u = i, f = 0; f < t["length"]; f++) {
        u = ((u << a ^ u) & 240) + (u >> c);
        o += String["fromCharCode"]((t["charCodeAt"](f) ^ u) & 255);
    }
    return o;
};

function encrypt_mm8fyhuehlp6qgks4lni(t) {
    for (var o = "", i = 34313, a = 0; a < t["length"]; a++) {
        var c = t["charCodeAt"](a) ^ i;
        i = c;
        o += String["fromCharCode"](c & 255);
    }
    return o;
};


function encrypt_fqe9088f8le6wmwaqvfn(t) {
    for (var o = "", i = 6, a = 3, c = 0; c < t["length"]; c++) {
        var u = t["charCodeAt"](c) - i & 255,
            f = a,
            s = u >> f,
            v = u << 8 - f,
            h = s + v & 255;
        o += String["fromCharCode"](h);
    }
    return o;
};

function encrypt_vmh0hi6mi3rzm89i85kk(t) {
    for (var a = U1(""), c = "VxMpoN86g7lA", u = 32, f = 0; f < t["length"]; f++) {
        var s = t["charCodeAt"](f);
        u = (u + 3) % c["length"];
        s ^= c["charCodeAt"](u);
        a += String["fromCharCode"](s & 255);
    }
    return a;
};

function encrypt_w1lr1z2oelnk34gx9c3r(t) {
    for (var o = "", i = 2422, a = 0; a < t["length"]; a++) {
        var c = t["charCodeAt"](a) ^ i;
        (i += 2) >= 2147483647 && (i = 2372);
        o += String["fromCharCode"](c & 255);
    }
    return o;
};

function encrypt_6yioqc6nzuwge5qbo8v5(t) {
    for (var o = "", i = 43221, a = 24671, c = i, u = 0; u < t["length"]; u++) {
        var f = t["charCodeAt"](u) ^ c;
        c = c * u % 256 + a;
        o += String[U1("edoCrahCmorf")](f & 255);
    }
    return o;
};

function encrypt_m2866nh30vws6vgbwwoe(t) {
    for (var a = U1(""), c = 33265, u = 0; u < t["length"]; u++) {
        var f = (t["charCodeAt"](u) ^ c) & 255;
        a += String["fromCharCode"](f);
        c = f;
    }
    return a;
};

function encrypt_4izgi02yf9aj3zja5vpv(t) {
    for (var c = "", u = U1("KgN7f6b4rB6C"), f = 44, s = 0; s < t["length"]; s++) {
        var v = t["charCodeAt"](s);
        f = (f + 4) % u["length"];
        v ^= u["charCodeAt"](f);
        c += String["fromCharCode"](v & 255);
    }
    return c;
};

function U1(e) {
    return e.split("").reverse().join("");
}

function encrypt_21wpc2mwfyi2t86t19qs(t) {
    for (var o = "", i = 156, a = 6, c = 4, u = i, f = 0; f < t["length"]; f++) {
        u = ((u << a ^ u) & 240) + (u >> c);
        o += String["fromCharCode"]((t[U1("tAedoCrahc")](f) ^ u) & 255);
    }
    return o;
};


function app(t, o) {
    var f = toStr([t]["concat"](bs2(o["length"])));
    this["_ua"] += [f, o]["join"]("");
    this["ua"] = [version, "#", btoa_(this["_ua"])]["join"]("");
    this["option"]["form"] && this["syncToForm"](this["ua"]);
};

function bss(n) {
    var t = [];
    if (!n) {
        return t;
    }
    for (var o = 0; o < n["length"]; o++) {
        t["push"](n["charCodeAt"](o));
    }
    return t;
};




/**
 * 生成滑块验证码轨迹
 * @param {number} distance - 滑动距离 (X轴)
 * @param {Object} options - 配置选项
 * @returns {Array} 轨迹点数组
 */
function generateSliderTrajectoryByDistance(distance, options = {}) {
    const {
        startY = 336, // 默认起始Y坐标，根据用户提供的示例数据
        endY = 341,   // 默认结束Y坐标，根据用户提供的示例数据
        duration = 2847, // 默认持续时间
        humanize = true,
        difficulty = 'normal' // easy, normal, hard
    } = options;

    const startX = 1574; // 默认起始X坐标，根据用户提供的示例数据
    const endX = startX + distance; // 结束X坐标由起始X和距离决定

    const trajectory = [];
    const startTime = Date.now() +random_(10000,20000);

    // 根据难度调整参数
    const difficultySettings = {
        easy: { jitter: 0.5, timeVariation: 5, curveComplexity: 0.1 },
        normal: { jitter: 1.0, timeVariation: 10, curveComplexity: 0.2 },
        hard: { jitter: 1.5, timeVariation: 15, curveComplexity: 0.3 }
    };

    const settings = difficultySettings[difficulty] || difficultySettings.normal;

    // 计算轨迹点数量
    const totalDistance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const pointCount = Math.max(25, Math.min(70, Math.floor(totalDistance / 4)));

    // 生成控制点用于贝塞尔曲线
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    const cp1X = startX + (midX - startX) * 0.5 + (Math.random() - 0.5) * 30 * settings.curveComplexity;
    const cp1Y = startY + (Math.random() - 0.5) * 15;
    const cp2X = midX + (endX - midX) * 0.5 + (Math.random() - 0.5) * 25 * settings.curveComplexity;
    const cp2Y = endY + (Math.random() - 0.5) * 12;

    let currentTime = startTime;

    for (let i = 0; i <= pointCount; i++) {
        const t = i / pointCount;

        // 贝塞尔曲线计算
        const x = Math.pow(1-t, 3) * startX +
                 3 * Math.pow(1-t, 2) * t * cp1X +
                 3 * (1-t) * Math.pow(t, 2) * cp2X +
                 Math.pow(t, 3) * endX;

        const y = Math.pow(1-t, 3) * startY +
                 3 * Math.pow(1-t, 2) * t * cp1Y +
                 3 * (1-t) * Math.pow(t, 2) * cp2Y +
                 Math.pow(t, 3) * endY;

        // 人性化处理
        if (humanize) {
            // 添加微抖动
            const jitterX = (Math.random() - 0.5) * settings.jitter;
            const jitterY = (Math.random() - 0.5) * settings.jitter;

            // 时间间隔变化
            const baseInterval = duration / pointCount;
            const timeVariation = (Math.random() - 0.5) * settings.timeVariation;
            currentTime += Math.max(1, baseInterval + timeVariation);

            trajectory.push({
                tm: Math.round(currentTime),
                getPageX: Math.round(x + jitterX),
                getPageY: Math.round(y + jitterY)
            });
        } else {
            currentTime += duration / pointCount;
            trajectory.push({
                tm: Math.round(currentTime),
                getPageX: Math.round(x),
                getPageY: Math.round(y)
            });
        }
    }

    return trajectory;
}









function get_ac(sid, move_x, move_y) {
    ///// 时间的加密
    let ua_obj = {
        "ua": "",
        "_ua": "",
        "_sa": [],
        "_ca": [],
        "tm": Date.now(),
        "counters": {
            "sa": 0,
            "mm": 0,
            "md": 0,
            "kd": 0,
            "fo": 0,
            "tc": 0,
            "tmv": 0,
            "mmInterval": 0,
            "tmvInterval": 0
        },
        "option": {
            "token": sid,
            "form": "",
            "inputName": "ua",
            "maxMDLog": 10,
            "maxMMLog": 20,
            "maxSALog": 250,
            "maxKDLog": 10,
            "maxFocusLog": 6,
            "maxTCLog": 10,
            "maxTMVLog": 20,
            "MMInterval": 50,
            "TMVInterval": 50
        }
    };
    let str1 = process(bs8(ua_obj['tm'])) // 时间的加密
    let code1 = encrypt_jrk7m86fvtabp7zcnwue(str1);
    app.apply(ua_obj, [1, code1]);  // 时间的加密

    ///// 固定值的加密
    let str2 = process(1, 1, bs2(1), bss("0"));
    let code2 = b98ft7st0842150jodul_tpyrcne(str2);
    app.apply(ua_obj, [2, code2]);  // 固定值的加密


    ///// 3.location.href,document.referrer 的加密
    let href = "https://www.hb56.com/Login.aspx?type=pw"
    let referrer = "https://www.hb56.com/Login.aspx"
    let str3 = process(bs2(href['length']), bss(href), bs2(referrer["length"]), bss(referrer));
    let code3 = hnnzhv47cjpc4mrec4r4_tpyrcne(str3);
    app.apply(ua_obj, [4, code3]);  // href,referrer的加密


    /////// 随机数的加密
    let a1 = [Promise, getBrowserAndVersion, getScreenInfo, toCodeArray];
    let a2 = random_(0, a1.length - 1);
    let a3 = "" + a1[a2]
    let a4 = random_(0, a3["length"] - 10);
    let a5 = random_(2, 10);
    // let str4 = process(bs2(a4), bs2(a5), bss(a3["substr"](f, s)));
    let str4 = '\x00\x04\x00\x04tion';
    let code4 = encrypt_mm8fyhuehlp6qgks4lni(str4);
    app.apply(ua_obj, [5, code4]);  // 随机数的加密


    /////  // self 是否等于top的加密 实际是 ===;
    let str5 = process(1); // self 是否等于top的加密 实际是 ===;
    let code5 = encrypt_21wpc2mwfyi2t86t19qs(str5);
    app.apply(ua_obj, [6, code5]);  // self 是否等于top的加密 实际是 ===;


    ///// 自动化检测的加密
    let a6 = parseInt(("00000000000000000000000000000000" + '000000')["substr"](-32), 2);
    let str6 = process(s(a6))
    let code6 = encrypt_fqe9088f8le6wmwaqvfn(str6)
    app.apply(ua_obj, [7, code6]);  // 自动化检测的加密


    ///// 固定版本号的加密
    let a7 = 1;
    let str7 = process(s(a7));
    let code7 = encrypt_vmh0hi6mi3rzm89i85kk(str7);
    app.apply(ua_obj, [8, code7]);  // 固定版本号的加密


    ///// sid的加密
    let a8 = ua_obj["option"]["token"];
    let lenEncoded = bs2(a8.length);
    let tEncoded = bss(a8);
    let str8 = process(lenEncoded, tEncoded);
    let code8 = encrypt_w1lr1z2oelnk34gx9c3r(str8);
    app.apply(ua_obj, [9, code8]);  // sid的加密


    ///// 浏览器宽高的加密
    // let str9 = process([[5,214],[3,166],[5,214],[3,118],[0,0],[0,0],[5,214],[2,253],[5,214],[3,118]]);
    let str9 = process([[7, 128], [4, 56], [7, 128], [4, 16], [0, 0], [0, 0], [7, 128], [3, 151], [7, 128], [4, 16]]);
    let code9 = encrypt_6yioqc6nzuwge5qbo8v5(str9);
    app.apply(ua_obj, [3, code9]);  // 浏览器宽高的加密

    ///// 滑动滑块的轨迹加密

    //     const trajectory_array = [
    //     {
    //         "tm": 30526,
    //         "getPageX": 1570,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30537,
    //         "getPageX": 1571,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30545,
    //         "getPageX": 1572,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30553,
    //         "getPageX": 1574,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30561,
    //         "getPageX": 1577,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30569,
    //         "getPageX": 1580,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30577,
    //         "getPageX": 1584,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30585,
    //         "getPageX": 1588,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30593,
    //         "getPageX": 1590,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30601,
    //         "getPageX": 1593,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30609,
    //         "getPageX": 1596,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30617,
    //         "getPageX": 1598,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30625,
    //         "getPageX": 1601,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30633,
    //         "getPageX": 1602,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30641,
    //         "getPageX": 1604,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30649,
    //         "getPageX": 1607,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30657,
    //         "getPageX": 1609,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30665,
    //         "getPageX": 1611,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30673,
    //         "getPageX": 1614,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30681,
    //         "getPageX": 1617,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30689,
    //         "getPageX": 1619,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30697,
    //         "getPageX": 1622,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30705,
    //         "getPageX": 1625,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30713,
    //         "getPageX": 1626,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30729,
    //         "getPageX": 1628,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30737,
    //         "getPageX": 1630,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30761,
    //         "getPageX": 1631,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30769,
    //         "getPageX": 1633,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30777,
    //         "getPageX": 1635,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30785,
    //         "getPageX": 1638,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30793,
    //         "getPageX": 1640,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30801,
    //         "getPageX": 1643,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30809,
    //         "getPageX": 1646,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30817,
    //         "getPageX": 1648,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30825,
    //         "getPageX": 1650,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30833,
    //         "getPageX": 1652,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30841,
    //         "getPageX": 1654,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30849,
    //         "getPageX": 1657,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30857,
    //         "getPageX": 1658,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30865,
    //         "getPageX": 1659,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30873,
    //         "getPageX": 1660,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30881,
    //         "getPageX": 1661,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30889,
    //         "getPageX": 1662,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30905,
    //         "getPageX": 1664,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30936,
    //         "getPageX": 1668,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30937,
    //         "getPageX": 1669,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 30945,
    //         "getPageX": 1671,
    //         "getPageY": 340
    //     },
    //     {
    //         "tm": 30953,
    //         "getPageX": 1673,
    //         "getPageY": 341
    //     },
    //     {
    //         "tm": 31225,
    //         "getPageX": 1674,
    //         "getPageY": 341
    //     },
    //     {
    //         "tm": 31233,
    //         "getPageX": 1675,
    //         "getPageY": 341
    //     },
    //     {
    //         "tm": 31249,
    //         "getPageX": 1676,
    //         "getPageY": 341
    //     },
    //     {
    //         "tm": 31257,
    //         "getPageX": 1678,
    //         "getPageY": 341
    //     },
    //     {
    //         "tm": 31321,
    //         "getPageX": 1679,
    //         "getPageY": 341
    //     },
    //     {
    //         "tm": 31359,
    //         "getPageX": 1680,
    //         "getPageY": 341
    //     },
    //     {
    //         "tm": 31433,
    //         "getPageX": 1681,
    //         "getPageY": 341
    //     },
    //     {
    //         "tm": 31441,
    //         "getPageX": 1682,
    //         "getPageY": 340
    //     },
    //     {
    //         "tm": 31761,
    //         "getPageX": 1683,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 31769,
    //         "getPageX": 1685,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 31777,
    //         "getPageX": 1686,
    //         "getPageY": 339
    //     },
    //     {
    //         "tm": 31785,
    //         "getPageX": 1687,
    //         "getPageY": 339
    //     }
    // ];


    const trajectory_array = generateSliderTrajectoryByDistance(move_x); // 生成轨迹
    for (var index = 0; index < trajectory_array.length; index++) {
        // let tm = trajectory_array[index]['tm'];
        let tm = trajectory_array[index]['tm'] - ua_obj['tm'];
        let getPageX = trajectory_array[index]['getPageX'];
        let getPageY = trajectory_array[index]['getPageY'];
        let d = process(s(tm), bs2(getPageX), bs2(getPageY));
        ua_obj["_sa"]["push"](encrypt_m2866nh30vws6vgbwwoe(d));
    }
    ua_obj["_sa"].forEach(function (value) {
        app.apply(ua_obj, [17, value]);  // 滑动滑块的轨迹加密
    });


    ///// 终点值的加密
    let t = {"x": move_x + 10, "y": move_y, "speed": 1, "dt": 1};
    let t1 = JSON.stringify(t);
    let str10 = process(bs2(t1["length"]), bss(t1));
    let code10 = encrypt_4izgi02yf9aj3zja5vpv(str10);
    app.apply(ua_obj, [10, code10]);  // 终点值的加密
    return ua_obj['ua']
}

// let sid = '3ae52a6b0e3c104e42b7f45e40f866d1'
// let xxx = 161
// let yyy = 61;
// ac = get_ac(sid, xxx, yyy);
// console.log(ac);
