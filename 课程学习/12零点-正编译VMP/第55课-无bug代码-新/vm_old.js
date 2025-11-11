(function vmFunc(instList,poolList){
    const INST = {};{
    INST[INST["ADD"]=1]="ADD"; // +
    INST[INST["SUB"]=2]="SUB"; // -
    INST[INST["MUL"]=3]="MUL"; // *
    INST[INST["DIV"]=4]="DIV"; // /
    INST[INST["MOD"]=5]="MOD"; // %
    INST[INST["POW"]=6]="POW"; // **
    INST[INST["BAND"]=7]="BAND"; // &
    INST[INST["BOR"]=8]="BOR"; // |
    INST[INST["XOR"]=9]="XOR"; // ^
    INST[INST["LSR"]=10]="LSR"; // <<
    INST[INST["ASR"]=11]="ASR"; // >>
    INST[INST["ROR"]=12]="ROR"; // >>>
    INST[INST["IN"]=13]="IN"; // in
    INST[INST["INSTA"]=14]="INSTA"; // instanceof
    INST[INST["GT"]=15]="GT"; // >
    INST[INST["LT"]=16]="LT"; // <
    INST[INST["GTE"]=17]="GTE"; // >=
    INST[INST["LTE"]=18]="LTE"; // <=
    INST[INST["EQ"]=19]="EQ"; // ==
    INST[INST["NEQ"]=20]="NEQ"; // !=
    INST[INST["SEQ"]=21]="SEQ"; // ===
    INST[INST["SNEQ"]=22]="SNEQ"; // !==



    INST[INST["AND"]=23]="AND"; // &&

    INST[INST["ADD2"]=31]="ADD2"; // +
    INST[INST["SUB2"]=32]="SUB2"; // -
    INST[INST["NOT"]=33]="NOT"; // !
    INST[INST["BNOT"]=34]="BNOT"; // ~
    INST[INST["VOID"]=35]="VOID"; // void
    INST[INST["TYPEOF"]=36]="TYPEOF"; // typeof
    INST[INST["DEL"]=37]="DEL"; // delete



    INST[INST["STORE"] = 51] = "STORE"; // 变量赋值
    INST[INST["LOAD"] = 52] = "LOAD"; // 读取变量
    INST[INST["GET"] = 53] = "GET"; // 对象读取属性值
    INST[INST["SET"] = 54] = "SET"; // 对象属性设置值



    INST[INST["PUSH"] = 101] = "PUSH"; // push 值入栈
    INST[INST["POP"] = 102] = "POP"; // 栈顶出栈
    INST[INST["CALL"] = 103] = "CALL"; // 函数调用指令
    INST[INST["COPY"] = 104] = "COPY"; // 复制栈顶元素
    INST[INST["DBCOPY"] = 105] = "DBCOPY"; // 复制栈顶两个元素
    INST[INST["COPY2"] = 106] = "COPY2"; // 复制栈顶第二个元素
    INST[INST["COPY3"] = 107] = "COPY3"; // 将栈顶元素复制到2个单位的位置


    INST[INST["ADDR"] = 121] = "ADDR"; // 地址指令，将下一个指令作为地址入栈
    INST[INST["JUMP"] = 122] = "JUMP"; // 无条件跳转
    INST[INST["JUMPT"] = 123] = "JUMPT"; // 条件为真跳转
    INST[INST["JUMPF"] = 124] = "JUMPF"; // 条件为假跳转


    INST[INST["UNDEF"] = 151] = "UNDEF"; // undefined
    INST[INST["ARR"] = 152] = "ARR"; // []
    INST[INST["TRUE"] = 153] = "TRUE"; // true
    INST[INST["FALSE"] = 154] = "FALSE"; // false
    INST[INST["NULL"] = 155] = "NULL"; // null
    INST[INST["OBJ"] = 156] = "OBJ"; // {}
    INST[INST["REGEXP"] = 157] = "REGEXP"; // 正则表达式
    INST[INST["NEW"] = 158] = "NEW"; // new 操作符
    INST[INST["DEBUG"] = 159] = "DEBUG"; // debugger;
    INST[INST["THROW"] = 160] = "THROW"; // throw {}
    INST[INST["FUNC"] = 161] = "FUNC"; // 函数指令
    INST[INST["RET"] = 162] = "RET"; // 函数返回
    INST[INST["THIS"] = 163] = "THIS"; // this指令
    INST[INST["TRY"] = 164] = "TRY"; // try指令



    INST[INST["DEF"] = 165] = "DEF"; // 定义变量，初始化作用域


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
    Scope.prototype.load = function (name){ // 获取变量的值
        return this.data[name];
    }
    Scope.prototype.store = function (name,value){ // 赋值
        let data = this.data;
        if(name === "this" || name === "arguments"){
            data[name]= value;
            return value;
        }
        while(!data.hasOwnProperty(name) && data !== globalThis){
            data = data.__proto__;
        }
        // if(data.hasOwnProperty(name)){
        //     this.data[name] = value;
        //     return
        // }
        // console.log(value);
        data[name] = value;
    }
    Scope.prototype.def = function (name){ // 初始化当前作用域变量
        this.data[name] = undefined;
    }

    function vm(scope, pc, stack){
        stack = stack || [];
        while(1){
            let inst = instList[pc++];
            if(inst === undefined){break;}
            switch (inst){
                case INST.PUSH: {
                    let pos = instList[pc++];
                    stack.push(poolList[pos]);
                    break;
                }
                case INST.POP: {
                    stack.pop();
                    break;
                }
                case INST.COPY: {
                    let top = stack[stack.length-1];
                    stack.push(top);
                    break;
                }
                case INST.COPY2: {
                    let top = stack[stack.length-2];
                    stack.push(top);
                    break;
                }
                case INST.COPY3: {// [1,2,3,4] // [1,4,2,3,4]
                    debugger;
                    let top = stack[stack.length - 1];
                    stack.splice(stack.length-3,0,top);
                    debugger;
                    break;
                }
                case INST.DBCOPY: {
                    stack.push(stack[stack.length-2]);
                    stack.push(stack[stack.length-2]);
                    break;
                }
                case INST.GET: {
                    let key = stack.pop();
                    let obj = stack.pop();
                    let value = obj[key];
                    stack.push(value);
                    break;
                }
                case INST.SET: {
                    let value = stack.pop();
                    let key = stack.pop();
                    let obj = stack.pop();
                    stack.push(obj[key] = value);
                    break;
                }
                case INST.DEL: {
                    let key = stack.pop();
                    let obj = stack.pop();
                    stack.push(delete obj[key]);
                    break;
                }
                case INST.STORE: {
                    let value = stack.pop();
                    let name = stack.pop();
                    scope.store(name,value);
                    stack.push(value);
                    break;
                }
                case INST.LOAD: {
                    let name = stack.pop();
                    let value = scope.load(name); // ld0_a
                    stack.push(value);
                    break;
                }
                case INST.THIS: {
                    stack.push(scope.load("this"));
                    break;
                }
                case INST.RET: {
                    return stack.pop();
                    break;
                }
                case INST.FUNC: {
                    let funcPC = stack.pop();
                    let func = function (...args){
                        let s = new Scope(scope);
                        s.store("this",this);
                        s.store("arguments",arguments);
                        return vm(s,funcPC,[args]);
                    }
                    stack.push(func);
                    break;
                }
                case INST.TRY: {
                    let tryEnd = stack.pop();
                    let catchStart = stack.pop();
                    try{
                        vm(scope, pc);
                    }catch (e) {
                        vm(scope, catchStart,[e]);
                    }
                    pc = tryEnd;
                    break;
                }
                case INST.CALL: {
                    let arr = stack.pop();
                    let func = stack.pop();
                    let self = stack.pop();
                    stack.push(func.apply(self,arr));
                    break;
                }
                case INST.NEW: {
                    let args = stack.pop();
                    let func = stack.pop();
                    stack.push(new func(...args));
                    break;
                }
                case INST.REGEXP: {
                    let flags = stack.pop();
                    let pattern = stack.pop();
                    stack.push(new RegExp(pattern,flags));
                    break;
                }
                case INST.UNDEF: {
                    stack.push(undefined);
                    break;
                }
                case INST.NULL: {
                    stack.push(null);
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
                case INST.ARR: {
                    stack.push([]);
                    break;
                }
                case INST.OBJ: {
                    stack.push({});
                    break;
                }
                case INST.DEBUG: {
                    debugger;
                    break;
                }
                case INST.THROW: {
                    throw stack.pop();
                    break;
                }
                case INST.ADD2:{
                    let top = stack.pop();
                    stack.push(+top);
                    break;
                }
                case INST.SUB2:{
                    let top = stack.pop();
                    stack.push(-top);
                    break;
                }
                case INST.NOT:{
                    let top = stack.pop();
                    stack.push(!top);
                    break;
                }
                case INST.BNOT:{
                    let top = stack.pop();
                    stack.push(~top);
                    break;
                }
                case INST.VOID:{
                    let top = stack.pop();
                    stack.push(void top);
                    break;
                }
                case INST.TYPEOF:{
                    let top = stack.pop();
                    stack.push(typeof top);
                    break;
                }
                case INST.ADD:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left + right);
                    break;
                }
                case INST.SUB:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left - right);
                    break;
                }
                case INST.MUL:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left * right);
                    break;
                }
                case INST.DIV:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left / right);
                    break;
                }
                case INST.MOD:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left % right);
                    break;
                }
                case INST.POW:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left ** right);
                    break;
                }
                case INST.BAND:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left & right);
                    break;
                }
                case INST.BOR:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left | right);
                    break;
                }
                case INST.XOR:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left ^ right);
                    break;
                }
                case INST.LSR:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left << right);
                    break;
                }
                case INST.ASR:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left >> right);
                    break;
                }
                case INST.ROR:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left >>> right);
                    break;
                }
                case INST.IN:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left in right);
                    break;
                }
                case INST.INSTA:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left instanceof right);
                    break;
                }
                case INST.GT:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left > right);
                    break;
                }
                case INST.LT:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left < right);
                    break;
                }
                case INST.GTE:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left >= right);
                    break;
                }
                case INST.LTE:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left <= right);
                    break;
                }
                case INST.EQ:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left == right);
                    break;
                }
                case INST.NEQ:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left != right);
                    break;
                }
                case INST.SEQ:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left === right);
                    break;
                }
                case INST.SNEQ:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left !== right);
                    break;
                }
                case INST.AND:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left && right);
                    break;
                }
                case INST.ADDR: {
                    let addr = instList[pc++];
                    stack.push(addr);
                    break;
                }
                case INST.JUMPT: {
                    let addr = stack.pop();
                    let test = stack.pop();
                    if(test){
                        pc = addr;
                    }
                    break;
                }
                case INST.JUMPF: {
                    let addr = stack.pop();
                    let test = stack.pop();
                    if(!test){
                        pc = addr;
                    }
                    break;
                }
                case INST.JUMP: {
                    let addr = stack.pop();
                    pc = addr;
                    break;
                }
                case INST.DEF: {
                    let key = stack.pop();
                    scope.def(key);
                    break;
                }
                default:
                    console.log(`${INST[inst]} 未实现`);
                    throw {};
            }
        }
    }
    vm(new Scope(),0);
})