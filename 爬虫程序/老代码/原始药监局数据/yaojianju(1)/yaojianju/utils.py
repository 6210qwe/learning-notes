from loguru import logger
import time


def get_proxy():
    # 用户名密码方式
    # 快代理样例
    tunnel = "i583.kdltps.com:15818"
    username = ""
    password = ""
    proxies = {
        "http": f"http://{username}:{password}@{tunnel}",
        "https": f"http://{username}:{password}@{tunnel}"
    }
    return proxies


# 定义重试装饰器
def retry(max_retries=5, retry_delay=0.1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for retry in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    logger.error(f"{func.__name__} 执行失败，正在进行第{retry + 1}次重试，原因: {e}")
                    if retry < max_retries - 1:
                        time.sleep(retry_delay)
                        continue
                    else:
                        logger.error(f"{func.__name__} 执行失败，{retry + 1}次重试后失败，原因: {e}")
            return None

        return wrapper
    return decorator