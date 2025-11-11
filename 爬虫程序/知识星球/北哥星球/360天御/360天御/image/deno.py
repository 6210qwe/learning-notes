from captcha_recognizer.recognizer import Recognizer

# source传入图片路径, verbose=False表示关闭冗余输出
recognizer = Recognizer()
box, confidence = recognizer.identify_gap(source='D:/逆向练手/滑块类/360天御/image/new.png', verbose=False)

print(f'缺口坐标: {box[0]}')
print(f'可信度: {confidence}')