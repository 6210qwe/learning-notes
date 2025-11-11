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

console.time("处理完毕，耗时");

console.timeEnd("处理完毕，耗时");
// traverse(ast, simplifyLiteral);
// 将AST转换为JS代码
let { code } = generator(ast, {
  "compact": true,  // 压缩代码（去掉多余空格）
  "comments": true,  // 保留注释
  "jsescOption": { "minimal": true }  // 尽量不使用Unicode转义（如中文直接显示）
});

// 写入输出文件
files.writeFile(decodeFile, code, (err) => { });