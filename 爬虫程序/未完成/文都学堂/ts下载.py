import requests

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Origin': 'https://study.wenduedu.com',
    'Pragma': 'no-cache',
    'Referer': 'https://study.wenduedu.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

params = {
    'pid': '1735361521373X1499409',
    'device': 'desktop',
}

response = requests.get(
    'https://hw-dts.videocc.net/f329b132d7/0/1703215380656/3/83/c8/93_3/f329b132d7847e491526c442e883c893_3_0.ts',
    params=params,
    headers=headers,
)
print(response.content)