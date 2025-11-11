通用插件更新，数组元素还原:

/******************************************************************
插件名称: replaceArrayElements
Description: Array数据类型还原，需要元素全部为Literal，可嵌套
还原前实例:
var a = [1,2,3,window];
b = a[0] + a[1] + a[2];
c = a[3];

还原后实例:
b = 1 + 2 + 3;
c = window;
******************************************************************/

const replaceArrayElements =
{//数组还原
    VariableDeclarator(path) {
        let { node, scope } = path;
        let { id, init } = node;
        if (!types.isArrayExpression(init) || init.elements.length == 0) return;

        for (let ele of init.elements)
        {
            if (types.isArrayExpression(ele) || types.isObjectExpression(ele))
            {
                return;  //20240401新增
            }
        }

        const binding = scope.getBinding(id.name);
        if (!binding) {
            return;
        }

        let { constant, referencePaths, constantViolations } = binding;  //变量的定义一定会有binding.

        if (constantViolations.length > 1) {
            return;
        }

        if (constant || constantViolations[0] == path) {

            for (let referPath of binding.referencePaths) {
                let { node, parent, parentPath } = referPath;
                if (!types.isMemberExpression(parent, { object: node }) || !types.isNumericLiteral(parent.property)) {
                    return;
                };
                if (parentPath.parentPath.isAssignmentExpression({ "left": parent })) {
                    return;
                }

                if (parentPath.parentPath.isUpdateExpression({ "argument": parent })) {
                    return;
                }
            }

            for (let referPath of binding.referencePaths) {
                let { parent, parentPath } = referPath;
                let index = parent.property.value;
                parentPath.replaceWith(init.elements[index]);
            }

            path.remove();
        }
    },
}

traverse(ast, replaceArrayElements);