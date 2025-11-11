import requests
import subprocess
import time
from loguru import logger


class MySubprocessPopen(subprocess.Popen):
    def __init__(self, *args, **kwargs):
        # 在调用父类（即 subprocess.Popen）的构造方法时，将 encoding 参数直接置为 UTF-8 编码格式
        super().__init__(*args, **kwargs)


subprocess.Popen = MySubprocessPopen
import execjs

requests = requests.session()


def get_ua():
    # 调用 Node.js 脚本并传递参数
    node_script_path = r"main.js"

    command = ["node", node_script_path]
    result = subprocess.check_output(command, text=True)
    # print(result.split('signature: ')[1].replace('\n', ''))
    # print(result)
    return result.split('ssssss--> ')[1].replace('\n', '')


def init_pass():
    global t
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'https://passport.zcool.com.cn/',
        'Sec-Fetch-Dest': 'script',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }
    tmp = int(time.time() * 1000)
    t = f'FFFF0N000000000099DF:{tmp}:0.6341756831856522'

    url = f'https://cf.aliyun.com/nocaptcha/initialize.jsonp?a=FFFF00000000016E5A77&t={t}&scene=message&lang=cn&v=v1.2.17&href=https%3A%2F%2Fpassport.zcool.com.cn%2Flogin.do&comm=""&callback=initializeJsonp_015452819466923073'
    response = requests.get(
        url,
        headers=headers,
    )
    return


def mian_t():
    global t
    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'https://passport.zcool.com.cn/',
        'Sec-Fetch-Dest': 'script',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }
    _code = get_ua()
    logger.info(f"140生成成功：{_code}")
    print(
        '------------------------------------------------------------------------------------------------------------------')
    params = {
        'a': 'FFFF00000000016E5A77',
        't': t,
        'n': _code,
        'p': '{"ncSessionID":"98159e249c0"}',
        'scene': 'message',
        'asyn': '0',
        'lang': 'cn',
        'v': '948',
        'callback': 'jsonp_0780973890013432',
    }

    response = requests.get('https://cf.aliyun.com/nocaptcha/analyze.jsonp', params=params, headers=headers).text
    logger.info(f"验证结果：{response}")


if __name__ == '__main__':
    for i in range(2):
        time.sleep(3)
        t = ''
        init_pass()
        mian_t()
