window = global;
const CryptoJS = require('crypto-js');

code_array = {
    "mouseEvents": [
        {
            "timestamp": 9806,
            "type": 0,
            "x": 396,
            "y": 208
        },
        {
            "timestamp": 9814,
            "type": 0,
            "x": 384,
            "y": 212
        },
        {
            "timestamp": 9822,
            "type": 0,
            "x": 373,
            "y": 217
        },
        {
            "timestamp": 9830,
            "type": 0,
            "x": 360,
            "y": 221
        },
        {
            "timestamp": 9838,
            "type": 0,
            "x": 348,
            "y": 226
        },
        {
            "timestamp": 9846,
            "type": 0,
            "x": 336,
            "y": 231
        },
        {
            "timestamp": 9853,
            "type": 0,
            "x": 321,
            "y": 237
        },
        {
            "timestamp": 9862,
            "type": 0,
            "x": 307,
            "y": 243
        },
        {
            "timestamp": 9870,
            "type": 0,
            "x": 296,
            "y": 248
        },
        {
            "timestamp": 9878,
            "type": 0,
            "x": 285,
            "y": 252
        },
        {
            "timestamp": 9885,
            "type": 0,
            "x": 276,
            "y": 255
        },
        {
            "timestamp": 9894,
            "type": 0,
            "x": 270,
            "y": 258
        },
        {
            "timestamp": 9910,
            "type": 0,
            "x": 262,
            "y": 262
        },
        {
            "timestamp": 9949,
            "type": 0,
            "x": 256,
            "y": 267
        },
        {
            "timestamp": 9966,
            "type": 0,
            "x": 252,
            "y": 274
        },
        {
            "timestamp": 9974,
            "type": 0,
            "x": 249,
            "y": 279
        },
        {
            "timestamp": 9982,
            "type": 0,
            "x": 245,
            "y": 283
        },
        {
            "timestamp": 9990,
            "type": 0,
            "x": 241,
            "y": 288
        },
        {
            "timestamp": 9998,
            "type": 0,
            "x": 238,
            "y": 293
        },
        {
            "timestamp": 10014,
            "type": 0,
            "x": 231,
            "y": 298
        },
        {
            "timestamp": 10054,
            "type": 0,
            "x": 226,
            "y": 302
        },
        {
            "timestamp": 10070,
            "type": 0,
            "x": 225,
            "y": 307
        },
        {
            "timestamp": 10085,
            "type": 0,
            "x": 220,
            "y": 315
        },
        {
            "timestamp": 10102,
            "type": 0,
            "x": 215,
            "y": 321
        },
        {
            "timestamp": 10126,
            "type": 0,
            "x": 212,
            "y": 326
        },
        {
            "timestamp": 10190,
            "type": 0,
            "x": 211,
            "y": 321
        },
        {
            "timestamp": 10214,
            "type": 0,
            "x": 209,
            "y": 314
        },
        {
            "timestamp": 10230,
            "type": 0,
            "x": 208,
            "y": 308
        },
        {
            "timestamp": 10246,
            "type": 0,
            "x": 207,
            "y": 301
        },
        {
            "timestamp": 10262,
            "type": 0,
            "x": 207,
            "y": 290
        },
        {
            "timestamp": 10278,
            "type": 0,
            "x": 207,
            "y": 279
        },
        {
            "timestamp": 10294,
            "type": 0,
            "x": 208,
            "y": 273
        },
        {
            "timestamp": 10366,
            "type": 0,
            "x": 210,
            "y": 268
        },
        {
            "timestamp": 10398,
            "type": 0,
            "x": 205,
            "y": 265
        },
        {
            "timestamp": 10486,
            "type": 0,
            "x": 204,
            "y": 260
        },
        {
            "timestamp": 10502,
            "type": 0,
            "x": 213,
            "y": 258
        },
        {
            "timestamp": 10510,
            "type": 0,
            "x": 221,
            "y": 257
        },
        {
            "timestamp": 10518,
            "type": 0,
            "x": 231,
            "y": 255
        },
        {
            "timestamp": 10526,
            "type": 0,
            "x": 241,
            "y": 253
        },
        {
            "timestamp": 10534,
            "type": 0,
            "x": 253,
            "y": 252
        },
        {
            "timestamp": 10542,
            "type": 0,
            "x": 264,
            "y": 251
        },
        {
            "timestamp": 10550,
            "type": 0,
            "x": 272,
            "y": 251
        },
        {
            "timestamp": 10558,
            "type": 0,
            "x": 280,
            "y": 251
        },
        {
            "timestamp": 10566,
            "type": 0,
            "x": 286,
            "y": 251
        },
        {
            "timestamp": 10582,
            "type": 0,
            "x": 293,
            "y": 251
        },
        {
            "timestamp": 10606,
            "type": 0,
            "x": 300,
            "y": 251
        },
        {
            "timestamp": 10646,
            "type": 0,
            "x": 307,
            "y": 251
        },
        {
            "timestamp": 10670,
            "type": 0,
            "x": 313,
            "y": 251
        },
        {
            "timestamp": 10718,
            "type": 0,
            "x": 319,
            "y": 251
        },
        {
            "timestamp": 10773,
            "type": 0,
            "x": 325,
            "y": 251
        },
        {
            "timestamp": 10789,
            "type": 0,
            "x": 331,
            "y": 250
        },
        {
            "timestamp": 10814,
            "type": 0,
            "x": 340,
            "y": 250
        },
        {
            "timestamp": 10830,
            "type": 0,
            "x": 348,
            "y": 250
        },
        {
            "timestamp": 10846,
            "type": 0,
            "x": 358,
            "y": 250
        },
        {
            "timestamp": 10869,
            "type": 0,
            "x": 364,
            "y": 250
        },
        {
            "timestamp": 10942,
            "type": 1,
            "x": 366,
            "y": 250
        },
        {
            "timestamp": 11022,
            "type": 2,
            "x": 366,
            "y": 250
        },
        {
            "timestamp": 11502,
            "type": 1,
            "x": 366,
            "y": 250
        },
        {
            "timestamp": 11598,
            "type": 2,
            "x": 366,
            "y": 250
        },
        {
            "timestamp": 11998,
            "type": 1,
            "x": 366,
            "y": 250
        },
        {
            "timestamp": 12166,
            "type": 2,
            "x": 366,
            "y": 250
        },
        {
            "timestamp": 12526,
            "type": 1,
            "x": 366,
            "y": 250
        },
        {
            "timestamp": 12614,
            "type": 2,
            "x": 366,
            "y": 250
        },
        {
            "timestamp": 13038,
            "type": 0,
            "x": 352,
            "y": 248
        },
        {
            "timestamp": 13046,
            "type": 0,
            "x": 343,
            "y": 248
        },
        {
            "timestamp": 13054,
            "type": 0,
            "x": 332,
            "y": 248
        },
        {
            "timestamp": 13062,
            "type": 0,
            "x": 322,
            "y": 248
        },
        {
            "timestamp": 13070,
            "type": 0,
            "x": 313,
            "y": 248
        },
        {
            "timestamp": 13078,
            "type": 0,
            "x": 306,
            "y": 248
        },
        {
            "timestamp": 13085,
            "type": 0,
            "x": 300,
            "y": 248
        },
        {
            "timestamp": 13102,
            "type": 0,
            "x": 293,
            "y": 248
        },
        {
            "timestamp": 13117,
            "type": 0,
            "x": 287,
            "y": 248
        },
        {
            "timestamp": 13149,
            "type": 0,
            "x": 280,
            "y": 248
        },
        {
            "timestamp": 13206,
            "type": 0,
            "x": 274,
            "y": 248
        },
        {
            "timestamp": 13221,
            "type": 0,
            "x": 268,
            "y": 248
        },
        {
            "timestamp": 13237,
            "type": 0,
            "x": 261,
            "y": 248
        },
        {
            "timestamp": 13253,
            "type": 0,
            "x": 255,
            "y": 248
        },
        {
            "timestamp": 13285,
            "type": 0,
            "x": 249,
            "y": 248
        },
        {
            "timestamp": 13317,
            "type": 0,
            "x": 243,
            "y": 248
        },
        {
            "timestamp": 13334,
            "type": 0,
            "x": 235,
            "y": 248
        },
        {
            "timestamp": 13349,
            "type": 0,
            "x": 227,
            "y": 248
        },
        {
            "timestamp": 13365,
            "type": 0,
            "x": 221,
            "y": 248
        },
        {
            "timestamp": 13453,
            "type": 0,
            "x": 214,
            "y": 248
        },
        {
            "timestamp": 13574,
            "type": 0,
            "x": 208,
            "y": 248
        },
        {
            "timestamp": 14150,
            "type": 1,
            "x": 204,
            "y": 251
        },
        {
            "timestamp": 14214,
            "type": 0,
            "x": 202,
            "y": 252
        },
        {
            "timestamp": 14214,
            "type": 2,
            "x": 202,
            "y": 252
        },
        {
            "timestamp": 14254,
            "type": 0,
            "x": 199,
            "y": 257
        },
        {
            "timestamp": 14269,
            "type": 0,
            "x": 199,
            "y": 263
        },
        {
            "timestamp": 14278,
            "type": 0,
            "x": 199,
            "y": 270
        },
        {
            "timestamp": 14286,
            "type": 0,
            "x": 201,
            "y": 275
        },
        {
            "timestamp": 14294,
            "type": 0,
            "x": 203,
            "y": 282
        },
        {
            "timestamp": 14301,
            "type": 0,
            "x": 206,
            "y": 289
        },
        {
            "timestamp": 14310,
            "type": 0,
            "x": 208,
            "y": 296
        },
        {
            "timestamp": 14317,
            "type": 0,
            "x": 211,
            "y": 302
        },
        {
            "timestamp": 14326,
            "type": 0,
            "x": 215,
            "y": 310
        },
        {
            "timestamp": 14333,
            "type": 0,
            "x": 218,
            "y": 316
        },
        {
            "timestamp": 14350,
            "type": 0,
            "x": 225,
            "y": 324
        },
        {
            "timestamp": 14365,
            "type": 0,
            "x": 229,
            "y": 329
        },
        {
            "timestamp": 14382,
            "type": 0,
            "x": 234,
            "y": 333
        },
        {
            "timestamp": 14398,
            "type": 0,
            "x": 239,
            "y": 337
        },
        {
            "timestamp": 14422,
            "type": 0,
            "x": 243,
            "y": 341
        },
        {
            "timestamp": 14558,
            "type": 0,
            "x": 248,
            "y": 342
        },
        {
            "timestamp": 14598,
            "type": 0,
            "x": 250,
            "y": 336
        },
        {
            "timestamp": 14686,
            "type": 1,
            "x": 250,
            "y": 336
        },
        {
            "timestamp": 14758,
            "type": 2,
            "x": 250,
            "y": 336
        }
    ],
    "touchEvents": [],
    "keyPressEvents": [
        {
            "timestamp": 9486,
            "type": 1,
            "code": 0
        }
    ],
    "timestamp": 1752042082096,
    "_mouseEventsEnabled": true,
    "_touchEventsEnabled": true,
    "_keyPressEventsEnabled": true,
    "_listenersSetup": true,
    "_lastMouseMove": {
        "timestamp": 14598,
        "type": 0,
        "x": 250,
        "y": 336
    }
};

function get_odd() {
    return window.btoa(JSON.stringify({
        'mbio': this.mouseEvents.map(nX =>
            `${nX.timestamp},${nX.type},${nX.x},${nX.y};`
        ).join(''),
        'tbio': this.touchEvents.map(nX =>
            `${nX.timestamp},${nX.type},${nX.x},${nX.y};`
        ).join(''),
        'kbio': this.keyPressEvents.map(nX =>
            `${nX.timestamp},${nX.type},${nX.code};`
        ).join('')
    }));
}

function get_bio() {
    return get_odd.call(code_array);
}


function get_guess(session_token, index) {
    let json_a = [{"index": index}]
    const K = {
        stringify: function (B) {
            const result = {
                ct: B.ciphertext.toString(CryptoJS.enc.Base64) // 使用标准 Base64 编码
            };
            if (B.iv) result.iv = B.iv.toString();
            if (B.salt) result.s = B.salt.toString();
            return JSON.stringify(result);
        }
    };

    return code1 = CryptoJS.AES.encrypt(
        JSON.stringify(json_a),
        session_token,
        {format: K}
    ).toString();
    // return code1
}

// console.log(get_guess());




