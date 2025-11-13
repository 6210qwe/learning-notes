browser.latest_tab 获得最后激活的标签页对象
tab2 = browser.new_tab('https://www.baidu.com')  # 新建一个标签页并访问网址
tab3 = browser.get_tab(title='DrissionPage')  # 按条件获取标签页对象


元素对象ChromiumElemet是交互的执行者，如点击、文本输入、获取元素信息等。
元素对象可从 Tab 对象获取，也可从另一个元素对象通过内部查找或相对定位的方式获取。
Tab 对象和 元素对象都有ele()方法，用于在其内部查找指定元素。

每个浏览器只能有一个Chromium对象（同一进程中）。对同一个浏览器重复使用Chromium()获取的都是同一个对象。

创建Chromium对象时会在指定端口启动浏览器，或接管该端口已有浏览器。 默认情况下，程序使用 9222 端口，浏览器可执行文件路径为'chrome'。


创建全新浏览器的方法：
1、auto_port()方法，会自动查找一个空闲的端口启动全新的浏览器
2、ChromiumOptions对象的new_env()方法，可指定启动全新的浏览器。


# 禁止所有弹出窗口
co.set_pref(arg='profile.default_content_settings.popups', value='0')
# 隐藏是否保存密码的提示
co.set_pref('credentials_enable_service', False)


cookies().as_str：以str格式返回，只包含name和value字段，'name1=value1; name2=value2'格式
cookies().as_dict：以dict格式返回，只包含name和value字段，{'name1': 'value1', 'name2': 'value1'}格式
cookies().as_json：把列表转换为 json 返回


div1 = tab.ele('#one')  # 获取 id 为 one 的元素
p1 = tab.ele('@name=row1')  # 获取 name 属性为 row1 的元素
div2 = tab.ele('第二个div')  # 获取包含“第二个div”文本的元素
div_list = tab.eles('tag:div')  # 获取所有div元素

div1 = tab.ele('#one')  # 获取到一个元素div1
p_list = div1.eles('tag:p')  # 在div1内查找所有p元素
div2 = div1.next()  # 获取div1后面一个元素

定位语法用于指明以哪种方式去查找指定元素，语法简洁明了，熟练使用可大幅提高程序可读性。
所有涉及获取元素的操作都可以使用定位语法，如ele()、actions.move_to()、wait.eles_loaded()、get_frame()等等。

@tag()和@text()后面加上'()'，是为了避免与普通元素冲突（如<div text="abc">）。

元素属性包括以下三种：

写法	说明	示例
@tag()	标签名	即<div id="one">中的div
@****	标签体中的属性	如<div id="one">中的id，写作'@id'
@text()	元素文本	即<p class="p_cls">第三行</p>中的第三行

配模式指某个查询中匹配条件的方式，有精确匹配、模糊匹配、匹配开头、匹配结尾四种
精确匹配 =
模糊匹配 :
匹配开头 ^
匹配结尾 $

id 匹配符 # 
class 匹配符 .
文本匹配符 text
类型匹配符 tag