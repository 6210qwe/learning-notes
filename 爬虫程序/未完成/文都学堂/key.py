import requests

import requests

headers = {
    'Host': 'hls.videocc.net',
    'sec-ch-ua-platform': '"Windows"',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'accept': '*/*',
    'origin': 'https://study.wenduedu.com',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://study.wenduedu.com/',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'priority': 'u=1, i',
}

params = {
    'token': '8db2c48b-e3cb-404a-a5a3-06308e620dd4-7ckzkly1216361270538978',
}

response = requests.get(
    'https://hls.videocc.net/playsafe/f329b132d7/3/f329b132d7847e491526c442e883c893_3.key',
    params=params,
    headers=headers,
)
print(response.content)