# 随机生成文字

# GB2321
import random
from PIL import Image, ImageDraw, ImageFont


def generate_random_gb2312_chars(num_chars=4):
    # GB2312 实际上是一个常用中文的字符集
    chars = []
    for _ in range(num_chars):
        head = random.randint(176, 247)
        body = random.randint(161, 254)
        char = bytes([head, body]).decode("gb2312", errors='ignore')
        chars.append(char)

    return chars


def add_text_to_image(image_path, chars):
    image = Image.open(image_path)
    image = image.resize((300, 184))
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("FZShuTi.ttf", size=FONT_SIZE)
    num = 0

    position_list = []
    for char in chars:
        position = (
            random.randint(0 + 60 * num, 300 - FONT_SIZE - 60 * (4 - num)),
            random.randint(0, 184 - FONT_SIZE)
        )
        position_list.append({char: position})
        text_color = (random.randint(0, 150), random.randint(0, 150), random.randint(0, 150))
        draw.text(position, char, fill=text_color, font=font)
        num += 1

    return image, position_list


if __name__ == '__main__':
    FONT_SIZE = 24
    chars_list = generate_random_gb2312_chars()
    image, position_list = add_text_to_image("input.jpg", chars_list)
    random.shuffle(position_list)
    print(position_list)
    image.save("output.jpg")











