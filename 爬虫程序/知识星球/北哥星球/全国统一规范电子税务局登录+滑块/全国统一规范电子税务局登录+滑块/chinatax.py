import requests,json,time,hmac,hashlib,random,execjs,base64
from datetime import datetime
from loguru import logger
import numpy as np,cv2

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Authorization;": "",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://tpass.guangdong.chinatax.gov.cn:8443",
    "Pragma": "no-cache",
    "Referer": "https://tpass.guangdong.chinatax.gov.cn:8443/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36",
    "X-APP-CLIENTID;": "",
    "X-LANG-ID": "null",
    "X-NATURE-IP;": "",
    "X-SM4-INFO": "0",
    "X-TEMP-INFO": "null",
    "X-TICKET-ID": "null",
    "deviceIdentyNo": "rokthsKklQ1PCXQY2hof1iQoAeAzKhAa",
    "hUid;": "",
    "sec-ch-ua": "\"Not=A?Brand\";v=\"99\", \"Chromium\";v=\"118\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}

# HmacSha256加密
def getHmacSha256(key,data):
    hmac_obj = hmac.new(key.encode(), data.encode(), digestmod=hashlib.sha256).digest()
    return hmac_obj.hex()

# key处理
def get_gram_key(key):
    A = ''
    for i in range(len(key)):
        if "" == A:
            A = f'{hex(ord(key[i]))[2:]}'
        else:
            A += f'{hex(ord(key[i]))[2:]}'
    return A

# 获取滑块距离
def identify_gap(bg, tp):
    """
    bg: 背景图片
    tp: 缺口图片
    out: 输出图片
    """
    # 读取背景图片和缺口图片
    bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE)
    tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE)  # 缺口图片
    yy = []
    xx = []
    for y in range(tp_img.shape[0]):
        for x in range(tp_img.shape[1]):
            r = tp_img[y, x]
            if r < 200:
                yy.append(y)
                xx.append(x)
    tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)]
    # 识别图片边缘
    bg_edge = cv2.Canny(bg_img, 100, 200)
    tp_edge = cv2.Canny(tp_img, 100, 200)
    # 转换图片格式
    bg_pic = cv2.cvtColor(bg_edge, cv2.COLOR_GRAY2RGB)
    tp_pic = cv2.cvtColor(tp_edge, cv2.COLOR_GRAY2RGB)
    # 缺口匹配
    res = cv2.matchTemplate(bg_pic, tp_pic, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)  # 寻找最优匹配
    # # 绘制方框
    th, tw = tp_pic.shape[:2]
    tl = max_loc  # 左上角点的坐标
    br = (tl[0] + tw, tl[1] + th)  # 右下角点的坐标
    cv2.rectangle(bg_img, tl, br, (0, 0, 255), 2)  # 绘制矩形
    cv2.imwrite('distinguish.jpg', bg_img)  # 保存在本地
    # 返回缺口的X坐标
    return max_loc[0]

# 获取公钥
def getPublicKey():
    nowTime = f'{datetime.fromtimestamp(int(time.time()))}'.replace('-','').replace(' ','').replace(':','')
    url = "https://tpass.guangdong.chinatax.gov.cn:8443/sys-api/v1.0/auth/oauth2/getPublicKey"
    data = {
        "zipCode": "0",
        "encryptCode": "0",
        "datagram": "{}",
        "timestamp": nowTime,
        "access_token": "",
        "signtype": "HMacSHA256"
    }
    random_key = ''.join(random.sample('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 16))
    data['signature'] = getHmacSha256(random_key,data['zipCode'] + data['encryptCode'] + nowTime + data['signtype'])
    data = json.dumps(data, separators=(',', ':'))
    datagram = requests.post(url, headers=headers, data=data).json()['datagram']

    datagram = json.loads(datagram)
    uuid = datagram['uuid']
    headers['X-TEMP-INFO'] = uuid
    publicKey = datagram['publicKey']
    new_key16 = ''.join(random.sample('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 16))

    logger.success(f'获取getPublicKey接口结果：{datagram}')

    logger.success(f'获取公钥成功后得到uuid:{uuid}')
    logger.success(f'获取publicKey:{publicKey}')
    logger.success(f'生成新的key16:{new_key16}')

    secret = execjs.compile(open('./sm.js','r',encoding='utf-8').read()).call('get_secret',new_key16,publicKey)

    logger.success(f'使用生成new_key16和publicKey生成secret:{secret}')
    return uuid,new_key16,secret

# 验证生成的secret 和 生成的key16
def getsendSm4():
    uuid,new_key16,secret = getPublicKey()
    nowTime = f'{datetime.fromtimestamp(int(time.time()))}'.replace('-','').replace(' ','').replace(':','')
    url = "https://tpass.guangdong.chinatax.gov.cn:8443/sys-api/v1.0/auth/white/sendSm4"
    data = {
        "zipCode": "0",
        "encryptCode": "0",
        "datagram": json.dumps({'uuid':uuid,'secret':secret},separators=(',',':')),
        "timestamp": nowTime,
        "access_token": "",
        "signtype": "HMacSHA256"
    }
    random_key = ''.join(random.sample('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 16))
    data['signature'] = getHmacSha256(random_key,data['zipCode'] + data['encryptCode'] + nowTime + data['signtype'])
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data).json()

    logger.success(f'sendSm4接口处理结果：{response}')

    return new_key16

# 获取验证码图片
def getCaptcha():
    new_key16 = getsendSm4()
    client_data = '{"client_id":"c5djdncfa7nj4n2cajna2j68cndbj2fc","redirect_uri":"https://etax.guangdong.chinatax.gov.cn:8443/mhzx/api/mh/tpass/code"}'
    
    gram_key = get_gram_key(new_key16[:8] + "dt!Ppb9t")
    datagram = execjs.compile(open('./sm.js','r',encoding='utf-8').read()).call('get_datagram',client_data,gram_key)
    url = "https://tpass.guangdong.chinatax.gov.cn:8443/sys-api/v1.0/auth/captcha/getCaptcha"
    nowTime = f'{datetime.fromtimestamp(int(time.time()))}'.replace('-','').replace(' ','').replace(':','')
    data = {
        "zipCode": "0",
        "datagram": datagram,
        "encryptCode": "2",
        "timestamp": nowTime,
        "access_token": "",
        "signtype": "HMacSHA256"
    }
    data['signature'] = getHmacSha256(new_key16,data['zipCode'] + data['encryptCode'] + datagram + nowTime + data['signtype'])
    data = json.dumps(data, separators=(',', ':'))
    Captcha = requests.post(url, headers=headers, data=data).json()['datagram']

    Captcha = json.loads(Captcha)
    bgImg = base64.b64decode(Captcha['canvasSrc'].replace('data:image/jpg;base64,',''))
    fpImg = base64.b64decode(Captcha['blockSrc'].replace('data:image/png;base64,',''))
    new_uuid = Captcha['uuid']

    gen = int(identify_gap(bgImg, fpImg))
    logger.success(f'识别缺口距离:{gen}')
    logger.success(f'获取新的uuid:{new_uuid}')

    return new_key16,gen,new_uuid,gram_key

# 验证验证码
def get_verify_code():
    new_key16,gen,new_uuid,gram_key = getCaptcha()

    url = "https://tpass.guangdong.chinatax.gov.cn:8443/sys-api/v1.0/auth/captcha/verifyCaptcha"
    client_data = {"blockX":gen,"uuid":f"{new_uuid}"}
    nowTime = f'{datetime.fromtimestamp(int(time.time()))}'.replace('-','').replace(' ','').replace(':','')
    
    datagram = execjs.compile(open('./sm.js','r',encoding='utf-8').read()).call('get_datagram',json.dumps(client_data,separators=(',',':')),gram_key)
    data = {
        "zipCode": "0",
        "datagram": datagram,
        "encryptCode": "2",
        "timestamp": nowTime,
        "access_token": "",
        "signtype": "HMacSHA256"
    }
    data['signature'] = getHmacSha256(new_key16,data['zipCode'] + data['encryptCode'] + datagram + nowTime + data['signtype'])
    data = json.dumps(data, separators=(',', ':'))

    response = requests.post(url, headers=headers, data=data).json()
    logger.success(f'验证验证码接口处理结果：{response}')

    # 对结果进行解密
    datagram = response['datagram']
    ticket = execjs.compile(open('./sm.js','r',encoding='utf-8').read()).call('get_ticket',datagram,gram_key)

    ticket = json.loads(str(ticket))['ticket']
    headers['X-TICKET-ID'] = ticket
    logger.success(f'验证码验证成功后解密得到获取请求头ticket:{ticket}')
    return new_key16,gram_key

# 登录
def get_login(email,password):
    new_key16,gram_key = get_verify_code()

    url = "https://tpass.guangdong.chinatax.gov.cn:8443/sys-api/v1.0/auth/user/single/emailPswLogin"
    client_data = {"client_id":"c5djdncfa7nj4n2cajna2j68cndbj2fc","redirect_uri":"https://etax.guangdong.chinatax.gov.cn:8443/mhzx/api/mh/tpass/code","email":f"{email}","password":f"{password}"}
    nowTime = f'{datetime.fromtimestamp(int(time.time()))}'.replace('-','').replace(' ','').replace(':','')
    
    datagram = execjs.compile(open('./sm.js','r',encoding='utf-8').read()).call('get_datagram',json.dumps(client_data,separators=(',',':')),gram_key)
    data = {
        "zipCode": "0",
        "datagram": datagram,
        "encryptCode": "2",
        "timestamp": nowTime,
        "access_token": "",
        "signtype": "HMacSHA256"
    }
    data['signature'] = getHmacSha256(new_key16,data['zipCode'] + data['encryptCode'] + datagram + nowTime + data['signtype'])

    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data).json()

    datagram = response['datagram']
    data = execjs.compile(open('./sm.js','r',encoding='utf-8').read()).call('get_ticket',datagram,gram_key)

    # logger.success(f'登录后解密得到cookie：{data}')
    logger.success(f'登录接口处理结果：{response}')

if __name__ == '__main__':
    email = '11111111@qq.com'
    password = '11111111'
    get_login(email,password)