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
            // console.log(`指令为${inst}, 栈状态:`, stack.map(n => generator(n).code));
            // console.log(`指令${inst}执行前，栈长度：${stack.length}`); // 新增这行
            switch (inst) {
                case 10: { // LSR
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(type.binaryExpression('<<', left, right));
                    break;
                }
                case 13: { // IN
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(type.binaryExpression('in', left, right));
                    break;
                }
                case 51: { // STORE
                    let value = stack.pop();
                    let name = stack.pop();
                    scope.store(name, value);
                    const varIdentifier = type.identifier(name.value);
                    const assignmentAst = type.assignmentExpression(
                      '=',
                      varIdentifier,
                      value
                    );
                    stack.push(assignmentAst);
                    break;
                }
                case 52: { // LOAD
                    let name = stack.pop();
                    stack.push(name);
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
                case 103: { // CALL
                    let arr = stack.pop();
                    let func = stack.pop();
                    let self = stack.pop();
                    call_ast = type.callExpression(type.identifier(func.value), arr.elements)
                    stack.push(call_ast);
                    break;
                }
                case 121: { // ADDR
                    let addr = instList[pc++];
                    stack.push(addr);
                    break;
                }
                case 122: { // JUMP
                    let addr = stack.pop();
                    pc = addr;
                    break;
                }
                case 151: { // UNDEF
                    stack.push(type.identifier("undefined"));
                    break;
                }
                case 152: { // ARR
                    stack.push(type.arrayExpression([]));
                    break;
                }
                case 161: { // FUNC：生成函数的 AST 节点（FunctionExpression）
                  let funcPCNode = stack.pop();
                  const funcNode = type.functionExpression(undefined, [],type.blockStatement([]))
                  stack.push(funcNode);
                  break;
                }
                case 162: { // RET
                    stack.pop();
                    break;
                }
                default:
                    console.log(`${inst} 未实现`);
                    throw { };
            }
        }
        console.log(popStack)
        let i = 0;
        // 用 for 循环而非 forEach，便于控制索引和删除元素
        length = popStack.length
        while (i < length) {
            const node = popStack[i];
            if (type.isNode(node)) {
                if (type.isArrayExpression(node)) {
                    const deleteCount = node.elements.length; // 要删除的后续元素个数（等于数组长度）
                    i += 1
                    continue
                }
                if (type.isObjectExpression(node)){
                    const deleteCount = node.properties.length; // 要删除的后续元素个数（等于数组长度）
                    i += 1
                    continue
                }
                allBody.body.push(type.expressionStatement(node));
            }
            i++;
        }
        // popStack.forEach(node => {
        //     allBody.body.push(type.expressionStatement(node));
        // });
    }
    vm(new Scope(), 0);
})
([101,0,121,10,161,51,102,121,13,122,102,151,162,151,101,0,52,152,103,102], ["ld2_main"]);
console.log('还原后的代码为：\n' + generator(allBody, {compact:false,   jsescOption: {minimal: true,unicode: false}, format:{indent:{style:'  '}}}).code);