import subprocess


class MySubprocessPopen(subprocess.Popen):
    def __init__(self, *args, **kwargs):
        # 在调用父类（即 subprocess.Popen）的构造方法时，将 encoding 参数直接置为 UTF-8 编码格式
        super().__init__(*args, **kwargs)


subprocess.Popen = MySubprocessPopen
import execjs


def get_result(x, y, sid):
    with open('js_code.js', mode='r', encoding='utf-8') as f:
        js_file = f.read()
    js_code = execjs.compile(js_file)
    js_result = js_code.call('getAc', x, y, sid)
    return js_result


sid = "da38c7778527ac47b70ef051a6779945"
x = 133
y = 42
print(get_result(x, y, sid))
