#手把手系列   比较大的混淆文件怎么还原?

手把手反混淆系列四：比较大的混淆文件该怎么处理。

本文不适合电脑配置给力的人阅读，请自行绕过。

昨天星友丢过来一个混淆文件，有8M多，虽然说是我们喜闻乐见的ob混淆，但是运行起来非常的慢。

慢，是我不能忍受的，因此我们需要找个办法让它快起来。

这个时候，需要观察混淆代码，把一些没用到的插件给屏蔽掉，再使用一键还原即可。

第一步，拿到混淆文件，先格式化，观察代码，先可以使用通用模板给处理一下。

https://t.zsxq.com/0eeuhfRMd

第二步，观察代码，发现只有一个函数名被重新赋值，使用星球里的 还原插件:

https://t.zsxq.com/0eeSeSprP

注意，这里因为只处理单个函数名，因此可以写死。代码如下:

let rightVarList = new Map();

const collectMatchVarDefine =
{//收集符合条件的变量定义，避免重复判断浪费时间。
	VariableDeclarator(path)
	{
		let {node, scope} = path;
		let {id, init} = node;
    if (!types.isIdentifier(id) || !types.isIdentifier(init))
    {
    	return;
    }
    const binding = scope.getBinding(id.name);

    if (!binding || !binding.constant)//如果被更改则不能进行替换
    {
     return;
    }

    if (rightVarList.has(id.name))
    {
    	console.log("发现同名变量，请不要使用该插件。");
    }

    rightVarList.set(id.name,init.name);
	}
}

traverse(ast,collectMatchVarDefine);

let funcNames = ["_0x1f82"]; //这里指定需要处理的函数名。

const deleteRepeatDefineOfFunction =
{
	FunctionDeclaration(path)
	{
		let {parentPath,node} = path;
		let {id,params} = node;
		let funcId = id;
		let name = id.name;

		if (!funcNames.includes(name))//函数名过滤，视情况而改
		{
			return;  //打开该行，过滤掉大部分判断，加快判断速度
		}

		let scope = parentPath.scope;
		const binding = scope.getBinding(name);
		let isPathConst = true;
		if (binding && !binding.constant)
		{//函数内部的更改不用过滤
			for (let constantPath of binding.constantViolations)
			{
				if (!path.isAncestor(constantPath))
				{
					isPathConst = false;
					break;
        }
      }
    }

    if (!binding || !isPathConst) return;

    scope.traverse(scope.block, {
    	VariableDeclarator(path) {
    		let {node,scope} = path;
    		let {id, init} =path.node;
    		if(!rightVarList.has(id.name) || !types.isIdentifier(init, {name: name}))
    		{
    			return;
    		}

    		const binding = scope.getBinding(id.name);
    		for (let referPath of binding.referencePaths)
        {
        	referPath.replaceWith(funcId);//使用replaceWith函数比rename函数更快。
        }
        path.remove();
        scope.crawl();

      },});
	},
}

traverse(ast,deleteRepeatDefineOfFunction);

第三步，使用ob混淆一键还原插件，直接运行 CallExpressToLiteral  这个插件，将前面无关的插件全部屏蔽，后面的插件也全部屏蔽，看看是否能正常还原，如果可以的话，再处理后面的混淆代码。

请大家自行尝试还原。感谢阅读。