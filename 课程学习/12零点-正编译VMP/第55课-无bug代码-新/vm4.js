const type = require('@babel/types');
const generator = require("@babel/generator").default;

let allBody = type.program([]); // 根AST节点
const astStack = []; // AST栈（存指令生成的AST节点）

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

    function vm(pc) {
        const stack = []; // 值栈
        while (instList[pc] !== undefined) {
            const inst = instList[pc++];
            // 只处理你现有指令，其他指令无需保留
            switch (inst) {
                // 1. PUSH：常量→AST字面量（已有，无需改）
                case 101: {
                    const val = poolList[instList[pc++]];
                    stack.push(val);
                    astStack.push(t.valueToNode(val)); // 自动生成对应AST（字符串/数字）
                    break;
                }

                // 2. POP：同步弹出值和AST（已有，无需改）
                case 102: {
                    stack.pop();
                    astStack.pop();
                    break;
                }

                // 3. COPY：复制栈顶，同步AST（已修复）
                case 104: {
                    const topVal = stack.at(-1); // 取栈顶值
                    const topAst = astStack.at(-1); // 取栈顶AST
                    stack.push(topVal);
                    astStack.push(topAst); // 同步复制AST
                    break;
                }

                // 4. LOAD：加载变量→Identifier（已修复，简化）
                // 4. LOAD：修复t→type，用传入的scope（原有错用globalScope）
                case 52: {
                    const name = stack.pop();
                    astStack.pop(); // 弹出变量名字面量AST
                    const val = scope.load(name); // 改globalScope→scope（用vm函数的scope参数）
                    stack.push(val);
                    astStack.push(type.identifier(name)); // 改t→type
                    break;
                }

                // 5. GET：属性访问→MemberExpression（核心缺失，新增）
                case 53: {
                    const key = stack.pop(); // 弹出属性名（如"log"）
                    const keyAst = astStack.pop(); // 弹出属性名AST（StringLiteral("log")）
                    const obj = stack.pop(); // 弹出对象（如console）
                    const objAst = astStack.pop(); // 弹出对象AST（Identifier(console)）
                    stack.push(obj[key]); // 结果：console.log
                    // 生成属性访问AST（console.log）
                    astStack.push(t.memberExpression(
                        objAst,
                        typeof key === 'string' ? t.identifier(key) : keyAst,
                        typeof key !== 'string' // 非字符串为数组访问（如arr[0]）
                    ));
                    break;
                }

                // 6. ARR：数组→ArrayExpression（核心缺失，新增）
                case 152: {
                    const arr = [];
                    stack.push(arr);
                    astStack.push(t.arrayExpression([])); // 生成空数组AST
                    break;
                }

                // 7. SET：属性赋值→AssignmentExpression（核心缺失，新增）
                case 54: {
                    const val = stack.pop(); // 弹出值（如123）
                    const valAst = astStack.pop(); // 弹出值AST（NumericLiteral(123)）
                    const key = stack.pop(); // 弹出键（如0）
                    const keyAst = astStack.pop(); // 弹出键AST（NumericLiteral(0)）
                    const obj = stack.pop(); // 弹出对象（如数组）
                    const objAst = astStack.pop(); // 弹出对象AST（ArrayExpression）
                    obj[key] = val; // 数组[0] = 123
                    stack.push(val); // 栈顶保留值
                    // 生成赋值AST（arr[0] = 123）
                    const memberAst = t.memberExpression(objAst, keyAst, true); // true=数组访问
                    astStack.push(t.assignmentExpression('=', memberAst, valAst));
                    break;
                }

                // 8. CALL：函数调用→CallExpression（核心缺失，新增）
                case 103: {
                    const args = stack.pop(); // 弹出参数数组（如[123]）
                    const argsAst = astStack.pop(); // 弹出参数数组AST（含赋值的数组）
                    const func = stack.pop(); // 弹出函数（如console.log）
                    const funcAst = astStack.pop(); // 弹出函数AST（MemberExpression）
                    const self = stack.pop(); // 弹出this（如console）
                    astStack.pop(); // 同步弹出self的AST（console的Identifier）
                    // 执行函数（不影响AST生成，仅保留原逻辑）
                    stack.push(func.apply(self, args));
                    // 提取参数值（从赋值AST中取右值，如arr[0]=123→123）
                    const callArgs = args.map((_, i) => {
                        const argAst = argsAst.elements[i];
                        return argAst.type === 'AssignmentExpression' ? argAst.right : argAst;
                    });
                    // 生成调用AST（console.log(123)）
                    astStack.push(t.callExpression(funcAst, callArgs));
                    break;
                }

                case 106: { // COPY2
                    let top = stack[stack.length - 2];
                    stack.push(top);
                    break;
                }
                case 107: { // COPY3
                    debugger;
                    let top = stack[stack.length - 1];
                    stack.splice(stack.length - 3, 0, top);
                    debugger;
                    break;
                }
                case 105: { // DBCOPY
                    stack.push(stack[stack.length - 2]);
                    stack.push(stack[stack.length - 2]);
                    break;
                }
                case 37: { // DEL
                    let key = stack.pop();
                    let obj = stack.pop();
                    stack.push(delete obj[key]);
                    break;
                }
                case 51: { // STORE
                    let value = stack.pop();
                    let name = stack.pop();
                    scope.store(name, value);
                    stack.push(value);
                    break;
                }
                case 163: { // THIS
                    stack.push(scope.load("this"));
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
                case 164: { // TRY
                    let tryEnd = stack.pop();
                    let catchStart = stack.pop();
                    try {
                        vm(scope, pc);
                    } catch (e) {
                        vm(scope, catchStart, [e]);
                    }
                    pc = tryEnd;
                    break;
                }
                case 158: { // NEW
                    let args = stack.pop();
                    let func = stack.pop();
                    stack.push(new func(...args));
                    break;
                }
                case 157: { // REGEXP
                    let flags = stack.pop();
                    let pattern = stack.pop();
                    stack.push(new RegExp(pattern, flags));
                    break;
                }
                case 151: { // UNDEF
                    stack.push(undefined);
                    break;
                }
                case 155: { // NULL
                    stack.push(null);
                    break;
                }
                case 153: { // TRUE
                    stack.push(true);
                    break;
                }
                case 154: { // FALSE
                    stack.push(false);
                    break;
                }
                case 156: { // OBJ
                    stack.push({});
                    break;
                }
                case 159: { // DEBUG
                    debugger;
                    break;
                }
                case 160: { // THROW
                    throw stack.pop();
                    break;
                }
                case 31: { // ADD2
                    let top = stack.pop();
                    stack.push(+top);
                    break;
                }
                case 32: { // SUB2
                    let top = stack.pop();
                    stack.push(-top);
                    break;
                }
                case 33: { // NOT
                    let top = stack.pop();
                    stack.push(!top);
                    break;
                }
                case 34: { // BNOT
                    let top = stack.pop();
                    stack.push(~top);
                    break;
                }
                case 35: { // VOID
                    let top = stack.pop();
                    stack.push(void top);
                    break;
                }
                case 36: { // TYPEOF
                    let top = stack.pop();
                    stack.push(typeof top);
                    break;
                }
                case 1: { // ADD
                  const rAst = astStack.pop(), lAst = astStack.pop();
                  astStack.push(type.binaryExpression('+', lAst, rAst));
                  stack.push(stack.pop() + stack.pop());
                  break;
                }
                case 2: { // SUB
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left - right);
                    break;
                }
                case 3: { // MUL
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left * right);
                    break;
                }
                case 4: { // DIV
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left / right);
                    break;
                }
                case 5: { // MOD
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left % right);
                    break;
                }
                case 6: { // POW
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left ** right);
                    break;
                }
                case 7: { // BAND
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left & right);
                    break;
                }
                case 8: { // BOR
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left | right);
                    break;
                }
                case 9: { // XOR
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left ^ right);
                    break;
                }
                case 10: { // LSR
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left << right);
                    break;
                }
                case 11: { // ASR
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left >> right);
                    break;
                }
                case 12: { // ROR
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left >>> right);
                    break;
                }
                case 13: { // IN
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left in right);
                    break;
                }
                case 14: { // INSTA
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left instanceof right);
                    break;
                }
                case 15: { // GT
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left > right);
                    break;
                }
                case 16: { // LT
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left < right);
                    break;
                }
                case 17: { // GTE
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left >= right);
                    break;
                }
                case 18: { // LTE
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left <= right);
                    break;
                }
                case 19: { // EQ
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left == right);
                    break;
                }
                case 20: { // NEQ
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left != right);
                    break;
                }
                case 21: { // SEQ
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left === right);
                    break;
                }
                case 22: { // SNEQ
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left !== right);
                    break;
                }
                case 23: { // AND
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left && right);
                    break;
                }
                case 121: { // ADDR
                    let addr = instList[pc++];
                    stack.push(addr);
                    break;
                }
                case 123: { // JUMPT
                    let addr = stack.pop();
                    let test = stack.pop();
                    if (test) {
                        pc = addr;
                    }
                    break;
                }
                case 124: { // JUMPF
                    let addr = stack.pop();
                    let test = stack.pop();
                    if (!test) {
                        pc = addr;
                    }
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
                    throw {};
            }
        }
        console.log(astStack)
        // 最终AST→语句，推入根节点
        astStack.length && allBody.body.push(type.expressionStatement(astStack.pop()));
    }
    vm(new Scope(), 0);
})