import time
import random
from loguru import logger

tasks = [
    "1、迷雾动图之真相（送分题）",
    "2、滑块缺口之涟漪（送分题）",
    "3、数学神秘之涌动",
    "4、点击变换之回响",
    "5、滑动曲线之韵律",
    "6、线条轨迹之涟漪",
    "7、旋转重构之边界",
    "8、拖拽虚无之扭曲",
    "9、似隐似明之幻境",
    "10、幽暗深邃之眸（自研验证码）"
]


def execute_task(task_name):
    """模拟执行任务，这里随机睡眠模拟耗时"""
    start_time = time.time()
    # 随机睡眠 0.1 - 5 秒模拟任务执行耗时
    time.sleep(random.uniform(0.1, 5))
    end_time = time.time()
    cost_time = end_time - start_time
    return cost_time


if __name__ == "__main__":
    for index, task in enumerate(tasks, start=1):
        logger.debug(f"{task}")
        cost_time = execute_task(task)
        result = {"success": True, "msg": "success"}
        logger.info(f"{result} 耗时{cost_time}")
