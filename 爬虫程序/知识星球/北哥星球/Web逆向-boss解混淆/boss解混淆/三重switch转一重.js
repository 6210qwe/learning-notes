/**
 * 通用switch扁平化脚本 - 动态变量检测版
 *
 * 此脚本使用Babel将JavaScript代码中的多层嵌套switch结构转换为单层扁平化的switch结构
 * 能够自动检测控制变量和位运算模式，适用于各种混淆代码
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

/**
 * 将源文件中的多层嵌套switch结构转换为单层扁平化的switch结构
 * @param {string} inputFilePath - 输入文件路径
 * @param {string} outputFilePath - 输出文件路径
 */
function flattenSwitchStructure(inputFilePath, outputFilePath) {
    try {
        // 读取源文件
        const sourceCode = fs.readFileSync(inputFilePath, 'utf-8');
        console.log(`成功读取源文件: ${inputFilePath}`);

        // 解析代码生成AST
        const ast = parser.parse(sourceCode);
        console.log('成功解析代码生成AST');

        // 检测控制流变量和位运算模式
        let controlVarInfo = detectControlFlowPattern(ast);
        if (!controlVarInfo) {
            console.error('未能检测到有效的控制流模式');
            return {
                success: false,
                error: '未能检测到有效的控制流模式'
            };
        }

        console.log(`检测到控制流变量: ${controlVarInfo.mainVar}`);
        console.log(`检测到位运算变量: ${controlVarInfo.bitVars.join(', ')}`);
        console.log(`检测到位运算模式: ${JSON.stringify(controlVarInfo.bitPatterns)}`);

        // 存储所有控制变量的赋值
        const controlValues = [];

        // 存储控制值到代码段的映射
        const valueToCodeMap = new Map();

        // 遍历AST查找所有控制变量的赋值
        traverse(ast, {
            // 处理变量声明，如 var U = 104;
            VariableDeclarator(path) {
                if (path.node.id.name === controlVarInfo.mainVar && t.isNumericLiteral(path.node.init)) {
                    controlValues.push(path.node.init.value);
                }
            },

            // 处理赋值表达式，如 U = 153;
            AssignmentExpression(path) {
                if (
                    path.node.operator === '=' &&
                    t.isIdentifier(path.node.left) &&
                    path.node.left.name === controlVarInfo.mainVar &&
                    t.isNumericLiteral(path.node.right)
                ) {
                    controlValues.push(path.node.right.value);
                }
            },

            // 处理条件表达式中的赋值，如 if(v) {U = 193;} else {U = 217;}
            IfStatement(path) {
                // 递归检查if语句体内的控制变量赋值
                const checkBlockForAssignments = (block) => {
                    if (!block) return;

                    if (t.isBlockStatement(block)) {
                        block.body.forEach(statement => {
                            if (
                                t.isExpressionStatement(statement) &&
                                t.isAssignmentExpression(statement.expression) &&
                                statement.expression.operator === '=' &&
                                t.isIdentifier(statement.expression.left) &&
                                statement.expression.left.name === controlVarInfo.mainVar &&
                                t.isNumericLiteral(statement.expression.right)
                            ) {
                                controlValues.push(statement.expression.right.value);
                            }
                        });
                    } else if (
                        t.isExpressionStatement(block) &&
                        t.isAssignmentExpression(block.expression) &&
                        block.expression.operator === '=' &&
                        t.isIdentifier(block.expression.left) &&
                        block.expression.left.name === controlVarInfo.mainVar &&
                        t.isNumericLiteral(block.expression.right)
                    ) {
                        controlValues.push(block.expression.right.value);
                    }
                };

                // 检查if和else分支
                checkBlockForAssignments(path.node.consequent);
                checkBlockForAssignments(path.node.alternate);
            },

            // 处理三元表达式中的赋值，如 U = v ? 193 : 217;
            ConditionalExpression(path) {
                if (
                    path.parent &&
                    path.parent.type === 'AssignmentExpression' &&
                    path.parent.operator === '=' &&
                    t.isIdentifier(path.parent.left) &&
                    path.parent.left.name === controlVarInfo.mainVar
                ) {
                    // 收集consequent（条件为真时的值）
                    if (t.isNumericLiteral(path.node.consequent)) {
                        controlValues.push(path.node.consequent.value);
                    }

                    // 收集alternate（条件为假时的值）
                    if (t.isNumericLiteral(path.node.alternate)) {
                        controlValues.push(path.node.alternate.value);
                    }
                }
            }
        });

        console.log(`收集到的${controlVarInfo.mainVar}值数量: ${controlValues.length}`);

        // 去重控制值
        const uniqueControlValues = [...new Set(controlValues)];
        console.log(`去重后的${controlVarInfo.mainVar}值数量: ${uniqueControlValues.length}`);

        // 为每个控制值查找对应的代码段
        function findCodeSegmentForValue(value) {
            // 根据位运算模式计算各层级的值
            const bitValues = {};
            controlVarInfo.bitVars.forEach((varName, index) => {
                const pattern = controlVarInfo.bitPatterns[index];
                const shift = pattern.shift || 0;
                const mask = pattern.mask || 3;
                bitValues[varName] = (value >> shift) & mask;
            });

            console.log(`处理${controlVarInfo.mainVar}=${value}: ${Object.entries(bitValues).map(([k, v]) => `${k}=${v}`).join(', ')}`);

            // 递归查找函数
            function findCodeByPath(node, path, index = 0) {
                // 如果已经处理完所有路径层级，返回null
                if (index >= path.length) return null;

                // 获取当前层级的信息
                const {discriminant, caseValue} = path[index];

                // 如果不是对象或为null，直接返回
                if (!node || typeof node !== 'object') return null;

                // 如果是数组，遍历每个元素
                if (Array.isArray(node)) {
                    for (const item of node) {
                        const result = findCodeByPath(item, path, index);
                        if (result) return result;
                    }
                    return null;
                }

                // 检查是否是switch语句且判别式匹配
                if (node.type === 'SwitchStatement' &&
                    node.discriminant &&
                    node.discriminant.name === discriminant) {

                    // 查找目标case
                    const targetCase = node.cases.find(c =>
                        c.test && c.test.type === 'NumericLiteral' && c.test.value === caseValue);

                    if (targetCase) {
                        // 如果是最后一层，返回代码段
                        if (index === path.length - 1) {
                            return targetCase.consequent;
                        }

                        // 否则继续向下查找下一层switch
                        // 遍历case内的所有语句
                        for (const consequent of targetCase.consequent) {
                            // 直接在当前节点查找
                            const directResult = findCodeByPath(consequent, path, index + 1);
                            if (directResult) return directResult;

                            // 如果是变量声明且初始化为函数表达式
                            if (consequent.type === 'VariableDeclaration' &&
                                consequent.declarations &&
                                consequent.declarations.length > 0 &&
                                consequent.declarations[0].init &&
                                consequent.declarations[0].init.type === 'FunctionExpression') {

                                // 查找函数体内的switch语句
                                const functionBody = consequent.declarations[0].init.body.body;
                                const functionResult = findCodeByPath(functionBody, path, index + 1);
                                if (functionResult) return functionResult;
                            }
                        }
                    }
                }

                // 递归检查所有属性
                for (const key in node) {
                    if (node.hasOwnProperty(key) && typeof node[key] === 'object' && node[key] !== null) {
                        const result = findCodeByPath(node[key], path, index);
                        if (result) return result;
                    }
                }

                return null;
            }

            // 定义完整路径
            const fullPath = controlVarInfo.bitVars.map(varName => ({
                discriminant: varName,
                caseValue: bitValues[varName]
            }));

            const result = findCodeByPath(ast.program.body, fullPath);

            if (result) {
                // 手动生成代码
                let codeLines = [];
                result.forEach(node => {
                    if (node.type) {
                        try {
                            // 跳过break语句，因为在新的switch结构中会自动添加
                            if (node.type !== 'BreakStatement') {
                                const code = generate(node).code;
                                codeLines.push(code);
                            }
                        } catch (e) {
                            console.error(`生成代码出错: ${e.message}`);
                        }
                    }
                });

                if (codeLines.length > 0) {
                    return codeLines.join('\n');
                }
            }

            return null;
        }

        // 为每个唯一的控制值查找代码段并存储
        uniqueControlValues.forEach(value => {
            const codeSegment = findCodeSegmentForValue(value);
            if (codeSegment) {
                valueToCodeMap.set(value, codeSegment);
            }
        });

        console.log(`成功映射的${controlVarInfo.mainVar}值数量: ${valueToCodeMap.size}`);

        // 使用字符串替换方法，保留原始文件的所有结构
        // 提取原始代码的IIFE结构和变量声明部分
        let originalIIFEStart = '';
        let originalIIFEEnd = '';
        let whileLoopStart = '';
        let whileLoopEnd = '';
        let foundWhileLoop = false;

        // 提取原始代码的开头部分（IIFE开始和变量声明）
        const originalLines = sourceCode.split('\n');

        // 查找while循环的开始和结束
        let braceCount = 0;
        let whileStartLine = -1;
        let whileEndLine = -1;

        for (let i = 0; i < originalLines.length; i++) {
            const line = originalLines[i];

            // 检测while循环开始
            if (line.includes(`while (${controlVarInfo.mainVar} !== undefined)`) ||
                line.includes(`while(${controlVarInfo.mainVar} !== undefined)`)) {
                whileStartLine = i;
                foundWhileLoop = true;
                braceCount = 0;
            }

            // 如果已找到while循环开始，计算花括号以找到结束
            if (foundWhileLoop && whileEndLine === -1) {
                for (let j = 0; j < line.length; j++) {
                    if (line[j] === '{') braceCount++;
                    if (line[j] === '}') {
                        braceCount--;
                        if (braceCount === 0) {
                            whileEndLine = i;
                            break;
                        }
                    }
                }
            }

            if (whileEndLine !== -1) break;
        }

        if (!foundWhileLoop) {
            console.error('未找到目标while循环，无法替换switch语句');
            return {
                success: false,
                error: '未找到目标while循环'
            };
        }

        // 提取while循环前的代码
        for (let i = 0; i < whileStartLine; i++) {
            originalIIFEStart += originalLines[i] + '\n';
        }

        // 提取while循环的开始部分
        whileLoopStart = originalLines[whileStartLine] + '\n';

        // 提取while循环后的代码
        originalIIFEEnd = '';
        for (let i = whileEndLine; i < originalLines.length; i++) {
            originalIIFEEnd += originalLines[i] + '\n';
        }

        // 生成单层switch结构
        let switchCases = [];

        // 为每个控制值创建一个case
        for (const [value, codeSegment] of valueToCodeMap.entries()) {
            switchCases.push(`        case ${value}:\n            ${codeSegment.replace(/\n/g, '\n            ')}\n            break;`);
        }

        // 组装完整的代码，保持原始IIFE结构和所有函数
        const flatSwitchCode = `${originalIIFEStart}${whileLoopStart}      switch (${controlVarInfo.mainVar}) {
${switchCases.join('\n')}
        default:
          ${controlVarInfo.mainVar} = undefined;
          break;
      }
${originalIIFEEnd}`;

        // 写入输出文件
        fs.writeFileSync(outputFilePath, flatSwitchCode, 'utf-8');
        console.log(`成功将转换后的代码写入: ${outputFilePath}`);

        return {
            success: true,
            outputFilePath
        };
    } catch (error) {
        console.error('转换过程中发生错误:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * 检测代码中的控制流变量和位运算模式
 * @param {Object} ast - 代码的AST
 * @returns {Object|null} - 控制流信息或null
 */
function detectControlFlowPattern(ast) {
    let mainControlVar = null;
    let bitVars = [];
    let bitPatterns = [];
    let whileLoopFound = false;

    // 遍历AST查找控制流模式
    traverse(ast, {
        // 查找while循环和主控制变量
        WhileStatement(path) {
            // 检查while条件是否为 X !== undefined
            if (
                t.isBinaryExpression(path.node.test) &&
                path.node.test.operator === '!==' &&
                t.isIdentifier(path.node.test.left) &&
                t.isIdentifier(path.node.test.right) &&
                path.node.test.right.name === 'undefined'
            ) {
                mainControlVar = path.node.test.left.name;
                whileLoopFound = true;
                path.stop(); // 找到后停止遍历
            }
        }
    });

    if (!whileLoopFound || !mainControlVar) {
        return null;
    }

    // 查找位运算变量和模式
    let bitVarDeclarations = [];

    traverse(ast, {
        // 查找位运算变量声明
        VariableDeclaration(path) {
            // 检查是否在while循环内
            let isInWhileLoop = false;
            let parent = path.parentPath;
            while (parent) {
                if (parent.isWhileStatement() &&
                    t.isBinaryExpression(parent.node.test) &&
                    parent.node.test.operator === '!==' &&
                    t.isIdentifier(parent.node.test.left) &&
                    parent.node.test.left.name === mainControlVar) {
                    isInWhileLoop = true;
                    break;
                }
                parent = parent.parentPath;
            }

            if (!isInWhileLoop) return;

            // 检查变量声明是否包含位运算
            path.node.declarations.forEach(declaration => {
                if (
                    t.isIdentifier(declaration.id) &&
                    declaration.init &&
                    (
                        // 检查 var X = Y & Z 模式
                        (t.isBinaryExpression(declaration.init) && declaration.init.operator === '&') ||
                        // 检查 var X = (Y >> Z) & W 模式
                        (t.isBinaryExpression(declaration.init) && declaration.init.operator === '&' &&
                         t.isBinaryExpression(declaration.init.left) && declaration.init.left.operator === '>>')
                    )
                ) {
                    bitVarDeclarations.push(declaration);
                }
            });
        }
    });

    // 分析位运算模式
    bitVarDeclarations.forEach(declaration => {
        const varName = declaration.id.name;
        let pattern = {};

        if (t.isBinaryExpression(declaration.init) && declaration.init.operator === '&') {
            // 简单模式: var X = Y & Z
            if (t.isIdentifier(declaration.init.left) && declaration.init.left.name === mainControlVar) {
                pattern.shift = 0;
                if (t.isNumericLiteral(declaration.init.right)) {
                    pattern.mask = declaration.init.right.value;
                }
            }
            // 复杂模式: var X = (Y >> Z) & W
            else if (
                t.isBinaryExpression(declaration.init.left) &&
                declaration.init.left.operator === '>>' &&
                t.isIdentifier(declaration.init.left.left) &&
                declaration.init.left.left.name === mainControlVar
            ) {
                if (t.isNumericLiteral(declaration.init.left.right)) {
                    pattern.shift = declaration.init.left.right.value;
                }
                if (t.isNumericLiteral(declaration.init.right)) {
                    pattern.mask = declaration.init.right.value;
                }
            }
        }

        if (Object.keys(pattern).length > 0) {
            bitVars.push(varName);
            bitPatterns.push(pattern);
        }
    });

    // 按照声明顺序排序位变量
    if (bitVars.length > 0) {
        return {
            mainVar: mainControlVar,
            bitVars,
            bitPatterns
        };
    }

    return null;
}

function main() {
    // 处理的是输入文件中的多层嵌套控制流
    const inputFilePath = './transformed.js';
    const outputFilePath = './transformed.js';

    console.log(`输入文件: ${inputFilePath}`);
    console.log(`输出文件: ${outputFilePath}`);

    const result = flattenSwitchStructure(inputFilePath, outputFilePath);

    if (result.success) {
        console.log('转换成功完成!');
    } else {
        console.error('转换失败:', result.error);
    }
}

// 如果直接运行脚本，则执行main函数
if (require.main === module) {
    main();
} else {
    // 作为模块导出转换函数
    module.exports = {
        flattenSwitchStructure
    };
}
