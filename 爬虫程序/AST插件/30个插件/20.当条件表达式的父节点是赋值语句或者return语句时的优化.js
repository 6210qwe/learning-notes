#插件更新  当条件表达式的父节点是赋值语句或者return语句时的优化。

/*******************************************************
处理前:
a = b?c:d;

处理后:

b ? a = c : a = d;

*******************************************************/

const template = require("@babel/template").default;

let retNODE = template(`if(A){return B;}else{return C;}`);

const TransConditionExpression =
    {
        AssignmentExpression(path)
        {
            let {left,operator,right} = path.node;

            if (!types.isConditionalExpression(right))
            {
                return;
            }

            let {test, consequent, alternate} = right;

            consequent = types.AssignmentExpression(operator, left, consequent);
            alternate  = types.AssignmentExpression(operator, left, alternate);

            path.replaceWith(types.ConditionalExpression(test, consequent, alternate));
        },
        ReturnStatement(path) {
            let { argument } = path.node;

            if (!types.isConditionalExpression(argument)) {
                return;
            }

            let {test, consequent, alternate} = argument;

            let retNode = retNODE({"A":test,"B":consequent,"C":alternate,})

            path.replaceWith(retNode);
        },

    }

traverse(ast, TransConditionExpression);