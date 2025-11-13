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