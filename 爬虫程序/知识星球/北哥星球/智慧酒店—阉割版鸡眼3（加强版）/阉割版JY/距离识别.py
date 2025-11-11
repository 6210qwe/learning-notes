import cv2
import numpy as np
from PIL import Image
import io
import base64 # 尽管现在支持本地路径，但保留以防你需要测试base64

class SliderMatcher:
    def get_target(self, img_bytes: bytes = None):
        try:
            image = Image.open(io.BytesIO(img_bytes))
            w, h = image.size
            starttx = 0
            startty = 0
            end_x = 0
            end_y = 0
            found_alpha = False
            for y in range(h):
                row_has_alpha = False
                for x in range(w):
                    p = image.getpixel((x, y))
                    if len(p) == 4 and p[-1] < 255:
                        row_has_alpha = True
                        found_alpha = True
                        if startty == 0:
                            startty = y
                        break
                if found_alpha and not row_has_alpha and end_y == 0 and startty != 0:
                    end_y = y
                    break
                elif found_alpha and y == h - 1 and end_y == 0:
                    end_y = h

            found_alpha_in_row = False
            for x in range(w):
                col_has_alpha = False
                for y in range(h):
                    p = image.getpixel((x, y))
                    if len(p) == 4 and p[-1] < 255:
                        col_has_alpha = True
                        found_alpha_in_row = True
                        if starttx == 0:
                            starttx = x
                        break
                if found_alpha_in_row and not col_has_alpha and end_x == 0 and starttx != 0:
                    end_x = x
                    break
                elif found_alpha_in_row and x == w - 1 and end_x == 0:
                    end_x = w

            if end_x == 0 and starttx != 0:
                end_x = w
            if end_y == 0 and startty != 0:
                end_y = h

            if starttx >= end_x or startty >= end_y:
                return None, 0, 0

            return image.crop([starttx, startty, end_x, end_y]), starttx, startty
        except Exception as e:
            # print(f"Error in get_target: {e}")
            return None, 0, 0

    def _decode_base64_to_image(self, base64_string):
        try:
            image_data = base64.b64decode(base64_string)
            img_array = np.frombuffer(image_data, np.uint8)
            return cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)
        except Exception as e:
            print(f"Error decoding base64: {e}")
            return None

    def _read_image_from_path(self, path):
        try:
            # cv2.imread可以直接从文件路径读取图片
            img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
            if img is None:
                print(f"Error: Could not read image from path: {path}")
            return img
        except Exception as e:
            print(f"Error reading image from path '{path}': {e}")
            return None


    def Slider_Match(self, target_input: str = None, background_input: str = None,
                     is_local_path: bool = False, simple_target: bool = False, flag: bool = False):
        """
        Performs slider matching.

        Args:
            target_input (str): The target image data (base64 string or local file path).
            background_input (str): The background image data (base64 string or local file path).
            is_local_path (bool): True if target_input and background_input are local file paths, False if they are base64 strings.
            simple_target (bool): If True, treats the target as a direct image without alpha channel extraction.
            flag (bool): If True, raises exceptions on failure instead of retrying with simple_target.

        Returns:
            dict: A dictionary containing 'target_x', 'target_y', and 'target' (bounding box).
        """

        if is_local_path:
            target_image = self._read_image_from_path(target_input)
            background = self._read_image_from_path(background_input)
        else:
            target_image = self._decode_base64_to_image(target_input)
            background = self._decode_base64_to_image(background_input)

        if not simple_target:
            if target_image is None:
                if flag:
                    raise ValueError("Failed to decode/read target image.")
                return self.Slider_Match(target_input=target_input,
                                         background_input=background_input,
                                         is_local_path=is_local_path, # 注意这里的参数名改变
                                         simple_target=True, flag=True)
            try:
                # 转换OpenCV图像到PIL图像以进行alpha通道处理
                pil_image_from_cv2 = Image.fromarray(cv2.cvtColor(target_image, cv2.COLOR_BGR2RGB))

                img_byte_arr = io.BytesIO()
                pil_image_from_cv2.save(img_byte_arr, format='PNG')
                img_bytes_for_pil = img_byte_arr.getvalue()

                target_pil, target_x, target_y = self.get_target(img_bytes_for_pil)
                if target_pil is None:
                    if flag:
                        raise ValueError("Failed to extract target from image.")
                    return self.Slider_Match(target_input=target_input,
                                             background_input=background_input,
                                             is_local_path=is_local_path, # 注意这里的参数名改变
                                             simple_target=True, flag=True)
                target = cv2.cvtColor(np.asarray(target_pil), cv2.COLOR_RGB2BGR)
            except Exception as e:
                if flag:
                    raise e
                return self.Slider_Match(target_input=target_input,
                                         background_input=background_input,
                                         is_local_path=is_local_path, # 注意这里的参数名改变
                                         simple_target=True, flag=True)
        else:
            target = target_image
            if target is None:
                return {"target_x": 0, "target_y": 0, "target": [0, 0, 0, 0]}
            target_y = 0
            target_x = 0

        if background is None:
            return {"target_x": target_x, "target_y": target_y, "target": [0, 0, 0, 0]}

        if target is None or background is None:
            return {"target_x": 0, "target_y": 0, "target": [0, 0, 0, 0]}

        background_gray = cv2.cvtColor(background, cv2.COLOR_BGR2GRAY)
        target_gray = cv2.cvtColor(target, cv2.COLOR_BGR2GRAY)

        background_canny = cv2.Canny(background_gray, 100, 200)
        target_canny = cv2.Canny(target_gray, 100, 200)

        background_rgb = cv2.cvtColor(background_canny, cv2.COLOR_GRAY2BGR)
        target_rgb = cv2.cvtColor(target_canny, cv2.COLOR_GRAY2BGR)

        res = cv2.matchTemplate(background_rgb, target_rgb, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
        h, w = target_rgb.shape[:2]
        bottom_right = (max_loc[0] + w, max_loc[1] + h)

        return {"target_x": target_x,
                "target_y": target_y,
                "target": [int(max_loc[0]), int(max_loc[1]), int(bottom_right[0]), int(bottom_right[1])]}

# --- 测试部分 ---
if __name__ == "__main__":
    matcher = SliderMatcher()

    target_path = "/Users/dai/PycharmProjects/PythonProject/阉割版JY/sliceUrl.png"
    background_path = "/Users/dai/PycharmProjects/PythonProject/阉割版JY/output_path.jpg"

    print("--- 测试从本地路径加载图片 ---")
    try:
        result_local = matcher.Slider_Match(
            target_input=target_path,
            background_input=background_path,
            is_local_path=True # 设置为True表示输入是本地路径
        )
        print("本地路径匹配结果:", result_local)

        # 可以在这里进一步处理结果，例如在背景图片上绘制找到的矩形
        if background_path:
            background_img = matcher._read_image_from_path(background_path) # 读取本地背景图
            if background_img is not None and result_local['target'][2] != 0: # 检查是否找到了匹配
                x1, y1, x2, y2 = result_local['target']
                cv2.rectangle(background_img, (x1, y1), (x2, y2), (0, 255, 0), 2) # 绘制绿色矩形
                # cv2.imshow("Match Result (Local Path)", background_img)
                # cv2.waitKey(0)
                # cv2.destroyAllWindows()
                print("已在背景图上标记匹配区域（如果成功找到）")
            else:
                print("未在背景图上标记匹配区域，可能未找到匹配或图片加载失败。")

    except ValueError as e:
        print(f"本地路径匹配错误: {e}")
    except Exception as e:
        print(f"本地路径匹配发生未预期错误: {e}")

