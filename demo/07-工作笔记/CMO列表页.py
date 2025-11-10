import asyncio
import hashlib
import time
import re
from urllib.parse import urljoin, urlparse, urlunparse
from concurrent.futures import ThreadPoolExecutor  # 保留原导入，虽暂未使用
from crawl4ai import AsyncWebCrawler
from crawl4ai.async_configs import BrowserConfig, CrawlerRunConfig, ProxyConfig
from get_mysqldb import DatabasePool
from loguru import logger
from threading import Lock

# 配置参数（新增：单批次大小+单公司最大爬取量；其他保留原配置）
MAX_DEPTH = 7  # 最大爬取深度
MAX_THREADS = 10  # 线程池大小（原配置保留）
SKIP_KEYWORDS = {'影视', "直播", "找不到页面", "无法访问"}  # 跳过关键词
# 新增：正向关键词（CRO/CMO相关网站必含的核心词，用于二次验证）
POSITIVE_KEYWORDS = {
    'cro', 'cmo', 'cdmo',
    '服务领域', '临床实验', '临床试验',  # 考虑“实验”“试验”两种常见写法
    '关于我们', '产品', '服务'
}
# 新增：核心需求配置
BATCH_SIZE = 30  # 单批次处理链接数（可根据电脑配置调整，建议5-15）
MAX_TOTAL_LINKS = 1000  # 单公司最大爬取量（限制为1000页）

# 数据库配置（完全保留）
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


def retry(max_retries=3, retry_delay=2):
    """重试装饰器（完全保留）"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            for i in range(max_retries):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    if i == max_retries - 1:
                        logger.error(f"{func.__name__} 失败: {str(e)}")
                        return None
                    await asyncio.sleep(retry_delay)
                    logger.warning(f"{func.__name__} 重试 {i + 1}/{max_retries}")
            return None
        return wrapper
    return decorator


def clean_url(url_str):
    """清洗URL（完全保留）"""
    if not url_str:
        return None
    if 'http' not in url_str:
        url_str = f'http://{url_str}'
    if 'javascript' in url_str.lower():
        return None
    match = re.search(r'https?://[^\s"\']+', url_str)
    return match.group(0) if match else None


def extract_links(html, base_url):
    """提取有效链接（完全保留）"""
    links = set()
    patterns = [r'<a\s+href=["\'](.*?)["\']', r'\[.*?\]\((.*?)\)']
    for pattern in patterns:
        for match in re.findall(pattern, html, re.IGNORECASE):
            if not match or match.startswith('#') or '...' in match:
                continue
            full_url = urljoin(base_url, match)
            parsed = urlparse(full_url)
            base_parsed = urlparse(base_url)
            if parsed.netloc != base_parsed.netloc:
                continue  # 过滤跨域链接
            # 过滤静态资源
            if any(parsed.path.lower().endswith(ext) for ext in
                   ('.jpg', '.jpeg', '.png', '.gif', '.css', '.js', '.pdf', '.zip')):
                continue
            links.add(urlunparse(parsed._replace(fragment='')))
    return links


def save_to_db(data, company_info):
    """保存数据到数据库（完全保留）"""
    try:
        item = {
            'company_name': company_info.get('company_name'),
            'website': company_info.get('website'),
            'data_source_page': data['url'],
            'markdown_content': data['markdown'],
            'md5_hash': hashlib.md5(data['url'].encode()).hexdigest(),
        }
        mysql_db.insert('cmo_page', item)
    except Exception as e:
        logger.error(f"保存失败: {str(e)}")


# @retry()
async def process_url(crawler, url, depth, company_info, visited, lock):
    """处理单个URL的异步函数（完全保留原逻辑）"""
    child_links = []
    is_homepage = (depth == 1)

    # 检查深度和去重
    if depth > MAX_DEPTH:
        return child_links, False

    with lock:
        if url in visited:
            return child_links, False
        visited.add(url)
    run_config = CrawlerRunConfig(
        wait_for_timeout=20000
    )
    result = await crawler.arun(url=url, run_config=run_config)
    # 使用crawl4ai爬取页面
    # result = await crawler.arun(url=url)
    if not result or not result.html:
        return child_links, False

    if is_homepage:
        page_content = (result.html + result.markdown).lower()  # 统一转小写，避免大小写误判
        company_name = company_info.get('ent_name', '未知公司')

        # 步骤1：检测是否含违禁词
        has_skip_word = any(keyword.lower() in page_content for keyword in SKIP_KEYWORDS)
        if has_skip_word:
            # 步骤2：含违禁词 → 二次验证是否含正向词
            has_positive_word = any(keyword.lower() in page_content for keyword in POSITIVE_KEYWORDS)
            if has_positive_word:
                # 含正向词 → 判定为正常网站（如“CRO+直播”），继续爬取
                logger.warning(f"公司 {company_name} 首页含违禁词，但含正向词，继续爬取")
            else:
                # 不含正向词 → 判定为不良网站，终止爬取
                logger.warning(f"公司 {company_name} 首页含违禁词且无正向词，终止爬取")
                return child_links, True

    # 保存数据
    save_to_db({'url': url, 'markdown': result.markdown}, company_info)
    logger.info(f"爬取成功 [深度{depth}]: {url}")

    # 提取子链接
    if depth < MAX_DEPTH:
        child_links = [(link, depth + 1) for link in extract_links(result.html, url)]

    return child_links, False


async def process_batch(crawler, batch, company_info, visited, lock):
    """处理一批URL（仅新增分批逻辑，其他保留原逻辑）"""
    batch_results = []
    # 按BATCH_SIZE拆分批次，避免一次性处理过多链接导致卡住
    for i in range(0, len(batch), BATCH_SIZE):
        sub_batch = batch[i:i + BATCH_SIZE]
        logger.info(
            f"处理子批次 {i // BATCH_SIZE + 1} | 本批次{len(sub_batch)}个链接 | 剩余待处理{len(batch) - i}个链接")

        # 处理当前子批次（原逻辑不变）
        tasks = []
        for url, depth in sub_batch:
            tasks.append(process_url(crawler, url, depth, company_info, visited, lock))

        sub_results = await asyncio.gather(*tasks)
        batch_results.extend(sub_results)

    # 原汇总逻辑不变
    all_child_links = []
    skip_company = False
    for childs, need_skip in batch_results:
        if need_skip:
            skip_company = True
            break
        if childs:
            all_child_links.extend(childs)
    return all_child_links, skip_company


proxy_config = ProxyConfig(
    server="http://g184.kdltps.com:15818",
    username="t13632437348639",
    password="10cc7lx7"
)

browser_config = BrowserConfig(
    # proxy_config=proxy_config,
    headless=True,
    verbose=True
)


async def crawl_company(company_info):
    """爬取单个公司的所有页面（仅新增爬取量限制，其他保留原逻辑）"""
    company_name = company_info.get('company_name')
    start_url = clean_url(company_info.get('website'))
    if not start_url:
        logger.error(f"公司 {company_name} 无效URL")
        return
    logger.info(f"开始爬取公司: {company_name} (首页: {start_url})")
    # 2. 为当前公司启动独立的AsyncWebCrawler（async with自动关闭，避免僵尸进程）
    async with AsyncWebCrawler(config=browser_config) as crawler:
        # 初始化数据结构（每个公司独立去重集合，避免跨公司干扰）
        visited = set()
        lock = Lock()
        current_links = [(start_url, 1)]  # (url, depth)
        skip_company = False
        while current_links and not skip_company:
            # 核心新增：检查单公司爬取量是否达到1000，达到则终止
            if len(visited) >= MAX_TOTAL_LINKS:
                logger.warning(f"公司 {company_name} 爬取量已达上限（{MAX_TOTAL_LINKS}页），停止爬取")
                break
            # 处理当前深度的链接（使用修改后的分批process_batch）
            child_links, skip_company = await process_batch(
                crawler, current_links, company_info, visited, lock
            )
            if skip_company:
                break
            # 去重下一层链接（逻辑完全保留）
            seen = set()
            next_links = []
            for link, depth in child_links:
                if link not in seen and link not in visited:
                    seen.add(link)
                    next_links.append((link, depth))
            logger.info(f"深度 {current_links[0][1]} 完成，累计爬取 {len(visited)} 页，下一层待爬 {len(next_links)} 页")
            current_links = next_links

    # 爬取结束日志（补充爬取量上限的状态提示）
    if len(visited) >= MAX_TOTAL_LINKS:
        status = f"达到最大爬取量（{MAX_TOTAL_LINKS}页）终止"
    else:
        status = "因首页含敏感关键词终止" if skip_company else f"完成，共访问 {len(visited)} 个页面"
    logger.info(f"公司 {company_name} 爬取{status}\n")


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
mysql_db_two = DatabasePool(
    logger=logger,
    DB_HOST=DB_HOST,
    DB_PORT=DB_PORT,
    DB_DATABASE="zhaobiao",
    DB_USER=DB_USER,
    DB_PASSWORD=DB_PASSWORD
)


# async def main():
#     sql_yixiecha = """
#     SELECT ent_name FROM ps_cmo_mechanism
#     WHERE
#         tags LIKE '%器械%'
#         AND NOT EXISTS (
#             SELECT 1 FROM cmo_medical_device_products
#             WHERE company_name = ps_cmo_mechanism.ent_name
#               or website = ps_cmo_mechanism.website
#         )
#         ;"""
#     results = mysql_db.execute_many_or_loop('', sql_yixiecha, [], operation='query')
#     logger.info(f"CMO机构获取到{len(results)}条数据")
#     target_companies = [item['ent_name'] for item in results if item.get('ent_name')]
#     placeholders = ', '.join(['%s'] * len(target_companies))
#     sql_tianyancha = f"SELECT * FROM company_info WHERE company_name IN ({placeholders})"
#     results_two = mysql_db_two.execute_many_or_loop('', sql_tianyancha, target_companies, operation='query')
#     logger.info(f"获取到{len(results_two)}条工商信息")
#     for company in results_two:
#         company.pop('id')
#         company.pop('data_source')
#         company.pop('all_data')
#         # print(result)
#         website = company['website']
#         # if website is None:
#         #     email = company['email']
#         #     if email and '@' in email and 'qq.com' not in email and '163' not in email and '126' not in email and '139' not in email and '123' not in email and '189' not in email and '169' not in email:
#         #         domain = email.split('@')[-1]
#         #         website = 'http://www.' + domain
#         #         # print(result['company_name'], website)
#         if website:
#             print(website)
#             await crawl_company(company)
async def main():
    # 定义需要排除的公司列表
    EXCLUDED_COMPANIES = [
        "上海艾诺电子有限公司",
    ]
    sql_yixiecha = """
        SELECT ent_name 
        FROM ps_cmo_mechanism
        WHERE 
            tags LIKE '%器械%' 
            AND NOT EXISTS (
                SELECT 1 FROM cmo_medical_device_products 
                WHERE company_name = ps_cmo_mechanism.ent_name 
                  OR website = ps_cmo_mechanism.website
            )
            -- 新增：排除在 cmo_page 表中已存在的公司（依据 company_name 匹配）
            AND NOT EXISTS (
                SELECT 1 FROM cmo_page 
                WHERE company_name = ps_cmo_mechanism.ent_name
            )
        ;"""
    results = mysql_db.execute_many_or_loop('', sql_yixiecha, [], operation='query')
    logger.info(f"CMO机构获取到{len(results)}条数据")
    target_companies = [item['ent_name'] for item in results if item.get('ent_name')]

    # 优化：直接在SQL层面过滤排除的公司，减少后续处理量
    if EXCLUDED_COMPANIES:
        # 从目标公司列表中移除排除项
        target_companies = [name for name in target_companies
                            if name not in EXCLUDED_COMPANIES]
        logger.info(f"排除{len(EXCLUDED_COMPANIES)}家公司后，剩余目标公司：{len(target_companies)}家")

    placeholders = ', '.join(['%s'] * len(target_companies))
    sql_tianyancha = f"SELECT * FROM company_info WHERE company_name IN ({placeholders})"
    results_two = mysql_db_two.execute_many_or_loop('', sql_tianyancha, target_companies, operation='query')
    logger.info(f"获取到{len(results_two)}条工商信息")

    for company in results_two:
        company_name = company.get('company_name')

        # 双重保险：再次检查是否为排除公司（避免SQL过滤可能的遗漏）
        if company_name in EXCLUDED_COMPANIES:
            logger.info(f"跳过排除公司：{company_name}")
            continue

        company.pop('id')
        company.pop('data_source')
        company.pop('all_data')
        website = company['website']
        # if website:
        #     print(website)
        #     await crawl_company(company)
        if website is None:
            email = company['email']
            if email and '@' in email:
                # 定义公共邮箱域名列表
                public_email_domains = {
                    'qq.com', '163.com', '126.com', '139.com', '189.cn', 'sina.com',
                    'sina.cn', 'yeah.net', 'hotmail.com', 'outlook.com', 'live.com',
                    'msn.com', 'yahoo.com', 'ymail.com', 'aol.com', 'protonmail.com',
                    'gmail.com', 'icloud.com', 'mail.com', 'foxmail.com', '21cn.com',
                    'aliyun.com', 'vip.163.com', 'vip.qq.com', 'vip.sina.com',
                    '263.net', 'eyou.com', 'sohu.com', 'tom.com', 'etang.com',
                    'wo.com.cn', '139.com', '189.cn', 'china.com', 'citiz.net'
                }
                # 定义其他非企业官网域名
                non_company_domains = {
                    'qq.cn', 'pp.com', 'tju.edu.cn', 'weigaogroup.com', 'vacure.cn'
                }
                # 合并所有需要排除的域名
                excluded_domains = public_email_domains.union(non_company_domains)
                # 提取邮箱域名
                domain = email.split('@')[-1].lower()
                # 检查域名是否在排除列表中
                if domain not in excluded_domains:
                    company['website'] = 'http://www.' + domain
                    await crawl_company(company)
                    # print(company['company_name'], company['website'])


if __name__ == "__main__":
    asyncio.run(main())
