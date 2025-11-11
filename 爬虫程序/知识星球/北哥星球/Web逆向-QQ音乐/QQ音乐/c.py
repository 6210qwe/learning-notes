import requests,time,base64,subprocess,execjs

def call_node_async_function(data=None):
    try:
        # 将数据转换为 JSON 字符串
        # data_json = json.dumps(data)
        # 调用 Node.js 脚本
        result = subprocess.run(
            ['node', 'qq_music_encrypt.js'],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")
        return None

headers = {
    "authority": "u6.y.qq.com",
    "accept": "application/octet-stream",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "text/plain",
    "origin": "https://y.qq.com",
    "pragma": "no-cache",
    "referer": "https://y.qq.com/",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36"
}
url = "https://u6.y.qq.com/cgi-bin/musics.fcg"

datas = call_node_async_function()
params = {
    "_": f"{int(time.time() * 1000)}",
    "encoding": "ag-1",
    "sign": datas.split(':::')[0]
}
data = datas.split(':::')[1]
response = requests.post(url, headers=headers, params=params, data=data)

# 将arrBuffer 数据转换
byte_data = response.content
base64_data = base64.b64encode(byte_data).decode('utf-8')

# 解密数据
res_data = execjs.compile(open('qq_music_decrypt.js', 'r', encoding='utf-8').read()).call('get_base64ToArrayBuffer_decode', base64_data)
print(res_data)