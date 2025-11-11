import subprocess
import os


class MySubprocessPopen(subprocess.Popen):
    def __init__(self, *args, **kwargs):
        kwargs['encoding'] = 'UTF-8'
        super().__init__(*args, **kwargs)


subprocess.Popen = MySubprocessPopen
os.environ['EXECJS_RUNTIME'] = 'Node'

import execjs
from curl_cffi import requests
import json


class Ks():
    def __init__(self):
        self.kww = self.get_kww()
        self.headers = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Content-Type": "application/json",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "kww": self.kww,
            "Origin": "https://ktag6nr93.m.chenzhongtech.com",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://ktag6nr93.m.chenzhongtech.com/fw/tag/text?cc=share_copylink&kpf=ANDROID_PHONE&fid=4081117814&shareMethod=token&kpn=KUAISHOU&subBiz=TEXT_TAG&rich=false&shareId=18448063952787&shareToken=X4HA7MNYBh9wuW7&tagName=%E5%90%AC%E4%B8%80%E9%A6%96%E6%AD%8C%E8%AE%B2%E8%BF%B0%E4%B8%80%E4%B8%AA%E6%95%85%E4%BA%8B&shareType=7&shareMode=app&appType=21&shareObjectId=%E5%90%AC%E4%B8%80%E9%A6%96%E6%AD%8C%E8%AE%B2%E8%BF%B0%E4%B8%80%E4%B8%AA%E6%95%85%E4%BA%8B&timestamp=1750767739954",
            "Accept-Language": "zh-CN,zh;q=0.9"
        }
        self.cookies = {
            "did": "web_7a936ac3854f4a6eb483df7815f90813",
            "didv": "1751081159000",
            "kwpsecproductname": "kuaishou-growth-offSite-h5-ssr",
            "ktrace-context": "1|MS44Nzg0NzI0NTc4Nzk2ODY5Ljk1NDkxNzIxLjE3NTEwOTU3MDc0NTguNTk4NjEyNjc=|MS44Nzg0NzI0NTc4Nzk2ODY5LjY4Nzg1NDE4LjE3NTEwOTU3MDc0NTguNTk4NjEyNjg=|0|webservice-user-growth-node|webservice|true|src-Js",
            "kwssectoken": "m5/Zqc0vOwGArXhi6BcLSgIB61XMEry3dIah+wuA9MG48/QdwUuPubRbnCd5Ie+8FRbt7s6KSlJxDhrzq+ojMQ==",
            "kwscode": "4b52a4cf3471b2421cd6a03c835b8d168a7c5fe6b9af502750b3a617088bb8e3",
            "kwfv1": self.kww
        }

    # 请求头的kww参数
    def get_kww(self):
        kww = execjs.compile(open('请求头参数.js', encoding='utf-8').read()).call('getkww')
        return kww

    # params的签名参数
    def get_NS_hxfalcon(self, caver, tagName, pcursor, count):
        NS_hxfalcon = execjs.compile(open('荷载参数生成.js', encoding='utf-8').read()).call('get_signResult', caver,
                                                                                            tagName, pcursor, count)
        return NS_hxfalcon

    # 请求
    def req_index(self):
        url = "https://ktag6nr93.m.chenzhongtech.com/rest/wd/ugH5App/tag/text/feed/recent"
        params = {
            "__NS_hxfalcon": '',
            "caver": "2"
        }
        data = {
            "tagName": "上官婉儿",
            "pcursor": "1",
            "count": 18
        }
        NS_hxfalcon = self.get_NS_hxfalcon(params['caver'], data['tagName'], data['pcursor'], data['count'])
        params['__NS_hxfalcon'] = NS_hxfalcon
        data = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
        response = requests.post(url, headers=self.headers, cookies=self.cookies, params=params, data=data)
        print(response.text)
        print(response)

    def run(self):
        self.req_index()


if __name__ == '__main__':
    ks = Ks()
    ks.run()
