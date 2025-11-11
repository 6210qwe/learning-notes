import time
import requests
import hashlib
import random
import ddddocr
import execjs
from PIL import Image
# from PIL.Image import Resampling
from loguru import logger
# from Yuan import YdmVerify
from captcha_recognizer.recognizer import Recognizer
recognizer = Recognizer()

def slide_verify():
    # recognizer识别
    # 图片比为 316:684
    box, confidence = recognizer.identify_gap(source=r'D:/逆向练手/滑块类/360天御/image/new.png',
                                              verbose=False)
    mouse_x = box[0]
    # print(f'可信度: {confidence}')
    logger.debug(f"识别出移动距离为：{mouse_x}")
    return int(mouse_x)

def get_image_order(bg_image_url):
    def contains(array, item):
        if hasattr(array, "includes"):
            return array.includes(item)
        for element in array:
            if element == item:
                return True
        return False

    def calculate_order(char_array):
        result = []
        for char in char_array:
            char_code = ord(char)
            if char == ' ':
                break
            while contains(result, char_code % 32):
                char_code += 1
            result.append(char_code % 32)
        return result

    def get_order(bg):
        image_name = bg.split('/')[-1].split('.')[0]
        return calculate_order(image_name)

    image_order = get_order(bg_image_url)

    return image_order


# def get_ocr():
#     """
#     识别距离
#     :return:
#     """
#     slide_verify = YdmVerify().slide_verify
#     with open('image/new.png', 'rb') as f:
#         target_bytes = f.read()
#     with open('image/new_front.jpg', 'rb') as f:
#         background_bytes = f.read()
#     data = slide_verify(background_bytes, target_bytes)
#     print(data)
#     return data
    # det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    # with open('image/new.png', 'rb') as f:
    #     target_bytes = f.read()
    # with open('image/front.jpg', 'rb') as f:
    #     background_bytes = f.read()
    # res = det.slide_match(target_bytes, background_bytes, simple_target=True)
    # print(res)
    # raclt = res.get('target')[0]  # 滑块距离
    # return raclt


def restore_image(bg_image, image_order):
    # 读取元素图像
    original_image = Image.open(bg_image)
    # 获取图像大小
    width, height = original_image.size
    # 计算每一份图像的宽度
    part_width = width // len(image_order)
    # 创建新图像对象
    restored_image = Image.new("RGB", (width, height))

    # 还原图像
    for i, order in enumerate(image_order):
        # 计算当前部分的横坐标范围
        left = i * part_width
        right = (i + 1) * part_width
        # 获取当前部分的像素数据
        part_pixels = original_image.crop((left, 0, right, height))
        # 计算还原后的位置
        restored_left = order * part_width
        restored_right = (order + 1) * part_width
        # 将当前部分放置到还原图像的对应位置
        restored_image.paste(part_pixels, (restored_left, 0, restored_right, height))

    # 缩放图片尺寸
    restored_image = restored_image.resize((300, 150), Image.LANCZOS)

    # 保存还原后的图像
    restored_image.save(r"./image/new.png")
    logger.info("背景图片还原完毕。")
    return restored_image


def encrypt_info(captchaId, token, K):
    with open('derypt.js', encoding='utf-8', mode='r') as f:
        js_code = f.read()
    result = execjs.compile(js_code).call('get_sign', captchaId, token, K)
    return result


def spider_image():
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-cn',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Origin': 'https://tianyu.360.cn',
        'Pragma': 'no-cache',
        'Referer': 'https://tianyu.360.cn/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }
    data = {
        'appId': 'dc1db94ea7b3843c',
        'type': '1',
        'version': '2.0.0',
        'pn': 'com.web.tianyu',
        'os': '3',
        'sdkName': '360CaptchaSDK',
        "timestamp": int(time.time() * 1000),
        "nonce": int(time.time() * 1000) + random.randint(0, 99999999),
        'ui': 'null',
        'rc': '0',
        'pc': '0',
        'ec': '0',
        'hc': '0',
        'xc': '0',
        'dc': '0',
        'phone': '10000000000',
    }

    sign = ""
    for key in sorted(data.keys()):
        sign += str(key) + str(data[key])
    sign = hashlib.md5(sign.encode()).hexdigest()
    data['sign'] = sign
    response = requests.post('https://captcha.jiagu.360.cn/api/v3/auth', headers=headers, data=data).json()
    data = response['data']
    k = data['k']
    captchaId = data['captchaId']
    token = data['token']
    front = data['front'][0]
    bg = data['bg'][0]
    _big_response = requests.get(url=bg).content
    with open("image/b_g.jpg", "wb") as b:
        b.write(_big_response)
    _puzzle_response = requests.get(url=front).content
    with open("image/front.jpg", "wb") as b:
        b.write(_puzzle_response)

    order = get_image_order(bg)
    image = r"D:/逆向练手/滑块类/360天御/image/b_g.jpg"
    # restore_image(image, order)
    # raclt = int(input('输入滑块距离'))
    raclt = slide_verify()
    print(raclt)
    report = encrypt_info(captchaId, token, k)
    data = {
        'captchaId': captchaId,
        'token': token,
        'length': str(int(raclt) + 3),
        'version': '2.0.0',
        'width': '300',
        'report': report,
        'tracking': '[object Object]',
    }
    response = requests.post('https://captcha.jiagu.360.cn/api/v3/check', headers=headers, data=data)
    print(response.text)
    # raclt = get_ocr()
    # print(raclt)


spider_image()
# spider_image()
# raclt = get_ocr()
# print(raclt)
