import requests
import subprocess
import json
import re

cookies = {
    'abRequestId': 'caed210b-2b2f-586e-a1b0-b6ee2c5086e7',
    'xsecappid': 'xhs-pc-web',
    'a1': '197e9c5585d7b1lzytcj54rjel35piyzlurwevylq50000252033',
    'webId': '2e9b5644ae5f2f038aadc5da4021d1a6',
    'gid': 'yjWdjS2Kif1DyjWdjS22Y7hv2fWDy1uv9SV2F1A4FVd1qE282U3vud888J2J8qq8q4WWYqi0',
    'web_session': '040069b588606840034dfab7593a4b94066c12',
    'webBuild': '4.72.0',
    'unread': '{%22ub%22:%22687338ef000000001d00f0ba%22%2C%22ue%22:%2268739fd9000000001703265f%22%2C%22uc%22:26}',
    'loadts': '1752423777445',
    'acw_tc': '0a4ad9b317524275626347245e7c600a016e1b6832a1b6feef86e40dfb6285',
    'websectiga': '59d3ef1e60c4aa37a7df3c23467bd46d7f1da0b1918cf335ee7f2e9e52ac04cf',
    'sec_poison_id': '2a1dd9b4-a73c-4ad7-8beb-fca89f464dec',
}

output = subprocess.run(['node', '小红书.js'], capture_output=True, encoding='utf-8', text=True).stdout
print(output)
pattern = r"'X-s'\s*:\s*'([^']+)'"  # 匹配 'X-s': '任意内容'
match = re.search(pattern, output)


x_s_value = match.group(1)
print(x_s_value)


headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'no-cache',
    'content-type': 'application/json;charset=UTF-8',
    'origin': 'https://www.xiaohongshu.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.xiaohongshu.com/',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0',
    'x-b3-traceid': 'df32220d5b5cc2a6',
    'x-s': x_s_value,
    'x-s-common': '2UQAPsHC+aIjqArjwjHjNsQhPsHCH0rjNsQhPaHCH0c1PjhlHjIj2eHjwjQgynEDJ74AHjIj2ePjwjQhyoPTqBPT49pjHjIj2ecjwjHFN0qUN0ZjNsQh+aHCH0rE+9LEGALMwepD+9HlJokE4B+x+/zUyfpVPApIygSCJopU49p92nll+/ZIPeZU+/HIPAPjNsQh+jHCHjHVHdW7H0ijHjIj2eWjwjQQPAYUaBzdq9k6qB4Q4fpA8b878FSet9RQzLlTcSiM8/+n4MYP8F8LagY/P9Ql4FpUzfpS2BcI8nT1GFbC/L88JdbFyrSiafp/8DMra7pFLDDAa7+8J7QgabmFz7Qjp0mcwp4fanD68p40+fp8qgzELLbILrDA+9p3JpH9LLI3+LSk+d+DJfpSL98lnLYl49IUqgcMc0mrcDShtMmozBD6qM8FyFSh8o+h4g4U+obFyLSi4nbQz/+SPFlnPrDApSzQcA4SPopFJeQmzBMA/o8Szb+NqM+c4ApQzg8Ayp8FaDRl4AYs4g4fLomD8pzBpFRQ2ezLanSM+Skc47Qc4gcMag8VGLlj87PAqgzhagYSqAbn4FYQy7pTanTQ2npx87+8NM4L89L78p+l4BL6ze4AzB+IygmS8Bp8qDzFaLP98Lzn4AQQzLEAL7bFJBEVL7pwyS8Fag868nTl4e+0n04ApfuF8FSbL7SQyrLUarQl4LShyBEl20YdanTQ8fRl49TQc7bgz9qAq9zV/9pnLoqAag8m8/mf89pDPBloanDMqA++y9GU4gzmanSNq9SD4fp3nDESpbmF+BEm/9pgLo4bag83Ggkm+fpfLo4G/BEmqM+l4FQQPMzUagYb+LlM474Yqgq3qfpkGdbU/9p8yf4Ay7bF8FS38Bp88AmS2b4j2rSi87+f/npA+fk0JrS3cnLALozLanSU8bbl4Fih4gcEa/P98/+c4b8QyLESPpmFJrSk+npfpd4maopF/L4l47YQPMbpaL+b8LkYLrboJsRAygbF/LSipdzQynpSngpFP9PEngc6c/mSyfkI+DS3zMmo4gzNJ7b7PFDA/9phqgzxLLIM8nS0cgPAqBY7anYmqA+s/7PA4gzAGS8F2DSh87+x4gzGagG9qAP7LURQP9zA+fiAqA+M478QyBpAPgbF80Ydt7zQyaV6anVIqAb0J9pn80pA8rG7qMSc47qjNsQhwaHC+0W7P0H7PeqVHdWlPsHCPsIj2erlH0ijJfRUJnbVHdF=',
    'x-t': '1752427578815',
    'x-xray-traceid': 'cc026962dad8fc3a0488d0d5ac4d1ac7',
    # 'cookie': 'abRequestId=caed210b-2b2f-586e-a1b0-b6ee2c5086e7; xsecappid=xhs-pc-web; a1=197e9c5585d7b1lzytcj54rjel35piyzlurwevylq50000252033; webId=2e9b5644ae5f2f038aadc5da4021d1a6; gid=yjWdjS2Kif1DyjWdjS22Y7hv2fWDy1uv9SV2F1A4FVd1qE282U3vud888J2J8qq8q4WWYqi0; web_session=040069b588606840034dfab7593a4b94066c12; webBuild=4.72.0; unread={%22ub%22:%22687338ef000000001d00f0ba%22%2C%22ue%22:%2268739fd9000000001703265f%22%2C%22uc%22:26}; loadts=1752423777445; acw_tc=0a4ad9b317524275626347245e7c600a016e1b6832a1b6feef86e40dfb6285; websectiga=59d3ef1e60c4aa37a7df3c23467bd46d7f1da0b1918cf335ee7f2e9e52ac04cf; sec_poison_id=2a1dd9b4-a73c-4ad7-8beb-fca89f464dec',
}

json_data = {
    'cursor_score': '',
    'num': 31,
    'refresh_type': 1,
    'note_index': 10,
    'unread_begin_note_id': '',
    'unread_end_note_id': '',
    'unread_note_count': 0,
    'category': 'homefeed.fashion_v3',
    'search_key': '',
    'need_num': 6,
    'image_formats': [
        'jpg',
        'webp',
        'avif',
    ],
    'need_filter_image': False,
}

response = requests.post('https://edith.xiaohongshu.com/api/sns/web/v1/homefeed', cookies=cookies, headers=headers, json=json_data).text

data_ = json.loads(response)
data = data_['data']['items']
for i in data:
    print(i)
