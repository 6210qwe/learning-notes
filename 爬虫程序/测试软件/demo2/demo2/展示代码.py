import sys
import re
import traceback
import keyword
from io import StringIO
from PyQt5.QtCore import Qt, pyqtSignal, QThread
from PyQt5.QtGui import (
    QSyntaxHighlighter,
    QTextCharFormat,
    QFont,
    QColor,
    QTextCursor,
    QTextBlockFormat,
    QTextDocument
)
from PyQt5.QtWidgets import (
    QApplication,
    QMainWindow,
    QTextEdit,
    QVBoxLayout,
    QHBoxLayout,
    QWidget,
    QPushButton,
    QMessageBox,
    QSplitter
)


# 语法高亮器
class PythonHighlighter(QSyntaxHighlighter):
    def __init__(self, parent=None):
        super().__init__(parent)

        # 定义语法高亮格式
        self.keyword_format = QTextCharFormat()
        self.keyword_format.setForeground(QColor(128, 0, 128))  # 紫色关键字
        self.keyword_format.setFontWeight(QFont.Bold)

        self.string_format = QTextCharFormat()
        self.string_format.setForeground(QColor(0, 128, 0))  # 绿色字符串

        self.comment_format = QTextCharFormat()
        self.comment_format.setForeground(QColor(128, 128, 128))  # 灰色注释

        self.number_format = QTextCharFormat()
        self.number_format.setForeground(QColor(255, 165, 0))  # 橙色数字

        self.function_format = QTextCharFormat()
        self.function_format.setForeground(QColor(0, 0, 255))  # 蓝色函数名

        # 关键字列表
        self.keywords = keyword.kwlist

        # 编译正则表达式
        self.patterns = [
            (re.compile(rf"\b{kw}\b"), self.keyword_format) for kw in self.keywords
        ]
        self.patterns.extend([
            (re.compile(r'"[^"\\]*(\\.[^"\\]*)*"'), self.string_format),
            (re.compile(r"'[^'\\]*(\\.[^'\\]*)*'"), self.string_format),
            (re.compile(r"\b[0-9]+\b"), self.number_format),
            (re.compile(r"\b[A-Za-z0-9_]+(?=\()"), self.function_format),
            (re.compile(r"#.*$"), self.comment_format)
        ])

    def highlightBlock(self, text):
        if self._is_in_code_block():
            try:
                for pattern, fmt in self.patterns:
                    for match in pattern.finditer(text):
                        start = match.start()
                        self.setFormat(start, match.end() - start, fmt)
            except Exception:
                pass

    def _is_in_code_block(self):
        block = self.currentBlock()
        fmt = block.blockFormat()
        return fmt.leftMargin() == 20


# 代码执行线程
class CodeExecutor(QThread):
    output_ready = pyqtSignal(str)

    def __init__(self, code):
        super().__init__()
        self.code = code
        self.setTerminationEnabled(True)

    def run(self):
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        redirected_output = StringIO()
        sys.stdout = redirected_output
        sys.stderr = redirected_output

        try:
            # 过滤特殊字符
            # clean_code = re.sub(r'[\x00-\x1F\x7F-\x9F\u2028\u2029]', '', self.code)

            clean_code = re.sub(
                r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\u2028\u2029]',  # 移除非必要控制字符
                '',
                self.code
            )

            # 执行代码
            exec(clean_code, globals().copy())
            output = redirected_output.getvalue()
            self.output_ready.emit(f"输出:\n{output}" if output else "代码执行成功，无输出")
        except Exception:
            self.output_ready.emit(f"错误:\n{traceback.format_exc()}")
        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr


# 代码编辑器（核心修复）
class CodeTextEdit(QTextEdit):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.indent_width = 4  # 缩进宽度（4个空格）
        self.init_ui()

    def init_ui(self):
        # 关键设置：使用纯文本模式，确保换行符正确处理
        self.setAcceptRichText(False)
        self.setLineWrapMode(QTextEdit.NoWrap)
        self.setTabStopWidth(self.indent_width * self.fontMetrics().width(' '))

        # 设置等宽字体，适合代码编辑
        font = QFont("Consolas", 10)
        self.setFont(font)
        self.setStyleSheet("""
            QTextEdit {
                background-color: #ffffff;
                color: #333;
                border: 1px solid #ccc;
                padding: 10px;
            }
        """)

        # 语法高亮
        self.highlighter = PythonHighlighter(self.document())

    def insert_code_block(self):
        """插入代码块"""
        try:
            cursor = self.textCursor()

            # 确保在新行插入代码块
            if not cursor.atBlockStart():
                cursor.insertBlock()

            # 设置代码块格式
            code_block_fmt = QTextBlockFormat()
            code_block_fmt.setLeftMargin(20)  # 代码块标记
            code_block_fmt.setBackground(QColor(245, 245, 245))  # 浅灰背景
            cursor.insertBlock(code_block_fmt)

            # 将光标定位到代码块内
            self.setTextCursor(cursor)

        except Exception as e:
            QMessageBox.critical(self, "插入失败", f"代码块插入错误: {str(e)}")

    def get_selected_code(self):
        """获取选中的代码块内容（确保换行和缩进正确）"""
        cursor = self.textCursor()
        if not cursor.hasSelection():
            return None

        # 检查选中内容是否在代码块内
        start_block = self.document().findBlock(cursor.selectionStart())
        end_block = self.document().findBlock(cursor.selectionEnd())

        if (start_block.blockFormat().leftMargin() == 20 and
                end_block.blockFormat().leftMargin() == 20):
            # 使用纯文本提取选中内容，确保换行符正确
            start_pos = cursor.selectionStart()
            end_pos = cursor.selectionEnd()
            full_text = self.toPlainText()
            return full_text[start_pos:end_pos]
        return None

    def keyPressEvent(self, event):
        """处理键盘事件，实现类似PyCharm的自动缩进"""
        cursor = self.textCursor()
        current_block = cursor.block()

        # 仅在代码块内应用特殊缩进规则
        in_code_block = current_block.blockFormat().leftMargin() == 20

        # 处理Tab键
        if event.key() == Qt.Key_Tab and in_code_block:
            self.insertPlainText(' ' * self.indent_width)
            return

        # 处理退格键（删除整个缩进）
        elif event.key() == Qt.Key_Backspace and in_code_block:
            # 检查是否可以删除缩进
            cursor.movePosition(QTextCursor.StartOfLine)
            cursor.movePosition(QTextCursor.Right, QTextCursor.KeepAnchor, cursor.columnNumber())
            selected_text = cursor.selectedText()

            if selected_text == ' ' * self.indent_width:
                cursor.removeSelectedText()
                return

        # 处理回车键（实现智能缩进）
        elif event.key() in (Qt.Key_Return, Qt.Key_Enter) and in_code_block:
            # 获取当前行内容
            cursor.select(QTextCursor.LineUnderCursor)
            current_line = cursor.selectedText()
            cursor.clearSelection()

            # 计算当前行的缩进
            current_indent = self._calculate_indent(current_line)

            # 检查当前行是否以冒号结尾（如def, if, for等）
            line_stripped = current_line.rstrip()
            if line_stripped.endswith(':') and not self._in_string(current_line):
                # 增加缩进
                new_indent = current_indent + self.indent_width
            else:
                # 保持相同缩进
                new_indent = current_indent

                # 检查上一行是否是闭合括号等，减少缩进
                new_indent = self._adjust_for_closing_brackets(current_line, new_indent)

            # 插入换行和缩进
            cursor.insertText('\n' + ' ' * new_indent)
            return

        # 处理其他按键
        super().keyPressEvent(event)

        # 自动缩进调整（如输入闭合括号后）
        if in_code_block and event.text() in '})]':
            self._auto_unindent()

    def _calculate_indent(self, line):
        """计算行首的缩进空格数"""
        indent = 0
        for c in line:
            if c == ' ':
                indent += 1
            else:
                break
        return indent

    def _in_string(self, line):
        """检查当前位置是否在字符串中"""
        # 简单的字符串检测，用于判断冒号是否在字符串内
        in_single_quote = False
        in_double_quote = False

        for c in line:
            if c == "'" and not in_double_quote:
                in_single_quote = not in_single_quote
            elif c == '"' and not in_single_quote:
                in_double_quote = not in_double_quote

        return in_single_quote or in_double_quote

    def _adjust_for_closing_brackets(self, line, current_indent):
        """根据闭合括号调整缩进"""
        stripped_line = line.strip()
        if stripped_line.startswith(('}', ')', ']')):
            return max(0, current_indent - self.indent_width)
        return current_indent

    def _auto_unindent(self):
        """自动减少缩进（如输入闭合括号后）"""
        cursor = self.textCursor()
        cursor.movePosition(QTextCursor.Up)
        cursor.movePosition(QTextCursor.EndOfLine)
        line = cursor.block().text()

        if line.strip().endswith((':', '{', '(', '[')):
            current_indent = self._calculate_indent(line)
            if current_indent > 0:
                cursor.movePosition(QTextCursor.Down)
                cursor.movePosition(QTextCursor.StartOfLine)
                cursor.movePosition(QTextCursor.Right, QTextCursor.KeepAnchor, self.indent_width)
                if cursor.selectedText() == ' ' * self.indent_width:
                    cursor.removeSelectedText()


# 主窗口
class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.executor = None
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

        # 代码编辑区
        self.code_edit = CodeTextEdit()
        splitter.addWidget(self.code_edit)

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
        self.insert_btn.clicked.connect(self.code_edit.insert_code_block)

        self.run_btn = QPushButton("执行选中代码")
        self.run_btn.clicked.connect(self.run_code)

        self.clear_btn = QPushButton("清空输出")
        self.clear_btn.clicked.connect(self.output_edit.clear)

        # 按钮样式
        self.insert_btn.setStyleSheet("background-color: #4CAF50; color: white; padding: 5px 10px;")
        self.run_btn.setStyleSheet("background-color: #2196F3; color: white; padding: 5px 10px;")
        self.clear_btn.setStyleSheet("background-color: #f44336; color: white; padding: 5px 10px;")

        btn_layout.addWidget(self.insert_btn)
        btn_layout.addWidget(self.run_btn)
        btn_layout.addWidget(self.clear_btn)

        # 组装布局
        main_layout.addWidget(splitter)
        main_layout.addLayout(btn_layout)

    def run_code(self):
        """执行选中的代码"""
        code = self.code_edit.get_selected_code()
        if not code:
            QMessageBox.warning(self, "提示", "请先在代码块中选中要执行的代码！")
            return

        # 停止之前的执行线程
        if self.executor and self.executor.isRunning():
            self.executor.terminate()
            self.output_edit.setText("已终止上一次代码执行")

        # 启动新线程执行代码
        self.executor = CodeExecutor(code)
        self.executor.output_ready.connect(self.output_edit.setText)
        self.executor.start()

    def closeEvent(self, event):
        """关闭窗口时确保线程终止"""
        if self.executor and self.executor.isRunning():
            self.executor.terminate()
            self.executor.wait()
        event.accept()


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
