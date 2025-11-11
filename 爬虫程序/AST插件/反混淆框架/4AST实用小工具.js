#AST实用小工具   更新啦。

更新日志:

1.新增常量计算功能，包含 常量折叠插件 和 全局函数计算 插件，以及对 typeof 的处理。

var a = typeof exports;
var b = typeof Symbol;
var c = parseInt("11010101",2);

===>

var a = "undefined";
var b = "function";
var c = 213;

2.新增 window id移除功能，主要移除多于的window，如:

var a = window.document;

===>

var a = document;

看着不舒服。

后续会新增更多的与浏览器相关的插件，敬请期待。