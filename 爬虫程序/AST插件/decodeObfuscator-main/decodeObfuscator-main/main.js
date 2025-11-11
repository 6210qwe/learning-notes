// /*****************************************************
// Module name:main.js
// Author:悦来客栈的老板
// Date:2022.08.15
//
//
// 混淆工具地址:https://obfuscator.io/
//
// 脚本仅用于被obfuscator混淆了的代码，不支持商业工具混淆的代码
//
// 声明:
//
// 脚本仅用于学习研究，禁止非法使用，否则后果自负！
//
//
// 使用方法可以观看在线视频:
//
// https://www.bilibili.com/video/BV16V411H7yz
//
// *****************************************************/
//
// const fs               = require('fs');
// const usefulPlugins    = require("./tools/babel_pack");
//
//
//
// //js混淆代码读取
// process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./input/demo.js";
// process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./output/decodeResult.js";
//
// //将源代码解析为AST
// let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
// let ast    = parser.parse(sourceCode);
//
// if(!sourceCode.includes("_0x"))
// {
// 	console.log("混淆代码非ob混淆，直接退出！");
// 	process.exit(0);
// }
//
// console.time("处理完毕，耗时");
//
//
// //字面量解混淆
// console.log("traverse Hex or Unicode String.......");
//
// traverse(ast, simplifyLiteral);
//
// console.log("constantFold.......");
//
// traverse(ast, constantFold);
//
// console.log("delete Repeat Define.......");
//
// traverse(ast, deleteRepeatDefine);
//
// traverse(ast, SimplifyIfStatement);
//
// traverse(ast, standardLoop);
//
// console.log("resolve Sequence.......");
//
// traverse(ast, resolveSequence);
//
// console.log("traverse CallExpress To ToLiteral.......");
//
// traverse(ast, CallExpressToLiteral);
//
// console.log("constantFold.......");
//
// traverse(ast, constantFold);
//
//
// //object key值Literal
// console.log("Object Preconditioning .......");
//
// traverse(ast, keyToLiteral);
//
// traverse(ast, preDecodeObject);
//
// //处理object
//
// console.log("Object Decode .......");
//
//
// traverse(ast, decodeObject);
//
//
// console.log("Control Flow Decoding.......\n");
//
// traverse(ast, decodeControlFlow);
//
// console.log("constantFold.......");
//
// traverse(ast, constantFold);
//
// console.log("remove Dead Code.......\n");
//
// traverse(ast, removeDeadCode);
//
// ast = parser.parse(generator(ast).code);
//
// traverse(ast, removeDeadCode);
//
// traverse(ast, simplifyLiteral);
//
//
// //可能会误删一些代码，可屏蔽
// traverse(ast, deleteObfuscatorCode);
//
// console.log(7777777788)
// console.timeEnd("处理完毕，耗时");
//
// let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});
// console.log(code)
// fs.writeFile(decodeFile, code, (err) => {});
//
//




/*****************************************************
Module name:main.js
Author:悦来客栈的老板
Date:2022.08.15
修改：补充依赖、错误处理和路径检查
*****************************************************/

// 1. 补充缺失的核心依赖（必须安装）
const fs = require('fs');
const path = require('path'); // 用于路径处理
const parser = require('@babel/parser'); // AST解析器
const traverse = require('@babel/traverse').default; // AST遍历工具
const generator = require('@babel/generator').default; // AST转代码
const {
  simplifyLiteral,
  constantFold,
  deleteRepeatDefine,
  SimplifyIfStatement,
  standardLoop,
  resolveSequence,
  CallExpressToLiteral,
  keyToLiteral,
  preDecodeObject,
  decodeObject,
  decodeControlFlow,
  removeDeadCode,
  deleteObfuscatorCode
} = require("./tools/babel_pack"); // 解构工具函数


// 2. 输入输出路径处理（添加目录检查）
const encodeFile = process.argv.length > 2 ? process.argv[2] : "./input/demo.js";
const decodeFile = process.argv.length > 3 ? process.argv[3] : "./output/decodeResult.js";

// 确保输出目录存在（若不存在则创建）
const outputDir = path.dirname(decodeFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true }); // recursive: true 支持创建多级目录
}


// 3. 主逻辑（添加错误捕获）
try {
  // 读取输入文件（检查文件是否存在）
  if (!fs.existsSync(encodeFile)) {
    throw new Error(`输入文件不存在：${encodeFile}\n请检查路径或创建input/demo.js`);
  }
  const sourceCode = fs.readFileSync(encodeFile, { encoding: "utf-8" });

  // 检查是否为ob混淆代码
  if (!sourceCode.includes("_0x")) {
    console.log("混淆代码非ob混淆，直接退出！");
    process.exit(0);
  }

  // 解析AST
  let ast;
  try {
    ast = parser.parse(sourceCode, {
      sourceType: "module", // 支持ES模块语法
      plugins: ["jsx", "flow"] // 按需添加插件，避免解析报错
    });
  } catch (parseErr) {
    throw new Error(`AST解析失败：${parseErr.message}\n可能是代码存在语法错误`);
  }

  console.time("处理完毕，耗时");

  // 4. 解混淆处理步骤（保持原逻辑，确保工具函数可用）
  console.log("traverse Hex or Unicode String.......");
  traverse(ast, simplifyLiteral);

  console.log("constantFold.......");
  traverse(ast, constantFold);

  console.log("delete Repeat Define.......");
  traverse(ast, deleteRepeatDefine);

  traverse(ast, SimplifyIfStatement);
  traverse(ast, standardLoop);

  console.log("resolve Sequence.......");
  traverse(ast, resolveSequence);

  console.log("traverse CallExpress To ToLiteral.......");
  traverse(ast, CallExpressToLiteral);

  console.log("constantFold.......");
  traverse(ast, constantFold);

  console.log("Object Preconditioning .......");
  traverse(ast, keyToLiteral);
  traverse(ast, preDecodeObject);

  console.log("Object Decode .......");
  traverse(ast, decodeObject);

  console.log("Control Flow Decoding.......\n");
  traverse(ast, decodeControlFlow);

  console.log("constantFold.......");
  traverse(ast, constantFold);

  console.log("remove Dead Code.......\n");
  traverse(ast, removeDeadCode);

  // 重新解析AST（避免结构错乱）
  ast = parser.parse(generator(ast).code);
  traverse(ast, removeDeadCode);
  traverse(ast, simplifyLiteral);

  // 可选：删除混淆残留代码
  traverse(ast, deleteObfuscatorCode);

  // 5. 生成并输出结果
  console.log(7777777788); // 确认执行到此处
  console.timeEnd("处理完毕，耗时");

  const { code } = generator(ast, {
    jsescOption: { "minimal": true },
    compact: false, // 格式化输出，便于阅读
    comments: false // 移除注释
  });

  // 打印生成的代码（若过长会被截断，可打印长度验证）
  console.log("生成的代码长度：", code.length);
  console.log("生成的代码前100字符：", code.slice(0, 100));

  // 写入文件（添加错误处理）
  fs.writeFile(decodeFile, code, (err) => {
    if (err) {
      console.error("写入文件失败：", err.message);
    } else {
      console.log(`解混淆完成，文件已保存至：${decodeFile}`);
    }
  });

} catch (err) {
  // 捕获所有错误并提示
  console.error("\n执行失败：", err.message);
  process.exit(1); // 异常退出
}
