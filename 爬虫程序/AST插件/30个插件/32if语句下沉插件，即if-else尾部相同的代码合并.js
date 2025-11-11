#插件更新

if语句下沉插件，这里默认test节点执行不影响其他代码。

/**************************************************************************

if (a)
{
	console.log(111);
	console.log(222);
	console.log(333);
	console.log(444);
	console.log(555);
	console.log(666);
	console.log(777);
	console.log(888);
	console.log(999);
}
else
{
	console.log(444);
	console.log(555);
	console.log(666);
	console.log(777);
	console.log(888);
	console.log(999);
}

===>

if (a) {
 console.log(111);
 console.log(222);
 console.log(333);
}

console.log(444);
console.log(555);
console.log(666);
console.log(777);
console.log(888);
console.log(999);

**************************************************************************/

const combinIFAndElse =
{
	IfStatement(path)
	{
		let {test,consequent,alternate} = path.node;

		if (!alternate) return;

		let ifBody  = consequent.body;
		let elseBody = alternate.body;

		let codeArr = [];
		while (ifBody.length > 0 && elseBody.length > 0)
		{
			let ifCode  = generator(ifBody[ifBody.length - 1]).code;
			let elseCode = generator(elseBody[elseBody.length - 1]).code;
			if (ifCode != elseCode)
			{
				break;
			}
			codeArr.push(ifBody[ifBody.length - 1]);
			ifBody.pop();
			elseBody.pop();
		}

		if (codeArr.length > 0)
		{

			if (ifBody.length > 0 && elseBody.length == 0)
			{
				path.node.alternate = null;
				codeArr.forEach( node =>{path.insertAfter(node);});
			}
			else if (ifBody.length == 0 && elseBody.length > 0)
			{
				codeArr.reverse();
				codeArr.forEach( node =>{path.insertBefore(node);});
				let newNOde = types.UnaryExpression("!",test,true);
				let ifNode = types.IfStatement(newNOde,types.BlockStatement(elseBody),null);
				path.replaceWith(ifNode);
			}
			else
			{
				path.replaceWithMultiple(codeArr.reverse());
			}
		}
	},
}

traverse(ast, combinIFAndElse);