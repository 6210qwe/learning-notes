#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
from PIL import Image, ImageDraw, ImageFont
import io
import requests
import uuid
from datetime import datetime
import tempfile
import shutil
import base64
from Crypto.Cipher import AES
from ultralytics import YOLO
import contextlib
import numpy as np
import concurrent.futures
from typing import List, Dict, Optional, Tuple, Union
from loguru import logger
import sys

# 配置loguru
logger.remove()  # 移除默认的控制台输出
logger.add(sys.stdout, 
           format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
           level="INFO")

# 可以选择性地添加文件输出
# logger.add("captcha_solver.log", rotation="1 MB", retention="10 days", level="DEBUG")

class StandaloneCaptchaSolver:
    # 全局headers
    GLOBAL_HEADERS = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Referer': 'https://servicewechat.com/wx9088f94e54afa483/4/page-frame.html',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b13) XWEB/9129',
        'xweb_xhr': '1'
    }
    # 模型默认顶部加载
    _MODEL = None
    _MODEL_PATH = "best.pt"
    _MODEL_LOADED = False
    # 全局HTTP会话，用于连接复用
    _SESSION = None

    @classmethod
    def _load_model(cls, model_path=None):
        if cls._MODEL_LOADED:
            logger.debug("模型已加载，跳过重复加载")
            return
        if model_path is None:
            model_path = cls._MODEL_PATH
        if not os.path.exists(model_path):
            model_path = "yolov8_captcha_dataset/runs/yolov8n_captcha/weights/best.pt"
        
        logger.info(f"开始加载YOLO模型: {model_path}")
        try:
            # os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
            cls._MODEL = YOLO(model_path)
            cls._MODEL_LOADED = True
            logger.success(f"模型加载成功: {model_path}")
        except Exception as e:
            logger.error(f"模型加载失败: {e}")
            raise

    @classmethod
    def get_session(cls):
        """获取或创建全局HTTP会话"""
        if cls._SESSION is None:
            logger.info("创建新的HTTP会话")
            # 创建新会话并配置连接池
            cls._SESSION = requests.Session()
            # 设置连接池参数
            adapter = requests.adapters.HTTPAdapter(
                pool_connections=20,  # 连接池大小
                pool_maxsize=20,      # 每个连接的最大请求数
                max_retries=3         # 请求失败后的重试次数
            )
            cls._SESSION.mount('http://', adapter)
            cls._SESSION.mount('https://', adapter)
            # 设置全局headers
            cls._SESSION.headers.update(cls.GLOBAL_HEADERS)
            logger.debug("HTTP会话配置完成")
        return cls._SESSION

    def __init__(self, model_path=None, confidence=0.1, proxy=None):
        """
        初始化验证码识别器
        :param model_path: YOLOv8模型路径
        :param confidence: 置信度阈值
        :param proxy: 代理设置（dict或None）
        """
        logger.info("初始化验证码识别器")
        self.proxy = proxy
        self.confidence = confidence
        self.temp_dir = None  # 不再创建临时目录
        self.current_captcha_data = None
        self.current_captcha_image = None
        self.target_chars = []
        self.current_detections = []
        self.current_image_path = None
        self.current_image_bytes = None  # 新增: 用于存储图片字节数据
        self.text_map = {
            1: "霆", 2: "琛", 3: "玉", 4: "击", 5: "克", 6: "风", 7: "雅", 8: "颂", 9: "加", 10: "载", 11: "验", 12: "证", 13: "滑", 14: "弹", 15: "汉", 16: "中", 17: "国", 18: "家", 19: "电", 20: "信"
        }
        
        logger.debug(f"初始化参数: confidence={confidence}, proxy={'已设置' if proxy else '未设置'}")
        
        # 加载模型
        self._load_model(model_path)
        self.model = self._MODEL
        # 获取HTTP会话
        self.session = self.get_session()
        
        logger.success("验证码识别器初始化完成")
        
    def get_verification_code(self):
        """
        获取验证码信息
        返回验证码图片列表和randStr
        """
        url = 'https://outletsyy-restapi.badaling-outlets.com/bvcztp/ctc/getCode'
        logger.info("开始获取验证码")
        try:
            # 使用会话发送请求
            response = self.session.get(url, proxies=self.proxy, timeout=10)
            response.raise_for_status()
            data = response.json()
            base_url = "https://outletsyy-restapi.badaling-outlets.com"
            if "iconList" in data:
                data["iconList"] = [f"{base_url}{icon}" for icon in data["iconList"]]
            
            logger.success(f"验证码获取成功, 图片数量: {len(data.get('iconList', []))}")
            logger.debug(f"验证码数据: {data}")
            return {"success": True, "data": data}
        except Exception as e:
            logger.error(f"获取验证码失败: {e}")
            return {"success": False, "error": str(e)}
            
    def get_verification_chars(self, title_image_indices):
        """
        根据索引获取对应的验证码汉字
        :param title_image_indices: 验证码索引列表，例如 [15, 18, 1]
        :return: 对应的汉字列表，例如 ["汉", "家", "霆"]
        """
        logger.debug(f"获取验证码汉字, 索引: {title_image_indices}")
        # 根据索引获取对应的汉字
        result = []
        for index in title_image_indices:
            if index in self.text_map:
                result.append(self.text_map[index])
            else:
                logger.warning(f"未知字符索引: {index}")
                result.append(f"未知字符({index})")
        
        logger.info(f"目标字符: {result}")
        return result
    
    def aes_encrypt_ecb(self, text, key="BOT_ctyun@929.12"):
        """
        AES ECB模式加密
        :param text: 需要加密的文本
        :param key: 密钥，默认为 'BOT_ctyun@929.12'
        :return: 加密后的字符串（Base64编码）
        """
        logger.debug(f"开始AES加密: {text}")
        # 处理密钥，确保长度为16字节（128位）
        key_bytes = key.encode('utf-8')
        # 如果密钥长度不足16字节，进行填充；如果超过，则截取前16字节
        key_bytes = key_bytes[:16] if len(key_bytes) >= 16 else key_bytes + (16 - len(key_bytes)) * b'\0'
        
        # 处理文本，进行PKCS#7填充
        text_bytes = text.encode('utf-8')
        padding_size = AES.block_size - (len(text_bytes) % AES.block_size)
        text_bytes += bytes([padding_size]) * padding_size
        
        # 创建AES加密器，使用ECB模式
        cipher = AES.new(key_bytes, AES.MODE_ECB)
        
        # 加密
        encrypted_bytes = cipher.encrypt(text_bytes)
        
        # 将加密结果转换为Base64编码
        encrypted_base64 = base64.b64encode(encrypted_bytes).decode('utf-8')
        
        logger.debug("AES加密完成")
        return encrypted_base64
            
    def get_captcha(self):
        """
        获取新的验证码
        
        返回:
            成功返回True，失败返回False
        """
        logger.info("开始获取验证码")
        try:
            # 获取验证码
            captcha_result = self.get_verification_code()
            
            if not captcha_result["success"]:
                logger.error("获取验证码失败")
                return False
                
            # 保存验证码数据
            self.current_captcha_data = captcha_result["data"]
            
            # 获取图片URL列表
            image_urls = self.current_captcha_data.get("iconList", [])
            if not image_urls:
                logger.error("验证码图片URL为空")
                return False
                
            # 获取需要识别的字符
            title_image_indices = self.current_captcha_data.get("titleImage", [])
            if not title_image_indices:
                logger.error("验证码目标字符索引为空")
                return False
                
            self.target_chars = self.get_verification_chars(title_image_indices)
            
            # 叠加图片
            logger.info("开始叠加验证码图片")
            overlaid_image = self.overlay_images(image_urls)
            if overlaid_image is None:
                logger.error("图片叠加失败")
                return False
                
            # 保存当前图片到内存
            self.current_captcha_image = overlaid_image
            
            # 将图像转换为字节，而不是保存到文件
            img_byte_arr = io.BytesIO()
            overlaid_image.save(img_byte_arr, format='JPEG', quality=95)
            self.current_image_bytes = img_byte_arr.getvalue()
            
            logger.success("验证码获取成功")
            return True
            
        except Exception as e:
            logger.error(f"获取验证码过程中发生异常: {e}")
            return False
            
    def overlay_images(self, image_urls, output_size=(300, 150), bg_color=(255, 255, 255), opacity_levels=None):
        """
        将多张图片叠加在一起，使用并发下载提高速度
        
        参数:
            image_urls: 图片URL列表
            output_size: 输出图片的尺寸，默认为(300, 150)与原始验证码识别一致
            bg_color: 背景颜色，默认为白色(255,255,255)
            opacity_levels: 每张图片的透明度列表，如果为None，则使用默认透明度
            
        返回:
            叠加后的PIL图像对象
        """
        logger.info(f"开始叠加{len(image_urls)}张图片")
        # 设置透明度，第一张图完全不透明，后续图片半透明
        if opacity_levels is None:
            opacity_levels = [1.0] + [0.5] * (len(image_urls) - 1)
            
        if len(image_urls) != len(opacity_levels):
            logger.error(f"图片数量({len(image_urls)})与透明度数量({len(opacity_levels)})不匹配")
            return None
            
        try:
            # 定义下载单个图片的函数
            def download_image(url_idx_tuple):
                idx, url = url_idx_tuple
                try:
                    # 使用会话对象下载
                    response = self.session.get(url, timeout=10, proxies=self.proxy)
                    response.raise_for_status()
                    img_data = response.content
                    logger.debug(f"图片{idx}下载成功")
                    return idx, img_data
                except Exception as e:
                    logger.error(f"图片{idx}下载失败: {e}")
                    return idx, None
            
            # 并发下载所有图片
            downloaded_images = []
            with concurrent.futures.ThreadPoolExecutor(max_workers=min(len(image_urls), 10)) as executor:
                # 提交所有下载任务
                future_to_url = {executor.submit(download_image, (i, url)): i 
                                for i, url in enumerate(image_urls)}
                
                # 获取结果
                for future in concurrent.futures.as_completed(future_to_url):
                    idx, img_data = future.result()
                    if img_data:
                        downloaded_images.append((idx, img_data))
            
            # 检查是否所有图片都下载成功
            if len(downloaded_images) != len(image_urls):
                logger.error(f"部分图片下载失败，成功: {len(downloaded_images)}/{len(image_urls)}")
                return None
                
            # 按原始顺序排序下载的图片
            downloaded_images.sort(key=lambda x: x[0])
            
            # 处理第一张图片
            first_img = Image.open(io.BytesIO(downloaded_images[0][1])).convert("RGBA")
            width, height = first_img.size
            
            # 创建结果图像，使用白色背景
            result = Image.new("RGBA", (width, height), bg_color)
            result = Image.alpha_composite(result, Image.blend(
                Image.new("RGBA", first_img.size, (0, 0, 0, 0)),
                first_img,
                opacity_levels[0]
            ))
            
            # 叠加其余图片
            for i in range(1, len(downloaded_images)):
                try:
                    img_data = downloaded_images[i][1]
                    img = Image.open(io.BytesIO(img_data)).convert("RGBA")
                    
                    if img.size != first_img.size:
                        img = img.resize(first_img.size)
                        
                    transparent_layer = Image.blend(
                        Image.new("RGBA", img.size, (0, 0, 0, 0)),
                        img,
                        opacity_levels[i]
                    )
                    
                    result = Image.alpha_composite(result, transparent_layer)
                    logger.debug(f"图片{i}叠加完成")
                except Exception as e:
                    logger.error(f"图片{i}叠加失败: {e}")
                    continue
                    
            # 调整尺寸并转换为RGB
            result = result.resize(output_size, Image.LANCZOS)
            logger.success(f"图片叠加完成，最终尺寸: {output_size}")
            return result.convert("RGB")
            
        except Exception as e:
            logger.error(f"图片叠加过程中发生异常: {e}")
            return None
            
    def draw_detection_results(self, save_path=None, show_image=True):
        """
        在图片上绘制检测结果
        :param save_path: 保存路径，如果为None则不保存
        :param show_image: 是否显示图片
        :return: 绘制了检测结果的PIL图像对象
        """
        if self.current_captcha_image is None or not self.current_detections:
            logger.warning("没有当前图片或检测结果可以绘制")
            return None
            
        logger.info("开始绘制检测结果")
        
        # 复制原图像
        result_image = self.current_captcha_image.copy()
        draw = ImageDraw.Draw(result_image)
        
        try:
            # 尝试加载字体，如果失败则使用默认字体
            try:
                # 尝试加载中文字体
                font_size = 16
                font = ImageFont.truetype("simhei.ttf", font_size)
            except:
                try:
                    # 尝试加载系统默认字体
                    font = ImageFont.load_default()
                except:
                    font = None
                    
            # 颜色定义
            target_color = (255, 0, 0)  # 红色 - 目标字符
            normal_color = (0, 255, 0)  # 绿色 - 普通字符
            text_color = (255, 255, 255)  # 白色 - 文字
            bg_color = (0, 0, 0)  # 黑色 - 文字背景
            
            # 获取目标字符列表
            target_chars_set = set(self.target_chars) if self.target_chars else set()
            
            # 绘制每个检测结果
            for detection in self.current_detections:
                bbox = detection["bbox"]
                class_name = detection["class_name"]
                
                # 判断是否为目标字符
                is_target = class_name in target_chars_set
                box_color = target_color if is_target else normal_color
                
                # 绘制边界框
                draw.rectangle(bbox, outline=box_color, width=2)
                
                # 在框的左上角绘制文字标签
                text_x = bbox[0]
                text_y = bbox[1] - 20 if bbox[1] > 20 else bbox[1] + 2
                
                # 绘制文字背景
                if font:
                    # 获取文字尺寸
                    try:
                        bbox_text = draw.textbbox((text_x, text_y), class_name, font=font)
                        text_width = bbox_text[2] - bbox_text[0]
                        text_height = bbox_text[3] - bbox_text[1]
                    except:
                        text_width = len(class_name) * 12
                        text_height = 16
                else:
                    text_width = len(class_name) * 12
                    text_height = 16
                
                # 绘制文字背景矩形
                draw.rectangle([text_x-2, text_y-2, text_x+text_width+2, text_y+text_height+2], 
                             fill=bg_color, outline=box_color)
                
                # 绘制文字
                if font:
                    draw.text((text_x, text_y), class_name, fill=text_color, font=font)
                else:
                    draw.text((text_x, text_y), class_name, fill=text_color)
                
                logger.debug(f"绘制检测结果: {class_name}, 目标字符: {is_target}")
            
            # 保存图片
            if save_path:
                result_image.save(save_path, quality=95)
                logger.success(f"检测结果图片已保存到: {save_path}")
            
            # 显示图片
            if show_image:
                try:
                    result_image.show()
                    logger.info("检测结果图片已显示")
                except Exception as e:
                    logger.warning(f"无法显示图片: {e}")
            
            logger.success("检测结果绘制完成")
            return result_image
            
        except Exception as e:
            logger.error(f"绘制检测结果时发生错误: {e}")
            return None
    
    def save_detection_result(self, save_dir="detection_results"):
        """
        保存检测结果图片到指定目录
        :param save_dir: 保存目录
        :return: 保存的文件路径
        """
        if not os.path.exists(save_dir):
            os.makedirs(save_dir)
            logger.info(f"创建保存目录: {save_dir}")
        
        # 生成文件名
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"captcha_result_{timestamp}.jpg"
        file_path = os.path.join(save_dir, filename)
        
        # 绘制并保存结果
        result_image = self.draw_detection_results(save_path=file_path, show_image=False)
        
        if result_image:
            return file_path
        else:
            return None

    def detect_image(self):
        """
        识别当前验证码图片
        
        返回:
            成功返回True，失败返回False
        """
        if self.current_image_bytes is None:
            logger.error("当前图片字节数据为空")
            return False
            
        logger.info("开始识别验证码图片")
        try:
            # 直接从内存中读取图像并进行推理
            img = Image.open(io.BytesIO(self.current_image_bytes))
            
            # 转换为numpy数组
            img_array = np.array(img)
            
            # 使用模型直接处理numpy数组
            with contextlib.redirect_stdout(open(os.devnull, 'w')):
                results = self.model(img_array, conf=self.confidence)
            detections = []
            
            if len(results) > 0:
                # 获取检测框和类别
                boxes = results[0].boxes
                
                # 处理每个检测结果
                for i, box in enumerate(boxes):
                    cls_id = int(box.cls[0].item())
                    conf = float(box.conf[0].item())
                    coords = box.xyxy[0].tolist()
                    
                    # 计算中心点坐标
                    center_x = int((coords[0] + coords[2]) / 2)
                    center_y = int((coords[1] + coords[3]) / 2)
                    
                    # 获取类别名称（汉字）
                    class_name = results[0].names[cls_id] if cls_id in results[0].names else f"未知({cls_id})"
                    
                    detections.append({
                        "class_id": cls_id,
                        "class_name": class_name,
                        "confidence": conf,
                        "bbox": [int(c) for c in coords],
                        "center": [center_x, center_y]
                    })
                    
                    logger.debug(f"检测到字符: {class_name}, 置信度: {conf:.3f}, 中心点: ({center_x}, {center_y})")
                    
                # 按从左到右排序
                detections.sort(key=lambda x: x["bbox"][0])
                
                # 保存当前检测结果
                self.current_detections = detections
                
                logger.success(f"验证码识别完成，检测到{len(detections)}个字符")
                
                # 自动绘制和保存检测结果
                self.save_detection_result()
                
                return True
                
            else:
                self.current_detections = []
                logger.warning("未检测到任何字符")
                return False
                
        except Exception as e:
            logger.error(f"验证码识别过程中发生异常: {e}")
            self.current_detections = []
            return False
            
    def print_recognition_results(self):
        """打印识别结果"""
        if not self.current_detections:
            logger.warning("没有识别结果可以打印")
            return
            
        # 按从左到右排序
        sorted_detections = sorted(self.current_detections, key=lambda x: x["bbox"][0])
        
        chars = []
        for det in sorted_detections:
            char = det["class_name"]
            conf = det["confidence"]
            center = det["center"]
            chars.append(char)
            
        logger.info(f"识别结果: {''.join(chars)}")
            
    def get_target_positions(self):
        """
        获取目标字符的中心点坐标
        
        返回:
            目标字符的中心点坐标列表，如果未找到则返回None
        """
        if not self.target_chars or not self.current_detections:
            logger.error("目标字符或检测结果为空")
            return None
            
        # 创建字符到坐标的映射
        char_to_position = {}
        for det in self.current_detections:
            char_to_position[det["class_name"]] = det["center"]
            
        # 获取目标字符的坐标
        positions = []
        for char in self.target_chars:
            if char in char_to_position:
                positions.append(char_to_position[char])
                logger.debug(f"找到目标字符 '{char}' 的坐标: {char_to_position[char]}")
            else:
                logger.warning(f"未找到目标字符 '{char}' 的坐标")
                positions.append(None)
                
        return positions
        
    def verify_captcha(self, encrypted_positions, captcha_data):
        """
        提交验证码验证请求
        :param encrypted_positions: 加密后的坐标字符串
        :param captcha_data: 验证码数据
        :return: 验证结果
        """
        logger.info("开始提交验证码验证请求")
        json_data = {
            'deviceType': 'mobile',
            'userStr': encrypted_positions,
            'randStr': captcha_data.get('randStr', []),
            'captchaMode': captcha_data.get('captchaMode', 'TEXT_CLICK_VERIFICATION_CODE'),
        }
        
        logger.debug(f"验证请求数据: {json_data}")
        
        try:
            # 使用会话发送请求
            response = self.session.post(
                'https://outletsyy-restapi.badaling-outlets.com/bvcztp/ctc/verification',
                json=json_data,
                proxies=self.proxy,
                timeout=10
            )
            response.raise_for_status()
            result = response.json()
            
            logger.success(f"验证请求成功，状态码: {response.status_code}")
            logger.debug(f"验证响应: {result}")
            
            return {
                "success": True,
                "verification_result": result,
                "status_code": response.status_code
            }
        except Exception as e:
            logger.error(f"验证请求失败: {e}")
            return {
                "success": False,
                "error": f"验证请求失败: {str(e)}"
            }
        
    def submit_verification(self):
        """
        提交验证码验证
        
        返回:
            验证结果字典
        """
        if not self.current_captcha_data:
            logger.error("提交验证失败: 请先获取验证码")
            return {"success": False, "error": "请先获取验证码"}
            
        if not self.current_detections:
            logger.error("提交验证失败: 请先识别验证码")
            return {"success": False, "error": "请先识别验证码"}
            
        logger.info("开始提交验证码验证")
        try:
            target_positions = self.get_target_positions()
            
            if not target_positions or None in target_positions:
                logger.error("未能找到所有目标字符的坐标")
                return {"success": False, "error": "未能找到所有目标字符的坐标"}
                
            # 创建坐标数组
            coords_array = [{"x": pos[0], "y": pos[1]} for pos in target_positions]
            
            # 将坐标转换为无空格的JSON字符串
            positions_json = json.dumps(coords_array, separators=(',', ':'))
            logger.debug(f"坐标JSON: {positions_json}")
            
            # 加密坐标
            encrypted_positions = self.aes_encrypt_ecb(positions_json)
            
            # 提交验证
            verification_result = self.verify_captcha(encrypted_positions, self.current_captcha_data)
            
            if verification_result["success"]:
                logger.success("验证码验证成功")
            else:
                logger.error("验证码验证失败")
            
            return verification_result
                
        except Exception as e:
            logger.error(f"提交验证失败: {e}")
            return {"success": False, "error": f"提交验证失败: {str(e)}"}
            
    def process_full_verification(self):
        """
        完整的验证码处理流程，包括获取、识别和验证
        
        返回:
            验证结果字典
        """
        import time
        start_time = time.time()
        
        logger.info("开始完整的验证码处理流程")
        
        with contextlib.redirect_stdout(open(os.devnull, 'w')):
            if not self.get_captcha():
                elapsed = int((time.time() - start_time) * 1000)
                logger.error(f"完整验证流程失败: 获取验证码失败 (耗时: {elapsed}ms)")
                return {"success": False, "error": "获取验证码失败", "elapsed_ms": elapsed}
            
            if not self.detect_image():
                elapsed = int((time.time() - start_time) * 1000)
                logger.error(f"完整验证流程失败: 识别验证码失败 (耗时: {elapsed}ms)")
                return {"success": False, "error": "识别验证码失败", "elapsed_ms": elapsed}
            
            result = self.submit_verification()
        
        elapsed = int((time.time() - start_time) * 1000)
        if isinstance(result, dict):
            result = dict(result)
            result["elapsed_ms"] = elapsed
            logger.success(f"完整验证流程完成 (耗时: {elapsed}ms)")
            return result
        
        logger.error(f"完整验证流程失败: 未知错误 (耗时: {elapsed}ms)")
        return {"success": False, "error": "未知错误", "elapsed_ms": elapsed}
        
    def __del__(self):
        """析构函数，不再需要清理临时文件"""
        pass

    @classmethod
    def verify(cls, username, password, ip, port, model_path=None, confidence=0.1):
        """
        标准类方法，执行完整验证码识别与校验流程。
        :param username: 代理用户名
        :param password: 代理密码
        :param ip: 代理IP
        :param port: 代理端口
        :param model_path: 模型路径
        :param confidence: 置信度
        :return: 校验结果字典
        """
        logger.info(f"开始验证流程，代理: {ip}:{port if ip and port else '无'}")
        
        if ip and port:
            if username and password:
                proxy_auth = f"{username}:{password}@"
            else:
                proxy_auth = ""
            proxy_str = f"http://{proxy_auth}{ip}:{port}"
            proxy = {"http": proxy_str, "https": proxy_str}
            logger.debug(f"使用代理: {proxy_str}")
        else:
            proxy = None
            logger.debug("未使用代理")
            
        solver = cls(model_path=model_path, confidence=confidence, proxy=proxy)
        return solver.process_full_verification()

    def _merge_headers(self, headers=None):
        """合并请求头"""
        merged = self.GLOBAL_HEADERS.copy()
        if headers:
            merged.update(headers)
        return merged


def main():
    """主函数，演示独立验证码识别器的使用"""
    logger.info("启动验证码识别器演示程序")
    
    try:
        logger.info("正在初始化验证码识别器...")
        solver = StandaloneCaptchaSolver()

        # 执行完整验证流程
        logger.info("开始执行完整验证流程...")
        result = solver.process_full_verification()

        # 输出最终结果
        logger.info("验证流程完成，结果如下:")
        logger.info(json.dumps(result, ensure_ascii=False, indent=2))

        # 显示检测结果图片
        if solver.current_detections:
            logger.info("显示检测结果图片...")
            solver.draw_detection_results(show_image=True)

        # 可以循环执行多次验证
        repeat = input("\n是否继续验证？(y/n): ").lower()
        while repeat == 'y':
            logger.info("开始新一轮验证...")
            result = solver.process_full_verification()
            logger.info("验证结果:")
            logger.info(json.dumps(result, ensure_ascii=False, indent=2))
            
            # 显示检测结果图片
            if solver.current_detections:
                logger.info("显示检测结果图片...")
                solver.draw_detection_results(show_image=True)
            
            repeat = input("\n是否继续验证？(y/n): ").lower()

        logger.info("验证码处理完成，程序结束")
        
    except KeyboardInterrupt:
        logger.warning("用户中断程序")
    except Exception as e:
        logger.error(f"程序运行异常: {e}")
        raise


if __name__ == "__main__":
    main()