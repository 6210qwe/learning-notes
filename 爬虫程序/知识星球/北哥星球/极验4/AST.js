
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const fs = require("fs");


// js混淆代码
process.argv.length > 2 ? encode_file = process.argv[2] : encode_file = "./源2.js";
process.argv.length > 3 ? decode_file = process.argv[3] : decode_file = "./解混淆2.js";


// #######################################
// AST解析函数
// #######################################


// 简化字符， unicode 字符串 和 表达式 1e3
const simplifyLiteral = {
    "NumericLiteral|StringLiteral"(path){
        var node = path.node;
        if (node.extra === undefined)
            return;
        delete node.extra;
    }
};


/*
var t = 5 * Math["random"](2),
    s = t - 1,
    n = [];
    -------------
    var t = 5 * Math["random"](2);
var s = t - 1;
var n = [];
 */
// 简单逗号表达式处理
function deal_VariableDeclarator(path) {
    if (t.isForStatement(path.parent)) {
        return;
    }
    var node = path.node;
    let body = [];
    if (node.declarations && node.declarations.length > 1) {
        node.declarations.forEach(dec => {
            body.push(t.variableDeclaration("var", [dec]));
        });
        path.replaceInline(body);
    }
}

// 定义一个全局变量，存放待替换变量名
let name_array = [];

// 获取待替换的名称
function get_name_array(path) {
    let {kind, declarations} = path.node;
    if (kind !== 'var'
        || declarations.length !== 3
        || declarations[0].init === null
        || declarations[0].init.property === undefined)
        return;
    if (declarations[0].init.property.name !== funPropertyName[2])
        return;
    // 获取待替换节点变量名
    let name1 = declarations[0].id.name;
    // 获取待输出变量名
    let name2 = declarations[2].id.name;
    // 将变量名存入数组
    name_array.push(name1, name2);

    // 删除下一个节点
    path.getNextSibling().remove();
    // 删除下一个节点
    path.getNextSibling().remove();
    // 删除path节点
    path.remove()
}

// 替换节点
function replace_name_array(path) {
    let {callee, arguments} = path.node
    if (callee === undefined || callee.name === undefined)
        return;
    // 不在name_array中的节点不做替换操作
    if (name_array.indexOf(callee.name) === -1)
        return;
    // 调用ySWRY.$_Ck函数获取结果
    let value = global_obj_name_fun[funPropertyName[2]](arguments[0].value);

    // 创建节点并替换结果
    let string_node = t.stringLiteral(value);
    path.replaceWith(string_node)
}

// 控制流平坦化
function replace_ForStatement(path) {
    var node = path.node;

    // 获取上一个节点，也就是VariableDeclaration
    var PrevSibling = path.getPrevSibling();
    // 判断上个节点的各个属性，防止报错
    if (PrevSibling.type === undefined
        || PrevSibling.container === undefined
        || PrevSibling.container[0].declarations === undefined
        || PrevSibling.container[0].declarations[0].init === null
        || PrevSibling.container[0].declarations[0].init.object === undefined
        || PrevSibling.container[0].declarations[0].init.object.object === undefined)
        return;
    if (PrevSibling.container[0].declarations[0].init.object.object.callee.property.name !== funPropertyName[3])
        return;

    // if (PrevSibling.node.declarations[0].init.object.object.callee.property.name !== funPropertyName[3])
    //     return;

    // SwitchStatement节点
    var body = node.body.body;
    // 判断当前节点的body[0]属性和body[0].discriminant是否存在
    if (!t.isSwitchStatement(body[0]))
        return;
    if (!t.isIdentifier(body[0].discriminant))
        return;

    // 获取控制流的初始值
    var argNode = PrevSibling.container[0].declarations[0].init;
    var init_arg_f = argNode.object.property.value;
    var init_arg_s = argNode.property.value;
    var init_arg = global_obj_name_fun[funPropertyName[3]]()[init_arg_f][init_arg_s];

    // 提取for节点中的if判断参数的value作为判断参数, 退出循环判断
    var break_arg_f = node.test.right.object.property.value;
    var break_arg_s = node.test.right.property.value;
    var break_arg = global_obj_name_fun[funPropertyName[3]]()[break_arg_f][break_arg_s];

    // 提取switch下所有的case
    var case_list = body[0].cases;
    var resultBody = [];

    // 遍历全部的case
    for (var i = 0; i < case_list.length; i++) {
        for (; init_arg != break_arg;) {

            // 提取并计算case后的条件判断的值
            var case_arg_f = case_list[i].test.object.property.value;
            var case_arg_s = case_list[i].test.property.value;
            var case_init = global_obj_name_fun[funPropertyName[3]]()[case_arg_f][case_arg_s];

            if (init_arg == case_init) {
                //当前case下的所有节点
                var targetBody = case_list[i].consequent;

                // 删除break节点，和break节点的上一个节点的一些无用代码
                if (t.isBreakStatement(targetBody[targetBody.length - 1])
                    && t.isExpressionStatement(targetBody[targetBody.length - 2])
                    && targetBody[targetBody.length - 2].expression.right.object.object.callee.object.name == global_obj_name) {

                    // 提取break节点的上一个节点AJgjJ.EMf()后面的两个索引值
                    var change_arg_f = targetBody[targetBody.length - 2].expression.right.object.property.value;
                    var change_arg_s = targetBody[targetBody.length - 2].expression.right.property.value;

                    // 修改控制流的初始值
                    init_arg = global_obj_name_fun[funPropertyName[3]]()[change_arg_f][change_arg_s];

                    // global_obj_name.funPropertyName[3][change_arg_f][change_arg_s];

                    targetBody.pop(); // 删除break
                    targetBody.pop(); // 删除break节点的上一个节点
                }
                //删除break
                else if (t.isBreakStatement(targetBody[targetBody.length - 1])) {
                    targetBody.pop();
                }
                resultBody = resultBody.concat(targetBody);
                break;
            } else {
                break;
            }
        }
    }
    //替换for节点，多个节点替换一个节点用replaceWithMultiple
    path.replaceWithMultiple(resultBody);

    //删除上一个节点
    PrevSibling.remove();
}

// 删除无关函数
function delete_express(path) {
    let {expression} = path.node
    if (expression === undefined
        || expression.left === undefined
        || expression.left.property === undefined)
        return;

    if (expression.left.property.name === funPropertyName[0]
        || expression.left.property.name === funPropertyName[1]
        || expression.left.property.name === funPropertyName[2]
        || expression.left.property.name === funPropertyName[3]
    ) {
        path.remove()
    }
}

// 获取全局函数
function getGlobalFunc(){
    let program_body= ast.program.body;
    if(program_body && program_body.length === 6){
        for (var i=0; i<program_body.length-1; i++){
            // 拿到body 前5个节点自执行
            globalCode += generator(program_body[i]).code + "\n";
            if(i<4){
                // 获取全局 ySWRY
                global_obj_name = program_body[i].expression.left.object.name;
                // 为了获取对应名称 ySWRY.$_Ck
                funPropertyName.push(program_body[i].expression.left.property.name);
            }
        }
        return globalCode
    }
}

// 删除无用方法
function delete_func(path) {
    let {id} = path.node;
    if(id.name == global_obj_name){
        path.remove()
    }
}

// #######################################

// #######################################
// AST还原流程
// #######################################

// 读取需要解码的js文件, 注意文件编码为utf-8格式
let jscode = fs.readFileSync(encode_file, {encoding: "utf-8"});

// 将js代码修转成AST语法树
let ast = parser.parse(jscode);

console.time("处理完毕，耗时");

var global_obj_name = '';   // ySWRY
var globalCode = '';
var funPropertyName = [];


// 获取自执行方法
globalCode = getGlobalFunc();
eval(globalCode);
// console.log('funPropertyName--', funPropertyName);  // [ '$_AB', '$_Bx', '$_Ck', '$_DK' ]

// 全局方法 ySWRY
global_obj_name_fun = eval("(" + global_obj_name + ")");

// 简化字符串
traverse(ast, simplifyLiteral);

// AST结构修改逻辑
const visitor = {

    VariableDeclaration: {
        enter: [get_name_array]
    },
    CallExpression: {
        enter: [replace_name_array]
    },
    ForStatement: {
        enter: [replace_ForStatement]
    },
    ExpressionStatement: {
        enter: [delete_express]
    },
    FunctionDeclaration: {
        enter: [delete_func]
    }
};


// 遍历语法树节点，调用修改函数
traverse(ast, visitor);


resolveSequence_t = {
    VariableDeclaration: {
        exit: [deal_VariableDeclarator]
    },
};

// 简单逗号表达式 还原
traverse(ast, resolveSequence_t);


console.timeEnd("处理完毕，耗时");

// 将ast转成js代码，{jsescOption: {"minimal": true}} unicode -> 中文
let {code} = generator(ast, opts = {jsescOption: {"minimal": true}});
// 将js代码保存到文件
fs.writeFile(decode_file, code, (err) => {
});

console.log("end");

