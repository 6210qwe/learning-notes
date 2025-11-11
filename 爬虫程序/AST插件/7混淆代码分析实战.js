#手把手系列  拿到一段混淆的js代码该如何分析。

手把手反混淆系列七：混淆代码分析实战

混淆样本来自于下面这个网站:

$LOYAL Token

① 浏览器打开这个网站，打开控制台后，发现停在了混淆代码的debugger位置（main.js），显然手动删除这些debugger语句不现实，我们可以更改下下面的这个插件:

https://t.zsxq.com/0e6QiUGyP

加入类型遍历即可:

 .......

"EmptyStatement|DebuggerStatement"(path)
  {
  	path.remove();
  },

  ................

然后发现有很多变量定义合并到了一块，不利于分析，我们将其分离出来，使用这个插件:

https://t.zsxq.com/0eUTuS54o

分离后，代码要好看一点。

② 继续分析，发现了大量的  类似与 T.apply(a(19), [2885]);  这样的函数表达式。如果你了解 apply 和 call 的特性，那也是可以进行简化的，使用下面的插件:

https://t.zsxq.com/0eicu7k2g

当然，插件需要稍作修改，适配当前的混淆js。

③ 继续分析，发现if语句中含有 逗号表达式，因此，我们需要将逗号表达式进行还原。

注意，在进行逗号表达式的还原之前，先 规范下循环表达式:

https://t.zsxq.com/uVjujYF

然后再去逗号表达式:

https://t.zsxq.com/0eX5uLaia

这样，代码结构就调整的差不多了，后面就属于字面量还原了。想彻底还原有点难度。不再本文展开。

后来在遍历的过程中，发现了这样的表达式:

E(236 < (r -= r - 220) ? 250 : 251)

这种表达式的处理在星球里也发过，插件:

https://t.zsxq.com/0e8nCkIAW

当然，这需要开始还原字面量后才发现。

完整代码我放在附件里面了。供大家学习参考。
手把手反混淆系列七.rar







#插件更新

逗号表达式还原插件，兼容的大部分插件，但有些逗号表达式没办法完美处理，需要写专用插件，大家可以学个思路。

另外，大家也可以学习下，对同一节点类型，如何同时遍历多个方法。

代码还可以继续添加，我只列举了常用的几个类型，供大家学习参考。

function SequenceOfStatement(path) {
    let { scope, parentPath, node } = path;
    if (parentPath.parentPath.isLabeledStatement()) {//标签节点无法往前插入。
        return;
    }
    let expressions = node.expressions;
    if (parentPath.isReturnStatement({ "argument": node }) ||
        parentPath.isThrowStatement({ "argument": node })) {
        parentPath.node.argument = expressions.pop();
    }
    else if (parentPath.isIfStatement({ "test": node }) ||
        parentPath.isWhileStatement({ "test": node })) {
        parentPath.node.test = expressions.pop();
    }
    else if (parentPath.isForStatement({ "init": node })) {
        parentPath.node.init = expressions.pop();
    }
    else if (parentPath.isForInStatement({ "right": node }) ||
        parentPath.isForOfStatement({ "right": node })) {
        parentPath.node.right = expressions.pop();
    }
    else if (parentPath.isSwitchStatement({ "discriminant": node })) {
        parentPath.node.discriminant = expressions.pop();
    }

    else if (parentPath.isExpressionStatement({ "expression": node })) {
        parentPath.node.expression = expressions.pop();
    }
    else {
        return;
    }

    for (let expression of expressions) {
        parentPath.insertBefore(types.ExpressionStatement(expression = expression));
    }
}

function SequenceOfExpression(path) {
    let { scope, parentPath, node, parent } = path;
    let ancestorPath = parentPath.parentPath;
    let expressions = node.expressions;
    if (parentPath.isConditionalExpression({ "test": node }) &&
        ancestorPath.isExpressionStatement({ "expression": parent })) {
        parentPath.node.test = expressions.pop();
    }
    else if (parentPath.isVariableDeclarator({ "init": node }) &&
        ancestorPath.parentPath.isBlock()) {
        parentPath.node.init = expressions.pop();
    }
    else if (parentPath.isUnaryExpression({ "argument": node }) &&
        ancestorPath.isExpressionStatement({ "expression": parent })) {
        parentPath.node.argument = expressions.pop();
    }
    else if (parentPath.isAssignmentExpression({ "right": node }) &&
        ancestorPath.isExpressionStatement({ "expression": parent })) {
        parentPath.node.right = expressions.pop();
    }
    else if ((parentPath.isCallExpression({ "callee": node }) ||
        parentPath.isNewExpression({ "callee": node })) &&
        ancestorPath.isExpressionStatement({ "expression": parent })) {
        parentPath.node.callee = expressions.pop();
    }
    else {
        return;
    }

    for (let expression of expressions) {
        ancestorPath.insertBefore(types.ExpressionStatement(expression = expression));
    }
}

const resolveSequence =
{
    SequenceExpression:
    {//对同一节点遍历多个方法
        exit: [SequenceOfStatement, SequenceOfExpression]
    }
}

traverse(ast, resolveSequence);

要确保该插件运行不会出错，请先运行

https://t.zsxq.com/13c86qE3u

这个插件，因为有些if语句或者 循环语句没有 {}，非常的不规范。


规范循环表达式：
插件更新:
规范循环表达式

还原前:

for (var i=0; i<10086; i++)
  console.log(6666666);
console.log(7777777);

while (true)
  console.log(8888888);

还原后:

for (var i = 0; i < 10086; i++) {
 console.log(6666666);
}

console.log(7777777);

while (true) {
 console.log(8888888);
}

插件代码:

const standardLoop =
{
    "ForStatement|WhileStatement|ForInStatement|ForOfStatement|DoWhileStatement"({ node }) {
        if (!types.isBlockStatement(node.body)) {
            node.body = types.BlockStatement([node.body]);
        }
    },
    IfStatement(path)
    {
    	const consequent = path.get("consequent");
    	const alternate  = path.get("alternate");
    	if (!consequent.isBlockStatement())
    	{
    		consequent.replaceWith(types.BlockStatement([consequent.node]));
    	}
    	if (alternate.node !== null && !alternate.isBlockStatement()) {
    		alternate.replaceWith(types.BlockStatement([alternate.node]));
    	}
    },
}

traverse(ast, standardLoop);


















