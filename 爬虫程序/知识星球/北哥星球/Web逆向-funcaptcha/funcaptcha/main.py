import requests
import execjs
from loguru import logger


def get_bda():
    with open(r"get_bda.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    xb_run = execjs.compile(js_code)
    result = xb_run.call('get_bda')
    return result


def get_bio():
    with open(r"get_bio.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    xb_run = execjs.compile(js_code)
    result = xb_run.call('get_bio')
    return result


def get_guess(session_token, index):
    with open(r"get_bio.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    xb_run = execjs.compile(js_code)
    result = xb_run.call('get_guess', session_token, index)
    return result


class Spider:
    def __init__(self):
        self.requests = requests.Session()
        self.cookies = {
            '_cfuvid': '2Tcy_EqLJ0qhYnviOGCTm_1P9sZBMu9.hAx5FSqz2z4-1717104076479-0.0.1.1-604800000',
            '_gcl_au': '1.1.826907088.1751968269',
            '_gid': 'GA1.2.1330562102.1751968270',
            '_fbp': 'fb.1.1751968270218.194423472661141957',
            '_mkto_trk': 'id:465-HCZ-671&token:_mch-arkoselabs.com-81543f5464e651c6381669c602963e',
            'cebs': '1',
            '_ce.clock_data': '558%2C103.127.219.20%2C1%2C0fe6feb54289f4c67027ec06cc2131f8%2CChrome%2CTW',
            'timestamp': '175196800870937',
            '_ga_QZYYHVFGCW': 'GS2.1.s1751968269$o1$g1$t1751968955$j58$l0$h0',
            '_uetsid': '13faa1c05be111f093c5c330c571faf4',
            '_uetvid': '13fa93d05be111f0807e5701d885f1a4',
            '_ce.s': 'v~ff9e943cbee0d332a4a046f9cc9a55d3d08edaeb~lcw~1751968630755~vir~new~lva~1751968270994~vpv~0~v11.cs~361698~v11.s~14976240-5be1-11f0-85ec-8d3d9509619e~v11.vs~ff9e943cbee0d332a4a046f9cc9a55d3d08edaeb~v11.fsvd~eyJ1cmwiOiJhcmtvc2VsYWJzLmNvbS9hcmtvc2UtbWF0Y2hrZXkiLCJyZWYiOiIiLCJ1dG0iOltdfQ%3D%3D~v11.ss~1751968271994~v11ls~14976240-5be1-11f0-85ec-8d3d9509619e~lcw~1751968957576',
            'cebsp_': '5',
            '_ga': 'GA1.2.1035983465.1751968269',
            '_gat_UA-142110391-1': '1',
            '_ga_DS11VR4FHT': 'GS2.2.s1751968270$o1$g1$t1751968958$j60$l0$h0',
        }
        self.requests.headers = {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://client-api.arkoselabs.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://client-api.arkoselabs.com/v2/2.15.0/enforcement.cb91e3cd81d7571c86ff1f4512db1ade.html',
            'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'x-ark-esync-value': '1751954400',
        }
        self.proxies = {
            "http": "http://127.0.0.1:7890",
            "https": "http://127.0.0.1:7890",
        }
        self.token = None
        self.challengeID = None

    def get_captcha_init(self):
        data = 'public_key=3EE79F8D-13A6-474B-9278-448EA19F79B3&' \
               'capi_version=2.15.0&capi_mode=lightbox&' \
               'style_theme=default&rnd=0.5823393324314852&' \
               f'bda={get_bda()}&' \
               'site=https%3A%2F%2Fwww.arkoselabs.com&' \
               'userbrowser=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F137.0.0.0%20Safari%2F537.36'

        response = self.requests.post(
                'https://client-api.arkoselabs.com/fc/gt2/public_key/3EE79F8D-13A6-474B-9278-448EA19F79B3',
            cookies=self.cookies, data=data, proxies=self.proxies).json()
        logger.info(response)
        self.token = str(response['token']).split('|')[0]

    def image_init(self):
        self.requests.headers = {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://client-api.arkoselabs.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://client-api.arkoselabs.com/v2/2.15.0/enforcement.cb91e3cd81d7571c86ff1f4512db1ade.html',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
            'x-newrelic-timestamp': '175203100668069',
            'x-requested-with': 'XMLHttpRequest'
        }

        data = {
            'token': self.token,
            'sid': 'ap-southeast-1',
            'render_type': 'canvas',
            'lang': '',
            'isAudioGame': 'false',
            'is_compatibility_mode': 'false',
            'apiBreakerVersion': 'green',
            'analytics_tier': '40',
        }

        response = self.requests.post('https://client-api.arkoselabs.com/fc/gfct/', cookies=self.cookies,
                                      proxies=self.proxies,
                                      data=data).json()
        self.challengeID = response['challengeID']

        data = response['game_data']
        _challenge_imgs = data['customGUI']['_challenge_imgs']
        logger.info(_challenge_imgs[0])
        logger.info(f"需要{len(_challenge_imgs)}次验证")
        self.requests.headers = {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'no-cache',
            'device-memory': '8',
            'pragma': 'no-cache',
            'priority': 'u=0, i',
            'sec-ch-dpr': '1',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
            'sec-ch-ua-arch': '"x86"',
            'sec-ch-ua-bitness': '"64"',
            'sec-ch-ua-form-factors': '"Desktop"',
            'sec-ch-ua-full-version-list': '"Not)A;Brand";v="8.0.0.0", "Chromium";v="138.0.7204.97", "Google Chrome";v="138.0.7204.97"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '""',
            'sec-ch-ua-platform': '"Windows"',
            'sec-ch-ua-platform-version': '"10.0.0"',
            'sec-ch-viewport-width': '1920',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        }
        back_content = self.requests.get(_challenge_imgs[0], cookies=self.cookies, proxies=self.proxies).content
        with open("./image/back.jpg", "wb") as b:
            b.write(back_content)

    def get_captcha(self):
        self.requests.headers = {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://client-api.arkoselabs.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://client-api.arkoselabs.com/fc/assets/ec-game-core/game-core/1.29.1/standard/index.html?session=28518507ef47c0768.8566312104&r=ap-southeast-1&meta=3&meta_width=300&metabgclr=transparent&metaiconclr=%23555555&guitextcolor=%23000000&pk=3EE79F8D-13A6-474B-9278-448EA19F79B3&at=40&ag=101&cdn_url=https%3A%2F%2Fclient-api.arkoselabs.com%2Fcdn%2Ffc&surl=https%3A%2F%2Fclient-api.arkoselabs.com&smurl=https%3A%2F%2Fclient-api.arkoselabs.com%2Fcdn%2Ffc%2Fassets%2Fstyle-manager&theme=default',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
            'x-newrelic-timestamp': '175203900852066',
            'x-requested-id': '{"ct":"qEMcs/haWQCp31Do7i6tCDQbCJvMsoogkQu8Fhu/H/s=","iv":"ab2425c8a756b3ec4d01c4bce63eea88","s":"9142e3bdc87d4c54"}',
            'x-requested-with': 'XMLHttpRequest',
        }
        index = int(input("输入图片在第几张:"))
        guess = get_guess(self.token, index)
        data = {
            'session_token': self.token,
            'game_token': self.challengeID,
            'sid': 'ap-southeast-1',
            'guess': guess,
            'render_type': 'canvas',
            'analytics_tier': '40',
            'bio': get_bio(),
            'is_compatibility_mode': 'false',
        }
        response = self.requests.post('https://client-api.arkoselabs.com/fc/ca/', cookies=self.cookies,
                                      proxies=self.proxies, data=data)
        logger.info(response.text)


if __name__ == '__main__':
    sp = Spider()
    sp.get_captcha_init()
    sp.image_init()
    sp.get_captcha()
