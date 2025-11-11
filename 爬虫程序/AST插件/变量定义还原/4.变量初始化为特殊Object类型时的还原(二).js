#ob混淆专题  #思路分享  #插件更新

标准ob混淆，object类型value字段的字面量和函数的还原。

在一键ob还原代码中，有这么一个函数

replaceReferNode

这个是还原 ob混淆中的object对象。在for循环中，最后一行代码:

scope.crawl();

这个是重构作用域的，如果不添加这行代码，会报错:

throw new ReferenceError("Container is falsy");

即使是以 exit 的方式进行遍历，也会出现该问题。这是因为 大的 MemberExpression 对象先遍历了，导致它包含在里面的节点无法找到，所以必须加上重构 作用域。

对于object里面的key 和 value 对 比较少时，察觉不到任何问题，但是当一个object对象里的 properties 元素成千上万条时，缺点就暴露出来了，运行会非常的缓慢，有时候运行半个多小时，还没处理完，耗时主要是因为重构作用域。

怎么解决这个问题?

这里，就需要一点小技巧了。

scope.crawl();

这行代码肯定是不能用了。那只能从原因入手，因为它是 先遍历 嵌套在最外面的  MemberExpression 对象，因此导致报错，我们可以先遍历最里面的  MemberExpression 对象(很奇怪为啥exit不行)，再遍历外层的。这样就不会报错了。

源代码:

function savePropertiesToObject(properties, newMap) {
	for (const property of properties) {
		if (!property.key) {
			break;
		}
		let propKey = property.key.value;
        if (!propKey || propKey.length != 5)
        {
            break;
        }

		let propValue = property.value;
		if (types.isStringLiteral(propValue)) {
			newMap.set(propKey, propValue);
		}
		else if (types.isFunctionExpression(propValue)) {
			let retState = propValue.body.body;
			if (retState.length == 1 && types.isReturnStatement(retState[0])) {
				let argument = retState[0].argument;
				if (types.isCallExpression(argument)) {
					newMap.set(propKey, "Call");
				}
				else if (types.isBinaryExpression(argument) ||
					types.isLogicalExpression(argument)) {
					newMap.set(propKey, argument.operator);
				}
			}
		}
		else {
			break;
		}
	}
}

const decodeObject = {
	VariableDeclarator({ node, scope }) {
		const { id, init } = node;
		if (!types.isObjectExpression(init)) return;
		let name = id.name;

		let binding = scope.getBinding(name);
		let { constant, referencePaths } = binding;
		if (!constant) return;

		let properties = init.properties;
		if (properties.length == 0) return;

		let newMap = new Map();
		savePropertiesToObject(properties, newMap);
		if (newMap.size != properties.length) return;

		for (const referPath of referencePaths.reverse()) {
			let { node, parent, parentPath } = referPath;
			let ancestorPath = parentPath.parentPath;
			if (!parentPath.isMemberExpression({ object: node })) {
				continue;
			}
			let { property } = parent;
            let propKey = types.isIdentifier(property) ? property.name : property.value;
			let propValue = newMap.get(propKey);
			if (!propValue) {
				continue;
			}

			if (typeof propValue != "string") {
				parentPath.replaceWith(propValue);
				continue;
			}
			if (ancestorPath.isCallExpression({ callee: parent })) {
				let { arguments } = ancestorPath.node;
				switch (propValue) {
					case "Call":
						ancestorPath.replaceWith(types.CallExpression(arguments[0], arguments.slice(1)));
						break;
					case "||":
					case "&&":
						ancestorPath.replaceWith(types.LogicalExpression(propValue, arguments[0], arguments[1]));
						break;
					default:
						ancestorPath.replaceWith(types.BinaryExpression(propValue, arguments[0], arguments[1]));
						break;
				}
			}
		}

		newMap.clear();

		scope.crawl();

	},
}

traverse(ast, decodeObject);

改进的代码对 referencePaths 进行的倒叙遍历，这样就避免了先遍历最外层的嵌套结构。