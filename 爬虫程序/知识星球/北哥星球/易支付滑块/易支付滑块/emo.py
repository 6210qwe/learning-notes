import requests,execjs


headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://pay.suning.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36"
}
cookies = {}
url = "https://dt.suning.com/detect/dt/dragInit.json"
params = {
    "v": "v3_7hY8wB0wi",
    "_callback": "jsonp_83631751166327113",
    "platform": "Win32",
    "target": "J_StaticForm",
    "serialNo": ""
}
response = requests.get(url, headers=headers, cookies=cookies, params=params).text.replace("jsonp_83631751166327113('",'').replace("')",'')

# 验证
verify_url = execjs.compile(open('yzf.js', 'r', encoding='utf-8').read()).call('get_verify_url', response)
response = requests.get(url = verify_url, headers=headers, cookies=cookies)
print(response.text)