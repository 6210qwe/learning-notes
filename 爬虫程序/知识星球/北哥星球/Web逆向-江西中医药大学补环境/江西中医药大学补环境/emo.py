from curl_cffi import requests
from loguru import logger
import subprocess

def run_js_script(arg):
    try:
        # 执行 JavaScript 文件 async_operation.js，使用 Node.js
        result = subprocess.run(['node', r'c.js',arg], capture_output=True, text=True, timeout=5)

        # 输出 JavaScript 进程的标准输出
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        print("JavaScript execution timed out.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing JavaScript: {e}")

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://www.jxutcm.edu.cn/",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36",
    "sec-ch-ua": "\"Not=A?Brand\";v=\"99\", \"Chromium\";v=\"118\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    # "F14B3CEF1": "0420e4157c8f80000000003a000000006852684100000001475d5f5b43b15d0e",
    # "F14B3CEF0": "7b4cwh8tOSZ4sEQGHXbGKHNpkQCw59nnKI+JAmkDS6y9Kjml1Mv7O13KV2RzG1agnF3ogABJl8V0CYKFmDl+NXIjFg87jWgkK4z2DK/FKxDHuHM=",
    # "F14B3CEF5": "58635397051eee2739e4efd3ea3c593003aaf404880e3e017b8fde604e4d6855d"
}
url = "https://www.jxutcm.edu.cn/"
response = requests.get(url, headers=headers, cookies=cookies)

logger.success(f'第一次请求状态码：{response}')
logger.success(f'第一次请求返回cookie：{response.cookies}')

cookies['F14B3CEF1'] = response.cookies['F14B3CEF1']
headers["cookie"] = "; ".join([f"{key}={value}" for key, value in cookies.items()])

cookiestr = run_js_script(cookies['F14B3CEF1']).split('\n')
for ck in cookiestr:
    ck = ck.split('; ')[0]
    if len(ck.split('=')) == 2:
        key, value = ck.split('=')[0],ck.split('=')[1]
        cookies[key] = value
    else:
        key, value = ck.split('=')[0],ck.split('=')[1] + '='
        cookies[key] = value
logger.success(f'js获取cookie：{cookies}')

headers["cookie"] = "; ".join([f"{key}={value}" for key, value in cookies.items()])
response = requests.get(url, headers=headers, cookies=cookies)
logger.success(f'第二次请求状态码：{response}')
logger.success(f'第二次请求返回cookie：{response.text[0:1000]}')