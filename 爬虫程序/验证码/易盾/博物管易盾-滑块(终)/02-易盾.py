import json
import random
import string

import ddddocr
import requests
import execjs

from cBezier import bezierTrajectory


class YD:
    def __init__(self):
        self.headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://yuyue.nnhm.org.cn/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-Storage-Access": "active",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.token = None
        with open('01-易盾滑块.js', encoding='utf-8') as f:
            js_code = f.read()
        self.js = execjs.compile(js_code)

    def generate_random_string(self):
        # 生成7位的随机英文字符
        random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=13))  # 生成一个13位的随机字符串
        return random_string[:7]  # 返回前7个字符

    def dddd_ocr(self, slider_bytes, background_bytes):
        # 识别缺口的距离
        det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
        res = det.slide_match(slider_bytes, background_bytes)

        print(f"滑动的距离为: {res['target'][0]}")
        return res['target'][0]

    def get_image(self):
        # 获取图片,提取token的值
        cb = self.js.call('get_cb')
        url = "https://c.dun.163.com/api/v3/get"
        params = {
            'referer': 'https://yuyue.nnhm.org.cn/register.html',
            'zoneId': 'CN31',
            'dt': 'FTBBFmV6HkdBElFAEBeTwGUTAkHzlumv',
            'irToken': 'Xq5GSjGirCpFJhAAVQbG1XQTQhZ/TP/u',
            'id': '9892a2d09349407ba88cc4a43bc594e6',
            'fp': '7gtv9wVOIHfyTjRd4IbeErrBn/AZgjNlDVHD+1Dqr7oeeG90uMDq/OPrK+ex/993dCthMH\\Ct4\\9T\\fME45Mv7MK2lzL7SL\\MRHGxZOLlkbQ5zsSKlQA/05Iy+u5ZMDTil2yCBCTkXT2RD2Tz03LysmSrTcelhwk03mS6v2us+TKhRUr:1753439180525',
            'https': 'true',
            'type': '',
            'version': '2.28.5',
            'dpr': '1.25',
            'dev': '1',
            'cb': cb,
            'ipv6': 'false',
            'runEnv': '10',
            'group': '',
            'scene': '',
            'lang': 'zh-CN',
            'sdkVersion': '',
            'loadVersion': '2.5.3',
            'iv': '4',
            'user': '',
            'width': '320',
            'audio': 'false',
            'sizeType': '10',
            'smsVersion': 'v3',
            'token': 'f8d7b96a18b447a1aab0c13c45b11e10',
            'callback': '__JSONP_yf18xxw_1',
        }

        response = requests.get(url, headers=self.headers, params=params)
        json_data = json.loads(response.text[response.text.index("(") + 1:response.text.rindex(")")])
        print(json_data)

        self.token = json_data['data']['token']

        slider_image_url = json_data['data']['front'][0]
        background_image_url = json_data['data']['bg'][0]


        slider_bytes = requests.get(slider_image_url, headers=self.headers).content
        background_bytes = requests.get(background_image_url, headers=self.headers).content

        return slider_bytes, background_bytes

    def check(self, guiji, slider_x):
        # 校验接口
        cb = self.js.call('get_cb')
        data = self.js.call('get_data', guiji, self.token, slider_x - 10.5)

        url = "https://c.dun.163.com/api/v3/check"
        params = {
            "referer": "https://yuyue.nnhm.org.cn/register.html",
            "zoneId": "CN31",
            "dt": "A3Nyw4gmi7JBFhRRAFPHLBnjhsM3xaKj",
            "id": "9892a2d09349407ba88cc4a43bc594e6",
            "token": self.token,
            "acToken": "undefined",
            "data": data,
            "width": "320",
            "type": "2",
            "version": "2.27.2",
            "cb": cb,
            "extraData": "",
            "bf": "0",
            "runEnv": "10",
            "sdkVersion": "undefined",
            "iv": "4",
            "callback": "__JSONP_st3tiim_5"
        }
        response = requests.get(url, headers=self.headers, params=params)

        print(response)
        print("成功之后的响应:", response.text)
        json_data = json.loads(response.text[response.text.index("(") + 1:response.text.rindex(")")])
        validate = json_data['data']['validate']
        return validate

    def run(self):
        for i in range(1):
            slider_bytes, background_bytes = self.get_image()
            slider_x = self.dddd_ocr(slider_bytes, background_bytes)
            print(slider_x)
            # 生成的轨迹
            guiji = bezierTrajectory().generate_gj(slider_x + 10)
            # print(guiji)
            # time.sleep(2)
            validate = self.check(guiji, slider_x + 10)
            # 此处的fp换为网站上的，自己做测试够用
            fp = "b+YU6\wK2ARubyPHllO\LLZHTe\q/z60AywO3o9yc\gKDkHXcyf7+86Q9ndIU8Y4SBKl6Dr/h48GAO8lBPgol05kACHcCyzZpkJcG4Ux0vr2+2IB98XCu4POlJN+ZA\HJxcGx3Wt83tuvf\qZoPMEgMmMb//0n8JJUJWvErVSCUHmL7U:1744523486384"
            # validate为滑块通过之后返回的数据，但是网站要的数据是为加密之后的validates
            validates = self.js.call('get_cn', fp, validate)
            print("最终加密的结果为:", validates)


if __name__ == '__main__':
    yd = YD()
    yd.run()
