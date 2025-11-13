from DrissionPage import Chromium, ChromiumOptions

# 创建配置对象（默认从 ini 文件中读取配置）
co = ChromiumOptions()
# 设置不加载图片、静音
co.no_imgs(True).mute(True)

# 以该配置创建页面对象
page = Chromium(addr_or_opts=co)


from DrissionPage import  Chromium, ChromiumOptions

co = ChromiumOptions()
co.incognito()  # 匿名模式
co.headless()  # 无头模式
co.set_argument('--no-sandbox')  # 无沙盒模式

page = Chromium(co)

# 设置启动时最大化
co.set_argument('--start-maximized')
# 设置初始窗口大小
co.set_argument('--window-size', '800,600')
# 使用来宾模式打开浏览器
co.set_argument('--guest')