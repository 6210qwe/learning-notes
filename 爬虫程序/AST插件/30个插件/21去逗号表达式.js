#插件更新  去逗号表达式

/******************************************************
((N = N || new aH(), a = [!(U = ["Z", "H", 2], 0), "t", "fi"], N.Ih) && (this[U[0]] = N.Ih), N.P) != null && (this[U[1]] = !!N.P);

==>

U = ["Z", "H", 2];
N = N || new aH();
a = [true, "t", "fi"];
N.Ih && (this[U[0]] = N.Ih);
N.P != null && (this[U[1]] = !!N.P);

******************************************************/

const resolveSequence =
{
    SequenceExpression:
    {
        /**  @param  {NodePath} path */
        exit(path) {

            let statementPath = path.getStatementParent();

            if (!statementPath) return;

            let canVisitFlag = true;

            statementPath.traverse({
                "LogicalExpression|ConditionalExpression|SequenceExpression"(_path) {
                    if (!_path.isAncestor(path)) {

                        return;
                    }

                    if (_path.isSequenceExpression())
                    {
                        canVisitFlag = false;
                        _path.stop();
                    }

                    let key = _path.isLogicalExpression() ? "left" : "test";

                    let execPath = _path.get(key);

                    if (execPath != path && !execPath.isAncestor(path)) {
                        canVisitFlag = false;
                        _path.stop();
                    }
                },
            })

            if (!canVisitFlag) return;

            if (statementPath.isLoop()) {//循环表达式内的test节点，不能随意插在该表达式前面

                let initPath = statementPath.get('init');

                if (initPath.node == undefined || (initPath != path && !initPath.isAncestor(path))) {
                    return
                }
            }

            let expressions = path.node.expressions;
            let lastNode = expressions.pop();

            for (let expression of expressions) {
                statementPath.insertBefore(types.ExpressionStatement(expression = expression));
            }

            path.replaceWith(lastNode);

        }
    }
}

traverse(ast,resolveSequence);

提前还原逻辑表达式和条件表达式，再使用该插件，效果更佳。

更新日志
1.修正一个bug:

使用原来的插件还原会有问题。
(r += -9,t = function (t){
    var r;
    return r = function (t,r) {
        return cT.call(1,t-9,r)
    },
    u[o.c(r,(r(),15),(r(),52))](this,arguments);
});

原插件:
