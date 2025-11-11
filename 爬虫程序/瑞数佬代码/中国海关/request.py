import requests
import execjs
from lxml import etree

cookies = {}

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0"
}

response = requests.get('http://credit.customs.gov.cn/ccppwebserver/pages/ccpp/html/copInfo.html', headers=headers)

set_cookie_header = response.headers.get('Set-Cookie')

cookies_list = set_cookie_header.split(',')

for cookie in cookies_list:
    ck = cookie.split(';')[0].strip()
    if '=' in ck:
        name, value = ck.split('=', 1)
        cookies[name] = value

# print("第一次返回cookie:",cookies)


html0 = etree.HTML(response.text)
content = html0.xpath('/html/head/meta[2]')[0].attrib['content']
ts_code = html0.xpath('/html/head/script[1]')[0].text
js_src = html0.xpath('/html/head/script[2]')[0].attrib['src']

host = 'http://credit.customs.gov.cn'
response1 = requests.get(host + js_src, headers=headers, cookies=cookies)
js_code = response1.text

with open('2.js', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("$$content$$", content)
code = code.replace("'$$ts$$'", ts_code)
code = code.replace("'$$function$$'", js_code)
ck = execjs.compile(code).call('get_cookie')
print(ck)
cookies_dict = {ck.split('=')[0]: ck.split('=')[1].split(';')[0].strip()}

cookies.update(cookies_dict)

response2 = requests.get('http://credit.customs.gov.cn/ccppwebserver/pages/ccpp/html/copInfo.html', headers=headers,
                         cookies=cookies)
response2.encoding = 'utf-8'
print(response2)
print(response2.text)
