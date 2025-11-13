# 批量按顺序编号重命名（支持自定义序号位数）
import os
from glob import glob

# ---------------------- 核心配置（新手只改这里）----------------------
target_format = "*.pdf"  # 处理PDF文件
base_name = "客户资料_"   # 文件名基础部分
start_num = 1            # 从哪个数字开始编号
num_digits = 3           # 序号位数（3=001、002，2=01、02）
# ------------------------------------------------------------------------

# 核心逻辑：按序号生成新文件名
for i, old_filename in enumerate(glob(target_format), start=start_num):
    # 生成序号（比如i=1时，num_digits=3 → 001）
    serial_num = f"{i:0{num_digits}d}"
    # 新文件名 = 基础名 + 序号 + 原文件后缀（比如“客户资料_001.pdf”）
    new_filename = f"{base_name}{serial_num}{os.path.splitext(old_filename)[1]}"
    os.rename(old_filename, new_filename)
print(f"搞定！已将{target_format}文件按「{base_name}001」格式重命名")