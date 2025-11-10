import requests
import re
import os
from tqdm import tqdm  # 显示进度条
import json


# 下载视频
def download_video(video_url, request_body, ts_url, video_path):
    if os.path.exists(video_path):
        raise ValueError(f"文件 {video_path} 已存在！")
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
    }
    response = requests.post(url=video_url, json=request_body, headers=headers)
    html_data = response.json()['vinfo']
    m3u8_url = re.findall('url(.*?),', html_data)[5].split('"')[2]  # 查找https
    m3u8_data = requests.get(url=m3u8_url).text

    # 删除以#号开头的行
    lines = m3u8_data.split('\n')
    cleaned_lines = [line for line in lines if not line.startswith('#')]
    m3u8_data = '\n'.join(cleaned_lines).split()

    # 开始下载视频
    print(f"begin download {video_path}...")
    for ts_name in tqdm(m3u8_data):
        download_url = ts_url + ts_name
        ts_content = requests.get(url=download_url).content
        with open(video_path, mode='ab') as f:
            f.write(ts_content)
    print(f"download {video_path} success")


if __name__ == '__main__':
    try:
        ts_url = input("输入ts文件下载地址：")
        request_body = json.loads(input("输入请求体："))
        video_number = json.loads(input("剧集："))
        video_url = "https://vd6.l.qq.com/proxyhttp"  # 下载视频的代理地址
        output_dir = r"E:\学习\视频剪辑\仙逆\原视频"
        video_name = f"仙逆第{video_number}集.mp4"
        video_path = os.path.join(output_dir, video_name)  # 下载视频保存路径
        download_video(video_url, request_body, ts_url, video_path)
    except Exception as e:
        print('ERROR:%s' % e)
