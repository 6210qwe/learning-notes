const files     = require('fs');  //导入文件库，防止与fs变量名冲突
const types     = require("@babel/types");
const parser    = require("@babel/parser");
const template  = require("@babel/template").default;
const traverse  = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const NodePath  = require("@babel/traverse").NodePath; //智能提示所需

//js混淆代码读取
const encodeFile = process.argv.length > 2 ? process.argv[2] : "./encode.js";  //默认的js文件
const decodeFile = process.argv.length > 3 ? process.argv[3] : encodeFile.slice(0, encodeFile.length - 3) + "_ok.js";


//将源代码解析为AST
let sourceCode = files.readFileSync(encodeFile, { encoding: "utf-8" });
let ast = parser.parse(sourceCode);
console.time("处理完毕，耗时");


function getNextSiblingType(nextSibling, constantViolations, referencePaths) {
	
	let nextSiblingType = 0;

	for (let constVioPath of constantViolations) {
		if (nextSibling.isAncestor(constVioPath)) {
			nextSiblingType |= 1;
			break;
		}
	}
	for (let referPath of referencePaths) {
		if (nextSibling.isAncestor(referPath) || nextSibling == referPath) {
			nextSiblingType |= 2;
			break;
		}
	}

	return nextSiblingType;

}


const combinDeclareAndDefine = 
{
	VariableDeclarator(path)
	{
		let {scope,node,parentPath} = path;

		let {id,init} = node;

		if (init != null)
		{
			return;
		}

		let name = id.name;
		let kind = parentPath.node.kind;

		let binding = scope.getBinding(name);

		if (!binding) return;

		let { constant, referencePaths, constantViolations } = binding;  

		let allNextSiblings = parentPath.getAllNextSiblings();

		if (allNextSiblings.length == 0)
		{
			return;
		}

		for (let nextSibling of allNextSiblings)
		{

			let nextSiblingType = getNextSiblingType(nextSibling, constantViolations, referencePaths);

			if (nextSiblingType == 0)
			{
				continue;
			}
			
			if (nextSiblingType == 1)
			{
				if (nextSibling.isExpressionStatement() && nextSibling.get('expression').isAssignmentExpression())
				{
					let {left,operator,right} = nextSibling.get('expression').node;
					if (types.isIdentifier(left,{"name":name}) && operator == "=")
					{

						let newDeclartionNode = types.VariableDeclaration(kind,[types.VariableDeclarator(left,right)]);
						nextSibling.replaceWith(newDeclartionNode);
						path.remove();
					}
				}

				break;
			}

			if (nextSiblingType == 2 || nextSiblingType == 3)
			{
				break;
			}

			
		}
		
	},
}


traverse(ast,combinDeclareAndDefine);

console.timeEnd("处理完毕，耗时");
let { code } = generator(ast, opts = {
	"compact": false,  // 是否压缩代码
	"comments": false,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});

files.writeFile(decodeFile, code, (err) => { });