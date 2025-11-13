from threading import Thread

from DrissionPage import ChromiumPage, ChromiumOptions
from DataRecorder import Recorder


def collect(page, recorder, title):
    """用于采集的方法
    :param page: ChromiumTab 对象
    :param recorder: Recorder 记录器对象
    :param title: 类别标题
    :return: None
    """
    num = 1  # 当前采集页数
    while True:
        # 遍历所有标题元素
        for i in page.eles('.title project-namespace-path'):
            # 获取某页所有库名称，记录到记录器
            recorder.add_data((title, i.text, num))

        # 如果有下一页，点击翻页
        btn = page('@rel=next', timeout=2)
        if btn:
            btn.click(by_js=True)
            page.wait.load_start()
            num += 1

        # 否则，采集完毕
        else:
            break

    recorder.record()  # 把数据记录到文件


def main():
    # 创建配置对象，并设置自动分配端口
    co = ChromiumOptions().auto_port()
    # 新建2个页面对象，自动分配端口的配置对象能共用，但指定端口的不可以
    page1 = ChromiumPage(co)
    page2 = ChromiumPage(co)
    # 第一个浏览器访问第一个网址
    page1.get('https://gitee.com/explore/ai')

    # 第二个浏览器访问另一个网址
    page2.get('https://gitee.com/explore/machine-learning')

    # # 新建记录器对象
    # recorder = Recorder('data.csv')
    #
    # # 多线程同时处理多个页面
    # Thread(target=collect, args=(page1, recorder, 'ai')).start()
    # Thread(target=collect, args=(page2, recorder, '机器学习')).start()


if __name__ == '__main__':
    main()