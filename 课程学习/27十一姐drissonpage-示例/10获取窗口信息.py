from DrissionPage import Chromium, ChromiumOptions

co = ChromiumOptions()
co.set_argument('--start-maximized')
co.set_local_port(10001)
tab = Chromium(co).latest_tab
tab.set.load_mode.none()  # 设置加载模式为none

tab.listen.start('api/getkeydata')  # 指定监听目标并启动监听
tab.get('http://www.hao123.com/')  # 访问网站
packet = tab.listen.wait()  # 等待数据包
tab.stop_loading()  # 主动停止加载
print(packet.response.body)  # 打印数据包正文

print("页面大小:", tab.rect.size)
print("窗口大小:", tab.rect.window_size)
print("窗口在屏幕上的坐标，左上角为(0, 0):", tab.rect.window_location)
print("窗口当前状态，有'normal'、'fullscreen'、'maximized'、 'minimized'几种:", tab.rect.window_state)
print("返回视口大小，不含滚动条，格式：(宽, 高):", tab.rect.viewport_size)
print("浏览器窗口大小，含滚动条，格式：(宽, 高):", tab.rect.viewport_size_with_scrollbar)
print("页面左上角在屏幕中坐标，左上角为(0, 0):", tab.rect.page_location)
print("视口在屏幕中坐标，左上角为(0, 0):", tab.rect.viewport_location)
print("页面滚动条位置，格式：(x, y)", tab.rect.scroll_position)
