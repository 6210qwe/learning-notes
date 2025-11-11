import json,cv2,ddddocr
from curl_cffi import requests
from lxml import etree
from loguru import logger
import random,execjs,time,string
from tp_huany import shuffle_slices
import numpy as np

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://exaccount2.eastmoney.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36"
}

# 获取滑块距离
def identify_gap(bg, tp):
    """
    bg: 背景图片
    tp: 缺口图片
    out: 输出图片
    """
    # 读取背景图片和缺口图片
    bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE)
    tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE)  # 缺口图片
    yy = []
    xx = []
    for y in range(tp_img.shape[0]):
        for x in range(tp_img.shape[1]):
            r = tp_img[y, x]
            if r < 200:
                yy.append(y)
                xx.append(x)
    tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)]
    # 识别图片边缘
    bg_edge = cv2.Canny(bg_img, 100, 200)
    tp_edge = cv2.Canny(tp_img, 100, 200)
    # 转换图片格式
    bg_pic = cv2.cvtColor(bg_edge, cv2.COLOR_GRAY2RGB)
    tp_pic = cv2.cvtColor(tp_edge, cv2.COLOR_GRAY2RGB)
    # 缺口匹配
    res = cv2.matchTemplate(bg_pic, tp_pic, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)  # 寻找最优匹配
    # # 绘制方框
    th, tw = tp_pic.shape[:2]
    tl = max_loc  # 左上角点的坐标
    br = (tl[0] + tw, tl[1] + th)  # 右下角点的坐标
    cv2.rectangle(bg_img, tl, br, (0, 0, 255), 2)  # 绘制矩形
    cv2.imwrite('distinguish.jpg', bg_img)  # 保存在本地
    # 返回缺口的X坐标
    return max_loc[0]

# 获取滑块轨迹
def guiji(distance):
    trackList = [
    {
        "x": "0",
        "y": "0",
        "t": "0"
    },
    {
        "x": "1",
        "y": "0",
        "t": "35"
    },
    {
        "x": "3",
        "y": "0",
        "t": "187"
    },
    {
        "x": "3",
        "y": "0",
        "t": "203"
    },
    {
        "x": "5",
        "y": "0",
        "t": "219"
    },
    {
        "x": "6",
        "y": "0",
        "t": "235"
    },
    {
        "x": "7",
        "y": "0",
        "t": "260"
    },
    {
        "x": "9",
        "y": "0",
        "t": "277"
    },
    {
        "x": "10",
        "y": "0",
        "t": "379"
    },
    {
        "x": "11",
        "y": "-1",
        "t": "408"
    },
    {
        "x": "11",
        "y": "-1",
        "t": "427"
    },
    {
        "x": "13",
        "y": "-1",
        "t": "443"
    },
    {
        "x": "14",
        "y": "-1",
        "t": "492"
    },
    {
        "x": "15",
        "y": "-1",
        "t": "508"
    },
    {
        "x": "15",
        "y": "-1",
        "t": "523"
    },
    {
        "x": "17",
        "y": "-2",
        "t": "539"
    },
    {
        "x": "18",
        "y": "-2",
        "t": "555"
    },
    {
        "x": "19",
        "y": "-2",
        "t": "587"
    },
    {
        "x": "20",
        "y": "-2",
        "t": "811"
    },
    {
        "x": "22",
        "y": "-3",
        "t": "835"
    },
    {
        "x": "24",
        "y": "-4",
        "t": "861"
    },
    {
        "x": "27",
        "y": "-4",
        "t": "892"
    },
    {
        "x": "28",
        "y": "-4",
        "t": "931"
    },
    {
        "x": "29",
        "y": "-4",
        "t": "947"
    },
    {
        "x": "31",
        "y": "-4",
        "t": "979"
    },
    {
        "x": "32",
        "y": "-4",
        "t": "1003"
    },
    {
        "x": "33",
        "y": "-4",
        "t": "1019"
    },
    {
        "x": "34",
        "y": "-4",
        "t": "1051"
    },
    {
        "x": "35",
        "y": "-4",
        "t": "1067"
    },
    {
        "x": "35",
        "y": "-4",
        "t": "1083"
    },
    {
        "x": "36",
        "y": "-4",
        "t": "1115"
    },
    {
        "x": "37",
        "y": "-4",
        "t": "1131"
    },
    {
        "x": "38",
        "y": "-4",
        "t": "1147"
    },
    {
        "x": "39",
        "y": "-4",
        "t": "1163"
    },
    {
        "x": "39",
        "y": "-4",
        "t": "1211"
    },
    {
        "x": "40",
        "y": "-4",
        "t": "1347"
    },
    {
        "x": "42",
        "y": "-4",
        "t": "1371"
    },
    {
        "x": "43",
        "y": "-5",
        "t": "1388"
    },
    {
        "x": "45",
        "y": "-5",
        "t": "1404"
    },
    {
        "x": "47",
        "y": "-5",
        "t": "1420"
    },
    {
        "x": "48",
        "y": "-5",
        "t": "1435"
    },
    {
        "x": "49",
        "y": "-5",
        "t": "1445"
    },
    {
        "x": "51",
        "y": "-5",
        "t": "1484"
    },
    {
        "x": "51",
        "y": "-5",
        "t": "1499"
    },
    {
        "x": "52",
        "y": "-5",
        "t": "1539"
    },
    {
        "x": "53",
        "y": "-5",
        "t": "1687"
    },
    {
        "x": "55",
        "y": "-5",
        "t": "1707"
    },
    {
        "x": "58",
        "y": "-5",
        "t": "1723"
    },
    {
        "x": "62",
        "y": "-5",
        "t": "1739"
    },
    {
        "x": "63",
        "y": "-5",
        "t": "1755"
    },
    {
        "x": "64",
        "y": "-6",
        "t": "1779"
    },
    {
        "x": "66",
        "y": "-6",
        "t": "1803"
    },
    {
        "x": "67",
        "y": "-6",
        "t": "1829"
    },
    {
        "x": "69",
        "y": "-6",
        "t": "1851"
    },
    {
        "x": "70",
        "y": "-6",
        "t": "1861"
    },
    {
        "x": "71",
        "y": "-6",
        "t": "1883"
    },
    {
        "x": "73",
        "y": "-6",
        "t": "1899"
    },
    {
        "x": "76",
        "y": "-6",
        "t": "1923"
    },
    {
        "x": "79",
        "y": "-6",
        "t": "1947"
    },
    {
        "x": "80",
        "y": "-6",
        "t": "1971"
    },
    {
        "x": "83",
        "y": "-6",
        "t": "1995"
    },
    {
        "x": "83",
        "y": "-6",
        "t": "2013"
    },
    {
        "x": "84",
        "y": "-6",
        "t": "2028"
    },
    {
        "x": "85",
        "y": "-6",
        "t": "2044"
    },
    {
        "x": "86",
        "y": "-6",
        "t": "2076"
    },
    {
        "x": "87",
        "y": "-6",
        "t": "2244"
    },
    {
        "x": "87",
        "y": "-6",
        "t": "2260"
    },
    {
        "x": "89",
        "y": "-6",
        "t": "2275"
    },
    {
        "x": "91",
        "y": "-6",
        "t": "2292"
    },
    {
        "x": "95",
        "y": "-6",
        "t": "2315"
    },
    {
        "x": "96",
        "y": "-6",
        "t": "2331"
    },
    {
        "x": "97",
        "y": "-6",
        "t": "2355"
    },
    {
        "x": "99",
        "y": "-6",
        "t": "2379"
    },
    {
        "x": "99",
        "y": "-7",
        "t": "2395"
    },
    {
        "x": "101",
        "y": "-7",
        "t": "2419"
    },
    {
        "x": "103",
        "y": "-7",
        "t": "2446"
    },
    {
        "x": "104",
        "y": "-7",
        "t": "2467"
    },
    {
        "x": "107",
        "y": "-7",
        "t": "2499"
    },
    {
        "x": "108",
        "y": "-7",
        "t": "2515"
    },
    {
        "x": "110",
        "y": "-7",
        "t": "2531"
    },
    {
        "x": "111",
        "y": "-7",
        "t": "2547"
    },
    {
        "x": "113",
        "y": "-7",
        "t": "2571"
    },
    {
        "x": "115",
        "y": "-7",
        "t": "2588"
    },
    {
        "x": "115",
        "y": "-7",
        "t": "2603"
    },
    {
        "x": "117",
        "y": "-7",
        "t": "2628"
    },
    {
        "x": "119",
        "y": "-7",
        "t": "2652"
    },
    {
        "x": "122",
        "y": "-7",
        "t": "2683"
    },
    {
        "x": "123",
        "y": "-7",
        "t": "2707"
    },
    {
        "x": "125",
        "y": "-7",
        "t": "2723"
    },
    {
        "x": "126",
        "y": "-7",
        "t": "2739"
    },
    {
        "x": "128",
        "y": "-7",
        "t": "2763"
    },
    {
        "x": "130",
        "y": "-7",
        "t": "2787"
    },
    {
        "x": "131",
        "y": "-7",
        "t": "2804"
    },
    {
        "x": "134",
        "y": "-7",
        "t": "2820"
    },
    {
        "x": "136",
        "y": "-7",
        "t": "2835"
    },
    {
        "x": "138",
        "y": "-7",
        "t": "2851"
    },
    {
        "x": "139",
        "y": "-7",
        "t": "2861"
    },
    {
        "x": "139",
        "y": "-7",
        "t": "2883"
    },
    {
        "x": "141",
        "y": "-7",
        "t": "2899"
    },
    {
        "x": "142",
        "y": "-7",
        "t": "2915"
    },
    {
        "x": "144",
        "y": "-7",
        "t": "2939"
    },
    {
        "x": "146",
        "y": "-7",
        "t": "2963"
    },
    {
        "x": "147",
        "y": "-7",
        "t": "2987"
    },
    {
        "x": "149",
        "y": "-7",
        "t": "3004"
    },
    {
        "x": "150",
        "y": "-7",
        "t": "3038"
    },
    {
        "x": "153",
        "y": "-7",
        "t": "3052"
    },
    {
        "x": "154",
        "y": "-7",
        "t": "3076"
    },
    {
        "x": "155",
        "y": "-7",
        "t": "3275"
    },
    {
        "x": "155",
        "y": "-7",
        "t": "3451"
    },
    {
        "x": "157",
        "y": "-7",
        "t": "3467"
    },
    {
        "x": "158",
        "y": "-8",
        "t": "3796"
    },
    {
        "x": "160",
        "y": "-8",
        "t": "3819"
    },
    {
        "x": "161",
        "y": "-8",
        "t": "3829"
    },
    {
        "x": "163",
        "y": "-8",
        "t": "3844"
    },
    {
        "x": "165",
        "y": "-8",
        "t": "3859"
    },
    {
        "x": "167",
        "y": "-8",
        "t": "3876"
    },
    {
        "x": "169",
        "y": "-8",
        "t": "3892"
    },
    {
        "x": "170",
        "y": "-8",
        "t": "3907"
    },
    {
        "x": "171",
        "y": "-8",
        "t": "3939"
    },
    {
        "x": "173",
        "y": "-8",
        "t": "3955"
    },
    {
        "x": "174",
        "y": "-8",
        "t": "3980"
    },
    {
        "x": "175",
        "y": "-8",
        "t": "4003"
    },
    {
        "x": "175",
        "y": "-8",
        "t": "4043"
    },
    {
        "x": "176",
        "y": "-8",
        "t": "4355"
    },
    {
        "x": "177",
        "y": "-8",
        "t": "4403"
    },
    {
        "x": "178",
        "y": "-8",
        "t": "4427"
    },
    {
        "x": "179",
        "y": "-8",
        "t": "4459"
    },
    {
        "x": "181",
        "y": "-8",
        "t": "4475"
    },
    {
        "x": "183",
        "y": "-8",
        "t": "4499"
    },
    {
        "x": "183",
        "y": "-8",
        "t": "4509"
    },
    {
        "x": "184",
        "y": "-8",
        "t": "4524"
    },
    {
        "x": "185",
        "y": "-8",
        "t": "4536"
    },
    {
        "x": "186",
        "y": "-8",
        "t": "4587"
    },
    {
        "x": "187",
        "y": "-8",
        "t": "4707"
    },
    {
        "x": "187",
        "y": "-8",
        "t": "4739"
    },
    {
        "x": "190",
        "y": "-8",
        "t": "4756"
    },
    {
        "x": "193",
        "y": "-8",
        "t": "4771"
    },
    {
        "x": "194",
        "y": "-8",
        "t": "4781"
    },
    {
        "x": "195",
        "y": "-8",
        "t": "4797"
    },
    {
        "x": "196",
        "y": "-8",
        "t": "4811"
    },
    {
        "x": "198",
        "y": "-8",
        "t": "4843"
    },
    {
        "x": "199",
        "y": "-8",
        "t": "4859"
    },
    {
        "x": "200",
        "y": "-8",
        "t": "4875"
    },
    {
        "x": "202",
        "y": "-8",
        "t": "4891"
    },
    {
        "x": "203",
        "y": "-8",
        "t": "4907"
    },
    {
        "x": "205",
        "y": "-8",
        "t": "4931"
    },
    {
        "x": "207",
        "y": "-8",
        "t": "4980"
    },
    {
        "x": "208",
        "y": "-8",
        "t": "5011"
    },
    {
        "x": "209",
        "y": "-8",
        "t": "5027"
    },
    {
        "x": "210",
        "y": "-8",
        "t": "5099"
    },
    {
        "x": "211",
        "y": "-8",
        "t": "5148"
    },
    {
        "x": "212",
        "y": "-8",
        "t": "5180"
    },
    {
        "x": "214",
        "y": "-8",
        "t": "5195"
    },
    {
        "x": "215",
        "y": "-8",
        "t": "5227"
    },
    {
        "x": "216",
        "y": "-8",
        "t": "5275"
    },
    {
        "x": "217",
        "y": "-8",
        "t": "5299"
    },
    {
        "x": "218",
        "y": "-8",
        "t": "5315"
    },
    {
        "x": "219",
        "y": "-9",
        "t": "5339"
    },
    {
        "x": "219",
        "y": "-9",
        "t": "5355"
    },
    {
        "x": "220",
        "y": "-9",
        "t": "5371"
    },
    {
        "x": "221",
        "y": "-9",
        "t": "5387"
    },
    {
        "x": "222",
        "y": "-9",
        "t": "5403"
    },
    {
        "x": "223",
        "y": "-9",
        "t": "5455"
    },
    {
        "x": "223",
        "y": "-9",
        "t": "5479"
    },
    {
        "x": "224",
        "y": "-9",
        "t": "5527"
    },
    {
        "x": "225",
        "y": "-9",
        "t": "5564"
    },
    {
        "x": "226",
        "y": "-9",
        "t": "5603"
    },
    {
        "x": "227",
        "y": "-9",
        "t": "5619"
    },
    {
        "x": "227",
        "y": "-9",
        "t": "5635"
    },
    {
        "x": "227",
        "y": "-10",
        "t": "5667"
    },
    {
        "x": "228",
        "y": "-10",
        "t": "5691"
    },
    {
        "x": "228",
        "y": "-10",
        "t": "6075"
    }
]
    # 检查value是否在轨迹的x值中
    for trajectory in trackList:
        if int(trajectory['x']) == distance:
            # 如果找到，截取从轨迹开始到该点的子数组
            return [t for t in trackList if int(t['x']) <= distance]

    # 如果value不在x值中，找到最接近value的x值
    closest_x = None
    min_diff = float('inf')
    for trajectory in trackList:
        if abs(int(trajectory['x']) - distance) < min_diff:
            min_diff = abs(int(trajectory['x']) - distance)
            closest_x = int(trajectory['x'])

    # 截取从轨迹开始到最接近的x值的子数组
    result = [t for t in trackList if int(t['x']) <= closest_x]
    result[-1]['x'] = str(distance)
    return result


def encrypt(n):
    js = '''
        encrypt = function(n) {
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
    '''

    requests_str = execjs.compile(js).call('get_data',n)
    return requests_str

def get_index():
    url = 'https://exaccount2.eastmoney.com/home/Login4?rc=431727180'
    html = requests.get(url=url, headers=headers).content.decode()

    tree = etree.HTML(html)

    hdAccountCaptContextId = tree.xpath('//input[@id="hdAccountCaptContextId"]/@value')[0]
    hdMobCaptContextId = tree.xpath('//input[@id="hdMobCaptContextId"]/@value')[0]

    logger.info(f'hdAccountCaptContextId: {hdAccountCaptContextId}')
    logger.info(f'hdMobCaptContextId: {hdMobCaptContextId}')

    return hdAccountCaptContextId, hdMobCaptContextId

def get_captcha(account):
    hdAccountCaptContextId, hdMobCaptContextId = get_index()

    request_str = "appid=" + '201802274651' + "|ctxid=" + hdMobCaptContextId + "|a=" + account + "|p=" + '' + "|r=" + str(random.random())

    url = "https://smartvcode2.eastmoney.com/Titan/api/captcha/get"
    params = {
        'ctxid':hdMobCaptContextId,
        'request':encrypt(request_str),
        "_": f"{time.time() * 1000}"
    }
    response = requests.get(url, headers=headers, params=params)

    logger.info(f"获取captcha/get响应: {response.text}")

    return hdMobCaptContextId

def get_Validate(account):
    ctxid = get_captcha(account)
    wugan = "236,21,0:234,20,10:230,18,23:226,18,39:220,17,54:214,17,71:205,16,87:196,15,103:192,15,119:188,15,134:183,16,150:172,18,166:165,18,183:155,19,199:152,19,215:151,20,231:150,20,431:149,19,446:148,19,559:145,19,575:143,19,591:140,18,606:139,18,616:135,18,638:132,18,662:128,18,678:123,18,702:119,18,718:113,18,734:108,19,750:105,19,767:104,19,800:104,20,815:103,21,830"
    url = "https://smartvcode2.eastmoney.com/Titan/api/captcha/Validate"
    request_str = "appid=" + '201802274651' + "|ctxid=" + ctxid + "|type=" + "init" + "|u=" + "" + "|d=" + wugan + "|a=" + account + "|p=" + "" + "|t=" + str(random.randint(1800,1900)) + "|r=" + str(random.random())

    params = {
        'ctxid':ctxid,
        'request':encrypt(request_str),
        "_": f"{time.time() * 1000}"
    }
    response = requests.get(url, headers=headers, params=params)

    logger.info(f"获取captcha/Validate响应: {response.text}")

    url = "https://smartvcode2.eastmoney.com/Titan/api/captcha/get"
    request_str = "appid=" + '201802274651' + "|ctxid=" + ctxid + "|a=" + account + "|p=" + '' + "|r=" + str(random.random())
    params = {
        'ctxid':ctxid,
        'request':encrypt(request_str),
        "_": f"{time.time() * 1000}"
    }
    headers['cookie'] = f'qgqp_b_id={"".join(random.choice(string.ascii_letters + string.digits) for _ in range(19))}; p_origin=https://passport2.eastmoney.com; st_inirUrl=https://www.baidu.com/link; st_sn=2;'
    response = requests.get(url, headers=headers, params=params).json()

    logger.info(f"第二次获取captcha/get响应: {response}")

    baseUrl = 'https://'

    CaptchaInfo = json.loads(response['Data']['CaptchaInfo'])
    static_servers = CaptchaInfo['static_servers'][0]

    bg = requests.get(url=baseUrl+static_servers+CaptchaInfo['bg'],headers=headers).content
    slice = requests.get(url=baseUrl+static_servers+CaptchaInfo['slice'],headers=headers).content

    with open('slice.png', 'wb') as f:
        f.write(slice)

    logger.info(f"bg: {baseUrl+static_servers+CaptchaInfo['bg']}")
    logger.info(f"slice: {baseUrl+static_servers+CaptchaInfo['slice']}")

    # 还原图片
    shuffle_slices(bg,'restored')

    det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    gay = det.slide_match(open('restored.jpg', 'rb').read(), open('slice.png', 'rb').read(), simple_target=True)['target'][0]

    gay = int(gay * (261.6 / 312))

    logger.info(f'滑动距离为：{gay}')
    return ctxid,gay

def get_verify(account):
    ctxid,gay = get_Validate(account)
    gj = guiji(gay)

    gj_list =[]
    for gjx in gj:
        gj_list.append(gjx['x']+','+gjx['y']+','+gjx['t'])
    gj_list = ':'.join(gj_list)

    logger.info(f'轨迹: {gj_list}')

    url = "https://smartvcode2.eastmoney.com/Titan/api/captcha/Validate"

    request_str = "appid=" + '201802274651' + "|ctxid=" + ctxid + "|type=" + "slide" + "|u=" + str(gay) + "|d=" + gj_list + "|a=" + account + "|p=" + "" + "|t=" + str(random.randint(1800,1900)) + "|r=" + str(random.random())

    params = {
        'ctxid':ctxid,
        'request':encrypt(request_str),
        "_": f"{time.time() * 1000}"
    }
    response = requests.get(url, headers=headers, params=params).json()

    logger.info(f"东方财富滑块验证: {response}")

if __name__ == '__main__':
    get_verify('13469854143')