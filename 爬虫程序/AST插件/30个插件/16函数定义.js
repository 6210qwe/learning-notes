处理前
var a = function ()
{
  console.log(666);
}
处理后
function a() {
  console.log(666);
}
******************************/

const varDeclarToFuncDeclar =
{
    VariableDeclaration(path) {
        let { parentPath, node, scope } = path;
        if (!parentPath.isBlock()) {//过滤掉部分特殊情况，例如for循环里的变量定义
            return;
        }
        let { declarations, kind } = node;
        if (declarations.length != 1) {
            return;
        }

        let { id, init } = declarations[0];
        if (!types.isFunctionExpression(init, { id: null })) {
            return;
        }

        let { params, body } = init;
        let newNode = types.FunctionDeclaration(id, params, body);
        path.replaceWith(newNode);
        scope.crawl();
    }
}

traverse(ast, varDeclarToFuncDeclar);