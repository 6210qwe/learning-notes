插件更新:变量分离。

/******************************
处理前:
var a = 123,b = 456;
let c = 789,d = 120;
处理后:
var a = 123;
var b = 456;
let c = 789;
let d = 120;
******************************/

const DeclaratorToDeclaration =
{
    VariableDeclaration(path) {
        let { parentPath, node } = path;
        if (parentPath.isFor()) {
            return;
        }
        let { declarations, kind } = node;

        if (declarations.length == 1) {
            return;
        }

        let newNodes = [];

        for (const varNode of declarations) {
            let newDeclartionNode = types.VariableDeclaration(kind, [varNode]);
            newNodes.push(newDeclartionNode);
        }

        path.replaceWithMultiple(newNodes);

    },
}

traverse(ast, DeclaratorToDeclaration);