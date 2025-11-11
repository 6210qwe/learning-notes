/**
 * AST 转换工具集 - 合并版
 *
 * 包含以下功能：
 * 1. 将 return [变量]; 格式改为 return 变量;
 * 2. 将三元表达式转换为 if-else 语句
 */

const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

/**
 * 工具类 - 提供 AST 处理的公共方法
 */
class ASTUtils {
  /**
   * 读取文件并生成 AST
   * @param {string} filePath - 文件路径
   * @returns {Object} AST 对象
   */
  static parseFile(filePath) {
    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    console.log(`成功读取源文件: ${filePath}`);
    return parser.parse(sourceCode);
  }

  /**
   * 将 AST 写入文件
   * @param {Object} ast - AST 对象
   * @param {string} filePath - 输出文件路径
   */
  static writeFile(ast, filePath) {
    const { code } = generate(ast, {
      retainLines: true,
      comments: true
    });
    fs.writeFileSync(filePath, code, 'utf-8');
    console.log(`成功将代码写入: ${filePath}`);
  }
}

/**
 * Return 数组简化转换器
 */
class ReturnArraySimplifier {
  /**
   * 修改 return [变量]; 为 return 变量;
   * @param {string} inputFilePath - 输入文件路径
   * @param {string} outputFilePath - 输出文件路径
   * @returns {Object} 执行结果
   */
  static transform(inputFilePath, outputFilePath) {
    try {
      const ast = ASTUtils.parseFile(inputFilePath);
      let modificationCount = 0;

      traverse(ast, {
        ReturnStatement(path) {
          if (t.isArrayExpression(path.node.argument)) {
            const elements = path.node.argument.elements;
            if (elements.length === 1) {
              path.node.argument = elements[0];
              modificationCount++;
            }
          }
        }
      });

      console.log(`共修改了${modificationCount}处return [变量]; 为 return 变量;`);
      ASTUtils.writeFile(ast, outputFilePath);

      return {
        success: true,
        modificationCount,
        outputFilePath
      };
    } catch (error) {
      console.error('Return数组简化过程中发生错误:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

/**
 * 三元表达式转换器
 */
class TernaryToIfElseConverter {
  /**
   * 将三元表达式转换为 if-else 语句
   * @param {string} inputFilePath - 输入文件路径
   * @param {string} outputFilePath - 输出文件路径
   * @returns {Object} 执行结果
   */
  static transform(inputFilePath, outputFilePath) {
    try {
      const ast = ASTUtils.parseFile(inputFilePath);
      let conversionCount = 0;

      traverse(ast, {
        AssignmentExpression(path) {
          if (
            path.node.operator === '=' &&
            t.isConditionalExpression(path.node.right)
          ) {
            const assignment = path.node;
            const conditional = assignment.right;
            const left = assignment.left;

            const ifStatement = t.ifStatement(
              conditional.test,
              t.blockStatement([
                t.expressionStatement(
                  t.assignmentExpression(
                    '=',
                    t.clone(left),
                    conditional.consequent
                  )
                )
              ]),
              t.blockStatement([
                t.expressionStatement(
                  t.assignmentExpression(
                    '=',
                    t.clone(left),
                    conditional.alternate
                  )
                )
              ])
            );

            path.replaceWith(ifStatement);
            conversionCount++;
          }
        },

        VariableDeclarator(path) {
          if (
            path.node.init &&
            t.isConditionalExpression(path.node.init)
          ) {
            const declarator = path.node;
            const conditional = declarator.init;
            const varName = declarator.id.name;

            const newDeclarator = t.variableDeclarator(
              t.identifier(varName)
            );

            const ifStatement = t.ifStatement(
              conditional.test,
              t.blockStatement([
                t.expressionStatement(
                  t.assignmentExpression(
                    '=',
                    t.identifier(varName),
                    conditional.consequent
                  )
                )
              ]),
              t.blockStatement([
                t.expressionStatement(
                  t.assignmentExpression(
                    '=',
                    t.identifier(varName),
                    conditional.alternate
                  )
                )
              ])
            );

            path.replaceWith(newDeclarator);
            path.parentPath.insertAfter(ifStatement);
            conversionCount++;
          }
        },

        ConditionalExpression(path) {
          if (
            (path.parent.type === 'AssignmentExpression' && path.key === 'right') ||
            (path.parent.type === 'VariableDeclarator' && path.key === 'init')
          ) {
            return;
          }

          if (path.parent.type === 'ExpressionStatement') {
            const conditional = path.node;

            const ifStatement = t.ifStatement(
              conditional.test,
              t.blockStatement([
                t.expressionStatement(conditional.consequent)
              ]),
              t.blockStatement([
                t.expressionStatement(conditional.alternate)
              ])
            );

            path.parentPath.replaceWith(ifStatement);
            conversionCount++;
          }
        }
      });

      ASTUtils.writeFile(ast, outputFilePath);
      console.log(`总共转换了 ${conversionCount} 个三元表达式为if-else语句`);

      return {
        success: true,
        conversionCount,
        outputFilePath
      };
    } catch (error) {
      console.error('三元表达式转换过程中发生错误:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

/**
 * 主函数 - 处理命令行执行
 */
function main() {
  // 配置要执行的操作
  const operations = [
    {
      name: '三元表达式转if-else',
      transformer: TernaryToIfElseConverter,
      input: './源文件.js',
      output: './transformed.js'
    },
    {
      name: 'return数组简化',
      transformer: ReturnArraySimplifier,
      input: './transformed.js',
      output: './transformed.js'
    }
  ];

  // 执行所有操作
  operations.forEach(op => {
    console.log(`\n开始执行: ${op.name}`);
    console.log(`输入文件: ${op.input}`);
    console.log(`输出文件: ${op.output}`);

    const result = op.transformer.transform(op.input, op.output);

    if (result.success) {
      console.log(`${op.name} 操作成功完成!`);
      if (result.modificationCount !== undefined) {
        console.log(`共修改了 ${result.modificationCount} 处`);
      }
      if (result.conversionCount !== undefined) {
        console.log(`共转换了 ${result.conversionCount} 处`);
      }
    } else {
      console.error(`${op.name} 操作失败:`, result.error);
    }
  });
}

// 如果直接运行脚本，则执行main函数
if (require.main === module) {
  main();
} else {
  // 作为模块导出
  module.exports = {
    ASTUtils,
    ReturnArraySimplifier,
    TernaryToIfElseConverter
  };
}