import binascii
import hashlib
import json
import random
import uuid
from datetime import datetime
import requests
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import ddddocr
from loguru import logger
from six import BytesIO


def aes_encrypt(res):
    key = b"497d067c65af2292"
    iv = b"0000000000000000"
    cipher = AES.new(key, AES.MODE_CBC, iv)
    encrypt = pad(res.encode('utf-8'), AES.block_size)
    res_encrypt = cipher.encrypt(encrypt)
    return binascii.hexlify(res_encrypt).decode('utf-8')


def get_distance(slice, bg):
    ocr = ddddocr.DdddOcr(show_ad=False)
    res = ocr.slide_match(slice.read(), bg.read(), simple_target=True)
    return res["target"][0]


def run_load(callable_id, challenge):
    url = "https://gcaptcha4.geetest.com/load"
    params = {
        "captcha_id": callable_id,
        "client_type": "wx",
        "challenge": challenge,
        "risk_type": "",
        "user_info": ""
    }
    response = requests.post(url, json=params)
    res = response.json()
    return res


def run_verify(res, challenge):
    url = "https://gcaptcha4.geetest.com/verify"
    params = {
        "captcha_id": res["captcha_id"],
        "client_type": "wx",
        "payload": res["payload"],
        "challenge": challenge,
        "lot_number": res["lot_number"],
        "process_token": res["process_token"],
        "payload_protocol": 1,
        "pt": "1",
        "w": res["w"]
    }
    response = requests.get(url, params=params)
    res = json.loads(response.text.replace("(", "").replace(")", ""))
    return res


def main():
    captcha_id = "24f56dc13c40dc4a02fd0318567caef5"
    challenge = str(uuid.uuid1())
    load = run_load(captcha_id, challenge)
    bg = f"https://static.geetest.com/{load['data']['bg']}"
    slice = f"https://static.geetest.com/{load['data']['slice']}"
    bg = BytesIO(requests.get(bg).content)
    slice = BytesIO(requests.get(slice).content)
    distance = get_distance(slice, bg)
    lot_number = load['data']['lot_number']
    process_token = load['data']['process_token']
    payload = load['data']['payload']
    userresponse = distance / 1.0059466666666665 + 2
    pow_msg = f"1|0|md5|{datetime.timestamp(datetime.now())}|{captcha_id}|{lot_number}||01c9b4c8f6ce2d22"
    pow_sign = hashlib.md5(pow_msg.encode('utf-8')).hexdigest()
    w_data = '{"setLeft":' + str(distance) + ',"passtime":' + str(random.randint(100, 300)) + ',"userresponse":' + str(
        userresponse) + ',"device_id":"","lot_number":"' + lot_number + '","pow_msg":"' + pow_msg + '","pow_sign":"' + pow_sign + '","geetest":"captcha","lang":"zh","ep":"123","biht":"1426265548","rw0k":"cpej","a586":{"ac766a":{"666a":"66a465fa"}},"em":{"ph":0,"cp":0,"ek":"11","wd":1,"nt":0,"si":0,"sc":0}}'
    w = aes_encrypt(
        w_data) + "b408470642ff6d1cfdb71724dc1b8066ae51e30aba3c8136405ad24cc4e932a1dd004c5ce991e901cac082e6f0e28f19dc07d35a4320d7ba1fa500613bd9d5f253e838fb8cf998f3c4b1e07ff2dfc5c36b98b4ed4620ff47f7c8e5263b3ef3a52dfcf00278f3b07d615778824a076da257e25332eddca84c8bdf9d482ef867f4"
    data = {
        "w": w,
        "captcha_id": captcha_id,
        "lot_number": lot_number,
        "payload": payload,
        "process_token": process_token
    }

    res = run_verify(data, challenge)
    data = res["data"]
    if data["seccode"]:
        return res


if "__main__" == __name__:
    logger.info(main())
