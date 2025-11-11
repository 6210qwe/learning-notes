import sys
from PyQt5.QtWidgets import QApplication, QMainWindow
# 假设上面的代码保存在名为python_editor.py的文件中
from python_code_editor import PythonCodeEditor  # 导入我们定义的代码编辑器组件


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        # 设置窗口标题和大小
        self.setWindowTitle('Python代码编辑器示例')
        self.setGeometry(100, 100, 800, 600)  # (x, y, 宽度, 高度)

        # 创建代码编辑器组件
        self.code_editor = PythonCodeEditor()

        # 设置一些初始代码到编辑器中
        initial_code = """这是一个简单的Python代码编辑器示例
# 在这里编写你的Python代码
def greet(name):
    return f"Hello, {name}!"

# 测试函数
print(greet("World"))

# 尝试一些其他代码
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print("平方结果:", squared)

# 循环示例
for i in range(3):
    print(f"循环第 {i+1} 次")
使用方法:
1. 点击"插入代码块"按钮可以创建新的代码块
2. 在代码块中编写Python代码
3. 选中要执行的代码
4. 点击"执行选中代码"按钮运行代码
5. 输出结果会显示在下方区域
"""
        self.code_editor.setText(initial_code)

        # 将代码编辑器设置为主窗口的中央部件
        self.setCentralWidget(self.code_editor)

        # 显示窗口
        self.show()


if __name__ == '__main__':
    # 创建Qt应用程序实例
    app = QApplication(sys.argv)

    # 创建并显示主窗口
    window = MainWindow()

    # 进入应用程序的主循环
    sys.exit(app.exec_())
