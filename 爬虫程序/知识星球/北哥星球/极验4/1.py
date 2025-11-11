import time
import json
import ddddocr
import execjs
import requests


def get_w(setLeft, lot_number, datetime, captcha_id):
    with open('调试.js', 'r', encoding='utf-8') as f:
        js_code = f.read()
    wlb_xb = execjs.compile(js_code)
    w = wlb_xb.call('get_w', setLeft, lot_number, datetime, captcha_id)
    return w


def get_ocr():
    """
    识别距离
    :return:
    """
    det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    with open('b_g.jpg', 'rb') as f:
        target_bytes = f.read()
    with open('slice.jpg', 'rb') as f:
        background_bytes = f.read()
    res = det.slide_match(background_bytes, target_bytes, simple_target=True)
    raclt = res.get('target')[0]  # 滑块距离)
    return raclt


headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # Requests sorts cookies= alphabetically
    # 'Cookie': 'captcha_v4_user=d8e48b2ebcf942ab9693d0c1f59a713c; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221904f5f0e1d0-0162e36a43488d-26001f51-1395396-1904f5f0e1ef37%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9E%81%E9%AA%8C%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Fs%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Fwww.geetest.com%2F%22%7D%2C%22%24device_id%22%3A%221904f5f0e1d0-0162e36a43488d-26001f51-1395396-1904f5f0e1ef37%22%7D; Hm_lvt_25b04a5e7a64668b9b88e2711fb5f0c4=1719318548; Hm_lpvt_25b04a5e7a64668b9b88e2711fb5f0c4=1719318759',
    'Pragma': 'no-cache',
    'Referer': 'https://www.geetest.com/',
    'Sec-Fetch-Dest': 'script',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}
callback = f'geetest_{int(time.time() * 1000)}',
params = {
    'callback': callback,
    'captcha_id': '24f56dc13c40dc4a02fd0318567caef5',
    'challenge': '4850c94b-8f40-48b2-bae2-7fe73b03102a',
    'client_type': 'web',
    'risk_type': 'slide',
    'lang': 'zh',
}
response = requests.get('https://gcaptcha4.geetest.com/load', params=params, cookies={}, headers=headers).text
data = "{" + response.split('({')[1].split('})')[0] + "}"
data = json.loads(data)['data']
lot_number = data['lot_number']
payload = data['payload']
process_token = data['process_token']
datetime = data['pow_detail']['datetime']
hashfunc = data['pow_detail']['hashfunc']
slice = 'http://static.geetest.com/' + data['slice']
bg = 'http://static.geetest.com/' + data['bg']
_big_response = requests.get(url=bg).content
with open("b_g.jpg", "wb") as b:
    b.write(_big_response)
_puzzle_response = requests.get(url=slice).content
with open("slice.jpg", "wb") as b:
    b.write(_puzzle_response)
setLeft = get_ocr()

w = get_w(setLeft, lot_number, datetime, '24f56dc13c40dc4a02fd0318567caef5')

params = {
    'callback': callback,
    'captcha_id': '24f56dc13c40dc4a02fd0318567caef5',
    'client_type': 'web',
    'lot_number': lot_number,
    'risk_type': 'ai',
    'payload': payload,
    'process_token': process_token,
    'payload_protocol': '1',
    'pt': '1',
    'w': w,
}

response = requests.get('https://gcaptcha4.geetest.com/verify', params=params, cookies={}, headers=headers)
print(response.text)