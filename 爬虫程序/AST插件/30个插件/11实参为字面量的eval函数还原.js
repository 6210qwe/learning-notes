之前一直无法完美的替换eval节点，使用replaceWithSourceString这个方法，会有一点点的小问题，不是那么完美。

都准备放弃了，偶尔百度之，发现了这个解答:

https://stackoverflow.com/questions/54771086/babel...

依葫芦画瓢，尝试几次后，搞出了个完美的解决方案，代码如下:

const template = require("@babel/template");
const replaceEvalNode = {
    CallExpression: {
        exit: function (path) {
            let { callee, arguments } = path.node;
            if (arguments.length !== 1 ||
                !types.isLiteral(arguments[0])) return;
            if (types.isIdentifier(callee, { name: "eval" })) {
                const evalNode = template.statements.ast(arguments[0].value);
                path.replaceWithMultiple(evalNode);
            }
        },
    }
}

traverse(ast, replaceEvalNode);