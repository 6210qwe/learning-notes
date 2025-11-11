
当一个object里面的value全部为字面量时的还原，没有考虑单个key重新赋值的情况。

var obj = {"a":123,"b":456,"c":"",};
var res = obj["a"] + obj["a"] + obj["b"] + obj["c"];

===>

var res = 123 + 123 + 456 + "";

还原思路:
1.遍历 VariableDeclarator 节点或者  AssignmentExpression 节点
2.判断object里面的value是否全部为字面量
3.判断是否被重新赋值
4.根据scope来查找其引用的地方，替换
5.如果全部进行了还原，删除垃圾代码

代码:

function isBaseLiteral(node) {

    if (types.isNumericLiteral(node) || types.isStringLiteral(node)) {
        return true;
    }

    if (types.isUnaryExpression(node)) {
        return isBaseLiteral(node.argument);
    }

    return false;
}

const decodeObjectofValue =
{
    VariableDeclarator(path) {
        let { node, scope } = path;
        const { id, init } = node;

        if (!types.isObjectExpression(init)) return;

        let properties = init.properties;

        if (properties.length == 0 || !properties.every(property => isBaseLiteral(property.value)))
            return;

        let binding = scope.getBinding(id.name);

        if (!binding) return;

        let { constant, referencePaths, constantViolations } = binding;

        if (!constant) {//新版本的babel库，在循环里面的变量定义，默认非常量
            if (constantViolations.length != 1 || constantViolations[0] != path) //旧版本屏蔽该行即可
            {
                return;
            }
        }

        let newMap = new Map();

        for (const property of properties) {
            let { key, value } = property;

            let KeyName = types.isIdentifier(key) ? key.name : key.value;

            if (!KeyName || KeyName.length != 5) {
                //  continue; //仅针对ob混淆
            }
            newMap.set(KeyName, value);
        }

        if (newMap.size != properties.length) {
            return;
        }

        let canBeRemoved = true;

        for (const referPath of referencePaths) {

            let { parentPath } = referPath;

            if (!parentPath.isMemberExpression()) {
                canBeRemoved = false;
                break;
            }

            let AncestorPath = parentPath.parentPath;

            if (AncestorPath.isAssignmentExpression({ "left": parentPath.node })) {
                canBeRemoved = false;
                break;
            }
            if (AncestorPath.isUpdateExpression() && ['++', '--'].includes(AncestorPath.node.operator)) {
                canBeRemoved = false;
                break;
            }

            let { property } = parentPath.node;

            let curKey = types.isIdentifier(property) ? property.name : property.value;

            if (!newMap.has(curKey)) {
                canBeRemoved = false;
                break;
            }

            parentPath.replaceWith(newMap.get(curKey));
        }

        canBeRemoved && path.remove();

        newMap.clear();
    },
}

traverse(ast, decodeObjectofValue);

原 isBaseLiteral 函数:

function isBaseLiteral(node) {

  let literalList = ['window', 'document', 'navigator', 'location', 'history', 'screen',];

  if (types.isLiteral(node) && node.value != null) {//null可能有坑
    return true;
  }

  if (types.isIdentifier(node) && literalList.includes(node.name)) {
    return true;
  }

  if (types.isIdentifier(node) && typeof globalThis[node.name] != "undefined") {
    return true;
  }

  if (types.isUnaryExpression(node) && ["+", "-", "!"].includes(node.operator)) {
    return isBaseLiteral(node.argument);
  }

  return false;
}

大家决定自行取舍。