#插件更新
/***********************************
var a = "a" + "b" + c;
var b = c + "d" + "e";
var c = "a" + "b" + c + "d" + "e";

===>

var a = "ab" + c;
var b = c + "de";
var c = "ab" + c + "de";

***********************************/

const calcPartBinaryExpression =
{
    "BinaryExpression"(path) {

        let { parent, scope, parentPath, node } = path;

        let { left, operator, right } = node;

        if (types.isLiteral(left) && types.isLiteral(right)) {
            const { confident, value } = path.evaluate();
            if (!confident || value == "Infinity") return;
            path.replaceWith(types.valueToNode(value));
            return;
        }

        if (parentPath.isBinaryExpression({ left: node })) {
            if (!types.isLiteral(left) && operator == "+" &&
                types.isLiteral(right)) {
                if (parent.operator == "+" && types.isLiteral(parent.right)) {

                    path.node.right.value += parent.right.value;

                    parentPath.replaceWith(path.node);
                }
            }
        }
    },
}

traverse(ast, calcPartBinaryExpression);