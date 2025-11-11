import requests, subprocess, re, json
from urllib.parse import urlencode
from loguru import logger

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://account.dianping.com',
    'Pragma': 'no-cache',
    'Referer': 'https://account.dianping.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36',
    # 'mtgsig': '{"a1":"1.2","a2":1753684021272,"a3":"3z8wyxu9wzx75v9vzyuu846uu609u35v8015u7373v597958980v8003","a5":"hDaZc/KUkhA4C2JGt4Tm9kHW76UEVEqT5lXZviF3Fxu6Kx/CQv4PbbcOnr5xV6uWQW==","a6":"h1.8ITCfRPXS7zlzUHE85PVo8xLxoioGSJteqrbZiCH0I4idli+G/zeeABuuXfU1818gbRC2JrctS6JdGu0CVt/LcSvSXGugqun4Dwz3teEZBY4vYB+GiXp+DeXY51TjmgD2e3DNA4GMg41YIej1gbsEonI2WtY3Ozh+CiPhrzkonAt6jK95pIoCD/dzxzXa2ztXXgPdDb2LtCwuPt2p2gwuemD+TtAy434//knz6rt66fkrmkE3qoK4Xa24wntv4M8/L+X6vN2ETHmtKqgbMsTCSu/aqfIUWu83VAO63SviTJ+ytrnmJV2dfSy3LYSVJswLGWcabXQTbeFzkvEBsclGbTPG2Z9WYsxBLy5fASgblP1eElml4vOk1FLj79U0hjD5JAW7z89EI6tZ/Z/FnDZF0g==","a8":"40249ce62f6a79b9af7a620c0876b79f","a9":"3.2.1,7,230","a10":"3d","x0":4,"d1":"6d2de59626a97a0fa1a2da114b849f98"}',
    'sec-ch-ua': '"Not=A?Brand";v="99", "Chromium";v="118"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}


def run_js_script(all_data_params_cookies):
    '''
            all_data_params_cookies: 所有参数和数据，包括params和data，cookies
            file_name : 自己的 h5.js的相对路径
        '''
    try:
        # 执行 JavaScript 文件 async_operation.js，使用 Node.js
        result = subprocess.run(
            ['node', r'env.js', all_data_params_cookies],
            capture_output=True, text=True, timeout=5, encoding='utf-8')

        # 输出 JavaScript 进程的标准输出
        res = result.stdout.strip().split("\n")[-1]
        logger.success(f'mtgsig:{res}')
        return res
    except subprocess.TimeoutExpired:
        print("JavaScript execution timed out.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing JavaScript: {e}")


def get_login():
    url = 'https://accountapi.dianping.com/mlogin/dp/api/v3/account/mobileloginapply'
    params = {
        'yodaReady': 'h5',
        'csecplatform': '4',
        'csecversion': '3.2.1',
    }
    params = urlencode(params)
    data = {
        'encryptMobile': 'JBCtIHMKHCem2MvShDYPrOu9qeFonZB83JP1QgMRHrfbwJiaBF4sG/1HUJArEkqkYEfDWENi42sJf3OLBhdDafaTRlONzVdHJzjfmT9jj0RtRghdEh29HtS9Q/vPP1GWVA0y2w97D0JASCruCDXfgIFOPTUycdBOqAPXSUkJ7Degby2FW151ogEBvzQQ60pfvDm2RheYPF/yRBTfMzPed6B3ylnvX6wcBxCFMX89QVvmV+Nx/qCsW1XjY8rB+hyWjjW5/m1Ot9zvbfndhvKqfPKtkLNRRr6F+kd3wqHm9Gv8WzCcZw0eqC5iTCAWC9soKXwcyWS8e6fecx6lMrIJmg==',
        'countryCode': '86',
        'uuid': '1984f260afcc8-0b8b31138953ef-1854352f-144000-1984f260afcc8',
        'cx': 'cxcxcx',
        'platform': '1',
        'app': '216',
        'partner': '26',
        'risk_platform': '1',
        'risk_app': '216',
        'risk_partner': '26',
        'siteType': 'PC',
        'h5_fingerprint': 'H5dfp_3.2.1_tttt_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',
    }
    data = urlencode(data)

    all_data_params_cookies = {
        'method': 'POST',
        'cookies': '',
        'data': data,
        'url': url + '?' + params
    }
    mtgsig = run_js_script(json.dumps(all_data_params_cookies, separators=(',', ':')))
    headers['mtgsig'] = mtgsig
    response = requests.post(
        url=url,
        params=params,
        headers=headers,
        data=data,
    )
    logger.success(f'大众点评获取验证码响应：{response.text}')


if __name__ == '__main__':
    get_login()
