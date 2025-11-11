import requests
import execjs
import json
import subprocess


class GL:
    def __init__(self):
        self.session = requests.session()
        # self.session = tls_client.Session()
    def get_cookie(self):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0',
            'Accept': 'application/json; charset=utf-8',
            # 'Accept-Encoding': 'gzip, deflate, br, zstd',
            'sec-ch-ua-platform': '"Windows"',
            'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134"',
            'content-type': 'text/plain; charset=utf-8',
            'sec-ch-ua-mobile': '?0',
            'origin': 'https://www.globalsources.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.globalsources.com/',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'priority': 'u=1, i',
            }

        params = {
            'd': 'www.globalsources.com',
        }
        result = subprocess.run(["node", "reese84更新.js"], capture_output=True, text=True)
        print(result)
        data = result.stdout.strip()


        res = self.session.post(
            'https://www.globalsources.com/rly-Is-rel-and-wher-Eare-it-bore-Be-comman-eue-m/4000673893660879230?d=www.globalsources.com',
            params=params,
            headers=headers,
            data=data,
        )
        print(res.text)
        res_json = res.json()
        reese84 = res_json['token']

        print('reese84',reese84)

        print(len(reese84))
        # reese84  = '3:8eXr+gPDAXf+7/uvZ5azpQ==:okkVrCS1lr9WKD5bu3KZjNl+ut4c8Rv23z0WYMRrQEAsCtH8BXjCKA5GQ5euvS6R7olX1UvAPn/JFMdTRvCOIgq2Cv5ukdC8E2eYimar4dkzByXGLLGs1uAiDPKbNczsLMKQWlRYYNyj104c8xNRV1G1lKHtuOjeAKGqT1m8ZGqITkJ74GGEPdM7uEcxJfWJAFtgJh39T1DKHIqi8taFbmJng7PwnjptMzSW7Tt07y9wx4yIc7tXB6O6ufnmYKCY7J8dWrw+j5pY1RlU6SpZM93e42ZTbYB4Vvcrh1H4+M/SL1+6ZNecuvT7MRiYQwtzidfaGkfblkKiJ4UU/TOROxbsrvpaGU6l7YzbLgNFjviLbsMWhBtfBENYILp+nFzxtbTXUyNx2IZvVmQphDo1J9ifklrcQl9N1DV7ZaJQaABcSVMnGQB/xR2XE1kQMm4BwCJJpsgA13nLhyTMWQDXsq2lNHSOlPImVVN5onlyZ9kBuQw77Jg/AEoAjNM/biHK4UcPq+3nUGSpnybgiaE7eg==:SSpOvbPruB4mkRYd0YFGV0kaAdvuHC9ULeMo8Yn0MF0='
        self.session.cookies.set('reese84',reese84)

    def getinfo(self):

        headers = {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'cache-control': 'no-cache',
            'pragma': 'no-cache',
            'priority': 'u=0, i',
            'referer': 'https://www.globalsources.com/Network-camera/Wifi-IP-camera-night-vision-1174156532p.htm?source=GSOLHP_RTO_2',
            'sec-ch-ua': '"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0',
        }

        params = {
            'source': 'GSOLHP_RTO_2',
        }

        res = self.session.get(
            'https://www.globalsources.com/Network-camera/Wifi-IP-camera-night-vision-1174156532p.htm',
            params=params,
            headers=headers,
        )
        print('status——code:',res.status_code)
        print('结果验证:',res.text)
        debug = 1

gl = GL()
gl.get_cookie()
gl.getinfo()
