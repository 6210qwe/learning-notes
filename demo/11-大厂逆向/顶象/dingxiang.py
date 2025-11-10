import random
from loguru import logger

for i in range(10):
    # 定义不同的验证类型
    VERIFICATION_TYPES = [
        "空间语义", "旋转验证", "图标点选", "滑动拼图",
        "语序点选", "乱序拼图", "刮刮卡"
    ]
    token = ''.join(random.choices(population="0123456789ABCDEF", k=127))
    logger.info(random.choices(VERIFICATION_TYPES))
    logger.success({'success': True, 'token': token, 'msg': None, 'tp': None, 'sv': None, 'retry': 0, 'ot': None})
