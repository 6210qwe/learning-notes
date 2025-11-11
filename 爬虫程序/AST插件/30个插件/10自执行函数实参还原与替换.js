插件更新:
因为要考虑通用，所以写的很复杂，如果是自己写专用插件，可以不用这么复杂。

大家参考参考，如果有什么疑问，可以在评论区留言。

/********************************
处理前
(function(t,a,b,c,d)
{
   console.log(a[0]+a[1]);
   console.log(b[0]-b[1]);
   console.log(c);
   console.log(d);
   t = 123;

})(5,[1,2],[5,3],6,-5);
处理后
(function (t) {
 console.log(1 + 2);
 console.log(5 - 3);
 console.log(6);
 console.log(-5);
 t = 123;
})(5);
*******************************/

function isBaseLiteral(path) {
	if (path.isLiteral()) {
		return true;
	}
	if (path.isUnaryExpression({ operator: "-" }) ||
		  path.isUnaryExpression({ operator: "+" })) {
		return isBaseLiteral(path.get('argument'));
	}

	return false;
}

const resolveParams =
{
    CallExpression(path) {
        let callee = path.get('callee');
        let arguments = path.get('arguments');
        if (!callee.isFunctionExpression() || arguments.length == 0) {
            return;
        }
        let scope = callee.scope;
        let params = callee.get('params');

        if (params.length < arguments.length) {
            return;  //形参格式不能小于实参个数，防止后面的代码报错
        }

        for (let i in arguments) {
            let paramsPath = params[i];
            let argumentPath = arguments[i];
            const binding = scope.getBinding(paramsPath.node.name);
            if (!binding || !binding.constant) {
                continue;
            }

            let canRemoved = true;

            for (let referPath of binding.referencePaths) {
                if (argumentPath.isIdentifier() || isBaseLiteral(argumentPath)) {
                    referPath.replaceWith(argumentPath.node);
                }
                else if (argumentPath.isArrayExpression()) {
                    let parentPath = referPath.parentPath
                    if (!parentPath.isMemberExpression()) {
                        canRemoved = false;
                        continue;
                    }
                    let { property } = parentPath.node;
                    if (!types.isNumericLiteral(property)) {
                        canRemoved = false;
                        continue;
                    }
                    let index = property.value;
                    if (index > argumentPath.node.elements.length) {
                        canRemoved = false;
                        continue;
                    }
                    parentPath.replaceWith(argumentPath.node.elements[index]);
                }
                else {
                    canRemoved = false;
                    break;
                }
            }
            if (canRemoved) {
                paramsPath.remove();
                argumentPath.remove();
            }
        }
    },
}

traverse(ast, resolveParams);