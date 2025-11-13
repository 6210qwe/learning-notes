from DrissionPage import Chromium

tab = Chromium().latest_tab
# tab.get('https://gitee.com/explore/all')

# links = tab.eles('t:h3')
# for link in links[:-1]:
#     # 点击链接并获取新标签页对象
#     new_tab = link.click.for_new_tab()
#     # 等待新标签页加载
#     new_tab.wait.load_start()
#     # 打印标签页标题
#     print(new_tab.title)
#     # 关闭新打开的标签页
#     new_tab.close()