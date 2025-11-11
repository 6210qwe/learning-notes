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




















/************************************************************
函数名	: getPrevItemCounts
函数功能: 计算前驱节点的个数并返回
入口参数: path  参与遍历的SwitchStatement 路径
     number 参与判断的caseValue或者nextValue

返回值	: 前驱节点的个数

日期  : 2022/2/17

************************************************************/

const t = require("@babel/types");

function getPrevItemCounts(path, number)
{
	let counts = 0;

	for(let item of path.node.cases)
	{
		let {test,consequent} = item;
		let len = consequent.length;
		if (!t.isExpressionStatement(consequent[len - 2]))
		{
			continue;
		}
	 let {right} = consequent[len - 2].expression;
	 if (t.isNumericLiteral(right,{value:number}))
	 {
	 	counts++;
	 }
	 else if (t.isConditionalExpression(right))
	 {
	 	if (right.consequent.value == number ||
	 	  right.alternate.value == number)
	 	{
	 		counts++;
	 	}
	 }
	}

	return counts;
}

















在经过上面1-9的节点合并后，如果还没有生成单一的case，说明还需要进一步的进行合并。

这个时候，也许会看到一些跳板节点，如:

...

case 255:
  code1;
  next = 256;
  break;
case 256:
 next = 257;
 break;
case 257：
 code2;
 next = 258;
 break;

===>

case 255:
  code1;
  next = 257;
case 257：
 code2;
 next = 258;
 break;

...

上面的case 256语句没有实质的代码，只不过是多跳了一步，因此可以进行合并了再处理。

插件源代码如下:

const combinEmptyCase =
{
    SwitchCase(path) {
        let { parentPath, node, parent } = path;

        let { test, consequent } = node;

        if (!types.isNumericLiteral(test) || consequent.length != 2 || !types.isExpressionStatement(consequent[0]) || !types.isAssignmentExpression(consequent[0].expression)) {
            return;
        }

        let curValue = test.value;

        let { cases, discriminant } = parent;

        if (!types.isIdentifier(discriminant)) {
            return;
        }

        let caseName = discriminant.name;

        let { left, operator, right } = consequent[0].expression;

        if (!types.isIdentifier(left, { "name": caseName }) || operator != "=" || !types.isNumericLiteral(right)) {
            return;
        }

        let nextValue = right.value;

        for (let i = 0; i < cases.length; i++) {
            let eachCase = cases[i];
            if (eachCase.test.value == test.value) {
                continue;
            }

            let { consequent } = eachCase;

            if (!types.isExpressionStatement(consequent.at(-2)) || !types.isAssignmentExpression(consequent.at(-2).expression)) {
                continue;
            }

            let { left, operator, right } = consequent.at(-2).expression;

            if (!types.isIdentifier(left, { "name": caseName }) || operator != "=") {
                continue;
            }

            if (types.isNumericLiteral(right, { "value": curValue })) {
                cases[i].consequent[consequent.length - 2].expression.right.value = nextValue;
                continue;

            }
            if (types.isConditionalExpression(right)) {
                if (right.consequent.value == curValue) {
                    cases[i].consequent[consequent.length - 2].expression.right.consequent.value = nextValue;
                }
                if (right.alternate.value == curValue) {
                    cases[i].consequent[consequent.length - 2].expression.right.alternate.value = nextValue;
                }
                continue;
            }

        }

    }
}

traverse(ast, combinEmptyCase);





