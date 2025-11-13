# 批量给文件加统一前缀（支持jpg/png/pdf等格式）
import os  # Python自带，处理文件/文件夹的工具
from glob import glob  # Python自带，快速筛选文件

# ---------------------- 核心配置（新手只改这里就行）----------------------
target_format = "*.jpg"  # 要处理的文件格式：*.jpg=所有jpg，*.pdf=所有pdf
prefix = "6月会议_"       # 要加的前缀，比如改成“客户资料_”就是给文件加这个前缀
# ------------------------------------------------------------------------

# 核心逻辑：1行代码筛选文件，循环重命名
for old_filename in glob(target_format):  # 筛选出所有目标格式的文件
    # 新文件名 = 前缀 + 原来的文件名（比如“6月会议_” + “IMG_1234.jpg”）
    new_filename = prefix + old_filename
    os.rename(old_filename, new_filename)  # 执行重命名（这行是核心操作）

print(f"搞定！已给所有{target_format}文件加了「{prefix}」前缀")