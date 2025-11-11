/**
 * AST Case节点链式合并工具 - 纯合并版本
 * 
 * 功能：
 * 1. 解析JavaScript代码为AST结构
 * 2. 识别switch语句和case节点
 * 3. 构建节点引用关系图
 * 4. 查找可合并的节点链
 * 5. 递归合并节点内容，去除多余break语句
 * 6. 修正跳转关系
 * 7. 删除不再被引用的节点
 * 8. 生成合并后的代码
 */

const fs = require('fs');
const acorn = require('acorn');
const escodegen = require('escodegen');
const path = require('path');


const inputFile = './transformed.js';
const outputFile = './transformed.js'

// 检查输入文件是否存在
if (!fs.existsSync(inputFile)) {
  console.error(`错误: 输入文件 "${inputFile}" 不存在`);
  process.exit(1);
}

// 读取输入文件
const code = fs.readFileSync(inputFile, 'utf8');

// 使用acorn解析代码为AST
console.log('正在解析代码为AST...');
const ast = acorn.parse(code, {
  ecmaVersion: 2020,
  sourceType: 'script',
  locations: true
});

// 用于存储每个switch语句的信息
const switchStatements = [];

// 用于存储case节点信息的对象，按switch语句分组
const caseNodesBySwitchId = {};
// 用于存储节点引用关系的对象，按switch语句分组
const nodeReferencesBySwitchId = {};
// 用于存储节点被引用次数的对象，按switch语句分组
const nodeReferenceCountBySwitchId = {};
// 用于存储合并链的对象，按switch语句分组
let mergeChainsBySwitchId = {}; // 修改为let，允许重新赋值
// 用于存储合并后的case节点内容，按switch语句分组
const mergedCaseContentBySwitchId = {};
// 用于存储已经被合并的节点，按switch语句分组
const mergedNodesBySwitchId = {};
// 用于存储需要删除的节点，按switch语句分组
const nodesToDeleteBySwitchId = {};
// 用于存储节点重定向映射，用于修正跳转关系
const nodeRedirectionMapBySwitchId = {};

/**
 * 递归遍历AST，查找switch语句和case子句
 * @param {Object} node - 当前AST节点
 * @param {Object} parent - 父节点
 */
function traverseAST(node, parent) {
  if (!node || typeof node !== 'object') return;
  
  // 检查是否是switch语句
  if (node.type === 'SwitchStatement') {
    // 获取switch的控制变量
    const discriminant = node.discriminant;
    const switchId = switchStatements.length;
    
    // 记录switch语句信息
    switchStatements.push({
      id: switchId,
      node: node,
      discriminant: discriminant
    });
    
    // 初始化该switch语句的数据结构
    caseNodesBySwitchId[switchId] = {};
    nodeReferencesBySwitchId[switchId] = {};
    nodeReferenceCountBySwitchId[switchId] = {};
    mergedNodesBySwitchId[switchId] = new Set();
    nodesToDeleteBySwitchId[switchId] = new Set();
    nodeRedirectionMapBySwitchId[switchId] = {};
    mergedCaseContentBySwitchId[switchId] = {};
    
    // 处理case子句
    node.cases.forEach((caseClause, index) => {
      if (caseClause.test && caseClause.test.type === 'Literal' && typeof caseClause.test.value === 'number') {
        const caseNumber = caseClause.test.value;
        
        // 存储case节点信息
        caseNodesBySwitchId[switchId][caseNumber] = {
          body: caseClause.consequent,
          nextNode: null,
          prevNodes: []
        };
        
        // 查找控制变量赋值语句和break语句
        let nextNodeAssignment = null;
        let hasBreak = false;
        
        caseClause.consequent.forEach(stmt => {
          // 检查是否是控制变量赋值语句 (Te = X 或 W = X 或 he = X)
          if (stmt.type === 'ExpressionStatement' && 
              stmt.expression.type === 'AssignmentExpression' && 
              stmt.expression.operator === '=' && 
              stmt.expression.left.type === 'Identifier' && 
              (stmt.expression.left.name === discriminant.name) &&
              stmt.expression.right.type === 'Literal' && 
              typeof stmt.expression.right.value === 'number') {
            
            nextNodeAssignment = stmt.expression.right.value;
          }
          
          // 检查是否有break语句
          if (stmt.type === 'BreakStatement') {
            hasBreak = true;
          }
        });
        
        // 更新case节点信息
        if (nextNodeAssignment !== null) {
          caseNodesBySwitchId[switchId][caseNumber].nextNode = nextNodeAssignment;
          
          // 记录引用关系
          if (!nodeReferencesBySwitchId[switchId][caseNumber]) {
            nodeReferencesBySwitchId[switchId][caseNumber] = [];
          }
          nodeReferencesBySwitchId[switchId][caseNumber].push(nextNodeAssignment);
          
          // 增加被引用节点的计数
          if (!nodeReferenceCountBySwitchId[switchId][nextNodeAssignment]) {
            nodeReferenceCountBySwitchId[switchId][nextNodeAssignment] = 0;
          }
          nodeReferenceCountBySwitchId[switchId][nextNodeAssignment]++;
        }
      }
    });
  }
  
  // 递归遍历子节点
  for (const key in node) {
    if (node.hasOwnProperty(key) && key !== 'parent') {
      const child = node[key];
      if (Array.isArray(child)) {
        child.forEach(item => traverseAST(item, node));
      } else {
        traverseAST(child, node);
      }
    }
  }
}

/**
 * 为每个switch语句构建前驱节点关系
 */
function buildPredecessorRelationships() {
  for (const switchId in nodeReferencesBySwitchId) {
    for (const caseNumber in nodeReferencesBySwitchId[switchId]) {
      const nextNodes = nodeReferencesBySwitchId[switchId][caseNumber];
      nextNodes.forEach(nextNode => {
        if (caseNodesBySwitchId[switchId][nextNode]) {
          caseNodesBySwitchId[switchId][nextNode].prevNodes.push(parseInt(caseNumber));
        }
      });
    }
  }
}

/**
 * 递归查找可合并的节点链
 * @param {string} switchId - switch语句ID
 * @param {number} startNode - 起始节点
 * @param {Array} chain - 当前链
 * @param {Set} visited - 已访问节点集合
 * @returns {Array} - 合并链
 */
function findMergeChain(switchId, startNode, chain = [], visited = new Set()) {
  if (visited.has(startNode)) {
    return chain;
  }
  
  visited.add(startNode);
  chain.push(startNode);
  
  const node = caseNodesBySwitchId[switchId][startNode];
  if (!node) {
    return chain;
  }
  
  // 如果节点有唯一后继，且后继节点只有一个前驱（当前节点）
  if (node.nextNode !== null && 
      nodeReferencesBySwitchId[switchId][startNode] && 
      nodeReferencesBySwitchId[switchId][startNode].length === 1) {
    
    const nextNode = node.nextNode;
    
    if (caseNodesBySwitchId[switchId][nextNode] && 
        caseNodesBySwitchId[switchId][nextNode].prevNodes.length === 1 && 
        caseNodesBySwitchId[switchId][nextNode].prevNodes[0] === parseInt(startNode)) {
      
      // 递归查找后继节点的合并链
      return findMergeChain(switchId, nextNode, chain, visited);
    }
  }
  
  return chain;
}

/**
 * 查找每个switch语句中的所有合并链
 */
function findAllMergeChains() {
  mergeChainsBySwitchId = {}; // 重新初始化，而不是重新赋值
  
  for (const switchId in caseNodesBySwitchId) {
    mergeChainsBySwitchId[switchId] = [];
    
    // 对每个节点尝试查找合并链
    for (const caseNumber in caseNodesBySwitchId[switchId]) {
      // 只从链头开始查找（没有前驱节点或前驱节点不满足合并条件的节点）
      const node = caseNodesBySwitchId[switchId][caseNumber];
      let isChainHead = true;
      
      if (node.prevNodes.length > 0) {
        // 检查是否有前驱节点满足合并条件
        for (const prevNode of node.prevNodes) {
          if (nodeReferencesBySwitchId[switchId][prevNode] && 
              nodeReferencesBySwitchId[switchId][prevNode].length === 1 && 
              nodeReferencesBySwitchId[switchId][prevNode][0] === parseInt(caseNumber) && 
              caseNodesBySwitchId[switchId][prevNode].prevNodes.length === 1) {
            isChainHead = false;
            break;
          }
        }
      }
      
      // 如果是链头，查找合并链
      if (isChainHead) {
        const chain = findMergeChain(switchId, parseInt(caseNumber));
        
        // 只记录长度大于1的链（至少有两个节点可以合并）
        if (chain.length > 1) {
          mergeChainsBySwitchId[switchId].push(chain);
        }
      }
    }
  }
}

/**
 * 合并节点链
 * @param {string} switchId - switch语句ID
 * @param {Array} chain - 合并链
 */
function mergeNodeChain(switchId, chain) {
  if (chain.length <= 1) {
    return; // 不需要合并
  }
  
  const targetNode = chain[0]; // 链头节点作为目标节点
  const discriminant = switchStatements[switchId].discriminant.name;
  
  // 收集链中所有节点的内容，去除中间节点的控制变量赋值和break语句
  let mergedContent = [];
  
  chain.forEach((nodeId, index) => {
    const node = caseNodesBySwitchId[switchId][nodeId];
    if (!node) return;
    
    // 过滤节点内容
    const filteredBody = node.body.filter(stmt => {
      // 如果不是链末尾节点，排除控制变量赋值语句和break语句
      if (index < chain.length - 1) {
        // 排除控制变量赋值语句
        if (stmt.type === 'ExpressionStatement' && 
            stmt.expression.type === 'AssignmentExpression' && 
            stmt.expression.operator === '=' && 
            stmt.expression.left.type === 'Identifier' && 
            stmt.expression.left.name === discriminant &&
            stmt.expression.right.type === 'Literal' && 
            typeof stmt.expression.right.value === 'number') {
          return false;
        }
        
        // 排除break语句
        if (stmt.type === 'BreakStatement') {
          return false;
        }
      }
      
      return true;
    });
    
    // 添加到合并内容
    mergedContent = [...mergedContent, ...filteredBody];
    
    // 如果不是目标节点，标记为已合并，需要删除
    if (nodeId !== targetNode) {
      mergedNodesBySwitchId[switchId].add(nodeId);
      nodesToDeleteBySwitchId[switchId].add(nodeId);
      
      // 更新节点重定向映射
      nodeRedirectionMapBySwitchId[switchId][nodeId] = targetNode;
    }
  });
  
  // 存储合并后的内容
  mergedCaseContentBySwitchId[switchId][targetNode] = mergedContent;
}

/**
 * 对每个switch语句中的所有合并链进行合并处理
 */
function mergeAllNodeChains() {
  for (const switchId in mergeChainsBySwitchId) {
    const chains = mergeChainsBySwitchId[switchId];
    chains.forEach(chain => {
      mergeNodeChain(switchId, chain);
    });
  }
}

/**
 * 修正跳转关系
 * @param {string} switchId - switch语句ID
 * @param {number} caseNumber - case节点编号
 * @param {Object} redirectionMap - 重定向映射
 */
function fixJumpReferences(switchId, caseNumber, redirectionMap) {
  const node = caseNodesBySwitchId[switchId][caseNumber];
  if (!node) return;
  
  // 获取节点内容（可能是合并后的内容）
  const body = mergedCaseContentBySwitchId[switchId][caseNumber] || node.body;
  if (!body) return;
  
  // 遍历节点内容，修正控制变量赋值语句中的跳转目标
  body.forEach(stmt => {
    if (stmt.type === 'ExpressionStatement' && 
        stmt.expression.type === 'AssignmentExpression' && 
        stmt.expression.operator === '=' && 
        stmt.expression.left.type === 'Identifier' && 
        stmt.expression.left.name === switchStatements[switchId].discriminant.name &&
        stmt.expression.right.type === 'Literal' && 
        typeof stmt.expression.right.value === 'number') {
      
      const jumpTarget = stmt.expression.right.value;
      
      // 如果跳转目标在重定向映射中，修正为新的目标
      if (redirectionMap[jumpTarget] !== undefined) {
        stmt.expression.right.value = redirectionMap[jumpTarget];
        stmt.expression.right.raw = String(redirectionMap[jumpTarget]);
      }
    }
  });
}

/**
 * 对每个switch语句中的所有保留的case节点进行跳转修正
 */
function fixAllJumpReferences() {
  for (const switchId in caseNodesBySwitchId) {
    for (const caseNumber in caseNodesBySwitchId[switchId]) {
      if (!nodesToDeleteBySwitchId[switchId].has(parseInt(caseNumber))) {
        fixJumpReferences(switchId, caseNumber, nodeRedirectionMapBySwitchId[switchId]);
      }
    }
  }
}

/**
 * 更新AST中的case节点内容
 * @param {Object} node - 当前AST节点
 */
function updateASTCaseNodes(node) {
  if (!node || typeof node !== 'object') return;
  
  if (node.type === 'SwitchStatement') {
    // 找到对应的switchId
    let switchId = null;
    for (const id in switchStatements) {
      if (switchStatements[id].discriminant.name === node.discriminant.name) {
        switchId = id;
        break;
      }
    }
    
    if (switchId !== null) {
      // 过滤掉需要删除的case节点
      node.cases = node.cases.filter(caseClause => {
        if (caseClause.test && caseClause.test.type === 'Literal' && typeof caseClause.test.value === 'number') {
          return !nodesToDeleteBySwitchId[switchId].has(caseClause.test.value);
        }
        return true;
      });
      
      // 更新保留的case节点内容
      node.cases.forEach(caseClause => {
        if (caseClause.test && caseClause.test.type === 'Literal' && typeof caseClause.test.value === 'number') {
          const caseNumber = caseClause.test.value;
          if (mergedCaseContentBySwitchId[switchId][caseNumber]) {
            caseClause.consequent = mergedCaseContentBySwitchId[switchId][caseNumber];
          }
        }
      });
    }
  }
  
  // 递归处理子节点
  for (const key in node) {
    if (node.hasOwnProperty(key) && key !== 'parent') {
      const child = node[key];
      if (Array.isArray(child)) {
        child.forEach(item => updateASTCaseNodes(item));
      } else {
        updateASTCaseNodes(child);
      }
    }
  }
}

/**
 * 生成统计信息
 * @returns {Object} - 统计信息对象
 */
function generateStats() {
  const stats = {};
  let totalOriginalCaseCount = 0;
  let totalMergedNodeCount = 0;
  let totalRemainingCaseCount = 0;

  for (const switchId in caseNodesBySwitchId) {
    const originalCaseCount = Object.keys(caseNodesBySwitchId[switchId]).length;
    const mergedNodeCount = mergedNodesBySwitchId[switchId].size;
    const remainingCaseCount = originalCaseCount - nodesToDeleteBySwitchId[switchId].size;
    
    stats[`switch_${switchId}`] = {
      originalCaseCount,
      mergedNodeCount,
      remainingCaseCount,
      chainCount: mergeChainsBySwitchId[switchId].length,
      deletedNodes: Array.from(nodesToDeleteBySwitchId[switchId]).sort((a, b) => a - b),
      redirectionMap: nodeRedirectionMapBySwitchId[switchId]
    };
    
    totalOriginalCaseCount += originalCaseCount;
    totalMergedNodeCount += mergedNodeCount;
    totalRemainingCaseCount += remainingCaseCount;
  }

  stats.total = {
    originalCaseCount: totalOriginalCaseCount,
    mergedNodeCount: totalMergedNodeCount,
    remainingCaseCount: totalRemainingCaseCount,
    totalChainCount: Object.values(mergeChainsBySwitchId).reduce((sum, chains) => sum + chains.length, 0)
  };
  
  return stats;
}

// 主流程
console.log('开始处理...');

// 1. 解析AST并构建节点关系
console.log('1. 解析AST并构建节点关系...');
traverseAST(ast, null);

// 2. 构建前驱节点关系
console.log('2. 构建前驱节点关系...');
buildPredecessorRelationships();

// 3. 查找可合并的节点链
console.log('3. 查找可合并的节点链...');
findAllMergeChains();

// 4. 合并节点链
console.log('4. 合并节点链...');
mergeAllNodeChains();

// 5. 修正跳转关系
console.log('5. 修正跳转关系...');
fixAllJumpReferences();

// 6. 更新AST
console.log('6. 更新AST...');
updateASTCaseNodes(ast);

// 7. 生成修改后的代码
console.log('7. 生成修改后的代码...');
const mergedCode = escodegen.generate(ast, {
  format: {
    indent: {
      style: '  ',
      base: 0
    },
    newline: '\n',
    space: ' ',
    json: false,
    renumber: false,
    hexadecimal: false,
    quotes: 'single',
    escapeless: false,
    compact: false,
    parentheses: true,
    semicolons: true,
    safeConcatenation: false
  }
});

// 8. 输出合并后的代码
console.log('8. 输出合并后的代码...');
fs.writeFileSync(outputFile, mergedCode);

// 9. 生成并输出统计信息
const stats = generateStats();
// const statsFile = path.join(path.dirname(outputFile), 'merge_stats.json');
// fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));

// 10. 输出结果
console.log('\n合并完成，总计：');
console.log(`- 原始case节点总数：${stats.total.originalCaseCount}`);
console.log(`- 合并的节点数：${stats.total.mergedNodeCount}`);
console.log(`- 合并后剩余节点数：${stats.total.remainingCaseCount}`);
console.log(`- 合并链总数：${stats.total.totalChainCount}`);
console.log(`\n结果已保存到 ${outputFile}`);
// console.log(`统计信息已保存到 ${statsFile}`);
