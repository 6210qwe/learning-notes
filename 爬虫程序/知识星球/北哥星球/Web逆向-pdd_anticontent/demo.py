import requests
import subprocess

anti_content = subprocess.run(['node', 'env.js'], capture_output=True, text=True).stdout.strip()
print('anti_content:', anti_content)

headers = {
    "Accept": "application/json, text/javascript",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://pinduoduo.com",
    "Pragma": "no-cache",
    "Referer": "https://pinduoduo.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://apiv2.pinduoduo.com/api/gindex/tf/query_tf_goods_info"
params = {
    "tf_id": "TFRQ0v00000Y_14283",
    "page": "1",
    "size": "39",
    "anti_content": anti_content
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)