import requests
import subprocess


# class MySubprocessPopen(subprocess.Popen):
#     def __init__(self, *args, **kwargs):
#         # 在调用父类（即 subprocess.Popen）的构造方法时，将 encoding 参数直接置为 UTF-8 编码格式
#         super().__init__(encoding='UTF-8', *args, **kwargs)
#
#
# subprocess.Popen = MySubprocessPopen
import execjs


def get_result():
    with open('1.js', mode='r', encoding='utf-8') as f:
        js_file = f.read()
    js_code = execjs.compile(js_file)
    js_result = js_code.call('get_eocode')
    return js_result


def get_result_(data):
    with open('1.js', mode='r', encoding='utf-8') as f:
        js_file = f.read()
    js_code = execjs.compile(js_file)
    js_result = js_code.call('get_dencode', data)
    return js_result


cookies = {
    'PHPSESSID': 'qs62h1v6jr4sj03u2anei19r5f',
    'Hm_lvt_d91514f12caca3d153e7ab1bbe3e4d5d': '1712549340',
    'Hm_lpvt_d91514f12caca3d153e7ab1bbe3e4d5d': '1712556438',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://pvp.hayfuon.cn',
    'pragma': 'no-cache',
    'referer': 'https://pvp.hayfuon.cn/',
    'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}
data = {"data": get_result()}

response = requests.post('https://pvp.hayfuon.cn/ajax/getdistrank', cookies=cookies, headers=headers, data=data).json()
# print(response)
data = get_result_(response)
print(data)
