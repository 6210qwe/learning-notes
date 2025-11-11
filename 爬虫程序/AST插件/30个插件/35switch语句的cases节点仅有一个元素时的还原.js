#插件更新
/*******************************
控制流平坦化还原后的收尾处理。

代码仅供参考，可能无法通用。

还原前:

function demo(cU, cV) {
 var cW = 1;

 while (cW !== 0) {
  switch (cW) {
   case 1:
    var cZ = [];
    var d0 = 0;
    var d1 = 0;

    while (d0 < cU) {
     cZ[(d0 + cV) % cU] = [];
     d0++;
    }
    cW = 0;
    break;
  }
 }
}

===>

还原后:

function demo(cU, cV) {
 var cZ = [];
 var d0 = 0;
 var d1 = 0;

 while (d0 < cU) {
  cZ[(d0 + cV) % cU] = [];
  d0++;
 }
}

*******************************/

const replaceSwitchNOde =
{
	"ForStatement|WhileStatement"(path)
	{
		let {scope,node} = path;
		let body = node.body.body;
		if (body.length != 1 ||
		  !types.isSwitchStatement(body[0]))
		{
			return;
		}
		let {discriminant,cases} = body[0];
		let binding = path.scope.getBinding(discriminant.name);
		if (!binding || !binding.path ||
		  !binding.path.isVariableDeclarator())
		{
			return;
		}

		if (cases.length != 1) return;

		let {consequent} = cases[0];

		if (types.isBreakStatement(consequent[consequent.length-1]))
		{
			consequent.pop();
		}
		if (types.isExpressionStatement(consequent[consequent.length-1]) &&
		  types.isAssignmentExpression(consequent[consequent.length-1].expression))
		{

			let {left} = consequent[consequent.length-1].expression;
			if (types.isIdentifier(left,{name:discriminant.name}))
			{
				consequent.pop();
			}
		}

		path.replaceWithMultiple(consequent);

		binding.path.remove();
	}
}

traverse(ast, replaceSwitchNOde);

