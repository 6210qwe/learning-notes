import requests
import execjs


headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'authorization': '找个请求，换成自己的',
    'cache-control': 'no-cache',
    'd-f': '',
    'd-t': '',
    'd-v': '',
    'dcc-href': 'https://www.douchacha.com/',
    'dcc-r': '',
    'dcc-v': '1.0',
    'origin': 'https://www.douchacha.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.douchacha.com/',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
}

params = {
    'keyword': '衣服',
    'secret': '',
}

authorization = headers['authorization']

head = execjs.compile(open('抖查查.js', encoding='utf-8').read()).call('get_params', authorization, params['keyword'])
headers['d-v'] = head['d-v']
headers['d-f'] = head['d-f']
headers['d-t'] = str(head['d-t'])

params['secret'] = head['secret']
response = requests.get('https://api.douchacha.com/api/v2/search', params=params, headers=headers)
print(response.text)