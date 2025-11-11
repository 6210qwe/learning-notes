const type = require('@babel/types');
const generator = require("@babel/generator").default;
let allBody = type.program([]); // 根AST节点

(function vmFunc(instList, poolList) {
    function vm(pc) {
        // 运算栈：用于中间计算，正常弹出/推入
        const calcStack = [];
        // 结果栈：仅同步推入AST节点，永不弹出，专门保留结果
        const resultStack = [];

        while (pc < instList.length) {
            const inst = instList[pc++];
            console.log(`指令${inst}, 结果栈:`, resultStack.map(n => generator(n).code));

            switch (inst) {
                case 1: { // ADD：运算栈弹出，结果栈保留历史节点，同时推入新节点
                    // 运算栈正常弹出计算
                    const rightVal = calcStack.pop();
                    const leftVal = calcStack.pop();
                    calcStack.push(leftVal + rightVal);

                    // 结果栈只取最后两个节点生成新节点（不弹出旧节点，仅新增）
                    const rightAst = resultStack[resultStack.length - 1];
                    const leftAst = resultStack[resultStack.length - 2];
                    const addAst = type.binaryExpression('+', leftAst, rightAst);
                    resultStack.push(addAst); // 结果栈只推不弹
                    break;
                }
                case 101: { // PUSH：双栈同步推入
                    const pos = instList[pc++];
                    const val = poolList[pos];
                    calcStack.push(val); // 运算栈推值
                    resultStack.push(type.valueToNode(val)); // 结果栈推AST节点（只推不弹）
                    break;
                }
                case 102: { // POP：仅操作运算栈，结果栈完全不处理
                    calcStack.pop();
                    // 结果栈不执行任何弹出，确保所有节点都被保留
                    break;
                }
            }
        }

        // 最终结果取结果栈的最后一个节点（最新生成的完整表达式）
        if (resultStack.length > 0) {
            allBody.body.push(type.expressionStatement(resultStack[resultStack.length - 1]));
        }
    }

    // 原始指令序列（包含102，不影响结果栈）
    vm(0);
})([101,0,101,1,1,101,2,1,101,3,1,101,4,1,101,5,1,102], [1,2,3,4,5,6]);

console.log('还原后的代码为：\n' + generator(allBody, {
    compact: false,
    format: { indent: { style: '  ' } }
}).code);
