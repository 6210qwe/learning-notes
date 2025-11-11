import json

import requests
from loguru import logger
import hashlib
import execjs

def md5_encrypt(text):
    """
    对输入的文本进行MD5加密
    
    参数:
        text: 待加密的字符串
        
    返回:
        加密后的32位十六进制字符串
    """
    md5_hash = hashlib.md5()

    md5_hash.update(text.encode('utf-8'))
    
    encrypted_text = md5_hash.hexdigest()
    
    return encrypted_text


def Translate(str):
    headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://www.iciba.com",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://www.iciba.com/",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    }
    url = "https://ifanyi.iciba.com/index.php"
    data_str = '6key_web_new_fanyi6dVjYLFyzfkFkk'+str
    data_str_md5 = md5_encrypt(data_str)
    logger.success(f"md5加密结果: {data_str_md5}")
    data_str_aes = execjs.compile(open('aes.js', 'r', encoding='utf-8').read()).call('aes_encrypt', data_str_md5[0:16])
    logger.success(f"aes加密结果: {data_str_aes}")
    params = {
        "c": "trans",
        "m": "fy",
        "client": "6",
        "auth_user": "key_web_new_fanyi",
        "sign": data_str_aes
    }
    data = {
        "from": "auto",
        "to": "auto",
        "q": str
    }
    response = requests.post(url, headers=headers, params=params, data=data).json()
    logger.success(f'请求相应结果：: {response}')
    decrypt_data = execjs.compile(open('aes.js', 'r', encoding='utf-8').read()).call('aes_decrypt', response['content'])
    logger.success(f'解密响应结果: {decrypt_data}')
    logger.success(f'{str}翻译结果为:{json.loads(decrypt_data)["out"]}')

Translate('猴子')