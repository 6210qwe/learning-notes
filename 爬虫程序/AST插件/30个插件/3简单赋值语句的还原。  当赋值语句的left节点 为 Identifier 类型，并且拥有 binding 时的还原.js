#插件更新  简单赋值语句的还原。

当赋值语句的left节点 为 Identifier 类型，并且拥有 binding 时的还原。

/****************************************************************************

function add(a,b)
{
	a = 5;
	return a + b;
}
var c,d,e,f;
c = 666;
d = c + 110;
e = parseInt;
f = String.fromCharCode;
g = e("10001",2);
h = f(66);

===>

function add(a, b) {
  return 5 + b;
}
var c, d, e, f;
d = 666 + 110;
g = parseInt("10001", 2);
h = String.fromCharCode(66);

****************************************************************************/

function isExpressionConstant(PathOrNode)
{

    let node = PathOrNode.node || PathOrNode;

    let BrowList = ['window', 'document', 'navigator', 'location', 'history', 'screen',];

    if (types.isLiteral(node) && node.value != null)
    {
        return true;
    }

    if (types.isIdentifier(node) && BrowList.includes(node.name))
    {
        return true;
    }

    if (types.isIdentifier(node) && typeof globalThis[node.name] != "undefined") {
        return true;
    }

    if (types.isMemberExpression(node))
    {
        let {object,property} = node;

        if (types.isIdentifier(object) && typeof globalThis[object.name] != "undefined")
        {
            let properName = types.isIdentifier(property) ? property.name : property.value;
            if (typeof globalThis[object.name][properName] != "undefined") {
                return true;
            }
        }

        if (types.isMemberExpression(object))
        {
            return isExpressionConstant(object);
        }

    }

    if (types.isUnaryExpression(node) && ["+", "-", "!","typeof","~"].includes(node.operator)) {
        return isExpressionConstant(node.argument);
    }

    return false;
}

const restoreAssignConstant =
{//常量还原插件
    AssignmentExpression(path) {

        let { scope, node, parentPath } = path;

        let { left, operator, right } = node;

        if (!types.isIdentifier(left) || operator != "=" || !isExpressionConstant(right)) {
            return;
        }

        let binding = scope.getBinding(left.name);

        if (!binding) {//如果没有binding,或者赋值语句本身改变了它，因此这里判断只有一处改变。
            return;
        }

        let bindingPath = binding.path;

        if (!bindingPath.isVariableDeclarator() || bindingPath.node.init != null)
        {
            return;   //20250410更新，判断初始化是否有值。
        }

        let { referencePaths, constantViolations } = binding;

        let canVisit = false;

        if (constantViolations.length == 1 && constantViolations[0] == path) {
            canVisit = true;
        }
        if (constantViolations.length == 2 && constantViolations[0] == binding.path && binding.path.isVariableDeclarator({ init: null }) &&
            constantViolations[1] == path) {//针对循环体里面定义的变量
            canVisit = true;
        }

        if (!canVisit) return;

        let { start } = node;

        console.log(path.toString())

        for (let referPath of binding.referencePaths) {

            if (referPath.node.end <= start) {
                continue;
            }

            referPath.replaceWith(right);
        }

        if (parentPath.isExpressionStatement() || parentPath.isSequenceExpression()) {
            path.remove();
        }
    },

}

更新日志:

① 更改  isNodePure 为  isExpressionConstant，形参可传递path，也可传递node。
② 优化引用位置

有些ob混淆需要先使用 下面这个插件。