import json
import time
from curl_cffi import requests
from get_mysqldb import DatabasePool
from loguru import logger
from lxml import etree


def get_proxy():
    tunnel = "g184.kdltps.com:15818"
    username = "t13632437348639"
    password = "10cc7lx7"

    proxies = {
        "http": f"http://{username}:{password}@{tunnel}",
        "https": f"http://{username}:{password}@{tunnel}"
    }
    return proxies


def retry(max_retries=2, retry_delay=2):
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
            if last_exception:
                logger.error(f"{func.__name__} 执行失败，{max_retries} 次重试后失败，原因: {last_exception}")
            return None

        return wrapper

    return decorator


class TianYanCha:
    def __init__(self):
        self.cookies = {
            'HWWAFSESTIME': '1754359412170',
            'HWWAFSESID': '8445e1455822a42dae7',
            'csrfToken': 'SMnLgF6BKttadb9FBW1ioAer',
            'CUID': 'b3f3782b09ac286290d1ba9e7eb78a18',
            'TYCID': '661bcf5071a011f0a9eaeb909d93086e',
            'sajssdk_2015_cross_new_user': '1',
            'bannerFlag': 'true',
            'Hm_lvt_e92c8d65d92d534b0fc290df538b4758': '1754359419',
            'HMACCOUNT': 'E90DE758C36CCC84',
            'sensorsdata2015jssdkcross': '%7B%22distinct_id%22%3A%22342946595%22%2C%22first_id%22%3A%2219877f84ebe4fb-0edf7b66546b998-4c657b58-1327104-19877f84ebf2694%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk4NzdmODRlYmU0ZmItMGVkZjdiNjY1NDZiOTk4LTRjNjU3YjU4LTEzMjcxMDQtMTk4NzdmODRlYmYyNjk0IiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiMzQyOTQ2NTk1In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22342946595%22%7D%2C%22%24device_id%22%3A%2219877f84ebe4fb-0edf7b66546b998-4c657b58-1327104-19877f84ebf2694%22%7D',
            'tyc-user-info': '%7B%22state%22%3A%220%22%2C%22vipManager%22%3A%220%22%2C%22mobile%22%3A%2213087479683%22%2C%22userId%22%3A%22342946595%22%7D',
            'tyc-user-info-save-time': '1754359758660',
            'auth_token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzA4NzQ3OTY4MyIsImlhdCI6MTc1NDM1OTc1OSwiZXhwIjoxNzU2OTUxNzU5fQ.n99KxH6X8foXEfddQ2zjMXCrMvmEGdgwC0m8zE9OXY4mxEV3954tFseByMKuVyN4AW0rO03V6VmvatM5Qe9MaQ',
            'Hm_lpvt_e92c8d65d92d534b0fc290df538b4758': '1754359760',
        }

        self.headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Referer': 'https://www.tianyancha.com/nsearch?key=%E5%AE%81%E6%B3%A2%E7%81%8F%E6%88%90%E8%B4%B8%E6%98%93%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0',
            'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            # 'Cookie': 'HWWAFSESTIME=1752821530303; HWWAFSESID=0d5a51d89983d8fa389; csrfToken=lMQYQFIeTY3QRu7pAciVa2BV; CUID=05ab6f51af012de40b1654c5c32f304a; TYCID=bd190d0063a311f080bee75b815e54d6; Hm_lvt_e92c8d65d92d534b0fc290df538b4758=1751251689,1751437514,1752054857,1752821537; HMACCOUNT=C8A0A9745B754CEA; bannerFlag=true; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22343269960%22%2C%22first_id%22%3A%221981c4e17a8696-07e2b67741870f-4c657b58-1327104-1981c4e17a9202f%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk4MWM0ZTE3YTg2OTYtMDdlMmI2Nzc0MTg3MGYtNGM2NTdiNTgtMTMyNzEwNC0xOTgxYzRlMTdhOTIwMmYiLCIkaWRlbnRpdHlfbG9naW5faWQiOiIzNDMyNjk5NjAifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22343269960%22%7D%2C%22%24device_id%22%3A%221981c4e17a8696-07e2b67741870f-4c657b58-1327104-1981c4e17a9202f%22%7D; tyc-user-info=%7B%22state%22%3A%220%22%2C%22vipManager%22%3A%220%22%2C%22mobile%22%3A%2217154762970%22%2C%22userId%22%3A%22343269960%22%7D; tyc-user-info-save-time=1752821824775; auth_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNzE1NDc2Mjk3MCIsImlhdCI6MTc1MjgyMTgyNCwiZXhwIjoxNzU1NDEzODI0fQ.x6j0f_sIh8lAp044SWsZoRIP7V0N5iNeBxi6w3MlI3cdlvTlPRFXPB49QCICcJnBb4UHlIc1DyWG30VQlJD_RQ; ssuid=372193464; _ga=GA1.2.977703396.1752821933; _gid=GA1.2.1474853616.1753065105; cid=32176855; ss_cidf=1; _gat_gtag_UA_123487620_1=1; searchSessionId=1753088108.16649540; Hm_lpvt_e92c8d65d92d534b0fc290df538b4758=1753088110',
        }

        self.params = {
            'key': '宁波灏',
        }

        self.DB_HOST = "rm-2ze9f04i505y525i19o.mysql.rds.aliyuncs.com"
        self.DB_PORT = 3306
        self.DB_DATABASE = "zhaobiao"
        self.DB_USER = "zhangyanzhen"
        self.DB_PASSWORD = "yutu#2025"
        self.mysql_db = DatabasePool(
            logger=logger,
            DB_HOST=self.DB_HOST,
            DB_PORT=self.DB_PORT,
            DB_DATABASE=self.DB_DATABASE,
            DB_USER=self.DB_USER,
            DB_PASSWORD=self.DB_PASSWORD
        )

    def get_company_list(self):
        response = requests.get('https://www.tianyancha.com/nsearch', params=self.params, cookies=self.cookies,
                                headers=self.headers)
        print(response.text)
        html = etree.HTML(response.text)
        self.parse_data(html)

    def parse_data(self, html):
        # 定位到__NEXT_DATA__脚本标签
        next_data_script = html.xpath('//script[@id="__NEXT_DATA__"]/text()')
        if next_data_script:
            next_data = json.loads(next_data_script[0])
            company_list = next_data['props']['pageProps']['listRes']['data']['companyList']
            for company in company_list:
                item_data = {}
                # 跳过没有id的公司数据
                if not company.get('id'):
                    continue

                # 公司唯一标识ID
                item_data['id'] = company.get('id')  # 表中主键为id

                # 公司名称（去除em标签）
                company_name = company.get('name') or ''
                item_data['company_name'] = company_name.replace('</em>', '').replace('<em>', '')  # 对应表中company_name

                # 法定代表人姓名
                item_data['legal_representative'] = company.get('legalPersonName')
                item_data['legalPersonType'] = company.get('legalPersonType')  # 补充法定代表人类型

                # 成立/经营时间相关
                item_data['establishment_date'] = company.get('establishmentTime')  # 经营活动起始日期
                item_data['establishDate'] = company.get('estiblishTime')  # 企业成立日期
                item_data['operationEnddate'] = company.get('businessTerm')  # 经营活动终止日期
                item_data['issueDate'] = company.get('approveDate')  # 发证日期

                # 注册资本（表中两个相关字段）
                item_data['registered_capital'] = company.get('secondPositionValue')  # 实缴资本
                item_data['capital'] = company.get('regCapital')  # 注册资本

                # 地址相关
                reg_location = company.get('regLocation') or ''
                item_data['companyAddress'] = reg_location.replace('</em>', '').replace('<em>', '')  # 注册地址
                item_data['address'] = company.get('base')  # 通讯地址
                item_data['province'] = company.get('provinceName')  # 所属省份
                item_data['city'] = company.get('cityName')  # 所属城市
                item_data['district'] = company.get('districtName')  # 所属区县
                item_data['cityCode'] = company.get('cityCode')  # 城市行政区划代码
                item_data['districtCode'] = company.get('districtCode')  # 区县行政区划代码

                # 资质编码相关
                item_data['creditNo'] = company.get('creditCode')  # 统一社会信用代码
                item_data['orgCode'] = company.get('orgNumber')  # 组织机构代码
                item_data['reg_number'] = company.get('regNumber')  # 注册号
                item_data['companyCode'] = company.get('companyCode')  # 企业代码

                # 企业类型与状态
                item_data['companyType'] = company.get('orgType')  # 企业类型
                item_data['companyStatus'] = company.get('regStatus')  # 经营状态

                # 经营范围
                item_data['businessScope'] = company.get('businessScope')  # 经营范围

                # 联系信息
                item_data['phoneNumbers'] = json.dumps(company.get('phoneList', []), ensure_ascii=False)  # 电话号码列表
                item_data['emails'] = json.dumps(company.get('emailList', []), ensure_ascii=False)  # 邮箱列表
                item_data['website'] = company.get('websites')  # 官方网站

                # 行业分类
                item_data['industry'] = company.get('categoryNameLv1')  # 所属行业
                item_data['industry_classification'] = company.get('categoryNameLv2')  # 国标行业门类
                item_data['industry_large_class'] = company.get('categoryNameLv3')  # 国标行业大类
                item_data['industry_medium_class'] = company.get('categoryNameLv4')  # 国标行业中类
                item_data['category_code'] = company.get('categoryCode')  # 行业分类代码

                # 其他信息
                item_data['authority'] = company.get('registerInstitute')  # 登记机关
                item_data['alias'] = company.get('alias')  # 公司别称
                item_data['gid_for_b'] = company.get('gidForB')  # 公司B端唯一标识
                item_data['introduction'] = company.get('abstractsBaseInfo')  # 简介
                item_data['lastUpdatedTime'] = company.get('lastUpdatedTime')  # 最新更新时间

                # 公司标签列表（V3版本）
                label_list = company.get('labelListV3', [])
                item_data['label_list_v3'] = json.dumps([
                    label.get('profileTagNameOnPage', '')
                    for label in label_list
                    if isinstance(label, dict)
                ], ensure_ascii=False)

                # 原始全量数据
                item_data['all_data'] = json.dumps(company, ensure_ascii=False)  # 存储原始全量数据

                # 插入数据库
                self.mysql_db.insert("company_info_copy1", data_dict=item_data, return_ids=True)

    def run(self):
        # 获取没有详情页的公司列表
        self.get_company_list()


if __name__ == '__main__':
    tianyancha = TianYanCha()
    tianyancha.run()

# 1、需要多个账号, 存储到mysql数据库中
# 2、需要drissonpage做自动登录
# 3、统一存到company_info表中, 统一字段
# 4、每个公司的详情页数据保存前两页
# 5、优先采集境内企业的数据
# 6、需要定时任务
