#插件更新  合并被拆分为多个的变量定义。

/*******************************************************
处理前:
var a = 123;
var b = 456;
var c = 789;
var d = 120;

处理后:

var a = 123,b = 456,c = 789,d = 120;

*******************************************************/

const comBinVarDefine =
{
	VariableDeclaration(path)
	{
		let allNextSiblings = path.getAllNextSiblings();

		for (let nextSibling of allNextSiblings)
		{
			if (!nextSibling.isVariableDeclaration())
			{
				break;
			}

			path.node.declarations.push(...nextSibling.node.declarations);

			nextSibling.remove();
		}

	},
}

traverse(ast, comBinVarDefine);