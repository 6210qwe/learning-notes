input.js 用于输入待混淆的js代码

output.js 用于输出已经混淆完毕的js代码

main.js 用于执行的入口

目录：ob_module 混淆模块放入的目录

每一个目录下的文件，都对应着一个模块，模块的导入使用 require的形式进行，返回的是一个函数，直接执行就可以调用模块

config: 配置变量
