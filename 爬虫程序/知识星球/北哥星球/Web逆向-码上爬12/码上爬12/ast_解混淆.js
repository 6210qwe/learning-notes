const fs = require("fs");//文件读写
const parse = require("@babel/parser"); //解析为ast
const traverse = require('@babel/traverse').default;//遍历节点
const t = require('@babel/types');//类型
const generator = require('@babel/generator').default;//ast解析为代码


//读取js文件
const jscode = fs.readFileSync(
    './源码.js', {
        encoding: 'utf-8'
    }
);
let ast = parse.parse(jscode);//js转ast

try {
    //TODO 1 字符串简化
    ast = decry_str(ast)//进制数字还原与字符还原

    //TODO 1 标识符-重复赋值
    traverse(ast, {VariableDeclarator: {exit: [ReIdent]},});
    console.log('第一步：标识符-重复赋值已完成')


    //TODO 2 大数组解密
    ast = decrypt_arr(ast)//大数组还原
    console.log('第二步：大数组解密已完成')


    //TODO 3 大数组解密
    // ast = parse.parse(generator(ast).code);//刷新ast
    // ast = decrypt_arr_2(ast)//大数组还原
    // console.log('第二步：大数组解密已完成')


} catch (e) {
    console.log(e);
} finally {
    //TODO Finally ast还原js
    code = generator(ast, opts = {jsescOption: {"minimal": true}}).code// 处理中文Unicode
//文件保存
    fs.writeFile('./demoNew1.js', code, (err) => {
    });
}


function ReIdent(path) {
    // 标识符简化
    let node = path.node;//获取路径节点
    if (!t.isIdentifier(node.id) || !t.isIdentifier(node.init)) return;

    let leftName = node.id.name;//函数名称
    let rightName = node.init.name;//函数名称

    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(leftName);//获取绑定
    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    let paths_sums = 0;
    paths.map(function (refer_path) {
        console.log(refer_path.node.name)
        refer_path.node.name = rightName;//标识符重命名
        paths_sums += 1;//路径+1
    });
    if (paths_sums == paths.length) {//若绑定的每个路径都已处理 ，则移除当前路径
        path.remove();//删除路径
    }
}

function decry_str(ast) {
    //数字与字符还原
    traverse(ast, {
        'StringLiteral|NumericLiteral|DirectiveLiteral'(path) {//迭代字符串|迭代数组匹配--16进制文本还原
            delete path.node.extra; //删除节点的额外部分-触发原始值处理
        },
    });
    return ast;
}

function decrypt_arr(ast) {
    //TODO 1 解密三部分的代码执行
    let end = 5;//切片需要处理的代码块
    let newAst = parse.parse('');//新建ast
    let decrypt_code = ast.program.body.slice(0, end);//切片
    newAst.program.body = decrypt_code// 将前3个节点替换进新建ast
    let stringDecryptFunc = generator(newAst, {compact: true},).code;//转为js，由于存在格式化检测，需要指定选项，来压缩代码// 自动转义
    eval(stringDecryptFunc);//执行三部分的代码


    //TODO 2 准备工作及对解密三部分节点删除
    let stringDecryptFuncAst = ast.program.body[end - 3];// 拿到解密函数所在的节点

    let DecryptFuncName = stringDecryptFuncAst.id.name;//拿到解密函数的名字
    // var rest_code = ast.program.body.slice(end); // 剩下的节点
    // ast.program.body = rest_code;//剩下的节点替换

    //TODO 3 加密数组还原
    traverse(ast, {
        CallExpression(path) {
            // 当变量名与解密函数名相同时，就执行相应操作
            if (t.isIdentifier(path.node.callee,  {name: DecryptFuncName})) {
                let allArgsAreConstant = true;
                // 检查所有参数是否都是常量
                for (let arg of path.node.arguments)  {
                    if (!t.isStringLiteral(arg)  && !t.isNumericLiteral(arg))  {
                        allArgsAreConstant = false;
                        break;
                    }
                }
                // 只有当所有参数都是常量时才进行替换
                if (allArgsAreConstant) {
                    console.log("替换成功！！")
                    path.replaceWith(t.valueToNode(eval(path.toString())));
                }
            }
        },
    });
    return ast;

}

