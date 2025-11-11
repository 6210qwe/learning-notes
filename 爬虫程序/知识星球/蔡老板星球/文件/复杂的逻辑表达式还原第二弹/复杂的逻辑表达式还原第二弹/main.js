const files = require('fs');  //导入文件库，防止与fs变量名冲突
const types = require("@babel/types");

const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const NodePath = require("@babel/traverse").NodePath; //智能提示所需

//js混淆代码读取
const encodeFile = process.argv.length > 2 ? process.argv[2] : "./encode.js";  //默认的js文件
const decodeFile = process.argv.length > 3 ? process.argv[3] : encodeFile.slice(0, encodeFile.length - 3) + "_ok.js";


//将源代码解析为AST
let sourceCode = files.readFileSync(encodeFile, { encoding: "utf-8" });
let ast = parser.parse(sourceCode);
console.time("处理完毕，耗时");


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

		console.log(path.toString(), "--->", value);

		path.replaceWith(types.valueToNode(value));
	},
}

traverse(ast, constantFold);


const AddParenthesesToLogicalAndExpression =
{
	LogicalExpression:
	{
		exit(path) {
			let { node, parentPath } = path;
			if (parentPath.isStatement()) {
				return;
			}
			if (node.operator == "&&" && !parentPath.isParenthesizedExpression()) {
				path.replaceWith(types.ParenthesizedExpression(node));
			}

		}
	},
};


traverse(ast, AddParenthesesToLogicalAndExpression);



let ifNODETEP1 = template(`if(A){} else {B;}`);

const SimplifyIfStatement =
{
	IfStatement(path) {
		let { test, consequent, alternate } = path.node;

		if (!types.isLogicalExpression(test)) {
			return;
		}
		let { left, operator, right } = test;

		if (operator == "&&") {

			if (types.isIdentifier(right, { "name": "undefined" }) ||
				types.isNumericLiteral(right, { "value": 0 }) || types.isNullLiteral(right)) {

				path.node.test = left;

				if (alternate != null) {

					path.insertAfter(alternate.body);

					path.node.alternate = null;
				}
				return;
			}

			path.node.test = left;
			path.node.consequent.body.unshift(right);
		}

		if (operator == "||" && alternate == null) {
			if (types.isNumericLiteral(right) && right.value) {
				path.node.test = left;
				path.insertAfter(consequent.body);
				path.node.consequent.body = [];
				return;
			}

			let newIfNode = ifNODETEP1({ "A": left, "B": right });

			path.replaceWith(newIfNode);
		}

	},


}

for (let i = 0; i < 30; i++) {
	traverse(ast, SimplifyIfStatement);
	ast = parser.parse(generator(ast).code);
	traverse(ast, AddParenthesesToLogicalAndExpression);
}


const dealWithSpIfStatement = 
{
	IfStatement(path)
	{
		let {test,consequent,alternate} = path.node;

		if (types.isAssignmentExpression(test))
		{
			path.insertBefore(types.ExpressionStatement(test));

			if (consequent.body.length ==0 && alternate == null)
			{
				path.remove();
			}

			else
			{
				path.node.test = test.left;
			}
		}
	}
}

traverse(ast, dealWithSpIfStatement);

console.timeEnd("处理完毕，耗时");
let { code } = generator(ast, opts = {
	"compact": false,  // 是否压缩代码
	"comments": false,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});

files.writeFile(decodeFile, code, (err) => { });