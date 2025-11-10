"""
数据库操作模块
"""
import hashlib
from typing import List, Dict, Any, Optional
from loguru import logger
from get_mysqldb import DatabasePool
from config import config


class DatabaseManager:
    """数据库管理器"""
    
    def __init__(self):
        self.yixiecha_db = DatabasePool(
            logger=logger,
            DB_HOST=config.DB_YIXIECHA.host,
            DB_PORT=config.DB_YIXIECHA.port,
            DB_DATABASE=config.DB_YIXIECHA.database,
            DB_USER=config.DB_YIXIECHA.user,
            DB_PASSWORD=config.DB_YIXIECHA.password
        )
        
        self.zhaobiao_db = DatabasePool(
            logger=logger,
            DB_HOST=config.DB_ZHAOBIAO.host,
            DB_PORT=config.DB_ZHAOBIAO.port,
            DB_DATABASE=config.DB_ZHAOBIAO.database,
            DB_USER=config.DB_ZHAOBIAO.user,
            DB_PASSWORD=config.DB_ZHAOBIAO.password
        )
    
    def save_cmo_page(self, data: Dict[str, Any], company_info: Dict[str, Any]) -> bool:
        """保存CMO页面数据"""
        try:
            item = {
                'company_name': company_info.get('company_name'),
                'website': company_info.get('website'),
                'data_source_page': data['url'],
                'markdown_content': data['markdown'],
                'md5_hash': hashlib.md5(data['url'].encode()).hexdigest(),
            }
            self.yixiecha_db.insert('cmo_page', item)
            return True
        except Exception as e:
            logger.error(f"保存CMO页面失败: {str(e)}")
            return False
    
    def get_cmo_companies(self) -> List[Dict[str, Any]]:
        """获取需要爬取的CMO公司列表"""
        sql = """
        SELECT ent_name 
        FROM ps_cmo_mechanism
        WHERE 
            tags LIKE '%器械%' 
            AND NOT EXISTS (
                SELECT 1 FROM cmo_medical_device_products 
                WHERE company_name = ps_cmo_mechanism.ent_name 
                  OR website = ps_cmo_mechanism.website
            )
            AND NOT EXISTS (
                SELECT 1 FROM cmo_page 
                WHERE company_name = ps_cmo_mechanism.ent_name
            )
        """
        try:
            results = self.yixiecha_db.execute_many_or_loop('', sql, [], operation='query')
            logger.info(f"获取到{len(results)}家CMO公司")
            return results
        except Exception as e:
            logger.error(f"获取CMO公司列表失败: {str(e)}")
            return []
    
    def get_company_info(self, company_names: List[str]) -> List[Dict[str, Any]]:
        """获取公司详细信息"""
        if not company_names:
            return []
        
        placeholders = ', '.join(['%s'] * len(company_names))
        sql = f"SELECT * FROM company_info WHERE company_name IN ({placeholders})"
        
        try:
            results = self.zhaobiao_db.execute_many_or_loop('', sql, company_names, operation='query')
            logger.info(f"获取到{len(results)}条公司详细信息")
            return results
        except Exception as e:
            logger.error(f"获取公司信息失败: {str(e)}")
            return []
    
    def is_company_excluded(self, company_name: str) -> bool:
        """检查公司是否在排除列表中"""
        return company_name in config.EXCLUDED_COMPANIES
    
    def cleanup_company_data(self, company: Dict[str, Any]) -> Dict[str, Any]:
        """清理公司数据，移除不需要的字段"""
        cleaned = company.copy()
        # 移除不需要的字段
        fields_to_remove = ['id', 'data_source', 'all_data']
        for field in fields_to_remove:
            cleaned.pop(field, None)
        return cleaned


# 全局数据库管理器实例
db_manager = DatabaseManager()
