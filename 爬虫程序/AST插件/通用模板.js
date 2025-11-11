#插件更新

附件是 基于babel库反混淆的通用模板，新增了  simplifyLiteral  这个插件。

在我的电脑环境中，如果不运行 simplifyLiteral 这个插件，后面的

opts = {jsescOption:{"minimal":true}}

是没有作用的。即，中文的Unicode没办法还原。

为避免在大家的电脑环境中也是这样，因此在通用模板中加上。

这样也是告诉大家，该怎么编写和调用插件。

运行方式:

将混淆代码保存为 encode.js，放在main.js的同一目录下。在main.js中编写插件后，运行:

node main.js

即可。
基于babel库的通用模板.rar