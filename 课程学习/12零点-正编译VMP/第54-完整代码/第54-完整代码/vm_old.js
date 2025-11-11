
(function vmFunc(instList, poolList){
    const INST = {};
    {
    // 算术运算符（扩展）
    INST[INST["ADD"] = 1] = "ADD";         // 加法
    INST[INST["SUB"] = 2] = "SUB";         // 减法
    INST[INST["MUL"] = 3] = "MUL";         // 乘法
    INST[INST["DIV"] = 4] = "DIV";         // 除法
    INST[INST["MOD"] = 5] = "MOD";         // 取模
    INST[INST["POW"] = 6] = "POW";         // 幂运算 (**)
    INST[INST["UPLUS"] = 7] = "UPLUS";     // 一元正号 (+x)
    INST[INST["UMINUS"] = 8] = "UMINUS";   // 一元负号 (-x)

    // 比较运算符（扩展）
    INST[INST["EQ"] = 9] = "EQ";           // 松散等于 (==)
    INST[INST["NEQ"] = 10] = "NEQ";        // 松散不等于 (!=)
    INST[INST["LT"] = 11] = "LT";          // 小于
    INST[INST["GT"] = 12] = "GT";          // 大于
    INST[INST["LTE"] = 13] = "LTE";        // 小于等于
    INST[INST["GTE"] = 14] = "GTE";        // 大于等于
    INST[INST["SEQ"] = 15] = "SEQ";        // 严格等于 (===)
    INST[INST["SNEQ"] = 16] = "SNEQ";      // 严格不等于 (!==)

    // 逻辑运算符
    INST[INST["AND"] = 17] = "AND";        // 逻辑与 (&&)
    INST[INST["OR"] = 18] = "OR";          // 逻辑或 (||)
    INST[INST["NOT"] = 19] = "NOT";        // 逻辑非 (!)

    // 位运算符（重命名以匹配映射表）
    INST[INST["BAND"] = 20] = "BAND";      // 按位与 (&)
    INST[INST["BOR"] = 21] = "BOR";        // 按位或 (|)
    INST[INST["XOR"] = 22] = "XOR";        // 按位异或 (^)
    INST[INST["BIT_NOT"] = 23] = "BIT_NOT";// 按位非 (~)
    INST[INST["LSR"] = 24] = "LSR";        // 左移 (<<)
    INST[INST["ASR"] = 25] = "ASR";        // 算术右移 (>>)
    INST[INST["ROR"] = 26] = "ROR";        // 无符号右移 (>>>)

    // 关系运算符
    INST[INST["IN"] = 27] = "IN";          // in 运算符
    INST[INST["INSTA"] = 28] = "INSTA";    // instanceof 运算符

    // 特殊运算符
    INST[INST["COMMA"] = 29] = "COMMA";    // 逗号运算符 (,)
    INST[INST["TYPEOF"] = 30] = "TYPEOF";  // typeof 运算符
    INST[INST["DELETE"] = 31] = "DELETE";  // delete 运算符

    // 自增自减运算符
    INST[INST["INC"] = 32] = "INC";        // 自增 (++)
    INST[INST["DEC"] = 33] = "DEC";        // 自减 (--)
    INST[INST["ADD2"] = 34] = "ADD2"; // +
    INST[INST["SUB2"] = 35] = "SUB2"; // -
    INST[INST["BNOT"] = 36] = "BNOT";    // !
    INST[INST["VOID"] = 37] = "VOID"; // void
    // INST[INST["TYPEOF"] = 38] = "TYPEOF"; // typeof
    INST[INST["DEL"] = 39] = "DEL"; // delete

    // 变量操作（保持不变）
    INST[INST["STORE"] = 51] = "STORE";    // 变量赋值
    INST[INST["LOAD"] = 52] = "LOAD";      // 变量加载
    INST[INST["GET"] = 53] = "GET";        // 读取属性
    INST[INST["SET"] = 54] = "SET";        // 设置属性


    // 栈操作（保持不变）
    INST[INST["PUSH"] = 101] = "PUSH";     // 值入栈
    INST[INST["POP"] = 102] = "POP";       // 栈顶出栈
    INST[INST["CALL"] = 103] = "CALL";     // 函数调用
    INST[INST["COPY"] = 104] = "COPY";     // 复制栈顶元素

    // 常量值（保持不变）
    INST[INST["UNDEF"] = 151] = "UNDEF";   // undefined
    INST[INST["ARR"] = 152] = "ARR";       // 数组创建
    INST[INST["TRUE"] = 153] = "TRUE";     // true
    INST[INST["FALSE"] = 154] = "FALSE";   // false
    INST[INST["NULL"] = 155] = "NULL";   // null
    INST[INST["OBJ"] = 156] = "OBJ";   // null
    INST[INST["OBJ"] = 156] = "OBJ";   // null
    INST[INST["DBCOPY"] = 157] = "DBCOPY";   // 复制栈顶两个元素
    INST[INST["COPY2"] = 158] = "COPY2";   // 复制栈顶第二个元素
    INST[INST["COPY3"] = 159] = "COPY3";   //
    INST[INST["REGEXP"] = 160] = "REGEXP";   //正则表达式
    INST[INST["NEW"] = 161] = "NEW";   //
    INST[INST["DEBUG"] = 162] = "DEBUG";   //
    INST[INST["THROW"] = 163] = "THROW";   //
    INST[INST["JUMPF"] = 164] = "JUMPF";   // 条件为假跳转
    INST[INST["ADDR"] = 165] = "ADDR";   // 地址指令，将下一个指令作为地址入栈
    INST[INST["JUMP"] = 166] = "JUMP";   // 无条件跳转
    INST[INST["JUMPT"] = 167] = "JUMPT";   // 条件为真跳转
    INST[INST["FUNC"] = 168] = "FUNC";   //函数指令
    INST[INST["RET"] = 169] = "RET";   //函数指令
    INST[INST["THIS"] = 170] = "THIS";   //this指令
    INST[INST["TRY"] = 171] = "TRY";   //this指令
}
    function Scope(parentScope){
        this.data = {};
        if(parentScope){
            this.data.__proto__ = parentScope.data;
        }else{
            globalThis["this"] = globalThis;
            this.data.__proto__ = globalThis;
        }
    }
    Scope.prototype.load = function (name){  //获取变量的值
        return this.data[name];
    }
    Scope.prototype.store = function (name, value){  //赋值
        let data = this.data;
        while(!data.hasOwnProperty(name) && data !== globalThis){
            data = data.__proto__;
        }
        data[name] = value;
    }
    function vm(scope,pc, stack){
        stack = stack || [];
        let left, right, top;
        while(1){
            let inst = instList[pc++]
            if(inst === undefined){break}
            switch(inst){
                case INST.PUSH:{
                    let pos = instList[pc++];
                    stack.push(poolList[pos]);
                    break;
                }
                case INST.ADDR:{
                    let addr = instList[pc++];
                    stack.push(addr);
                    break;
                }
                case INST.JUMPF:{
                    let addr = stack.pop();
                    let test = stack.pop();
                    if(!test){
                        pc = addr;
                    }
                    break;
                }
                case INST.FUNC:{
                    let funcPC = stack.pop();
                    let func = function (...args){
                        let s = new Scope(scope);
                        s.store("this", this);
                        s.store("arguments", arguments);
                        return vm(s, funcPC, [args]);
                    }
                    stack.push(func);
                    break;
                }
                case INST.TRY:{
                    let tryEnd = stack.pop();
                    let catchStart = stack.pop();
                    try{
                        vm(scope, pc);
                    }catch(e){
                        vm(scope, catchStart, [e]);
                    }
                    pc = tryEnd;
                    break;
                }
                case INST.JUMP:{
                    let addr = stack.pop();
                    pc = addr;
                    break;
                }
                case INST.JUMPT:{
                    let addr = stack.pop();
                    let test = stack.pop();
                    if(test){
                        pc = addr;
                    }
                    break;
                }
                case INST.RET:{
                    return stack.pop();
                    break;
                }
                case INST.POP:{
                    stack.pop();
                    break;
                }
                case INST.COPY:{
                    let top = stack[stack.length -1];
                    stack.push(top);
                    break;
                }
                case INST.COPY3:{
                    let top = stack[stack.length -1];
                    stack.splice(stack.length-3, 0, top);
                    break;
                }
                case INST.COPY2:{
                    let top = stack[stack.length -2];
                    stack.push(top);
                    break;
                }
                case INST.DBCOPY:{
                    stack.push(stack[stack.length -2]);
                    stack.push(stack[stack.length -2]);
                    break;
                }
                case INST.GET:{
                    let key = stack.pop();
                    let obj = stack.pop();
                    let value = obj[key];
                    stack.push(value);
                    break;
                }
                case INST.SET:{
                    let value = stack.pop()
                    let key = stack.pop()
                    let obj = stack.pop()
                    stack.push(obj[key] = value);
                    break;
                }
                case INST.DEL:{
                    let key = stack.pop()
                    let obj = stack.pop()
                    stack.push(delete obj[key]);
                    break;
                }
                case INST.STORE:{
                    let value = stack.pop();
                    let name = stack.pop();
                    scope.store(name, value)
                    stack.push(value);
                    break;
                }
                case INST.LOAD:{
                    let name = stack.pop();
                    let value = scope.load(name);
                    stack.push(value);
                    break;
                }
                case INST.THIS:{
                    stack.push(scope.load("this"));
                    break;
                }
                case INST.CALL:{
                    let arr = stack.pop();
                    let func = stack.pop();
                    let self = stack.pop();
                    stack.push(func.apply(self, arr));
                    break;
                }
                case INST.NEW:{
                    let args = stack.pop();
                    let func = stack.pop();
                    stack.push(new func(...args));
                    break;
                }
                case INST.REGEXP:{
                    let flags = stack.pop();
                    let pattern = stack.pop();
                    stack.push(new RegExp(pattern, flags));
                    break;
                }
                case INST.UNDEF:{
                    stack.push(undefined);
                    break;
                }
                case INST.ARR:{
                    stack.push([])
                    break;
                }
                case INST.OBJ:{
                    stack.push({})
                    break;
                }
                case INST.DEBUG:{
                    debugger;
                    break;
                }
                case INST.THROW:{
                    throw stack.pop();
                    break;
                }
                // 比较运算符实现（重点添加SEQ和SNEQ）
                case INST.EQ: { // 松散等于 (==)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a == b);
                    break;
                }
                case INST.NEQ: { // 松散不等于 (!=)
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a != b);
                    break;
                }
                case INST.SEQ: { // 严格等于 (===) - 新增实现
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a === b);
                    break;
                }
                case INST.SNEQ: { // 严格不等于 (!==) - 新增实现
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a !== b);
                    break;
                }
                case INST.LT: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a < b);
                    break;
                }
                case INST.GT: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a > b);
                    break;
                }
                case INST.LTE: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a <= b);
                    break;
                }
                case INST.GTE: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a >= b);
                    break;
                }
                case INST.TRUE: {
                    stack.push(true);
                    break;
                }
                case INST.FALSE: {
                    stack.push(false);
                    break;
                }
                case INST.NULL: {
                    stack.push(null);
                    break;
                }
                case INST.ADD2: {
                    let top = stack.pop();
                    stack.push(+top);
                    break;
                }
                case INST.SUB2: {
                    let top = stack.pop();
                    stack.push(-top);
                    break;
                }
                case INST.NOT: {
                    const val = stack.pop();
                    stack.push(!val);
                    break;
                }
                case INST.BNOT: {
                    let top = stack.pop();
                    stack.push(~top);
                    break;
                }
                case INST.VOID: {
                    let top = stack.pop();
                    stack.push(void top);
                    break;
                }
                case INST.TYPEOF: {
                    let top = stack.pop();
                    stack.push(typeof top);
                    break;
                }
                // 算术运算符
                case INST.ADD: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a + b);
                    break;
                }
                case INST.SUB: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a - b);
                    break;
                }
                case INST.MUL: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a * b);
                    break;
                }
                case INST.DIV: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a / b);
                    break;
                }
                case INST.MOD: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a % b);
                    break;
                }
                case INST.POW: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a ** b);
                    break;
                }
                case INST.UPLUS: {
                    const val = stack.pop();
                    stack.push(+val);
                    break;
                }
                case INST.UMINUS: {
                    const val = stack.pop();
                    stack.push(-val);
                    break;
                }
                // 逻辑运算
                case INST.AND: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a && b);
                    break;
                }
                case INST.OR: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a || b);
                    break;
                }
                // 位运算
                case INST.BAND: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a & b);
                    break;
                }
                case INST.BOR: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a | b);
                    break;
                }
                case INST.XOR: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a ^ b);
                    break;
                }
                case INST.BIT_NOT: {
                    const val = stack.pop();
                    stack.push(~val);
                    break;
                }
                case INST.LSR: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a << b);
                    break;
                }
                case INST.ASR: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a >> b);
                    break;
                }
                case INST.ROR: {
                    const b = stack.pop();
                    const a = stack.pop();
                    stack.push(a >>> b);
                    break;
                }
                // 自增自减
                case INST.INC: {
                    const val = stack.pop();
                    stack.push(val + 1);
                    break;
                }
                case INST.DEC: {
                    const val = stack.pop();
                    stack.push(val - 1);
                    break;
                }
                default:
                    console.log(`${INST[inst]}未实现`);
                    throw {};
            }
        }
    }
    vm(new Scope(),0);
})