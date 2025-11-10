import re

import requests
from tqdm import tqdm
from Crypto.Cipher import AES

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'no-cache',
    'origin': 'https://www.bafangwy.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.bafangwy.com/',
    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
}

params = {
    'pid': '1735388155052X1415652',
    'device': 'desktop',
}

response = requests.get(
    'https://hls.videocc.net/4ffae39b72/0/4ffae39b72105af14c0e81ab1d996400_1.m3u8',
    params=params,
    headers=headers,
)
m3u8_text = response.text
key_url, IV = re.findall(',URI=(.*?),IV=(.*)', m3u8_text)[0]
print(key_url, IV)
iv = bytes.fromhex(IV[2:])
print(iv)
params = {
    'token': '83848bd0-0ed5-4e2d-a81c-c9c087dc60f4-d53240',
}

key = requests.get(
    'https://hls.videocc.net/playsafe/v1104/4ffae39b72/0/4ffae39b72105af14c0e81ab1d996400_1.key',
    params=params,
    headers=headers,
).content
print(key)
ts_list = re.findall(',\n(.*?)\n#', m3u8_text)[0:2]
aes = AES.new(key=key, mode=AES.MODE_CBC, IV=iv)
for ts_url in tqdm(ts_list):
    print(ts_url)
    ts_data = requests.get(ts_url).content
    # 获取解密后的数据
    desc_data = aes.decrypt(ts_data)
    with open('第一课.mp4', 'ab') as f:
        f.write(ts_data)