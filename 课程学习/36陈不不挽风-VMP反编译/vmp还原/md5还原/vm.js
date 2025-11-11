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

    Scope.prototype.load = function (name) { // 获取变量的值
        return this.data[name];
    }

    Scope.prototype.store = function (name, value) { // 赋值
        let data = this.data;
        while (!data.hasOwnProperty(name) && data !== globalThis) {
            data = data.__proto__;
        }
        data[name] = value;
    }

    function vm(scope, pc, stack) {
        stack = stack || [];
        let left, right, top;
        while (1) {
            let inst = instList[pc++];
            if (inst === undefined) { break; }
            switch (inst) {
                // 1-8：算术运算符（ADD~UMINUS）
                case 1: { // ADD：加法 (+)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a + b);
                    break;
                }
                case 2: { // SUB：减法 (-)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a - b);
                    break;
                }
                case 3: { // MUL：乘法 (*)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a * b);
                    break;
                }
                case 4: { // DIV：除法 (/)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a / b);
                    break;
                }
                case 5: { // MOD：取模 (%)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a % b);
                    break;
                }
                case 6: { // POW：幂运算 (**)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a ** b);
                    break;
                }
                case 7: { // UPLUS：一元正号 (+x)
                    const val = stack.pop();
                    stack.push(+val);
                    break;
                }
                case 8: { // UMINUS：一元负号 (-x)
                    const val = stack.pop();
                    stack.push(-val);
                    break;
                }

                // 9-16：比较运算符（EQ~SNEQ）
                case 9: { // EQ：松散等于 (==)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a == b);
                    break;
                }
                case 10: { // NEQ：松散不等于 (!=)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a != b);
                    break;
                }
                case 11: { // LT：小于 (<)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a < b);
                    break;
                }
                case 12: { // GT：大于 (>)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a > b);
                    break;
                }
                case 13: { // LTE：小于等于 (<=)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a <= b);
                    break;
                }
                case 14: { // GTE：大于等于 (>=)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a >= b);
                    break;
                }
                case 15: { // SEQ：严格等于 (===)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a === b);
                    break;
                }
                case 16: { // SNEQ：严格不等于 (!==)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a !== b);
                    break;
                }

                // 17-19：逻辑运算符（AND~NOT）
                case 17: { // AND：逻辑与 (&&)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a && b);
                    break;
                }
                case 18: { // OR：逻辑或 (||)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a || b);
                    break;
                }
                case 19: { // NOT：逻辑非 (!)
                    const val = stack.pop();
                    stack.push(!val);
                    break;
                }

                // 20-26：位运算符（BAND~ROR）
                case 20: { // BAND：按位与 (&)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a & b);
                    break;
                }
                case 21: { // BOR：按位或 (|)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a | b);
                    break;
                }
                case 22: { // XOR：按位异或 (^)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a ^ b);
                    break;
                }
                case 23: { // BIT_NOT：按位非 (~)
                    const val = stack.pop();
                    stack.push(~val);
                    break;
                }
                case 24: { // LSR：左移 (<<)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a << b);
                    break;
                }
                case 25: { // ASR：算术右移 (>>)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a >> b);
                    break;
                }
                case 26: { // ROR：无符号右移 (>>>)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a >>> b);
                    break;
                }

                // 27-29：关系与特殊运算符（IN~COMMA）
                case 27: { // IN：in运算符（未实现）
                    console.log("IN(27)未实现");
                    throw {};
                }
                case 28: { // INSTA：instanceof运算符（未实现）
                    console.log("INSTA(28)未实现");
                    throw {};
                }
                case 29: { // COMMA：逗号运算符（未实现）
                    console.log("COMMA(29)未实现");
                    throw {};
                }

                // 30-31：类型与删除运算符（TYPEOF~DELETE）
                case 30: { // TYPEOF：typeof运算符
                    let top = stack.pop();
                    stack.push(typeof top);
                    break;
                }
                case 31: { // DELETE：delete运算符（冗余，未实现）
                    console.log("DELETE(31)未实现");
                    throw {};
                }

                // 32-37：自增自减与一元运算符（INC~VOID）
                case 32: { // INC：自增 (++)
                    const val = stack.pop();
                    stack.push(val + 1);
                    break;
                }
                case 33: { // DEC：自减 (--)
                    const val = stack.pop();
                    stack.push(val - 1);
                    break;
                }
                case 34: { // ADD2：一元正号（冗余）
                    let top = stack.pop();
                    stack.push(+top);
                    break;
                }
                case 35: { // SUB2：一元负号（冗余）
                    let top = stack.pop();
                    stack.push(-top);
                    break;
                }
                case 36: { // BNOT：按位非 (~)
                    let top = stack.pop();
                    stack.push(~top);
                    break;
                }
                case 37: { // VOID：void运算符
                    let top = stack.pop();
                    stack.push(void top);
                    break;
                }

                // 39：属性操作（DEL）
                case 39: { // DEL：删除属性
                    let key = stack.pop();
                    let obj = stack.pop();
                    stack.push(delete obj[key]);
                    break;
                }

                // 51-54：变量与属性操作（STORE~SET）
                case 51: { // STORE：变量赋值
                    let value = stack.pop();
                    let name = stack.pop();
                    scope.store(name, value);
                    stack.push(value);
                    break;
                }
                case 52: { // LOAD：变量加载
                    let name = stack.pop();
                    let value = scope.load(name);
                    stack.push(value);
                    break;
                }
                case 53: { // GET：读取属性
                    let key = stack.pop();
                    let obj = stack.pop();
                    let value = obj[key];
                    stack.push(value);
                    break;
                }
                case 54: { // SET：设置属性
                    let value = stack.pop();
                    let key = stack.pop();
                    let obj = stack.pop();
                    stack.push(obj[key] = value);
                    break;
                }

                // 101-104：栈操作（PUSH~COPY）
                case 101: { // PUSH：值入栈
                    let pos = instList[pc++];
                    stack.push(poolList[pos]);
                    break;
                }
                case 102: { // POP：栈顶出栈
                    stack.pop();
                    break;
                }
                case 103: { // CALL：函数调用
                    let arr = stack.pop();
                    let func = stack.pop();
                    let self = stack.pop();
                    stack.push(func.apply(self, arr));
                    break;
                }
                case 104: { // COPY：复制栈顶元素
                    let top = stack[stack.length - 1];
                    stack.push(top);
                    break;
                }

                // 151-159：常量值与复制扩展（UNDEF~COPY3）
                case 151: { // UNDEF：undefined
                    stack.push(undefined);
                    break;
                }
                case 152: { // ARR：数组创建
                    stack.push([]);
                    break;
                }
                case 153: { // TRUE：true
                    stack.push(true);
                    break;
                }
                case 154: { // FALSE：false
                    stack.push(false);
                    break;
                }
                case 155: { // NULL：null
                    stack.push(null);
                    break;
                }
                case 156: { // OBJ：对象创建
                    stack.push({});
                    break;
                }
                case 157: { // DBCOPY：复制栈顶两个元素
                    stack.push(stack[stack.length - 2]);
                    stack.push(stack[stack.length - 2]);
                    break;
                }
                case 158: { // COPY2：复制栈顶第二个元素
                    let top = stack[stack.length - 2];
                    stack.push(top);
                    break;
                }
                case 159: { // COPY3：复制栈顶元素插入到栈顶3位前
                    let top = stack[stack.length - 1];
                    stack.splice(stack.length - 3, 0, top);
                    break;
                }

                // 160-167：正则、调试、跳转（REGEXP~JUMPT）
                case 160: { // REGEXP：正则表达式创建
                    let flags = stack.pop();
                    let pattern = stack.pop();
                    stack.push(new RegExp(pattern, flags));
                    break;
                }
                case 161: { // NEW：新建对象（调用构造函数）
                    let args = stack.pop();
                    let func = stack.pop();
                    stack.push(new func(...args));
                    break;
                }
                case 162: { // DEBUG：断点调试
                    debugger;
                    break;
                }
                case 163: { // THROW：抛出异常
                    throw stack.pop();
                    break;
                }
                case 164: { // JUMPF：条件为假跳转
                    let addr = stack.pop();
                    let test = stack.pop();
                    if (!test) {
                        pc = addr;
                    }
                    break;
                }
                case 165: { // ADDR：地址指令（下一个指令作为地址入栈）
                    let addr = instList[pc++];
                    stack.push(addr);
                    break;
                }
                case 166: { // JUMP：无条件跳转
                    let addr = stack.pop();
                    pc = addr;
                    break;
                }
                case 167: { // JUMPT：条件为真跳转
                    let addr = stack.pop();
                    let test = stack.pop();
                    if (test) {
                        pc = addr;
                    }
                    break;
                }

                // 168-171：函数与异常（FUNC~TRY）
                case 168: { // FUNC：函数指令
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
                case 169: { // RET：函数返回
                    return stack.pop();
                    break;
                }
                case 170: { // THIS：获取this
                    stack.push(scope.load("this"));
                    break;
                }
                case 171: { // TRY：try-catch结构
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

                // 未知指令
                default:
                    console.log(`${inst} 未实现`);
                    throw {};
            }
        }
    }

    vm(new Scope(), 0);
})