import re
import threading
import requests
import os
import subprocess
from Crypto.Cipher import AES


class XiaoErTong:
    def __init__(self):
        self.m3u8_url = ''
        self.headers = {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'cache-control': 'no-cache',
            'origin': 'https://study.wenduedu.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://study.wenduedu.com/',
            'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
        }
        # self.cookies = {
        #     'zsxq_access_token': '01D04CFB-34D6-5C1E-61F4-E094146ED71A_69DD2F9D84B70FE6',
        #     'abtest_env': 'product',
        #     'sensorsdata2015jssdkcross': '%7B%22distinct_id%22%3A%22190bbf8deb57fa-0292db8c89604a2-4c657b58-1474560-190bbf8deb6b4%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTkwYmJmOGRlYjU3ZmEtMDI5MmRiOGM4OTYwNGEyLTRjNjU3YjU4LTE0NzQ1NjAtMTkwYmJmOGRlYjZiNCJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%2C%22%24device_id%22%3A%22190bbf8deb57fa-0292db8c89604a2-4c657b58-1474560-190bbf8deb6b4%22%7D',
        # }

    @staticmethod
    def create_directory():
        # 获取桌面路径
        desktop_path = os.path.join(os.path.expanduser('~'), 'Desktop')
        cache_path = os.path.join(desktop_path, 'cache')
        download_path = os.path.join(desktop_path, 'download')

        # 创建目录
        os.makedirs(cache_path, exist_ok=True)
        os.makedirs(download_path, exist_ok=True)

        return cache_path, download_path

    # 解析每一个ts切片地址
    def parse_ts_info(self, m3u8_url):
        response = requests.get(url=m3u8_url, headers=self.headers)
        page_text = response.text.strip()
        # 解析出解密密钥key的地址  re.S匹配回车的，否则正则匹配遇到回车就停止了
        key_url = re.findall('URI="(.*?)"', page_text, re.S)[0]
        # print(key_url)
        # 注意：key和iv需要为bytes类型
        key = requests.get(key_url, headers=self.headers).content
        iv = b"0000000000000000"
        # print(key)

        ts_url_list = []
        for line in page_text.split('\n'):
            if not line.startswith('#'):
                # ts_url = 'https://c-vod.hw-cdn.xiaoeknow.com/522ff1e0vodcq1252524126/888fba961397757886274047453/' + line
                # ts_url = m3u8_url[:m3u8_url.rfind('/')] + '/' + line
                ts_url = 'https://videos.zsxq.com/' + line
                ts_url_list.append(ts_url)
        return ts_url_list, key, iv

    def download_cache_ts(self, ts_url_list, key, iv, cache_path):
        # 请求到每一个ts切片数据
        for url in ts_url_list:
            ts_data = requests.get(url, headers=self.headers).content
            # 对数据进行解密
            aes = AES.new(key=key, mode=AES.MODE_CBC, iv=iv)
            # 获取解密后的数据
            desc_data = aes.decrypt(ts_data)

            # ts_name = url.split('_')[-1].split('?')[0]
            ts_name = url.split('-')[-1]
            with open(cache_path + '\\' + 'merge.txt', mode='a', encoding='utf-8') as f:
                f.write('file' + ' ' + "'" + ts_name + "'")
                f.write('\n')
            ts_path = cache_path + '/' + ts_name
            with open(ts_path, 'wb') as f:
                f.write(desc_data)
                print(ts_name, '下载保存成功')

    @staticmethod
    def merge_video(cache_path, download_path, name):
        # -y参数表示直接覆盖   >nul 表示将标准输出重定向到空设备，2>&1 表示将标准错误也重定向到与标准输出相同的位置（即空设备）既不在控制台显示
        # cmd = f'ffmpeg -y -f concat -safe 0 -i {cache_path}\\merge.txt -c copy {download_path}\\{name}.mp4 >nul 2>&1'
        cmd = f'ffmpeg -y -f concat -safe 0 -i {cache_path}\\merge.txt -c copy {download_path}\\{name}.mp4'
        return_code = subprocess.call(cmd, shell=True)
        return return_code

    @staticmethod
    def delete_files_in_directory(directory):
        print(directory)
        # 遍历指定目录下的所有文件
        for filename in os.listdir(directory):
            filepath = os.path.join(directory, filename)
            try:
                # 删除文件
                os.unlink(filepath)
            except Exception as e:
                print(f"无法删除文件 {filepath}: {e}")

    def main(self):
        m3u8_url = input('请输入M3U8地址: ')
        name = input('请输入视频名称: ').replace(" ", "")
        cache_path, download_path = self.create_directory()
        ts_url_list, key, iv = self.parse_ts_info(m3u8_url)

        # 创建单线程
        thread_list = [threading.Thread(target=self.download_cache_ts, args=(ts_url_list, key, iv, cache_path))]
        for thread in thread_list:
            thread.start()

        for thread in thread_list:
            thread.join()  # 等待所有线程结束

        # 创建线程池
        # 们使用ThreadPoolExecutor创建了一个最大容量为10的线程池。然后，我们使用executor.submit()
        # 方法将下载任务提交给线程池，并返回一个Future对象列表。我们可以使用as_completed()
        # 函数迭代Future对象，以便等待任务完成并处理它们的结果。这样，我们就可以在10个线程的线程池中并行下载视频片段了
        # with ThreadPoolExecutor(max_workers=10) as executor:
        #     # 提交下载任务给线程池
        #     future_to_url = {executor.submit(self.download_cache_ts, [ts_url], cache_path): ts_url for ts_url in
        #                      ts_url_list}
        #     # 等待所有任务完成
        #     for future in concurrent.futures.as_completed(future_to_url):
        #         url = future_to_url[future]
        #         try:
        #             data = future.result()
        #         except Exception as exc:
        #             print('%r generated an exception: %s' % (url, exc))
        #         else:
        #             print('下载成功：%r' % url)

        # self.download_cache_ts(ts_url_list, cache_path)
        code = self.merge_video(cache_path, download_path, name)
        if code == 0:
            print("视频合并成功！")
            self.delete_files_in_directory(cache_path)
            print("已清楚缓存！")
        else:
            print("视频合并失败！")


if __name__ == '__main__':
    xiao_er_tong = XiaoErTong()
    xiao_er_tong.main()
