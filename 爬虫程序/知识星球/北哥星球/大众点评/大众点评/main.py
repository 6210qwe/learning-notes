import requests
import execjs
from loguru import logger
import urllib.parse


def get_mtgsig(method, apis, params_str, data_str):
    with open("D:/逆向练手/vmp/大众点评/纯算.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    xb_run = execjs.compile(js_code)
    result = xb_run.call('get_mtg_sig', method, apis, params_str, data_str)
    return result


headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://account.dianping.com',
    'Pragma': 'no-cache',
    'Referer': 'https://account.dianping.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
}

params = {
    'yodaReady': 'h5',
    'csecplatform': '4',
    'csecversion': '3.1.0',
}

data = {
    'encryptMobile': 'jGVYsqV7e5sdJheBWny2OJnnKtKMTCQVij5hcCsQ9t+FFwHSfoMKN19EdPnL0FWGXZi4eTHGgS3ewnTsMoOpkJ0yf09L/XfUfDy0kp3KanqxRs+LZmk5mQtH6KbYobD4kYFQ9vFl8vHn+QTELmSzJ2g/mZ/4BxPXYOUT/+9n2JXHJmY3hiB9J5tjKdB6CTxJ9PBjR4s2o/s1jbjf4Et3Np2IeUT7cxerndHhOeMxRwAiDuaX8q9bHiFIPjigD33H1MQgfVUL0ifZl/R/97Fd/vsrgc/StLjx+IiycIAWjiGz9MHSo4zaOuZJMwr1xPNbXL5TchjcnZfRUuXzN0Rd7w==',
    'countryCode': '86',
    'uuid': '1906d8d37d5c8-0869d6af530eab-26001f51-1fa400-1906d8d37d5c8',
    'cx': 'cxcxcx',
    'platform': '1',
    'app': '216',
    'partner': '26',
    'risk_platform': '1',
    'risk_app': '216',
    'risk_partner': '26',
    'siteType': 'PC',
    'h5_fingerprint': 'H5dfp_3.1.0_tttt_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',
}

url = 'https://i.waimai.meituan.com/tsp/open/openh5/home/shopList'
method = "POST"
apis = '/mlogin/dp/api/v3/account/mobileloginapply'
params_str = f"csecplatform={params['csecplatform']}&csecversion={params['csecversion']}&yodaReady={params['yodaReady']}"
data_str = urllib.parse.urlencode(data)
mtg_sig = get_mtgsig(method, apis, params_str, data_str)
logger.info(f"mtg_sig:{mtg_sig}")
headers['mtgsig'] = mtg_sig
response = requests.post(
    'https://accountapi.dianping.com/mlogin/dp/api/v3/account/mobileloginapply',
    params=params,
    headers=headers,
    data=data,
)
print(response.text)
