from curl_cffi import requests
from io import BytesIO
from PIL import Image

# 下载打乱后的切片背景图
# url = "https://smartvcode2.eastmoney.com/11/resources/e02b_160/2/0f/0f7043afbc6b72c251c374c144ed211c/0f7043afbc6b72c251c374c144ed211c.jpg"
# response = requests.get(url)
# original_img = Image.open(BytesIO(response.content))

def shuffle_slices(original_img,img_name):

    original_img = Image.open(BytesIO(original_img))
    # 切片大小
    slice_width = 12
    slice_height = 80

    # 顺序还原映射（JS a() 逻辑复现）
    def build_index():
        order = "6_11_7_10_4_12_3_1_0_5_2_9_8".split("_")
        order = list(map(int, order))
        result = []
        for r in range(52):
            idx = 2 * order[int((r % 26) / 2)] + (r % 2)
            if (int(r / 2) % 2) == 0:
                idx += -1 if (r % 2) else 1
            if r >= 26:
                idx += 26
            result.append(idx)
        return result

    mapping = build_index()

    # 创建新图像用于拼接（宽度 312，高度 160）
    canvas = Image.new("RGB", (26 * slice_width, 2 * slice_height))

    for i in range(52):
        src_index = mapping[i]
        row = 0 if i < 26 else 1
        src_row = 0 if src_index < 26 else 1
        src_col = src_index % 26

        # 切片区域
        left = src_col * slice_width
        upper = src_row * slice_height
        right = left + slice_width
        lower = upper + slice_height

        # 粘贴区域
        dst_left = (i % 26) * slice_width
        dst_upper = row * slice_height

        # 裁剪并粘贴
        part = original_img.crop((left, upper, right, lower))
        canvas.paste(part, (dst_left, dst_upper))

    # 保存还原后的图
    canvas.save(f"{img_name}.jpg")
