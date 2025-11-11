const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const transform = require('@babel/core').transform;
const es5env = require('@babel/preset-env');


function toES5(es6code){
    return transform(es6code, {presets: [es5env]}).code;
}
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



// 编译器
class Compiler{
    constructor(code) {
        this.ast = parser.parse(code);
        this.instList = [];
        this.poolList = [];
        this.instDesc = []; //指令信息
        this.jumpList = []; //跳转列表
        this.uid = 0;
    }
    printInst(){
        for (let i=0; i<this.instDesc.length; i++){
            console.log(i+1, this.instDesc[i]);
        }
    }
    genInst(){
        let instList = [];
        let labelObj = {};
        for(let i=0; i<this.instList.length; i++){
            let inst = this.instList[i];
            if(typeof inst === "object"){
                let {type, name} = inst;
                if(type === "addr"){//addr
                    if(labelObj[name]){
                        labelObj[name].addr = instList.length;
                    }else{
                        labelObj[name] = {addr:instList.length, refs:[]};
                    }
                }else{ //ref
                    if(labelObj[name]){
                        labelObj[name].refs.push(instList.length);
                    }else{
                        labelObj[name] = {addr:0, refs:[instList.length]};
                    }
                    instList.push(0);
                }

            }else{
                instList.push(inst);
            }
        }
        for(const key in labelObj){
            let {addr, refs} = labelObj[key];
            for(let i=0; i<refs.length; i++){
                instList[refs[i]] = addr;
            }
        }
        this.instList = instList;
    }
    forIn(){
        traverse(this.ast,{
            ForInStatement(path) {
                let {left, right, body} = path.node;
                let kind = "";
                let leftName = left.name;
                if(left.type === "VariableDeclaration"){
                    kind = left.kind;
                    leftName = left.declarations[0].id.name;
                }
                let bodyCode = generator(body).code;
                let code = `
                    {
                        let keys = Object.keys(${right.name});
                        for(let i =0; i<keys.length; i++){
                            ${kind} ${leftName} = keys[i];
                            ${bodyCode}
                        }
                    }
                `;
                let newAst = parser.parse(code);
                path.replaceInline(newAst.program.body[0]);
            }
        })
    }
    forOf(){
        traverse(this.ast,{
            ForOfStatement(path) {
                let {left, right, body} = path.node;
                let kind = "";
                let leftName = left.name;
                if(left.type === "VariableDeclaration"){
                    kind = left.kind;
                    leftName = left.declarations[0].id.name;
                }
                let bodyCode = generator(body).code;
                let code = `
                    {
                        let iterObj = ${right.name}[Symbol.iterator]();
                        let obj = iterObj.next();
                        while(!obj.done){
                            ${kind} ${leftName} = obj.value;
                            obj = iterObj.next();
                            ${bodyCode}
                        }
                    }
                `;
                let newAst = parser.parse(code);
                path.replaceInline(newAst.program.body[0]);
            }
        })
    }
    compiler(){
        // for in 转换为for循环
        this.forIn();
        this.forOf();
        traverse(this.ast, {
            enter(path){
                let {scope, node} = path;
                node.scope = scope;
                // node.path = path;
                // debugger;
            }
        })
        this.compileStatement(this.ast.program);
        this.genInst();
    }
    pushInst(inst){
        this.instList.push(inst);
        this.instDesc.push(INST[inst]);
    }
    pushPool(value){
        let index = this.poolList.indexOf(value)
        this.pushInst(INST.PUSH)
        if(index !== -1){
            this.instList.push(index)
        }else{
            this.poolList.push(value)
            this.instList.push(this.poolList.length - 1)
        }
        this.instDesc.push(`PUSH ${value}`);
    }
    toScopeName(id){
        let {name, scope} = id;
        let s = scope;
        while(s){
            let {bindings, uid} = s;
            if(bindings[name]){
                return `zyz${uid}_${name}`;
            }
            s = s.parent
        }
        return name;
    }
    setRef(name){
        this.pushInst(INST.ADDR);
        this.instList.push({type:"ref", name:name});
        this.instDesc.push(`REF ${name}`);
    }
    setAddr(name){
        this.instList.push({type:"addr", name:name});
        this.instDesc.push(`ADDR ${name}`);
    }
    getUniqueName(name){
        return `${name}_${this.uid++}`;
    }
    compileStatement(node){
        let {type} = node;
        switch(type){
            case "Program":{
                let {body} = node;
                for (let i=0; i<body.length; i++){
                    this.compileStatement(body[i]);
                }
                break;
            }
            case "BlockStatement":{
                let {body, scope} = node;
                let {bindings} = scope;
                for(const key in bindings){
                    if(bindings[key].kind === "hoisted"){
                        let funcNode = bindings[key].path.node;
                        funcNode.funcLabel = this.getUniqueName("func");
                        let name = this.toScopeName(bindings[key].identifier);
                        this.pushPool(name);
                        this.setRef(funcNode.funcLabel);
                        this.pushInst(INST.FUNC);
                        this.pushInst(INST.STORE);
                        this.pushInst(INST.POP);
                    }
                }
                for (let i=0; i < body.length; i++){
                    this.compileStatement(body[i]);
                }
                break;
            }
            case "VariableDeclaration":{
                let {declarations} = node;
                for (let i=0; i<declarations.length; i++){
                    this.compileStatement(declarations[i]);
                }
                break;
            }
            case "VariableDeclarator":{
                let {id, init} = node;
                let name = this.toScopeName(id);
                this.pushPool(name);
                if (init !== null){
                    this.compileStatement(init);
                }else{
                    this.pushInst(INST.UNDEF);
                }
                this.pushInst(INST.STORE);
                this.pushInst(INST.POP)
                break;
            }
            case "ExpressionStatement":{
                let {expression} = node;
                this.compileStatement(expression);
                this.pushInst(INST.POP)
                break;
            }
            case "Identifier": {
                let {name} = node;
                if (name === 'undefined'){
                    this.pushInst(INST.UNDEF);
                    break;
                }
                this.pushPool(this.toScopeName(node));
                this.pushInst(INST.LOAD);
                break
            }
            case "TemplateLiteral":{
                let {expressions, quasis} = node;
                this.compileStatement(quasis[0]);
                for(let i=0; i<expressions.length; i++){
                   this.compileStatement(expressions[i]);
                   this.pushInst(INST.ADD);
                   this.compileStatement(quasis[i+1]);
                   this.pushInst(INST.ADD);
                }
                break;
            }
            case "TemplateElement":{
                let {value} = node;
                this.pushPool(value.raw);
                break;
            }
            case "RegExpLiteral":{
                let {pattern, flags} = node;
                this.pushPool(pattern);
                this.pushPool(flags);
                this.pushInst(INST.REGEXP);
                break;
            }
            case "BinaryExpression": {
                const { left, operator, right } = node;
                this.compileStatement(left);
                this.compileStatement(right);
                // 运算操作映射表（按类别整理）
                const opObj = {
                    // 1. 算术运算符
                    "+": INST.ADD,        // 加法
                    "-": INST.SUB,        // 减法
                    "*": INST.MUL,        // 乘法
                    "/": INST.DIV,        // 除法
                    "%": INST.MOD,        // 取模
                    "**": INST.POW,       // 幂运算

                    // 2. 位运算符
                    "&": INST.BAND,       // 按位与
                    "|": INST.BOR,        // 按位或
                    "^": INST.XOR,        // 按位异或
                    "<<": INST.LSR,       // 左移
                    ">>": INST.ASR,       // 算术右移
                    ">>>": INST.ROR,      // 无符号右移

                    // 3. 比较运算符
                    ">": INST.GT,         // 大于
                    "<": INST.LT,         // 小于
                    ">=": INST.GTE,       // 大于等于
                    "<=": INST.LTE,       // 小于等于
                    "==": INST.EQ,        // 松散等于
                    "!=": INST.NEQ,       // 松散不等于
                    "===": INST.SEQ,      // 严格等于
                    "!==": INST.SNEQ,     // 严格不等于

                    // 4. 逻辑运算符
                    "&&": INST.AND,       // 逻辑与
                    "||": INST.OR,        // 逻辑或
                    "!": INST.NOT,        // 逻辑非

                    // 5. 关系运算符
                    "in": INST.IN,        // in运算符（检查属性是否存在于对象中）
                    "instanceof": INST.INSTA,  // instanceof运算符（检查对象类型）

                    // 6. 特殊运算符
                    ",": INST.COMMA,      // 逗号运算符（分隔表达式，返回最后一个结果）
                    "typeof": INST.TYPEOF,  // typeof运算符（检测变量类型）
                    "delete": INST.DELETE   // delete运算符（删除对象属性）
                };
                this.pushInst(opObj[operator]);
                break;
            }
            case "SequenceExpression":{
                let {expressions} = node;
                let len = expressions.length;
                for(let i=0; i<len-1; i++){
                    this.compileStatement(expressions[i]);
                    this.pushInst(INST.POP);
                }
                this.compileStatement(expressions[len-1])
                break;
            }
            case "MemberExpression": {
                let { object, property, computed } = node;
                this.compileStatement(object)
                if (computed){
                    this.compileStatement(property);
                }else{
                    this.pushPool(property.name)
                }
                this.pushInst(INST.GET)
                break;
            }
            case "ObjectProperty": {
                const {key, value, computed} = node;
                this.pushInst(INST.COPY);
                if(computed){
                    this.compileStatement(key);
                }else{
                    if(key.type === "Identifier"){
                        this.pushPool(key.name);
                    }else{
                        this.compileStatement(key);
                    }
                }
                this.compileStatement(value);
                this.pushInst(INST.SET)
                this.pushInst(INST.POP)
                break;
            }
            case "ObjectExpression": {
                let {properties} = node;
                this.pushInst(INST.OBJ);
                for (let i=0; i < properties.length; i++){
                    this.compileStatement(properties[i]);
                }
                break;
            }
            case "ArrayExpression": {
                let {elements} = node;
                this.pushInst(INST.ARR);
                for (let i=0; i < elements.length; i++){
                    this.pushInst(INST.COPY);
                    this.pushPool(i);
                    this.compileStatement(elements[i]);
                    this.pushInst(INST.SET)
                    this.pushInst(INST.POP)
                }
                break;
            }

            case "LogicalExpression": {
                const { left, operator, right } = node;
                let endLabel = this.getUniqueName("end");
                this.compileStatement(left);
                this.pushInst(INST.COPY)
                if(operator === "&&"){
                    this.setRef(endLabel);
                    this.pushInst(INST.JUMPF);
                    this.pushInst(INST.POP);
                    this.compileStatement(right);
                    this.setAddr(endLabel)
                }else if(operator === "||"){
                    this.setRef(endLabel);
                    this.pushInst(INST.JUMPT);
                    this.pushInst(INST.POP);
                    this.compileStatement(right);
                    this.setAddr(endLabel)
                }
                break;
            }
            case "UpdateExpression": {
                let {prefix, operator, argument} = node;
                let op = operator === "++" ? INST.ADD : INST.SUB;
                if(argument.type === "Identifier"){
                    if(prefix){// ++a
                        let name = this.toScopeName(argument);
                        this.pushPool(name);
                        this.compileStatement(argument);
                        this.pushPool(1);
                        this.pushInst(op);
                        this.pushInst(INST.STORE);
                    }else{ // a++
                        this.compileStatement(argument);
                        let name = this.toScopeName(argument);
                        this.pushPool(name);
                        // this.compileStatement(argument);
                        this.pushInst(INST.COPY2)
                        this.pushPool(1);
                        this.pushInst(op);
                        this.pushInst(INST.STORE);
                        this.pushInst(INST.POP);
                    }
                }else if(argument.type === "MemberExpression"){
                    let {object, property, computed} = argument;
                    this.compileStatement(object);
                    if(computed){
                        this.compileStatement(property);
                    }else{
                        this.pushPool(property.name);
                    }
                    this.pushInst(INST.DBCOPY);
                    this.pushInst(INST.GET);
                    if(prefix){ //++user.age
                        this.pushPool(1);
                        this.pushInst(op);
                        this.pushInst(INST.SET);
                    }else{ // user.age++;
                        this.pushInst(INST.COPY3);
                        this.pushPool(1);
                        this.pushInst(op);
                        this.pushInst(INST.SET);
                        this.pushInst(INST.POP);
                    }
                }
                break;
            }
            case "UnaryExpression": {
                const { operator, argument } = node;
                const opObj = {
                    "+": INST.ADD2,
                    "-": INST.SUB2,
                    "!": INST.NOT,
                    "~": INST.BNOT,
                    "void": INST.VOID,
                    "typeof": INST.TYPEOF,
                    "delete": INST.DEL,
                }
                if (operator === "delete"){
                    if(argument.type === "Identifier"){
                        let name = this.toScopeName(argument);
                        if(name === argument.name){
                            this.pushPool(name);
                            this.pushInst(INST.UNDEF);
                            this.pushInst(INST.STORE);
                            this.pushInst(INST.POP);
                            this.pushInst(INST.TRUE)
                        }else{
                            this.pushInst(INST.FALSE)
                        }
                    }else if(argument.type === "MemberExpression"){
                        let {object, property, computed} = argument;
                        this.compileStatement(object)
                        if(computed){
                            this.compileStatement(property);
                        }else{
                            this.pushPool(property.name);
                        }
                        this.pushInst(INST.DEL);
                    }else{
                        this.pushInst(INST.TRUE);
                    }

                }else{
                    this.compileStatement(argument)
                    this.pushInst(opObj[operator])
                }

                break;
            }
            case "AssignmentExpression":{
                let {left, operator, right} = node;
                const opObj = {
                    "+=": INST.ADD,
                    "-=": INST.SUB,
                    "*=": INST.MUL,
                    "/=": INST.DIV,
                    "%=": INST.MOD,
                    "**": INST.POW,
                    "&=": INST.BAND,
                    "|=": INST.BOR,
                    "^=": INST.XOR,
                    "<<=": INST.LSR,
                    ">>=": INST.ASR,
                    ">>>=": INST.ROR
                };
                if(left.type === "Identifier"){
                    let name = this.toScopeName(left);
                    this.pushPool(name);
                    if(operator === "="){
                        this.compileStatement(right);
                    }else{
                        this.compileStatement(left);
                        this.compileStatement(right);
                        this.pushInst(opObj[operator]);
                    }
                    this.pushInst(INST.STORE);
                }else if(left.type === "MemberExpression"){
                    let {object, property, computed} = left;
                    this.compileStatement(object);
                    if(computed){
                        this.compileStatement(property);
                    }else{
                        this.pushPool(property.name);
                    }
                    if(operator === "="){
                        this.compileStatement(right);
                    }else{
                        this.pushInst(INST.DBCOPY)
                        this.pushInst(INST.GET);
                        this.compileStatement(right);
                        this.pushInst(opObj[operator]);
                    }
                    this.pushInst(INST.SET);

                }
                break;
            }
            case "CallExpression": {
                let {callee} = node;
                let args = node.arguments;
                if (callee.type === "MemberExpression"){
                    let {object, property, computed} = callee;
                    this.compileStatement(object);
                    this.pushInst(INST.COPY);
                    if(computed){ // console["log"]
                        this.compileStatement(property);
                    }else{ // console.log
                        this.pushPool(property.name);
                    }
                    this.pushInst(INST.GET)
                }else{
                    this.pushInst(INST.UNDEF)
                    this.compileStatement(callee)
                }
                this.pushInst(INST.ARR);
                for(let i=0; i<args.length; i++){
                    this.pushInst(INST.COPY)
                    this.pushPool(i);
                    this.compileStatement(args[i]);
                    this.pushInst(INST.SET);
                    this.pushInst(INST.POP);
                }
                this.pushInst(INST.CALL);
                break;
            }
            case "NewExpression":{
                let {callee} = node;
                let args = node.arguments;
                this.compileStatement(callee);
                this.pushInst(INST.ARR);
                for(let i=0; i<args.length; i++){
                    this.pushInst(INST.COPY);
                    this.pushPool(i);
                    this.compileStatement(args[i]);
                    this.pushInst(INST.SET);
                    this.pushInst(INST.POP);
                }
                this.pushInst(INST.NEW);
                break;
            }
            case "NumericLiteral":{
                let {value} = node;
                this.pushPool(value)
                break;
            }
            case "StringLiteral":{
                let {value} = node;
                this.pushPool(value)
                break;
            }
            case "BooleanLiteral":{
                let {value} = node;
                if(value){
                    this.pushInst(INST.TRUE)
                }else{
                    this.pushInst(INST.FALSE)
                }
                break;
            }
            case "NullLiteral":{
                this.pushInst(INST.NULL)
                break;
            }
            case "EmptyStatement":{
                break;
            }
            case "DebuggerStatement":{
                this.pushInst(INST.DEBUG);
                break;
            }
            case "ThrowStatement":{
                let {argument} = node;
                this.compileStatement(argument);
                this.pushInst(INST.THROW);
                break;
            }
            case "IfStatement":{
                let {test, consequent, alternate} = node;
                let endLabel = this.getUniqueName("if_end");
                let elseLabel = this.getUniqueName("if_else");
                this.compileStatement(test);
                if(alternate === null){
                    this.setRef(endLabel);
                    this.pushInst(INST.JUMPF);
                    this.compileStatement(consequent);
                }else{
                    this.setRef(elseLabel);
                    this.pushInst(INST.JUMPF);
                    this.compileStatement(consequent);
                    this.setRef(endLabel);
                    this.pushInst(INST.JUMP);
                    this.setAddr(elseLabel);
                    this.compileStatement(alternate);
                }
                this.setAddr(endLabel);
                break;
            }
            case "ConditionalExpression":{
                let {test, consequent, alternate} = node;
                let endLabel = this.getUniqueName("if_end");
                let elseLabel = this.getUniqueName("if_else");
                this.compileStatement(test);
                if(alternate === null){
                    this.setRef(endLabel);
                    this.pushInst(INST.JUMPF);
                    this.compileStatement(consequent);
                }else{
                    this.setRef(elseLabel);
                    this.pushInst(INST.JUMPF);
                    this.compileStatement(consequent);
                    this.setRef(endLabel);
                    this.pushInst(INST.JUMP);
                    this.setAddr(elseLabel);
                    this.compileStatement(alternate);
                }
                this.setAddr(endLabel);
                break;
            }
            case "WhileStatement":{
                let {test, body} = node;
                let whileEnd = this.getUniqueName("while_end");
                let whileTest = this.getUniqueName("while_test");
                this.jumpList.push({break:whileEnd, continue:whileTest});
                this.setAddr(whileTest);
                this.compileStatement(test);
                this.setRef(whileEnd);
                this.pushInst(INST.JUMPF);
                this.compileStatement(body);
                this.setRef(whileTest)
                this.pushInst(INST.JUMP);
                this.setAddr(whileEnd);
                this.jumpList.pop();
                break;
            }
            case "BreakStatement":{
                let breakLabel = this.jumpList[this.jumpList.length-1].break;
                this.setRef(breakLabel);
                this.pushInst(INST.JUMP);
                break;
            }
            case "ContinueStatement":{
                let continueLabel = this.jumpList[this.jumpList.length-1].continue;
                this.pushInst(INST.POP);
                this.setRef(continueLabel);
                this.pushInst(INST.JUMP);
                break;
            }
            case "DoWhileStatement":{
                let {test, body} = node;
                let startLabel = this.getUniqueName("do_while_start");
                let testLabel = this.getUniqueName("do_while_test");
                let endLabel = this.getUniqueName("do_while_end");
                this.jumpList.push({break:endLabel, continue:testLabel});
                this.setAddr(startLabel);
                this.compileStatement(body);
                this.setAddr(testLabel);
                this.compileStatement(test);
                this.setRef(startLabel);
                this.pushInst(INST.JUMPT);
                this.setAddr(endLabel)
                this.jumpList.pop();
                break;
            }
            case "ForStatement":{
                let {init, test, body, update} = node;
                let forEnd = this.getUniqueName("for_end");
                let forTest = this.getUniqueName("for_test");
                let forUpdate = this.getUniqueName("for_update");
                this.jumpList.push({break:forEnd, continue:forUpdate});
                if(init){ //初始化
                    this.compileStatement(init);
                    if(init.type !== "VariableDeclaration"){
                        this.pushInst(INST.POP);
                    }
                }
                this.setAddr(forTest)
                if(test){
                    this.compileStatement(test);
                    this.setRef(forEnd);
                    this.pushInst(INST.JUMPF);
                }
                // this.compileStatement(body);
                this.setAddr(forTest)
                if(test){
                    this.compileStatement(test);
                    this.setRef(forEnd);
                    this.pushInst(INST.JUMPF);
                }
                this.compileStatement(body);
                this.setAddr(forUpdate);
                if(update){
                    this.compileStatement(update);
                    this.pushInst(INST.POP);
                }
                this.setRef(forTest);
                this.pushInst(INST.JUMP);
                this.setAddr(forEnd);
                this.jumpList.pop();
                break;
            }
            case "SwitchStatement":{
                let {discriminant, cases} = node;
                let switchCase = this.getUniqueName("switch_case");
                let switchDefault = this.getUniqueName("switch_default");
                let switchBreak = this.getUniqueName("switch_break");
                this.jumpList.push({break:switchBreak})
                this.compileStatement(discriminant);
                for(let i=0; i<cases.length; i++){
                    let {test} = cases[i];
                    if(test){
                        this.pushInst(INST.COPY);
                        this.compileStatement(test);
                        this.pushInst(INST.SEQ)
                        this.setRef(`${switchCase}_${i}`);
                        this.pushInst(INST.JUMPT);
                    }
                }
                for(let i=0; i<cases.length; i++){
                    let {test} = cases[i];
                    if(test === null){
                        this.setRef(switchDefault);
                        this.pushInst(INST.JUMPT);
                    }
                }

                for(let i=0; i<cases.length; i++){
                    let {test, consequent} = cases[i];
                    if(test){ // case语句
                        this.setAddr(`${switchCase}_${i}`);

                    }else{//default
                        this.setAddr(switchDefault);
                    }
                    for(let j=0; j<consequent.length; j++){
                        this.compileStatement(consequent[j]);
                    }
                }
                this.setAddr(switchBreak);
                this.pushInst(INST.POP)
                this.jumpList.pop();
                break;
            }
            case "FunctionDeclaration":{
                let {body, params, funcLabel} = node;
                let func = this.getUniqueName("func");
                let funcEnd = this.getUniqueName("funcEnd");
                this.setRef(funcEnd);
                this.pushInst(INST.JUMP);
                this.setAddr(funcLabel);
                for(let i=0; i<params.length; i++){
                    let name = this.toScopeName(params[i]);
                    this.pushPool(name);
                    this.pushInst(INST.COPY2);
                    this.pushPool(i);
                    this.pushInst(INST.GET);
                    this.pushInst(INST.STORE);
                    this.pushInst(INST.POP);
                }
                this.pushInst(INST.POP);
                this.compileStatement(body);
                this.pushInst(INST.UNDEF);
                this.pushInst(INST.RET);
                this.setAddr(funcEnd)
                break;
            }
            case "FunctionExpression":{
                let {body, params} = node;
                let func = this.getUniqueName("func");
                let funcEnd = this.getUniqueName("funcEnd");
                this.setRef(func);
                this.pushInst(INST.FUNC);
                this.setRef(funcEnd);
                this.pushInst(INST.JUMP);
                this.setAddr(func); //进入函数体
                for(let i=0; i<params.length; i++){
                    let name = this.toScopeName(params[i]);
                    this.pushPool(name);
                    this.pushInst(INST.COPY2);
                    this.pushPool(i);
                    this.pushInst(INST.GET);
                    this.pushInst(INST.STORE);
                    this.pushInst(INST.POP);
                }
                this.pushInst(INST.POP);
                this.compileStatement(body);
                this.pushInst(INST.UNDEF);
                this.pushInst(INST.RET);
                this.setAddr(funcEnd)
                break;
            }
            case "ReturnStatement":{
                let {argument} =  node;
                if(argument){
                   this.compileStatement(argument);
                }else{
                    this.pushInst(INST.UNDEF)
                }
                this.pushInst(INST.RET); // 退出函数, 结果返回
                break;
            }
            case "ThisExpression":{
                this.pushInst(INST.THIS);
                break;
            }
            case "TryStatement":{
                let {block, handler} = node;
                let allEnd = this.getUniqueName("all_end");
                let catchStart = this.getUniqueName("catch_start");
                this.setRef(catchStart);
                this.setRef(allEnd);
                this.pushInst(INST.TRY);
                this.compileStatement(block);
                this.pushInst(INST.UNDEF);
                this.pushInst(INST.RET);
                this.setAddr(catchStart);
                this.compileStatement(handler);
                this.setAddr(allEnd);
                break;
            }
            case "CatchClause":{
                let {param, body} = node;
                let name = this.toScopeName(param);
                this.pushPool(name);
                this.pushInst(INST.COPY2);
                this.pushInst(INST.STORE);
                this.pushInst(INST.POP);
                this.pushInst(INST.POP);
                this.compileStatement(body);
                this.pushInst(INST.UNDEF);
                this.pushInst(INST.RET);
                break;
            }
            default:
                console.log(`${type}未实现`);
                throw {}
        }
    }
}

// 解释器

function main(){
    let jsCode = fs.readFileSync("./input.js") + "";
    let vmCode = fs.readFileSync("./vm.js") + "";
    jsCode = toES5(jsCode)
    let compiler = new Compiler(jsCode);
    compiler.compiler();
    // 解释执行
    // 输出常量表
    console.log("============常量表==============")
    console.log(compiler.poolList)
    // 输出指令
    console.log("============指令表==============")
    console.log(compiler.instList)
    console.log("============指令信息输出=========")
    compiler.printInst();
    // 解释执行
    console.log("============输出JSVMP============")
    // vmFunc(compiler.instList, compiler.poolList);
    // console.log(jsCode)
    fs.writeFile("./output.js", `${vmCode}(${JSON.stringify(compiler.instList)}, ${JSON.stringify(compiler.poolList)})`, (e)=>{});
}
main()