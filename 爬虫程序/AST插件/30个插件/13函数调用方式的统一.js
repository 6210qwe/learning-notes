函数调用方式的统一:

/********************************************************

RY.B5.call(null, SB, XU, Ws);
RY.O5.apply(null, [rU(rU([])), Rs, gm]);
HY.apply(null, [rU(rU([])), Rs, gm]);

==>

RY.B5(SB, XU, Ws);
RY.O5(rU(rU([])), Rs, gm);
HY(rU(rU([])), Rs, gm);

********************************************************/

const changeForCallExpression =
{
    CallExpression(path) {

        let { callee, arguments } = path.node;

        if (!types.isMemberExpression(callee) || arguments.length < 2) {
            return;
        }

        let { object, property, computed } = callee;

        let key = computed ? property.value : property.name;

        if (key == "call") {
            let firstArg = arguments[0];
            if (types.isIdentifier(firstArg, { "name": "undefined" }) || types.isNullLiteral(firstArg)) {

                let callNode = types.CallExpression(object, arguments.slice(1));
                path.replaceWith(callNode);
            }

            return;
        }
        if (key == "apply" && arguments.length == 2 && types.isArrayExpression(arguments[1])) {
            let firstArg = arguments[0];

            if (types.isIdentifier(firstArg, { "name": "undefined" }) || types.isNullLiteral(firstArg)) {
                let callNode = types.CallExpression(object, arguments[1].elements);
                path.replaceWith(callNode);
            }

            return;
        }

    }
}

traverse(ast, changeForCallExpression);

这种插件思路就很简单了，知道还原前后的代码，然后注意判断过滤即可。