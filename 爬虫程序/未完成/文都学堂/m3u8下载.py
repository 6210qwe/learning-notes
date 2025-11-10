import re

import requests
from tqdm import tqdm
from Crypto.Cipher import AES

# from Cryptodome.Cipher import AES

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'no-cache',
    'origin': 'https://study.wenduedu.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://study.wenduedu.com/',
    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
}

params = {
    'pid': '1735354533647X1292135',
    'device': 'desktop',
}

response = requests.get(
    'https://hls.videocc.net/f329b132d7/3/f329b132d7847e491526c442e883c893_3.m3u8',
    params=params,
    headers=headers,
)
# print(response.text)
m3u8_text = response.text
key_url, IV = re.findall(',URI=(.*?),IV=(.*)', m3u8_text)[0]
print(key_url, IV)
# IV转为字节数据
iv = bytes.fromhex(IV[2:])
print(iv)
# m3u8_text = re.sub('#E.*', '', m3u8_text).replace('\n', '')
# ts_list = m3u8_text.split()[0:3]
ts_list = re.findall(',\n(.*?)\n#', m3u8_text)[0:2]
# print(ts_list)

key_url = "https://hls.videocc.net/playsafe" + "f329b132d7/3/f329b132d7847e491526c442e883c893_3.key"

# params1 = {
#     'token': '8db2c48b-e3cb-404a-a5a3-06308e620dd4-7ckzkly1216361270538978',
# }
#
# key = requests.get(
#     'https://hls.videocc.net/playsafe/f329b132d7/3/f329b132d7847e491526c442e883c893_3.key',
#     params=params1,
#     headers=headers,
# ).content
# params1 = {
#     'token': 'd2f418d5-fe3f-44c6-b79c-dbd9b395bc36-vckzkly1216361270538978'
# }
#
# key = requests.get(
#     'https://hls.videocc.net/playsafe/f329b132d7/3/f329b132d7847e491526c442e883c893_3.key',
#     params=params1,
#     headers=headers,
# ).content
key = b'`\xef|\xd5\xeeG\x87\x7f\x1b\x85\xc2\xc4\xc4#\x01\x00'
# key = b"xD\xe8p\xfc\xc9\x16\xc7\xeb\x1e[5G\xa6\xfd\x02'|\xb4EaR\x14\xf1$=\x80n\xe9r(\x9c"
# key = requests.get(
#     key_url,
#     params=params,
#     headers=headers,
# ).content
#
print(key)
aes = AES.new(key=key, mode=AES.MODE_CBC, IV=iv)
for ts_url in tqdm(ts_list):
    # print(sub_ts + ts)
    #  = ts
    print(ts_url)
    ts_data = requests.get(ts_url).content
    # 获取解密后的数据
    desc_data = aes.decrypt(ts_data)
    with open('第一课.mp4', 'ab') as f:
        f.write(ts_data)
# response2 = requests.get("https://hls.videocc.net/f329b132d7/3/f329b132d7847e491526c442e883c893_3.key")
# print(response2.text)
