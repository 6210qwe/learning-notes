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