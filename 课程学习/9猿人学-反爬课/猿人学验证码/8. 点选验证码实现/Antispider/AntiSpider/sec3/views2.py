from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random


# Create your views here.

def lesson4(request):
    return render(request, "sec3/lesson4.html")


@csrf_exempt
def lesson4_data_api(request):
    # pip install pillow
    from PIL import Image, ImageDraw, ImageFont
    import random
    import time
    import io
    import base64

    _start = time.time()

    def generate_sprites_image(input_string, font_path):
        """
            生成包含指定字符集的雪碧图

            :param input_string: 字符集字符串
            :param font_path: 字体文件路径
            :param output_image_path: 生成的雪碧图路径
            """
        font_size = 36  # 字体大小
        char_width, char_height = 50, 50  # 每个字符的宽度和高度

        # 创建字体对象
        font = ImageFont.truetype(font_path, font_size)

        # 计算 Sprites 图片的总宽度和高度
        image_width = char_width * len(input_string)
        image_height = char_height

        # 创建一个新的图像
        sprite_image = Image.new("RGBA", (image_width, image_height), (255, 255, 255, 0))

        # 创建一个绘图对象
        draw = ImageDraw.Draw(sprite_image)

        # 在图像上绘制每个字符
        for index, char in enumerate(input_string):
            x = index * char_width
            y = (char_height - font_size) // 2  # 垂直居中对齐
            draw.text((x + (char_width - font_size) // 2, y), char, font=font, fill=(0, 0, 0, 255))

        # 保存生成的 Sprites 图片
        bytes_io = io.BytesIO()
        sprite_image.save(bytes_io, format="png")
        return bytes_io

    def get_char_position(char, input_string, char_width, char_white_width):
        return -(input_string.index(char) * char_width + char_white_width)

    def html_code_test(_str, input_string, html_path):
        char_width = 50
        char_white_width = 8
        # 计算我们要展示字符串的索引
        _css_str = ""
        _div_str = ""
        random_numbers = random.sample(range(0, 10000), len(input_string))

        for char in _str:
            position = get_char_position(char, input_string, char_width, char_white_width)
            # 生成 CSS
            random_class = random_numbers.pop()
            _css_str += f".class{random_class}{{background-position: {position}px 0;}}\n"

            # 生成 div内容
            _div_str += f"<div class='sprite class{random_class}'></div>"

        _css_str = "<style>{}</style>".format(_css_str)

        _html = f"""
            <style>
            .sprite{{
                    background-image: url("sprites.png");
                    width: 20px;
                    height: 45px;
                    background-repeat: no-repeat;
                    display: inline-block;

                }}
            </style>
            {_css_str}
            {_div_str}
            """

        with open(html_path, "w", encoding='utf-8') as f:
            f.write(_html)

    def return_html_css(_str, input_string):
        char_width = 50
        char_white_width = 8
        # 计算我们要展示字符串的索引
        _div_str = ""
        _css_str = ""
        for char in _str:
            position = get_char_position(char, input_string, char_width, char_white_width)
            # 生成 CSS
            if not random_numbers_dict.get(char):
                random_class = random_numbers.pop()
                random_numbers_dict[char] = random_class
            else:
                random_class = random_numbers_dict[char]
            _css_str += f".class{random_class}{{background-position: {position}px 0;}}\n"
            # 生成 div内容
            _div_str += f"<div class='sprite class{random_class}'></div>"
        return _div_str, _css_str

    input_string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@. "
    input_string_list = list(input_string)
    random.shuffle(input_string_list)
    input_string = "".join(input_string_list)

    font_path = "/AntiSpider/sec3/Courier New.ttf"

    # 图片绘制
    png_io = generate_sprites_image(input_string, font_path)
    png_base64 = base64.b64encode(png_io.getvalue()).decode()

    random_numbers = random.sample(range(0, 10000), len(input_string))

    random_numbers_dict = dict()

    page = int(request.POST.get("page"))
    with open("/AntiSpider/sec2/utils/data.json") as f:
        data_list = json.loads(f.read())["pages"][page - 1]['data']

        _css_code = ""
        for index, data in enumerate(data_list):
            _div_str, _css_str = return_html_css(data["name"], input_string)
            data_list[index]["name"] = _div_str
            _css_code += _css_str

            _div_str, _css_str = return_html_css(data["email"], input_string)
            data_list[index]["email"] = _div_str
            _css_code += _css_str

        _css_code = "<style>{}</style>".format(_css_code)
        return JsonResponse({"data": data_list, "total": 25, "sprite": png_base64, "css_code": _css_code})


def lesson5(request):
    return render(request, "sec3/lesson5.html")


@csrf_exempt
def lesson5_data_api(request):
    import svgwrite
    from fontTools.ttLib import TTFont
    from fontTools.pens.svgPathPen import SVGPathPen
    import re
    import random
    import time
    import io

    def perturb_path_commands(path_commands):
        numbers = re.findall(r"-?\d+\.?\d*", path_commands)
        # 对数字进行随机的扰动
        perturbed_numbers = [str(float(num) + random.randint(-10, 10)) for num in numbers]

        def replace_with_perturbed(match):
            return perturbed_numbers.pop(0)

        path_commands = re.sub(r"-?\d+\.?\d*", replace_with_perturbed, path_commands)
        return path_commands

    def get_svg(font, input_string):

        glyph_set = font.getGlyphSet()
        glyph_Cmap = font.getBestCmap()

        dwg = svgwrite.Drawing(profile="full", size=("250px", "70px"))
        input_string = input_string
        x_offset = 10
        for char in input_string:
            if char == " ":
                x_offset += 12
                continue
            glyph_name = glyph_Cmap.get(ord(char))
            glyph = glyph_set[glyph_name]
            pen = SVGPathPen(glyph_set)
            glyph.draw(pen)
            path_command = pen.getCommands()
            perturb_path_command = perturb_path_commands(path_command)
            svg_path = dwg.path(d=perturb_path_command, fill="black",
                                transform=f"translate({x_offset}, 25) scale(0.01, -0.01)")
            dwg.add(svg_path)
            x_offset += 12

        svg_buffer = io.StringIO()
        dwg.write(svg_buffer)
        return svg_buffer.getvalue()

    font = TTFont("/AntiSpider/sec3/Courier New.ttf")
    input_string = "yuanrenxue@yrx.com"
    get_svg(font, input_string)

    page = int(request.POST.get("page"))

    import execjs
    with open("/AntiSpider/static/sec3/CryptoJS.js", 'r', encoding='utf-8') as f:
        AES_CBC_JS = execjs.compile(f.read())

    key = 'sec3-lesson5-yrx'
    iv = 'sec3-lesson5-anl'
    with open("/AntiSpider/sec2/utils/data.json") as f:
        data_list = json.loads(f.read())["pages"][page - 1]['data']
        for index, data in enumerate(data_list):
            name = AES_CBC_JS.call("encrypt", get_svg(font, data["name"]), key, iv)
            email = AES_CBC_JS.call("encrypt", get_svg(font, data["email"]), key, iv)
            data_list[index]["name"] = name
            data_list[index]["email"] = email
            print(name)
        return JsonResponse({"data": data_list, "total": 25})
