/*********************************************************
var a =1+2;
var b = 1/ 0;
var g = !![];
var f = String.fromCharCode(66);
var i = "AST is Good!".length;
var h = Math.tan(30);

===>

var a = 3;
var b = 1 / 0;
var g = true;
var f = "B";
var i = 12;
var h = -6.405331196646276;
*********************************************************/

// 检查路径或其任一子路径是否包含逗号表达式
function containsSequenceExpression(path) {
    let containsSequence = false;
    // 深度优先遍历当前路径及其所有子路径
    path.traverse({
        SequenceExpression(_path) {
            containsSequence = true;
            _path.stop(); // 找到逗号表达式后立即停止遍历
        }
    });
    return containsSequence;
}

//请使用学员专版babel库
const constantFold = {
    "BinaryExpression|UnaryExpression|MemberExpression|CallExpression"(path) {
        if (containsSequenceExpression(path)) {
            return;
        }
        if (path.isUnaryExpression({ operator: "-" }) ||
            path.isUnaryExpression({ operator: "void" })) {
            return;
        }
        const { confident, value } = path.evaluate();

        if (!confident || typeof value == "function")
            return;

        if (typeof value == 'number' && (!Number.isFinite(value))) {
            return;
        }

        console.log(path.toString(),"--->",value);

        path.replaceWith(types.valueToNode(value));
    },
}

traverse(ast, constantFold);

更新日志:

① 去掉了 Identifier 类型，将 变量初始化为 [] 时，还原出错。
可使用 https://t.zsxq.com/18sc8liwt 插件进行代替。
② 默认不遍历 SequenceExpression 类型，考虑到某些情况导致代码误删；
③ 代码中第二个 return 对应 var b = 1/ 0; 这种情况。
④ MemberExpression 类型建议通用改为 . 符号来访问成员。
可优先处理:
https://t.zsxq.com/18uc7EUa6
⑤新增CallExpression类型，可还原大部分String，Number，Math的成员函数。