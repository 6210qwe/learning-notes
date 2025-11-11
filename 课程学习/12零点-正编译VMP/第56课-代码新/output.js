const type = require('@babel/types');
const generator = require("@babel/generator").default;
let allBody = type.program([]); // 根AST节点
const astStack = []; // AST栈（存指令生成的AST节点）
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
            if (inst === undefined) {console.log(stack); break; }
            const skipInstList = [101, 1, 52];
            if (!skipInstList.includes(inst)) {
              console.log(`当前指令（不在跳过列表中）：${inst}`);
            }
            switch (inst) {
                case 1: { // ADD
                  const rAst = astStack.pop(), lAst = astStack.pop();
                  astStack.push(type.binaryExpression('+', lAst, rAst));
                  stack.push(stack.pop() + stack.pop());
                  break;
                }
                case 10: { // LSR
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left << right);
                    break;
                }
                case 101: { // PUSH
                    const val = poolList[instList[pc++]];
                    astStack.push(type.valueToNode(val));
                    stack.push(val);
                    break;
                }
                case 102: { // POP
                    stack.pop();
                    // astStack.pop();
                    break;
                }
                case 52: { // LOAD
                    const name = stack.pop();
                    const val = scope.load(name);
                    stack.push(val);
                    // 创建标识符节点
                    astStack.push(type.identifier(name));
                    break;
                }
                case 53: { // GET
                    let key = stack.pop();
                    let obj = stack.pop();
                    let value = obj[key];
                    stack.push(value);
const keyAst = astStack.pop();
                    const objAst = astStack.pop();
// 关键修复：判断key类型，静态属性用.访问
                    const isComputed = typeof key !== 'string' || !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
                    astStack.push(type.memberExpression(
                        objAst,
                        isComputed ? keyAst : type.identifier(key), // 字符串key转换为标识符
                        isComputed // 只有动态属性才用[]
                    ));
                    break;
                }
                case 54: { // SET
                    let value = stack.pop();
                    let key = stack.pop();
                    let obj = stack.pop();
                    stack.push(obj[key] = value);
// AST操作：创建赋值表达式
                    const valueAst = astStack.pop();
                    const keyAst = astStack.pop();
                    const objAst = astStack.pop();
                    const assignment = type.assignmentExpression(
                        '=',
                        type.memberExpression(objAst, keyAst, true),
                        valueAst
                    );
                    astStack.push(assignment);
                    break;
                }
                 case 103: { // CALL
                    let arr = stack.pop();
                    let func = stack.pop();
                    let self = stack.pop();
                    stack.push(func.apply(self, arr));
// 关键修复：从赋值表达式中提取实际参数值
                    const assignAst = astStack.pop(); // 得到 "console["log"][0] = 123"
                    const actualArg = assignAst.right; // 提取右值 123
                    const funcAst = astStack.pop(); // 得到 "console.log"
                    const callExpr = type.callExpression(funcAst, [actualArg]); // 参数改为123
                    astStack.push(callExpr);
                    break;
                }
                case 152: { // ARR
                    stack.push([]);
                    // astStack.push(type.arrayExpression([])); // 创建空数组表达式
                    break;
                }
                case 104: { // COPY
                    let top = stack[stack.length - 1];
                    stack.push(top);
// 复制AST栈顶元素
                    let astTop = astStack[astStack.length - 1];
                    astStack.push(astTop);
                    break;
                }
                case 106: { // COPY2
                    let top = stack[stack.length - 2];
                    stack.push(top);
                    break;
                }
                case 54: { // SET
                    let value = stack.pop();
                    let key = stack.pop();
                    let obj = stack.pop();
                    stack.push(obj[key] = value);
                    break;
                }
                case 51: { // STORE
                    let value = stack.pop();
                    let name = stack.pop();
                    scope.store(name, value);
                    stack.push(value);
                    break;
                }
                case 162: { // RET
                    return stack.pop();
                    break;
                }
                case 161: { // FUNC
                    let funcPC = stack.pop();
                    let func = function (...args) {
                        let s = new Scope(scope);
                        s.store("this", this);
                        s.store("arguments", arguments);
                        return vm(s, funcPC, [args]);
                    }
                    stack.push(func);
                    break;
                }
                case 103: { // CALL
                    let arr = stack.pop();
                    let func = stack.pop();
                    let self = stack.pop();
                    stack.push(func.apply(self, arr));
                    break;
                }
                case 151: { // UNDEF
                    stack.push(undefined);
                    break;
                }
                case 152: { // ARR
                    stack.push([]);
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
        console.log(astStack)
        // 最终AST→语句，推入根节点
        astStack.length && allBody.body.push(type.expressionStatement(astStack.pop()));
    }
    vm(new Scope(), 0, []);
})([101,0,121,10,161,51,102,121,43,122,101,1,165,101,2,165,101,1,106,101,3,53,51,102,101,2,106,101,4,53,51,102,102,101,1,52,101,2,52,1,162,151,162,151,101,0,52,152,104,101,3,101,4,54,102,104,101,4,101,5,54,102,103,102], ["ld2_main","ld3_a","ld3_b",0,1,2]);
console.log('还原后的代码为：\n' + generator(allBody, {compact:false,   jsescOption: {minimal: true,unicode: false}, format:{indent:{style:'  '}}}).code);