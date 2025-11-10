const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')
const fs = require('fs')


file1 = process.argv.length > 2 ? process.argv[2] : './input.js'
file2 = process.argv.length > 3 ? process.argv[3] : './output.js'

var allFuncNameList = []  // 定义一个空数组存放插件2中的两个变量名,用于字面量还原


function initCode(ast) {
    traverse(ast, {
        // 从Program节点开始
        Program: function (path) {
            // 获取解密函数
            let expPath0 = path.get('body.0')
            let expPath1 = path.get('body.1')
            let expPath2 = path.get('body.2')
            let expPath3 = path.get('body.3')
            let expPath4 = path.get('body.4')

            // 拼接并执行,加载至内存
            let globalEvalCode = `${expPath0}\n${expPath1}\n${expPath2}\n${expPath3}\n${expPath4}`
            eval(globalEvalCode)
            // 只需要获取函数2和3，它们分别调用了函数1和2
            encFuncName1 = expPath2.node.expression.left.property.name
            encFuncName2 = expPath3.node.expression.left.property.name
            globalInitFunc = expPath4.node.id.name
            // 在普通函数(没有作为对象的方法)中，this指向全局
            this[globalInitFunc] = eval(globalInitFunc)  // 获取解密函数的名字赋值给全局变量
            path.node.body = [path.node.body[path.node.body.length - 1]]  // 删除前5个部分，保留主要代码
        }
    })
}

// 执行如$_BJJJJ(307)
function evalEncFuncName1(arg) {
    let func = `${globalInitFunc}.${encFuncName1}(${arg})`
    let evalRet = eval(func)
    console.log(func, "--->", evalRet)
    return evalRet
}

// 执行mlnsb.$_Dy()[20][26]
function evalEncFuncName2(arg1, arg2) {
    let func = `${globalInitFunc}.${encFuncName2}()[${arg1}][${arg2}]`
    return eval(func)
}

function pathToLiteral(path, value) {
    switch (typeof value) {
        case 'number':
            path.replaceWith(types.numbericLiteral(value))  // 替换
            break
        case 'string':
            path.replaceWith(types.stringLiteral(value))
            break
        case 'boolean':
            path.replaceWith(types.booleanLiteral(value))
            break
        default:
            console.log(path.toString(), '还有其他类型,', typeof value)
            path.replaceWith(types.valueToNode(value))
            break
    }
}

// 1. 替换unicode编码
function replaceUnicode(path) {
    delete path.node.extra  // 删除extra节点即可
}

// 2. 删除逗号表达式，格式如下
/*
var $_CECDv = mlnsb.$_CH
  , $_CECCM = ['$_CECGm'].concat($_CECDv)
  , $_CECEN = $_CECCM[1];
    $_CECCM.shift();
    var $_CECFL = $_CECCM[0];
    var n = this
      , r = n[$_CECEN(1194)]
  */
function collectFuncName(path) {
    let node = path.node
    // 链式匹配所有符合的节点
    if (node.declarations.length != 3  // 只能两个=号
        || node.declarations[0].init == undefined
        || node.declarations[0].init.object == undefined
        || node.declarations[0].init.object.name == undefined
    ) {
        return
    }
    if (node.declarations[0].init.object.name != globalInitFunc) {
        return
    }

    name1 = node.declarations[0].id.name
    name2 = node.declarations[2].id.name
    allFuncNameList.push(name1, name2)

    // 删除无用代码
    path.remove()  // 移除本节点
    let nextPath = path.getNextSibling()  // 获取下一个兄弟节点
    nextPath.remove()
    let subNextPath = path.getNextSibling()  // 获取兄弟节点的兄弟节点
    subNextPath.remove()

}

// 3. 还原字面量$_BJJJJ(307)
function replaceEncFuncName1(path) {
    let node = path.node
    let name = node.callee.name
    // 匹配符合$_BJJJJ(307)这样格式的调用函数
    if (node.callee == undefined
        || node.callee.name == undefined
        || allFuncNameList.indexOf(name) === -1) {
        return
    }  // 保证节点存在且需要在大数组里
    // 不能是函数中的形参
    let functionPath = path.findParent(p => p.isFunction())  // 没有返回null
    if (functionPath) {
        let params = functionPath.node.params;
        for (let param of params) {
            if (name === param.name) {
                console.log(`${name}是形参，不能转换`)
                return;
            }
        }
    }
    // 获取参数
    if (!node.arguments[0] || node.arguments.length !== 1) {
        return
    }
    let arg = node.arguments[0].value
    if (typeof arg !== 'number') {
        return;
    }
    let ret = evalEncFuncName1(arg)
    pathToLiteral(path, ret)
}

// 有一个特殊的，需要单独还原, mlnsb.$_CH(73) 解密函数自身调用了
function replaceSpecialEncFuncName1(path) {
    let node = path.node
    if (node.callee == undefined
        || node.callee.property == undefined
        || node.callee.property.name != encFuncName1) {
        return
    }  // 保证节点存在且需要在大数组里
    // 获取参数
    let arg = node.arguments[0].value
    let ret = evalEncFuncName1(arg)
    pathToLiteral(path, ret)
}

// 4. 还原for-switch语句, 格式如下
/*var $_DCGHa = mlnsb.$_Dy()[0][26];
for (; $_DCGHa !== mlnsb.$_Dy()[4][23];) {
switch ($_DCGHa) {
  case mlnsb.$_Dy()[16][26]:
    var n = 1;
    $_DCGHa = mlnsb.$_Dy()[0][25];
    break;
}
}*/
function deleteForStatement(path) {
    let node = path.node
    let prevSiblingPath = path.getPrevSibling()  // 获取上一个兄弟节点
    let prevSiblingNode = prevSiblingPath.node
    // 获取函数名
    if (prevSiblingNode == undefined
        || prevSiblingNode.declarations == undefined
        || prevSiblingNode.declarations[0].init == undefined
        || prevSiblingNode.declarations[0].init.object == undefined
        || prevSiblingNode.declarations[0].init.object.object == undefined
        || prevSiblingNode.declarations[0].init.object.object.callee == undefined
    ) {
        return
    }
    if (prevSiblingNode.declarations[0].init.object.object.callee.object.name != globalInitFunc
        || prevSiblingNode.declarations[0].init.object.object.callee.property.name != encFuncName2) {
        return
    }
    // 获取初始化的两个参数
    let initArg1 = prevSiblingNode.declarations[0].init.object.property.value
    let initArg2 = prevSiblingNode.declarations[0].init.property.value
    let initRet = evalEncFuncName2(initArg1, initArg2)

    // 获取for循环的两个参数
    let forArg1 = node.test.right.object.property.value
    let forArg2 = node.test.right.property.value
    let forRet = evalEncFuncName2(forArg1, forArg2)

    // 获取switch中每一个case的两个参数
    let $SwitchStatement = node.body.body[0]
    let caseList = $SwitchStatement.cases
    let resultTarget = []  // 收集case中的所有结果
    for (let $case of caseList) {
        for (; initRet !== forRet;) {
            let caseArg1 = $case.test.object.property.value
            let caseArg2 = $case.test.property.value
            let caseRet = evalEncFuncName2(caseArg1, caseArg2)
            if (initRet == caseRet) {
                let caseContent = $case.consequent
                // 最后一个语句必须是break,倒数第二个必须是表达式语句
                if (types.isBreakStatement(caseContent[caseContent.length - 1])) {
                    if (types.isExpressionStatement(caseContent[caseContent.length - 2])) {
                        let expArg1 = caseContent[caseContent.length - 2].expression.right.object.property.value
                        let expArg2 = caseContent[caseContent.length - 2].expression.right.property.value
                        initRet = evalEncFuncName2(expArg1, expArg2)  // 更新initRet
                        caseContent.pop()  // 最后两个语句没用了 .pop():删除最后一个节点
                        caseContent.pop()
                    } else if (types.isReturnStatement(caseContent[caseContent.length - 2])) {
                        caseContent.pop()  // 只需要删除break
                    }
                }
                resultTarget = resultTarget.concat(caseContent)
                break
            } else {
                break
            }
        }
    }
    prevSiblingPath.remove()  // 删除兄弟节点
    path.replaceWithMultiple(resultTarget)  // 替换
}

// -------------------------分割线-------------------------
// 去除逗号表达式
const resolveSequence = {
    SequenceExpression(path) {
        let {scope, parentPath, node} = path;
        let expressions = node.expressions;
        if (parentPath.isReturnStatement({"argument": node})) {
            let lastExpression = expressions.pop();
            for (let expression of expressions) {
                parentPath.insertBefore(types.ExpressionStatement(expression = expression));
            }

            path.replaceInline(lastExpression);
        } else if (parentPath.isExpressionStatement({"expression": node})) {
            let body = [];
            expressions.forEach(express => {
                body.push(types.ExpressionStatement(express));
            });
            path.replaceWithMultiple(body);
        } else {
            return;
        }

        scope.crawl();
    }
}


// -------------------------分割线-------------------------
// 赋值语句嵌套三目表达式的优化
const TransConditionOfAssignment = {
    ConditionalExpression(path) {
        let {parentPath, node} = path;
        let {test, consequent, alternate} = node;
        if (parentPath.isAssignmentExpression({"right": node})) {
            let {operator, left} = parentPath.node;

            consequent = types.AssignmentExpression(operator, left, consequent);
            alternate = types.AssignmentExpression(operator, left, alternate);
            parentPath.replaceWith(types.conditionalExpression(test, consequent, alternate));
        }
    },
}


// -------------------------分割线-------------------------
// 条件表达式转if语句，支持嵌套的条件表达式，及子节点包含逗号表达式的情况
const ConditionToIf = {
    ConditionalExpression: {
        exit(path) {
            let {test, consequent, alternate} = path.node;
            if (types.isSequenceExpression(consequent)) {
                let expressions = consequent.expressions;
                let retBody = [];
                for (let expression of expressions) {
                    retBody.push(types.ExpressionStatement(expression));
                }
                consequent = types.BlockStatement(retBody);
            } else {
                consequent = types.ExpressionStatement(consequent);
                consequent = types.BlockStatement([consequent]);
            }
            if (types.isSequenceExpression(alternate)) {
                let expressions = alternate.expressions;
                let retBody = [];
                for (let expression of expressions) {
                    retBody.push(types.ExpressionStatement(expression));
                }
                alternate = types.BlockStatement(retBody);
            } else {
                alternate = types.ExpressionStatement(alternate);
                alternate = types.BlockStatement([alternate]);
            }
            let ifStateNode = types.IfStatement(test, consequent, alternate);
            path.replaceWithMultiple(ifStateNode);
            path.skip();
        }
    }
}

// -------------------------分割线-------------------------
// LogicalExpression 转 IfStatement
const LogicalToIfStatement = {
    LogicalExpression(path) {
        let {node, parentPath} = path;
        if (!parentPath.isExpressionStatement()) {
            return;
        }
        let {left, operator, right} = node;

        let blockNode = types.BlockStatement([]);
        let newNode = types.BlockStatement([types.ExpressionStatement(right)])

        let ifNode = undefined;

        if (operator == "||") {
            ifNode = types.IfStatement(left, blockNode, newNode);
        } else if (operator == "&&") {
            ifNode = types.IfStatement(left, newNode, null);
        } else {
            return;
        }

        parentPath.replaceWith(ifNode);
    }
}

visitor = {
    StringLiteral: {enter: [replaceUnicode]},
    VariableDeclaration: {enter: [collectFuncName]},
    CallExpression: {enter: [replaceEncFuncName1, replaceSpecialEncFuncName1]},
    ForStatement: {enter: [deleteForStatement]}
}

function main() {
    var jsCode = fs.readFileSync(file1, {encoding: "utf8"})
    let jsAST = parser.parse(jsCode)  // 解析成ast
    initCode(jsAST)
    traverse(jsAST, visitor)
    traverse(jsAST, TransConditionOfAssignment);
    for (let i = 0; i < 3; i++) {
        traverse(jsAST, resolveSequence);
        traverse(jsAST, ConditionToIf);
        traverse(jsAST, LogicalToIfStatement);
    }
    const {code} = generator(jsAST, {jsescOption: {minimal: true}})
    fs.writeFileSync(file2, code)
    // console.log(allFuncNameList)
    console.log('反混淆成功！')
}

main()