const files = require('fs');  //导入文件库，防止与fs变量名冲突
const types = require("@babel/types");
const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const NodePath = require("@babel/traverse").NodePath; //智能提示所需

//js混淆代码读取
const encodeFile = process.argv.length > 2 ? process.argv[2] : "./encode.js";  //默认的js文件
const decodeFile = "./decode.js";

//将源代码解析为AST
let sourceCode = files.readFileSync(encodeFile, { encoding: "utf-8" });
let ast = parser.parse(sourceCode,{"sourceType":"module"});


console.timeEnd("处理完毕，耗时");
traverse(ast, simplifyLiteral);
let { code } = generator(ast, opts = {
	"compact": true,  // 是否压缩代码
	"comments": true,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});
files.writeFile(decodeFile, code, (err) => { });