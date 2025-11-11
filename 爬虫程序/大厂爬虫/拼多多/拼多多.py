from curl_cffi import requests
import execjs
import  os
import csv
from pathlib import Path

os_path = Path.cwd()
filename = '拼多多.csv'
import os
import csv


def write_dict_to_csv(filename, data_dict):
    """
    将单行字典数据写入CSV文件，自动判断是否写入表头，并检查重复数据

    参数:
        filename: CSV文件名（如 'movies.csv'）
        data_dict: 单行字典数据（如 {'电影名称': '分手清单', ...}）
    """
    file_exists = os.path.isfile(filename)
    fieldnames = list(data_dict.keys())

    # 如果文件已存在，检查是否有重复数据
    if file_exists:
        with open(filename, 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            # 将每行数据转换为元组（因为字典不可哈希）
            existing_data = [tuple(row.values()) for row in reader]

            # 将要写入的数据转换为元组形式进行比较
            new_data = tuple(data_dict.values())
            if new_data in existing_data:
                print(f"数据已存在，跳过写入: {data_dict}")
                return False

    # 写入数据（包括文件不存在或数据不重复的情况）
    with open(filename, 'a' if file_exists else 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        if not file_exists:
            writer.writeheader()

        writer.writerow(data_dict)
        return True
headers = {
    "Accept": "application/json, text/javascript",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://www.pinduoduo.com",
    "Pragma": "no-cache",
    "Referer": "https://www.pinduoduo.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Microsoft Edge\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://apiv2.pinduoduo.com/api/gindex/tf/query_tf_goods_info"
params = {
    "tf_id": "TFRQ0v00000Y_14351",
    "page": "1",
    "size": "39",
    # "anti_content": "0aqAfx5e-wCEgqjdXNKt_UKccG7GqNojqoPYgO1YTmZoApN7Q8XMnxdMuYdFXYUx2xiVUj3pfUllrCWOJFPBxUe-31EBfcEB2ZD-Fhk-ROk-1Ok-x-E-s-k25TbwsTYs2xtHXqOGB_OIQ7nHNHXqdSdnidYdn9P2xIW7jLOb2AZEBZCe84c92TaXrszI09YyvwaG45P_TjQpWGlGngJnpD7XYepyQ084Q6jyv6Pqmxlv72QpmrljjwaYZC4lmoT8gGQ99TvCVQpgKOqEv1mdiPwmCykgTz3FwBstegw2VBvgkEwswBzNzzh-DbzfT6sfOz33wB-VCklGOLAGVyaFEdw1IgzgkEVswgVNErR5Hbh-WUssSUBaALlrHFvwEShLwlP0D4v5nOEeJ5idWjRCTg9M2FY4ZX6rdXM"
}

with open ('text.js','r',encoding='utf-8')as f:
    js_code=f.read()
js_complie=execjs.compile(js_code)
params['anti_content']=js_complie.call('ace')
print(params)
response = requests.get(url, headers=headers, params=params).json()
print(response.text)
resultlist=response['result']
# print(resultlist)
for result in resultlist:
    dit = {
        '商品': result['goods_name'],
        "原价": str(int(result["market_price"]) / 100),
        '折扣价': str(int(result['group_price']) / 100),
        '销售额': result["sales_tip"]
    }
    write_dict_to_csv(filename, dit)
print(f"数据已保存到: {filename}")
