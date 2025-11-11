#插件更新

逻辑表达式 (LogicalExpression) 转 if 语句 (IfStatement)。

/**************************************************************
a + b || c && d;

a + b && c;

===>

if (!(a + b)) {
  if (c) {
    d;
  }
}
if (a + b) {
  c;
}

**************************************************************/

const template      = require("@babel/template").default;

let ifNODETEP = template(`if(A){B;}`);
const LogicalToIfStatement =
{
	LogicalExpression(path) {
		let { node, parentPath } = path;
		if (!parentPath.isExpressionStatement({ "expression": node }))
		{
			return;
		}
		let { left, operator, right } = node;
		let ifNode = "";
		if (operator == "||") {
			let UnaryNode = types.UnaryExpression(operator = "!",argument = left);
			ifNode = ifNODETEP({"A":UnaryNode,"B":right});
		}
		else if (operator == "&&") {
			ifNode = ifNODETEP({"A":left,"B":right});
		}
		else {
			return;
		}

		parentPath.replaceWith(ifNode);
	},

}

traverse(ast,LogicalToIfStatement);

后续的节点构造，如果能用 template 来构造，我都用 template 进行构造，减少代码。心情愉悦。


丰富版
#插件更新
LogicalExpression 转 IfStatement
/***********************************
a || b;
a && b;

===>

if (a) {} else {
 b;
}

if (a) {
 b;
}
***********************************/

const LogicalToIfStatement =
{
	LogicalExpression(path)
	{
		let {node,parentPath} = path;
		if (!parentPath.isExpressionStatement())
		{
			return;
		}
		let {left,operator,right} = node;

		let blockNode = types.BlockStatement([]);
		let newNode = types.BlockStatement([types.ExpressionStatement(right)])

		let ifNode = undefined;

		if (operator == "||")
		{
			ifNode = types.IfStatement(left,blockNode,newNode);
		}
		else if (operator == "&&")
		{
			ifNode = types.IfStatement(left,newNode,null);
		}
		else
		{
			return;
		}

		parentPath.replaceWith(ifNode);
	},

}

traverse(ast, LogicalToIfStatement);



