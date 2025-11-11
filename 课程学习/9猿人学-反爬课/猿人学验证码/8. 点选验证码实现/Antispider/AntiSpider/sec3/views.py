from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random
# Create your views here.

def lesson1(request):
    return render(request, "sec3/lesson1.html")

@csrf_exempt
def lesson1_data_api(request):
    def shuffle_string_to_html(input_str):
        original_list = list(input_str)
        # 新建一个列表专用于打乱
        shuffled_list = original_list[:]
        random.shuffle(shuffled_list)
        # 计算每一个偏移量
        original_dict = {}
        for index, char in enumerate(original_list):
            if char in original_dict:
                original_dict[char].append(index)
            else:
                original_dict[char] = [index]
        # 偏移量接收的列表
        offsets = []
        for i, char in enumerate(shuffled_list):
            original_index = original_dict[char].pop(0)
            offset = original_index - i
            offsets.append(offset)
        _html = ""
        for index, char in enumerate(shuffled_list):
            if random.randint(0, 1):
                _html += "<span style='left:{}px'>{}</span>".format(offsets[index] * 9.61, char)
            else:
                _html += "<span style='right:{}px'>{}</span>".format(-offsets[index] * 9.61, char)
        return _html

    page = int(request.POST.get("page"))
    with open("/AntiSpider/sec2/utils/data.json") as f:
        data_list = json.loads(f.read())["pages"][page - 1]['data']
        for index, data in enumerate(data_list):
            data_list[index]["name"] = shuffle_string_to_html(data["name"])
            data_list[index]["email"] = shuffle_string_to_html(data["email"])
        return JsonResponse({"data": data_list, "total": 25})



def lesson3(request):
    return render(request, "sec3/lesson3.html")

@csrf_exempt
def lesson3_data_api(request):
    from fontTools.ttLib import TTFont, newTable, BytesIO
    from fontTools.pens.ttGlyphPen import TTGlyphPen
    from fontTools.ttLib.tables._c_m_a_p import CmapSubtable
    import xml.etree.ElementTree as ET
    import random
    import time
    import base64

    _start = time.time()

    def randomize_cmap(cmap):
        unicode_keys = list(cmap.keys())
        glyph_names = list(cmap.values())
        random.shuffle(glyph_names)
        new_cmap = dict(zip(unicode_keys, glyph_names))
        return new_cmap

    def map_string(input_string, new_cmap):
        fft_mapping = {
            "@": "at",
            ".": "period",
            "0": "zero",
            "1": "one",
            "2": "two",
            "3": "three",
            "4": "four",
            "5": "five",
            "6": "six",
            "7": "seven",
            "8": "eight",
            "9": "nine",
            "nonbreakingspace": " ",
        }
        new_cmap_inverted_dict = {v: k for k, v in new_cmap.items()}
        new_cmap_str = ''
        for char in input_string:
            if char in fft_mapping:
                char = fft_mapping[char]
            if char == " ":
                char = "nonbreakingspace"
            char = chr(new_cmap_inverted_dict[char])
            new_cmap_str += char
        return new_cmap_str

    def update_cmap_table(font, new_cmap):
        new_cmap_table = newTable('cmap')
        new_cmap_table.tableVersion = 0
        new_cmap_table.tables = []
        subtable = CmapSubtable.newSubtable(4)
        subtable.platformID = 3
        subtable.platEncID = 1
        subtable.language = 0
        subtable.cmap = new_cmap
        new_cmap_table.tables.append(subtable)
        font['cmap'] = new_cmap_table

    def modify_glyph_coordinates(font):
        glyf_table = font['glyf']
        # 修改字型的坐标
        for glyph_name in font.getGlyphOrder():
            if glyph_name in [".null", ".null#1", "nonbreakingspace", ".notdef"]:
                continue
            glyph = glyf_table[glyph_name]
            new_coordinates = [(x, y + random.randint(-5, 5)) for x, y in glyph.coordinates]
            pen = TTGlyphPen(glyf_table)
            pen.moveTo(new_coordinates[0])
            for coord in new_coordinates[1:]:
                pen.lineTo(coord)
            pen.closePath()
            glyf_table[glyph_name] = pen.glyph()

    def remove_xml_comments(root):
        # 递归删除所有的注释
        for element in list(root):
            if isinstance(element.tag, str) and element.tag == 'comment':
                root.remove(element)
            else:
                remove_xml_comments(element)

    def modify_xml_mapping(xml_bytesIO):

        replace_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                        'T',
                        'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'at', 'b', 'c', 'd', 'e', 'eight', 'f', 'five', 'four', 'g',
                        'h',
                        'i', 'j', 'k', 'l', 'm', 'n', 'nine', 'nonbreakingspace', 'o', 'one', 'p', 'period', 'q', 'r',
                        's',
                        'seven', 'six', 't', 'three', 'two', 'u', 'v', 'w', 'x', 'y', 'z', 'zero']
        xml_str = xml_bytesIO.read().decode("utf-8")
        for num, char in enumerate(replace_list):
            xml_str = xml_str.replace(f'name="{char}"', f'name="{num}"')
        xml_bytesIO.seek(0)
        xml_bytesIO.write(xml_str.encode())

    def import_xml_to_font(xml_bytesIO, output_filename):
        # 从 XML 文件中导入字体并保存为 TTF 文件
        xml_bytesIO.seek(0)
        font = TTFont()
        font.importXML(xml_bytesIO)

        font_bytesIO = BytesIO()
        font.save(font_bytesIO)
        font_bytesIO.seek(0)
        return font_bytesIO.read()

    def product_ttf():
        font = TTFont("/AntiSpider/sec3/Courier New.ttf")
        cmap = font['cmap'].getBestCmap()
        new_cmap = randomize_cmap(cmap)

        update_cmap_table(font, new_cmap)

        # 修改字体文件的坐标
        modify_glyph_coordinates(font)

        font_io = BytesIO()
        font.save(font_io)
        font_io.seek(0)

        xml_io = BytesIO()
        font.saveXML(xml_io)
        xml_io.seek(0)

        # 删除XML中的注释
        tree = ET.parse(xml_io)
        root = tree.getroot()
        remove_xml_comments(root)

        xml_bytes = BytesIO()
        tree.write(xml_bytes)
        xml_bytes.seek(0)

        # 修改XML映射
        modify_xml_mapping(xml_bytes)

        font_bytes = import_xml_to_font(xml_bytes, "Courier Ner Cmap update.ttf")
        base64_font = base64.b64encode(font_bytes).decode()
        return base64_font, new_cmap

    # 生成新的字符映射
    base64_font, new_cmap = product_ttf()

    page = int(request.POST.get("page"))
    with open("/AntiSpider/sec2/utils/data.json") as f:
        data_list = json.loads(f.read())["pages"][page - 1]['data']
        for index, data in enumerate(data_list):
            data_list[index]["name"] = map_string(data["name"], new_cmap)
            data_list[index]["email"] = map_string(data["email"], new_cmap)
        return JsonResponse({"data": data_list, "total": 25, "b64Font": base64_font})