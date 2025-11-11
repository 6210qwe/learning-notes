from curl_cffi import requests

cookies = {
    'country': 'CN',
    '_yq_bid': 'G-3988258EF1404F7E',
    'v5_Culture': 'zh-cn',
    '_ga': 'GA1.1.913082463.1748323871',
    '_gcl_au': '1.1.1441584145.1748323871',
    '__gads': 'ID=c789e9fa2f5a9cf5:T=1748323871:RT=1748323871:S=ALNI_Mb-OSmmoTP1Ka0RnIRQaQ8fW4Nx0A',
    '__gpi': 'UID=000010ea78c6680c:T=1748323871:RT=1748323871:S=ALNI_MbLYUUISEGWhjEggyEPzfZWtb2f6w',
    '__eoi': 'ID=9d9ee27882524b55:T=1748323871:RT=1748323871:S=AA-AfjYaHD9YZTS5EsK-4_cznWPo',
    'connectId': '{"ttl":86400000,"lastUsed":1748323872387,"lastSynced":1748323872387}',
    '_ga_DFLC2LRX2J': 'GS2.1.s1748323870$o1$g0$t1748323883$j47$l1$h1177631856',
    'v5_TranslateLang': 'zh-Hans',
    'cto_bundle': 'kwHbrV9NaWo5VDcxOWpRbTg0b2lxWG13MkNnVzZDWWJEUUpjWjJUTjhHJTJCdGxZdWc4Um5KdHlsRkhWZ3h0ZG1xVWZIJTJGUEU4MW1aZTliQml1SDRhMnhEVGJYckJBQVIlMkJQczlNcU9uTWhLaGEyVXNxbUxFMVNKM3pVb2ViQm1FTjQ1WVhXWQ',
    '_ga_W6KG51GJEF': 'GS2.1.s1748323886$o1$g0$t1748323892$j54$l0$h0',
    '_ga_Y0R74VDYCP': 'GS2.1.s1748323871$o1$g1$t1748323892$j0$l0$h0',
    '_ga_6YXZP82DHM': 'GS2.1.s1748323870$o1$g1$t1748323892$j0$l0$h0',
    '_ga_PW7M299Q8K': 'GS2.1.s1748323871$o1$g1$t1748323892$j0$l0$h0',
}

headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'last-event-id': '302f623665366235612f363130363933343730332f3038342d2f657572742f31312f30316566623538353739312f3030383a32333a363130363933343730333a65736c61663a453746343034314645383532383839332d47202418f802f1551451e7',
    'origin': 'https://t.17track.net',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://t.17track.net/zh-cn',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    # 'cookie': 'country=CN; _yq_bid=G-3988258EF1404F7E; v5_Culture=zh-cn; _ga=GA1.1.913082463.1748323871; _gcl_au=1.1.1441584145.1748323871; __gads=ID=c789e9fa2f5a9cf5:T=1748323871:RT=1748323871:S=ALNI_Mb-OSmmoTP1Ka0RnIRQaQ8fW4Nx0A; __gpi=UID=000010ea78c6680c:T=1748323871:RT=1748323871:S=ALNI_MbLYUUISEGWhjEggyEPzfZWtb2f6w; __eoi=ID=9d9ee27882524b55:T=1748323871:RT=1748323871:S=AA-AfjYaHD9YZTS5EsK-4_cznWPo; connectId={"ttl":86400000,"lastUsed":1748323872387,"lastSynced":1748323872387}; _ga_DFLC2LRX2J=GS2.1.s1748323870$o1$g0$t1748323883$j47$l1$h1177631856; v5_TranslateLang=zh-Hans; cto_bundle=kwHbrV9NaWo5VDcxOWpRbTg0b2lxWG13MkNnVzZDWWJEUUpjWjJUTjhHJTJCdGxZdWc4Um5KdHlsRkhWZ3h0ZG1xVWZIJTJGUEU4MW1aZTliQml1SDRhMnhEVGJYckJBQVIlMkJQczlNcU9uTWhLaGEyVXNxbUxFMVNKM3pVb2ViQm1FTjQ1WVhXWQ; _ga_W6KG51GJEF=GS2.1.s1748323886$o1$g0$t1748323892$j54$l0$h0; _ga_Y0R74VDYCP=GS2.1.s1748323871$o1$g1$t1748323892$j0$l0$h0; _ga_6YXZP82DHM=GS2.1.s1748323870$o1$g1$t1748323892$j0$l0$h0; _ga_PW7M299Q8K=GS2.1.s1748323871$o1$g1$t1748323892$j0$l0$h0',
}

data = '{"data":[{"num":"YT7540571087364","fc":0,"sc":0}],"guid":"","timeZoneOffset":-480}'

response = requests.post('https://t.17track.net/track/restapi', cookies=cookies, headers=headers, data=data)
print(response.text)