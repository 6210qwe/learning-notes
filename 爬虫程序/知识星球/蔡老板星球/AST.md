内容：

```
喵喵盾的if语句转switch语句还原心得:

使用它的在线混淆网站生成了一个最简单的while - if 控制流，附件demo1。

手动转换变成 while - switch语句，附件demo2.

成功了。
```



```
另外一种形式的if语句转switch语句。

类型，在test节点中，既有大于，也有小于。其实这种无非就是多加几个判断而已。

之前的代码稍微改一下就能用了。

代码仅供参考，非通用。
```



```
星球学员专用重命名插件

目前暂时没发现bug，大家发现bug后随时向我反馈，感谢!
```



```
点大佬的反混淆练习第一题，可替换html。

地址:  https://www.ldvmp.com/mm1.html

反混淆练习

替换后，进行加密操作，停在debugger位置，右边的p15即为真实的入口字符串。

123456@Mozilla5+@BYO$wEW

当然，不还原成switch一样可以拿到盐，但是我们的目的不是破解，而是反混淆。
```





```
JEB自带的ast api，学习安卓逆向的兄弟可以看看。  
https://www.pnfsoftware.com/jeb1/apidoc/jeb/api/ast/package-summary.html

jeb.api.ast (JEB API)

附件是星友写的ast代码，用Python写的。

就反混淆而言，api不重要，重要的是思路。
```



```
类阿卡迈控制流的还原。

还原思路:

AST反混淆实战|类阿卡迈控制流还原详解

代码非通用仅供参考。

一个函数是一个大的控制流，内部有调用该函数的地方，是一个实参是控制流的入口。
```



```
还原猿人学第二届比赛第四题代码片段(去控制流平坦化)
```



```
浏览器环境简化专用插件

有些混淆代码会对浏览器的一些全局方法或者属性做一些检测。

如 "undefined" != typeof window;

附件集成了两个插件，大家可以根据情况继续添加。
```



```
使用 Object["getOwnPropertyNames"](window) 可以获取window的所有属性和方法。

但是这个数组有点大(1200+个元素)，放在插件里面会变得很臃肿。

之前写了一些 浏览器环境参与计算的系列插件，就是因为node环境下面没有window的相关属性和方法。

但是呢，在浏览器上去执行，又显得有点麻烦。

果然鱼和熊掌,不可兼得。
```



```
猿人学第三届比赛第二题相关代码:

mmc.txt是我还原的mmc参数请求代码。

mmc_yrx.txt 是猿人学的初始源码(卞大提供，感谢)

2.zip是混淆代码彻底还原后的结果，可直接在网站上替换。剩下的jsvmp交给能反编译的大佬。
sm4.zip 是 参数梁非凡 的纯算代码。
```



```
猿人学第三届比赛第二题的if转switch语句。

之前的插件 #控制流专题#猿人学平台第六题... 有点问题，忽略了同名变量，导致转换的时候出问题。

因为数组下标为0，而有些情况没有第0个元素，采用了 Object 来保存相应的数据。

详细代码见附件。反混后的代码已验证通过
```



```
猿人学第三届JS逆向&验证码比赛第2-3题混淆代码还原后的html，可直接替换调试。

替换方式文章参考:https://mp.weixin.qq.com/s/ELyARX6pYfrs7PJeURuL0A
```



```
使用cheerio库提取html内的js代码，并配合babel库进行代码的格式化处理。

目前，很多混淆的js都内嵌在html中，使用手动抠取的话可能会存在编码的问题。

因此，使用代码来抠取可能更好，还能预处理下混淆js，一举两得。
```



```
hCaptcha混淆代码字符串解密相关的代码抠取。

附件是使用ast代码来抠取hCaptcha混淆代码字符串解密相关的代码。

这种我感觉手动抠取再使用万能字符串还原框架似乎会更快一点。

解密函数可以在ast下面正常调用，剩下的代码自己弄吧，拼个积木就好了。
```



```
 猿人学平台第六题去控制流系列教程(3)

为使用九大节点合并算法工具做的一些准备工作

练习地址:

6 - 洞玄 - 第二届猿人学web端攻防赛

1.确立switch语句的初始化值。一般的混淆代码会直接给定初始值，但猿人学的特殊一点，如:

var afy = d || 7;

经过调试后，发现 d的值是 undefined。我们可以大胆一点，猜测所有这种类型的节点，d的值都是undefined。

因为它是由工具生成的，所以有理由这么猜测。
还原后:
var afy = 7;

2.修改跳板case指向的value，如:
case 1:
    //someCode;
    nextValue = 2;
    break;
case 2:
        nextValue = 3;
       break;

==>

case 1:
    //someCode;
    nextValue = 3;
    break;
case 2:
    nextValue = 3;
    break;

即将case1的nextValue值进行修改处理。

3.移除没有前驱节点的case:

例如在第二步中，将case1的nextValue值修改后，case2可能就没有前驱case了，应该直接删除。
case 1:
    //someCode;
    nextValue = 3;
    break;

具体代码请看附件。看不懂的请留言。

https://match2023.yuanrenxue.cn/topic/6
```



```
猿人学平台第六题去控制流系列教程(2)

为使用九大节点合并算法工具做的一些准备工作

练习地址:

6 - 洞玄 - 第二届猿人学web端攻防赛

1.将 += 或者 -= 替换成 =:
case 15:
......
Zi -= 13;   
break;
===>  
case 15:
......
Zi  = 2;
break;

2.将特定的if语句转成条件表达式:

 if (!Zu) {
       Zi  = 15;
  } else {
       Zi  = 13;
   }
===>

Zi = !Zu ? 15 : 13;

源代码见附件。
```



```
猿人学平台第六题去控制流系列教程(1)

练习地址:

6 - 洞玄 - 第二届猿人学web端攻防赛

将for-if语句转换成 for-switch 语句。

插件参考:

#ast还原实战#使用AST解...

修改一下特征代码就可以顺利转成switch语句了。

源代码见附件。
```



```
复杂的逻辑表达式还原第二弹

混淆代码样本来源:

match6.js

混淆原代码:

if (((((ZD = ((ZC = (ZB = Zv) && null || Zp) || 9) && Zn) && null || (ZG = ((ZF = (ZE = ZC * ZD) && undefined || Zn) || 9) && ZE * ZF) || 10) && (ZJ = ((ZI = (ZH = ZB - ZG) && undefined || Zn) || 7) && Zq) && 0 || (ZM = ((ZL = ((ZK = ZI * ZJ) || 8) && ZH - ZK) || 1) && Zq) || 5) && ((ZP = (ZO = ((ZN = Zo) || 1) && ZM * ZN) && null || Zr) || 3) && (ZS = (ZR = ((ZQ = ZO * ZP) || 10) && ZL - ZQ) && 0 || Zn) && null || (ZV = (ZU = ((ZT = Zn) || 6) && ZS * ZT) && 0 || ZR - ZU) || 5) && (ZW = void ZV) && undefined) { } else {
  Yy = ZW;
}

还原后的代码:

ZD = (((ZC = ((ZB = Zv) && null) || Zp) || 9) && Zn);
ZG = (((ZF = ((ZE = ZC * ZD) && undefined) || Zn) || 9) && ZE * ZF);
ZJ = (((ZI = ((ZH = ZB - ZG) && undefined) || Zn) || 7) && Zq);
ZM = (((ZL = (((ZK = ZI * ZJ) || 8) && ZH - ZK)) || 1) && Zq);
(ZP = ((ZO = (((ZN = Zo) || 1) && ZM * ZN)) && null) || Zr) || 3;
ZS = ((ZR = (((ZQ = ZO * ZP) || 10) && ZL - ZQ)) && 0) || Zn;
ZV = ((ZU = (((ZT = Zn) || 6) && ZS * ZT)) && 0) || ZR - ZU;
ZW = void ZV;
Yy = ZW;

最终的还原效果:

ZB = Zv;
ZC = Zp;
ZD = Zn;
ZE = ZC * ZD;
ZF = Zn;
ZG = ZE * ZF;
ZH = ZB - ZG;
ZI = Zn;
ZJ = Zq;
ZK = ZI * ZJ;
ZL = ZH - ZK;
ZM = Zq;
ZN = Zo;
ZO = ZM * ZN;
ZP = Zr;
ZQ = ZO * ZP;
ZR = ZL - ZQ;
ZS = Zn;
ZT = Zn;
ZU = ZS * ZT;
ZV = ZR - ZU;
ZW = void ZV;
Yy = ZW;

反混淆代码请见附件。

https://download.python-spider.com/match2023/corejs/match6.js
```





```
对某个ob混淆js的还原分析

二群的群友问我下面的js该如何处理，我没仔细看，给了个错误的插件，虽然改改也能用，但我觉得还是应该提供一下正确的思路:

const jn = {
    "0lhAP": function(n, t) {
        return qo[function(n, t, W, o, u) {
            return r(u - 424, n);
        }("d*SU", 0, 0,0,673)](n, t)
    },
}

1.一看就是ob混淆，不管怎么混出花，还原还是非常容易的。这里主要是对qo里的函数调用进行处理 
将实参通过插件替换进去,变成:

const jn = {
  "0lhAP": function (n, t) {
    return qo[function () {
      return r(673 - 424, "d*SU");
    }()](n, t);
  }
};

使用插件: 插件更新:因为要考虑通用，所以...

2.继续还原，看到一个可以常量折叠的地方，使用插件: #插件更新#常量折叠通用版:/...

const jn = {
  "0lhAP": function (n, t) {
    return qo[function () {
      return r(249, "d*SU");
    }()](n, t);
  }
};

3.qo里的函数调用可以继续简化:

const jn = {
 "0lhAP": function (n, t) {
  return qo[r(249, "d*SU")](n, t);
 }
};

使用这个插件:


#插件更新  无实参调用表达式，且callee子节点是FunctionExpression类型的混淆代码还原。

/**********************************************************

var value = function () {
    return op_1 / op_2;
}(); 

====>

var value = op_1 / op_2;

**********************************************************/

const resolveCallExpressionNoArgs = 
{
    CallExpression(path)
    {
        let {callee,arguments} = path.node;

        if (!types.isFunctionExpression(callee) || arguments.length != 0)
        {
            return;
        }

        let {params,body} = callee;

        if (params.length != 0 || body.body.length != 1 || 
           !types.isReturnStatement(body.body[0]) )
        {
            return;
        }

        path.replaceWith(body.body[0].argument);
    }
}

traverse(ast, resolveCallExpressionNoArgs);
```

