import json
import random
import json
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urljoin, urlencode
from get_mysqldb import DatabasePool
import pymysql
from Crypto.Cipher import DES
from Crypto.Util.Padding import unpad
import base64
import time
from loguru import logger
import execjs
from curl_cffi import requests
import urllib.parse

js_code = open("ctbpsp.js", 'r', encoding='utf-8').read()


def decryptByDES(ciphertext):
    # 密钥，需要注意 DES 密钥长度必须为 8 字节，这里截取前 8 个字符
    key = b"1qaz@wsx3e"[:8]
    # 创建 DES 解密器，使用 ECB 模式和 PKCS7 填充
    cipher = DES.new(key, DES.MODE_ECB)
    # 对 Base64 编码的密文进行解码
    ciphertext_bytes = base64.b64decode(ciphertext)
    # 进行解密操作
    decrypted_bytes = cipher.decrypt(ciphertext_bytes)
    # 去除填充
    decrypted_text = unpad(decrypted_bytes, DES.block_size)
    # 将解密后的字节转换为字符串
    return decrypted_text.decode('utf-8')


def get_proxy():
    tunnel = "g184.kdltps.com:15818"
    username = "t13632437348639"
    password = "10cc7lx7"

    proxies = {
        "http": f"http://{username}:{password}@{tunnel}",
        "https": f"http://{username}:{password}@{tunnel}"
    }
    return proxies


def retry(max_retries=8, retry_delay=5):
    def decorator(func):
        def wrapper(*args, **kwargs):
            last_exception = None
            for retry_count in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if retry_count < max_retries - 1:
                        time.sleep(retry_delay)
                        continue
            # 只有在最大次数重试后仍然失败时才打印错误日志
            if last_exception:
                logger.error(f"{func.__name__} 执行失败，{max_retries} 次重试后失败，原因: {last_exception}")
            return None
        return wrapper
    return decorator


class CtbpspSpider:
    def __init__(self):
        # self.province_list = ['安徽', '北京', '兵团', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北',
        #                       '河南',
        #                       '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海',
        #                       '山东', '山西',
        #                       '陕西', '上海', '四川', '天津', '西藏', '新疆', '云南', '浙江']
        self.province_list = ['山东', '山西',
                              '陕西', '上海', '四川', '天津', '西藏', '新疆', '云南', '浙江']
        # self.industry_list = ['能源电力', '公路', '房屋建筑', '化学工业', '石油石化', '铁路', '园林绿化', '生物医药',
        #                       '水利水电',
        #                       '水运', '港口航道', '纺织轻工', '矿产冶金', '民航', '生态环保', '地球科学', '信息电子',
        #                       '市政',
        #                       '广电通信', '科教文卫', '商业服务', '农林牧渔', '保险金融', '机械设备', '航空航天',
        #                       '其他']
        self.industry_list = ['生物医药', '市政', '其他']
        self.cookies = {
            '_c_WBKFRo': 'sf6Lm676NfWj6G9ChXraQANmj7GqBTbmVVfnwuub',
            'Hm_lvt_b966fe201514832da03dcf6cbf25b8a2': '1739964072,1741055854,1741680418',
            'HMACCOUNT': '6B4FBA1BA410947F',
            'acw_tc': 'ac11000117416842987886947e005f0a39dca01c80ba09dc0525dad43ac09d',
            'Hm_lpvt_b966fe201514832da03dcf6cbf25b8a2': '1741684381',
            'ssxmod_itna': 'QqfxBDgQiQ0=eGKGHDODUDG2bptB40KqAxqjIKeoutD/FYmDnqD=GFDK40ookYF37AiDqx46YtAqhxG8ODemHQ1442rQ60nr4GLDmKDyK0omeDxEq0rD74irDDxD3Db3QDSDWKD9D04CMnkNgDi3DbxiDmMdDILiexDLlGT6exYQDGwIXD7QKvqqD0qqb2D4itqeexGAXbQNtXkGaH7xBD0tKxBd4nPqB0Cyz2BXav6Fqkr=DzkODtkXo6wTdIdi/Qj4EA7+6A0Dot8xKbD4Q8843DxqAKAxRlzlqFVm698xoj5DAiE+teD=',
            'ssxmod_itna2': 'QqfxBDgQiQ0=eGKGHDODUDG2bptB40KqAxqjIKeoTG97xrxBkxkOD7PjkBI7GFKnBFAkQ/xx2=345DgvEkiDaenNiW+tcY0Ee0=70NkWdKF5pmP+O7Yk02IbLYpO7HmUS4jWYWzKk3n8hOnrNVlxde54mfnrr34OICK4qQ+2tq78De+x+/lOh+C+K5qbnc0xrYIMReOREEDRXixcNjnr6uWSx2UEF7Sa2I+EWfffhaZhGio6T9ijXymRH308BxbjSOEc=uA/0/nOgvW4lA769P417se8jyGU6TZx4LHP/PllKe7CAqBeWoo=h25ogzthzq2NBSKe0bQeoeLhqx4YWtdOzeEedjhshGKDiY7afuDeewY3TWQbRb5pl5hdwT4zweCWBOwioYDxF3OE2bnb1j3W37tFlkxg5Ok5YlTFwt6TIYlOsOi3TIeB5oxHaohSGe5rIDniR4kmTri0DoaIeC3BRb16Ya1aB8DjDDwE5YGxjz2SgX2myZtwirxVUGphq8nDDjKDeqq4D===',
        }
        self.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Referer': 'https://ctbpsp.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            # 'Cookie': '_c_WBKFRo=sf6Lm676NfWj6G9ChXraQANmj7GqBTbmVVfnwuub; Hm_lvt_b966fe201514832da03dcf6cbf25b8a2=1739964072,1741055854,1741680418; HMACCOUNT=6B4FBA1BA410947F; acw_tc=ac11000117416842987886947e005f0a39dca01c80ba09dc0525dad43ac09d; Hm_lpvt_b966fe201514832da03dcf6cbf25b8a2=1741684381; ssxmod_itna=QqfxBDgQiQ0=eGKGHDODUDG2bptB40KqAxqjIKeoutD/FYmDnqD=GFDK40ookYF37AiDqx46YtAqhxG8ODemHQ1442rQ60nr4GLDmKDyK0omeDxEq0rD74irDDxD3Db3QDSDWKD9D04CMnkNgDi3DbxiDmMdDILiexDLlGT6exYQDGwIXD7QKvqqD0qqb2D4itqeexGAXbQNtXkGaH7xBD0tKxBd4nPqB0Cyz2BXav6Fqkr=DzkODtkXo6wTdIdi/Qj4EA7+6A0Dot8xKbD4Q8843DxqAKAxRlzlqFVm698xoj5DAiE+teD=; ssxmod_itna2=QqfxBDgQiQ0=eGKGHDODUDG2bptB40KqAxqjIKeoTG97xrxBkxkOD7PjkBI7GFKnBFAkQ/xx2=345DgvEkiDaenNiW+tcY0Ee0=70NkWdKF5pmP+O7Yk02IbLYpO7HmUS4jWYWzKk3n8hOnrNVlxde54mfnrr34OICK4qQ+2tq78De+x+/lOh+C+K5qbnc0xrYIMReOREEDRXixcNjnr6uWSx2UEF7Sa2I+EWfffhaZhGio6T9ijXymRH308BxbjSOEc=uA/0/nOgvW4lA769P417se8jyGU6TZx4LHP/PllKe7CAqBeWoo=h25ogzthzq2NBSKe0bQeoeLhqx4YWtdOzeEedjhshGKDiY7afuDeewY3TWQbRb5pl5hdwT4zweCWBOwioYDxF3OE2bnb1j3W37tFlkxg5Ok5YlTFwt6TIYlOsOi3TIeB5oxHaohSGe5rIDniR4kmTri0DoaIeC3BRb16Ya1aB8DjDDwE5YGxjz2SgX2myZtwirxVUGphq8nDDjKDeqq4D===',
        }
        # self.mysql_db = DatabasePool(logger=logger, DB_HOST=DB_HOST, DB_PORT=DB_PORT, DB_DATABASE=DB_DATABASE,
        #                              DB_USER=DB_USER, DB_PASSWORD=DB_PASSWORD)
        self.proxies = get_proxy()

    def extract_data(self, resp):
        try:
            data_lists = resp['data']['dataList']
            for data in data_lists:
                item_data = {}
                item_data['site_name'] = "全国招标公告公示搜索引擎"
                item_data['item_name'] = data['tenderProjectName']
                item_data['bulletinID'] = data['bulletinID']
                item_data['notieIndustriestName'] = data['notieIndustriestName']
                item_data['regionCode'] = data['regionCode']
                item_data['noticeUrl'] = data['noticeUrl']
                item_data['tenderBidder'] = data['tenderBidder']
                if not item_data['item_name']:
                    item_data['item_name'] = data.get('noticeName', '').replace('<em>', '').replace('</em>', '')
                item_data['announcement_source'] = data['noticeMedia']
                item_data['announcement_type'] = data['bulletinTypeName']
                # item_data['kaibiaodate'] = data['bidOpenTime']
                item_data['province_name'] = data['reginProvince']
                # item_data['city_name'] = data['regionName']
                if data["reginProvince"] in data["regionName"]:
                    item_data["city_name"] = data["regionName"].replace(data["reginProvince"], "").strip()
                item_data['release_date'] = data['noticeSendTime']
                regionCode = data['regionCode']
                pdf_url = f"https://ctbpsp.com/cutominfoapi/bulletin/{data['bulletinID']}/uid/{regionCode}"
                # parse_pdf(pdf_url)
                # params = {
                #     'uuid': data['bulletinID'],
                #     'inpvalue': '医疗',
                #     'dataSource': data['dataSource'],
                #     'tenderAgency': data['tenderAgency'],
                # }
                # item_data['url'] = "https://ctbpsp.com/#/bulletinDetail?" + urlencode(params)
                item_data['url'] = pdf_url
                print(item_data)
                # self.mysql_db.insert(table="ctbpsp", data_dict=item_data, return_ids=True)
        except Exception as e:
            logger.error(f"Error occurred: {e}")


    @retry(max_retries=10, retry_delay=1)
    def send_request(self, nonce_type, page=1, province=None, industry=None):
        params = {
            # 'province': province,
            # 'industry': industry,
            # 'type__1017': 'n4+hDKAKD5YvPQqGKG=D/tF4BKohUYxcDx1DEoD',
        }
        encoded_province = urllib.parse.quote(province)
        encoded_industry = urllib.parse.quote(industry)
        url = f'https://ctbpsp.com/cutominfoapi/recommand/type/{nonce_type}/pagesize/10/currentpage/{page}?province={encoded_province}&industry={encoded_industry}'
        type = execjs.compile(js_code).call("get_url", url)
        params['type__1017'] = type
        response = requests.get(
            url,
            params=params,
            cookies=self.cookies,
            headers=self.headers,
            verify=False,
            impersonate="Chrome101",
            proxies=self.proxies,
        )
        content_type = response.headers.get("Content-Type", "")

        if "text/html" in content_type.lower():
            raise Exception("是 HTML 格式")
        else:
            response = json.loads(decryptByDES(response.text))
            return response

    @retry(max_retries=10, retry_delay=5)
    def parse_page(self, nonce_type, page, province, industry):
        print(f"正在请求第{page}页")
        response_page = self.send_request(nonce_type, page=page, province=province, industry=industry)
        if response_page['success'] == True:
            self.extract_data(response_page)
        else:
            # logger.error(f"{page}失败了")
            raise Exception("请求失败")

    @retry(max_retries=10, retry_delay=5)
    def parse_data(self, nonce_type, province, industry):
        response = self.send_request(nonce_type, province=province, industry=industry)
        totalPage = response['data']['totalPage']
        print(f"{province}--{industry}--{nonce_type}总共有{totalPage}页")
        if totalPage >= 1000:
            totalPage = 1000
        if totalPage > 0:
            with ThreadPoolExecutor(max_workers=6) as executor:
                for page in range(1, totalPage + 1):
                    executor.submit(self.parse_page, nonce_type, page, province, industry)
                executor.shutdown()

    def start_spider(self):
        for province in self.province_list:
            for industry in self.industry_list:
                for nonce_type in range(0, 5):
                    self.parse_data(nonce_type, province, industry)




if __name__ == '__main__':
    ctbpsp = CtbpspSpider()
    ctbpsp.start_spider()
