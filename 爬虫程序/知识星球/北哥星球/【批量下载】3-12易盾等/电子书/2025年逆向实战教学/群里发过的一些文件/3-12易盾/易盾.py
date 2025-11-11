import json
import random
import time
import ddddocr
import requests
import execjs

class YiDun:
    def __init__(self):
        self.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Referer': 'https://dun.163.com/',
            'Sec-Fetch-Dest': 'script',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.cookies = {
            '_ga': 'GA.1.2d44baad7f06e.3ed754d3504df9e70327',
            '__root_domain_v': '.163.com',
            '_qddaz': 'QD.970141667397646',
            'Hm_lvt_4671c5d502135636b837050ec6d716ce': '1741667326,1741682479,1741740197',
            'Hm_lpvt_4671c5d502135636b837050ec6d716ce': '1741740197',
            'HMACCOUNT': 'CC3C8B78013F2820',
        }
        self.token = ''
        with open('易盾.js', encoding='utf-8') as fp:
            js_code = fp.read()
        self.js = execjs.compile(js_code)

        # 计算图片的缺口坐标
    def ddddocr_identify(self,target_bytes,background_bytes):
        det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
        distance = det.slide_match(target_bytes, background_bytes)['target'][0]
        self.distance = distance
        print(f"滑动的距离为: {distance}")
        return distance
    
    # 滑块轨迹生成位置
    def get_track(self, dis=0):
        dis = dis or self.distance
        track = []
        x = random.randint(0, 10)
        y = random.randint(-5, 5)
        pass_time = random.randint(10, 90)
        move_dis = x
        track.append([x, y, pass_time])
        for _ in range(random.randint(0, 3)):
            pass_time += random.randint(2, 5)
            y = random.randint(-1, 1)
            track.append([x, y, pass_time])
        while move_dis < dis:
            if move_dis > dis * 0.95:
                offset = random.randint(-1, 1)
            elif move_dis > dis * 0.85:
                offset = random.randint(0, 1)
            elif move_dis > dis * 0.75:
                offset = random.randint(1, 2)
            elif move_dis > dis * 0.65:
                offset = random.randint(2, 3)
            else:
                offset = random.randint(5, 8)
            time_data = random.randint(35, 48)
            pass_time += time_data
            move_dis += offset
            y = random.choice([y, random.randint(-5, 5)])
            track.append([move_dis, y, pass_time])
        for _ in range(random.randint(0, 3)):
            pass_time += random.randint(3, 5)
            y = random.choice([y, random.randint(-1, 1)])
            track.append([move_dis, y, pass_time])
        return track
    

    # 获取请求的token和获取图片url
    def get_img_url(self):
        cb = self.js.call('get_cb')
        
        params = {
            'referer': 'https://dun.163.com/trial/jigsaw',
            'zoneId': 'CN31',
            'dt': '2M0QJD4fcN1FFlQUUFKTM8SUAnb/fPt3',
            'irToken': 'HsW86C/vG1ZAdgVFUFeGM9HURyxFZBgI',
            'id': '07e2387ab53a4d6f930b8d9a9be71bdf',
            'fp': 'UAYpj+QzlglSLjQGGaElZy+e\\W+SQ8hgIT\\leHPfm2rNKIu8q5r/CMZ10dB\\jiDrZrrMlQuE3emZAHfclP+G6vq4COt+dl09D5MWiT7n9hwLlK2Bw4QtB5Q4wDoHp1lDlpo26TOTcAKOuI8wyjtKYr1aU3TIJVL619QPEMzr\\Lfsxotb:1741745797735',
            'https': 'true',
            'type': '2',
            'version': '2.28.0',
            'dpr': '1.25',
            'dev': '1',
            'cb': cb,
            'ipv6': 'false',
            'runEnv': '10',
            'group': '',
            'scene': '',
            'lang': 'zh-CN',
            'sdkVersion': '',
            'loadVersion': '2.5.2',
            'iv': '4',
            'user': '',
            'width': '320',
            'audio': 'false',
            'sizeType': '10',
            'smsVersion': 'v3',
            'token': '',
            'callback': '__JSONP_rz57cs7_0',
        }

        response = requests.get('https://c.dun.163.com/api/v3/get', params=params, headers=self.headers)
        # 去除回调函数包装部分
        json_str = response.text.split('(', 1)[1].rsplit(')', 1)[0]
        # 解析 JSON 数据
        data = json.loads(json_str)
        # token
        self.token = data['data']['token']
        # 滑块缺口图
        slider_image_url = data['data']['front'][0]
        # 滑块背景图
        background_image_url = data['data']['bg'][0]

        slider_bytes = requests.get(slider_image_url, headers=self.headers).content
        background_bytes = requests.get(background_image_url, headers=self.headers).content

        return slider_bytes, background_bytes
    

    def get_hk(self,slider_x,track_List):
        # 请求滑块
        cb = self.js.call('get_cb')
        data = self.js.call('get_hk_data', slider_x, self.token, track_List)

        params = {
            'referer': 'https://dun.163.com/trial/jigsaw',
            'zoneId': 'CN31',
            'dt': '2M0QJD4fcN1FFlQUUFKTM8SUAnb/fPt3',
            'id': '07e2387ab53a4d6f930b8d9a9be71bdf',
            'token': self.token,
            'data': data,
            'width': '320',
            'type': '2',
            'version': '2.28.0',
            'cb': cb,
            'user': '',
            'extraData': '',
            'bf': '0',
            'runEnv': '10',
            'sdkVersion': '',
            'loadVersion': '2.5.2',
            'iv': '4',
            'callback': '__JSONP_ewjik4h_1',
        }

        url = "https://c.dun.163.com/api/v3/check"
        response = requests.get(url, headers=self.headers, cookies=self.cookies, params=params)
        print(response.text)
        print(response)


    def main(self):
        for i in range(1,10):
            time.sleep(2)
            slider_bytes, background_bytes = self.get_img_url()  #获取滑块图片数据
            slider_x = self.ddddocr_identify(slider_bytes, background_bytes)  #识别缺口位置
            track_List = self.get_track()  #获取滑块轨迹
            self.get_hk(slider_x,track_List)


if __name__ == '__main__':
    yidun = YiDun()
    yidun.main()