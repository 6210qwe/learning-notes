import time
import requests
import hashlib
import random
import ddddocr
from PIL import Image
# from PIL.Image import Resampling
from loguru import logger
from copy import deepcopy
from Yuan import YdmVerify


# def get_ocr():
#     slide_verify = YdmVerify().slide_verify
#     with open('image/new.png', 'rb') as f:
#         target_bytes = f.read()
#     with open('image/new_front.jpg', 'rb') as f:
#         background_bytes = f.read()
#     data = slide_verify(background_bytes, target_bytes)
#     print(data)


def get_track(total_distance):
    track = []
    x_distance = 1

    time_now = int(time.time() * 1000)
    begin = {str(x_distance): time_now}
    track.append(begin)

    while x_distance < total_distance:
        time_now += random.randint(10, 200)
        x_distance += random.randint(1, 5)
        if x_distance > total_distance:
            x_distance = total_distance
        track.append({str(x_distance): time_now})

    logger.info(f"轨迹：{track}")
    return track


# get_track(177)


import random



# 原始的数据
decrypt_data = [
    {
        "0": {"t": 1721097419507, "y": 209},
        "1": {"t": 1721097419551, "y": 209},
        "2": {"t": 1721097419559, "y": 209},
        "4": {"t": 1721097419567, "y": 210},
        "8": {"t": 1721097419575, "y": 210},
        "14": {"t": 1721097419583, "y": 210},
        "19": {"t": 1721097419591, "y": 210},
        "25": {"t": 1721097419599, "y": 211},
        "32": {"t": 1721097419607, "y": 212},
        "39": {"t": 1721097419615, "y": 212},
        "43": {"t": 1721097419623, "y": 212},
        "47": {"t": 1721097419631, "y": 212},
        "50": {"t": 1721097419639, "y": 212},
        "52": {"t": 1721097419647, "y": 212},
        "54": {"t": 1721097419655, "y": 212},
        "55": {"t": 1721097419663, "y": 212},
        "57": {"t": 1721097419671, "y": 212},
        "60": {"t": 1721097419679, "y": 212},
        "61": {"t": 1721097419695, "y": 212},
        "64": {"t": 1721097419703, "y": 212},
        "65": {"t": 1721097419711, "y": 212},
        "66": {"t": 1721097419719, "y": 212},
        "67": {"t": 1721097419727, "y": 212},
        "69": {"t": 1721097419735, "y": 212},
        "70": {"t": 1721097419751, "y": 212},
        "71": {"t": 1721097419759, "y": 212},
        "72": {"t": 1721097419767, "y": 212},
        "73": {"t": 1721097419783, "y": 212},
        "75": {"t": 1721097419791, "y": 212},
        "76": {"t": 1721097419807, "y": 212},
        "77": {"t": 1721097419815, "y": 212},
        "78": {"t": 1721097419823, "y": 212},
        "80": {"t": 1721097419831, "y": 212},
    }
]

# 深拷贝原始数据，防止直接修改原始数据
new_data = deepcopy(decrypt_data)

# 获取当前时间戳
current_timestamp = int(time.time() * 1000)

# 遍历每个字典进行处理
for item in new_data[0].values():
    # 生成随机数，范围在20到30之间
    random_offset = random.randint(20, 30)

    # 更新时间戳 t，基于前一个时间戳加上随机数
    item['t'] = current_timestamp + random_offset

# 输出处理后的结果
print(new_data)

# print(get_ocr())


# 打开一张图片
# from PIL import Image
#
# # 打开一张图片
# image_path = 'D:/逆向练手/滑块类/360天御/image/front.jpg'
# output_path = 'D:/逆向练手/滑块类/360天御/image/new_front.jpg'
#
# image = Image.open(image_path)
# image = image.convert('RGBA')  # 将图像转换为 RGBA 模式，以便处理透明通道
#
# # 创建一个白色背景的新图像，并将原图像粘贴上去
# new_image = Image.new('RGB', image.size, (255, 255, 255))
# new_image.paste(image, mask=image.split()[3])  # 使用 alpha 通道作为掩码，粘贴图像到新图像上
#
# # 设置新的尺寸
# new_size = (54, 54)
#
# # 缩放图像
# resized_image = new_image.resize(new_size, Image.LANCZOS)  # 使用 Lanczos 插值
#
# # 保存缩放后的图像为 JPEG 格式
# resized_image.save(output_path)
