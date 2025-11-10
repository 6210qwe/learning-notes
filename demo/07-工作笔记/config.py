"""
CMO爬虫配置文件
"""
import os
from dataclasses import dataclass
from typing import Set, Dict, Any


@dataclass
class DatabaseConfig:
    """数据库配置"""
    host: str
    port: int
    database: str
    user: str
    password: str


@dataclass
class CrawlerConfig:
    """爬虫配置"""
    max_depth: int = 7
    max_threads: int = 10
    batch_size: int = 30
    max_total_links: int = 1000
    wait_timeout: int = 20000
    headless: bool = True
    verbose: bool = True


@dataclass
class ProxyConfig:
    """代理配置"""
    server: str
    username: str
    password: str


class Config:
    """配置管理类"""
    
    # 数据库配置
    DB_YIXIECHA = DatabaseConfig(
        host="rm-2ze9f04i505y525i19o.mysql.rds.aliyuncs.com",
        port=3306,
        database="yixiecha",
        user="zhangyanzhen",
        password="yutu#2025"
    )
    
    DB_ZHAOBIAO = DatabaseConfig(
        host="rm-2ze9f04i505y525i19o.mysql.rds.aliyuncs.com",
        port=3306,
        database="zhaobiao",
        user="zhangyanzhen",
        password="yutu#2025"
    )
    
    # 爬虫配置
    CRAWLER = CrawlerConfig()
    
    # 代理配置（可选）
    PROXY = ProxyConfig(
        server="http://g184.kdltps.com:15818",
        username="t13632437348639",
        password="10cc7lx7"
    )
    
    # 关键词配置
    SKIP_KEYWORDS: Set[str] = {
        '影视', "直播", "找不到页面", "无法访问"
    }
    
    POSITIVE_KEYWORDS: Set[str] = {
        'cro', 'cmo', 'cdmo',
        '服务领域', '临床实验', '临床试验',
        '关于我们', '产品', '服务'
    }
    
    # 排除的公司列表
    EXCLUDED_COMPANIES: Set[str] = {
        "上海艾诺电子有限公司",
    }
    
    # 公共邮箱域名
    PUBLIC_EMAIL_DOMAINS: Set[str] = {
        'qq.com', '163.com', '126.com', '139.com', '189.cn', 'sina.com',
        'sina.cn', 'yeah.net', 'hotmail.com', 'outlook.com', 'live.com',
        'msn.com', 'yahoo.com', 'ymail.com', 'aol.com', 'protonmail.com',
        'gmail.com', 'icloud.com', 'mail.com', 'foxmail.com', '21cn.com',
        'aliyun.com', 'vip.163.com', 'vip.qq.com', 'vip.sina.com',
        '263.net', 'eyou.com', 'sohu.com', 'tom.com', 'etang.com',
        'wo.com.cn', '139.com', '189.cn', 'china.com', 'citiz.net'
    }
    
    # 非企业官网域名
    NON_COMPANY_DOMAINS: Set[str] = {
        'qq.cn', 'pp.com', 'tju.edu.cn', 'weigaogroup.com', 'vacure.cn'
    }
    
    @classmethod
    def get_excluded_domains(cls) -> Set[str]:
        """获取所有需要排除的域名"""
        return cls.PUBLIC_EMAIL_DOMAINS.union(cls.NON_COMPANY_DOMAINS)
    
    @classmethod
    def from_env(cls) -> 'Config':
        """从环境变量加载配置"""
        # 可以从环境变量覆盖配置
        if os.getenv('DB_HOST'):
            cls.DB_YIXIECHA.host = os.getenv('DB_HOST')
        if os.getenv('DB_PASSWORD'):
            cls.DB_YIXIECHA.password = os.getenv('DB_PASSWORD')
        return cls()


# 全局配置实例
config = Config()
