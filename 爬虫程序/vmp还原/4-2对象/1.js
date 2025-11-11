const type = require('@babel/types');
const generator = require("@babel/generator").default;
let allBody = type.program([]); // 根AST节点
const popStack = []; // 专门保存被POP弹出的数据

(function vmFunc(instList, poolList) {
    function Scope(parentScope) {
        this.data = {};
        if (parentScope) {
            this.data.__proto__ = parentScope.data;
        } else {
            globalThis["this"] = globalThis;
            this.data.__proto__ = globalThis;
        }
    }

    Scope.prototype.load = function (name) {
        return this.data[name];
    }

    Scope.prototype.store = function (name, value) {
        let data = this.data;
        if (name === "this" || name === "arguments") {
            data[name] = value;
            return value;
        }
        while (!data.hasOwnProperty(name) && data !== globalThis) {
            data = data.__proto__;
        }
        data[name] = value;
    }

    Scope.prototype.def = function (name) {
        this.data[name] = undefined;
    }

    function vm(scope, pc, stack) {
        stack = stack || [];
        while (1) {
            let inst = instList[pc++];
            if (inst === undefined) { break; }

            console.log(`指令为${inst}, 栈状态:`, stack.map(n => generator(n).code));

            switch (inst) {
                case 1: { // ADD：加法运算
                    let right = stack.pop();
                    let left = stack.pop();
                    const result = type.binaryExpression('+', left, right);
                    stack.push(result);
                    break;
                }
                case 101: { // PUSH：入栈指令
                    let pos = instList[pc++];
                    let val = poolList[pos];
                    const node = type.valueToNode(val);
                    stack.push(node);
                    break;
                }
                case 102: { // POP：出栈指令，将弹出的数据存入popStack
                    const popped = stack.pop();
                    popStack.push(popped); // 保存被弹出的AST节点
                    break;
                }
                default:
                    console.log(`${inst} 未实现`);
                    throw {};
            }
        }

        // 从popStack中取出所有数据，顺序排列生成最终代码
        popStack.forEach(node => {
            allBody.body.push(type.expressionStatement(node));
        });
    }

    vm(new Scope(), 0);
})([101,0, 101,1, 1, 101,2, 1, 101,3, 1, 102], [1, 2, 4, 5]);

// 生成并打印最终代码
console.log('还原后的代码为：\n' + generator(
    allBody,
    {
        compact: false,
        jsescOption: { minimal: true, unicode: false },
        format: { indent: { style: '  ' } }
    }
).code);
