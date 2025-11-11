import time,random,base64,zlib
import execjs,re,json,cv2
import numpy as np
from curl_cffi import requests
from loguru import logger

def get_jiegzip(gzip_str):
    # 将 base64 编码的字符串解码为字节数据
    gzip_data = base64.b64decode(gzip_str)

    # 解压 gzip 数据，zlib.MAX_WBITS | 16 用于处理 gzip 格式
    uncompressed_data = zlib.decompress(gzip_data, zlib.MAX_WBITS | 16).decode('utf-8')
    return uncompressed_data


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
    distance = distance + 75 + random.randint(0, 3)  # 随机偏移
    trackList = [
    {
        "x": 75,
        "y": 377,
        "t": 1,
        "time": 1749631655207
    },
    {
        "x": 76,
        "y": 377,
        "t": 2,
        "time": 163
    },
    {
        "x": 77,
        "y": 377,
        "t": 2,
        "time": 72
    },
    {
        "x": 78,
        "y": 377,
        "t": 2,
        "time": 28
    },
    {
        "x": 79,
        "y": 377,
        "t": 2,
        "time": 80
    },
    {
        "x": 79,
        "y": 377,
        "t": 2,
        "time": 24
    },
    {
        "x": 80,
        "y": 377,
        "t": 2,
        "time": 120
    },
    {
        "x": 81,
        "y": 377,
        "t": 2,
        "time": 43
    },
    {
        "x": 82,
        "y": 377,
        "t": 2,
        "time": 12
    },
    {
        "x": 83,
        "y": 377,
        "t": 2,
        "time": 24
    },
    {
        "x": 83,
        "y": 377,
        "t": 2,
        "time": 24
    },
    {
        "x": 83,
        "y": 378,
        "t": 2,
        "time": 25
    },
    {
        "x": 84,
        "y": 378,
        "t": 2,
        "time": 47
    },
    {
        "x": 85,
        "y": 378,
        "t": 2,
        "time": 33
    },
    {
        "x": 86,
        "y": 378,
        "t": 2,
        "time": 7
    },
    {
        "x": 87,
        "y": 378,
        "t": 2,
        "time": 16
    },
    {
        "x": 87,
        "y": 378,
        "t": 2,
        "time": 8
    },
    {
        "x": 88,
        "y": 378,
        "t": 2,
        "time": 8
    },
    {
        "x": 88,
        "y": 378,
        "t": 2,
        "time": 16
    },
    {
        "x": 89,
        "y": 378,
        "t": 2,
        "time": 169
    },
    {
        "x": 90,
        "y": 378,
        "t": 2,
        "time": 24
    },
    {
        "x": 91,
        "y": 378,
        "t": 2,
        "time": 15
    },
    {
        "x": 93,
        "y": 378,
        "t": 2,
        "time": 8
    },
    {
        "x": 97,
        "y": 379,
        "t": 2,
        "time": 8
    },
    {
        "x": 101,
        "y": 379,
        "t": 2,
        "time": 8
    },
    {
        "x": 104,
        "y": 379,
        "t": 2,
        "time": 9
    },
    {
        "x": 108,
        "y": 379,
        "t": 2,
        "time": 7
    },
    {
        "x": 112,
        "y": 379,
        "t": 2,
        "time": 9
    },
    {
        "x": 115,
        "y": 379,
        "t": 2,
        "time": 7
    },
    {
        "x": 117,
        "y": 379,
        "t": 2,
        "time": 9
    },
    {
        "x": 119,
        "y": 379,
        "t": 2,
        "time": 7
    },
    {
        "x": 119,
        "y": 379,
        "t": 2,
        "time": 24
    },
    {
        "x": 120,
        "y": 379,
        "t": 2,
        "time": 172
    },
    {
        "x": 121,
        "y": 379,
        "t": 2,
        "time": 232
    },
    {
        "x": 122,
        "y": 380,
        "t": 2,
        "time": 44
    },
    {
        "x": 123,
        "y": 380,
        "t": 2,
        "time": 10
    },
    {
        "x": 123,
        "y": 380,
        "t": 2,
        "time": 275
    },
    {
        "x": 124,
        "y": 380,
        "t": 2,
        "time": 12
    },
    {
        "x": 125,
        "y": 380,
        "t": 2,
        "time": 8
    },
    {
        "x": 126,
        "y": 381,
        "t": 2,
        "time": 16
    },
    {
        "x": 127,
        "y": 381,
        "t": 2,
        "time": 7
    },
    {
        "x": 127,
        "y": 381,
        "t": 2,
        "time": 40
    },
    {
        "x": 128,
        "y": 381,
        "t": 2,
        "time": 9
    },
    {
        "x": 129,
        "y": 381,
        "t": 2,
        "time": 18
    },
    {
        "x": 130,
        "y": 381,
        "t": 2,
        "time": 6
    },
    {
        "x": 131,
        "y": 381,
        "t": 2,
        "time": 39
    },
    {
        "x": 131,
        "y": 381,
        "t": 2,
        "time": 25
    },
    {
        "x": 132,
        "y": 381,
        "t": 2,
        "time": 8
    },
    {
        "x": 133,
        "y": 381,
        "t": 2,
        "time": 24
    },
    {
        "x": 134,
        "y": 381,
        "t": 2,
        "time": 7
    },
    {
        "x": 135,
        "y": 381,
        "t": 2,
        "time": 8
    },
    {
        "x": 135,
        "y": 381,
        "t": 2,
        "time": 72
    },
    {
        "x": 136,
        "y": 381,
        "t": 2,
        "time": 16
    },
    {
        "x": 137,
        "y": 381,
        "t": 2,
        "time": 41
    },
    {
        "x": 138,
        "y": 382,
        "t": 2,
        "time": 16
    },
    {
        "x": 139,
        "y": 382,
        "t": 2,
        "time": 16
    },
    {
        "x": 139,
        "y": 382,
        "t": 2,
        "time": 39
    },
    {
        "x": 140,
        "y": 382,
        "t": 2,
        "time": 24
    },
    {
        "x": 141,
        "y": 382,
        "t": 2,
        "time": 32
    },
    {
        "x": 143,
        "y": 382,
        "t": 2,
        "time": 8
    },
    {
        "x": 143,
        "y": 382,
        "t": 2,
        "time": 8
    },
    {
        "x": 146,
        "y": 382,
        "t": 2,
        "time": 8
    },
    {
        "x": 147,
        "y": 382,
        "t": 2,
        "time": 8
    },
    {
        "x": 147,
        "y": 382,
        "t": 2,
        "time": 9
    },
    {
        "x": 148,
        "y": 382,
        "t": 2,
        "time": 7
    },
    {
        "x": 151,
        "y": 382,
        "t": 2,
        "time": 10
    },
    {
        "x": 152,
        "y": 382,
        "t": 2,
        "time": 7
    },
    {
        "x": 155,
        "y": 382,
        "t": 2,
        "time": 9
    },
    {
        "x": 157,
        "y": 382,
        "t": 2,
        "time": 7
    },
    {
        "x": 160,
        "y": 382,
        "t": 2,
        "time": 8
    },
    {
        "x": 161,
        "y": 382,
        "t": 2,
        "time": 16
    },
    {
        "x": 162,
        "y": 382,
        "t": 2,
        "time": 7
    },
    {
        "x": 163,
        "y": 382,
        "t": 2,
        "time": 172
    },
    {
        "x": 164,
        "y": 382,
        "t": 2,
        "time": 8
    },
    {
        "x": 165,
        "y": 383,
        "t": 2,
        "time": 12
    },
    {
        "x": 167,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 169,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 171,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 174,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 176,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 177,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 179,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 180,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 181,
        "y": 383,
        "t": 2,
        "time": 500
    },
    {
        "x": 183,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 183,
        "y": 383,
        "t": 2,
        "time": 17
    },
    {
        "x": 184,
        "y": 383,
        "t": 2,
        "time": 6
    },
    {
        "x": 187,
        "y": 383,
        "t": 2,
        "time": 10
    },
    {
        "x": 191,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 192,
        "y": 383,
        "t": 2,
        "time": 10
    },
    {
        "x": 194,
        "y": 383,
        "t": 2,
        "time": 6
    },
    {
        "x": 195,
        "y": 383,
        "t": 2,
        "time": 11
    },
    {
        "x": 198,
        "y": 383,
        "t": 2,
        "time": 5
    },
    {
        "x": 199,
        "y": 383,
        "t": 2,
        "time": 4
    },
    {
        "x": 201,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 202,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 203,
        "y": 383,
        "t": 2,
        "time": 48
    },
    {
        "x": 203,
        "y": 383,
        "t": 2,
        "time": 223
    },
    {
        "x": 204,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 207,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 210,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 212,
        "y": 383,
        "t": 2,
        "time": 10
    },
    {
        "x": 218,
        "y": 383,
        "t": 2,
        "time": 6
    },
    {
        "x": 222,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 223,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 226,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 229,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 231,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 231,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 232,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 233,
        "y": 383,
        "t": 2,
        "time": 273
    },
    {
        "x": 234,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 235,
        "y": 383,
        "t": 2,
        "time": 12
    },
    {
        "x": 235,
        "y": 383,
        "t": 2,
        "time": 5
    },
    {
        "x": 238,
        "y": 383,
        "t": 2,
        "time": 10
    },
    {
        "x": 241,
        "y": 383,
        "t": 2,
        "time": 6
    },
    {
        "x": 243,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 245,
        "y": 383,
        "t": 2,
        "time": 6
    },
    {
        "x": 248,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 249,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 251,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 251,
        "y": 383,
        "t": 2,
        "time": 11
    },
    {
        "x": 256,
        "y": 383,
        "t": 2,
        "time": 292
    },
    {
        "x": 259,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 261,
        "y": 383,
        "t": 2,
        "time": 10
    },
    {
        "x": 265,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 270,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 272,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 276,
        "y": 383,
        "t": 2,
        "time": 10
    },
    {
        "x": 279,
        "y": 383,
        "t": 2,
        "time": 6
    },
    {
        "x": 279,
        "y": 383,
        "t": 2,
        "time": 9
    },
    {
        "x": 280,
        "y": 383,
        "t": 2,
        "time": 488
    },
    {
        "x": 281,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 282,
        "y": 383,
        "t": 2,
        "time": 16
    },
    {
        "x": 283,
        "y": 383,
        "t": 2,
        "time": 10
    },
    {
        "x": 283,
        "y": 383,
        "t": 2,
        "time": 7
    },
    {
        "x": 284,
        "y": 383,
        "t": 2,
        "time": 15
    },
    {
        "x": 285,
        "y": 383,
        "t": 2,
        "time": 225
    },
    {
        "x": 286,
        "y": 383,
        "t": 2,
        "time": 8
    },
    {
        "x": 289,
        "y": 384,
        "t": 2,
        "time": 8
    },
    {
        "x": 292,
        "y": 384,
        "t": 2,
        "time": 7
    },
    {
        "x": 295,
        "y": 384,
        "t": 2,
        "time": 9
    },
    {
        "x": 295,
        "y": 384,
        "t": 2,
        "time": 7
    },
    {
        "x": 297,
        "y": 384,
        "t": 2,
        "time": 8
    },
    {
        "x": 298,
        "y": 385,
        "t": 2,
        "time": 16
    },
    {
        "x": 299,
        "y": 385,
        "t": 2,
        "time": 9
    },
    {
        "x": 299,
        "y": 385,
        "t": 2,
        "time": 143
    },
    {
        "x": 301,
        "y": 385,
        "t": 2,
        "time": 40
    },
    {
        "x": 303,
        "y": 385,
        "t": 2,
        "time": 8
    },
    {
        "x": 304,
        "y": 385,
        "t": 2,
        "time": 9
    },
    {
        "x": 306,
        "y": 385,
        "t": 2,
        "time": 8
    },
    {
        "x": 307,
        "y": 385,
        "t": 2,
        "time": 15
    },
    {
        "x": 307,
        "y": 385,
        "t": 2,
        "time": 9
    },
    {
        "x": 308,
        "y": 385,
        "t": 2,
        "time": 15
    },
    {
        "x": 309,
        "y": 385,
        "t": 2,
        "time": 8
    },
    {
        "x": 310,
        "y": 385,
        "t": 2,
        "time": 17
    },
    {
        "x": 311,
        "y": 385,
        "t": 2,
        "time": 10
    },
    {
        "x": 311,
        "y": 385,
        "t": 2,
        "time": 6
    },
    {
        "x": 312,
        "y": 385,
        "t": 2,
        "time": 10
    },
    {
        "x": 313,
        "y": 385,
        "t": 2,
        "time": 15
    },
    {
        "x": 314,
        "y": 385,
        "t": 2,
        "time": 7
    },
    {
        "x": 315,
        "y": 386,
        "t": 2,
        "time": 8
    },
    {
        "x": 315,
        "y": 386,
        "t": 2,
        "time": 7
    },
    {
        "x": 316,
        "y": 386,
        "t": 2,
        "time": 8
    },
    {
        "x": 318,
        "y": 386,
        "t": 2,
        "time": 8
    },
    {
        "x": 320,
        "y": 386,
        "t": 2,
        "time": 9
    },
    {
        "x": 321,
        "y": 386,
        "t": 2,
        "time": 316
    },
    {
        "x": 322,
        "y": 386,
        "t": 2,
        "time": 59
    },
    {
        "x": 323,
        "y": 386,
        "t": 2,
        "time": 24
    },
    {
        "x": 323,
        "y": 386,
        "t": 2,
        "time": 32
    },
    {
        "x": 324,
        "y": 386,
        "t": 2,
        "time": 8
    },
    {
        "x": 325,
        "y": 386,
        "t": 2,
        "time": 24
    },
    {
        "x": 326,
        "y": 386,
        "t": 2,
        "time": 8
    },
    {
        "x": 327,
        "y": 386,
        "t": 2,
        "time": 153
    },
    {
        "x": 327,
        "y": 387,
        "t": 2,
        "time": 8
    },
    {
        "x": 327,
        "y": 387,
        "t": 2,
        "time": 96
    },
    {
        "x": 327,
        "y": 388,
        "t": 2,
        "time": 203
    },
    {
        "x": 327,
        "y": 390,
        "t": 2,
        "time": 17
    },
    {
        "x": 327,
        "y": 390,
        "t": 3,
        "time": 1749631661682
    }
]
    # 检查value是否在轨迹的x值中
    for trajectory in trackList:
        if trajectory['x'] == distance:
            # 如果找到，截取从轨迹开始到该点的子数组
            return [t for t in trackList if t['x'] <= distance]

    # 如果value不在x值中，找到最接近value的x值
    closest_x = None
    min_diff = float('inf')
    for trajectory in trackList:
        if abs(trajectory['x'] - distance) < min_diff:
            min_diff = abs(trajectory['x'] - distance)
            closest_x = trajectory['x']

    # 截取从轨迹开始到最接近的x值的子数组
    result = [t for t in trackList if t['x'] <= closest_x]
    result[-1]['x'] = distance
    return result

ctx = execjs.compile(open('./csdn.js','r',encoding='utf-8').read()).call
headers = {
    "Accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://passport.csdn.net/login?code=applets",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36",
    "X-Req-Token": "1c143bd3c9d257735d840bd81ce06f28",
    "X-Requested-With": "XMLHttpRequest"
}

# https://passport.csdn.net/login?code=applets  访问该首页获取cookies

url = "https://passport.csdn.net/login"
params = {
    "code": "applets"
}
response = requests.get(url, headers=headers, params=params)
cookies = response.cookies.get_dict()


url = "https://passport.csdn.net/cdn_cgi_bs_captcha/convert"
params = {
    "callback": f"callback_{int(time.time()*1000)}",
    "_": f"{int(time.time()*1000) - random.randint(20,50)}"
}
params_v = ctx('get_cdn_cgi_bs_captcha')

# 拿到全局的fpv相当于令牌
fpv_all = params_v.pop('fpv_all')
x_req_token = params_v.pop('Token')

# 更新headers    Token
headers['X-Req-Token'] = x_req_token
params = dict(params, **params_v)
response = requests.get(url, headers=headers,cookies=cookies, params=params,impersonate='chrome101')

logger.success(f'获取滑块信息gzip:{response.text}')
body = re.findall('"body":"(.*?)"',response.text)[0]
config_data = get_jiegzip(body)
config_data = json.loads(config_data)

logger.success(f'初始化解压缩成功，config_data:{config_data}')

background_img = requests.get('https://passport.csdn.net' + config_data['background'],headers=headers,cookies=cookies).content
targetImage = requests.get('https://passport.csdn.net' + config_data['targetImage'],headers=headers,cookies=cookies).content

gen = identify_gap(background_img,targetImage)
logger.success(f'缺口距离:{gen}')

data_sliend = {
    "tracks": guiji(gen),
    "params": {
        "moveblockleft": gen,
        "randomKey": config_data['randomKey']
    }
}
data = ctx('get_csdn_verify_code',fpv_all,data_sliend)
x_req_token = data.pop('Token')
url = "https://passport.csdn.net/cdn_cgi_bs_captcha/verify"
params = {
    "callback": f"callback_{int(time.time()*1000)}"
}
headers['X-Req-Token'] = x_req_token
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

logger.success(f'CSDN验证滑块:::response:{response.text}')