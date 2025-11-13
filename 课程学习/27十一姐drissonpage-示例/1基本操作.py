# 导入
from DrissionPage import Chromium

# 连接浏览器
browser = Chromium()
# 获取标签页对象
tab = browser.latest_tab
# 访问网页
tab.get('https://www.baidu.com')
# 获取文本框元素对象
ele = tab.ele('#kw')
# 向文本框元素对象输入文本
ele.input('DrissionPage')
# 点击按钮，上两行的代码可以缩写成这样
tab('#chat-submit-button').click()
# 获取所有<h3>元素
links = tab.eles('tag:h3')
# 遍历并打印结果
for link in links:
    print(link.text)


# 2、tab对象
from DrissionPage import Chromium
browser = Chromium()  # 创建浏览器对象
browser.set.retry_times(10)  # 设置整体运行参数
tab = browser.latest_tab  # 获取Tab对象
browser.quit()  # 关闭浏览器

