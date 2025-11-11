import base64
import requests,execjs

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Origin': 'https://www.ximalaya.com',
    'Pragma': 'no-cache',
    'Referer': 'https://www.ximalaya.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36',
    'sec-ch-ua': '"Not=A?Brand";v="99", "Chromium";v="118"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Content-Type': 'application/octet-stream',
}

datac = execjs.compile(open('xm-sign纯算.js', 'r', encoding='utf-8').read()).call('get_arr')
response = requests.post(datac['url'], headers=headers, data=base64.b64decode(datac['decodedString']))
print(response.text)
print(response.status_code)

x_sign_dict = execjs.compile(open('xm-sign纯算.js', 'r', encoding='utf-8').read()).call('aes_decrypt', response.text)
x_sign =x_sign_dict['cadd'] + '&&' + x_sign_dict['sid']

url = "https://www.ximalaya.com/revision/rank/v4/element"
params = {
    "rankingId": "100149"
}
headers['xm-sign'] = x_sign
response = requests.get(url, headers=headers, params=params)
print(response.text)