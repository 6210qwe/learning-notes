//调试固定参数
// Date.now = function now() {
//     return 1661986251253
// };
// Date.parse = function () {
//     return 1661986251253
// };
// Date.prototype.valueOf = function () {
//     return 1661986251253
// };
// Date.prototype.getTime = function () {
//     return 1661986251253
// };
// Date.prototype.toString = function () {
//     return 1661986251253
// };
// Math.random = function random() {
//     return 0.08636862211354912
// };
function n(t) {
    return t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
}

const o = {
    obfuscate: function (t) {
        const e = (t = function (t) {
            if ("function" == typeof TextEncoder)
                return (new TextEncoder).encode(t);
            const e = unescape(encodeURI(t))
                , r = new Uint8Array(e.length);
            for (let t = 0; t < e.length; ++t)
                r[t] = e.charCodeAt(t);
            return r
        }(JSON.stringify(t))).length
            , r = Math.floor(256 * Math.random())
            , n = e > 256 ? 256 : e
            , o = Math.floor(Math.random() * n)
            , i = Math.floor(Math.random() * n);
        let a = 0
            , s = new Uint8Array(new ArrayBuffer(o + e + i + 3));
        s[a] = r;
        for (let r = 0; r < o; r++)
            s[a + 1] = 1 + (t[e - r - 1] ^ s[a]),
                a++;
        for (let r = 0; r < e; r++)
            s[a + 1] = 1 + (t[r] ^ s[a]),
                a++;
        for (let r = 0; r < i; r++)
            s[a + 1] = 1 + (t[e - r - 1] ^ s[a]),
                a++;
        return s[a + 1] = ((o ^ s[a]) - 255) % 256,
            a++,
            s[a + 1] = ((i ^ s[a]) - 255) % 256,
            s
    },
    deobfuscate: function (t) {
        const e = (t = n(t)).length;
        let r = e - 1;
        const o = (t[r] + 255) % 256 ^ t[r - 1];
        r--;
        const i = (t[r] + 255) % 256 ^ t[r - 1];
        r--;
        const a = e - o - i - 3;
        let s = new Uint8Array(a);
        r -= o;
        for (let e = 0; e < a; e++)
            s[a - e - 1] = t[r] - 1 ^ t[r - 1],
                r--;
        return JSON.parse(function (t) {
            if ("function" == typeof TextDecoder) {
                const e = (new TextDecoder).decode(t);
                if (e)
                    return e
            }
            const e = n(t);
            return decodeURIComponent(escape(String.fromCharCode.apply(null, e)))
        }(s))
    }
}


function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}


function decrypt_image_init(code2) {
    const arrayBuffer = base64ToArrayBuffer(code2);
    return o.deobfuscate(arrayBuffer);
}

// code2 = 'ycS64JT5mQA7GmoagOSI9Nel0bPRtce1mKPGqMW306+mrdG1x6zOqZS3xbfTsdOnqqY=';
// console.log(decrypt_image_init(code2));

function init_bowman_id(bowman_id) {
    let code1 = {
        "site_key": "jqz10q84eu",
        "domain": "arcaptcha.co",
        "bowman_id": bowman_id, // 变化
        "system_time": (new Date).toISOString(),
        "CR": "FAKE_CR",
        "fp": "e374307f546c7a62d5382a6db35c4fcc",
        "components": {
            "fingerPrintComponents": {
                "fonts": {
                    "value": [
                        "Arabic Typesetting",
                        "Batang",
                        "Calibri",
                        "Franklin Gothic",
                        "Leelawadee",
                        "Levenim MT",
                        "MS Mincho",
                        "MS UI Gothic",
                        "MT Extra",
                        "Marlett",
                        "Meiryo UI",
                        "Microsoft Uighur",
                        "PMingLiU",
                        "Segoe UI Light",
                        "SimHei",
                        "Vrinda"
                    ],
                    "duration": 28
                },
                "domBlockers": {
                    "duration": 18
                },
                "fontPreferences": {
                    "value": {
                        "default": 165.9027862548828,
                        "apple": 165.9027862548828,
                        "serif": 165.9027862548828,
                        "sans": 160.01736450195312,
                        "mono": 135.01736450195312,
                        "min": 10.38194465637207,
                        "system": 179.21876525878906
                    },
                    "duration": 21
                },
                "audio": {
                    "value": 124.04347527516074,
                    "duration": 8
                },
                "screenFrame": {
                    "value": [
                        0,
                        0,
                        40,
                        0
                    ],
                    "duration": 0
                },
                "osCpu": {
                    "duration": 0
                },
                "languages": {
                    "value": [
                        [
                            "en-AU"
                        ]
                    ],
                    "duration": 0
                },
                "colorDepth": {
                    "value": 24,
                    "duration": 0
                },
                "deviceMemory": {
                    "value": 8,
                    "duration": 0
                },
                "screenResolution": {
                    "value": [
                        1920,
                        1080
                    ],
                    "duration": 0
                },
                "hardwareConcurrency": {
                    "value": 12,
                    "duration": 0
                },
                "timezone": {
                    "value": "Asia/Shanghai",
                    "duration": 0
                },
                "sessionStorage": {
                    "value": true,
                    "duration": 0
                },
                "localStorage": {
                    "value": true,
                    "duration": 0
                },
                "indexedDB": {
                    "value": true,
                    "duration": 0
                },
                "openDatabase": {
                    "value": false,
                    "duration": 0
                },
                "cpuClass": {
                    "duration": 0
                },
                "platform": {
                    "value": "Win32",
                    "duration": 0
                },
                "plugins": {
                    "value": [
                        {
                            "name": "PDF Viewer",
                            "description": "Portable Document Format",
                            "mimeTypes": [
                                {
                                    "type": "application/pdf",
                                    "suffixes": "pdf"
                                },
                                {
                                    "type": "text/pdf",
                                    "suffixes": "pdf"
                                }
                            ]
                        },
                        {
                            "name": "Chrome PDF Viewer",
                            "description": "Portable Document Format",
                            "mimeTypes": [
                                {
                                    "type": "application/pdf",
                                    "suffixes": "pdf"
                                },
                                {
                                    "type": "text/pdf",
                                    "suffixes": "pdf"
                                }
                            ]
                        },
                        {
                            "name": "Chromium PDF Viewer",
                            "description": "Portable Document Format",
                            "mimeTypes": [
                                {
                                    "type": "application/pdf",
                                    "suffixes": "pdf"
                                },
                                {
                                    "type": "text/pdf",
                                    "suffixes": "pdf"
                                }
                            ]
                        },
                        {
                            "name": "Microsoft Edge PDF Viewer",
                            "description": "Portable Document Format",
                            "mimeTypes": [
                                {
                                    "type": "application/pdf",
                                    "suffixes": "pdf"
                                },
                                {
                                    "type": "text/pdf",
                                    "suffixes": "pdf"
                                }
                            ]
                        },
                        {
                            "name": "WebKit built-in PDF",
                            "description": "Portable Document Format",
                            "mimeTypes": [
                                {
                                    "type": "application/pdf",
                                    "suffixes": "pdf"
                                },
                                {
                                    "type": "text/pdf",
                                    "suffixes": "pdf"
                                }
                            ]
                        }
                    ],
                    "duration": 0
                },
                "touchSupport": {
                    "value": {
                        "maxTouchPoints": 10,
                        "touchEvent": false,
                        "touchStart": false
                    },
                    "duration": 0
                },
                "vendor": {
                    "value": "Google Inc.",
                    "duration": 0
                },
                "vendorFlavors": {
                    "value": [
                        "chrome"
                    ],
                    "duration": 0
                },
                "cookiesEnabled": {
                    "value": true,
                    "duration": 1
                },
                "colorGamut": {
                    "value": "srgb",
                    "duration": 0
                },
                "invertedColors": {
                    "duration": 0
                },
                "forcedColors": {
                    "value": false,
                    "duration": 0
                },
                "monochrome": {
                    "value": 0,
                    "duration": 0
                },
                "contrast": {
                    "value": 0,
                    "duration": 0
                },
                "reducedMotion": {
                    "value": false,
                    "duration": 0
                },
                "hdr": {
                    "value": false,
                    "duration": 0
                },
                "math": {
                    "value": {
                        "acos": 1.4473588658278522,
                        "acosh": 709.889355822726,
                        "acoshPf": 355.291251501643,
                        "asin": 0.12343746096704435,
                        "asinh": 0.881373587019543,
                        "asinhPf": 0.8813735870195429,
                        "atanh": 0.5493061443340548,
                        "atanhPf": 0.5493061443340548,
                        "atan": 0.4636476090008061,
                        "sin": 0.8178819121159085,
                        "sinh": 1.1752011936438014,
                        "sinhPf": 2.534342107873324,
                        "cos": -0.8390715290095377,
                        "cosh": 1.5430806348152437,
                        "coshPf": 1.5430806348152437,
                        "tan": -1.4214488238747245,
                        "tanh": 0.7615941559557649,
                        "tanhPf": 0.7615941559557649,
                        "exp": 2.718281828459045,
                        "expm1": 1.718281828459045,
                        "expm1Pf": 1.718281828459045,
                        "log1p": 2.3978952727983707,
                        "log1pPf": 2.3978952727983707,
                        "powPI": 1.9275814160560206e-50
                    },
                    "duration": 0
                }
            },
            "mouseTracker": {
                "timeTaking": null,
                "mouse_tracking": [
                    {
                        "movementX": 88.17,
                        "movementY": 57.17,
                        "movement": 778.58,
                        "speed": 4691.92,
                        "maxSpeed": 5798.61,
                        "acceleration": 6904.94,
                        "maxPositiveAcceleration": 18951.41,
                        "maxNegativeAcceleration": -6581.99,
                        "dragDropSpeed": 0,
                        "mouseEvents": 65,
                        "mouseEventsTimeIntervals": [
                            144,
                            16,
                            24,
                            144,
                            193
                        ]
                    },
                    {
                        "movementX": 5,
                        "movementY": 14.17,
                        "movement": 100.28,
                        "speed": 701.06,
                        "maxSpeed": 6769.85,
                        "acceleration": -5660.37,
                        "maxPositiveAcceleration": 17935.98,
                        "maxNegativeAcceleration": -26215.37,
                        "dragDropSpeed": 0,
                        "mouseEvents": 25,
                        "mouseEventsTimeIntervals": [
                            45,
                            39,
                            208,
                            288,
                            159
                        ]
                    },
                    {
                        "movementX": 352.67,
                        "movementY": 117.17,
                        "movement": 2522.87,
                        "speed": 14550.79,
                        "maxSpeed": 15862.07,
                        "acceleration": 48014.57,
                        "maxPositiveAcceleration": 72766.33,
                        "maxNegativeAcceleration": -6553.84,
                        "dragDropSpeed": 0,
                        "mouseEvents": 26,
                        "mouseEventsTimeIntervals": [
                            3217,
                            49,
                            48,
                            45,
                            46,
                            45,
                            47,
                            46
                        ]
                    },
                    {
                        "movementX": 213.5,
                        "movementY": 63.33,
                        "movement": 1381.02,
                        "speed": 7194.02,
                        "maxSpeed": 24400.65,
                        "acceleration": 831.71,
                        "maxPositiveAcceleration": 87515.19,
                        "maxNegativeAcceleration": -119666.07,
                        "dragDropSpeed": 0,
                        "mouseEvents": 37,
                        "mouseEventsTimeIntervals": [
                            45,
                            24,
                            11,
                            33,
                            115,
                            132,
                            43,
                            19,
                            20
                        ]
                    },
                    {
                        "movementX": 255.83,
                        "movementY": 40.17,
                        "movement": 1785.72,
                        "speed": 14312.68,
                        "maxSpeed": 24400.65,
                        "acceleration": 25613.14,
                        "maxPositiveAcceleration": 258945.8,
                        "maxNegativeAcceleration": -39888.69,
                        "dragDropSpeed": 0,
                        "mouseEvents": 68,
                        "mouseEventsTimeIntervals": [
                            1184,
                            24,
                            32,
                            16
                        ]
                    }
                ],
                "clicks": {
                    "count": 1,
                    "unclickable_elements": []
                },
                "scrolled": false,
                "scroll_amount": [],
                "scroll_speed": [],
                "isTouch": true,
                "touchCount": 0
            },
            "botD": {
                "BackdropFilter": {
                    "value": true,
                    "duration": 0
                },
                "hasUserAgentData": {
                    "value": true,
                    "duration": 0
                },
                "isBigEndian": {
                    "value": false,
                    "duration": 0
                },
                "InstallTrigger": {
                    "value": false,
                    "duration": 0
                },
                "WebDriver": {
                    "value": false,
                    "duration": 0
                },
                "ErrorFF": {
                    "value": false,
                    "duration": 0
                },
                "isDarkTheme": {
                    "value": false,
                    "duration": 0
                },
                "AppVersion": {
                    "value": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
                    "duration": 0
                },
                "UserAgent": {
                    "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
                    "duration": 0
                },
                "RTT": {
                    "value": 150,
                    "duration": 0
                },
                "WindowOuterSize": {
                    "value": [
                        1920,
                        1040
                    ],
                    "duration": 0
                },
                "WebGL": {
                    "value": [
                        "Google Inc. (NVIDIA)",
                        "ANGLE (NVIDIA, NVIDIA GeForce GTX 1650 (0x00001F82) Direct3D11 vs_5_0 ps_5_0, D3D11)",
                        "WebKit",
                        "WebKit WebGL",
                        "WebGL 1.0 (OpenGL ES 2.0 Chromium)"
                    ],
                    "duration": 0
                },
                "Screen": {
                    "value": [
                        1920,
                        1080
                    ],
                    "duration": 0
                },
                "DeviceMemory": {
                    "value": 8,
                    "duration": 0
                },
                "HardwareConcurrency": {
                    "value": 12,
                    "duration": 0
                },
                "EvalLength": {
                    "value": 33,
                    "duration": 0
                },
                "PluginsLength": {
                    "value": 5,
                    "duration": 0
                },
                "arePluginsConsistent": {
                    "value": true,
                    "duration": 0
                },
                "ErrorTrace": {
                    "value": "TypeError: Cannot read properties of null (reading '0')\n    at m (https://widget.arcaptcha.ir/3/api.js?combined=true&site_key=jqz10q84eu:1:2104)\n    at C (https://widget.arcaptcha.ir/3/api.js?combined=true&site_key=jqz10q84eu:1:6422)\n    at executeBotD (https://widget.arcaptcha.ir/3/api.js?combined=true&site_key=jqz10q84eu:1:133453)\n    at launch (https://widget.arcaptcha.ir/3/api.js?combined=true&site_key=jqz10q84eu:1:131854)\n    at https://widget.arcaptcha.ir/3/api.js?combined=true&site_key=jqz10q84eu:1:134949\n    at https://widget.arcaptcha.ir/3/api.js?combined=true&site_key=jqz10q84eu:1:134959",
                    "duration": 0
                },
                "Platform": {
                    "value": "Win32",
                    "duration": 0
                },
                "ProductSub": {
                    "value": "20030107",
                    "duration": 0
                },
                "Vendor": {
                    "value": "Google Inc.",
                    "duration": 0
                },
                "Frequency": {
                    "value": null,
                    "duration": 0
                },
                "TouchPoints": {
                    "value": [
                        10,
                        null
                    ],
                    "duration": 0
                },
                "SourceBufferType": {
                    "value": [
                        "function",
                        "function"
                    ],
                    "duration": 0
                },
                "DocumentElementKeys": {
                    "value": [
                        "lang",
                        "data-n-head",
                        "class"
                    ],
                    "duration": 0
                },
                "WindowClose": {
                    "value": "function close() { [native code] }",
                    "duration": 0
                },
                "WindowExternal": {
                    "value": "[object External]",
                    "duration": 0
                },
                "Languages": {
                    "value": [
                        "en-AU"
                    ],
                    "duration": 0
                },
                "MimeTypesLength": {
                    "value": 2,
                    "duration": 0
                },
                "areMimeTypesConsistent": {
                    "value": true,
                    "duration": 0
                },
                "Timestamp": {
                    "value": 1753162461853,
                    "duration": 0
                },
                "Hairlines": {
                    "value": [
                        0.8999999761581421,
                        2
                    ],
                    "duration": 0
                },
                "isHiDPI": {
                    "value": false,
                    "duration": 0
                },
                "CallPhantom": {
                    "duration": 0
                },
                "_phantom": {
                    "duration": 0
                },
                "JsLack": {
                    "value": true,
                    "duration": 0
                },
                "Permissions": {
                    "value": true,
                    "duration": 0
                },
                "BrowswerConsistency": {
                    "value": true,
                    "duration": 0
                },
                "isMobile": {
                    "value": false,
                    "duration": 0
                },
                "arePermissionsInconsistent": {
                    "value": false,
                    "duration": 0
                }
            },
            "timeTaking": null
        },
        "lang": "en",
        "referer": "https://arcaptcha.co/en/#try_section",
        "timezone_cr": "CN"
    }
    let array1 = o.obfuscate(code1)
    return Array.from(array1)
}


function encrypt_captcha(answers, challenge_id, site_key) {
    let code3 = {
        "challenge_id": challenge_id,
        "answers": answers,
        "site_key": site_key,
        "drag_drop_time": (new Date).getTime(),
        "drag_drop": 0
    }
    let array1 = o.obfuscate(code3)
    return Array.from(array1)
}


// console.log(encrypt_image_init('9db25c35-1db0-424d-a437-3c33bda3ee38'));