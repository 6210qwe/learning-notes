#插件更新  变量定义内的init节点还原

/*******************************************************
处理前:
 var _0x574af7 = "object",_0x5924c3 = typeof exports,_0x21662a = _0x574af7 == _0x5924c3;

处理后:

var _0x574af7 = "object",_0x5924c3 = typeof exports,_0x21662a = "object" == typeof exports;

*******************************************************/

这是在 VariableDeclaration 这个节点内部的还原处理。

const restoreVarInDeclarations =
{
	VariableDeclarator(path)
	{
		let {parentPath,node,scope} = path;

		let {id,init} = node;

		if (init == null || types.isCallExpression(init)) return;

		const binding = scope.getBinding(id.name);

		let allNextsiblings = path.getAllNextSiblings();

		for (let nextSibling of allNextsiblings)
		{
			for (let referPath of binding.referencePaths)
			{
				if (nextSibling.isAncestor(referPath))
				{
					referPath.replaceWith(init);
				}
			}
		}

	}
}

//ast    = parser.parse(generator(ast).code);  //如果报 binding 未定义的错误，请将前面的 // 删除。

traverse(ast, restoreVarInDeclarations);