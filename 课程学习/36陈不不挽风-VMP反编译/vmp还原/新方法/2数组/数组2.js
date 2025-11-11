const babelTypes = require('@babel/types');
const generator = require('@babel/generator').default;

// 原始三个AST节点
const valueNode = { type: 'NumericLiteral', value: 123 }; // 要设置的值
const keyNode = { type: 'NumericLiteral', value: 0 };      // 索引0
const objNode = { type: 'ArrayExpression', elements: [] };  // 空数组

// 步骤1：在空数组的索引0处设置值123（模拟数组赋值过程）
const newElements = [...objNode.elements];
newElements[keyNode.value] = valueNode; // 在索引0处设置123
const arrayWithValue = babelTypes.arrayExpression(newElements);

// 步骤2：从数组中提取索引0处的值（即123）
const extractedValue = arrayWithValue.elements[keyNode.value];

// 步骤3：将提取的AST节点转换为代码
const code = generator(extractedValue).code;

console.log('提取的值:', code); // 输出: 123
console.log('提取的AST结构:', JSON.stringify(extractedValue, null, 2));
