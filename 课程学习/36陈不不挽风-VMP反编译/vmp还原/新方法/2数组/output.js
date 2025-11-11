const type = require('@babel/types');
const generator = require("@babel/generator").default;
let allBody = type.program([]); // 根AST节点
const popStack = []; // 专门保存被POP弹出的数据
(function vmFunc(instList, poolList) {
    function Scope(parentScope) {
        this.data = { };
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
            console.log(`指令${inst}执行前，栈长度：${stack.length}`); // 新增这行
            switch (inst) {
                case 1: { // ADD
                    let right = stack.pop();
                    let left = stack.pop();
                    const result = type.binaryExpression('+', left, right);
                    stack.push(result);
                    break;
                }
                case 54: {
                    const value = stack.pop();
                    const key = stack.pop();
                    const obj = stack.pop();
                    console.log(value, key, obj);
                    const index = key.value;
                    obj.elements[index] = value;
                    stack.push(obj);
                    break;
                }
                case 101: { // PUSH
                    let pos = instList[pc++];
                    let val = poolList[pos];
                    const node = type.valueToNode(val);
                    stack.push(node);
                    break;
                }
                case 102: { // POP
                    let popped = stack.pop();
                    console.log("pop出来", popped)
                    // popStack.push(JSON.parse(JSON.stringify(popped)));
                    popStack.push(popped);
                    break;
                }
                case 104: { // COPY
                    let top = stack[stack.length - 1];
                    stack.push(top);
                    break;
                }
                case 152: { // ARR
                    stack.push(type.arrayExpression([]));
                    break;
                }
                default:
                    console.log(`${inst} 未实现`);
                    throw { };
            }
        }
        let i = 0;
        // 用 for 循环而非 forEach，便于控制索引和删除元素
        while (i < popStack.length) {
            const node = popStack[i];
            if (type.isNode(node)) {
                allBody.body.push(type.expressionStatement(node));
                if (type.isArrayExpression(node)) {
                    const deleteCount = node.elements.length; // 要删除的后续元素个数（等于数组长度）
                    console.log(`发现数组节点，elements.length = ${deleteCount}，将删除后续 ${deleteCount} 个元素`);
                    popStack.splice(i + 1, deleteCount);
                }
            }
            i++;
        }
        // popStack.forEach(node => {
        //     allBody.body.push(type.expressionStatement(node));
        // });
    }
    vm(new Scope(), 0);
})([152,104,101,0,101,1,54,102,104,101,2,101,3,54,102,102,152,104,101,0,101,1,54,102,104,101,2,101,3,54,102,102,152,104,101,0,101,1,54,102,104,101,2,101,3,54,102,102,152,104,101,0,101,1,54,102,104,101,2,101,3,54,102,102,152,104,101,0,101,1,54,102,104,101,2,101,3,54,102,102,152,104,101,0,101,1,54,102,104,101,2,101,3,54,102,102,152,104,101,0,101,1,54,102,104,101,2,101,3,54,102,102,152,104,101,0,101,1,54,102,104,101,2,101,3,54,102,102,101,2,101,4,1,101,5,1,101,6,1,102,101,2,101,4,1,101,5,1,101,6,1,102,101,2,101,4,1,101,5,1,101,6,1,102,101,2,101,4,1,101,5,1,101,6,1,102], [0,123,1,456,2,3,5]);
console.log('还原后的代码为：\n' + generator(allBody, {compact:false,   jsescOption: {minimal: true,unicode: false}, format:{indent:{style:'  '}}}).code);