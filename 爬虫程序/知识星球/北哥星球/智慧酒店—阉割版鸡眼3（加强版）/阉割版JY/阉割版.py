import os
import time
import uuid
import requests
import ast
from 轨迹生成 import *
from 距离识别 import *


import execjs
cookies = {
    'gTyPlatLang': 'zh',
    'locale': 'zh',
    'fast-sid': 'voTX_Qo3aTIEgG8w3geCveuNORscv48L',
    '_tpmGuid': 'TY-644116ce70a2fd80',
    'router-prefix': '',
    '_tpmSeqId': 'seq_id_f56445096d8378e7',
    'csrf-token': 'htGODHmn-LhfVtKYNpK5lpTgwJUAbwhoDTJ4',
    'csrf-token.sig': 'pTGQsed5iB106uGzDrMexYJINy8',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'cache-control': 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    'csrf-token': 'i2Q7rlk5-tTIJkr4IiMIU83QwwKsacSYhSQk',
    'origin': 'https://hotel.ocyuan.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://hotel.ocyuan.com/login',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="136", "Google Chrome";v="136"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'x-b3-flags': '',
    'x-b3-parentspanid': '',
    'x-b3-sampled': '',
    'x-b3-spanid': '',
    'x-b3-traceid': '',
    'x-ot-span-context': '',
    'x-request-id': '',
    'x-requested-with': 'XMLHttpRequest',
    'x-ty-referer': '/login',
    # 'cookie': 'gTyPlatLang=zh; locale=zh; fast-sid=voTX_Qo3aTIEgG8w3geCveuNORscv48L; _tpmGuid=TY-644116ce70a2fd80; router-prefix=; _tpmSeqId=seq_id_f56445096d8378e7; csrf-token=htGODHmn-LhfVtKYNpK5lpTgwJUAbwhoDTJ4; csrf-token.sig=pTGQsed5iB106uGzDrMexYJINy8',
}
def geeVerify():
    json_data = {
        'clientType': 'web_view',
        'lang': 'zh',
        'user_id': str(uuid.uuid4()),
    }

    response = requests.post('https://hotel.ocyuan.com/api/v2/geeVerify', cookies=cookies, headers=headers, json=json_data)
    challenge = response.json()['result']['challenge']
    verifyId = response.json()['result']['verifyId']
    # print(response.json())
    return verifyId,challenge
def getQuestion(verifyId,challenge):
    json_data = {
        'type': 1,
        'verifyId': verifyId,
        'challenge': challenge,
        'callback': 'verify_'+str(int(time.time() * 1000)),
    }

    response = requests.post('https://captcha.tuyacn.com/verify/v1/getQuestion', headers=headers, json=json_data)
    publicKey = response.json()['result']['publicKey']
    shuffle = response.json()['result']['shuffle']
    bgUrl = response.json()['result']['staticServer']+response.json()['result']['bgUrl']
    sliceUrl = response.json()['result']['staticServer']+response.json()['result']['sliceUrl']
    # print(response.json())
    return publicKey,shuffle,bgUrl,sliceUrl
def w_img(bgUrl,sliceUrl,shuffle):
    with open('bgUrl.webp', 'wb') as f:
        f.write(requests.get(bgUrl).content)
    img = Image.open('bgUrl.webp')

    # Verify image size
    if img.size != (260, 160):
        raise ValueError(f"Image must be 260x160 pixels, got {img.size}")

    # Convert shuffle string to list
    shuffle = ast.literal_eval(shuffle)

    # Verify shuffle
    if len(shuffle) != 52 or set(shuffle) != set(range(52)):
        raise ValueError("Shuffle must be a permutation of 0 to 51")

    # Split into 52 tiles (10x80 each)
    tiles = []
    # Top half (80x260, tiles 0-25)
    for j in range(0, 260, 10):  # 26 columns
        tile = img.crop((j, 0, j + 10, 80))  # (left, upper, right, lower)
        tiles.append(tile)
    # Bottom half (80x260, tiles 26-51)
    for j in range(0, 260, 10):  # 26 columns
        tile = img.crop((j, 80, j + 10, 160))
        tiles.append(tile)

    # Verify number of tiles
    if len(tiles) != 52:
        raise ValueError(f"Expected 52 tiles, got {len(tiles)}")

    # Create new image
    new_img = Image.new('RGB', (260, 160))

    # Paste tiles to restore original positions based on shuffle
    for tile_idx in range(52):
        orig_pos = shuffle[tile_idx]  # Original position of tile_idx
        # Determine row and column based on original position
        if orig_pos < 26:  # Top half (tiles 0-25)
            row = 0
            col = orig_pos * 10
        else:  # Bottom half (tiles 26-51)
            row = 80
            col = (orig_pos - 26) * 10
        new_img.paste(tiles[tile_idx], (col, row))  # Paste at (col, row)

    # Save new image
    new_img.save('output_path.jpg')

    # Download and save sliceUrl image
    with open('sliceUrl.png', 'wb') as f:
        f.write(requests.get(sliceUrl).content)
    matcher = SliderMatcher()
    result_local = matcher.Slider_Match(
        target_input='sliceUrl.png',
        background_input='output_path.jpg',
        is_local_path=True  # 设置为True表示输入是本地路径
    )
    print("本地路径匹配结果:", result_local)
    return result_local['target'][0]
    # return main('output_path.jpg', 'sliceUrl.png')

def login(challenge,verifyId,collectData,key,callback):
    headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'origin': 'https://hotel.ocyuan.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://hotel.ocyuan.com/',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="136", "Google Chrome";v="136"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    }
    json_data = {
        'type': 1,
        'challenge': challenge,
        'verifyId': verifyId,
        'collectData': collectData,
        'key': key,
        'callback': callback,
    }

    response = requests.post('https://captcha.tuyacn.com/verify/v1/collectData', headers=headers, json=json_data)
    # print(response.text)
    print(response.json())
if __name__ == '__main__':
    verifyId,challenge = geeVerify()
    publicKey,shuffle,bgUrl,sliceUrl = getQuestion(verifyId,challenge)
    jl = w_img(bgUrl,sliceUrl,shuffle)
    trajectory = generate_trajectory(target_distance=int(jl))
    with open('加密.js', 'r') as f:
        ext = execjs.compile(f.read())
    # print(trajectory)
    result = ext.call('get_GJ',trajectory)
    # result = buffer_builder(trajectory)
    # print(result)
    #
    encrypted_result_py= ext.call('get_collectData',result, publicKey)
    # print(encrypted_result_py)
    login(challenge,verifyId,encrypted_result_py['collectData'],encrypted_result_py['key'],encrypted_result_py['callback'])

