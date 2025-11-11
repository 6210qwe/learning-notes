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
            console.log(`指令为${inst}, 栈状态:`, popStack.map(n => generator(n).code));
            switch (inst) {
                case 1: { // ADD
                    let right = stack.pop();
                    let left = stack.pop();
                    const result = type.binaryExpression('+', left, right);
                    stack.push(result);
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
                    const valueAst = astStack.pop();
                    const nameAst = astStack.pop();
                    const assignAst = type.assignmentExpression('=',type.identifier(name), valueAst);
                    astStack.push(assignAst);
                    break;
                }
                case 52: { // LOAD
                    let name = stack.pop();
                    let value = scope.load(name);
                    stack.push(value);
                    break;
                }
                case 53: { // GET
                    let key = stack.pop();
                    let obj = stack.pop();
                    let value = obj[key];
                    stack.push(value);
                    break;
                }
                case 54: {
                    let value = stack.pop();
                    let key = stack.pop();
                    let obj = stack.pop();
                    stack.push(obj[key] = value);
                    const valueAst = astStack.pop();
                    const keyAst = astStack.pop();
                    const objAst = astStack.pop();
                    if (Array.isArray(obj)) {
                        const arrayElementsAst = obj.map(item => type.valueToNode(item));
                        const arrAst = type.arrayExpression(arrayElementsAst);
                        astStack.push(arrAst);
                    }else if (typeof obj === 'object' && obj !== null) {
                        // 普通对象分支：生成对象字面量
                        const objectProperty = type.objectProperty(keyAst, valueAst);
                        const objectAst = type.objectExpression([objectProperty]);
                        astStack.push(objectAst);
                    }
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
                    const popped = stack.pop();
                    popStack.push(popped); // 保存被弹出的AST节点
                    break;
                }
                case 103: { // CALL
                    let arr = stack.pop();
                    let func = stack.pop();
                    let self = stack.pop();
                    stack.push(func.apply(self, arr));
                    break;
                }
                case 104: { // COPY
                    let top = stack[stack.length - 1];
                    stack.push(top);
                    let astTop = astStack[astStack.length - 1];
                    astStack.push(astTop);
                    break;
                }
                case 105: { // DBCOPY
                    stack.push(stack[stack.length - 2]);
                    stack.push(stack[stack.length - 2]);
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
                case 151: { // UNDEF
                    stack.push(undefined);
                    break;
                }
                case 152: { // ARR
                    stack.push([]);
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
                case 155: { // NULL
                    stack.push(null);
                    break;
                }
                case 156: { // OBJ
                    stack.push({});
                    // astStack.push(type.objectExpression([]));
                    break;
                }
                case 157: { // REGEXP
                    let flags = stack.pop();
                    let pattern = stack.pop();
                    stack.push(new RegExp(pattern, flags));
                    break;
                }
                case 158: { // NEW
                    let args = stack.pop();
                    let func = stack.pop();
                    stack.push(new func(...args));
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
                case 162: { // RET
                    return stack.pop();
                    break;
                }
                case 163: { // THIS
                    stack.push(scope.load("this"));
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
        popStack.forEach(node => {
            allBody.body.push(type.expressionStatement(node));
        });
    }
    vm(new Scope(), 0);
})