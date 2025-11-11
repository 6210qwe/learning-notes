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
            if (inst === undefined) {break; }
            // console.log(`指令为${inst}, 栈状态:`, stack.map(n => generator(n).code));
            console.log(`指令为${inst}, 栈状态:`, stack);
            // console.log(`指令${inst}执行前，栈长度：${stack.length}`); // 新增这行
            switch (inst) {
                case 10: { // LSR
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(type.binaryExpression('<<', left, right));
                    break;
                }
                case 35: { // VOID
                    let top = stack.pop();
                    stack.push(void top);
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
                case 53: { // GET
                    let key = stack.pop();
                    let obj = stack.pop();
                    member_ast = type.memberExpression(
                        type.identifier(obj.value),
                        type.identifier(key.value)
                      )
                    stack.push(member_ast);
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
                    popStack.push(popped);
                    break;
                }
                case 106: { // COPY2
                    let top = stack[stack.length - 2];
                    stack.push(top);
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
                case 161: { // FUNC：生成函数的 AST 节点（FunctionExpression）
                  let funcPCNode = stack.pop();
                  console.log(funcPCNode)
                  let func = function (...args) {
                        let s = new Scope(scope);
                        s.store("this", this);
                        s.store("arguments", arguments);
                        return vm(s, funcPC, [args]);
                    }
                    stack.push(func);
                    break;
                 }
                  // const funcNode = type.functionExpression(undefined, [],type.blockStatement([]))
                  // stack.push(funcNode);
                  // break;
                case 162: { // RET
                    stack.pop();
                    break;
                }
                case 165: { // DEF
                    let key = stack.pop();
                    scope.def(key);
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
([101,0,121,10,161,51,102,121,35,122,101,1,165,101,2,165,101,1,106,101,3,53,51,102,101,2,106,101,4,53,51,102,102,151,162], ["ld2_main","ld3_a","ld3_b",0,1]);
console.log('还原后的代码为：\n' + generator(allBody, {compact:false,   jsescOption: {minimal: true,unicode: false}, format:{indent:{style:'  '}}}).code);