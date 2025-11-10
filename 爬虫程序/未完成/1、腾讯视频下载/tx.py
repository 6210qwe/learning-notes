import re

import requests
from tqdm import tqdm

url = "https://apd-vlive.apdcdn.tc.qq.com/defaultts.tc.qq.com/B_JxNyiJmktHRgresXhfyMekYye-F_qOYTdnufCcW7LFYUu9V7JQJ30o6nT3dyZXdH/svp_50112/5iswkZUwApYlvX1C8MYLiSii09RCexWhyuc9LW5WjTjVKAUJuNzWYBnLRyd61-4-njWA-ObeF7q2S-NVJyMubGHtNb-qCcmi6JaIJYt73QYEr9amKYkuV8epbNCsVbbYtAkfWBavqmD1mfmo6gWi9U7JScIsLdQMoqEn55_95A_qojQFveJK3kpW6uQjElgvpSOQd5Kx8XIZddPOWL72ZXNX0T1SWJb5cUXK4pI2jjo4N3p_enFNBA/gzc_1000102_0b53qiaaqaaaiyaeuaftsjtmbawdbccaadca.f321002.ts.m3u8"
# 有的视频m3u8链接会加密，视频的ts数据会加密
sub_ts = url.split('gzc')[0]
response = requests.get(url)
m3u8_text = response.text
m3u8_text = re.sub('#E.*', '', m3u8_text)
ts_list = m3u8_text.split()
for ts in tqdm(ts_list):
    # print(sub_ts + ts)
    ts_url = sub_ts + ts
    ts_data = requests.get(ts_url).content
    with open('仙逆1.mp4', 'ab') as f:
        f.write(ts_data)


