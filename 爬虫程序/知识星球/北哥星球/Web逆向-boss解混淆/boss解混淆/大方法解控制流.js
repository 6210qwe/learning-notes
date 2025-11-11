/**
 * 通用控制流解析脚本 - 自动适配不同方法名和参数名
 *
 * 此脚本能够自动检测并适配不同的方法名(如J、D等)和参数名(如we、Y_等)，
 * 并自动推断映射公式，实现完全自动化的控制流解析
 */

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

/**
 * 自动检测源文件中的控制流方法名和参数名
 * @param {string} inputFilePath - 输入文件路径
 * @returns {Object} 包含方法名和参数名的对象
 */
function detectMethodAndParamNames(inputFilePath) {
  try {
    // 读取源文件
    const sourceCode = fs.readFileSync(inputFilePath, 'utf-8');
    console.log(`成功读取源文件: ${inputFilePath}`);

    // 解析代码生成AST
    const ast = parser.parse(sourceCode);
    console.log('成功解析代码生成AST');

    let methodName = null;
    let paramName = null;
    let mappingVars = [];

    // 查找函数定义
    traverse(ast, {
      FunctionDeclaration(path) {
        // 检查是否是主控制流函数(通常是单字母函数名，如J或D)
        if (path.node.id && path.node.id.name && path.node.id.name.length === 1) {
          const potentialMethodName = path.node.id.name;

          // 进一步验证这是否是控制流函数
          let hasArgumentsParam = false;
          let hasWhileLoop = false;
          let hasSwitchStmt = false;

          // 检查函数体
          path.traverse({
            VariableDeclarator(varPath) {
              // 检查参数名(通常是arguments[0]的赋值目标)
              if (varPath.node.init &&
                  t.isMemberExpression(varPath.node.init) &&
                  t.isIdentifier(varPath.node.init.object) &&
                  varPath.node.init.object.name === 'arguments' &&
                  t.isNumericLiteral(varPath.node.init.property) &&
                  varPath.node.init.property.value === 0) {
                paramName = varPath.node.id.name;
                hasArgumentsParam = true;
              }

              // 检查映射变量(通常是参数名的位运算结果)
              if (varPath.node.init &&
                  t.isBinaryExpression(varPath.node.init) &&
                  varPath.node.init.operator === '&') {
                const left = varPath.node.init.left;
                // 检查是否是 paramName & 31 形式
                if ((t.isIdentifier(left) && left.name === paramName) ||
                    (t.isBinaryExpression(left) && left.operator === '>>' &&
                     t.isIdentifier(left.left) && left.left.name === paramName)) {
                  mappingVars.push(varPath.node.id.name);
                }
              }
            },
            WhileStatement(whilePath) {
              hasWhileLoop = true;
            },
            SwitchStatement(switchPath) {
              hasSwitchStmt = true;
            }
          });

          // 如果满足控制流函数的特征，则确认方法名
          if (hasArgumentsParam && hasWhileLoop && hasSwitchStmt) {
            methodName = potentialMethodName;
          }
        }
      },

      // 检查函数表达式中的return语句，查找方法调用模式
      ReturnStatement(path) {
        const argument = path.node.argument;

        // 检查是否是方法.apply调用
        if (t.isCallExpression(argument) &&
            t.isMemberExpression(argument.callee) &&
            t.isIdentifier(argument.callee.property) &&
            argument.callee.property.name === 'apply') {
          methodName = argument.callee.object.name;
        }
      },

      // 检查变量声明中的方法调用
      VariableDeclarator(path) {
        if (path.node.init &&
            t.isFunctionExpression(path.node.init) &&
            path.node.init.body &&
            path.node.init.body.body) {

          // 遍历函数体查找return语句
          path.traverse({
            ReturnStatement(returnPath) {
              const argument = returnPath.node.argument;

              // 检查是否是方法.apply调用
              if (t.isCallExpression(argument) &&
                  t.isMemberExpression(argument.callee) &&
                  t.isIdentifier(argument.callee.property) &&
                  argument.callee.property.name === 'apply') {
                methodName = argument.callee.object.name;
              }
            }
          });
        }
      }
    });

    // 如果AST分析未找到，尝试使用正则表达式
    if (!methodName || !paramName) {
      // 查找函数定义模式
      const funcDefRegex = /function\s+([A-Z])\s*\(\)\s*\{/g;
      let match = funcDefRegex.exec(sourceCode);
      if (match) {
        methodName = match[1];
      }

      // 查找参数赋值模式
      const paramRegex = /var\s+([a-zA-Z_]+)\s*=\s*arguments\[0\]/g;
      match = paramRegex.exec(sourceCode);
      if (match) {
        paramName = match[1];
      }
    }

    // 如果仍未找到映射变量，尝试使用正则表达式
    if (mappingVars.length === 0 && paramName) {
      const mappingRegex = new RegExp(`var\\s+([a-zA-Z_]+)\\s*=\\s*${paramName}\\s*&\\s*31`, 'g');
      let match;
      while ((match = mappingRegex.exec(sourceCode)) !== null) {
        mappingVars.push(match[1]);
      }

      // 查找右移映射
      const shiftMappingRegex = new RegExp(`var\\s+([a-zA-Z_]+)\\s*=\\s*${paramName}\\s*>>\\s*\\d+\\s*&\\s*31`, 'g');
      while ((match = shiftMappingRegex.exec(sourceCode)) !== null) {
        mappingVars.push(match[1]);
      }
    }

    console.log(`检测到的方法名: ${methodName || '未检测到'}`);
    console.log(`检测到的参数名: ${paramName || '未检测到'}`);
    console.log(`检测到的映射变量: ${mappingVars.join(', ') || '未检测到'}`);

    return {
      methodName: methodName || 'D', // 默认使用D
      paramName: paramName || 'Y_',  // 默认使用Y_
      mappingVars: mappingVars.length > 0 ? mappingVars : ['H_', 'K_', 'Q_'] // 默认使用H_, K_, Q_
    };
  } catch (error) {
    console.error('检测方法名和参数名时发生错误:', error);
    return {
      methodName: 'D', // 默认使用D
      paramName: 'Y_', // 默认使用Y_
      mappingVars: ['H_', 'K_', 'Q_'] // 默认使用H_, K_, Q_
    };
  }
}

/**
 * 从源文件中提取所有参数值，包括方法.apply调用中的数值
 * 使用增强的AST分析自动收集所有参数值，无需手动补充
 * @param {string} inputFilePath - 输入文件路径
 * @param {string} methodName - 方法名(如J或D)
 * @param {string} paramName - 参数名(如we或Y_)
 * @returns {Array} 参数值数组
 */
function extractAllParamValues(inputFilePath, methodName, paramName) {
  try {
    // 读取源文件
    const sourceCode = fs.readFileSync(inputFilePath, 'utf-8');
    console.log(`成功读取源文件: ${inputFilePath}`);

    // 解析代码生成AST
    const ast = parser.parse(sourceCode);
    console.log('成功解析代码生成AST');

    // 存储所有参数的赋值
    const paramValues = new Set();

    // 递归提取数组表达式中的数值
    function extractNumericValuesFromArray(arrayExpr) {
      if (!arrayExpr || !arrayExpr.elements) return [];

      const values = [];
      for (const element of arrayExpr.elements) {
        if (t.isNumericLiteral(element)) {
          values.push(element.value);
        }
      }
      return values;
    }

    // 递归提取CallExpression中的数值
    function extractNumericValuesFromCallExpr(callExpr) {
      if (!callExpr) return [];

      // 如果是数组的concat方法调用
      if (
        t.isMemberExpression(callExpr.callee) &&
        t.isArrayExpression(callExpr.callee.object) &&
        t.isIdentifier(callExpr.callee.property) &&
        callExpr.callee.property.name === 'concat'
      ) {
        // 提取数组中的数值
        return extractNumericValuesFromArray(callExpr.callee.object);
      }

      return [];
    }

    // 递归检查所有可能包含参数值的表达式
    function extractParamValuesFromExpression(expr) {
      if (!expr) return;

      // 检查数值字面量
      if (t.isNumericLiteral(expr)) {
        // 这里不直接添加，因为不是所有数值都是参数值
        return;
      }

      // 检查对象属性
      if (t.isObjectProperty(expr)) {
        extractParamValuesFromExpression(expr.value);
        return;
      }

      // 检查数组表达式
      if (t.isArrayExpression(expr)) {
        expr.elements.forEach(element => {
          extractParamValuesFromExpression(element);
        });
        return;
      }

      // 检查函数调用
      if (t.isCallExpression(expr)) {
        // 检查方法.apply调用
        if (
          t.isMemberExpression(expr.callee) &&
          t.isIdentifier(expr.callee.object) &&
          expr.callee.object.name === methodName &&
          t.isIdentifier(expr.callee.property) &&
          expr.callee.property.name === 'apply'
        ) {
          const args = expr.arguments;

          // 情况1: 方法.apply(null, [数值, ...])
          if (args.length >= 2 && t.isArrayExpression(args[1])) {
            const values = extractNumericValuesFromArray(args[1]);
            values.forEach(value => paramValues.add(value));
          }
          // 情况2: 方法.apply(null, [数值].concat(...))
          else if (args.length >= 2 && t.isCallExpression(args[1])) {
            const values = extractNumericValuesFromCallExpr(args[1]);
            values.forEach(value => paramValues.add(value));
          }
        }

        // 递归检查所有参数
        expr.arguments.forEach(arg => {
          extractParamValuesFromExpression(arg);
        });
        return;
      }

      // 检查成员表达式
      if (t.isMemberExpression(expr)) {
        extractParamValuesFromExpression(expr.object);
        extractParamValuesFromExpression(expr.property);
        return;
      }

      // 检查二元表达式
      if (t.isBinaryExpression(expr)) {
        extractParamValuesFromExpression(expr.left);
        extractParamValuesFromExpression(expr.right);
        return;
      }

      // 检查条件表达式
      if (t.isConditionalExpression(expr)) {
        extractParamValuesFromExpression(expr.test);
        extractParamValuesFromExpression(expr.consequent);
        extractParamValuesFromExpression(expr.alternate);
        return;
      }

      // 检查逻辑表达式
      if (t.isLogicalExpression(expr)) {
        extractParamValuesFromExpression(expr.left);
        extractParamValuesFromExpression(expr.right);
        return;
      }

      // 检查一元表达式
      if (t.isUnaryExpression(expr)) {
        extractParamValuesFromExpression(expr.argument);
        return;
      }
    }

    // 遍历AST查找所有参数的赋值和方法.apply调用
    traverse(ast, {
      // 处理变量声明，如 var paramName = 224;
      VariableDeclarator(path) {
        if (path.node.id.name === paramName && t.isNumericLiteral(path.node.init)) {
          paramValues.add(path.node.init.value);
        }

        // 递归检查初始化表达式
        if (path.node.init) {
          extractParamValuesFromExpression(path.node.init);
        }
      },

      // 处理赋值表达式，如 paramName = 153;
      AssignmentExpression(path) {
        if (
          path.node.operator === '=' &&
          t.isIdentifier(path.node.left) &&
          path.node.left.name === paramName &&
          t.isNumericLiteral(path.node.right)
        ) {
          paramValues.add(path.node.right.value);
        }

        // 递归检查右侧表达式
        extractParamValuesFromExpression(path.node.right);
      },

      // 处理条件表达式中的赋值，如 if(v) {paramName = 193;} else {paramName = 217;}
      IfStatement(path) {
        // 递归检查if语句体内的参数赋值
        const checkBlockForParamAssignments = (block) => {
          if (!block) return;

          if (t.isBlockStatement(block)) {
            block.body.forEach(statement => {
              if (
                t.isExpressionStatement(statement) &&
                t.isAssignmentExpression(statement.expression) &&
                statement.expression.operator === '=' &&
                t.isIdentifier(statement.expression.left) &&
                statement.expression.left.name === paramName &&
                t.isNumericLiteral(statement.expression.right)
              ) {
                paramValues.add(statement.expression.right.value);
              }

              // 递归检查语句
              traverse.node(statement, {
                AssignmentExpression(path) {
                  if (
                    path.node.operator === '=' &&
                    t.isIdentifier(path.node.left) &&
                    path.node.left.name === paramName &&
                    t.isNumericLiteral(path.node.right)
                  ) {
                    paramValues.add(path.node.right.value);
                  }
                },
                CallExpression(path) {
                  extractParamValuesFromExpression(path.node);
                }
              }, path.scope);
            });
          } else if (
            t.isExpressionStatement(block) &&
            t.isAssignmentExpression(block.expression) &&
            block.expression.operator === '=' &&
            t.isIdentifier(block.expression.left) &&
            block.expression.left.name === paramName &&
            t.isNumericLiteral(block.expression.right)
          ) {
            paramValues.add(block.expression.right.value);
          }
        };

        // 检查if和else分支
        checkBlockForParamAssignments(path.node.consequent);
        checkBlockForParamAssignments(path.node.alternate);

        // 递归检查条件表达式
        extractParamValuesFromExpression(path.node.test);
      },

      // 处理三元表达式中的赋值，如 paramName = v ? 193 : 217;
      ConditionalExpression(path) {
        if (
          path.parent &&
          path.parent.type === 'AssignmentExpression' &&
          path.parent.operator === '=' &&
          t.isIdentifier(path.parent.left) &&
          path.parent.left.name === paramName
        ) {
          // 收集consequent（条件为真时的值）
          if (t.isNumericLiteral(path.node.consequent)) {
            paramValues.add(path.node.consequent.value);
          }

          // 收集alternate（条件为假时的值）
          if (t.isNumericLiteral(path.node.alternate)) {
            paramValues.add(path.node.alternate.value);
          }
        }

        // 递归检查条件、结果和替代表达式
        extractParamValuesFromExpression(path.node.test);
        extractParamValuesFromExpression(path.node.consequent);
        extractParamValuesFromExpression(path.node.alternate);
      },

      // 处理方法.apply调用，如 方法.apply(null, [19944].concat(Array.prototype.slice.call(arguments)))
      CallExpression(path) {
        extractParamValuesFromExpression(path.node);
      },

      // 处理函数表达式中的return语句，如 .apply(null, [19944].concat(Array.prototype.slice.call(arguments)))
      ReturnStatement(path) {
        const argument = path.node.argument;

        // 检查是否是方法.apply调用
        if (
          t.isCallExpression(argument) &&
          t.isMemberExpression(argument.callee) &&
          t.isIdentifier(argument.callee.object) &&
          argument.callee.object.name === methodName &&
          t.isIdentifier(argument.callee.property) &&
          argument.callee.property.name === 'apply'
        ) {
          const args = argument.arguments;

          // 情况1: return 方法.apply(null, [数值, ...])
          if (args.length >= 2 && t.isArrayExpression(args[1])) {
            const values = extractNumericValuesFromArray(args[1]);
            values.forEach(value => paramValues.add(value));
          }
          // 情况2: return 方法.apply(null, [数值].concat(...))
          else if (args.length >= 2 && t.isCallExpression(args[1])) {
            const values = extractNumericValuesFromCallExpr(args[1]);
            values.forEach(value => paramValues.add(value));
          }
        }

        // 递归检查返回值表达式
        extractParamValuesFromExpression(path.node.argument);
      },

      // 处理函数表达式，如 m = function() { return 方法.apply(null, [16420].concat(...)); }
      FunctionExpression(path) {
        // 检查函数体内的return语句
        path.traverse({
          ReturnStatement(returnPath) {
            const argument = returnPath.node.argument;

            // 检查是否是方法.apply调用
            if (
              t.isCallExpression(argument) &&
              t.isMemberExpression(argument.callee) &&
              t.isIdentifier(argument.callee.object) &&
              argument.callee.object.name === methodName &&
              t.isIdentifier(argument.callee.property) &&
              argument.callee.property.name === 'apply'
            ) {
              const args = argument.arguments;

              // 情况1: return 方法.apply(null, [数值, ...])
              if (args.length >= 2 && t.isArrayExpression(args[1])) {
                const values = extractNumericValuesFromArray(args[1]);
                values.forEach(value => paramValues.add(value));
              }
              // 情况2: return 方法.apply(null, [数值].concat(...))
              else if (args.length >= 2 && t.isCallExpression(args[1])) {
                const values = extractNumericValuesFromCallExpr(args[1]);
                values.forEach(value => paramValues.add(value));
              }
            }

            // 递归检查返回值表达式
            extractParamValuesFromExpression(argument);
          },

          // 检查函数体内的所有表达式
          ExpressionStatement(exprPath) {
            extractParamValuesFromExpression(exprPath.node.expression);
          },

          // 检查函数体内的变量声明
          VariableDeclaration(varPath) {
            varPath.node.declarations.forEach(decl => {
              if (decl.init) {
                extractParamValuesFromExpression(decl.init);
              }
            });
          }
        });
      },

      // 处理switch语句中的case
      SwitchCase(path) {
        // 检查case条件
        if (path.node.test) {
          extractParamValuesFromExpression(path.node.test);
        }

        // 检查case内的语句
        path.node.consequent.forEach(statement => {
          if (t.isExpressionStatement(statement)) {
            extractParamValuesFromExpression(statement.expression);
          }
        });
      },

      // 处理对象属性
      ObjectProperty(path) {
        extractParamValuesFromExpression(path.node.value);
      },

      // 处理数组表达式
      ArrayExpression(path) {
        path.node.elements.forEach(element => {
          extractParamValuesFromExpression(element);
        });
      }
    });

    // 使用正则表达式查找可能遗漏的方法.apply调用
    const methodApplyRegex = new RegExp(`${methodName}\\.apply\\s*\\(\\s*null\\s*,\\s*\\[\\s*(\\d+)\\s*\\]`, 'g');
    let match;
    while ((match = methodApplyRegex.exec(sourceCode)) !== null) {
      const value = parseInt(match[1], 10);
      if (!isNaN(value)) {
        paramValues.add(value);
      }
    }

    // 使用正则表达式查找可能遗漏的参数赋值
    const paramAssignRegex = new RegExp(`${paramName}\\s*=\\s*(\\d+)\\s*;`, 'g');
    while ((match = paramAssignRegex.exec(sourceCode)) !== null) {
      const value = parseInt(match[1], 10);
      if (!isNaN(value)) {
        paramValues.add(value);
      }
    }

    // 转换Set为数组
    const uniqueValues = Array.from(paramValues);
    console.log(`通过AST分析自动收集的${paramName}值总数: ${uniqueValues.length}`);

    // 将结果写入JSON文件
    const result = {
      param_array: uniqueValues
    };

    fs.writeFileSync('./param_values.json', JSON.stringify(result, null, 2), 'utf-8');
    console.log(`成功将${paramName}值写入param_values.json`);

    return uniqueValues;
  } catch (error) {
    console.error('提取过程中发生错误:', error);
    return [];
  }
}

/**
 * 自动检测映射公式并生成映射代码
 * @param {string} inputFilePath - 输入文件路径
 * @param {string} paramName - 参数名(如we或Y_)
 * @returns {Object} 包含映射变量和映射代码的对象
 */
function detectMappingFormula(inputFilePath, paramName) {
  try {
    // 读取源文件
    const sourceCode = fs.readFileSync(inputFilePath, 'utf-8');

    // 解析代码生成AST
    const ast = parser.parse(sourceCode);

    // 存储映射变量和公式
    const mappings = [];

    // 遍历AST查找映射公式
    traverse(ast, {
      VariableDeclarator(path) {
        const init = path.node.init;

        // 检查是否是位运算表达式
        if (init && t.isBinaryExpression(init)) {
          // 检查 paramName & 31 形式
          if (init.operator === '&' &&
              t.isIdentifier(init.left) &&
              init.left.name === paramName &&
              t.isNumericLiteral(init.right)) {
            mappings.push({
              varName: path.node.id.name,
              formula: `${paramName} & ${init.right.value}`,
              code: `var ${path.node.id.name} = ${paramName} & ${init.right.value};`
            });
          }
          // 检查 paramName >> N & 31 形式
          else if (init.operator === '&' &&
                   t.isBinaryExpression(init.left) &&
                   init.left.operator === '>>' &&
                   t.isIdentifier(init.left.left) &&
                   init.left.left.name === paramName) {
            mappings.push({
              varName: path.node.id.name,
              formula: `${paramName} >> ${init.left.right.value} & ${init.right.value}`,
              code: `var ${path.node.id.name} = ${paramName} >> ${init.left.right.value} & ${init.right.value};`
            });
          }
        }
      }
    });

    // 如果AST分析未找到，尝试使用正则表达式
    if (mappings.length === 0) {
      // 查找 paramName & 31 形式
      const basicMappingRegex = new RegExp(`var\\s+([a-zA-Z_]+)\\s*=\\s*${paramName}\\s*&\\s*(\\d+)`, 'g');
      let match;
      while ((match = basicMappingRegex.exec(sourceCode)) !== null) {
        mappings.push({
          varName: match[1],
          formula: `${paramName} & ${match[2]}`,
          code: `var ${match[1]} = ${paramName} & ${match[2]};`
        });
      }

      // 查找 paramName >> N & 31 形式
      const shiftMappingRegex = new RegExp(`var\\s+([a-zA-Z_]+)\\s*=\\s*${paramName}\\s*>>\\s*(\\d+)\\s*&\\s*(\\d+)`, 'g');
      while ((match = shiftMappingRegex.exec(sourceCode)) !== null) {
        mappings.push({
          varName: match[1],
          formula: `${paramName} >> ${match[2]} & ${match[3]}`,
          code: `var ${match[1]} = ${paramName} >> ${match[2]} & ${match[3]};`
        });
      }
    }

    // 如果仍未找到映射，使用默认映射
    if (mappings.length === 0) {
      mappings.push({
        varName: 'H_',
        formula: `${paramName} & 31`,
        code: `var H_ = ${paramName} & 31;`
      });
      mappings.push({
        varName: 'K_',
        formula: `${paramName} >> 5 & 31`,
        code: `var K_ = ${paramName} >> 5 & 31;`
      });
      mappings.push({
        varName: 'Q_',
        formula: `${paramName} >> 10 & 31`,
        code: `var Q_ = ${paramName} >> 10 & 31;`
      });
    }

    console.log('检测到的映射公式:');
    mappings.forEach(mapping => {
      console.log(`${mapping.varName}: ${mapping.formula}`);
    });

    return {
      mappingVars: mappings.map(m => m.varName),
      mappingCode: mappings.map(m => m.code).join('\n')
    };
  } catch (error) {
    console.error('检测映射公式时发生错误:', error);
    // 返回默认映射
    return {
      mappingVars: ['H_', 'K_', 'Q_'],
      mappingCode: `var H_ = ${paramName} & 31;\nvar K_ = ${paramName} >> 5 & 31;\nvar Q_ = ${paramName} >> 10 & 31;`
    };
  }
}

/**
 * 智能提取文件结构，避免重复生成函数定义
 * @param {string} sourceCode - 源代码
 * @param {string} methodName - 方法名
 * @param {string} paramName - 参数名
 * @returns {Object} 包含文件结构的对象
 */
function extractFileStructure(sourceCode, methodName, paramName) {
  try {
    // 解析代码生成AST
    const ast = parser.parse(sourceCode);

    // 存储文件结构信息
    const structure = {
      hasMainFunction: false,
      mainFunctionStart: null,
      mainFunctionEnd: null,
      whileLoopStart: null,
      iifeStart: null,
      iifeEnd: null
    };

    // 查找主控制流函数定义
    traverse(ast, {
      FunctionDeclaration(path) {
        if (path.node.id && path.node.id.name === methodName) {
          structure.hasMainFunction = true;
          structure.mainFunctionStart = path.node.start;
          structure.mainFunctionEnd = path.node.end;

          // 查找while循环
          path.traverse({
            WhileStatement(whilePath) {
              if (whilePath.node.test &&
                  t.isBinaryExpression(whilePath.node.test) &&
                  t.isIdentifier(whilePath.node.test.left) &&
                  whilePath.node.test.left.name === paramName) {
                structure.whileLoopStart = whilePath.node.start;
              }
            }
          });
        }
      },

      // 查找IIFE结构
      CallExpression(path) {
        if (t.isFunctionExpression(path.node.callee) && path.node.arguments.length === 0) {
          structure.iifeStart = path.node.start;
          structure.iifeEnd = path.node.end;
        }
      }
    });

    // 如果AST分析未找到，尝试使用正则表达式
    if (!structure.hasMainFunction) {
      // 查找主函数定义
      const funcDefRegex = new RegExp(`function\\s+${methodName}\\s*\\(\\)\\s*\\{`, 'g');
      const funcMatch = funcDefRegex.exec(sourceCode);
      if (funcMatch) {
        structure.hasMainFunction = true;
        structure.mainFunctionStart = funcMatch.index;
      }
    }

    if (!structure.whileLoopStart) {
      // 查找while循环
      const whileRegex = new RegExp(`while\\s*\\(\\s*${paramName}\\s*!==\\s*undefined\\s*\\)\\s*\\{`, 'g');
      const whileMatch = whileRegex.exec(sourceCode);
      if (whileMatch) {
        structure.whileLoopStart = whileMatch.index;
      }
    }

    if (!structure.iifeEnd) {
      // 查找IIFE结束部分
      const iifeEndRegex = /\}\s*\}\s*catch\s*\([^)]*\)\s*\{\s*\}\s*\}\s*\}\s*\)\s*\(\s*\)\s*;/g;
      const iifeMatch = iifeEndRegex.exec(sourceCode);
      if (iifeMatch) {
        structure.iifeEnd = iifeMatch.index + iifeMatch[0].length;
      }
    }

    return structure;
  } catch (error) {
    console.error('提取文件结构时发生错误:', error);
    return {
      hasMainFunction: false,
      mainFunctionStart: null,
      mainFunctionEnd: null,
      whileLoopStart: null,
      iifeStart: null,
      iifeEnd: null
    };
  }
}

/**
 * 将源文件中的多层嵌套switch结构转换为单层扁平化的switch结构，自动适配不同方法名和参数名
 * @param {string} inputFilePath - 输入文件路径
 * @param {string} outputFilePath - 输出文件路径
 */
function flattenSwitchStructure(inputFilePath, outputFilePath) {
  try {
    // 自动检测方法名和参数名
    const {methodName, paramName} = detectMethodAndParamNames(inputFilePath);

    // 提取所有参数值
    const paramValues = extractAllParamValues(inputFilePath, methodName, paramName);

    // 检测映射公式
    const {mappingVars, mappingCode} = detectMappingFormula(inputFilePath, paramName);

    // 读取源文件
    const sourceCode = fs.readFileSync(inputFilePath, 'utf-8');
    console.log(`成功读取源文件: ${inputFilePath}`);

    // 解析代码生成AST
    const ast = parser.parse(sourceCode);
    console.log('成功解析代码生成AST');

    // 存储参数值到代码段的映射
    const paramValueToCodeMap = new Map();

    // 为每个参数值查找对应的代码段
    function findCodeSegmentForParam(paramValue) {
      // 使用检测到的映射公式计算映射值
      const mappingValues = [];

      // 计算第一级映射值 (& 31)
      mappingValues.push(paramValue & 31);

      // 计算第二级映射值 (>> 5 & 31)
      mappingValues.push((paramValue >> 5) & 31);

      // 计算第三级映射值 (>> 10 & 31)
      mappingValues.push((paramValue >> 10) & 31);

      console.log(`处理${paramName}=${paramValue}: ${mappingVars[0]}=${mappingValues[0]}, ${mappingVars[1]}=${mappingValues[1]}, ${mappingVars[2]}=${mappingValues[2]}`);

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

      // 定义完整路径，使用检测到的映射变量
      const fullPath = [
        {discriminant: mappingVars[0], caseValue: mappingValues[0]},
        {discriminant: mappingVars[1], caseValue: mappingValues[1]},
        {discriminant: mappingVars[2], caseValue: mappingValues[2]}
      ];

      const result = findCodeByPath(ast.program.body, fullPath);

      if (result) {
        // 生成代码
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

    // 为每个参数值查找代码段并存储
    paramValues.forEach(paramValue => {
      const codeSegment = findCodeSegmentForParam(paramValue);
      if (codeSegment) {
        paramValueToCodeMap.set(paramValue, codeSegment);
      }
    });

    console.log(`成功映射的${paramName}值数量: ${paramValueToCodeMap.size}`);

    // 智能提取文件结构
    const structure = extractFileStructure(sourceCode, methodName, paramName);

    // 确定beforeWhile部分
    let beforeWhile = '';
    let whileStartLine = '';
    let iifeEnd = '';

    if (structure.hasMainFunction) {
      // 如果已有主函数，使用原始文件结构
      beforeWhile = sourceCode.substring(0, structure.whileLoopStart);
      whileStartLine = sourceCode.substring(structure.whileLoopStart, sourceCode.indexOf('{', structure.whileLoopStart) + 1);

      // 提取IIFE结束部分
      const iifeParts = sourceCode.match(/\}\s*\}\s*catch\s*\([^)]*\)\s*\{\s*\}\s*\}\s*\}\s*\)\s*\(\s*\)\s*;/);
      iifeEnd = iifeParts ? iifeParts[0] : '}\n    } catch (l) {}\n  }\n})(\n);';
    } else {
      // 如果没有主函数，使用默认结构
      // 1. 查找while循环开始位置
      const whileRegex = new RegExp(`while\\s*\\(\\s*${paramName}\\s*!==\\s*undefined\\s*\\)\\s*\\{`);
      const whileMatch = sourceCode.match(whileRegex);

      if (!whileMatch) {
        console.error(`未找到${paramName}的while循环`);
        return {
          success: false,
          error: `未找到${paramName}的while循环`
        };
      }

      // 2. 提取while循环前的代码，但不包括主函数定义
      beforeWhile = sourceCode.substring(0, whileMatch.index);

      // 3. 提取while循环开始行
      whileStartLine = whileMatch[0];

      // 4. 查找IIFE结束部分
      const iifeParts = sourceCode.match(/\}\s*\}\s*catch\s*\([^)]*\)\s*\{\s*\}\s*\}\s*\}\s*\)\s*\(\s*\)\s*;/);
      iifeEnd = iifeParts ? iifeParts[0] : '}\n    } catch (l) {}\n  }\n})(\n);';
    }

    // 生成单层switch结构
    let switchCases = [];

    // 为每个参数值创建一个case，保持一致的缩进
    for (const [paramValue, codeSegment] of paramValueToCodeMap.entries()) {
      // 确保代码段的缩进一致
      const indentedCodeSegment = codeSegment
        .split('\n')
        .map(line => `        ${line}`)
        .join('\n');

      switchCases.push(`      case ${paramValue}:
${indentedCodeSegment}
        break;`);
    }

    // 生成新的代码
    let newCode;

    if (structure.hasMainFunction) {
      // 如果已有主函数，保留原始结构
      newCode = `${beforeWhile}
      ${whileStartLine}
      switch (${paramName}) {
${switchCases.join('\n')}
      default:
        ${paramName} = undefined;
        break;
      }
    ${iifeEnd}`;
    } else {
      // 如果没有主函数，生成完整结构
      newCode = `${beforeWhile}
  function ${methodName}() {
    try {
      var l, a, p, c, _, e, y, t, n, o, v, d, i, r, u, s, f, x, b, z, g, w, h, q, j, m, k, C, T, S, E, V, A, F, U, P, B, L, N, M, Z, G, X, I, W, J, O, Y, H, K, Q, $, ll, al, pl, cl, _l, el, yl, tl, nl, ol, vl, dl, il, rl, ul, sl, fl, xl, bl, zl, gl, wl, hl, ql, jl, ml, kl, Cl, Tl, Sl, El, Vl, Al, Rl, Fl, Ul, Pl, Bl, Ll, Nl, Dl, Ml, Zl, Gl, Xl, Il, Wl, Jl, Ol, Yl, Hl, Kl, Ql, $l, la, aa, pa, ca, _a, ea, ya, ta, na, oa, va, da, ia, ra, ua, sa, fa, xa, ba, za, ga, wa, ha, qa, ja, ma, ka, Ca, Ta, Sa, Ea, Va, Aa, Ra, Fa, Ua, Pa, Ba, La, Na, Da, Ma, Za, Ga, Xa, Ia, Wa, Ja, Oa, Ya, Ha, Ka, Qa, $a, lp, ap, pp, cp, _p, ep, yp, tp, np, op, vp, dp, ip, rp, up, sp, fp, xp, bp, zp, gp, wp, hp, qp, jp, mp, kp, Cp, Tp, Sp, Ep, Vp, Ap, Rp, Fp, Up, Pp, Bp, Lp, Np, Dp, Mp, Zp, Gp, Xp, Ip, Wp, Jp, Op, Yp, Hp, Kp, Qp, $p, lc, ac, pc, cc, _c, ec, yc, tc, nc, oc, vc, dc, ic, rc, uc, sc, fc, xc, bc, zc, gc, wc, hc, qc, jc, mc, kc, Cc, Tc, Sc, Ec, Vc, Ac, Rc, Fc, Uc, Pc, Bc, Lc, Nc, Dc, Mc, Zc, Gc, Xc, Ic, Wc, Jc, Oc, Yc, Hc, Kc, Qc, $c, l_, a_, p_, c_, __, e_, y_, t_, n_, o_, v_, d_, i_, r_, u_, s_, f_, x_, b_, z_, g_, w_, h_, q_, j_, m_, k_, C_, T_, S_, E_, V_, A_, R_, F_, U_, P_, B_, L_, N_, D_, M_, Z_, G_, X_, I_, W_, J_, O_;
      var ${paramName} = arguments[0];
      ${mappingCode}
      ${whileStartLine}
      switch (${paramName}) {
${switchCases.join('\n')}
      default:
        ${paramName} = undefined;
        break;
      }
    ${iifeEnd}`;
    }

    // 写入新文件
    fs.writeFileSync(outputFilePath, newCode, 'utf-8');
    console.log(`成功将扁平化代码写入: ${outputFilePath}`);

    return {
      success: true,
      methodName,
      paramName,
      mappingVars,
      paramValuesCount: paramValues.length,
      mappedValuesCount: paramValueToCodeMap.size
    };
  } catch (error) {
    console.error('扁平化过程中发生错误:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// 主函数
function main() {
  const inputFilePath = './transformed.js';
  const outputFilePath = './transformed.js';

  if (!inputFilePath) {
    console.error('请提供输入文件路径');
    console.log('用法: node 自动适配控制流.js <输入文件路径> [输出文件路径]');
    return;
  }

  console.log(`输入文件: ${inputFilePath}`);
  console.log(`输出文件: ${outputFilePath}`);

  const result = flattenSwitchStructure(inputFilePath, outputFilePath);

  if (result.success) {
    console.log('处理完成!');
    console.log(`检测到的方法名: ${result.methodName}`);
    console.log(`检测到的参数名: ${result.paramName}`);
    console.log(`检测到的映射变量: ${result.mappingVars.join(', ')}`);
    console.log(`收集到的参数值总数: ${result.paramValuesCount}`);
    console.log(`成功映射的参数值数量: ${result.mappedValuesCount}`);
  } else {
    console.error(`处理失败: ${result.error}`);
  }
}

// 执行主函数
main();
