// fs模块 用于操作文件的读写
const fs = require("fs");
// @babel/parser 用于将JavaScript代码转换为ast树
const parser = require("@babel/parser");
// @babel/traverse 用于遍历各个节点的函数
const traverse = require("@babel/traverse").default;
// @babel/types 节点的类型判断及构造等操作
const types = require("@babel/types");
// @babel/generator 将处理完毕的AST转换成JavaScript源代码
const generator = require("@babel/generator").default;


// 读取混淆的js文件
let jsCode = 'var a = \'a\' + \'b\' + \'c\' + d + \'e\' + \'f\';';
// 将javascript代码转换为ast树(json结构)
let ast = parser.parse(jsCode)

// todo 编写ast插件
// const visitor = {
// 	"BinaryExpression"(path)
// 	{
// 		console.log(path.toString())
// 		const {confident,value} = path.evaluate();
// 		confident && path.replaceWith(types.valueToNode(value));
// 	},
// }

const visitor = {
    "BinaryExpression": {
        exit: function(path) {
            console.log(path.toString())
            const {confident, value} = path.evaluate();
            confident && path.replaceWith(types.valueToNode(value));
        }
    },
}
// 调用插件,处理混淆的代码
traverse(ast,visitor)

// 将处理后的ast转换为js代码(反混淆后的代码)
let {code} = generator(ast);
console.log(code)
// 保存代码
// fs.writeFile('decode.js', code, (err)=>{});