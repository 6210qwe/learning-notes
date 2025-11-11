window = global;


location = {
    "ancestorOrigins": {},
    "href": "https://ktag6nr93.m.chenzhongtech.com/fw/tag/text?cc=share_copylink&kpf=ANDROID_PHONE&fid=4081117814&shareMethod=token&kpn=KUAISHOU&subBiz=TEXT_TAG&rich=false&shareId=18448063952787&shareToken=X4HA7MNYBh9wuW7&tagName=%E5%90%AC%E4%B8%80%E9%A6%96%E6%AD%8C%E8%AE%B2%E8%BF%B0%E4%B8%80%E4%B8%AA%E6%95%85%E4%BA%8B&shareType=7&shareMode=app&appType=21&shareObjectId=%E5%90%AC%E4%B8%80%E9%A6%96%E6%AD%8C%E8%AE%B2%E8%BF%B0%E4%B8%80%E4%B8%AA%E6%95%85%E4%BA%8B&timestamp=1750767739954",
    "origin": "https://ktag6nr93.m.chenzhongtech.com",
    "protocol": "https:",
    "host": "ktag6nr93.m.chenzhongtech.com",
    "hostname": "ktag6nr93.m.chenzhongtech.com",
    "port": "",
    "pathname": "/fw/tag/text",
    "search": "?cc=share_copylink&kpf=ANDROID_PHONE&fid=4081117814&shareMethod=token&kpn=KUAISHOU&subBiz=TEXT_TAG&rich=false&shareId=18448063952787&shareToken=X4HA7MNYBh9wuW7&tagName=%E5%90%AC%E4%B8%80%E9%A6%96%E6%AD%8C%E8%AE%B2%E8%BF%B0%E4%B8%80%E4%B8%AA%E6%95%85%E4%BA%8B&shareType=7&shareMode=app&appType=21&shareObjectId=%E5%90%AC%E4%B8%80%E9%A6%96%E6%AD%8C%E8%AE%B2%E8%BF%B0%E4%B8%80%E4%B8%AA%E6%95%85%E4%BA%8B&timestamp=1750767739954",
    "hash": ""
}

document = {
    cookie:'ktrace-context=1|MS44Nzg0NzI0NTc4Nzk2ODY5LjM5NTg1Nzg0LjE3NTEwNzMwODE3NjIuNTc5NjQ5MTE=|MS44Nzg0NzI0NTc4Nzk2ODY5LjM1ODI4NTI4LjE3NTEwNzMwODE3NjIuNTc5NjQ5MTI=|0|webservice-user-growth-node|webservice|true|src-Js; did=web_796bb05b0f8749559357ddfc3573b0d6; didv=1751073081000; kwpsecproductname=kuaishou-growth-offSite-h5-ssr',
}


var o = {
    FINGERPRINT: "kwfv1"
}
  , i = "/s/w/c"
  , c = {
    test: "https://infra-gdfp.test.gifshow.com",
    production: "https://gdfp.gifshow.com",
    kwai: "https://g-gdfp.kwai-pro.com"
}
  , a = "kwscode"
  , l = "kwssectoken"
  , h = "webweaponconfigs"
  , u = "K8wm5PvY9nX7qJc2"
  , p = "H4tL6rNd3vB9xM5k";
class d {
    static create(...e) {
        return new this(...e)
    }
    mixIn(e) {
        return Object.assign(this, e)
    }
    clone() {
        const e = new this.constructor;
        return Object.assign(e, this),
        e
    }
}
class f extends d {
    constructor(e=[], t=4 * e.length) {
        super();
        let n = e;
        if (n instanceof ArrayBuffer && (n = new Uint8Array(n)),
        (n instanceof Int8Array || n instanceof Uint8ClampedArray || n instanceof Int16Array || n instanceof Uint16Array || n instanceof Int32Array || n instanceof Uint32Array || n instanceof Float32Array || n instanceof Float64Array) && (n = new Uint8Array(n.buffer,n.byteOffset,n.byteLength)),
        n instanceof Uint8Array) {
            const e = n.byteLength
              , t = [];
            for (let r = 0; r < e; r += 1)
                t[r >>> 2] |= n[r] << 24 - r % 4 * 8;
            this.words = t,
            this.sigBytes = e
        } else
            this.words = e,
            this.sigBytes = t
    }
    static random(e) {
        const t = []
          , n = e => {
            let t = e
              , n = 987654321;
            const r = 4294967295;
            return () => {
                n = 36969 * (65535 & n) + (n >> 16) & r,
                t = 18e3 * (65535 & t) + (t >> 16) & r;
                let e = (n << 16) + t & r;
                return e /= 4294967296,
                e += .5,
                e * (Math.random() > .5 ? 1 : -1)
            }
        }
        ;
        for (let r, o = 0; o < e; o += 4) {
            const e = n(4294967296 * (r || Math.random()));
            r = 987654071 * e(),
            t.push(4294967296 * e() | 0)
        }
        return new f(t,e)
    }
    toString(e=y) {
        return e.stringify(this)
    }
    concat(e) {
        const t = this.words
          , n = e.words
          , r = this.sigBytes
          , o = e.sigBytes;
        if (this.clamp(),
        r % 4)
            for (let i = 0; i < o; i += 1) {
                const e = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                t[r + i >>> 2] |= e << 24 - (r + i) % 4 * 8
            }
        else
            for (let i = 0; i < o; i += 4)
                t[r + i >>> 2] = n[i >>> 2];
        return this.sigBytes += o,
        this
    }
    clamp() {
        const {words: e, sigBytes: t} = this;
        e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8,
        e.length = Math.ceil(t / 4)
    }
    clone() {
        const e = super.clone.call(this);
        return e.words = this.words.slice(0),
        e
    }
}
const y = {
    stringify(e) {
        const {words: t, sigBytes: n} = e
          , r = [];
        for (let o = 0; o < n; o += 1) {
            const e = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
            r.push((e >>> 4).toString(16)),
            r.push((15 & e).toString(16))
        }
        return r.join("")
    },
    parse(e) {
        const t = e.length
          , n = [];
        for (let r = 0; r < t; r += 2)
            n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
        return new f(n,t / 2)
    }
}
  , g = {
    stringify(e) {
        const {words: t, sigBytes: n} = e
          , r = [];
        for (let o = 0; o < n; o += 1) {
            const e = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
            r.push(String.fromCharCode(e))
        }
        return r.join("")
    },
    parse(e) {
        const t = e.length
          , n = [];
        for (let r = 0; r < t; r += 1)
            n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
        return new f(n,t)
    }
}
  , w = {
    stringify(e) {
        try {
            return decodeURIComponent(escape(g.stringify(e)))
        } catch (t) {
            throw new Error("Malformed UTF-8 data")
        }
    },
    parse: e => g.parse(unescape(encodeURIComponent(e)))
};
class _ extends d {
    constructor() {
        super(),
        this._minBufferSize = 0
    }
    reset() {
        this._data = new f,
        this._nDataBytes = 0
    }
    _append(e) {
        let t = e;
        "string" == typeof t && (t = w.parse(t)),
        this._data.concat(t),
        this._nDataBytes += t.sigBytes
    }
    _process(e) {
        let t;
        const {_data: n, blockSize: r} = this
          , o = n.words
          , i = n.sigBytes;
        let a = i / (4 * r);
        a = e ? Math.ceil(a) : Math.max((0 | a) - this._minBufferSize, 0);
        const s = a * r
          , c = Math.min(4 * s, i);
        if (s) {
            for (let e = 0; e < s; e += r)
                this._doProcessBlock(o, e);
            t = o.splice(0, s),
            n.sigBytes -= c
        }
        return new f(t,c)
    }
    clone() {
        const e = super.clone.call(this);
        return e._data = this._data.clone(),
        e
    }
}
class v extends _ {
    constructor(e) {
        super(),
        this.blockSize = 16,
        this.cfg = Object.assign(new d, e),
        this.reset()
    }
    static _createHelper(e) {
        return (t, n) => new e(n).finalize(t)
    }
    static _createHmacHelper(e) {
        return (t, n) => new m(e,n).finalize(t)
    }
    reset() {
        super.reset.call(this),
        this._doReset()
    }
    update(e) {
        return this._append(e),
        this._process(),
        this
    }
    finalize(e) {
        return e && this._append(e),
        this._doFinalize()
    }
}
class m extends d {
    constructor(e, t) {
        super();
        const n = new e;
        this._hasher = n;
        let r = t;
        "string" == typeof r && (r = w.parse(r));
        const o = n.blockSize
          , i = 4 * o;
        r.sigBytes > i && (r = n.finalize(t)),
        r.clamp();
        const a = r.clone();
        this._oKey = a;
        const s = r.clone();
        this._iKey = s;
        const c = a.words
          , l = s.words;
        for (let u = 0; u < o; u += 1)
            c[u] ^= 1549556828,
            l[u] ^= 909522486;
        a.sigBytes = i,
        s.sigBytes = i,
        this.reset()
    }
    reset() {
        const e = this._hasher;
        e.reset(),
        e.update(this._iKey)
    }
    update(e) {
        return this._hasher.update(e),
        this
    }
    finalize(e) {
        const t = this._hasher
          , n = t.finalize(e);
        return t.reset(),
        t.finalize(this._oKey.clone().concat(n))
    }
}
const k = {
    stringify(e) {
        const {words: t, sigBytes: n} = e
          , r = this._map;
        e.clamp();
        const o = [];
        for (let a = 0; a < n; a += 3) {
            const e = (t[a >>> 2] >>> 24 - a % 4 * 8 & 255) << 16 | (t[a + 1 >>> 2] >>> 24 - (a + 1) % 4 * 8 & 255) << 8 | t[a + 2 >>> 2] >>> 24 - (a + 2) % 4 * 8 & 255;
            for (let t = 0; t < 4 && a + .75 * t < n; t += 1)
                o.push(r.charAt(e >>> 6 * (3 - t) & 63))
        }
        const i = r.charAt(64);
        if (i)
            for (; o.length % 4; )
                o.push(i);
        return o.join("")
    },
    parse(e) {
        let t = e.length;
        const n = this._map;
        let r = this._reverseMap;
        if (!r) {
            this._reverseMap = [],
            r = this._reverseMap;
            for (let e = 0; e < n.length; e += 1)
                r[n.charCodeAt(e)] = e
        }
        const o = n.charAt(64);
        if (o) {
            const n = e.indexOf(o);
            -1 !== n && (t = n)
        }
        return ( (e, t, n) => {
            const r = [];
            let o = 0;
            for (let i = 0; i < t; i += 1)
                if (i % 4) {
                    const t = n[e.charCodeAt(i - 1)] << i % 4 * 2 | n[e.charCodeAt(i)] >>> 6 - i % 4 * 2;
                    r[o >>> 2] |= t << 24 - o % 4 * 8,
                    o += 1
                }
            return f.create(r, o)
        }
        )(e, t, r)
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
}
  , S = [];
for (let $r = 0; $r < 64; $r += 1)
    S[$r] = 4294967296 * Math.abs(Math.sin($r + 1)) | 0;
const b = (e, t, n, r, o, i, a) => {
    const s = e + (t & n | ~t & r) + o + a;
    return (s << i | s >>> 32 - i) + t
}
  , R = (e, t, n, r, o, i, a) => {
    const s = e + (t & r | n & ~r) + o + a;
    return (s << i | s >>> 32 - i) + t
}
  , x = (e, t, n, r, o, i, a) => {
    const s = e + (t ^ n ^ r) + o + a;
    return (s << i | s >>> 32 - i) + t
}
  , B = (e, t, n, r, o, i, a) => {
    const s = e + (n ^ (t | ~r)) + o + a;
    return (s << i | s >>> 32 - i) + t
}
;
class I extends v {
    _doReset() {
        this._hash = new f([1732584193, 4023233417, 2562383102, 271733878])
    }
    _doProcessBlock(e, t) {
        const n = e;
        for (let b = 0; b < 16; b += 1) {
            const r = t + b
              , o = e[r];
            n[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
        }
        const r = this._hash.words
          , o = n[t + 0]
          , i = n[t + 1]
          , a = n[t + 2]
          , s = n[t + 3]
          , c = n[t + 4]
          , l = n[t + 5]
          , u = n[t + 6]
          , p = n[t + 7]
          , d = n[t + 8]
          , f = n[t + 9]
          , h = n[t + 10]
          , g = n[t + 11]
          , m = n[t + 12]
          , y = n[t + 13]
          , v = n[t + 14]
          , _ = n[t + 15];
        let w = r[0]
          , $ = r[1]
          , k = r[2]
          , E = r[3];
        w = b(w, $, k, E, o, 7, S[0]),
        E = b(E, w, $, k, i, 12, S[1]),
        k = b(k, E, w, $, a, 17, S[2]),
        $ = b($, k, E, w, s, 22, S[3]),
        w = b(w, $, k, E, c, 7, S[4]),
        E = b(E, w, $, k, l, 12, S[5]),
        k = b(k, E, w, $, u, 17, S[6]),
        $ = b($, k, E, w, p, 22, S[7]),
        w = b(w, $, k, E, d, 7, S[8]),
        E = b(E, w, $, k, f, 12, S[9]),
        k = b(k, E, w, $, h, 17, S[10]),
        $ = b($, k, E, w, g, 22, S[11]),
        w = b(w, $, k, E, m, 7, S[12]),
        E = b(E, w, $, k, y, 12, S[13]),
        k = b(k, E, w, $, v, 17, S[14]),
        $ = b($, k, E, w, _, 22, S[15]),
        w = R(w, $, k, E, i, 5, S[16]),
        E = R(E, w, $, k, u, 9, S[17]),
        k = R(k, E, w, $, g, 14, S[18]),
        $ = R($, k, E, w, o, 20, S[19]),
        w = R(w, $, k, E, l, 5, S[20]),
        E = R(E, w, $, k, h, 9, S[21]),
        k = R(k, E, w, $, _, 14, S[22]),
        $ = R($, k, E, w, c, 20, S[23]),
        w = R(w, $, k, E, f, 5, S[24]),
        E = R(E, w, $, k, v, 9, S[25]),
        k = R(k, E, w, $, s, 14, S[26]),
        $ = R($, k, E, w, d, 20, S[27]),
        w = R(w, $, k, E, y, 5, S[28]),
        E = R(E, w, $, k, a, 9, S[29]),
        k = R(k, E, w, $, p, 14, S[30]),
        $ = R($, k, E, w, m, 20, S[31]),
        w = x(w, $, k, E, l, 4, S[32]),
        E = x(E, w, $, k, d, 11, S[33]),
        k = x(k, E, w, $, g, 16, S[34]),
        $ = x($, k, E, w, v, 23, S[35]),
        w = x(w, $, k, E, i, 4, S[36]),
        E = x(E, w, $, k, c, 11, S[37]),
        k = x(k, E, w, $, p, 16, S[38]),
        $ = x($, k, E, w, h, 23, S[39]),
        w = x(w, $, k, E, y, 4, S[40]),
        E = x(E, w, $, k, o, 11, S[41]),
        k = x(k, E, w, $, s, 16, S[42]),
        $ = x($, k, E, w, u, 23, S[43]),
        w = x(w, $, k, E, f, 4, S[44]),
        E = x(E, w, $, k, m, 11, S[45]),
        k = x(k, E, w, $, _, 16, S[46]),
        $ = x($, k, E, w, a, 23, S[47]),
        w = B(w, $, k, E, o, 6, S[48]),
        E = B(E, w, $, k, p, 10, S[49]),
        k = B(k, E, w, $, v, 15, S[50]),
        $ = B($, k, E, w, l, 21, S[51]),
        w = B(w, $, k, E, m, 6, S[52]),
        E = B(E, w, $, k, s, 10, S[53]),
        k = B(k, E, w, $, h, 15, S[54]),
        $ = B($, k, E, w, i, 21, S[55]),
        w = B(w, $, k, E, d, 6, S[56]),
        E = B(E, w, $, k, _, 10, S[57]),
        k = B(k, E, w, $, u, 15, S[58]),
        $ = B($, k, E, w, y, 21, S[59]),
        w = B(w, $, k, E, c, 6, S[60]),
        E = B(E, w, $, k, g, 10, S[61]),
        k = B(k, E, w, $, a, 15, S[62]),
        $ = B($, k, E, w, f, 21, S[63]),
        r[0] = r[0] + w | 0,
        r[1] = r[1] + $ | 0,
        r[2] = r[2] + k | 0,
        r[3] = r[3] + E | 0
    }
    _doFinalize() {
        const e = this._data
          , t = e.words
          , n = 8 * this._nDataBytes
          , r = 8 * e.sigBytes;
        t[r >>> 5] |= 128 << 24 - r % 32;
        const o = Math.floor(n / 4294967296)
          , i = n;
        t[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
        t[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8),
        e.sigBytes = 4 * (t.length + 1),
        this._process();
        const a = this._hash
          , s = a.words;
        for (let c = 0; c < 4; c += 1) {
            const e = s[c];
            s[c] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8)
        }
        return a
    }
    clone() {
        const e = super.clone.call(this);
        return e._hash = this._hash.clone(),
        e
    }
}
class z extends d {
    constructor(e) {
        super(),
        this.cfg = Object.assign(new d, {
            keySize: 4,
            hasher: I,
            iterations: 1
        }, e)
    }
    compute(e, t) {
        let n;
        const {cfg: r} = this
          , o = r.hasher.create()
          , i = f.create()
          , a = i.words
          , {keySize: s, iterations: c} = r;
        for (; a.length < s; ) {
            n && o.update(n),
            n = o.update(e).finalize(t),
            o.reset();
            for (let e = 1; e < c; e += 1)
                n = o.finalize(n),
                o.reset();
            i.concat(n)
        }
        return i.sigBytes = 4 * s,
        i
    }
}
class E extends _ {
    constructor(e, t, n) {
        super(),
        this.cfg = Object.assign(new d, n),
        this._xformMode = e,
        this._key = t,
        this.reset()
    }
    static createEncryptor(e, t) {
        return this.create(this._ENC_XFORM_MODE, e, t)
    }
    static createDecryptor(e, t) {
        return this.create(this._DEC_XFORM_MODE, e, t)
    }
    static _createHelper(e) {
        const t = e => "string" == typeof e ? T : P;
        return {
            encrypt: (n, r, o) => t(r).encrypt(e, n, r, o),
            decrypt: (n, r, o) => t(r).decrypt(e, n, r, o)
        }
    }
    reset() {
        super.reset.call(this),
        this._doReset()
    }
    process(e) {
        return this._append(e),
        this._process()
    }
    finalize(e) {
        return e && this._append(e),
        this._doFinalize()
    }
}
E._ENC_XFORM_MODE = 1,
E._DEC_XFORM_MODE = 2,
E.keySize = 4,
E.ivSize = 4;
class N extends d {
    constructor(e, t) {
        super(),
        this._cipher = e,
        this._iv = t
    }
    static createEncryptor(e, t) {
        return this.Encryptor.create(e, t)
    }
    static createDecryptor(e, t) {
        return this.Decryptor.create(e, t)
    }
}
function O(e, t, n) {
    const r = e;
    let o;
    const i = this._iv;
    i ? (o = i,
    this._iv = void 0) : o = this._prevBlock;
    for (let a = 0; a < n; a += 1)
        r[t + a] ^= o[a]
}
class M extends N {
}
M.Encryptor = class extends M {
    processBlock(e, t) {
        const n = this._cipher
          , {blockSize: r} = n;
        O.call(this, e, t, r),
        n.encryptBlock(e, t),
        this._prevBlock = e.slice(t, t + r)
    }
}
,
M.Decryptor = class extends M {
    processBlock(e, t) {
        const n = this._cipher
          , {blockSize: r} = n
          , o = e.slice(t, t + r);
        n.decryptBlock(e, t),
        O.call(this, e, t, r),
        this._prevBlock = o
    }
}
;
const F = {
    pad(e, t) {
        const n = 4 * t
          , r = n - e.sigBytes % n
          , o = r << 24 | r << 16 | r << 8 | r
          , i = [];
        for (let s = 0; s < r; s += 4)
            i.push(o);
        const a = f.create(i, r);
        e.concat(a)
    },
    unpad(e) {
        const t = e
          , n = 255 & t.words[t.sigBytes - 1 >>> 2];
        t.sigBytes -= n
    }
};
class D extends E {
    constructor(e, t, n) {
        super(e, t, Object.assign({
            mode: M,
            padding: F
        }, n)),
        this.blockSize = 4
    }
    reset() {
        let e;
        super.reset.call(this);
        const {cfg: t} = this
          , {iv: n, mode: r} = t;
        this._xformMode === this.constructor._ENC_XFORM_MODE ? e = r.createEncryptor : (e = r.createDecryptor,
        this._minBufferSize = 1),
        this._mode = e.call(r, this, n && n.words),
        this._mode.__creator = e
    }
    _doProcessBlock(e, t) {
        this._mode.processBlock(e, t)
    }
    _doFinalize() {
        let e;
        const {padding: t} = this.cfg;
        return this._xformMode === this.constructor._ENC_XFORM_MODE ? (t.pad(this._data, this.blockSize),
        e = this._process(!0)) : (e = this._process(!0),
        t.unpad(e)),
        e
    }
}
class C extends d {
    constructor(e) {
        super(),
        this.mixIn(e)
    }
    toString(e) {
        return (e || this.formatter).stringify(this)
    }
}
const j = {
    stringify(e) {
        let t;
        const {ciphertext: n, salt: r} = e;
        return t = r ? f.create([1398893684, 1701076831]).concat(r).concat(n) : n,
        t.toString(k)
    },
    parse(e) {
        let t;
        const n = k.parse(e)
          , r = n.words;
        return 1398893684 === r[0] && 1701076831 === r[1] && (t = f.create(r.slice(2, 4)),
        r.splice(0, 4),
        n.sigBytes -= 16),
        C.create({
            ciphertext: n,
            salt: t
        })
    }
};
class P extends d {
    static encrypt(e, t, n, r) {
        const o = Object.assign(new d, this.cfg, r)
          , i = e.createEncryptor(n, o)
          , a = i.finalize(t)
          , s = i.cfg;
        return C.create({
            ciphertext: a,
            key: n,
            iv: s.iv,
            algorithm: e,
            mode: s.mode,
            padding: s.padding,
            blockSize: i.blockSize,
            formatter: o.format
        })
    }
    static decrypt(e, t, n, r) {
        let o = t;
        const i = Object.assign(new d, this.cfg, r);
        return o = this._parse(o, i.format),
        e.createDecryptor(n, i).finalize(o.ciphertext)
    }
    static _parse(e, t) {
        return "string" == typeof e ? t.parse(e, this) : e
    }
}
P.cfg = Object.assign(new d, {
    format: j
});
const A = {
    execute(e, t, n, r) {
        let o = r;
        o || (o = f.random(8));
        const i = z.create({
            keySize: t + n
        }).compute(e, o)
          , a = f.create(i.words.slice(t), 4 * n);
        return i.sigBytes = 4 * t,
        C.create({
            key: i,
            iv: a,
            salt: o
        })
    }
};
class T extends P {
    static encrypt(e, t, n, r) {
        const o = Object.assign(new d, this.cfg, r)
          , i = o.kdf.execute(n, e.keySize, e.ivSize);
        o.iv = i.iv;
        const a = P.encrypt.call(this, e, t, i.key, o);
        return a.mixIn(i),
        a
    }
    static decrypt(e, t, n, r) {
        let o = t;
        const i = Object.assign(new d, this.cfg, r);
        o = this._parse(o, i.format);
        const a = i.kdf.execute(n, e.keySize, e.ivSize, o.salt);
        return i.iv = a.iv,
        P.decrypt.call(this, e, o, a.key, i)
    }
}
T.cfg = Object.assign(P.cfg, {
    kdf: A
});
const U = []
  , G = []
  , K = []
  , H = []
  , X = []
  , q = []
  , J = []
  , L = []
  , W = []
  , Y = []
  , Q = [];
for (let $r = 0; $r < 256; $r += 1)
    Q[$r] = $r < 128 ? $r << 1 : $r << 1 ^ 283;
let V = 0
  , Z = 0;
for (let $r = 0; $r < 256; $r += 1) {
    let e = Z ^ Z << 1 ^ Z << 2 ^ Z << 3 ^ Z << 4;
    e = e >>> 8 ^ 255 & e ^ 99,
    U[V] = e,
    G[e] = V;
    const t = Q[V]
      , n = Q[t]
      , r = Q[n];
    let o = 257 * Q[e] ^ 16843008 * e;
    K[V] = o << 24 | o >>> 8,
    H[V] = o << 16 | o >>> 16,
    X[V] = o << 8 | o >>> 24,
    q[V] = o,
    o = 16843009 * r ^ 65537 * n ^ 257 * t ^ 16843008 * V,
    J[e] = o << 24 | o >>> 8,
    L[e] = o << 16 | o >>> 16,
    W[e] = o << 8 | o >>> 24,
    Y[e] = o,
    V ? (V = t ^ Q[Q[Q[r ^ t]]],
    Z ^= Q[Q[Z]]) : (Z = 1,
    V = Z)
}
const $ = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
class tt extends D {
    _doReset() {
        let e;
        if (this._nRounds && this._keyPriorReset === this._key)
            return;
        this._keyPriorReset = this._key;
        const t = this._keyPriorReset
          , n = t.words
          , r = t.sigBytes / 4;
        this._nRounds = r + 6;
        const o = 4 * (this._nRounds + 1);
        this._keySchedule = [];
        const i = this._keySchedule;
        for (let s = 0; s < o; s += 1)
            s < r ? i[s] = n[s] : (e = i[s - 1],
            s % r ? r > 6 && s % r == 4 && (e = U[e >>> 24] << 24 | U[e >>> 16 & 255] << 16 | U[e >>> 8 & 255] << 8 | U[255 & e]) : (e = e << 8 | e >>> 24,
            e = U[e >>> 24] << 24 | U[e >>> 16 & 255] << 16 | U[e >>> 8 & 255] << 8 | U[255 & e],
            e ^= $[s / r | 0] << 24),
            i[s] = i[s - r] ^ e);
        this._invKeySchedule = [];
        const a = this._invKeySchedule;
        for (let s = 0; s < o; s += 1) {
            const t = o - s;
            e = s % 4 ? i[t] : i[t - 4],
            a[s] = s < 4 || t <= 4 ? e : J[U[e >>> 24]] ^ L[U[e >>> 16 & 255]] ^ W[U[e >>> 8 & 255]] ^ Y[U[255 & e]]
        }
    }
    encryptBlock(e, t) {
        this._doCryptBlock(e, t, this._keySchedule, K, H, X, q, U)
    }
    decryptBlock(e, t) {
        const n = e;
        let r = n[t + 1];
        n[t + 1] = n[t + 3],
        n[t + 3] = r,
        this._doCryptBlock(n, t, this._invKeySchedule, J, L, W, Y, G),
        r = n[t + 1],
        n[t + 1] = n[t + 3],
        n[t + 3] = r
    }
    _doCryptBlock(e, t, n, r, o, i, a, s) {
        const c = e
          , l = this._nRounds;
        let u = c[t] ^ n[0]
          , p = c[t + 1] ^ n[1]
          , d = c[t + 2] ^ n[2]
          , f = c[t + 3] ^ n[3]
          , h = 4;
        for (let b = 1; b < l; b += 1) {
            const e = r[u >>> 24] ^ o[p >>> 16 & 255] ^ i[d >>> 8 & 255] ^ a[255 & f] ^ n[h];
            h += 1;
            const t = r[p >>> 24] ^ o[d >>> 16 & 255] ^ i[f >>> 8 & 255] ^ a[255 & u] ^ n[h];
            h += 1;
            const s = r[d >>> 24] ^ o[f >>> 16 & 255] ^ i[u >>> 8 & 255] ^ a[255 & p] ^ n[h];
            h += 1;
            const c = r[f >>> 24] ^ o[u >>> 16 & 255] ^ i[p >>> 8 & 255] ^ a[255 & d] ^ n[h];
            h += 1,
            u = e,
            p = t,
            d = s,
            f = c
        }
        const g = (s[u >>> 24] << 24 | s[p >>> 16 & 255] << 16 | s[d >>> 8 & 255] << 8 | s[255 & f]) ^ n[h];
        h += 1;
        const m = (s[p >>> 24] << 24 | s[d >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & u]) ^ n[h];
        h += 1;
        const y = (s[d >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & p]) ^ n[h];
        h += 1;
        const v = (s[f >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[p >>> 8 & 255] << 8 | s[255 & d]) ^ n[h];
        h += 1,
        c[t] = g,
        c[t + 1] = m,
        c[t + 2] = y,
        c[t + 3] = v
    }
}
tt.keySize = 8;
const et = D._createHelper(tt);
var st = "undefined" == typeof window;
function rt(e) {
    return (null == e ? void 0 : e.did) || api.get("did") || ""
}
function nt(e, t) {
    var n = w.parse(t || h)
      , r = n;
    return et.encrypt(e, n, {
        iv: r,
        mode: M,
        padding: F
    }).toString()
}




var defaultConverter = {
    read: function(e) {
        return '"' === e[0] && (e = e.slice(1, -1)),
        e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function(e) {
        return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
    }
};
var api = {
    get:function(t) {
        if ("undefined" != typeof document && (!arguments.length || t)) {
            for (var n = document.cookie ? document.cookie.split("; ") : [], r = {}, o = 0; o < n.length; o++) {
                var i = n[o].split("=")
                    , a = i.slice(1).join("=");
                try {
                    var s = decodeURIComponent(i[0]);
                    if (r[s] = defaultConverter.read(a, s),
                    t === s)
                        break
                } catch (e2) {}
            }
            return t ? r[t] : r
        }
    },
}

function rt(e) {
    return (null == e ? void 0 : e.did) || api.get("did") || ""
}

var ot = function(e) {
    for (var t = "", n = 0; n < e; n++)
        t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(62 * Math.random())];
    return t
}

var ddd = {
    "options": {
        "maxRetries": 2,
        "env": "production",
        "productName": "kuaishou-growth-offSite-h5-ssr"
    }
};
var e = Date.now();
var i = "".concat(encodeURI(location.href), "|").concat(rt(ddd.options), "|").concat(ddd.options.productName, "|").concat(e, "|").concat(ot(8))
var s = "".concat(nt(i, u));
var t = "K".concat(s.slice(0, 4), "W").concat(s.slice(4, -2), "F").concat(s.slice(-2));
console.log(t)