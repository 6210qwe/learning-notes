# -*- coding: utf-8 -*-
import requests
import execjs
from 缺口位置识别 import detect_gap_coordinates
from loguru import logger


def get_encrypt_image():
    with open(r'jscode.js', 'r', encoding='utf-8') as f:
        jsCode = f.read()
    ctx = execjs.compile(jsCode)
    result = ctx.call('_0x4d6adf')
    return result


def get_encrypt_savePositions(move_x, move_y):
    with open(r'jscode.js', 'r', encoding='utf-8') as f:
        jsCode = f.read()
    ctx = execjs.compile(jsCode)
    result = ctx.call('savePositions', move_x, move_y)
    return result


class LeCaptcha:
    def __init__(self):
        self.requests = requests.session()
        self.requests.headers = {
            'accept': '*/*',
            'accept-language': 'en-AU,en;q=0.9',
            'cache-control': 'no-cache',
            'origin': 'https://dashboard.leminnow.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://dashboard.leminnow.com/',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        }
        self.proxies = {
            # "http": "http://127.0.0.1:7890",
            # "https": "http://127.0.0.1:7890",
        }
        self.challenge_id = None

    def init_image(self):
        init_url = get_encrypt_image()
        response = self.requests.get(url=init_url, proxies=self.proxies).text
        image_url = response.split('|')[0]
        self.challenge_id = str(init_url).split('image/')[1].split('?')[0]

        b_g_content = requests.get(url=image_url, proxies=self.proxies).content
        with open("img.png", "wb") as b:
            b.write(b_g_content)
        # print(self.challenge_id)
        logger.info(f"challenge_id:{self.challenge_id}")

    def get_captcha(self):
        image_path = 'img.png'
        output_image_path = 'marked_img_universal.png'
        center_coordinates = detect_gap_coordinates(image_path, output_image_path)
        if center_coordinates is None:
            return
        center_c = center_coordinates['center_coordinates']
        logger.info(f"移动坐标:{center_c}")

        answer = get_encrypt_savePositions(int(center_c['x']), int(center_c['y']))

        # x = input("输入x:")
        # y = input("输入y:")
        # answer = get_encrypt_savePositions(int(x), int(y))
        self.requests.headers = {
            'accept': 'application/json',
            'accept-language': 'en-AU,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'origin': 'https://dashboard.leminnow.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://dashboard.leminnow.com/',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        }
        # answer = input("输入你的answer:")
        logger.success(f"answer:{answer}")
        json_data = {
            'answer': answer,
            'challenge_id': self.challenge_id,
        }

        response = self.requests.post('https://api.leminnow.com/captcha/v1/cropped/pre-validate', proxies=self.proxies,
                                      json=json_data).text
        logger.debug(f"最终结果:{response}")

    def run(self):
        self.init_image()
        self.get_captcha()


LeCaptcha().run()
