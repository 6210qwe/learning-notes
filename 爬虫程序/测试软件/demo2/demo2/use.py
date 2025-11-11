import sys
from PyQt5.QtWidgets import (
    QApplication,
    QMainWindow,
    QVBoxLayout,
    QHBoxLayout,
    QWidget,
    QPushButton,
    QSplitter,
    QTextEdit
)
from PyQt5.QtGui import QFont


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("Python代码编辑器")
        self.resize(800, 600)

        # 中心部件
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)

        # 分割器（可调整编辑区和输出区大小）
        splitter = QSplitter(Qt.Vertical)

        # 代码编辑区 - 使用我们封装的组件
        self.code_editor = CodeEditor()
        splitter.addWidget(self.code_editor)

        # 输出区
        self.output_edit = QTextEdit()
        self.output_edit.setReadOnly(True)
        self.output_edit.setStyleSheet("""
            QTextEdit {
                background-color: #f8f8f8;
                color: #333;
                border: 1px solid #ccc;
                padding: 10px;
                font-family: Consolas;
                font-size: 10pt;
            }
        """)
        splitter.addWidget(self.output_edit)

        # 设置分割器初始大小
        splitter.setSizes([400, 200])

        # 按钮区
        btn_layout = QHBoxLayout()
        self.insert_btn = QPushButton("插入代码块")
        self.insert_btn.clicked.connect(self.code_editor.insert_code_block)

        self.run_btn = QPushButton("执行选中代码")
        self.run_btn.clicked.connect(self.code_editor.execute_selected_code)

        self.clear_btn = QPushButton("清空输出")
        self.clear_btn.clicked.connect(self.output_edit.clear)

        # 按钮样式
        self.insert_btn.setStyleSheet("background-color: #4CAF50; color: white; padding: 5px 10px;")
        self.run_btn.setStyleSheet("background-color: #2196F3; color: white; padding: 5px 10px;")
        self.clear_btn.setStyleSheet("background-color: #f44336; color: white; padding: 5px 10px;")

        btn_layout.addWidget(self.insert_btn)
        btn_layout.addWidget(self.run_btn)
        btn_layout.addWidget(self.clear_btn)

        # 连接信号
        self.code_editor.code_executed.connect(self.output_edit.setText)
        self.code_editor.request_execution.connect(self.handle_execution_request)

        # 组装布局
        main_layout.addWidget(splitter)
        main_layout.addLayout(btn_layout)

    def handle_execution_request(self, code):
        """处理执行请求信号"""
        print(f"请求执行代码:\n{code}")


if __name__ == "__main__":
    try:
        app = QApplication(sys.argv)
        # 确保中文显示正常
        font = QFont("Microsoft YaHei", 10)
        app.setFont(font)

        window = MainWindow()
        window.show()
        sys.exit(app.exec_())
    except Exception as e:
        print(f"程序启动失败: {str(e)}")
        sys.exit(1)