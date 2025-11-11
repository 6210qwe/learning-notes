#删除垃圾代码  #插件更新  removeDeadCode系列插件:

变量定义与赋值语句无引用时的删除。

/************************************
var a = 5,b,c,d;
c = 56;
d = e = f;

===>

e = f;

************************************/

const removeDeadCodeOfIdentifier = {
    "VariableDeclarator"(path) {
        let { node, scope, parentPath, parent } = path;

        let ancestryPath = parentPath.parentPath;

        if (ancestryPath.isForOfStatement({ left: parent }) ||
            ancestryPath.isForInStatement({ left: parent })) {//目前发现这两个需要过滤
            return;
        }

        let { id, init } = node;

        if (!types.isIdentifier(id) || types.isCallExpression(init) ||
            types.isAssignmentExpression(init)) {//目前只发现赋值语句和调用语句会有问题。后续待添加
            return;
        }

        let binding = scope.getBinding(id.name);//重新解析ast后，一定会有binding;
        if (!binding) return;

        let { referenced, constant, constantViolations } = binding;

        if (referenced || constantViolations.length > 1) {
            return;
        }

        if (constant || constantViolations[0] == path) {
            path.remove();
        }
    },

    AssignmentExpression(path) {

        let { scope, node, parentPath } = path;

        let { left, operator, right } = node;

        if (!types.isIdentifier(left)) {
            return;
        }

        let binding = scope.getBinding(left.name);

        if (!binding || binding.referenced)
        {
            return;
        }

        let { constantViolations } = binding;

        if (constantViolations.length == 1 && constantViolations[0] == path)
        {
             if (parentPath.isExpressionStatement() || parentPath.isSequenceExpression())
             {
                if (types.isAssignmentExpression(right) || types.isCallExpression(right))
                {
                    parentPath.insertBefore(types.ExpressionStatement(right));
                }
                path.remove();
             }
        }

    }

}

for (let i=0;i<5; i++)
{
    ast = parser.parse(generator(ast).code); //因为涉及到scope，需要需要重新解析;
    traverse(ast,removeDeadCodeOfIdentifier);
}

注:如果发现有问题或者其他未考虑到的情况，请再下方留言，感谢。