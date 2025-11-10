import requests

cookies = {
    'sessionid': 'ap4u8xdqvu7p20jvosx82cvy56j61hsn',
    'Hm_lvt_3e4ffd7a3b6387fe4632831f1230b518': '1749099037,1749103852,1749210333',
    'HMACCOUNT': '236856C3F3DDAFD8',
    'Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3': '1749210670',
    'HMACCOUNT': '6B4FBA1BA410947F',
    'Hm_lpvt_434c501fe98c1a8ec74b813751d4e3e3': '1749211338',
    'Hm_lpvt_3e4ffd7a3b6387fe4632831f1230b518': '1749261112',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://match2025.yuanrenxue.cn',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://match2025.yuanrenxue.cn/match2025/topic/1',
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'sessionid=ap4u8xdqvu7p20jvosx82cvy56j61hsn; Hm_lvt_3e4ffd7a3b6387fe4632831f1230b518=1749099037,1749103852,1749210333; HMACCOUNT=236856C3F3DDAFD8; Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3=1749210670; HMACCOUNT=6B4FBA1BA410947F; Hm_lpvt_434c501fe98c1a8ec74b813751d4e3e3=1749211338; Hm_lpvt_3e4ffd7a3b6387fe4632831f1230b518=1749261112',
}

data = {
    'a': 'osWzO2jApG+H89wgh8IiR7QqFQOAynRlle/ZIWvlN7pp9XEKM/Z70PuFE1OebgoXu/g0he71uZcaTrEBsZ3H8w==',
}

response = requests.post(
    'https://match2025.yuanrenxue.cn/match2025/topic/1_captcha_jpg',
    cookies=cookies,
    headers=headers,
    data=data,
)