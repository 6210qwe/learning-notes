import requests
import execjs


def get_encrypt():
    with open("D:\逆向练手\普通简单逆向\京东物流\jscode.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    xb_run = execjs.compile(js_code)
    result = xb_run.call('get_encrypt')
    return result


cookies = {
    'pin': 'jd_4f363218079a8',
    'unick': 'jd_075r10dgsj8cie',
    'flash': '3_mRP1he5F8xCkIkcfKO4WrDCE7roXVbp9Zww5nSeMEaykv9C54LL856u4Tjmv0bMN-qW3OVOP2lEUSuEzFdsyjw_7kqRh_3ulj3NjxIqGt7wsZ9DQH_TBezXVHKJHHVfT06Wi-vmL_1IrSMOudn4SUn_2NN2Vy21J4Wdl5GYhERxsvD4HuRUdDuk*',
    'thor': '1011808F4AD0ABE6E29CE7FD54359F90FFECCFA59EECE23DFEC462C332BF4AD607BA9A8A0E1AB85FE41A90A8036656013A4E4125DDD078D47D4022A208B3C16AFD4DFA837C113141F53DDCB5F0B09DB2870D458C8AEC087934D5038EC86872887C83820D1C0D03980B2C6395DEE0947A9EBC47C3062270012EC24AF8E9B3F909EFBADF445C8CFDF730DF5EDF9175D9D6D1A75389741BF06EF360F38B0B508487',
    'light_key': 'AASBKE7rOxgWQziEhC_QY6yamEsCGlUmE4T6PspO9YKr0zNlS15UcUp2Zvu7KdQLD3vB7XTL',
    '__jda': '236194567.17526634392941149018207.1752663439.1752663439.1752663439.1',
    '__jdc': '236194567',
    '__jdv': '236194567|direct|-|none|-|1752663439294',
    'logistics_site_lang': 'zh-CN',
}

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN',
    'access': 'JDWL-GW',
    'app-key': 'jexpress',
    'appparams': '{"appid":"158","ticket_type":"pc"}',
    'biz-type': 'service-monitor',
    'cache-control': 'no-cache',
    'ciphertext': 'EqBfJ4iMahGfhkv/6aIRpFwmtNNUM4aHYn4m179dlZit//0plFCeXn/48Fy+17ANDNvDaf4+Kzez9XFNQ3yMG6tCbob2VZ5DPLTBjufFF+rOCOB7voZcVt11JkHQH9tcJl6IrScmot5I3Z3NH5kjA1isLe4bjU3JSbY7g5a6Zqo=',
    'clientinfo': '{"appName":"c2c","client":"m"}',
    'content-type': 'application/x-www-form-urlencoded',
    'event-id': '4f4136b9-0590-d92b-6708-28b866f88951',
    'jexpress-report-time': '1751963547069',
    'jexpress-trace-id': '25d7e34e-d3ad-d137-3fdc-fcd73781890a',
    'jfe-cgi-flow': 'EXP_PC_V1.0.0_5f7dc00',
    'lop-dn': 'jdwl.com',
    'origin': 'https://www.jdl.com',
    'pkid': '4095',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.jdl.com/',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'source-client': '4',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
}

# data = 'bMqMTFeN5nM8KDBGy7gtj2OF61PptmEv2dRHVY4McsUSp1fIN3zc9znyHBcLDotwJhdgnHtGkn/5g6ZyclY3OBWx7cM6nxiqKBBzM13QK6oT4OB0+18nhS/2a07OYwANC+vZ0JlnX+8zhvDnajAqzmDhue8WGROQER8bjcgm7u6kqEXzLKv0CVfzjiyzCICWczsNRRs0RISwmn8u2+o5CzVTa6iheE/J0X9v2zuhwwrfqOMA+NCBKPmjKYJBVwW4KCnTQZsnxf3KdPk17hHlXRU5rhgA5qjQe6g/R5apgTtvZzUYRsby0zMIbNQ8g1p2jo6e2/iRJOsIspMyQmv7WCIEHuVFWwAbIvwSR12PJo73nNa9v6ypywjIxeqYWK3t'

code1 = get_encrypt()
data = code1['data']
headers['ciphertext'] = code1['ciphertext']

response = requests.post('https://api.jdl.com/aging/feeInquiryNewByJDL', cookies=cookies, headers=headers, data=data)
print(response.text)
