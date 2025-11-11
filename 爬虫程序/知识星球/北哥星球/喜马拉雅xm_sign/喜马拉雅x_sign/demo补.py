import base64
import execjs
import requests,subprocess


headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Origin': 'https://www.ximalaya.com',
    'Pragma': 'no-cache',
    'Referer': 'https://www.ximalaya.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36',
    'sec-ch-ua': '"Not=A?Brand";v="99", "Chromium";v="118"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Content-Type': 'application/octet-stream',
}

# 使用 subprocess 执行 JavaScript 文件并获取结果
def run_js_script():
    try:
        # 执行 JavaScript 文件 async_operation.js，使用 Node.js
        result = subprocess.run(['node', r'D:\js教程\喜马拉雅x_sign\dws_env.js'], capture_output=True, text=True, timeout=5)

        # 输出 JavaScript 进程的标准输出
        # print("JavaScript async operation result:", result.stdout.strip())
        return result.stdout.strip().replace('xhr.send:::','')
    except subprocess.TimeoutExpired:
        print("JavaScript execution timed out.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing JavaScript: {e}")

def data_decrypt(strc):
    js = '''
        var cryptoJs = require('crypto-js');
        aes_decrypt = function (data) {
        key = cryptoJs.enc.Utf8.parse("m9ZtRrz:qujT8@da");
        var encrypted = cryptoJs.AES.decrypt(data, key, {
            iv:key,
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        });
        return JSON.parse(encrypted.toString(cryptoJs.enc.Utf8));
    }
    '''
    return execjs.compile(js).call('aes_decrypt',strc)

url_data = run_js_script().split('||')
response = requests.post(url_data[0], headers=headers, data=base64.b64decode(url_data[1]))
print(response.text)
print(response.status_code)



x_sign_dict = data_decrypt(response.text)
x_sign =x_sign_dict['cadd'] + '&&' + x_sign_dict['sid']

url = "https://www.ximalaya.com/revision/rank/v4/element"
params = {
    "rankingId": "100149"
}
headers['xm-sign'] = x_sign
response = requests.get(url, headers=headers, params=params)
print(response.text)