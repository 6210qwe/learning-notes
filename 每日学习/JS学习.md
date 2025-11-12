
# JS新特性
## JS可选链操作符
作用：使用可选链操作符后，代码不会因为访问null或undefined的属性而崩溃。
可选链操作符（obj?.prop 或 obj?.[key]）是 ES2020（ES11） 才引入的语法特性，用于安全地访问嵌套对象的属性，避免因中间属性不存在而抛出 Cannot read property 'x' of undefined/null 错误。
可选链操作符（?.）是 ES2020 新增特性，ES5 完全不支持。
ES5 中需通过 && 或三元运算符手动判断属性是否存在，避免访问不存在的嵌套属性时报错。
https://mp.weixin.qq.com/s/TrrFjfvrnXL8X75CVCclww?from=industrynews&color_scheme=light#rd