e = {};
e.version = "1.2.2";
var t = function () {
    for (var e = 0, t = new Array(256), n = 0; 256 != n; ++n)
        e = 1 & (e = 1 & (e = 1 & (e = 1 & (e = 1 & (e = 1 & (e = 1 & (e = 1 & (e = n) ? -306674912 ^ e >>> 1 : e >>> 1) ? -306674912 ^ e >>> 1 : e >>> 1) ? -306674912 ^ e >>> 1 : e >>> 1) ? -306674912 ^ e >>> 1 : e >>> 1) ? -306674912 ^ e >>> 1 : e >>> 1) ? -306674912 ^ e >>> 1 : e >>> 1) ? -306674912 ^ e >>> 1 : e >>> 1) ? -306674912 ^ e >>> 1 : e >>> 1,
            t[n] = e;
    return "undefined" !== typeof Int32Array ? new Int32Array(t) : t
}();
n = function (e) {
    var t = 0
        , n = 0
        , r = 0
        , i = "undefined" !== typeof Int32Array ? new Int32Array(4096) : new Array(4096);
    for (r = 0; 256 != r; ++r)
        i[r] = e[r];
    for (r = 0; 256 != r; ++r)
        for (n = e[r],
                 t = 256 + r; t < 4096; t += 256)
            n = i[t] = n >>> 8 ^ e[255 & n];
    var o = [];
    for (r = 1; 16 != r; ++r)
        o[r - 1] = "undefined" !== typeof Int32Array ? i.subarray(256 * r, 256 * r + 256) : i.slice(256 * r, 256 * r + 256);
    return o
}(t);
var r = n[0]
    , i = n[1]
    , o = n[2]
    , a = n[3]
    , s = n[4]
    , c = n[5]
    , u = n[6]
    , l = n[7]
    , f = n[8]
    , d = n[9]
    , p = n[10]
    , h = n[11]
    , g = n[12]
    , m = n[13]
    , v = n[14];
e.table = t,
    e.bstr = function (e, n) {
        for (var r = ~n, i = 0, o = e.length; i < o;)
            r = r >>> 8 ^ t[255 & (r ^ e.charCodeAt(i++))];
        return ~r
    }
    ,
    e.buf = function (e, n) {
        for (var y = ~n, A = e.length - 15, b = 0; b < A;)
            y = v[e[b++] ^ 255 & y] ^ m[e[b++] ^ y >> 8 & 255] ^ g[e[b++] ^ y >> 16 & 255] ^ h[e[b++] ^ y >>> 24] ^ p[e[b++]] ^ d[e[b++]] ^ f[e[b++]] ^ l[e[b++]] ^ u[e[b++]] ^ c[e[b++]] ^ s[e[b++]] ^ a[e[b++]] ^ o[e[b++]] ^ i[e[b++]] ^ r[e[b++]] ^ t[e[b++]];
        for (A += 15; b < A;)
            y = y >>> 8 ^ t[255 & (y ^ e[b++])];
        return ~y
    }
    ,
    e.str = function (e, n) {
        for (var r = ~n, i = 0, o = e.length, a = 0, s = 0; i < o;)
            (a = e.charCodeAt(i++)) < 128 ? r = r >>> 8 ^ t[255 & (r ^ a)] : a < 2048 ? r = (r = r >>> 8 ^ t[255 & (r ^ (192 | a >> 6 & 31))]) >>> 8 ^ t[255 & (r ^ (128 | 63 & a))] : a >= 55296 && a < 57344 ? (a = 64 + (1023 & a),
                s = 1023 & e.charCodeAt(i++),
                r = (r = (r = (r = r >>> 8 ^ t[255 & (r ^ (240 | a >> 8 & 7))]) >>> 8 ^ t[255 & (r ^ (128 | a >> 2 & 63))]) >>> 8 ^ t[255 & (r ^ (128 | s >> 6 & 15 | (3 & a) << 4))]) >>> 8 ^ t[255 & (r ^ (128 | 63 & s))]) : r = (r = (r = r >>> 8 ^ t[255 & (r ^ (224 | a >> 12 & 15))]) >>> 8 ^ t[255 & (r ^ (128 | a >> 6 & 63))]) >>> 8 ^ t[255 & (r ^ (128 | 63 & a))];
        return ~r
    };


// function get_indices() {
//     let int1 = (Math.floor(Math.random() * Math.pow(2, 53))) % 52;
//     let int2 = (Math.floor(Math.random() * Math.pow(2, 53))) % 52;
//     let int3 = (Math.floor(Math.random() * Math.pow(2, 53))) % 52;
//     let int4 = (Math.floor(Math.random() * Math.pow(2, 53))) % 52;
//     let int5 = (Math.floor(Math.random() * Math.pow(2, 53))) % 52;
//     let int6 = (Math.floor(Math.random() * Math.pow(2, 53))) % 52;
//     let int7 = (Math.floor(Math.random() * Math.pow(2, 53))) % 52;
//     let int8 = (Math.floor(Math.random() * Math.pow(2, 53))) % 52;
//     return [int1, int2, int3, int4, int5, int6, int7, int8]
// }


function generatePoWSuffix(prefix, stamp) {
    // const prefix = 1750665122;
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let indices = [12, 38, 51, 31, 30, 32, 29, 18] // 初始值是随机来的
    // var stamp = 757590760;
    var sign = Number(stamp) >>> 24;

    pointer = 0
    while (true) {
        const suffix = indices.map(i => alphabet[i]).join('');
        const data = Number(prefix) + suffix;
        const hash = e.bstr(data);
        const highByte = hash >>> 24;
        // const value = highByte ^ sign;

        // 最终返回的结束条件
        if (highByte === sign) {
            return data
        }

        if (suffix.slice(pointer, pointer + 1) === 'Z') {
            // console.log(suffix)
            indices[pointer] = pointer;
            indices[pointer + 1] = (indices[pointer + 1] + 1) % 52;

            if (suffix.slice(pointer + 1, pointer + 2) === 'Z') {
                indices[pointer + 2] = indices[pointer + 2] + 1;
            }
        } else {
            indices[pointer] = (indices[pointer] + 1) % 52
        }
    }
}
