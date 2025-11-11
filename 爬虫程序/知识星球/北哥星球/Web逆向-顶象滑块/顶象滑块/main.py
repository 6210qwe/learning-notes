import time
import requests
import cv2
import numpy as np
import base64
import subprocess
import random
from PIL import Image
from loguru import logger


class MySubprocessPopen(subprocess.Popen):
    def __init__(self, *args, **kwargs):
        # 在调用父类（即 subprocess.Popen）的构造方法时，将 encoding 参数直接置为 UTF-8 编码格式
        super().__init__(*args, **kwargs)


subprocess.Popen = MySubprocessPopen
import execjs


def with_image(fileName, imgUrl):
    img = requests.get(url=imgUrl).content
    with open(fileName, 'wb') as f:
        f.write(img)


def a(n, e):
    t = [1, 0, 2]
    i = 0
    while True:
        case = t[i]
        i += 1
        if case == 0:
            for item in n:
                if item == e:
                    return True
            continue
        elif case == 1:
            if hasattr(n, '__contains__'):  # Similar to checking for 'includes' method
                return e in n
            continue
        elif case == 2:
            return False
        break


def get_arr(img):
    oo = img.split("/")[-1].split(".")[0]
    r = []
    for o in range(len(oo)):
        if o == 32:
            break
        c = ord(oo[o])
        while a(r, c % 32):
            c += 1
        r.append(c % 32)
    return r


def gen(arr, _img, _imgs):
    # 创建一个新的背景图
    new_img = Image.new('RGB', (400, 200))  # 宽400 高200

    for index in range(len(arr)):
        c = arr[index] * 12
        # 从背景图中扣出相应的小图
        l = _img.crop((c, 0, c + 12, 200))  # 图片剪切crop(x,y,x1,y1) 四个坐标
        # 将扣出的小图 还原到正确的位置
        new_x = index * 12
        new_img.paste(l, (new_x, 0))
    new_img.paste(_img.crop((384, 0, 400, 200)), (384, 0))  # 最后的边框 32*12=384
    new_img.save(_imgs)


def identify_gap(fg, bg):
    bg_img = cv2.imdecode(np.asarray(bytearray(bg), dtype=np.uint8), 0)  # 背景图片
    bg_img2 = bg_img.copy()  # 背景图片
    bg_pic2 = cv2.cvtColor(bg_img2, cv2.COLOR_GRAY2RGB)

    tp_img = cv2.imdecode(np.asarray(bytearray(fg), dtype=np.uint8), 0)  # 缺口图片
    # 识别图片边缘
    bg_img[bg_img < 60] = 0
    bg_img[bg_img >= 60] = 255
    bg_edge = cv2.Canny(bg_img, 0, 20)

    tp_edge = cv2.Canny(tp_img, 100, 200)
    # 转换图片格式
    bg_pic = cv2.cvtColor(bg_edge, cv2.COLOR_GRAY2RGB)
    tp_pic = cv2.cvtColor(tp_edge, cv2.COLOR_GRAY2RGB)
    # 缺口匹配
    s = cv2.matchTemplate(bg_pic, tp_pic, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(s)  # 寻找最优匹配
    # 绘制方框
    th, tw = tp_pic.shape[:2]
    tl = max_loc  # 左上角点的坐标
    br = (tl[0] + tw, tl[1] + th)  # 右下角点的坐标
    # cv2.rectangle(bg_pic2, tl, br, (0, 255, 255), 2)  # 绘制矩形
    # cv2.imwrite("3.png", bg_pic2)
    distance = tl[0]
    # 返回缺口的X坐标
    return distance


def get_gap():
    with open("image/bgs.png", "rb") as f:
        bg = f.read()
    with open("image/p2.png", "rb") as f:
        cut = f.read()
    return identify_gap(bg, cut)


def get_result(x, y, sid):
    with open('js_code/js_code.js', mode='r', encoding='utf-8') as f:
        js_file = f.read()
    js_code = execjs.compile(js_file)
    js_result = js_code.call('getAc', x, y, sid)
    return js_result


class DingXng:
    def __init__(self):
        self.requests = requests.session()
        self.requests.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://www.dingxiang-inc.com',
            'Pragma': 'no-cache',
            'Referer': 'https://www.dingxiang-inc.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.sid = None
        self.cid = None
        self.y = None
        self.c = None

    def image_init(self):
        params = {
            'w': '380',
            'h': '165',
            's': '50',
            'ak': '99de95ad1f23597c23b3558d932ded3c',
            'c': '685b9106qePY9vS8Xm5y4JFYGJmjx7KZihfB9rs1',
            'jsv': '5.1.53',
            "aid": f"dx-{int(time.time() * 1e3)}-31422442-1",
            'wp': '1',
            'de': '0',
            'uid': '',
            'lf': '0',
            'tpc': '',
            'cid': '23066966',
            '_r': '0.28836907321918837',
        }
        response = self.requests.get('https://cap.dingxiang-inc.com/api/a', params=params).json()

        p1 = "https://static4.dingxiang-inc.com/picture" + response['p1']
        p2 = "https://static4.dingxiang-inc.com/picture" + response['p2']

        with_image("image/p1.png", p1)
        with_image("image/p2.png", p2)

        self.cid = response['cid']
        self.sid = response['sid']
        self.y = response['y']
        _imgArr = get_arr(p1)
        gen(_imgArr, Image.open('image/p1.png'), './image/bgs.png')

    def get_c(self):
        self.requests.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'If-None-Match': '685b9106qePY9vS8Xm5y4JFYGJmjx7KZihfB9rs1',
            'Origin': 'https://www.dingxiang-inc.com',
            'Param': '4974#X8XI3Tos1VIe341LyqoeXrm89kz8Qv+oLeKPQ4kyCGYjQbsArU1P7ZDrVpJ354PLCK+uQSDArsPR74t5dpAIqnzldepj5n+MrpYYobYM9Ks+qnwxVJs6Q4UMCsj/G46MrinjXX07NrtDf7rDcCDkar8XIQUztiF1lnl2ylhWlW0t2BFuQZ1mNU1DMFtytHtuoHpb7iFxCUq6SJl2NkPDc+wJeOtKm8Xe2Ouaa8phcgPP2fJP/xiPCxuhC4sumf+PmCPum43uCSOP/SWuMaih/r/T28==',
            'Pragma': 'no-cache',
            'Referer': 'https://www.dingxiang-inc.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }

        params = {
            '_t': '44391',
        }
        response = self.requests.get('https://constid.dingxiang-inc.com/udid/c1', params=params).json()
        self.c = response['data']

    def get_js(self):
        self.requests.headers = {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'no-cache',
            'origin': 'https://www.dingxiang-inc.com',
            'pragma': 'no-cache',
            'referer': 'https://www.dingxiang-inc.com/',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        }

        params = {
            '_t': '486344',
        }

        js = self.requests.get('https://cdn.dingxiang-inc.com/ctu-group/ctu-greenseer/greenseer.js', params=params).text
        with open('js_code/init_js.js', 'w', encoding='utf-8') as f:
            f.write(js)

    def get_captcha(self):
        with open("image/bgs.png", "rb") as f:
            bg = f.read()
        with open("image/p2.png", "rb") as f:
            cut = f.read()
        slide_x = identify_gap(bg, cut)
        logger.info(f"滑动距离为:{slide_x}")
        slide_x = int(slide_x * (380 / 400))  # 等比例缩放

        self.requests.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-type': 'application/x-www-form-urlencoded',
            'Origin': 'https://www.dingxiang-inc.com',
            'Pragma': 'no-cache',
            'Referer': 'https://www.dingxiang-inc.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }

        ac = get_result(slide_x, self.y, self.sid)
        logger.info(ac)
        data = {
            'ac': ac,
            'ak': '99de95ad1f23597c23b3558d932ded3c',
            'c': self.c,
            'uid': '',
            'jsv': '5.1.53',
            'sid': self.sid,
            "aid": f"dx-{int(time.time() * 1e3)}-31422442-1",
            'x': str(slide_x),  # 滑动距离
            'y': self.y,
            'w': '380',
            'h': '165',
        }
        response = self.requests.post('https://cap.dingxiang-inc.com/api/v1', data=data).text
        logger.debug(response)

    def run(self):
        self.image_init()
        self.get_c()
        self.get_js()
        self.get_captcha()


#
if __name__ == '__main__':
    DingXng().run()
