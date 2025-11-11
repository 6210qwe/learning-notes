#插件更新
万能调用表达式替换计算值插件:

/****************************************************************
调用表达式还原

var  a = "motnahp"["split"]('')["reverse"]()["join"]('');

===>

var a = "phantom";

***************************************************************/

function isArgsAllLiteral(argumentsNode)
{

	function isBaseLiteral(node)
	{
		if (types.isLiteral(node))
		{
			return true;
		}
		if (types.isUnaryExpression(node,{"operator":"-"}) ||
		 types.isUnaryExpression(node,{"operator":"+"}))
		{
			return isBaseLiteral(node.argument);
		}

		if (types.isObjectExpression(node))
		{
			let {properties} = node;
			if (properties.length == 0)
			{
				return true;
			}

			return properties.every(property=>isBaseLiteral(property));

		}
		if (types.isArrayExpression(node))
		{
			let {elements} = node;
			if (elements.length == 0)
			{
				return true;
			}
			return elements.every(element=>isBaseLiteral(element));
		}

		return false;
	}

	return argumentsNode.every(argument=>isBaseLiteral(argument));
}

const callToStringLiteral =
{
	CallExpression:{
		exit(path)
		{
			let {scope,node} = path;
			let {callee,arguments} = node;
			if (!isArgsAllLiteral(arguments)) return;
		 try
		 {
		 	let value = eval(path.toString());
		 	if (typeof value != "string") return;
		 	console.log(path.toString(),"-->",value);
		 	path.replaceWith(types.valueToNode(value));
		 }catch(e){}
	 }
	},
}

traverse(ast, callToStringLiteral);

主要替换类似 "motnahp"["split"]('')["reverse"]()["join"]('')的函数调用。

你还可以把环境复制到AST文件中，运行即可。