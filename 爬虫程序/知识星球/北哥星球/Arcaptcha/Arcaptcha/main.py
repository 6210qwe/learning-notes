# -*- coding: utf-8 -*-
import random
import string
import execjs
import requests
from loguru import logger
import base64
from 识别 import get_distance


def w():
    chars = string.digits + string.ascii_lowercase
    rand_str = ''.join(random.choices(chars, k=10))  # 生成 10 位随机字符串
    return rand_str


def slide_verify():
    # recognizer识别
    from captcha_recognizer.recognizer import Recognizer

    recognizer = Recognizer()
    box, confidence = recognizer.identify_gap(source=r'D:\逆向练手\vmp\Arcaptcha\bj.png',
                                              verbose=False)
    mouse_x = box[0]
    return int(mouse_x)


def get_array1(bowman_id):
    with open(r"D:\逆向练手\vmp\Arcaptcha\jscode.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    js_run = execjs.compile(js_code)
    array1 = js_run.call('init_bowman_id', bowman_id)
    return array1


def decrypt_image_init(image_code2):
    with open(r"D:\逆向练手\vmp\Arcaptcha\jscode.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    js_run = execjs.compile(js_code)
    array1 = js_run.call('decrypt_image_init', image_code2)
    return array1


def decrypt_get_captcha(answers, challenge_id, site_key):
    with open(r"D:\逆向练手\vmp\Arcaptcha\jscode.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    js_run = execjs.compile(js_code)
    array1 = js_run.call('encrypt_captcha', answers, challenge_id, site_key)
    return array1


class Arcaptcha:
    def __init__(self):
        self.requests = requests.session()
        self.proxies = {
            "http": "http://127.0.0.1:7890",
            "https": "http://127.0.0.1:7890",
        }
        self.requests.headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-AU,en;q=0.9',
            'cache-control': 'no-cache',
            'origin': 'https://arcaptcha.co',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://arcaptcha.co/',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        }
        self.cookies = {
            '_clck': '3r2kfl%7C2%7Cfxu%7C0%7C2030',
            'crisp-client%2Fsession%2Fe3af0705-8e07-42b1-8b7b-b7c1a2badfb7': 'session_8cd245a2-9619-4161-bb10-7efcb84c3af5',
            'i18n_redirected': 'en',
            '_clsk': '1ukqq5u%7C1753243366819%7C3%7C1%7Cq.clarity.ms%2Fcollect',
            'arVerification': 'AAAAAAAAAAAAAAAAAAAAANHZbSPYZBKCB%2B7Y%2FkbdfHVsyNnYTOnhhMlBipGAo08oXe3LZonyO0tabMn8wzaOXy3kgq6o1TzgXhbvqSWKk0bwQ6x6Oe8igdM%2FhdYmXXUAk45dndVC',
        }
        self.fp = 'bb70bee8f867e7663b9f637b31bce7fd'  # 当前网站固定fp
        self.u = None
        self.site_key = None
        self.y = None
        self.challenge_id = None
        self.answers = None
        self.fk = w()

    def with_image(self, fileName, imgUrl):
        img = requests.get(url=imgUrl, proxies=self.proxies).content
        with open(fileName, 'wb') as f:
            f.write(img)

    def init_ck(self):
        params = {
            'fp': self.fp,
            'fk': self.fk
        }
        response = self.requests.get('https://bowman.arcaptcha.co/rWvPrXwA', params=params, proxies=self.proxies,
                                     cookies=self.cookies)
        self.cookies = {**self.cookies, **response.cookies.get_dict()}
        return

    def init_bowman_id(self):
        params = {
            'fp': self.fp,
            'fk': self.fk
        }
        response = self.requests.get('https://bowman.arcaptcha.co/rWvPrXwA', params=params, proxies=self.proxies,
                                     cookies=self.cookies).json()
        self.u = response['u']
        logger.info(f"初始化bowman_id成功:{self.u}")
        return

    def image_init(self):
        self.requests.headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-AU,en;q=0.9',
            'cache-control': 'no-cache',
            'content-language': 'en',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://arcaptcha.co',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://arcaptcha.co/',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        }
        params = {
            'id': self.u
        }

        data = bytes(get_array1(self.u))
        response = self.requests.post('https://api.arcaptcha.ir/arcaptcha/api/create', params=params,
                                      cookies=self.cookies, proxies=self.proxies,
                                      data=data)
        binary_data = response.content
        base64_data = base64.b64encode(binary_data).decode('utf-8')
        image_obj = decrypt_image_init(base64_data)
        image_obj = image_obj['content']
        self.site_key = image_obj['site_key']
        self.challenge_id = image_obj['challenge_id']
        self.y = image_obj['y']
        url1 = f'https://api.arcaptcha.ir/arcaptcha/api/puzzles/{image_obj["site_key"]}/undefined/{image_obj["puzzle_background"]}'
        url2 = f'https://api.arcaptcha.ir/arcaptcha/api/puzzles/{image_obj["site_key"]}/undefined/{image_obj["puzzle_piece"]}'
        self.with_image("bj.png", url1)
        self.with_image("qk.png", url2)

        with open("bj.png", "rb") as f:
            bg = f.read()
        with open("qk.png", "rb") as f:
            cut = f.read()
        mouse = int(get_distance(bg, cut, False))
        # mouse = int(slide_verify())
        # mouse = int(input("输入滑块距离:"))
        logger.info(f"识别出移动距离为:{mouse}")
        # self.answers = int(mouse * 234 / 260)
        self.answers = int(mouse)
        # logger.info(f"实际移动距离为:{self.answers}")

    def get_captcha(self):
        self.requests.headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-AU,en;q=0.9',
            'cache-control': 'no-cache',
            'content-language': 'fa',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://arcaptcha.co',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://arcaptcha.co/',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        }
        data = bytes(decrypt_get_captcha(self.answers, self.challenge_id, self.site_key))
        response = self.requests.post('https://api.arcaptcha.ir/arcaptcha/api/answer', data=data)
        binary_data = response.content
        base64_data = base64.b64encode(binary_data).decode('utf-8')
        resp_code = decrypt_image_init(base64_data)
        logger.info(resp_code)

    def run(self):
        self.init_ck()
        self.init_bowman_id()
        self.image_init()
        self.get_captcha()


if __name__ == '__main__':
    Arcaptcha().run()
