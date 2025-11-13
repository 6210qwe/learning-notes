import time

from DrissionPage import Chromium, ChromiumOptions
# 配置相关信息
co = ChromiumOptions().headless()
co.auto_port()
# 添加代理插件
co.add_extension(r'D:\proxy_plugin') # r'F:\proxy_plugin'换成你的插件位置

# 生成浏览器对象
browser = Chromium(co)
tab = browser.latest_tab

# # 打开插件
tab.get('chrome-extension://fblccodnnbodapdnpcehbpceenjkllpi/options.html')
tab.ele('x://*[@id="quickProxyUrl"]').input("http://t13632437348639:10cc7lx7@g184.kdltps.com:15818", clear=True)  # 换你的ip
button = tab.eles('text:快速设置')[1]
print(button)
button.click()

# 看当前ip信息
tab.get('http://httpbin.org/get')
time.sleep(5)
print(tab.html)
