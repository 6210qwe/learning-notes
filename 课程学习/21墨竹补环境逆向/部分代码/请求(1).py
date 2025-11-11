import json
from loguru import logger
import requests
import execjs
import re
headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "cross-site",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}

url = "https://detail.1688.com/offer/898526726825.html&wh_cpid=581n3128"
response = requests.get(url, headers=headers)


pattern = r'window\._config_\s*=\s*({.*?});'
match = re.search(pattern, response.text, re.DOTALL)
if match:
    config_str = match.group(1)
    # 将字符串转换为 JSON 对象
    config_json = json.loads(config_str.replace("'", '"'))
    print("成功提取 window._config_ 内容：")
    print(config_json)
    with open('淘系bx-pp.js', 'r') as f:
        js_code=f.read()
    execss=execjs.compile(js_code)
    bx_pp=execss.call('get_bxpp',config_json['pp'])
    logger.info(bx_pp)
    import requests

    headers = {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        # "bx-pp": "",
        "bx_et": "nosgn",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://detail.1688.com/offer/898526726825.html&wh_cpid=581n3128",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    }
    headers['bx-pp']=bx_pp
    cookies = {
        "arms_uid": "9c61ecc0-939a-4dfa-b667-dc66dd9ac358",
        "taklid": "66e5a1fa647f48b5b06b601183025f24",
        "xlly_s": "1",
        "JSESSIONID": "905DB4E38A23B27837F59B3146CB8C1C",
        "tfstk": "gHXjRIYn7q0fCPvtfIqrFe7LG0p1luyUBctOxGHqXKpvfAsh5iJNXIh-2nYP3ES2HNG1RwtwkAhx2YK6YqK9XAd-eU_xQI7afVn1wNYN0Pmxe0KNzxKv6AncZwSK3tPDQA9DIdUU8Jye0ivMBSLEzpgmwhtYQndvkKv8vxqNyJyFmim2DkS8LO76YD8DWddv6UhJrhxvBELTVUK6xf3AWNEWyn-tBfd9kQHJfUL9BdQO2utwynp9BvoUP3VXkiZ2v-4KLRDw-UMtBTt8SeIjJA-5EnOXJiBjBAEMcITdDUaxdzO6wGA1IcD6kiChSHQxkyRcX__WcdwrMpI56wtlHJuXqsSRYUIIjAjDh66BHsaoZK7feLBAOcHOVKTD1tRSlzTdngBHeQyLAgBluiX5bce94w8Rmtp_pkvXHEpWqOzoHF1R6tRDIqUeiGC5Pn9d4EHeR_Z-10OnC3TUVuGisySdsYO4pYueM3xPLuZSlfAvq3TUVuGisIKk4Br7VqGG."
    }

    url = "$https://detail.1688.com/offer/page/detail.htm/_____tmd_____/slide"
    params = {
        "slidedata": "{\"a\":\"X82Y__0e1748d45e9398849fd9ba9e6eb0c705\",\"t\":\"347d63e4f5a76e375a6d640d7328d63a\",\"n\":\"231\\u0021Q3v7gAmUxMB+jDVkpA3aidAjUBZevi3Jp8RVNDfSPyMbbjaaZ78Vd++tUKv96oOW+g5kV297NuIEts5e1hBC9Xh2P5jRv3utKN0LyBFNBRh2ikjK+fkoPLfCukWMHNxsi0rJKv3OjBe1xjIfXRPpR1V/FGc3vDd9P803jUsLyhJec9s/DKexEe0YqEuoEWQ/ce8Tp2y7fSZWO1hozjnFjcAr+/mep4Dqk+I9xGdFzXtAGJlCok+++4mWYi++6PChofBB9PEDj+mNvnbDqXIk22VAi8mNZ6NCdIhnsRBOCRoRzMf/HY79iVVk1LsKwdHmnff4IMS/cuYk8VunMXYo89yy1apJ+h3ijYzmFAD+m/WK3hub97IhHZGhfsTdzPPk0FQ2PsApmyRydYwWvJhWAN3s0/G1oPw/PRm52uugP46mA38BS2QAN+O2VRRKSQ6MBYGG4PFSTr+V0L7q+fVPh0f6avJq4Iyk4eebsDPrmCrQzc+lyEgPxt0jRVnlK2AetTzNV0MABPIOWxKxfgYcWVZzPEVXhsxn1jugYqaxb2eHc6dLqw/mS+IDt9M7KBj+EbasAhp3dsZqX8c6K0LDKf6qXVsBLjjWA842MLedbsvIDoJfvpTq8wVQzK6m0Vy5he1D/jQ2Zh8wN3XSKcpxb4QkRPVJdbncPQb5kV3tQxHY2V/w2f44HMMU1wkcA7n1Z6Jn5ER07UWZT9G7YZkHvUuWAoj4UnJr6VT0RJZmJCw63+DxzxYHsJGbIgrG8fDHy7QYnjeJR35d1tVWjazV5cWMnyiY5oxZROWGb+FbAk0qYGkfmh3+q+KqBjiOl1yXumDdDBp+2mSjORWvGNFjG9H1AoCcpo99KElMjlYkVa3ayxeOfOTNdyhtK/DX/9VpIJQK4BPO8sN3QAFIbPfa1vfSoNak5Un9Ub/OoWCPCAYCAmdoMgGENIO837WS7DyfjNVDhO4hlKtbOTCxnsx85d6u0mksmGgWFOPSUCUqXTNeFRJgGLp2cNCnFnUzV5btkfC+kVeoqWySS53uRshKaIt9O+KKZCRBMM9ParzeQIR8Ok3ZCgOfZGcelznOLowVA3RCw32h9cd6hEqnFoh/Wvik6KUyT368XdBZ1dRNoCjdiuExjwzYxLq6erhuiqKXPfBc6miR0IVyUesukF6NprhC/G2pV8MQ/yNWzkIinJt+bChf0WcYciX2R9o3RXhFuu3JEizsuo1365sMCngWUM1hRpOO9DmrUXvaCC59HefPrdasWStF05ePkpeoX/XH5CNYTyuKvZ5HPNQSn1RMwLFcxBj5QfiYAfAtgcblue5CApU1pfHDQnPz495IXFXm3YwF274Wl4yJT+Uk+Jku19oIGXGv3ZN9wbHWiYKo/of9uhB0VEq+EYGFXOTsHxYOH7TYfCz8spS5jCYpKjH+wfVjnEFBQ9x8ZiODjuMTd0B92cDlK9nLB82ykJnfoUNrr3lpOsrIVkXfZIBC3ud7CljrhNiJjcXfMuIgqSQjQBUh0RdajvGjH0APtgDO59xP3wThGDOXNp3UDJUa8HbDAbPXK6ftoVs2SMBawEZh5t8HLBlJEMZOodD550pqFgI56irUhEwup1YpaMgmB6huj6K65X2WYO3+KqrHZCqdE82J8GTy6G7tzys59HXjnb5uz7MFW0eCAyR+JqnzCs3wtFeJvdig1UWfUFf/OWsYfg7D31zvtzfmaH77Zy++M4FtbnahkpqSBt4ubrTuGEo0uLy8jZnN+0xxicLNPZAgUZOdEqji9jj20cYhqIGt/UX5Pg5nv9yNLVkI6xbteh+f3nOvFekG0JdLyzG2WsQNnhFSS0ralMqHpYPEDQiZVGqpE2/OzrEjYV8HNp8SKUmAQD7k2fWJLPzQ1N5M0nAXax+HQky7YYlMnv7XYzBFWCDzqIwITC53nBUwX/wWZj3MtadEArLcuogjijVTpxSF0+ozVj2/8GIvowsfV4==\",\"p\":\"{\\\"ncbtn\\\":\\\"612.4000244140625|96.98125457763672|41.60000228881836|29.600000381469727|96.98125457763672|126.58125495910645|612.4000244140625|654.0000267028809\\\",\\\"umidToken\\\":\\\"T2gAwAs_d2epIh5A0f-1fE6eeHXeQLSQdv_bBmaeFKyfd5N8B3SvdA5rjBo8Vxr_5Lc=\\\",\\\"ncSessionID\\\":\\\"5e701ee462bf\\\",\\\"et\\\":\\\"1\\\"}\",\"scene\":\"register\",\"asyn\":0,\"lang\":\"cn\",\"v\":1}",
        "x5secdata": "xgfb9959cfd5c56382bc347d63e4f5a76e375a6d640d7328d63a1752157906a-1109984729a88757878abazc2aaa0__bx__detail.1688.com:443/offer/page/detail.htm",
        "ppt": "1551961",
        "_rand": "empty",
        "landscape": "1",
        "ts": "1752159476982",
        "v": "0721004942172687"
    }
    res=requests.get(url=url,headers=headers,params=params)
    logger.info(res)
