import asyncio
import datetime
import re
import json
from urllib.parse import urljoin, urlparse, urlunparse
from crawl4ai import AsyncWebCrawler
from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig
from loguru import logger
from openai import OpenAI

from pydantic import BaseModel, field_validator
from typing import List, Optional, Any
import concurrent.futures
import json
import os
import re
from typing import List, Dict, Optional, Any
from pydantic.v1 import BaseModel, Field, root_validator, validator
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
# 假设这是同步数据库连接类
from get_mysqldb import DatabasePool
from loguru import logger


# 定义联系方式模型
class ContactInfo(BaseModel):
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    address: Optional[str] = None


# 定义产品案例模型
# class ProductCase(BaseModel):
#     产品所属分类: str  # 产品所属类别（如"医用手术机器人"、"AI软件"）
#     产品名称: str
#     产品是否有对应的案例: str
#     案例名称: str
#     详情地址: Optional[str] = None

class ProductCase(BaseModel):
    product_category: str  # 产品所属类别（如"医用手术机器人"、"AI软件"）
    product_name: str  # 具体产品名称（如"腹腔内窥镜手术设备"）
    has_case: str  # 产品是否有对应的案例（值为"是"或"否"）
    case_name: str  # 案例具体名称（若has_case为"是"则必填，否则为null）
    detail_url: Optional[str] = None  # 案例详情页URL（无则为null）


# 定义公司信息主模型
class CompanyInfo(BaseModel):
    company_name: Optional[str] = None
    company_intro: Optional[str] = None
    service_fields: List[str] = []
    contact_info: Optional[ContactInfo] = None
    product_cases: List[ProductCase] = []


class LLMParser:
    def __init__(self):
        self.model = ChatOpenAI(
            model='qwen-turbo',
            openai_api_key="sk-3caf28ae9b084173b8f48dce107645d7",
            openai_api_base="https://dashscope.aliyuncs.com/compatible-mode/v1",
        )
        self.parser = JsonOutputParser(pydantic_object=CompanyInfo)
        self.prompt = PromptTemplate(
            template=
            """你是CRO（合同研究组织）业务信息提取专家，需要从我给你的信息中提取指定的信息，生成更新后的结构化信息档案。请严格遵循以下规则，确保功能完整且输出一致：

            ### 一、核心任务
            1. **页面有效性判断**：
               - 先判断当前页面是否为有效页面（含公司介绍、公司CRO相关的服务领域、公司相关的产品案例、公司的联系方式中至少1项）。
               - 若页面内容与上述CRO业务无关（如公司其他非CRO板块业务、纯新闻动态、无关产品），即使有公司介绍等信息，也视为“无效页面”，输出空结构（所有字段为null或空列表）。
               - 仅当页面包含至少1项CRO相关信息时，才视为“有效页面”，进行提取。
               - 若为无效页面（纯招聘、政策法规、行业动态等），则忽略当前页面内容。

            ### 二、信息整合规则
            1. **零幻觉约束**：
               - 所有信息必须来自「当前页面内容」，禁止编造任何不存在的内容（如无产品案例，产品案例字段必为[]）。
               - 字段缺失时不补充默认值（如未提邮箱，邮箱字段为null，而非"无"）。

            ### 三、关键字段处理细则（对应英文变量注释）
            1. **联系方式（contact_info）**：
               - 电话（phone）、邮箱（email）、官网（website）、地址（address），确保不遗漏信息, 而且一个公司只需要提。
            2. **产品案例（product_cases）**：
               - 需严格对应以下字段提取，缺失项为null：
                 - product_category：产品所属类别（如"医用手术机器人"、"AI软件"等大分类）, 如果页面中没有则为null
                 - product_name：具体产品名称（如"腹腔内窥镜手术设备"）
                 - has_case：产品是否有对应的**具体案例**（值为"是"或"否"）。判断标准：页面明确提到该产品的“具体应用案例”（如“为XX医院实施的XX项目”“用于XX疾病治疗的案例”等，需包含具体场景/客户/项目名），否则为"否"。
                 - case_name：案例具体名称（仅当页面明确提到案例的**具体名称**（如“XX医院腹腔手术项目”“2023年XX疾病治疗案例”）时填写，否则为null。若has_case为"否"，必须为null）。
                 - detail_url：案例详情页URL（若页面明确提供了该案例的详情链接，否则为null）
               - 特别说明：仅产品本身的信息（如“已取得注册证”“国内首创”“技术参数”等）不视为“案例”，此类情况has_case必须为"否"，case_name为null。
             ### 四、输出格式（严格JSON，无多余文本）
                {{  # 转义为双大括号
                  "company_name": "公司全称（从文本提取，无则为null）",
                  "company_intro": "整合后的公司介绍...",
                  "service_fields": ["服务1", "服务2"...],
                  "contact_info": {{  # 转义为双大括号（原单大括号改为双大括号）
                    "phone": "电话号码（无则为null）",
                    "email": "邮箱（无则为null）",
                    "website": "官网地址（无则为null）",
                    "address": "办公地址（无则为null）"
                  }},
                  "product_cases": [
                    {{
                      "product_category": "产品所属分类...",
                      "product_name": "具体产品名称...",
                      "has_case": "是或否",
                      "case_name": "案例名称",
                      "detail_url": "案例详情页URL"
                    }}
                  ]
                }}
                请基于上述规则...
                {input_text}
                {format_instructions}
                        """,
            input_variables=["input_text"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()}
        )
        self.chain = self.prompt | self.model | self.parser

    def process_text(self, input_text) -> Optional[CompanyInfo]:
        """同步处理文本并返回解析结果"""
        try:
            response = self.chain.invoke({"input_text": input_text})
            return response
        except Exception as e:
            logger.error(f"LLM处理失败: {str(e)}")
            return None


DB_HOST = "rm-2ze9f04i505y525i19o.mysql.rds.aliyuncs.com"
DB_PORT = 3306
DB_DATABASE = "yixiecha"
DB_USER = "zhangyanzhen"
DB_PASSWORD = "yutu#2025"
mysql_db = DatabasePool(
    logger=logger,
    DB_HOST=DB_HOST,
    DB_PORT=DB_PORT,
    DB_DATABASE=DB_DATABASE,
    DB_USER=DB_USER,
    DB_PASSWORD=DB_PASSWORD
)


class WebsiteCrawler:
    def __init__(self, result):
        self.result = result
        self.base_url = result['website']
        self.parsed_base = urlparse(result['website'])
        self.visited_urls = set()  # 已访问的URL，用于去重
        self.browser_config = BrowserConfig()
        self.intermediate_result = None
        self.llm_parser = LLMParser()

    async def extract_links(self, result: str, current_url: str) -> set:
        """从页面内容中提取并处理链接（不依赖.html后缀）"""
        links = set()
        link_patterns = [
            r'<a\s+href=["\'](.*?)["\']',  # 匹配HTML<a>标签的href
            r'\[.*?\]\((.*?)\)'  # 匹配Markdown链接
        ]
        for pattern in link_patterns:
            for match in re.findall(pattern, result, re.IGNORECASE):
                # 过滤空链接和锚点链接（#开头）
                if not match or match.startswith('#'):
                    continue

                # 补全相对路径为完整URL
                full_url = urljoin(current_url, match)
                parsed_url = urlparse(full_url)

                # 过滤非目标域名的链接
                if parsed_url.netloc != self.parsed_base.netloc:
                    continue

                # 过滤静态资源链接（图片、CSS、JS等）
                static_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.css', '.js', '.pdf', '.zip', '.doc', '.docx'}
                if any(parsed_url.path.endswith(ext) for ext in static_extensions):
                    continue

                # 规范化URL（去除锚点部分#...，避免重复）
                normalized_url = urlunparse(parsed_url._replace(fragment=''))
                links.add(normalized_url)
        return links

    async def save_data(self, data, current_url):
        item_data = {}
        # 使用get方法取值，不存在时默认返回None
        item_data['company_name'] = self.result.get('ent_name')
        item_data['website'] = self.result.get('website')
        item_data['area'] = self.result.get('area')
        item_data['regist_time'] = self.result.get('regist_time')
        item_data['province'] = self.result.get('province')
        item_data['det_range'] = self.result.get('det_range')
        item_data['city'] = self.result.get('city')
        item_data['reg_addr'] = self.result.get('reg_addr')
        item_data['legal_name'] = self.result.get('legal_name')
        item_data['tags'] = self.result.get('tags')
        item_data['insured_num'] = self.result.get('insured_num')
        item_data['contact_person'] = self.result.get('contact_person')
        item_data['reg_capital'] = self.result.get('reg_capital')
        item_data['telephone'] = self.result.get('telephone')
        item_data['cro_type'] = self.result.get('cro_type')
        item_data['credit_code'] = self.result.get('credit_code')
        item_data['brief_intro'] = self.result.get('brief_intro')
        item_data['email'] = self.result.get('email')
        item_data['status'] = self.result.get('status')

        # 从data字典中取值
        item_data['company_intro'] = data.get('company_intro')
        # 对嵌套结构同样使用get，避免data['service_fields']不存在时出错
        item_data['service_fields'] = json.dumps(
            data.get('service_fields', []),  # 默认为空列表，避免json.dumps报错
            ensure_ascii=False
        )

        # 处理contact_info嵌套字典，先获取外层再获取内层
        contact_info = data.get('contact_info', {})  # 默认为空字典
        item_data['company_phone'] = contact_info.get('phone')
        item_data['company_address'] = contact_info.get('address')
        item_data['company_email'] = contact_info.get('email')

        item_data['data_source_page'] = current_url

        # 处理product_cases列表
        product_cases = data.get('product_cases', [])  # 默认为空列表
        if product_cases:
            for case in product_cases:
                # 对case字典使用get方法
                item_data['product_category'] = case.get('product_category')
                item_data['product_name'] = case.get('product_name')
                item_data['has_case'] = case.get('has_case')
                item_data['case_name'] = case.get('case_name')
                item_data['detail_url'] = case.get('detail_url')
        else:
            mysql_db.insert(table='medical_device_products', data_dict=item_data)

    async def crawl_page(self, crawler, url):
        """爬取单个页面并返回结果"""
        try:
            result = await crawler.arun(url=url)
            return result.markdown
        except Exception as e:
            logger.error(f"爬取 {url} 失败: {str(e)}")
            return None

    async def clean_url(self, mixed_str):
        # 正则匹配URL（以http/https开头，直到空格、引号等非URL字符结束）
        url_pattern = r'https?://[^\s"\']+'
        match = re.search(url_pattern, mixed_str)
        if match:
            return match.group(0)  # 返回匹配到的纯URL
        return None  # 非URL则过滤

    async def crawl_website(self):
        """从首页开始爬取整个网站并整合信息"""
        queue = [self.base_url]
        self.visited_urls.add(self.base_url)

        async with AsyncWebCrawler(config=self.browser_config) as crawler:
            while queue:
                current_url = queue.pop(0)
                current_url = await self.clean_url(current_url)
                logger.info(f"爬取: {current_url}")
                page_result = await self.crawl_page(crawler, current_url)

                if page_result:
                    # 提取并处理链接
                    links = await self.extract_links(page_result, current_url)
                    for link in links:
                        if link not in self.visited_urls:
                            self.visited_urls.add(link)
                            queue.append(link)
                    user_message = ""
                    user_message += "【当前页面内容】\n"
                    user_message += f"当前页面的URL: {current_url}\n"
                    user_message += page_result
                    current_parsed = self.llm_parser.process_text(user_message)
                    print(current_parsed)
                    await self.save_data(current_parsed, current_url)


async def main():
    sql = """SELECT 
        area, regist_time, province, det_range, city, 
        reg_addr, ent_name, legal_name, tags, insured_num, 
        website, create_time, contact_person, modify_time, 
        reg_capital, telephone, cro_type, deleted_flag, 
        credit_code, brief_intro, email, status
    FROM ps_cro_mechanism_copy1
    -- 这里可添加原有的筛选条件（如tags包含“器械”等）
    WHERE 
        tags LIKE '%器械%' 
        AND website IS NOT NULL
        AND NOT EXISTS (
            SELECT 1 FROM medical_device_products 
            WHERE company_name = ps_cro_mechanism_copy1.ent_name 
              or website = ps_cro_mechanism_copy1.website
        );"""
    results = mysql_db.execute_many_or_loop('', sql, [], operation='query')
    for result in results:
        print(result)
        crawler = WebsiteCrawler(result)
        await crawler.crawl_website()


if __name__ == "__main__":
    asyncio.run(main())
