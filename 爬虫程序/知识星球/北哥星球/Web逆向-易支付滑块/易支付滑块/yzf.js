require_ = require;
process_ = process;
delete global;
delete Buffer;
// delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
delete setImmediate;
delete clearImmediate;
delete SharedArrayBuffer;

dtavm = {}
dtavm.log = console.log
no_console = ['window', 'globalThis'];
function setProxyArr(proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        const handler = `{
      get: function(target, property, receiver) {
        if(no_console.includes(property)){
            return target[property];
        }
        dtavm.log("方法:", "get  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]);
        return target[property];
      },
      set: function(target, property, value, receiver) {
        dtavm.log("方法:", "set  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", value, ", 属性值类型：", typeof target[property]);
        return Reflect.set(...arguments);
      }
    }`;
        eval(`try {
            ${proxyObjArr[i]};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        } catch (e) {
            ${proxyObjArr[i]} = {};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        }`);
    }
}
Object.defineProperties(globalThis, {
    [Symbol.toStringTag]: {
        configurable: true,
        value: 'Window'
    }
});

!(function () {
    "use strict";
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
    const mytoString = function () {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };

    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        })
    };
    delete Function.prototype['toString'];
    set_native(Function.prototype, "toString", mytoString);
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");
    this.func_set_native = function (func) {
        set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, func.name || ''}() { [native code] }`)
    }
}).call(globalThis);

// 重写全局对象原型链
function setTostringAndstringTag(obj, dictValue) {
    Object.defineProperties(obj.prototype, {
        [Symbol.toStringTag]: {
            configurable: true,
            value: obj.name
        }
    });
    globalThis.func_set_native(obj);
};

// 创建标签原型
function createTagProto(propObj,portotypeObj) {
    let res = propObj + ' = ' + 'function ' + propObj + '() { throw new TypeError("Illegal constructor"); };\n';
    res += 'setTostringAndstringTag(' + propObj + ',null);\n';
    if (portotypeObj) {
        for (let key in portotypeObj) {
            res += propObj + '.prototype.' + portotypeObj[key] + '= function ' + portotypeObj[key] + '() {};\n';
            res += 'globalThis.func_set_native(' + propObj + '.prototype.' + portotypeObj[key] + ');\n';
        }
    }
    eval(res);
}

createTagProto('EventTarget',['addEventListener']);
createTagProto('WindowProperties');
createTagProto('Window');

window = globalThis;
window.__proto__ = Window.prototype;
window.__proto__.__proto__ = WindowProperties.prototype;
window.__proto__.__proto__.__proto__ = EventTarget.prototype;

Window.__proto__ = EventTarget;

Object.defineProperty(window, 'WindowProperties', {
    get: function () {
        return undefined;
    }
});
ActiveXObject = undefined;

TouchEvent = function TouchEvent() {
    dtavm.log('TouchEvent:::',arguments)
}
window.func_set_native(TouchEvent);

createTagProto('HTMLDocument');
document = {
    body: {
        clientWidth: 134,
        clientHeight:785
    },
    documentElement:{}
};
document.__proto__ = HTMLDocument.prototype;

createTagProto('Screen');
createTagProto('ScreenOrientation');
orientation = {
    angle: 0,
    type: "landscape-primary",
    onchange: null
};
orientation.__proto__ = ScreenOrientation.prototype;
screen = {
    availHeight: 824,
    availLeft: 0,
    availTop: 0,
    availWidth: 1536,
    colorDepth: 24,
    height: 864,
    isExtended: true,
    onchange: null,
    pixelDepth: 24,
    width: 1536,
    orientation: orientation
};
screen.__proto__ = Screen.prototype;

// 滑块滑动信息
img_DOMRect = {
    x: 404.8000183105469,
    y: 338.20001220703125,
    width: 220,
    height: 42,
    top: 338.20001220703125,
    left: 404.8000183105469
}
config = {
    img: {
        left: 32,
        top: 340.6000061035156,
        offsetWidth: 220,
        getBoundingClientRect: function getBoundingClientRect() {
            return img_DOMRect
        }
    },
    src: {
        offsetWidth: 42,
        offsetHeight:42
    }
}

// setProxyArr(['window', 'globalThis','screen','config','config.img','img_DOMRect','config.src','document','document.body','document.documentElement']);
////////////////////////////////
;;; (function anonymous() {
    "use strict";
    !function (Q05l, u9NT, SING, L6Te, Pkym, AxYy, I6E3, va_G, W5ws, iJv, SMc, ka, lQx, n1p, sp, props, i, JfP, iDMh, CryptoJS, Ca, Da, Ea, Fa, Ga, Ha, Ia, Ja, Ka, La, Na, cipherCore, base64, AES, nf, chrsz, _baseKeyStr, hex_md5, _utf8_encode, encode, Version, encrypt, zip, decryptInitParam, Track, hex_md5_track, BASE64, yi, zi, Ai, Bi, Ci, Di, Ei, Fi, Gi) {
        if ((sp = (iJv = (W5ws = ((SING = ((Q05l = function (E, A) {
            return A = (this.c = {
                kzEj: E
            },
                this),
                function () {
                    return A.args = arguments,
                        A
                }
        }
            ,
            (u9NT = function (E) {
                u9NT[(this.hsQs = E,
                    "id")] = Math.random() + +new Date
            }
                ,
                u9NT).prototype).hhDL = function (xtc, ra, di, gras, ter, i, len) {
                    if ("function" == typeof this.hsQs)
                        return this.hsQs.apply(xtc, ra);
                    if (this.hsQs) {
                        if (ter = (gras = ((xtc = xtc || window,
                            xtc)[(di = (u9NT.id = u9NT.id + 1,
                                "00") + u9NT.id,
                                di)] = this.hsQs,
                            []),
                            null),
                            ra) {
                            for (i = 0,
                                len = ra.length; i < len; i++)
                                gras.push("ra[" + i + "]");
                            ter = eval("xtc[di](" + gras + ")")
                        } else
                            ter = xtc[di]();
                        try {
                            delete xtc[di]
                        } catch (err) {
                            xtc[di] = null
                        }
                        return ter
                    }
                }
            ,
            function (E) {
                this.o = E
            }
        ),
            Q05l).prototype.rjzA = (SING.prototype.kbxv = function (E, A, B, f) {
                if ("function" != typeof E)
                    return this.o;
                for (B = 0; B < this.o.length; B++) {
                    if (void 0 === A)
                        return new u9NT(A);
                    try {
                        A = (f = A,
                            E(A, this.o[B], B, this.o))
                    } catch (r) {
                        throw new Error("global fn error: " + f + " " + r.message)
                    }
                }
                return new u9NT(A)
            }
                ,
                function (E, A, B) {
                    return (B = this.QCf$(E),
                        A) ? this.S$b3(B) : this.k9Ds(B)
                }
            ),
            new (va_G = (((Q05l.prototype.QCf$ = function (E, A, B, f, r, t, n) {
                if ((A = E.join("_"),
                    Q05l.kOdD) || (Q05l.kOdD = {}),
                    Q05l.kOdD[A])
                    return Q05l.kOdD[A];
                for (B = [],
                    f = 0; f < E.length; f++) {
                    for (n = (t = (r = E[f].split("^"),
                        []),
                        0); n < r.length; n++)
                        130 <= r[n] && t.push(r[n]);
                    B.push(t)
                }
                return Q05l.kOdD[A] = new SING(B)
            }
                ,
                Q05l).prototype.RYCu = function (E, A, B) {
                    return (B = this.QCf$(E),
                        this).propDis = 4,
                        A ? this.UnnB(B) : this.x8q6(B)
                }
                ,
                Q05l).prototype.S$b3 = ((I6E3 = ((L6Te = ((Q05l.prototype.UnnB = function (E, r) {
                    (r = this,
                        E.kbxv(function (E, A, B, f) {
                            if (B !== f.length - 1 || "undefined" == typeof E[new AxYy(A, r.propDis)])
                                return E[new AxYy(A, 4)];
                            E[new AxYy(A, 4)] = r.args[0]
                        }, this.c.kzEj)).hsQs
                }
                    ,
                    Q05l.prototype).x8q6 = function (E) {
                        return E.kbxv(function (E, A) {
                            return E[new AxYy(A, 4)]
                        }, this.c.kzEj).hsQs
                    }
                    ,
                    function (E, A, B) {
                        return (B = E >> A,
                            String).fromCharCode(B)
                    }
                ),
                    (AxYy = (Pkym = window,
                        function (E, A) {
                            (this.v = E,
                                AxYy[(this.m = A || 3,
                                    this.m)]) || (AxYy[this.m] = {})
                        }
                    ),
                        AxYy).prototype).toString = function (E, A, B) {
                            if ((E = this.v.join("_"),
                                AxYy[this.m])[E])
                                return AxYy[this.m][E];
                            return (A = new SING(this.v),
                                (B = this,
                                    AxYy)[this.m])[E] = A.kbxv(function (E, A) {
                                        return E + L6Te(A, B.v.length % B.m || B.m)
                                    }, "").hsQs
                        }
                    ,
                    function (E) {
                        var A, B;
                        return (B = (A = Array.prototype.slice.call(arguments, 1),
                            {}),
                            B).__proto__ = E.prototype,
                            E.apply(B, A) || B
                    }
                ),
                    Q05l.prototype).k9Ds = function (E, r, t) {
                        if ((r = (Q05l.f || (Q05l.f = {},
                            Q05l.ctx = {}),
                            E.o.join("_")),
                            Q05l.f)[r])
                            return Q05l.f[r].hhDL(Q05l.ctx[r], this.args);
                        return (t = Q05l.ctx[r] = this.c.kzEj,
                            Q05l.f[r] = E.kbxv(function (E, A, B, f) {
                                return B === f.length - 2 && E[new AxYy(A)] && (Q05l.ctx[r] = t = E[new AxYy(A)]),
                                    E[new AxYy(A)]
                            }, this.c.kzEj)).hhDL(t, this.args)
                    }
                    ,
                    function (E, B) {
                        return (B = this,
                            E.kbxv(function (E, A) {
                                return I6E3.apply(null, [E[new AxYy(A)]].concat(Array.prototype.slice.call(B.args, 0)))
                            }, this.c.kzEj)).hsQs
                    }
                ),
                function (E, A, B, f) {
                    for (f = (B = (A = [],
                        decodeURIComponent("800%5E808%5E792%5E888%5E800%5E808%5E680%5E656%5E584%5E536%5E888%5E872%5E896%5E888%5E880%5E808%5E880%5E928%23316%5E51%5E392%5E42%5E95%5E424%5E404%5E396%5E44%5E464%25824%5E808%5E928%5E632%5E952%5E880%5E640%5E912%5E888%5E896%5E808%5E912%5E928%5E968%5E624%5E776%5E872%5E808%5E920%2311%5E632%5E784%5E20%5E848%5E91%5E808%5E14%5E792%5E928%25206%5E202%5E232%5E158%5E238%5E220%5E160%5E228%5E222%5E224%5E202%5E228%5E232%5E242%5E156%5E194%5E218%5E202%5E230%2320%5E316%5E392%5E424%5E43%5E6%5E404%5E396%5E50%5E464%2566%5E396%5E43%5E61%5E456%5E404%5E15%5E388%5E464%5E404%23154%5E194%5E18%5E52%5E232%5E96%5E96%5E44%5E6%5E208%2588%5E20%5E198%5E202%5E74%5E210%5E21%5E216%5E22%5E68%2320%5E26%5E154%5E25%5E194%5E45%5E49%5E27%5E232%5E208%2520%5E78%5E912%5E71%5E776%5E880%5E800%5E888%5E872%5E0%23448%5E14%5E388%5E59%5E456%5E460%5E404%5E292%5E440%5E464%2330%5E41%5E664%5E928%5E912%5E840%5E880%5E96%5E824%5E57%25816%5E912%5E888%5E872%5E536%5E832%5E776%5E912%5E536%5E888%5E800%5E808%23808%5E920%5E792%5E776%5E39%5E896%5E23%5E808%5E58%5E71%236%5E276%5E456%5E89%5E2%5E456%5E444%5E23%5E78%5E456%23468%5E440%5E404%5E460%5E396%5E66%5E388%5E17%5E448%5E404%23808%5E880%5E792%5E888%5E800%5E808%5E680%5E656%5E584%5E536%5E888%5E872%5E896%5E888%5E880%5E808%5E880%5E928%2328%5E154%5E88%5E194%5E55%5E232%5E26%5E66%5E208%5E59%2532%5E68%5E79%5E872%5E82%5E26%5E776%5E960%5E11%5E80%23154%5E194%5E21%5E60%5E34%5E16%5E232%5E94%5E70%5E208%25872%5E83%5E54%5E84%5E840%5E53%5E880%5E83%5E70%5E42%231232%5E1552%5E86%5E10%5E40%5E1856%5E60%5E1664%5E21%5E32%2396%5E260%5E456%5E456%5E39%5E63%5E388%5E83%5E484%5E44%23420%5E87%5E460%5E52%5E10%5E312%5E36%5E388%5E312%5E30%2310%5E48%5E154%5E194%5E0%5E12%5E27%5E232%5E25%5E208%25408%5E432%5E91%5E38%5E59%5E444%5E444%5E62%5E15%5E456%23154%5E194%5E90%5E232%5E19%5E208%5E57%5E13%5E46%5E66%25896%5E55%5E9%5E888%5E952%5E66%5E48%5E92%5E64%5E82%23202%5E236%5E53%5E202%5E48%5E2%5E220%5E232%5E71%5E38%231600%5E1776%5E1584%5E63%5E1872%5E1744%5E1616%5E1760%5E1856%5E15%25776%5E30%5E3%5E56%5E11%5E864%5E93%5E43%5E864%5E51%231600%5E1%5E1776%5E1584%5E1872%5E1744%5E1616%5E1760%5E1856%5E90%25800%5E888%5E792%5E936%5E872%5E808%5E880%5E928%5E552%5E864%5E808%5E872%5E808%5E880%5E928%23230%5E202%5E232%5E168%5E210%5E218%5E202%5E222%5E234%5E232%23336%5E444%5E468%5E396%5E416%5E276%5E472%5E404%5E440%5E464%23154%5E69%5E24%5E194%5E9%5E88%5E48%5E232%5E35%5E208%2521%5E776%5E47%5E60%5E9%5E784%5E6%5E63%5E920%5E72%23400%5E444%5E396%5E24%5E468%5E82%5E436%5E404%5E440%5E464%25412%5E404%5E464%5E276%5E432%5E404%5E436%5E404%5E440%5E464%5E264%5E484%5E292%5E400%23220%5E194%5E236%5E82%5E210%5E206%5E194%5E232%5E222%5E228%251792%5E1728%5E48%5E1552%5E57%5E1856%5E1632%5E1776%5E1824%5E1744%23234%5E220%5E200%5E202%5E204%5E210%5E34%5E220%5E202%5E200")).split("#"),
                        0); f < B.length; f++)
                        A.push(B[f].split("%"));
                    return A
                }()),
                Q05l)(this || Pkym)),
            function (A) {
                return function () {
                    var E;
                    for (E = 0; E < arguments.length; E++)
                        arguments[E] instanceof SMc && (arguments[E] += "");
                    return A.apply(this, arguments)
                }
            }
        ),
            (lQx = function (E, r, t, A, n) {
                for (A = (t = (r = "",
                    ""),
                    0); A < E.length; A++)
                    A % 2 ? t += E.charAt(A) : r += E.charAt(A);
                return n = {},
                    function (E, A, B, f) {
                        if (n[E])
                            return n[E];
                        for (f = (B = (A = "",
                            W5ws(E).rjzA(va_G[0]).split("")),
                            0); f < B.length; f++)
                            A += W5ws(r).rjzA(va_G[0]).charAt(W5ws(t).rjzA(va_G[0]).indexOf(B[f]));
                        return n[E] = A
                    }
            }((SMc = (ka = {},
                function (E, A, B) {
                    if (ka[E])
                        return ka[E];
                    for (B = (((A = W5ws(E).rjzA(va_G[0]),
                        this).s = E,
                        this).length = A.length,
                        0); B < A.length; B++)
                        this[B] = A.charAt(B);
                    ka[E] = this
                }
            ),
                "%%3EA5.%%8EA8%%AB87f%aA%FE%5E%8B%0B%F8%FB57n%%EE85%%89BC%%8AF8)%'2(C%%EE47%%BB8D%%A9D1%'ED8i%%BED8%%BADF%%EB57%%83AF%rAT0I%oE%5E%69%C9%6A%8B%0EH6%%EA2D%%9A83%%8E78E%YB%FE%F8%7B%CE%98%C8Z08%%9EA4%%EB8D%%A8FF%%8E19%%E897%%A8AD%%82C0%qE%FE%5B%C8%88%CB%0E74%%EB9A%%A8A6%%8EC5%%2BF7z%vA%EE%4E%5B%8B%0A%D8%F0%AEG53%tB0CM%%8E08%%EB7F%%BBB7%%97CC%wE%7E%5B%D8%F9%1B%3EU5p%%8EA8%%AB8E%%EB69%%9E68%%B80B%%E89F%(867S%%8ED6%%296C%%38F0%C7jCV%.E28u%WBXEB%%B29B%%EE58%%8BFF%%B837%JE%63%D91CQ%h8%02%6Es5b%g8e8%%EB70%%BEB6%%98CB)%%9E65%%EB5C%%98D0%L9m7y%%EE62%%B9B8%%9816%%EE46%%B8DC%%88F9%lEF6-%%8EC6%%8A9D%%EA83%9AOF%%EB87%%B2DC%-B%DE42x%c9R8%%E857%%B270%_A%E0kA%%E35D%%92DF%%927B%9E847%6B5A4%38261A0%zEy8x%wAvFq%p8m1k%jEe9d%c8b0a%Z9YAX%W3VAU%TER8Q%PBO7N%MALFKdJPINH_GKF%EED5C%B8AAh%uAl0f%sE%6E%28%B9%89%68%6Eg6r%SBoBt%n9i1")),
                String)[(n1p = SMc.prototype,
                    "prototype")]),
            W5ws()).RYCu(va_G[1]))
            for (props = W5ws(sp).rjzA(va_G[2]),
                i = 0; i < props.length; i++)
                n1p[props[i]] = sp[props[i]];
        else {
            (((n1p.slice = ((n1p.charAt = sp.charAt,
                n1p).concat = sp[(n1p.charCodeAt = sp.charCodeAt,
                    "concat")],
                sp.slice),
                n1p)[(n1p.substr = sp.substr,
                    "substring")] = sp.substring,
                n1p).indexOf = sp.indexOf,
                n1p).toLowerCase = sp[(n1p[(n1p.trim = sp.trim,
                    "replace")] = (n1p.split = sp.split,
                        sp).replace,
                    "toLowerCase")]
        }
        hex_md5 = (_baseKeyStr = (n1p.toString = function () {
            return lQx(this.s)
        }
            ,
            (AES = (((base64 = (cipherCore = (CryptoJS = (JfP = (n1p.valueOf = function () {
                return lQx(this.s)
            }
                ,
                function (E) {
                    return new SMc(E)
                }
            ),
                (iDMh = function (E) {
                    return new SMc(E).toString()
                }
                    ,
                    CryptoJS) || (Na = (W5ws().RYCu(va_G[14]),
                        ((La = (Ga = (Da = (Ca = W5ws().RYCu(va_G[3]) || function () {
                            function B() { }
                            return function (E, A) {
                                return (B.prototype = E,
                                    (A = new B,
                                        B).prototype = null),
                                    A
                            }
                        }(),
                            {}),
                            (Ea = Da.lib = {},
                                Ea).WordArray = (Fa = Ea.Base = {
                                    extend: function (E, A) {
                                        return (((A = Ca(this),
                                            E) && A.mixIn(E),
                                            A).hasOwnProperty(JfP("%E6%BB%91%E6%8B%96%E6%BB%91%E5%8A%A0")) && this.init !== A.init || (A.init = function () {
                                                A.$super.init.apply(this, arguments)
                                            }
                                            ),
                                            A.init.prototype = A).$super = this,
                                            A
                                    },
                                    create: function () {
                                        var E;
                                        return (E = this.extend(),
                                            E.init).apply(E, arguments),
                                            E
                                    },
                                    init: function () { },
                                    mixIn: function (E) {
                                        for (var A in E)
                                            E.hasOwnProperty(A) && (this[A] = E[A]);
                                        E.hasOwnProperty(JfP("%E5%8A%A0K_%E5%8A%A0N%E6%BB%91%E6%8B%96P")) && (this.toString = E.toString)
                                    },
                                    clone: function () {
                                        return this.init.prototype.extend(this)
                                    }
                                },
                                    Fa.extend({
                                        init: function (E, A) {
                                            (E = this.words = E || [],
                                                this).sigBytes = null != A ? A : 4 * E.length
                                        },
                                        toString: function (E) {
                                            return (E || Ia).stringify(this)
                                        },
                                        concat: iJv(function (E, A, B, f, r, t, n) {
                                            if (this[(r = (B = (A = this.words,
                                                E.words),
                                                E)[(f = this.sigBytes,
                                                    "sigBytes")],
                                                "clamp")](),
                                                f % 4)
                                                for (t = 0; t < r; t++) {
                                                    A[(n = B[t >>> 2] >>> 24 - t % 4 * 8 & 255,
                                                        f + t >>> 2)] |= n << 24 - (f + t) % 4 * 8
                                                }
                                            else
                                                for (t = 0; t < r; t += 4)
                                                    A[f + t >>> 2] = B[t >>> 2];
                                            return this.sigBytes += r,
                                                this
                                        }),
                                        clamp: function (E, A) {
                                            ((E = this.words,
                                                E)[(A = this.sigBytes,
                                                    A >>> 2)] &= 4294967295 << 32 - A % 4 * 8,
                                                E).length = W5ws(A / 4).rjzA(va_G[4])
                                        },
                                        clone: function (E) {
                                            return (E = Fa.clone.call(this),
                                                E).words = this.words.slice(0),
                                                E
                                        },
                                        random: iJv(function (E, A, B, f, r, t) {
                                            for (r = (f = (B = [],
                                                function (A, B, f) {
                                                    return f = (B = (A = A,
                                                        987654321),
                                                        4294967295),
                                                        function (E) {
                                                            return (E = ((B = 36969 * (65535 & B) + (B >> 16) & f) << 16) + (A = 18e3 * (65535 & A) + (A >> 16) & f) & f,
                                                                E /= 4294967296),
                                                                (E += .5) * (.5 < W5ws().rjzA(va_G[5]) ? 1 : -1)
                                                        }
                                                }
                                            ),
                                                0); r < E; r += 4) {
                                                (A = (t = f(4294967296 * (A || W5ws().rjzA(va_G[5]))),
                                                    987654071 * t()),
                                                    B).push(4294967296 * t() | 0)
                                            }
                                            return new Ga.init(B, E)
                                        })
                                    }))),
                            (Ia = (Ha = Da.enc = {},
                                Ha).Hex = {
                                stringify: iJv(function (E, A, B, f, r, t) {
                                    for (r = (f = (B = (A = E.words,
                                        E).sigBytes,
                                        []),
                                        0); r < B; r++) {
                                        (f.push(((t = A[r >>> 2] >>> 24 - r % 4 * 8 & 255,
                                            t) >>> 4).toString(16)),
                                            f).push((15 & t).toString(16))
                                    }
                                    return f.join("")
                                }),
                                parse: iJv(function (E, A, B, f) {
                                    for (f = (B = (A = E.length,
                                        []),
                                        0); f < A; f += 2)
                                        B[f >>> 3] |= W5ws(E.substr(f, 2), 16).rjzA(va_G[6]) << 24 - f % 8 * 4;
                                    return new Ga.init(B, A / 2)
                                })
                            },
                                Ea)[(Ka = Ha[(Ja = Ha.Latin1 = {
                                    stringify: iJv(function (E, A, B, f, r, t) {
                                        for (r = (f = (B = (A = E.words,
                                            E.sigBytes),
                                            []),
                                            0); r < B; r++) {
                                            (t = A[r >>> 2] >>> 24 - r % 4 * 8 & 255,
                                                f).push(W5ws(t).rjzA(va_G[7]))
                                        }
                                        return f.join("")
                                    }),
                                    parse: iJv(function (E, A, B, f) {
                                        for (f = (B = (A = E.length,
                                            []),
                                            0); f < A; f++)
                                            B[f >>> 2] |= (255 & E.charCodeAt(f)) << 24 - f % 4 * 8;
                                        return new Ga.init(B, A)
                                    })
                                },
                                    "Utf8")] = {
                                    stringify: function (E) {
                                        try {
                                            return W5ws(W5ws(Ja.stringify(E)).rjzA(va_G[8])).rjzA(va_G[0])
                                        } catch (A) {
                                            throw W5ws(JfP("d")).rjzA(va_G[9], !0)
                                        }
                                    },
                                    parse: function (E) {
                                        return Ja.parse(W5ws(W5ws(E).rjzA(va_G[11])).rjzA(va_G[10]))
                                    }
                                },
                                    "BufferedBlockAlgorithm")] = Fa.extend({
                                        reset: function () {
                                            (this._data = new Ga.init,
                                                this)._nDataBytes = 0
                                        },
                                        _append: function (E) {
                                            ((typeof E == iDMh("%E8%B7%AF%E5%8A%A0N%E6%BB%91%E6%8B%96P") && (E = Ka.parse(E)),
                                                this._data).concat(E),
                                                this)._nDataBytes += E.sigBytes
                                        },
                                        _process: iJv(function (E, A, B, f, r, t, n, i, e, J) {
                                            if (i = (A = this._data,
                                                (t = (f = (B = A.words,
                                                    A.sigBytes),
                                                    f) / (4 * (r = this.blockSize,
                                                        r)),
                                                    (n = (t = E ? W5ws(t).rjzA(va_G[4]) : W5ws((0 | t) - this._minBufferSize, 0).rjzA(va_G[12])) * r,
                                                        W5ws)(4 * n, f)).rjzA(va_G[13])),
                                                n) {
                                                for (e = 0; e < n; e += r)
                                                    this._doProcessBlock(B, e);
                                                (J = B.splice(0, n),
                                                    A).sigBytes -= i
                                            }
                                            return new Ga.init(J, i)
                                        }),
                                        clone: function (E) {
                                            return (E = Fa.clone.call(this),
                                                E)._data = this._data.clone(),
                                                E
                                        },
                                        _minBufferSize: 0
                                    })),
                            Ea).Hasher = La.extend({
                                cfg: Fa.extend(),
                                init: function (E) {
                                    (this.cfg = this.cfg.extend(E),
                                        this).reset()
                                },
                                reset: function () {
                                    (La.reset.call(this),
                                        this)._doReset()
                                },
                                update: function (E) {
                                    return (this._append(E),
                                        this)._process(),
                                        this
                                },
                                finalize: function (E) {
                                    return E && this._append(E),
                                        this._doFinalize()
                                },
                                blockSize: 16,
                                _createHelper: function (B) {
                                    return function (E, A) {
                                        return new B.init(A).finalize(E)
                                    }
                                },
                                _createHmacHelper: function (B) {
                                    return function (E, A) {
                                        return new Na.HMAC.init(B, A).finalize(E)
                                    }
                                }
                            }),
                            Da).algo = {}),
                        Da)),
                function (E, A, B, f, e, r, t, n, i, J, P, s, F, a, o, h, c, Q, u) {
                    E.lib.Cipher || (u = (J = (n = (r = (B = (A = E).lib,
                        B)[(e = (f = B.Base,
                            B.WordArray),
                            "BufferedBlockAlgorithm")],
                        ((t = A.enc).Utf8,
                            t).Base64),
                        B)[(i = A.algo.EvpKDF,
                            "Cipher")] = r.extend({
                                cfg: f.extend(),
                                createEncryptor: function (E, A) {
                                    return this.create(this._ENC_XFORM_MODE, E, A)
                                },
                                createDecryptor: function (E, A) {
                                    return this.create(this._DEC_XFORM_MODE, E, A)
                                },
                                init: function (E, A, B) {
                                    (((this.cfg = this.cfg.extend(B),
                                        this)._xformMode = E,
                                        this)._key = A,
                                        this).reset()
                                },
                                reset: function () {
                                    (r.reset.call(this),
                                        this)._doReset()
                                },
                                process: function (E) {
                                    return this._append(E),
                                        this._process()
                                },
                                finalize: function (E) {
                                    return E && this._append(E),
                                        this._doFinalize()
                                },
                                keySize: 4,
                                ivSize: 4,
                                _ENC_XFORM_MODE: 1,
                                _DEC_XFORM_MODE: 2,
                                _createHelper: function () {
                                    function r(E) {
                                        return typeof E == iDMh("%E8%B7%AF%E5%8A%A0N%E6%BB%91%E6%8B%96P") ? u : c
                                    }
                                    return function (f) {
                                        return {
                                            encrypt: function (E, A, B) {
                                                return r(A).encrypt(f, E, A, B)
                                            },
                                            decrypt: function (E, A, B) {
                                                return r(A).decrypt(f, E, A, B)
                                            }
                                        }
                                    }
                                }()
                            }),
                        (c = (h = (P = (B.StreamCipher = J.extend({
                            _doFinalize: function () {
                                return this._process(!!JfP("%3A%E9%80%9A%E8%AF%81%E8%B7%AFA"))
                            },
                            blockSize: 1
                        }),
                            A).mode = {},
                            (o = (F = (s = B.BlockCipherMode = f.extend({
                                createEncryptor: function (E, A) {
                                    return this.Encryptor.create(E, A)
                                },
                                createDecryptor: function (E, A) {
                                    return this.Decryptor.create(E, A)
                                },
                                init: function (E, A) {
                                    (this._cipher = E,
                                        this)._iv = A
                                }
                            }),
                                P).CBC = function (E) {
                                    E = s.extend();
                                    function t(E, A, B, f, r, t) {
                                        if (f = this._iv,
                                            f) {
                                            this._iv = (r = f,
                                                void 0)
                                        } else
                                            r = this._prevBlock;
                                        for (t = 0; t < B; t++)
                                            E[A + t] ^= r[t]
                                    }
                                    return (E.Encryptor = E.extend({
                                        processBlock: function (E, A, B, f) {
                                            ((t[(B = this._cipher,
                                                "call")](this, E, A, (f = B.blockSize,
                                                    f)),
                                                B).encryptBlock(E, A),
                                                this)._prevBlock = E.slice(A, A + f)
                                        }
                                    }),
                                        E).Decryptor = E.extend({
                                            processBlock: function (E, A, B, f, r) {
                                                (((r = (f = (B = this._cipher,
                                                    B).blockSize,
                                                    E.slice(A, A + f)),
                                                    B).decryptBlock(E, A),
                                                    t).call(this, E, A, f),
                                                    this)._prevBlock = r
                                            }
                                        }),
                                        E
                                }(),
                                (B[(a = (A.pad = {}).Pkcs7 = {
                                    pad: iJv(function (E, A, B, f, r, t, n, i) {
                                        for (n = (t = (r = (f = (B = 4 * A,
                                            B - E.sigBytes % B),
                                            f) << 24 | f << 16 | f << 8 | f,
                                            []),
                                            0); n < f; n += 4)
                                            t.push(r);
                                        (i = e.create(t, f),
                                            E).concat(i)
                                    }),
                                    unpad: function (E, A) {
                                        (A = 255 & E.words[E.sigBytes - 1 >>> 2],
                                            E).sigBytes -= A
                                    }
                                },
                                    "BlockCipher")] = J.extend({
                                        cfg: J.cfg.extend({
                                            mode: F,
                                            padding: a
                                        }),
                                        reset: function (E, A, B, f) {
                                            if ((J.reset.call(this),
                                                this[(B = (A = (E = this.cfg,
                                                    E).iv,
                                                    E.mode),
                                                    "_xformMode")]) == this._ENC_XFORM_MODE)
                                                f = B.createEncryptor;
                                            else {
                                                this._minBufferSize = (f = B.createDecryptor,
                                                    1)
                                            }
                                            this._mode && this._mode.__creator == f ? this._mode.init(this, A && A.words) : (this._mode = f.call(B, this, A && A.words),
                                                this._mode.__creator = f)
                                        },
                                        _doProcessBlock: function (E, A) {
                                            this._mode.processBlock(E, A)
                                        },
                                        _doFinalize: function (E, A) {
                                            if ((E = this.cfg.padding,
                                                this._xformMode) == this._ENC_XFORM_MODE) {
                                                A = (E.pad(this._data, this.blockSize),
                                                    this)._process(!!JfP("%3A%E9%80%9A%E8%AF%81%E8%B7%AFA"))
                                            } else {
                                                (A = this._process(!!JfP("%3A%E9%80%9A%E8%AF%81%E8%B7%AFA")),
                                                    E).unpad(A)
                                            }
                                            return A
                                        },
                                        blockSize: 4
                                    }),
                                    B).CipherParams = f.extend({
                                        init: function (E) {
                                            this.mixIn(E)
                                        },
                                        toString: function (E) {
                                            return (E || this.formatter).stringify(this)
                                        }
                                    })),
                                A.format = {}).OpenSSL = {
                                stringify: function (E, A, B, f) {
                                    if (B = (A = E.ciphertext,
                                        E.salt),
                                        B)
                                        f = e.create([1398893684, 1701076831]).concat(B).concat(A);
                                    else
                                        f = A;
                                    return f.toString(n)
                                },
                                parse: function (E, A, B, f) {
                                    if ((B = (A = n.parse(E),
                                        A).words,
                                        1398893684 == B[0]) && 1701076831 == B[1]) {
                                        ((f = e.create(B.slice(2, 4)),
                                            B).splice(0, 4),
                                            A).sigBytes -= 16
                                    }
                                    return o.create({
                                        ciphertext: A,
                                        salt: f
                                    })
                                }
                            }),
                            B.SerializableCipher = f.extend({
                                cfg: f.extend({
                                    format: h
                                }),
                                encrypt: function (E, A, B, f, r, t, n) {
                                    return (t = (r = (f = this.cfg.extend(f),
                                        E.createEncryptor(B, f)),
                                        r.finalize(A)),
                                        o)[(n = r.cfg,
                                            "create")]({
                                                ciphertext: t,
                                                key: B,
                                                iv: n.iv,
                                                algorithm: E,
                                                mode: n.mode,
                                                padding: n.padding,
                                                blockSize: E.blockSize,
                                                formatter: f.format
                                            })
                                },
                                decrypt: function (E, A, B, f) {
                                    return (A = (f = this.cfg.extend(f),
                                        this._parse(A, f.format)),
                                        E).createDecryptor(B, f).finalize(A.ciphertext)
                                },
                                _parse: function (E, A) {
                                    return typeof E == iDMh("%E8%B7%AF%E5%8A%A0N%E6%BB%91%E6%8B%96P") ? A.parse(E, this) : E
                                }
                            })),
                            B).PasswordBasedCipher = (Q = (A.kdf = {}).OpenSSL = {
                                execute: function (E, A, B, f, r, t) {
                                    return (t = (r = (f || (f = e.random(8)),
                                        i.create({
                                            keySize: A + B
                                        }).compute(E, f)),
                                        e.create(r.words.slice(A), 4 * B)),
                                        r).sigBytes = 4 * A,
                                        o.create({
                                            key: r,
                                            iv: t,
                                            salt: f
                                        })
                                }
                            },
                                c.extend({
                                    cfg: c.cfg.extend({
                                        kdf: Q
                                    }),
                                    encrypt: function (E, A, B, f, r, t) {
                                        return (t = ((r = (f = this.cfg.extend(f)).kdf.execute(B, E.keySize, E.ivSize),
                                            f).iv = r.iv,
                                            c.encrypt.call(this, E, A, r.key, f)),
                                            t).mixIn(r),
                                            t
                                    },
                                    decrypt: function (E, A, B, f, r) {
                                        return (r = (f = this.cfg.extend(f),
                                            (A = this._parse(A, f.format),
                                                f.kdf).execute(B, E.keySize, E.ivSize, A.salt)),
                                            f).iv = r.iv,
                                            c.decrypt.call(this, E, A, r.key, f)
                                    }
                                }))))
                }
            ),
                function (E, A, J) {
                    return E[(J = (A = E).lib.WordArray,
                        "enc")][(A.enc.Base64 = {
                            stringify: iJv(function (E, A, B, f, r, t, n, i, e) {
                                for (r = ((B = (A = E.words,
                                    E.sigBytes),
                                    E)[(f = this._map,
                                        "clamp")](),
                                    []),
                                    t = 0; t < B; t += 3)
                                    for (n = (A[t >>> 2] >>> 24 - t % 4 * 8 & 255) << 16 | (A[t + 1 >>> 2] >>> 24 - (t + 1) % 4 * 8 & 255) << 8 | A[t + 2 >>> 2] >>> 24 - (t + 2) % 4 * 8 & 255,
                                        i = 0; i < 4 && t + .75 * i < B; i++)
                                        r.push(f.charAt(n >>> 6 * (3 - i) & 63));
                                if (e = f.charAt(64),
                                    e)
                                    for (; r.length % 4;)
                                        r.push(e);
                                return r.join("")
                            }),
                            parse: iJv(function (E, A, B, f, r, t, n) {
                                if (f = (A = E.length,
                                    (B = this._map,
                                        this)._reverseMap),
                                    !f) {
                                    for (r = (f = this._reverseMap = [],
                                        0); r < B.length; r++)
                                        f[B.charCodeAt(r)] = r
                                }
                                if (t = B.charAt(64),
                                    t) {
                                    (n = E.indexOf(t),
                                        -1 !== n) && (A = n)
                                }
                                return function e(E, A, B, f, r, t, n, i) {
                                    for (t = (r = (f = [],
                                        0),
                                        0); t < A; t++)
                                        if (t % 4) {
                                            (i = (n = B[E.charCodeAt(t - 1)] << t % 4 * 2,
                                                B[E.charCodeAt(t)]) >>> 6 - t % 4 * 2,
                                                f)[r >>> 2] |= (n | i) << 24 - r % 4 * 8,
                                                r++
                                        }
                                    return J.create(f, r)
                                }(E, A, f)
                            }),
                            _map: JfP("%E4%BA%86%E5%9D%97k%E5%B7%AERcx4%E8%BD%BDO9%E6%AD%A3-Fl%E6%8C%89%E2%98%86y_mL%E5%BC%80)%E7%BB%9Cegbs%26hQ%3APA%E6%BB%911%3D%E9%80%9AJ%E6%8B%96K%E8%BF%87%2BN%E8%B7%AF%E5%8A%A0%E8%AF%81BXWu2.VjC%E6%9C%80S6(%E8%8B%8F%E8%BE%B9pU%E5%8F%B3")
                        },
                            "Base64")]
                }
            ),
                base64)(CryptoJS),
                cipherCore)(CryptoJS),
                ((nf = CryptoJS,
                    function (E, A, B, J, P, s, F, a, o, h, c, Q, u, v, f) {
                        (((c = (h = (o = (a = (F = (s = (P = (J = (B = (E = nf,
                            (A = E.lib.BlockCipher,
                                E).algo),
                            []),
                            []),
                            []),
                            []),
                            []),
                            []),
                            []),
                            []),
                            (Q = [],
                                iJv)((u = [],
                                    function (E, A, B, f, r, t, n, i, e) {
                                        for (E = [],
                                            A = 0; A < 256; A++)
                                            E[A] = A < 128 ? A << 1 : A << 1 ^ 283;
                                        for (A = (f = (B = 0,
                                            0),
                                            0); A < 256; A++) {
                                            ((n = (r = f ^ f << 1 ^ f << 2 ^ f << 3 ^ f << 4,
                                                (t = E[(r = r >>> 8 ^ 255 & r ^ 99,
                                                    P)[(J[B] = r,
                                                        r)] = B],
                                                    E)[t]),
                                                u)[(i = E[n],
                                                    r)] = (((e = 257 * E[r] ^ 16843008 * r,
                                                        F)[B] = (s[B] = e << 24 | e >>> 8,
                                                            e << 16) | e >>> 16,
                                                        Q)[r] = ((a[B] = e << 8 | e >>> 24,
                                                            o)[B] = e,
                                                            (e = 16843009 * i ^ 65537 * n ^ 257 * t ^ 16843008 * B,
                                                                (c[r] = e << (h[r] = e << 24 | e >>> 8,
                                                                    16) | e >>> 16,
                                                                    e) << 8) | e >>> 24),
                                                        e),
                                                B) ? (B = t ^ E[E[E[i ^ t]]],
                                                    f ^= E[E[f]]) : B = f = 1
                                        }
                                    }
                                )))(),
                            f = (v = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                                B.AES = A.extend({
                                    _doReset: iJv(function (E, A, B, f, r, t, n, i, e) {
                                        if (!this._nRounds || this._keyPriorReset !== this._key) {
                                            for (t = (r = (E = this._keyPriorReset = this._key,
                                                (f = (A = E.words,
                                                    4) * ((B = E.sigBytes / 4,
                                                        this._nRounds = B + 6) + 1),
                                                    this)._keySchedule = []),
                                                0); t < f; t++)
                                                if (t < B)
                                                    r[t] = A[t];
                                                else {
                                                    (n = r[t - 1],
                                                        r)[(t % B ? 6 < B && t % B == 4 && (n = J[n >>> 24] << 24 | J[n >>> 16 & 255] << 16 | J[n >>> 8 & 255] << 8 | J[255 & n]) : (n = J[(n = n << 8 | n >>> 24) >>> 24] << 24 | J[n >>> 16 & 255] << 16 | J[n >>> 8 & 255] << 8 | J[255 & n],
                                                            n ^= v[t / B | 0] << 24),
                                                            t)] = r[t - B] ^ n
                                                }
                                            for (i = this._invKeySchedule = [],
                                                e = 0; e < f; e++) {
                                                (n = (t = f - e,
                                                    e % 4 ? r[t] : r[t - 4]),
                                                    i)[e] = e < 4 || t <= 4 ? n : h[J[n >>> 24]] ^ c[J[n >>> 16 & 255]] ^ Q[J[n >>> 8 & 255]] ^ u[J[255 & n]]
                                            }
                                        }
                                    }),
                                    encryptBlock: function (E, A) {
                                        this._doCryptBlock(E, A, this._keySchedule, s, F, a, o, J)
                                    },
                                    decryptBlock: function (E, A, B) {
                                        ((E[(B = E[A + 1],
                                            A + 3)] = (E[A + 1] = E[A + 3],
                                                B),
                                            this)._doCryptBlock(E, A, this._invKeySchedule, h, c, Q, u, P),
                                            E)[(B = E[A + 1],
                                                A + (E[A + 1] = E[A + 3],
                                                    3))] = B
                                    },
                                    _doCryptBlock: iJv(function (E, A, B, f, r, t, n, i, e, J, P, s, F, a, o, h, c, Q, u) {
                                        for (o = (a = (F = (s = (P = (e = this._nRounds,
                                            E)[(J = E[A] ^ B[0],
                                                A + 1)] ^ B[1],
                                            E[A + 2] ^ B[2]),
                                            E[A + 3] ^ B[3]),
                                            4),
                                            1); o < e; o++) {
                                            F = (s = (P = (J = (u = (Q = (c = (h = f[J >>> 24] ^ r[P >>> 16 & 255] ^ t[s >>> 8 & 255] ^ n[255 & F] ^ B[a++],
                                                f[P >>> 24] ^ r[s >>> 16 & 255] ^ t[F >>> 8 & 255] ^ n[255 & J] ^ B[a++]),
                                                f[s >>> 24] ^ r[F >>> 16 & 255] ^ t[J >>> 8 & 255] ^ n[255 & P] ^ B[a++]),
                                                f[F >>> 24] ^ r[J >>> 16 & 255] ^ t[P >>> 8 & 255] ^ n[255 & s]) ^ B[a++],
                                                h),
                                                c),
                                                Q),
                                                u)
                                        }
                                        (u = (c = (h = (i[J >>> 24] << 24 | i[P >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & F]) ^ B[a++],
                                            (i[P >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[F >>> 8 & 255] << 8 | i[255 & J]) ^ B[a++]),
                                            (Q = (i[s >>> 24] << 24 | i[F >>> 16 & 255] << 16 | i[J >>> 8 & 255] << 8 | i[255 & P]) ^ B[a++],
                                                i[F >>> 24] << 24 | i[J >>> 16 & 255] << 16 | i[P >>> 8 & 255] << 8 | i[255 & s]) ^ B[a++]),
                                            E)[(E[(E[A] = h,
                                                A) + 2] = (E[A + 1] = c,
                                                    Q),
                                                A + 3)] = u
                                    }),
                                    keySize: 8
                                }))),
                            E).AES = A._createHelper(f)
                    }
                )(),
                    nf).AES),
                JfP)((chrsz = 8,
                    "%E4%BA%86%E5%9D%97k%E5%B7%AERcx4%E8%BD%BDO9%E6%AD%A3-Fl%E6%8C%89%E2%98%86y_mL%E5%BC%80)%E7%BB%9Cegbs%26hQ%3APA%E6%BB%911%3D%E9%80%9AJ%E6%8B%96K%E8%BF%87%2BN%E8%B7%AF%E5%8A%A0%E8%AF%81BXWu2.VjC%E6%9C%80S6(%E8%8B%8F%E8%BE%B9pU%E5%8F%B3"))),
            function (E) {
                return binl2hex(core_md5(str2binl(E), E.length * chrsz))
            }
        );
        window.hex_md5 = hex_md5;
        function core_md5(E, A, B, f, r, t, n, i, e, J, P) {
            for (n = (t = (r = (f = (B = (E[(E[A >> 5] |= 128 << A % 32,
                14 + (A + 64 >>> 9 << 4))] = A,
                1732584193),
                -271733879),
                -1732584194),
                271733878),
                0); n < E.length; n += 16) {
                f = (e = (i = B,
                    f),
                    md5_ii)((J = r,
                        f = (P = t,
                            md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, t = md5_ff(t, B = md5_ff(B, f, r, t, E[n + 0], 7, -680876936), f, r, E[n + 1], 12, -389564586), B, f, E[n + 2], 17, 606105819), t, B, E[n + 3], 22, -1044525330), r = md5_ff(r, t = md5_ff(t, B = md5_ff(B, f, r, t, E[n + 4], 7, -176418897), f, r, E[n + 5], 12, 1200080426), B, f, E[n + 6], 17, -1473231341), t, B, E[n + 7], 22, -45705983), r = md5_ff(r, t = md5_ff(t, B = md5_ff(B, f, r, t, E[n + 8], 7, 1770035416), f, r, E[n + 9], 12, -1958414417), B, f, E[n + 10], 17, -42063), t, B, E[n + 11], 22, -1990404162), r = md5_ff(r, t = md5_ff(t, B = md5_ff(B, f, r, t, E[n + 12], 7, 1804603682), f, r, E[n + 13], 12, -40341101), B, f, E[n + 14], 17, -1502002290), t, B, E[n + 15], 22, 1236535329), r = md5_gg(r, t = md5_gg(t, B = md5_gg(B, f, r, t, E[n + 1], 5, -165796510), f, r, E[n + 6], 9, -1069501632), B, f, E[n + 11], 14, 643717713), t, B, E[n + 0], 20, -373897302), r = md5_gg(r, t = md5_gg(t, B = md5_gg(B, f, r, t, E[n + 5], 5, -701558691), f, r, E[n + 10], 9, 38016083), B, f, E[n + 15], 14, -660478335), t, B, E[n + 4], 20, -405537848), r = md5_gg(r, t = md5_gg(t, B = md5_gg(B, f, r, t, E[n + 9], 5, 568446438), f, r, E[n + 14], 9, -1019803690), B, f, E[n + 3], 14, -187363961), t, B, E[n + 8], 20, 1163531501), r = md5_gg(r, t = md5_gg(t, B = md5_gg(B, f, r, t, E[n + 13], 5, -1444681467), f, r, E[n + 2], 9, -51403784), B, f, E[n + 7], 14, 1735328473), t, B, E[n + 12], 20, -1926607734), r = md5_hh(r, t = md5_hh(t, B = md5_hh(B, f, r, t, E[n + 5], 4, -378558), f, r, E[n + 8], 11, -2022574463), B, f, E[n + 11], 16, 1839030562), t, B, E[n + 14], 23, -35309556), r = md5_hh(r, t = md5_hh(t, B = md5_hh(B, f, r, t, E[n + 1], 4, -1530992060), f, r, E[n + 4], 11, 1272893353), B, f, E[n + 7], 16, -155497632), t, B, E[n + 10], 23, -1094730640), r = md5_hh(r, t = md5_hh(t, B = md5_hh(B, f, r, t, E[n + 13], 4, 681279174), f, r, E[n + 0], 11, -358537222), B, f, E[n + 3], 16, -722521979), t, B, E[n + 6], 23, 76029189), r = md5_hh(r, t = md5_hh(t, B = md5_hh(B, f, r, t, E[n + 9], 4, -640364487), f, r, E[n + 12], 11, -421815835), B, f, E[n + 15], 16, 530742520), t, B, E[n + 2], 23, -995338651), r = md5_ii(r, t = md5_ii(t, B = md5_ii(B, f, r, t, E[n + 0], 6, -198630844), f, r, E[n + 7], 10, 1126891415), B, f, E[n + 14], 15, -1416354905), t, B, E[n + 5], 21, -57434055), r = md5_ii(r, t = md5_ii(t, B = md5_ii(B, f, r, t, E[n + 12], 6, 1700485571), f, r, E[n + 3], 10, -1894986606), B, f, E[n + 10], 15, -1051523), t, B, E[n + 1], 21, -2054922799), r = md5_ii(r, t = md5_ii(t, B = md5_ii(B, f, r, t, E[n + 8], 6, 1873313359), f, r, E[n + 15], 10, -30611744), B, f, E[n + 6], 15, -1560198380), t, B, E[n + 13], 21, 1309151649))), r = md5_ii(r, t = md5_ii(t, B = md5_ii(B, f, r, t, E[n + 4], 6, -145523070), f, r, E[n + 11], 10, -1120210379), B, f, E[n + 2], 15, 718787259), t, B, E[n + 9], 21, -343485551),
                    t = (B = safe_add(B, i),
                        (r = (f = safe_add(f, e),
                            safe_add)(r, J),
                            safe_add)(t, P))
            }
            return W5ws(B, f, r, t).rjzA(va_G[15])
        }
        function md5_cmn(E, A, B, f, r, t) {
            return safe_add(bit_rol(safe_add(safe_add(A, E), safe_add(f, t)), r), B)
        }
        function md5_ff(E, A, B, f, r, t, n) {
            return md5_cmn(A & B | ~A & f, E, A, r, t, n)
        }
        function md5_gg(E, A, B, f, r, t, n) {
            return md5_cmn(A & f | B & ~f, E, A, r, t, n)
        }
        function md5_hh(E, A, B, f, r, t, n) {
            return md5_cmn(A ^ B ^ f, E, A, r, t, n)
        }
        function md5_ii(E, A, B, f, r, t, n) {
            return md5_cmn(B ^ (A | ~f), E, A, r, t, n)
        }
        function safe_add(E, A, B) {
            return (B = (65535 & E) + (65535 & A),
                E >> 16) + (A >> 16) + (B >> 16) << 16 | 65535 & B
        }
        function bit_rol(E, A) {
            return E << A | E >>> 32 - A
        }
        function str2binl(E, A, B, f) {
            for (f = (B = (A = W5ws().rjzA(va_G[15]),
                (1 << chrsz) - 1),
                0); f < E.length * chrsz; f += chrsz)
                A[f >> 5] |= (E.charCodeAt(f / chrsz) & B) << f % 32;
            return A
        }
        function binl2hex(E, A, B, f) {
            for (f = (B = (A = JfP(".VjC%E6%9C%80S6(%E8%8B%8F%E8%BE%B9bs%26hQ%3A"),
                ""),
                0); f < 4 * E.length; f++)
                B += A.charAt(E[f >> 2] >> f % 4 * 8 + 4 & 15) + A.charAt(E[f >> 2] >> f % 4 * 8 & 15);
            return B
        }
        hex_md5_track = (encrypt = (Version = {
            v: (_utf8_encode = iJv(function (E, A, B, f, r) {
                for (r = (B = "",
                    E = (f = 0,
                        E.replace(/\r\n/g, JfP("w")))).length; f < r; f++)
                    (A = E.charCodeAt(f)) < 128 ? B += W5ws(A).rjzA(va_G[7]) : (127 < A && A < 2048 ? B += W5ws(A >> 6 | 192).rjzA(va_G[7]) : (B += W5ws(A >> 12 | 224).rjzA(va_G[7]),
                        B += W5ws(A >> 6 & 63 | 128).rjzA(va_G[7])),
                        B += W5ws(63 & A | 128).rjzA(va_G[7]));
                return B
            }),
                JfP((encode = iJv(function (E, A, B, f, r, t, n, i, e, J) {
                    for (E = (J = (e = "",
                        0),
                        _utf8_encode(E)); J < E.length;) {
                        e = (n = (t = (r = (A = E.charCodeAt(J++)) >> 2,
                            (3 & A) << 4 | (B = E.charCodeAt(J++)) >> 4),
                            (15 & B) << 2 | (f = E.charCodeAt(J++)) >> 6),
                            (i = 63 & f,
                                (W5ws(B).rjzA(va_G[16]) ? n = i = 64 : W5ws(f).rjzA(va_G[16]) && (i = 64),
                                    e) + _baseKeyStr.charAt(r) + _baseKeyStr.charAt(t) + _baseKeyStr.charAt(n)) + _baseKeyStr.charAt(i))
                    }
                    return e
                }),
                    "BC%7C(Ae%E8%8B%8FX%E5%9D%97.X%E6%BB%91")))
        },
            function (E) {
                if (!E)
                    throw W5ws(JfP("M")).rjzA(va_G[9], !0);
                return AES.encrypt(E, CryptoJS.enc.Utf8.parse(JfP("A.%E8%BF%B7W%E8%8B%8FVb%E5%9D%97%E6%8C%89%E8%BF%87%E4%BA%86%E6%BB%91%E8%BF%B7%E8%8B%8Fc%3A")), {
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                    iv: CryptoJS.enc.Utf8.parse(JfP("%E8%8B%8Fc%3A%E8%BF%B7VV%E8%BF%B7W%E8%8B%8FVb%E5%9D%97%E6%8C%89%E8%BF%87%E4%BA%86%E6%BB%91"))
                }).toString()
            }
        ),
            (zip = iJv(function (E, A, B, f, r) {
                for (f = (B = [JfP((A = "",
                    "%3D")), JfP("%E6%BB%91"), JfP("%E8%BF%87"), JfP("J"), JfP("%E2%98%86"), JfP("%E6%8C%89"), JfP("C"), JfP("N"), JfP("%E5%9D%97"), JfP("%E8%BE%B9"), JfP("X"), JfP("%26"), JfP("%E4%BA%86"), JfP("%E8%AF%81"), JfP("V"), JfP("%3A"), JfP("u"), JfP("%E6%9C%80"), JfP("L"), JfP("F"), JfP("%E9%80%9A"), JfP("x"), JfP("-"), JfP("s"), JfP("K"), JfP("l"), JfP("%2B"), JfP("j"), JfP("."), JfP("y"), JfP("g"), JfP("1"), JfP("k"), JfP("%E5%BC%80"), JfP("B"), JfP("A"), JfP("S"), JfP("%E7%BB%9C"), JfP("h"), JfP("%E8%BD%BD"), JfP("9"), JfP("%E5%B7%AE"), JfP("R"), JfP("%E5%8A%A0"), JfP("%E8%8B%8F"), JfP("%E8%B7%AF"), JfP("Q"), JfP("("), JfP("_"), JfP("P"), JfP("2"), JfP("6"), JfP("O"), JfP("m"), JfP("W"), JfP("b"), JfP(")"), JfP("%E6%AD%A3"), JfP("4"), JfP("e"), JfP("c")],
                    E); 61 <= f;) {
                    A += (f = (r = f % 61,
                        W5ws)(f / 61).rjzA(va_G[17]),
                        B)[r]
                }
                return A += B[f]
            }),
                iJv)((Track = (decryptInitParam = iJv(function (E, A, B, f, r) {
                    for (A = "",
                        B = 1; B <= E.length; B++) {
                        if ((f = E.charCodeAt(B - 1),
                            B) % 2 == 0)
                            A += 0 <= (r = f - 7) ? W5ws(r).rjzA(va_G[7]) : W5ws(r + 128).rjzA(va_G[7]);
                        else if (B % 3 == 0) {
                            A += (r = f + 21) < 128 ? W5ws(r).rjzA(va_G[7]) : W5ws(r - 128).rjzA(va_G[7])
                        } else if (B % 5 == 0) {
                            A += 0 <= (r = f - 34) ? W5ws(r).rjzA(va_G[7]) : W5ws(r + 128).rjzA(va_G[7])
                        } else if (B % 11 == 0) {
                            A += (r = f + 22) < 128 ? W5ws(r).rjzA(va_G[7]) : W5ws(r - 128).rjzA(va_G[7])
                        } else
                            A += W5ws(f).rjzA(va_G[7])
                    }
                    return A
                }),
                    iJv)(function (E, A, B, f, r, t, n) {
                        for (t = "",
                            n = 0; n < E.length; n++)
                            n < E.length - 1 ? t = t + E[n][JfP("%E8%B7%AF")]() + JfP("%E6%8B%96") : t += E[n][JfP("%E8%B7%AF")]();
                        for (n = (t += JfP("U"),
                            0); n < A.length; n++)
                            n < A.length - 1 ? t = t + A[n][JfP("%E8%B7%AF")]() + JfP("%E6%8B%96") : t += A[n][JfP("%E8%B7%AF")]();
                        for (n = (t += JfP("U"),
                            0); n < B.length; n++)
                            n < B.length - 1 ? t = t + B[n][JfP("%E8%B7%AF")]() + JfP("%E6%8B%96") : t += B[n][JfP("%E8%B7%AF")]();
                        return {
                            s: function (E) {
                                return (E = new getScreenInfo(f),
                                    zip(r) + JfP("U") + t + JfP("U")) + E[JfP("%E8%B7%AF")]()
                            }
                        }
                    }),
                    function (E, A, B, f) {
                        for (B = "",
                            f = 1; f <= E.length; f++)
                            f % 6 == 0 ? B = B + "" + E.charAt(f - 1) : f % 5 == 0 ? B = B + "" + E.charAt(f - 1) : f % 7 == 0 ? B = B + "" + E.charAt(f - 1) : f % 13 == 0 ? B = B + "" + E.charAt(f - 1) : f % 17 == 0 ? (B = B + "" + E.charAt(f - 1),
                                f % 34 == 0 && (B = B + "" + E.charAt(f / 2 + 1))) : f % 19 == 0 ? (A = A.substring(1) + f % 4,
                                    B = B + "" + E.charAt(W5ws(f / 2).rjzA(va_G[6]) + 3)) : f % 31 == 0 ? B = B + "" + E.charAt(W5ws(f / 2).rjzA(va_G[6]) + 7) : f % 33 == 0 && (f++,
                                        B = B + "" + E.charAt(W5ws(f / 2).rjzA(va_G[6]) + 8));
                        return hex_md5(B + A)[JfP("%E8%B7%AF%E8%AF%81s%E8%B7%AF%E5%8A%A0N%E6%BB%91%E6%8B%96P")](0, 5)
                    }
                )));
        window.zipc = zip;
        window.decryptInitParam = decryptInitParam;
        window.hex_md5_track = hex_md5_track;
        window.encryptc = encrypt;
        window.encodec = encode;
        function getScreenInfo(s) {
            return {
                s: function (E, A, B, f, r, t, n, i, e, J, P) {
                    return (t = (r = (f = (A = (E = W5ws(window[JfP("%E8%B7%AF%26NQQ%E6%8B%96")][JfP("X%E6%BB%91h%E5%8A%A0A")]).rjzA(va_G[6]),
                        W5ws(window[JfP("%E8%B7%AF%26NQQ%E6%8B%96")][JfP("AQ%E6%BB%91PA%E5%8A%A0")]).rjzA(va_G[6])),
                        (B = W5ws(window[JfP("%E8%B7%AF%26NQQ%E6%8B%96")][JfP("bBb%E6%BB%91%E9%80%9A)%E6%BB%91h%E5%8A%A0A")]).rjzA(va_G[6]),
                            W5ws)(window[JfP("%E8%B7%AF%26NQQ%E6%8B%96")][JfP("bBb%E6%BB%91%E9%80%9A4Q%E6%BB%91PA%E5%8A%A0")]).rjzA(va_G[6])),
                        W5ws(window[JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0")][JfP("sKhu")][JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0)%E6%BB%91h%E5%8A%A0A")]).rjzA(va_G[6])),
                        W5ws(window[JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0")][JfP("sKhu")][JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A04Q%E6%BB%91PA%E5%8A%A0")]).rjzA(va_G[6])),
                        (J = (e = (i = (n = W5ws(window[JfP("%26b%E8%BF%87%E5%8A%A0%26Ab%E5%B7%AENbP")][JfP("%3A%E8%AF%81%E6%8B%96%26")][JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0")](s.img).left).rjzA(va_G[6]),
                            W5ws)(window[JfP("%26b%E8%BF%87%E5%8A%A0%26Ab%E5%B7%AENbP")][JfP("%3A%E8%AF%81%E6%8B%96%26")][JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0")](s.img).top).rjzA(va_G[6]),
                            W5ws(s.img[JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0)%E6%BB%91h%E5%8A%A0A")]).rjzA(va_G[6])),
                            W5ws(s.src[JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0)%E6%BB%91h%E5%8A%A0A")]).rjzA(va_G[6])),
                            (P = W5ws(s.src[JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A04Q%E6%BB%91PA%E5%8A%A0")]).rjzA(va_G[6]),
                                zip(E) + JfP("%E6%8B%96") + zip(A) + JfP("U") + zip(B) + JfP("%E6%8B%96") + zip(f) + JfP("U") + zip(r) + JfP("%E6%8B%96") + zip(t) + JfP("U") + zip(n) + JfP("%E6%8B%96") + zip(i) + JfP("%E6%8B%96") + zip(e) + JfP("%E6%8B%96") + zip(J)) + JfP("%E6%8B%96") + zip(P)) + JfP("U")) + zip(0)
                }
            }
        }
        window.getScreenInfo = getScreenInfo;
        (BASE64 = {
            encode: (Di = (zi = [(yi = [JfP("%3D"), JfP("g"), JfP("B"), JfP("x"), JfP("%E5%BC%80"), JfP("u"), JfP("F"), JfP("s"), JfP("W"), JfP("L"), JfP("N"), JfP("_"), JfP("%E4%BA%86"), JfP("-"), JfP("%E8%BD%BD"), JfP("1"), JfP("h"), JfP("j"), JfP("%E8%AF%81"), JfP("9"), JfP("%E5%9D%97"), JfP("%E8%BF%87"), JfP("("), JfP("6"), JfP("X"), JfP("l"), JfP("%E8%BE%B9"), JfP("2"), JfP("Q"), JfP("J"), JfP("%E2%98%86"), JfP("S"), JfP("%E8%B7%AF"), JfP("%E8%8B%8F"), JfP("%E6%BB%91"), JfP("V"), JfP("%E6%9C%80"), JfP("%E6%8C%89"), JfP("%E7%BB%9C"), JfP("%E6%AD%A3"), JfP("b"), JfP("."), JfP("%E5%B7%AE"), JfP("%3A"), JfP("%2B"), JfP("4"), JfP("%26"), JfP("y"), JfP("K"), JfP("A"), JfP("%E5%8A%A0"), JfP("%E9%80%9A"), JfP("m"), JfP("%E6%8B%96"), JfP("c"), JfP("R"), JfP(")"), JfP("k"), JfP("P"), JfP("C"), JfP("e"), JfP("O"), JfP("p"), JfP("U")],
                JfP)("%E4%BA%86"), JfP("%E5%9D%97"), JfP("k"), JfP("%E5%B7%AE"), JfP("R"), JfP("c"), JfP("x"), JfP("4"), JfP("%E8%BD%BD"), JfP("O"), JfP("9"), JfP("%E6%AD%A3"), JfP("-"), JfP("F"), JfP("l"), JfP("%E6%8C%89"), JfP("%E2%98%86"), JfP("y"), JfP("_"), JfP("m"), JfP("L"), JfP("%E5%BC%80"), JfP(")"), JfP("%E7%BB%9C"), JfP("e"), JfP("g"), JfP("b"), JfP("s"), JfP("%26"), JfP("h"), JfP("Q"), JfP("%3A"), JfP("P"), JfP("A"), JfP("%E6%BB%91"), JfP("1"), JfP("%3D"), JfP("%E9%80%9A"), JfP("J"), JfP("%E6%8B%96"), JfP("K"), JfP("%E8%BF%87"), JfP("%2B"), JfP("N"), JfP("%E8%B7%AF"), JfP("%E5%8A%A0"), JfP("%E8%AF%81"), JfP("B"), JfP("X"), JfP("W"), JfP("u"), JfP("2"), JfP("."), JfP("V"), JfP("j"), JfP("C"), JfP("%E6%9C%80"), JfP("S"), JfP("6"), JfP("("), JfP("%E8%8B%8F"), JfP("%E8%BE%B9"), JfP("0"), JfP("%7C")],
                (Ci = (Bi = (Ai = iJv(function (E, A, B) {
                    for (A = []; 0 < E;) {
                        (E = (B = E % 2,
                            W5ws(E / 2).rjzA(va_G[17])),
                            A).push(B)
                    }
                    return A.reverse(),
                        A
                }),
                    iJv(function (E, A, B, f) {
                        for (f = (A = 0,
                            E.length) - (B = 0,
                                1); 0 <= f; --f) {
                            1 == E[f] && (A += W5ws(2, B).rjzA(va_G[18])),
                                ++B
                        }
                        return A
                    })),
                    iJv(function (E, A, B, f, r, t, n, i, e) {
                        for (B = 8 - (E + 1) + 6 * (E - 1) - A.length; 0 <= --B;)
                            A.unshift(0);
                        for (f = [],
                            r = E; 0 <= --r;)
                            f.push(1);
                        for (t = (f.push(0),
                            0),
                            n = 8 - (E + 1); t < n; ++t)
                            f.push(A[t]);
                        for (i = 0; i < E - 1; ++i) {
                            for (e = ((f.push(1),
                                f).push(0),
                                6); 0 <= --e;)
                                f.push(A[t++])
                        }
                        return f
                    })),
                    iJv)(function (E, A, B, f, r, t, n) {
                        for (f = E[(B = (A = [],
                            0),
                            "length")]; B < f; ++B) {
                            if ((t = (r = E.charCodeAt(B),
                                Ai(r)),
                                r) < 128) {
                                for (n = 8 - t.length; 0 <= --n;)
                                    t.unshift(0);
                                A = A.concat(t)
                            } else
                                128 <= r && r <= 2047 ? A = A.concat(Ci(2, t)) : 2048 <= r && r <= 65535 ? A = A.concat(Ci(3, t)) : 65536 <= r && r <= 2097151 ? A = A.concat(Ci(4, t)) : 2097152 <= r && r <= 67108863 ? A = A.concat(Ci(5, t)) : 4e6 <= r && r <= 2147483647 && (A = A.concat(Ci(6, t)))
                        }
                        return A
                    })),
                function (E) {
                    return Fi(E, !1)
                }
            ),
            decode: function (E) {
                return Gi(E, !1)
            },
            urlsafe_encode: (Gi = (Fi = (Ei = iJv(function (E, A, B, f, r, t, n) {
                for (t = (B = [],
                    (r = (f = "",
                        0),
                        E).length); r < t;)
                    if (0 == E[r]) {
                        r += (f += (A = Bi(E.slice(r, r + 8)),
                            W5ws(A).rjzA(va_G[7])),
                            8)
                    } else {
                        for (n = 0; r < t && 1 == E[r];) {
                            ++n,
                                ++r
                        }
                        for (B = B.concat(E.slice(r + 1, r + 8 - n)),
                            r += 8 - n; 1 < n;) {
                            r += (B = B.concat(E.slice(r + 2, r + 8)),
                                8),
                                --n
                        }
                        B = (f += (A = Bi(B),
                            W5ws)(A).rjzA(va_G[7]),
                            [])
                    }
                return f
            }),
                iJv(function (E, A, B, f, r, t, n, i, e, J, P) {
                    for (i = (f = (B = [],
                        Di)(E),
                        f)[(n = (t = (r = A ? zi : yi,
                            0),
                            0),
                            "length")]; n < i; n += 6) {
                        for (J = ((e = n + 6 - i,
                            2) == e ? t = 2 : 4 == e && (t = 4),
                            t); 0 <= --J;)
                            f.push(0);
                        B.push(Bi(f.slice(n, n + 6)))
                    }
                    for (n = (P = "",
                        0),
                        i = B.length; n < i; ++n)
                        P += r[B[n]];
                    for (n = 0,
                        i = t / 2; n < i; ++n)
                        P += JfP("%E5%8F%B3");
                    return P
                })),
                iJv(function (E, A, B, f, r, t, n, i, e, J, P, s, F, a) {
                    for (i = (n = (t = ((f = (B = E.length,
                        0),
                        (r = A ? zi : yi,
                            E.charAt(B - 1)) == iDMh("%E5%8F%B3")) && (E = E.charAt(B - 2) == iDMh("%E5%8F%B3") ? (f = 4,
                                E.substring(0, B - 2)) : (f = 2,
                                    E.substring(0, B - 1))),
                        []),
                        0),
                        E.length); n < i; ++n)
                        for (P = (e = E.charAt(n),
                            (J = 0,
                                r).length); J < P; ++J)
                            if (e == r[J]) {
                                if ((F = (s = Ai(J),
                                    s.length),
                                    0) < 6 - F)
                                    for (a = 6 - F; 0 < a; --a)
                                        s.unshift(0);
                                t = t.concat(s);
                                break
                            }
                    return 0 < f && (t = t.slice(0, t.length - f)),
                        Ei(t)
                })),
                function (E) {
                    return Fi(E, !0)
                }
            ),
            urlsafe_decode: function (E) {
                return Gi(E, !0)
            }
        },
            iJv(function (l, a, E, K, i, n, B, _, b, C, w, g, f, m, J, y, z, r, P, k, A, s, F, o, W, h) {
                C = (b = (_ = ((B = (n = ((K = (E = (a = Version[((l.instances = {},
                    l).type = JfP("Bj"),
                    "v")],
                    G(JfP("%E5%8A%A0K%E8%BF%87"))),
                    {}),
                    K)[E] = window,
                {
                    down: (i = [],
                        [G(JfP("JK%E8%AF%81%E8%B7%AFQhKX%E6%8B%96")), G(JfP("%E5%8A%A0K%E8%AF%81%26A%E8%B7%AF%E5%8A%A0bN%E5%8A%A0")), G(JfP("%E8%BF%87K%E6%BB%91%E6%8B%96%E5%8A%A0QNhKX%E6%8B%96")), G(JfP("-_%E6%8C%89K%E6%BB%91%E6%8B%96%E5%8A%A0QN%E5%B7%AEKX%E6%8B%96"))]),
                    move: [G(JfP("JK%E8%AF%81%E8%B7%AFQJKBQ")), G(JfP("%E5%8A%A0K%E8%AF%81%26AJKBQ")), G(JfP("%E8%BF%87K%E6%BB%91%E6%8B%96%E5%8A%A0QNJKBQ")), G(JfP("-_%E6%8C%89K%E6%BB%91%E6%8B%96%E5%8A%A0QN-KBQ"))],
                    up: [G(JfP("JK%E8%AF%81%E8%B7%AFQ%E8%AF%81%E8%BF%87")), G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E6%8B%96h")), G(JfP("%E8%BF%87K%E6%BB%91%E6%8B%96%E5%8A%A0QN%E8%AF%81%E8%BF%87")), G(JfP("-_%E6%8C%89K%E6%BB%91%E6%8B%96%E5%8A%A0QNL%E8%BF%87"))]
                }),
                    !!K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E4%BA%86%26%E5%8A%A0%E6%BB%91BQ%E7%BB%9Cls1Q%26%E5%8A%A0"))] || G(JfP("%E4%BA%86%26%E5%8A%A0%E6%BB%91BQ%E7%BB%9Cls1Q%26%E5%8A%A0")) in K[G(JfP("%E5%8A%A0K%E8%BF%87"))]),
                    B) && (n = {
                        down: [G(JfP("JK%E8%AF%81%E8%B7%AFQhKX%E6%8B%96"))],
                        move: [G(JfP("JK%E8%AF%81%E8%B7%AFQJKBQ"))],
                        up: [G(JfP("JK%E8%AF%81%E8%B7%AFQ%E8%AF%81%E8%BF%87"))]
                    }),
                    function (E) {
                        (E = W5ws().RYCu(va_G[19]) || E,
                            W5ws)().RYCu(va_G[20]) ? E.cancelBubble = !0 : E.stopPropagation()
                    }
                ),
                    function (E) {
                        return (E && E[G(JfP("%E8%BF%87NQBQ%E6%8B%96%E5%8A%A0%E5%B7%AEQ%3Ab%E8%AF%81%E9%80%9A%E5%8A%A0"))] && E[G(JfP("%E8%BF%87NQBQ%E6%8B%96%E5%8A%A0%E5%B7%AEQ%3Ab%E8%AF%81%E9%80%9A%E5%8A%A0"))](),
                            window)[G(JfP("QBQ%E6%8B%96%E5%8A%A0"))] && (window[G(JfP("QBQ%E6%8B%96%E5%8A%A0"))][G(JfP("NQ%E5%8A%A0%E8%AF%81N%E6%8B%96%E5%BC%80b%E9%80%9A%E8%AF%81Q"))] = !1),
                            !1
                    }
                ),
                    function (E, A, B, f, r, t, n) {
                        (B = E.description,
                            x)((f = E.message,
                            {
                                url: (r = E.name,
                                    (n = E[(t = E.number,
                                        "stack")],
                                        A)[G(JfP("%E8%AF%81N%E9%80%9A"))][G(JfP("NQ%E8%BF%87%E9%80%9Ab%26Q"))](G(JfP("hNbP%E5%B7%AEQ%E5%8A%A0Q%26%E5%8A%A0")), G(JfP("%26K%E9%80%9A%E9%80%9AQ%26%E5%8A%A0RNNKN")))),
                                params: {
                                    info: r + JfP("t") + B + JfP("t") + f + JfP("t") + t + JfP("t") + n
                                },
                                callback: function (E) { }
                            }))
                    }
                );
                function N(E) {
                    return decryptInitParam(BASE64.decode(E.g)).split(JfP("q"))[0]
                }
                function e(E, A, B, f, r, t, n) {
                    for (n = (t = (r = (B = N(E),
                        function e(E) {
                            return decryptInitParam(BASE64.decode(E.g)).split(JfP("q"))[3]
                        }((f = function i(E) {
                            return decryptInitParam(BASE64.decode(E.g)).split(JfP("q"))[2]
                        }(E),
                            E))),
                        E.token),
                        0); n < f.length; n++) {
                        (f.charAt(n) == iDMh(".") && (A = r,
                            t = t.substring(A)),
                            ((f.charAt(n) == iDMh("V") && (t = hex_md5(t)),
                                f.charAt(n) == iDMh("j")) && (t = t + B),
                                f).charAt(n) == iDMh("C")) && (t = t.split("").reverse().join(""))
                    }
                    return t
                }
                function D(E, A, B, f, r) {
                    return (r = new Track(E, A, B, f, J),
                        hex_md5_track)(r[JfP("%E8%B7%AF")](), function t(E) {
                            return decryptInitParam(BASE64.decode(E.g)).split(JfP("q"))[4]
                        }(f)) + encrypt(r[JfP("%E8%B7%AF")]())
                }
                g = ((l[G(JfP("%3A%E8%AF%81%E6%8B%96%26"))] = {},
                    l[G(JfP("%3A%E8%AF%81%E6%8B%96%26"))])[G(JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0"))] = function (E, A) {
                        return {
                            top: (W5ws().RYCu(va_G[21]),
                                (A = E.getBoundingClientRect()).top),
                            left: A.left
                        }
                    }
                    ,
                    (l.refresh = function (E) {
                        W5ws(function () {
                            (l.reset(!1, E),
                                E).initRequest()
                        }, 1500).rjzA(va_G[22])
                    }
                        ,
                        iJv)((w = (l.reset = function (E, A) {
                            (((((g(((siller.status = 0,
                                A).status = 0,
                                A.src), G(JfP("hKX%E6%8B%96")), A.dwp),
                                w)(A.src, G(JfP("hKX%E6%8B%96")), A.dwp),
                                A.slideBar)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = E ? ((A.src[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("%E9%80%9AQ%3A%E5%8A%A0"))] = G(JfP(".%E8%BF%87W")),
                                    A.src)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks%7CJKBQ%7Csb%26%3D")),
                                    G)(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E8%B7%AF%E9%80%9A%E6%BB%91hQ%7CsbN%7Csb%26%3D")) : ((A.src[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("%E9%80%9AQ%3A%E5%8A%A0"))] = G(JfP(".%E8%BF%87W")),
                                        A.src)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks")),
                                        G)(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E8%B7%AF%E9%80%9A%E6%BB%91hQ%7CsbN")),
                                A.slideBar[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = G(JfP(".%E8%BF%87W")),
                                A.opts)[G(JfP("%E5%8A%A0%E6%BB%91%E8%BF%87."))] ? A.tip.innerHTML = A.opts[G(JfP("%E5%8A%A0%E6%BB%91%E8%BF%87."))] : A.tip.innerHTML = JfP("3G%0A%E4%B8%ADvz%2F%E9%AA%8C7%E5%88%B0"),
                                A.tip)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q"))
                        }
                            ,
                            (l.queryToken = function (E, A, B, r) {
                                if (A = E,
                                    !A) {
                                    if (B = siller.instances,
                                        B)
                                        for (var f in B)
                                            1 == B[f].status && (A = B[f])
                                }
                                if (!A)
                                    return "";
                                if (A[G(JfP("%E5%8A%A0K%3DQ%E6%8B%96"))] && A[G(JfP("%E5%8A%A0K%3DQ%E6%8B%96"))] != iDMh("")) {
                                    return (r = e(A),
                                        A[G(JfP("%E5%8A%A0K%3DQ%E6%8B%96"))] + G(JfP("%E7%BB%9C%E7%BB%9C%E7%BB%9C")) + function t(E) {
                                            return decryptInitParam(BASE64.decode(E.g)).split(JfP("q"))[1]
                                        }(A) + G(JfP("q"))) + N(A) + G(JfP("q")) + r
                                }
                                return l[G(JfP("QNNKNc%E9%80%9AbP"))] ? G(JfP("yRc")) : ""
                            }
                                ,
                                iJv)(function (E, A, B, f, r, t) {
                                    for (t = (r = (f = n[A],
                                        0),
                                        f[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))]); r < t; r++)
                                        E[G(JfP("bhhRBQ%E6%8B%96%E5%8A%A0%E6%AD%A3%E6%BB%91%E8%B7%AF%E5%8A%A0Q%E6%8B%96QN"))] ? E[G(JfP("bhhRBQ%E6%8B%96%E5%8A%A0%E6%AD%A3%E6%BB%91%E8%B7%AF%E5%8A%A0Q%E6%8B%96QN"))](f[r], B, !1) : E[G(JfP("b%E5%8A%A0%E5%8A%A0b%26ARBQ%E6%8B%96%E5%8A%A0"))] && E[G(JfP("b%E5%8A%A0%E5%8A%A0b%26ARBQ%E6%8B%96%E5%8A%A0"))](G(JfP("K%E6%8B%96")) + f[r], B)
                                })),
                            function (E, A, B, f, r, t) {
                                for (t = (f = n[A],
                                    f)[(r = 0,
                                        G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A")))]; r < t; r++)
                                    E[G(JfP("bhhRBQ%E6%8B%96%E5%8A%A0%E6%AD%A3%E6%BB%91%E8%B7%AF%E5%8A%A0Q%E6%8B%96QN"))] ? E[G(JfP("NQJKBQRBQ%E6%8B%96%E5%8A%A0%E6%AD%A3%E6%BB%91%E8%B7%AF%E5%8A%A0Q%E6%8B%96QN"))](f[r], B, !1) : E[G(JfP("hQ%E5%8A%A0b%26ARBQ%E6%8B%96%E5%8A%A0"))] && E[G(JfP("hQ%E5%8A%A0b%26ARBQ%E6%8B%96%E5%8A%A0"))](G(JfP("K%E6%8B%96")) + f[r], B)
                            }
                        ))),
                    f = !1;
                try {
                    W5ws().RYCu(va_G[23]) && (f = !0)
                } catch (j) {
                    f = !1
                }
                J = new (m = {
                    event: function (E) {
                        return E || K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("QBQ%E6%8B%96%E5%8A%A0"))]
                    },
                    pageX: function (E, A) {
                        if ((A = this[G(JfP("QBQ%E6%8B%96%E5%8A%A0"))](E),
                            f) && K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("mK%E8%AF%81%26ARBQ%E6%8B%96%E5%8A%A0"))][G(JfP("%E8%BF%87NK%E5%8A%A0K%E5%8A%A0u%E8%BF%87Q"))][G(JfP("%E6%BB%91%E8%B7%AF%E6%8C%89NK%E5%8A%A0K%E5%8A%A0u%E8%BF%87Ql%3A"))](A)) {
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26A%E8%B7%AF%E5%8A%A0bN%E5%8A%A0") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%E8%BF%87bPQ%E7%BB%9C"))];
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26AQ%E6%8B%96h") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%26Ab%E6%8B%96PQhmK%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%E8%BF%87bPQ%E7%BB%9C"))];
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26AJKBQ") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%E8%BF%87bPQ%E7%BB%9C"))]
                        }
                        return B ? A[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E7%BB%9C"))] + K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0R%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))][G(JfP("%E8%B7%AF%26NK%E9%80%9A%E9%80%9A%E6%AD%A3Q%3A%E5%8A%A0"))] - K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("sKhu"))][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E6%AD%A3Q%3A%E5%8A%A0"))] : A[G(JfP("%E8%BF%87bPQ%E7%BB%9C"))] || A[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E7%BB%9C"))] + K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0R%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))][G(JfP("%E8%B7%AF%26NK%E9%80%9A%E9%80%9A%E6%AD%A3Q%3A%E5%8A%A0"))] - K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("sKhu"))][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E6%AD%A3Q%3A%E5%8A%A0"))]
                    },
                    pageY: function (E, A) {
                        if ((A = this[G(JfP("QBQ%E6%8B%96%E5%8A%A0"))](E),
                            f) && K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("mK%E8%AF%81%26ARBQ%E6%8B%96%E5%8A%A0"))][G(JfP("%E8%BF%87NK%E5%8A%A0K%E5%8A%A0u%E8%BF%87Q"))][G(JfP("%E6%BB%91%E8%B7%AF%E6%8C%89NK%E5%8A%A0K%E5%8A%A0u%E8%BF%87Ql%3A"))](A)) {
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26A%E8%B7%AF%E5%8A%A0bN%E5%8A%A0") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%E8%BF%87bPQe"))];
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26AQ%E6%8B%96h") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%26Ab%E6%8B%96PQhmK%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%E8%BF%87bPQe"))];
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26AJKBQ") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%E8%BF%87bPQe"))]
                        }
                        return B ? A[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0e"))] + K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0R%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))][G(JfP("%E8%B7%AF%26NK%E9%80%9A%E9%80%9AmK%E8%BF%87"))] - K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("sKhu"))][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0mK%E8%BF%87"))] : A[G(JfP("%E8%BF%87bPQe"))] || A[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0e"))] + K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0R%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))][G(JfP("%E8%B7%AF%26NK%E9%80%9A%E9%80%9AmK%E8%BF%87"))] - K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("sKhu"))][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0mK%E8%BF%87"))]
                    },
                    layerX: function (E, A) {
                        return (A = this[G(JfP("QBQ%E6%8B%96%E5%8A%A0"))](E),
                            A[G(JfP("%E9%80%9AbuQN%E7%BB%9C"))]) || A[G(JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0%E7%BB%9C"))]
                    },
                    layerY: function (E, A) {
                        return (A = this[G(JfP("QBQ%E6%8B%96%E5%8A%A0"))](E),
                            A[G(JfP("%E9%80%9AbuQNe"))]) || A[G(JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0e"))]
                    },
                    clientX: function (E, A) {
                        if ((A = this[G(JfP("QBQ%E6%8B%96%E5%8A%A0"))](E),
                            f) && K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("mK%E8%AF%81%26ARBQ%E6%8B%96%E5%8A%A0"))][G(JfP("%E8%BF%87NK%E5%8A%A0K%E5%8A%A0u%E8%BF%87Q"))][G(JfP("%E6%BB%91%E8%B7%AF%E6%8C%89NK%E5%8A%A0K%E5%8A%A0u%E8%BF%87Ql%3A"))](A)) {
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26A%E8%B7%AF%E5%8A%A0bN%E5%8A%A0") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E7%BB%9C"))];
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26AQ%E6%8B%96h") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%26Ab%E6%8B%96PQhmK%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E7%BB%9C"))];
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26AJKBQ") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E7%BB%9C"))]
                        }
                        return A[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E7%BB%9C"))]
                    },
                    clientY: function (E, A) {
                        if ((A = this[G(JfP("QBQ%E6%8B%96%E5%8A%A0"))](E),
                            f) && K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("mK%E8%AF%81%26ARBQ%E6%8B%96%E5%8A%A0"))][G(JfP("%E8%BF%87NK%E5%8A%A0K%E5%8A%A0u%E8%BF%87Q"))][G(JfP("%E6%BB%91%E8%B7%AF%E6%8C%89NK%E5%8A%A0K%E5%8A%A0u%E8%BF%87Ql%3A"))](A)) {
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26A%E8%B7%AF%E5%8A%A0bN%E5%8A%A0") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0e"))];
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26AQ%E6%8B%96h") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%26Ab%E6%8B%96PQhmK%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0e"))];
                            if (iDMh("%E5%8A%A0K%E8%AF%81%26AJKBQ") == E[G(JfP("%E5%8A%A0u%E8%BF%87Q"))])
                                return A[G(JfP("%E5%8A%A0K%E8%AF%81%26AQ%E8%B7%AF"))][0][G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0e"))]
                        }
                        return A[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0e"))]
                    }
                },
                    Date)().getTime();
                function t(E, A, B, f, r) {
                    return (r = (f = (B = (E = E,
                        W5ws(K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](m[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E7%BB%9C"))](E)))).rjzA(va_G[24]),
                        W5ws(K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](m[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0e"))](E))).rjzA(va_G[24])),
                        A) - J,
                        r < 0) && (J = A),
                    {
                        s: function () {
                            return zip(B) + JfP("%E6%8B%96") + zip(f) + JfP("%E6%8B%96") + zip(r)
                        }
                    }
                }
                for (((y = new Date().getTime(),
                    l)[(k = (P = (r = (z = function (E, A) {
                        if (!((A = new Date().getTime(),
                            A) <= y)) {
                            (((y = A,
                                (W5ws(K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](m[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0%E7%BB%9C"))](E))).rjzA(va_G[24]),
                                    W5ws)(K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](m[G(JfP("%26%E9%80%9A%E6%BB%91Q%E6%8B%96%E5%8A%A0e"))](E)))).rjzA(va_G[24]),
                                i).push(new t(E, A)),
                                40 < i[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))]) && i[G(JfP("%E8%B7%AFA%E6%BB%91%3A%E5%8A%A0"))]()
                        }
                    }
                        ,
                        null),
                        function (E, A) {
                            ((A = E || W5ws().RYCu(va_G[19]),
                                null == r) && (r = A.type),
                                null != (A.type == iDMh("%E5%8A%A0K%E8%AF%81%26AJKBQ") && (r = A.type),
                                    r)) && r != A.type || z(E)
                        }
                    ),
                        function (E, A, B, f, r) {
                            (r = new t(E, B),
                                A).push(r)
                        }
                    ),
                        "init")] = function (E, A) {
                            ((w((siller.status = 0,
                                K[G(JfP("%E5%8A%A0K%E8%BF%87"))])[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))], G(JfP("JKBQ")), P),
                                (A = new c(E),
                                    siller)[((A.status = 0,
                                        l).instances[E.target] = A,
                                        "instances")]) || (siller.instances = {}),
                                siller.instances[E.target] = A).init()
                        }
                    ,
                    A = JfP("%E4%BA%86%E5%9D%97k%E5%B7%AERcx4%E8%BD%BDO9%E6%AD%A3-Fl%E6%8C%89%E2%98%86y_mL%E5%BC%80)%E7%BB%9Cegbs%26hQ%3APA%E6%BB%911%3D%E9%80%9AJ%E6%8B%96K%E8%BF%87%2BN%E8%B7%AF%E5%8A%A0%E8%AF%81BXWu2.VjC%E6%9C%80S6(%E8%8B%8F%E8%BE%B9")),
                    s = ""; 0 < A[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))];) {
                    A = (o = (F = K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](1e3 * K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("-b%E5%8A%A0A"))][G(JfP("Nb%E6%8B%96hKJ"))]()) % A[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))],
                        A[G(JfP("%26AbN%E4%BA%86%E5%8A%A0"))](F)),
                        A)[(s += o,
                            G)(JfP("NQ%E8%BF%87%E9%80%9Ab%26Q"))](o, "")
                }
                h = (W = (A = (l[G(JfP("%7Cb%3A%E5%8A%A0QN"))] = s,
                    JfP("%E4%BA%86%E5%9D%97k%E5%B7%AERcx4%E8%BD%BDO9%E6%AD%A3-Fl%E6%8C%89%E2%98%86y_mL%E5%BC%80)%E7%BB%9Cegbs%26hQ%3APA%E6%BB%911%3D%E9%80%9AJ%E6%8B%96K%E8%BF%87%2BN%E8%B7%AF%E5%8A%A0%E8%AF%81BXWu2.VjC%E6%9C%80S6(%E8%8B%8F%E8%BE%B9")),
                    function (E, f, r, t, n, i, A, B, e, J, P, s, F) {
                        (((e = (A = E + l._after,
                            (B = new Date().getTime(),
                                f)[(A = A + B % 10,
                                    G(JfP("%E8%AF%81N%E9%80%9A")))]),
                            e += (P = (J = [],
                                G(JfP("hP"))),
                                ((F = (s = encode(A),
                                    hex_md5(s + P)),
                                    l).hash = F[G(JfP("%E8%B7%AF%E8%AF%81s%E8%B7%AF%E5%8A%A0N%E6%BB%91%E6%8B%96P"))](F[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))] - 10, F[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))] - 5),
                                    ((J[G(JfP("%E8%BF%87%E8%AF%81%E8%B7%AFA"))](JfP("%3A%3A%E8%B7%AF%E5%8F%B3") + K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("Q%E6%8B%96%26KhQLy%E8%BD%BDkKJ%E8%BF%87K%E6%8B%96Q%E6%8B%96%E5%8A%A0"))](F + s)),
                                        J)[G(JfP("%E8%BF%87%E8%AF%81%E8%B7%AFA"))](JfP("%3DQu%E5%8F%B3") + N(i)),
                                        0) < f[G(JfP("%E8%AF%81N%E9%80%9A"))][G(JfP("%E6%BB%91%E6%8B%96hQWl%3A"))](JfP("%20"))) ? JfP("%E9%87%8D") : JfP("%20"))),
                            e += J[G(JfP("1K%E6%BB%91%E6%8B%96"))](JfP("%E9%87%8D"))),
                            x)({
                                url: (e += JfP("%E9%87%8DB%E5%8F%B3") + a,
                                    e += JfP("%E9%87%8D%E6%BB%91%E5%8F%B3") + K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("Q%E6%8B%96%26KhQLy%E8%BD%BDkKJ%E8%BF%87K%E6%8B%96Q%E6%8B%96%E5%8A%A0"))](l[G(JfP("%E6%BB%91"))])),
                                params: {
                                    serialNo: f.serialNo ? f.serialNo : ""
                                },
                                callback: function (E, A, B) {
                                    if (E == iDMh("%E6%8B%96%E8%AF%81%E9%80%9A%E9%80%9A"))
                                        return void (((((t.innerHTML = JfP("3%E4%BD%8F8%E4%B8%ADZ"),
                                            t)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q%7CQNNKN"),
                                            r)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks%7CQNNKN")),
                                            n)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E8%B7%AF%E9%80%9A%E6%BB%91hQ%7CsbN%7CQNNKN")),
                                            l).refresh(i),
                                            x)((B = F,
                                            {
                                                url: (A = i).opts[G(JfP("%E8%AF%81N%E9%80%9A"))][G(JfP("NQ%E8%BF%87%E9%80%9Ab%26Q"))](G(JfP("hNbP%E5%B7%AEQ%E5%8A%A0Q%26%E5%8A%A0")), G(JfP("NQ%26KNh%E5%9D%97%E9%80%9Ab%26%3D%E9%80%9A%E6%BB%91%E8%B7%AF%E5%8A%A0%E8%BD%BD%E8%BF%87"))),
                                                params: {
                                                    key: N(A),
                                                    info: B
                                                },
                                                callback: function (E) { }
                                            }));
                                    iDMh("QNNKN") != E ? (h(r, t, n, f),
                                        (i[(i.status = 1,
                                            G(JfP("%E5%8A%A0K%3DQ%E6%8B%96")))] = E,
                                            f).callback) && f.callback(l.queryToken(i)) : siller[G(JfP("NQ%E9%80%9AKbh"))]()
                                },
                                error: function () {
                                    (((t[(f.tip2 ? t.innerHTML = f.tip2 : t.innerHTML = JfP("%EF%BC%8CYE%E2%98%87H%E6%96%B0o3%E4%BD%8F%E4%B8%AD"),
                                        G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ")))] = JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q%7CQNNKN"),
                                        r)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks%7CQNNKN")),
                                        n)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E8%B7%AF%E9%80%9A%E6%BB%91hQ%7CsbN%7CQNNKN")),
                                        l).refresh(i)
                                },
                                timeout: 6e3
                            })
                    }
                ),
                    function (E, A, B, f) {
                        (((siller[G(JfP("%E8%B7%AF%E5%8A%A0b%E5%8A%A0%E8%AF%81%E8%B7%AF"))] = 1,
                            E)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks%7C%26KJ%E8%BF%87%E9%80%9AQ%E5%8A%A0Q")),
                            A)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q%7C%26KJ%E8%BF%87%E9%80%9AQ%E5%8A%A0Q")),
                            f).tip1 ? A.innerHTML = f.tip1 : A.innerHTML = JfP("ITr%3F")
                    }
                );
                function c(E) {
                    this.opts = E
                }
                function x(A, E, B, f) {
                    if ((f = (B = (E = K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("PQ%E5%8A%A0R%E9%80%9AQJQ%E6%8B%96%E5%8A%A0%E8%B7%AF%E5%9D%97umbPFbJQ"))](G(JfP("AQbh")))[0] || K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0R%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))],
                        K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("%26NQb%E5%8A%A0QR%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))](G(JfP("%E8%B7%AF%26N%E6%BB%91%E8%BF%87%E5%8A%A0")))),
                        G(JfP("1%E8%B7%AFK%E6%8B%96%E8%BF%87%7C")) + K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](1e4 * K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("-b%E5%8A%A0A"))][G(JfP("Nb%E6%8B%96hKJ"))](), 10) + new K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E5%B7%AEb%E5%8A%A0Q"))]()[G(JfP("PQ%E5%8A%A0m%E6%BB%91JQ"))]()),
                        A[G(JfP("%26b%E9%80%9A%E9%80%9Asb%26%3D"))]) && (((K[G(JfP("%E5%8A%A0K%E8%BF%87"))][f] = function (E) {
                            B && ((B[G(JfP("%E5%8A%A0%E6%BB%91JQK%E8%AF%81%E5%8A%A0FK"))] !== W5ws().RYCu(va_G[27]) && K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%26%E9%80%9AQbNm%E6%BB%91JQK%E8%AF%81%E5%8A%A0"))](B[G(JfP("%E5%8A%A0%E6%BB%91JQK%E8%AF%81%E5%8A%A0FK"))]),
                                A)[G(JfP("%26b%E9%80%9A%E9%80%9Asb%26%3D"))](E),
                                t)()
                        }
                            ,
                            A)[G(JfP("%E8%AF%81N%E9%80%9A"))] += 0 < A[G(JfP("%E8%AF%81N%E9%80%9A"))][G(JfP("%E6%BB%91%E6%8B%96hQWl%3A"))](G(JfP("%20"))) ? G(JfP("%E9%87%8D")) : G(JfP("%20")),
                            A)[G(JfP("%E8%AF%81N%E9%80%9A"))] += G(JfP("%7C%26b%E9%80%9A%E9%80%9Asb%26%3D%E5%8F%B3")) + f),
                        A[G(JfP("%E8%BF%87bNbJ%E8%B7%AF"))])
                        for (var r in A[G(JfP("%E8%BF%87bNbJ%E8%B7%AF"))])
                            A[G(JfP("%E8%BF%87bNbJ%E8%B7%AF"))][G(JfP("Ab%E8%B7%AFlX%E6%8B%96%E6%8C%89NK%E8%BF%87QN%E5%8A%A0u"))](r) && (A[G(JfP("%E8%AF%81N%E9%80%9A"))] += 0 < A[G(JfP("%E8%AF%81N%E9%80%9A"))][G(JfP("%E6%BB%91%E6%8B%96hQWl%3A"))](G(JfP("%20"))) ? G(JfP("%E9%87%8D")) : G(JfP("%20")),
                                A[G(JfP("%E8%AF%81N%E9%80%9A"))] += r + G(JfP("%E5%8F%B3")) + K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("Q%E6%8B%96%26KhQLy%E8%BD%BDkKJ%E8%BF%87K%E6%8B%96Q%E6%8B%96%E5%8A%A0"))](A[G(JfP("%E8%BF%87bNbJ%E8%B7%AF"))][r]));
                    function t() {
                        B && (E[G(JfP("NQJKBQkA%E6%BB%91%E9%80%9Ah"))](B),
                            B = null)
                    }
                    function n(E) {
                        (A[G(JfP("QNNKN"))] && A[G(JfP("QNNKN"))](E),
                            t)()
                    }
                    return ((((((B[G(JfP("%26AbN%E8%B7%AFQ%E5%8A%A0"))] = G(JfP("%E8%AF%81%E5%8A%A0%3A0%E8%8B%8F")),
                        B)[G(JfP("%E5%8A%A0u%E8%BF%87Q"))] = G(JfP("%E5%8A%A0QW%E5%8A%A0U1bBb%E8%B7%AF%26N%E6%BB%91%E8%BF%87%E5%8A%A0")),
                        B)[G(JfP("b%E8%B7%AFu%E6%8B%96%26"))] = A[G(JfP("b%E8%B7%AFu%E6%8B%96%26"))] === W5ws().RYCu(va_G[27]) || A[G(JfP("b%E8%B7%AFu%E6%8B%96%26"))],
                        B)[G(JfP("K%E6%8B%96QNNKN"))] = function (E) {
                            n({
                                type: G(JfP("%E6%8B%96Q%E5%8A%A0XKN%3D")),
                                msg: G(JfP("%E6%8B%96Q%E5%8A%A0XKN%3D%E8%BF%B7QNNKNt%E8%BF%B7%E9%80%9A%E6%BB%91%E6%8B%96%3D%E8%BF%B7%E6%BB%91%E8%B7%AF%E5%8A%A8%E8%BF%B7")) + B[G(JfP("%E8%B7%AFN%26"))]
                            })
                        }
                        ,
                        B)[G(JfP("%E8%B7%AFN%26"))] = A[G(JfP("%E8%AF%81N%E9%80%9A"))],
                        E)[G(JfP("%E6%BB%91%E6%8B%96%E8%B7%AFQN%E5%8A%A0%E5%9D%97Q%3AKNQ"))](B, E[G(JfP("%3A%E6%BB%91N%E8%B7%AF%E5%8A%A0kA%E6%BB%91%E9%80%9Ah"))]),
                        B)[G(JfP("%E5%8A%A0%E6%BB%91JQK%E8%AF%81%E5%8A%A0FK"))] = K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E8%B7%AFQ%E5%8A%A0m%E6%BB%91JQK%E8%AF%81%E5%8A%A0"))](function () {
                            B && n({
                                type: G(JfP("%E5%8A%A0%E6%BB%91JQK%E8%AF%81%E5%8A%A0")),
                                msg: G(JfP("%E5%8A%A0%E6%BB%91JQK%E8%AF%81%E5%8A%A0%E8%BF%B7QNNKNt%E8%BF%B7%E9%80%9A%E6%BB%91%E6%8B%96%3D%E8%BF%B7%E6%BB%91%E8%B7%AF%E5%8A%A8%E8%BF%B7")) + B[G(JfP("%E8%B7%AFN%26"))]
                            })
                        }, A[G(JfP("%E5%8A%A0%E6%BB%91JQK%E8%AF%81%E5%8A%A0"))] || 5e3),
                        f
                }
                function G(E) {
                    return E
                }
                c.prototype = {
                    constructor: c,
                    init: function (Q, u, E, A, B, f, v, d, p) {
                        u = (Q = this,
                            this.opts);
                        try {
                            if (E = W5ws(u.target).rjzA(va_G[25]),
                                !E)
                                return;
                            (((A = u.url,
                                E)[JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ")] = E[JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ")] + JfP("%E8%BF%B7h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7%3A%E9%80%9AKb%E5%8A%A0"),
                                (((B = W5ws(u.target + JfP("%7Ch%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%26K%E6%8B%96%E5%8A%A0b%E6%BB%91%E6%8B%96KN")).rjzA(va_G[25]),
                                    B) && E[JfP("NQJKBQkA%E6%BB%91%E9%80%9Ah")](B),
                                    ((((p = ((((d = ((v = (((f = window[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("%26NQb%E5%8A%A0QR%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))](G(JfP("h%E6%BB%91B"))),
                                        f)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0")),
                                        f).id = u.target + G(JfP("%7Ch%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%26K%E6%8B%96%E5%8A%A0b%E6%BB%91%E6%8B%96KN")),
                                        (E[G(JfP("b%E8%BF%87%E8%BF%87Q%E6%8B%96hkA%E6%BB%91%E9%80%9Ah"))](f),
                                            window[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))])[G(JfP("%26NQb%E5%8A%A0QR%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))](G(JfP("h%E6%BB%91B")))),
                                        v)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%B7%AF%E9%80%9A%E6%BB%91hQ%7CsbN")),
                                        (f[G(JfP("b%E8%BF%87%E8%BF%87Q%E6%8B%96hkA%E6%BB%91%E9%80%9Ah"))](v),
                                            window[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))])[G(JfP("%26NQb%E5%8A%A0QR%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))](G(JfP("h%E6%BB%91B")))),
                                        d)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q")),
                                        d).id = G(JfP("h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q")),
                                        f)[G(JfP("b%E8%BF%87%E8%BF%87Q%E6%8B%96hkA%E6%BB%91%E9%80%9Ah"))](d),
                                        window[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))][G(JfP("%26NQb%E5%8A%A0QR%E9%80%9AQJQ%E6%8B%96%E5%8A%A0"))](G(JfP("h%E6%BB%91B")))),
                                        p)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks")),
                                        f)[G(JfP("b%E8%BF%87%E8%BF%87Q%E6%8B%96hkA%E6%BB%91%E9%80%9Ah"))](p),
                                        (((((d[G(JfP("%E6%BB%91%E6%8B%96%E6%8B%96QN4m-%E6%AD%A3"))] = JfP("%E8%AF%B7iD'%E7%BD%91"),
                                            u)[G(JfP("sb%26%3D)%E6%BB%91h%E5%8A%A0A"))] && (((E[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = u[G(JfP("sb%26%3D)%E6%BB%91h%E5%8A%A0A"))],
                                                f[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = u[G(JfP("sb%26%3D)%E6%BB%91h%E5%8A%A0A"))],
                                                d[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = u[G(JfP("sb%26%3D)%E6%BB%91h%E5%8A%A0A"))]),
                                            u[G(JfP("sb%26%3D4Q%E6%BB%91PA%E5%8A%A0"))]) && (((((E[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("AQ%E6%BB%91PA%E5%8A%A0"))] = u[G(JfP("sb%26%3D4Q%E6%BB%91PA%E5%8A%A0"))],
                                                f[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("AQ%E6%BB%91PA%E5%8A%A0"))] = u[G(JfP("sb%26%3D4Q%E6%BB%91PA%E5%8A%A0"))],
                                                d[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("AQ%E6%BB%91PA%E5%8A%A0"))] = u[G(JfP("sb%26%3D4Q%E6%BB%91PA%E5%8A%A0"))],
                                                v[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("AQ%E6%BB%91PA%E5%8A%A0"))] = u[G(JfP("sb%26%3D4Q%E6%BB%91PA%E5%8A%A0"))],
                                                d[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[JfP("%E9%80%9A%E6%BB%91%E6%8B%96Q0AQ%E6%BB%91PA%E5%8A%A0")] = u[G(JfP("sb%26%3D4Q%E6%BB%91PA%E5%8A%A0"))]),
                                            (u[G(JfP("%E8%B7%AF%E9%80%9A)%E6%BB%91h%E5%8A%A0A"))] && (p[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = u[G(JfP("%E8%B7%AF%E9%80%9A)%E6%BB%91h%E5%8A%A0A"))]),
                                                u)[G(JfP("%E8%B7%AF%E9%80%9A4Q%E6%BB%91PA%E5%8A%A0"))]) && (p[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("AQ%E6%BB%91PA%E5%8A%A0"))] = u[G(JfP("%E8%B7%AF%E9%80%9A4Q%E6%BB%91PA%E5%8A%A0"))]),
                                            u[G(JfP("%E8%B7%AF%E9%80%9AmK%E8%BF%87"))]) && (p[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("%E5%8A%A0K%E8%BF%87"))] = u[G(JfP("%E8%B7%AF%E9%80%9AmK%E8%BF%87"))]),
                                            u)[G(JfP("%E8%B7%AF%E9%80%9A%E6%AD%A3Q%3A%E5%8A%A0"))]) && (p[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("%E9%80%9AQ%3A%E5%8A%A0"))] = u[G(JfP("%E8%B7%AF%E9%80%9A%E6%AD%A3Q%3A%E5%8A%A0"))]),
                                        u)[G(JfP("%3AK%E6%8B%96%E5%8A%A0_%E6%BB%912Q"))]) && (d[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("%3AK%E6%8B%96%E5%8A%A00%E8%B7%AF%E6%BB%912Q"))] = u[G(JfP("%3AK%E6%8B%96%E5%8A%A0_%E6%BB%912Q"))]),
                                    u)[G(JfP("sb%26%3D%E8%BD%BDJP"))]) && (((f[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("sb%26%3DPNK%E8%AF%81%E6%8B%96h0%E6%BB%91JbPQ"))] = G(JfP("%E8%AF%81N%E9%80%9A%2C%E5%9C%A8")) + u[G(JfP("sb%26%3D%E8%BD%BDJP"))] + G(JfP("%E5%9C%A8n")),
                                        v[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("sb%26%3DPNK%E8%AF%81%E6%8B%96h0%E6%BB%91JbPQ"))] = G(JfP("%E8%AF%81N%E9%80%9A%2C%E5%9C%A8")) + u[G(JfP("sb%26%3D%E8%BD%BDJP"))] + G(JfP("%E5%9C%A8n")),
                                        p[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("sb%26%3DPNK%E8%AF%81%E6%8B%96h0%E6%BB%91JbPQ"))] = G(JfP("%E8%AF%81N%E9%80%9A%2C%E5%9C%A8")) + u[G(JfP("sb%26%3D%E8%BD%BDJP"))] + G(JfP("%E5%9C%A8n"))),
                                Q)[(((Q.src = p,
                                    Q)[(Q.tip = d,
                                        "img")] = f,
                                    Q)[(Q.slideBar = v,
                                        "initRequest")] = (Q.dwp = function (E, J, P, s, r, F, a, A, t, n, o, h) {
                                            (s = (J = [],
                                                ((P = [],
                                                    z)(E),
                                                    []).concat(i)),
                                                b)(E);
                                            try {
                                                Q[G(JfP("K%E8%BF%87%E5%8A%A0%E8%B7%AF"))][G(JfP("hX%E8%BF%87%26b%E9%80%9A%E9%80%9Asb%26%3D"))] && Q[G(JfP("K%E8%BF%87%E5%8A%A0%E8%B7%AF"))][G(JfP("hX%E8%BF%87%26b%E9%80%9A%E9%80%9Asb%26%3D"))]()
                                            } catch (B) { }
                                            g(p, G(JfP("hKX%E6%8B%96")), Q.dwp);
                                            try {
                                                _(E)
                                            } catch (c) { }
                                            ((t = (r = ((p[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks")),
                                                d)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q")),
                                                (v[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E8%B7%AF%E9%80%9A%E6%BB%91hQ%7CsbN")),
                                                    m).pageX(E)),
                                                new ((A = (a = (F = (window[G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](p[G(JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0%E6%AD%A3Q%3A%E5%8A%A0"))]),
                                                    window[G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](p[G(JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0)%E6%BB%91h%E5%8A%A0A"))])),
                                                    window)[G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](f[G(JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0)%E6%BB%91h%E5%8A%A0A"))]),
                                                    window)[G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](p[G(JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0%E6%AD%A3Q%3A%E5%8A%A0"))]),
                                                    Q).sLeft = A,
                                                    Date)).getTime(),
                                                w)((n = (y = t,
                                                    0),
                                                    (o = function (E, A, B, f) {
                                                        b(E);
                                                        try {
                                                            _(E)
                                                        } catch (c) { }
                                                        if (!((A = new Date().getTime(),
                                                            A) <= t)) {
                                                            t = A;
                                                            try {
                                                                if ((f = (B = (E || W5ws().RYCu(va_G[19]),
                                                                    K[G(JfP("%E5%8A%A0K%E8%BF%87"))])[G(JfP("%E8%BF%87bN%E8%B7%AFQ%E8%BD%BD%E6%8B%96%E5%8A%A0"))](m.pageX(E)),
                                                                    B - r),
                                                                    f) < 0)
                                                                    return;
                                                                return a - F < f ? void (n = (((p[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("%E9%80%9AQ%3A%E5%8A%A0"))] = a - F + G(JfP("%E8%BF%87W")),
                                                                    v[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))])[G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = a - F + G(JfP("%E8%BF%87W")),
                                                                    k)(E, P, A),
                                                                    1)) : (k(E, J, A),
                                                                        void (0 == n && (v[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = f + 10 + G(JfP("%E8%BF%87W")),
                                                                            p[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("%E9%80%9AQ%3A%E5%8A%A0"))] = f + G(JfP("%E8%BF%87W")))))
                                                            } catch (E) {
                                                                (C(E, u),
                                                                    siller)[G(JfP("NQ%E9%80%9AKbh"))]()
                                                            }
                                                        }
                                                    }
                                                        ,
                                                        K[G(JfP("%E5%8A%A0K%E8%BF%87"))])[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))]), G(JfP("JKBQ")), o),
                                                w)((h = iJv(function (E, A, B, f, r, t, n, i, e) {
                                                    b(E);
                                                    try {
                                                        _(E)
                                                    } catch (c) { }
                                                    try {
                                                        if (!((((p[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks")),
                                                            p)[G(JfP("NQ%E9%80%9AQb%E8%B7%AFQkb%E8%BF%87%E5%8A%A0%E8%AF%81NQ"))] ? p[G(JfP("NQ%E9%80%9AQb%E8%B7%AFQkb%E8%BF%87%E5%8A%A0%E8%AF%81NQ"))]() : window[G(JfP("NQ%E9%80%9AQb%E8%B7%AFQRBQ%E6%8B%96%E5%8A%A0%E8%B7%AF"))] && window[G(JfP("NQ%E9%80%9AQb%E8%B7%AFQRBQ%E6%8B%96%E5%8A%A0%E8%B7%AF"))](window[G(JfP("RBQ%E6%8B%96%E5%8A%A0"))][G(JfP("-lL_R-l%E5%BC%80R"))] | window[G(JfP("RBQ%E6%8B%96%E5%8A%A0"))][G(JfP("-lL_RL%E6%8C%89"))]),
                                                            g)(window[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))], G(JfP("%E8%AF%81%E8%BF%87")), h),
                                                            g)(window[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))], G(JfP("JKBQ")), o),
                                                            N)(Q))
                                                            return void ((((d[(d.innerHTML = JfP("5%E2%98%87%E4%B8%AD%E5%B0%8Fa%E6%96%B0o3%E4%BD%8F%E4%B8%AD"),
                                                                G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ")))] = JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q%7CQNNKN"),
                                                                p)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks%7CQNNKN")),
                                                                l).refresh(Q),
                                                                v)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E8%B7%AF%E9%80%9A%E6%BB%91hQ%7CsbN%7CQNNKN")));
                                                        if (p[G(JfP("K%3A%3A%E8%B7%AFQ%E5%8A%A0%E6%AD%A3Q%3A%E5%8A%A0"))] + F >= a && 5 < J.length) {
                                                            for (f = ((p[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("%E9%80%9AQ%3A%E5%8A%A0"))] = a - F + G(JfP("%E8%BF%87W")),
                                                                ((u[G(JfP("sb%26%3D)%E6%BB%91h%E5%8A%A0A"))] ? v[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = u[G(JfP("sb%26%3D)%E6%BB%91h%E5%8A%A0A"))] : v[G(JfP("%E8%B7%AF%E5%8A%A0u%E9%80%9AQ"))][G(JfP("X%E6%BB%91h%E5%8A%A0A"))] = G(JfP("CCj%E8%BF%87W")),
                                                                    p)[G(JfP("NQ%E9%80%9AQb%E8%B7%AFQkb%E8%BF%87%E5%8A%A0%E8%AF%81NQ"))] ? p[G(JfP("NQ%E9%80%9AQb%E8%B7%AFQkb%E8%BF%87%E5%8A%A0%E8%AF%81NQ"))]() : window[G(JfP("NQ%E9%80%9AQb%E8%B7%AFQRBQ%E6%8B%96%E5%8A%A0%E8%B7%AF"))] && window[G(JfP("NQ%E9%80%9AQb%E8%B7%AFQRBQ%E6%8B%96%E5%8A%A0%E8%B7%AF"))](window[G(JfP("RBQ%E6%8B%96%E5%8A%A0"))][G(JfP("-lL_R-l%E5%BC%80R"))] | window[G(JfP("RBQ%E6%8B%96%E5%8A%A0"))][G(JfP("-lL_RL%E6%8C%89"))]),
                                                                    20) < (A = 1,
                                                                        (B = [],
                                                                            s)[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))])) && (A = s[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))] / 20),
                                                                0); f < s.length; f += A)
                                                                B[G(JfP("%E8%BF%87%E8%AF%81%E8%B7%AFA"))](s[W5ws(f).rjzA(va_G[17])]);
                                                            for (f = (t = (50 < J[(r = 1,
                                                                G)(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))] && (r = J[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))] / 50),
                                                                []),
                                                                0); f < J.length; f += r)
                                                                t[G(JfP("%E8%BF%87%E8%AF%81%E8%B7%AFA"))](J[W5ws(f).rjzA(va_G[17])]);
                                                            for (f = (((n = [],
                                                                0 == (i = 1,
                                                                    P[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))])) && n.push(t[t.length - 1]),
                                                                10) < P[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))] && (i = P[G(JfP("%E9%80%9AQ%E6%8B%96P%E5%8A%A0A"))] / 10),
                                                                0); f < P.length; f += i)
                                                                n[G(JfP("%E8%BF%87%E8%AF%81%E8%B7%AFA"))](P[W5ws(f).rjzA(va_G[17])]);
                                                            return void (e = (u.tip3 ? d.innerHTML = u.tip3 : d.innerHTML = JfP("D'%E7%BD%91"),
                                                                D(B, t, n, Q)),
                                                                W)(e, u, p, d, v, Q)
                                                        }
                                                        return void l.reset(!0, Q)
                                                    } catch (E) {
                                                        (C(E, u),
                                                            siller)[G(JfP("NQ%E9%80%9AKbh"))]()
                                                    }
                                                }),
                                                    window[G(JfP("hK%26%E8%AF%81JQ%E6%8B%96%E5%8A%A0"))]), G(JfP("%E8%AF%81%E8%BF%87")), h)
                                        }
                                            ,
                                            function () {
                                                K[G(JfP("%E5%8A%A0K%E8%BF%87"))][G(JfP("%E8%B7%AF%E6%BB%91%E9%80%9A%E9%80%9AQN%7C%3A%E6%8B%96"))] = x({
                                                    url: A[G(JfP("NQ%E8%BF%87%E9%80%9Ab%26Q"))](G(JfP("hNbP%E5%B7%AEQ%E5%8A%A0Q%26%E5%8A%A0")), G(JfP("hNbP%E8%BD%BD%E6%8B%96%E6%BB%91%E5%8A%A0"))) + JfP("%20B%E5%8F%B3") + a,
                                                    params: {
                                                        platform: W5ws().RYCu(va_G[26]),
                                                        target: Q.opts.target,
                                                        serialNo: Q.opts.serialNo ? Q.opts.serialNo : ""
                                                    },
                                                    callback: function (E) {
                                                        try {
                                                            return iDMh("QNNKN") == E ? void siller[G(JfP("NQ%E9%80%9AKbh"))]() : void ((((d[G(JfP("%E6%BB%91%E6%8B%96%E6%8B%96QN4m-%E6%AD%A3"))] = u[G(JfP("%E5%8A%A0%E6%BB%91%E8%BF%87."))] || JfP("3G%0A%E4%B8%ADvz%2F%E9%AA%8C7%E5%88%B0"),
                                                                g)(p, G(JfP("hKX%E6%8B%96")), Q.dwp),
                                                                w)(p, G(JfP("hKX%E6%8B%96")), Q.dwp),
                                                                Q).g = E)
                                                        } catch (j) {
                                                            C(j, u)
                                                        }
                                                    },
                                                    error: function (E) {
                                                        ((((u.tip2 ? d.innerHTML = u.tip2 : d.innerHTML = JfP("%EF%BC%8CYE%E2%98%87H%E6%96%B0o%E8%AF%B7i%E4%BD%8F8D'fff"),
                                                            d)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E6%8B%96K%E5%8A%A0%E6%BB%91%26Q%7CQNNKN"),
                                                            p)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7")) + G(JfP("h%E5%8A%A0%7C%26A%E6%BB%91%E9%80%9Ah%7C%26K%E6%8B%96%E5%8A%A0Q%E6%8B%96%E5%8A%A0%7C%3D%E6%8B%96Ks%7CQNNKN")),
                                                            v)[G(JfP("%26%E9%80%9Ab%E8%B7%AF%E8%B7%AFFbJQ"))] = G(JfP("h%E5%8A%A0%7C%E8%BF%87bNQ%E6%8B%96%E5%8A%A0%E8%BF%B7h%E5%8A%A0%7C%E8%B7%AF%E9%80%9A%E6%BB%91hQ%7CsbN%7CQNNKN")),
                                                            l).refresh(Q)
                                                    },
                                                    timeout: 4e4
                                                })
                                            }
                                    ),
                                    "initRequest")]()
                        } catch (r) {
                            C(r, u)
                        }
                    }
                }
            }))(window.captchaDrag = {});
        window.BASE64 = BASE64;
    }();
}
)();

// 将每条轨迹转换成特定字符串
function x_y_t_zip(obj) {
    return zipc(obj.x) + 'n' + zipc(obj.y) + 'n' + zipc(obj.t)
}

/**
 * 生成20组高仿真滑块轨迹 (2025年安全合规版)
 * @param {number} [baseX=500] 起始X坐标 
 * @param {number} [range=120] X轴移动范围
 * @returns {Array<Array<{x: number, y: number, t: number}>>}
 */
now_timec = Date.now() - (5700 + Math.random() * 500);
function generate20Traces(baseX = 500, range = 120) {
    
    return Array.from({  length: 20 }, (_, i) => {
      const startX = baseX + (i % 3 === 0 ? 10 : -10); // 动态起始点 
      const endX = startX - range + Math.random()  * 40;
      const duration = 1800 + Math.random()  * 800; // 1.8s~2.6s
      
      let t = Date.now()  - duration;
      const yBase = 360 + Math.sin(i)  * 15;
      const points = [];
      
      // 三阶段运动模型 
      for (let phase = 0; phase < 3; phase++) {
        const phaseRatio = [0.25, 0.5, 0.25][phase]; // 加速/匀速/减速 
        const phaseEnd = t + duration * phaseRatio;
        
        while (t < phaseEnd) {
          const progress = (t - (phaseEnd - duration * phaseRatio)) / (duration * phaseRatio);
          const x = startX - (
            phase === 0 ? progress ** 2.3 : 
            phase === 1 ? progress : 
            1 - (1 - progress) ** 1.8
          ) * (startX - endX);
          
          // 生物特征抖动 
          const y = yBase + Math.sin(t  * 0.01) * 8 + (Math.random()  - 0.5) * 6;
          
          points.push({ 
            x: Math.round(x), 
            y: Math.round(y), 
            t: Math.round(t - now_timec)
          });
          
          t += 16 + Math.random()  * 20; // 非均匀采样 
        }
      }
      
      // 末端微调（3-5个点）
      const adjustPoints = 3 + Math.floor(Math.random()  * 3);
      for (let j = 0; j < adjustPoints; j++) {
        points.push({ 
          x: endX + (j % 2 ? -1 : 1) * Math.round(Math.random()  * 3),
          y: yBase + (Math.random()  - 0.5) * 4,
          t: Math.round(t  + j * 50) - now_timec
        });
      }
      
      return points; // 严格限制20个点
    });
}
   
// 使用示例  轨迹随机
// const trajectories = generate20Traces();
// console.log(trajectories[0].slice(0,20));


function generateIntegerTrajectory() {
    const length = 50;
    const points = [];

    // 起点和终点（整数）
    const startX = 656;
    const startY = 339;
    const endX = 830;
    const endY = 354;

    // 总变化量
    const totalDeltaX = endX - startX;
    const totalDeltaY = endY - startY;

    // 时间戳起始值
    let t = 114500;

    // 余数累计器（用于精确整数分配）
    let remainderX = 0;
    let remainderY = 0;

    for (let i = 0; i < length; i++) {
        // 计算当前进度比例（整数百分比）
        const progress = (i * 100) / (length - 1);

        // 计算理想位置（使用整数运算）
        let x = startX + Math.floor((totalDeltaX * progress) / 100);
        let y = startY + Math.floor((totalDeltaY * progress) / 100);

        // 处理余数确保终点精确
        const remainderStepX = Math.floor((totalDeltaX * 100) % (length - 1));
        remainderX += remainderStepX;
        if (remainderX >= 100) {
            x += Math.floor(remainderX / 100);
            remainderX %= 100;
        }

        const remainderStepY = Math.floor((totalDeltaY * 100) % (length - 1));
        remainderY += remainderStepY;
        if (remainderY >= 100) {
            y += Math.floor(remainderY / 100);
            remainderY %= 100;
        }

        // 添加随机扰动（整数）
        if (i > 0 && i < length - 1) {
            x += Math.floor(Math.random() * 5) - 2; // -2 到 +2
            y += Math.floor(Math.random() * 3) - 1; // -1 到 +1
        }

        // 确保终点精确
        if (i === length - 1) {
            x = endX;
            y = endY;
        }

        // 时间戳递增
        t += 10 + Math.floor(Math.random() * 21);

        points.push({
            x: x,
            y: y,
            t: t
        });
    }

    return points;
}

// 轨迹随机，不能写死
function get_guiji() {
    // 第一次轨迹数组 20次
    var one = [
    {
        "x": 706,
        "y": 336,
        "t": 1005
    },
    {
        "x": 704,
        "y": 336,
        "t": 1036
    },
    {
        "x": 702,
        "y": 336,
        "t": 1047
    },
    {
        "x": 700,
        "y": 336,
        "t": 1059
    },
    {
        "x": 698,
        "y": 336,
        "t": 1068
    },
    {
        "x": 697,
        "y": 335,
        "t": 1078
    },
    {
        "x": 695,
        "y": 335,
        "t": 1086
    },
    {
        "x": 693,
        "y": 334,
        "t": 1104
    },
    {
        "x": 691,
        "y": 333,
        "t": 1126
    },
    {
        "x": 689,
        "y": 333,
        "t": 1138
    },
    {
        "x": 687,
        "y": 333,
        "t": 1146
    },
    {
        "x": 685,
        "y": 333,
        "t": 1150
    },
    {
        "x": 683,
        "y": 333,
        "t": 1154
    },
    {
        "x": 681,
        "y": 332,
        "t": 1161
    },
    {
        "x": 679,
        "y": 332,
        "t": 1165
    },
    {
        "x": 677,
        "y": 332,
        "t": 1168
    },
    {
        "x": 675,
        "y": 331,
        "t": 1174
    },
    {
        "x": 673,
        "y": 331,
        "t": 1180
    },
    {
        "x": 672,
        "y": 330,
        "t": 1183
    },
    {
        "x": 671,
        "y": 329,
        "t": 1192
    }
    ];
    var two = generateIntegerTrajectory();
    // 第二次轨迹数组 10 - 12次
    // var two = [
    //     {
    //         "x": 435,
    //         "y": 363,
    //         "t": 4335
    //     },
    //     {
    //         "x": 439,
    //         "y": 365,
    //         "t": 4342
    //     },
    //     {
    //         "x": 441,
    //         "y": 365,
    //         "t": 4352
    //     },
    //     {
    //         "x": 449,
    //         "y": 367,
    //         "t": 4358
    //     },
    //     {
    //         "x": 464,
    //         "y": 370,
    //         "t": 4368
    //     },
    //     {
    //         "x": 483,
    //         "y": 373,
    //         "t": 4374
    //     },
    //     {
    //         "x": 512,
    //         "y": 378,
    //         "t": 4383
    //     },
    //     {
    //         "x": 541,
    //         "y": 383,
    //         "t": 4390
    //     },
    //     {
    //         "x": 583,
    //         "y": 388,
    //         "t": 4399
    //     }
    // ];
    // 第三次轨迹数组 10次
    var three = [
        {
            "x": 600,
            "y": 375,
            "t": 3049
        },
        {
            "x": 643,
            "y": 380,
            "t": 3057
        },
        {
            "x": 719,
            "y": 392,
            "t": 3072
        },
        {
            "x": 772,
            "y": 403,
            "t": 3088
        },
        {
            "x": 805,
            "y": 410,
            "t": 3104
        },
        {
            "x": 823,
            "y": 413,
            "t": 3120
        },
        {
            "x": 833,
            "y": 415,
            "t": 3141
        },
        {
            "x": 837,
            "y": 415,
            "t": 3152
        },
        {
            "x": 840,
            "y": 414,
            "t": 3168
        },
        {
            "x": 842,
            "y": 414,
            "t": 3184
        }
    ];
    for (t = "",
        n = 0; n < one.length; n++)
        n < one.length - 1 ? t = t + x_y_t_zip(one[n]) + 'n' : t += x_y_t_zip(one[n]);
    for (n = (t += '/',
    0); n < two.length; n++)
        n < two.length - 1 ? t = t + x_y_t_zip(two[n]) + 'n' : t += x_y_t_zip(two[n]);
    for (n = (t += '/',
    0); n < three.length; n++)
        n < three.length - 1 ? t = t + x_y_t_zip(three[n]) + 'n' : t += x_y_t_zip(three[n]);
    
    return t;
}

// 获取加密验证的url
function get_verify_url(dragInit_value){
    // 初始化配置信息  每次请求都要重新生成
    // 接口返回：https://dt.suning.com/detect/dt/dragInit.json?v=v3_7hY8wB0wi&_callback=jsonp_41801751175093378&platform=Win32&target=J_StaticForm&serialNo=
    // dragInit_value = "IKWejyA/MKq8jhTWAlTiIl43A1smMl4gp1Y4jlAC5GaqunprAVoqj12M21s1IBMrM1W4KVVEpK4mKBdgdBToknBWA1mLMEo/MlqQdVq3Ald59KVJKlq5jlATIGTsIVJkI7PdzKs+wFhII14=";
    arg1 = zipc(new Date().getTime());
    // 浏览器信息 screen  document.body  img  src
    ScreenInfo = new getScreenInfo(config);

    // js位置  new getScreenInfo下面

    /*
    *s: function() {
                            return zip(B) + JfP("%E6%8B%96") + zip(f) + JfP("%E6%8B%96") + zip(r)
                        }
    */
    // 轨迹不能写死
    // guiji = "Yink3nbcnWink3nIcnTink3nacngink3nwAn8inFPnZAnIinHPneAnhinHPnHAnjinLPn1un2inaPnjunlinxPnsunUinTPnB1nyinTPno1n1inTPnNfncinTPntfn9inTPnYfnrinTPnfynPinTPni4nminTPnO4niinTPnplnFnTPnEl/kinTPnBMniinTPn4MnminxPnoMnPinxPnVMncinWPnKMnMinYPnzMndinp3nWMnYinB3nrbnOpnu3nfbnYpnN3nbbn2mnO3njb/LmnZ3nIbnNQnh3n7bnQPnD3nYbnRPn83nUondPn83nvonKPn83nxon8Pn83n9OngPnD3nOOnaPnd3nDOnWPnX3nLO";
    guiji = get_guiji();
    arg1 = arg1 + '/' + guiji + '/' + ScreenInfo['s']();
    arg2 = decryptInitParam(BASE64.decode(dragInit_value)).split('|')[4];

    params = hex_md5_track(arg1, arg2) + encryptc(arg1)
    params = params + captchaDrag._after + (new Date().getTime() % 10);
    params = encodec(params)
    md5_value = hex_md5(params + 'dg');
    captchaDrag.hash = md5_value['substring'](md5_value.length - 10, md5_value.length - 5);

    ffs = md5_value + params;
    key = decryptInitParam(BASE64.decode(dragInit_value)).split('|')[0];

    url = 'https://dt.suning.com/detect/dt/dragDetect.json?ffs=' + encodeURIComponent(ffs) + '&key=' + key + '&v=v3_7hY8wB0wi&i=undefined&_callback=jsonp_96721751174152514&serialNo=';
    return url
}
