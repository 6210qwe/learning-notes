# -*- coding: utf-8 -*-
import requests
import re
import ddddocr
import random
import json
from loguru import logger
import cv2
import numpy as np
import execjs


def get_captcha(move_x, code3, captchaUuid, rid):
    with open("jscode.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    xb_run = execjs.compile(js_code)
    result = xb_run.call('get_captcha', move_x, code3, captchaUuid, rid)
    return result


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
    cv2.imwrite('img/distinguish.jpg', bg_img)  # 保存在本地
    # 返回缺口的X坐标
    return int(max_loc[0] / 2)


def get_sm_track(distance):
    track_length = random.randint(4, 7)
    track = [[0, -2, 0]]
    m = distance % track_length
    e = int(distance / track_length)
    for i in range(track_length):
        x = (i + 1) * e + m + random.randint(20, 40)
        y = -2 + (random.randint(-1, 10))
        t = (i + 1) * 100 + random.randint(-3, 5)
        if i == track_length - 1:
            x = distance
            track.append([x, y, t])
        else:
            track.append([x, y, t])
    return track


class ShuMei:
    def __init__(self):
        self.requests = requests.session()
        self.requests.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://www.ishumei.com',
            'Pragma': 'no-cache',
            'Referer': 'https://www.ishumei.com/trial/captcha.html',
            'Sec-Fetch-Dest': 'script',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.rid = None
        self.captchaUuid = None
        self.box = None

    def save_img(self, img_url, save_path):
        res = self.requests.get(img_url)
        with open(save_path, 'wb') as fp:
            fp.write(res.content)
        return res

    def init_image(self):
        params = {
            'callback': 'sm_1750398261037',
            'captchaUuid': '20250620134411EQhPe5fMZRirt8EpQK',
            'organization': 'd6tpAY1oV0Kv5jRSgxQr',
            'data': '{}',
            'appId': 'default',
            'rversion': '1.0.4',
            'model': 'slide',
            'channel': 'DEFAULT',
            'lang': 'zh-cn',
            'sdkver': '1.1.3',
        }
        response = self.requests.get('https://captcha1.fengkongcloud.cn/ca/v1/register', params=params).text
        results = json.loads(response[response.find("(", ) + 1:response.rfind(")")])
        logger.info(f"滑块初始化成功:{response}")
        domains = results['detail']['domains']
        # 随机
        domain = random.choice(domains)
        bg = "https://" + domain + results['detail']['bg']
        fg = "https://" + domain + results['detail']['fg']
        # 识别距离
        self.rid = results['detail']['rid']
        self.captchaUuid = params['captchaUuid']
        bg_res = self.save_img(bg, "img/bg.png")
        fg_res = self.save_img(fg, "img/slide.png")
        box = identify_gap(bg_res.content, fg_res.content)
        logger.success(f"滑动距离为:{box}")
        self.box = box
        return results

    def get_captcha(self):
        self.requests.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Origin': 'https://castatic.fengkongcloud.cn',
            'Pragma': 'no-cache',
            'Referer': 'https://castatic.fengkongcloud.cn/',
            'Sec-Fetch-Dest': 'script',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        code3 = get_sm_track(self.box)
        params = get_captcha(self.box, code3, self.captchaUuid, self.rid)
        response = self.requests.get('https://captcha1.fengkongcloud.cn/ca/v2/fverify', params=params)
        logger.info(response.text)

    def run(self):
        self.init_image()
        self.get_captcha()


for i in range(5):
    ShuMei().run()
