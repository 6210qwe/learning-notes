require('./env');
require('./xhscode');


var p = xuxu(73153)
function seccore_signv2(e, a) {
    var h = {
        _: function _type_of(t) {
            return t && "undefined" != typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
        }
    }
    debugger
    var r = window.toString;
    var c = e;
    "[object Object]" === r.call(a) || "[object Array]" === r.call(a) || (void 0 === a ? "undefined" : (0,
    h._)(a)) === "object" && null !== a ? c += JSON.stringify(a) : "string" == typeof a && (c += a);
    var d = (0,
    p.Pu)([c].join(""))
      , f = window.mnsv2(c, d)
      , s = {
        x0: "4.2.1",
        x1: "xhs-pc-web",
        x2: "Windows" || "PC",
        x3: f,
        x4: a ? void 0 === a ? "undefined" : (0,
        h._)(a) : ""
    };
    return "XYS_" + (0,
    p.xE)((0,
    p.lz)(JSON.stringify(s)))
}

const e = '/api/sns/web/v1/homefeed'

const a = {
    'cursor_score': '',
    'num': 18,
    'refresh_type': 1,
    'note_index': 27,
    'unread_begin_note_id': '',
    'unread_end_note_id': '',
    'unread_note_count': 0,
    'category': 'homefeed.food_v3',
    'search_key': '',
    'need_num': 8,
    'image_formats': [
        'jpg',
        'webp',
        'avif',
    ],
    'need_filter_image': false,
}
res = seccore_signv2(e, a)
console.log(res)
debugger