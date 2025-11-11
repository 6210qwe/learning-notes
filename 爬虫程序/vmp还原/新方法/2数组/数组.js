const babelTypes = require('@babel/types');
const generator = require('@babel/generator').default;

// 1. 创建两个数值字面量节点
const num1 = babelTypes.numericLiteral(123); // 123对应的AST节点
const num2 = babelTypes.numericLiteral(456); // 456对应的AST节点

// 2. 创建数组表达式节点，包含上述两个数值节点
const arrayNode = babelTypes.arrayExpression([num1, num2]);

// 3. 将AST节点转换为代码
const code = generator(arrayNode).code;

console.log('生成的代码:', code); // 输出: [123, 456]
console.log('AST结构:', JSON.stringify(arrayNode, null, 2));