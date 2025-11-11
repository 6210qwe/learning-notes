const fs = require('fs'); // 文件输入输出
const parser = require("@babel/parser");// 解析js代码
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;// 将ast转换成js代码

// 安装Babel
// npm install --save-dev --prefix ./ @babel/core

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


// 编译器
class Complier{
    constructor(code) {
        this.ast = parser.parse(code); // 解析js代码
        this.instList = [];
        this.poolList = [];
        this.instDesc = []; // 指令信息
        this.jumpList = []; // 跳转列表
        this.uid = 0;
    }
    printInst(){
        for (let i = 0; i < this.instDesc.length; i++) {
            console.log(i+1, this.instDesc[i]);
        }
    }
    genInst(){
        let instList = [];
        let labelObj = {};
        for(let i=0;i<this.instList.length;i++){
            let inst = this.instList[i];
            if(typeof inst === "object"){
                let {type, name} = inst;
                if(type === "addr"){// addr
                    if(labelObj[name]){
                        labelObj[name].addr = instList.length;
                    }else{
                        labelObj[name] = {addr:instList.length,refs:[]};
                    }
                }else{// ref
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
        for (const key in labelObj) {
            let {addr,refs} = labelObj[key];
            for (let i = 0; i < refs.length; i++) {
                instList[refs[i]] = addr;
            }
        }
        this.instList = instList;
    }
    forin(){
        traverse(this.ast,{
            ForInStatement(path){
                let {left,right,body} = path.node;
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
                    for (let i = 0; i < keys.length; i++) {
                        ${kind} ${leftName} = keys[i];
                        ${bodyCode}
                    }
                }
                `;
                let newAst = parser.parse(code);
                path.replaceInline(newAst.program.body[0]);
            }
        });
    }
    forof(){
        traverse(this.ast,{
            ForOfStatement(path){
                let {left,right,body} = path.node;
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
        });
    }
    complie(){
        // forin 转换成for
        this.forin();
        // forof 转换成while
        this.forof();
        traverse(this.ast,{
            enter(path){
                let {scope,node} = path;
                node.scope = scope;
                // path -> node
                // node -> path;
                // node.path = path;
            }
        });
        this.complieStatement(this.ast.program);
        this.genInst();
    }
    toScopeName(id){
        let {name,scope} = id;
        let s = scope;
        while(s){
            let {bindings,uid} = s;
            if(bindings[name]){
                return `ld${uid}_${name}`;// ld0_a;
            }
            s = s.parent;
        }
        return name;
    }
    pushInst(inst){
        this.instList.push(inst);
        if(inst !== INST.PUSH){
            this.instDesc.push(INST[inst]); // 指令信息
        }
    }
    pushPool(value){
        let index = this.poolList.indexOf(value);
        this.pushInst(INST.PUSH);
        if(index !== -1){
            this.instList.push(index);
        }else{
            this.poolList.push(value);
            this.instList.push(this.poolList.length-1);
        }
        this.instDesc.push(`PUSH ${value}`); // 指令信息
    }
    getUniqueName(name){
        return `${name}_${this.uid++}`;
    }
    setRef(name){
        this.pushInst(INST.ADDR);
        this.instList.push({type:"ref", name:name});// 100
        this.instDesc.push(`ref ${name}`);
    }
    setAddr(name){
        this.instList.push({type:"addr", name:name});
        this.instDesc.push(`addr ${name}`);
    }
    complieStatement(node){
        let {type} = node;
        switch(type){
            case "Program":
            case "BlockStatement":{
                let {body,scope} = node;
                let {bindings} = scope;
                for (const key in bindings) {
                    if(bindings[key].kind === "hoisted"){
                        let funcNode = bindings[key].path.node
                        funcNode.funcLabel = this.getUniqueName("func");
                        let name = this.toScopeName(bindings[key].identifier);
                        this.pushPool(name);
                        this.setRef(funcNode.funcLabel);
                        this.pushInst(INST.FUNC);
                        this.pushInst(INST.STORE);
                        this.pushInst(INST.POP);
                    }
                }
                for(let i=0;i<body.length;i++){
                    this.complieStatement(body[i]);
                }
                break;
            }
            case "VariableDeclaration":{
                let {declarations} = node;
                for (let i = 0; i < declarations.length; i++) {
                    this.complieStatement(declarations[i]);
                }
                break;
            }
            case "VariableDeclarator":{
                let {id,init} = node;
                let name = this.toScopeName(id);
                this.pushPool(name);
                if(init !== null){
                    this.complieStatement(init);
                }else{
                    this.pushInst(INST.UNDEF);
                }
                this.pushInst(INST.STORE);
                this.pushInst(INST.POP);
                break;
            }
            case "ExpressionStatement":{
                let {expression} = node;
                this.complieStatement(expression);
                this.pushInst(INST.POP);
                break;
            }
            case "Identifier":{
                let {name} = node;
                if(name === "undefined"){
                    this.pushInst(INST.UNDEF);
                    break;
                }
                this.pushPool(this.toScopeName(node));
                this.pushInst(INST.LOAD);
                break;
            }
            case "TemplateLiteral":{
                let {expressions, quasis} = node;
                this.complieStatement(quasis[0]);
                for(let i=0;i<expressions.length;i++){
                    this.complieStatement(expressions[i]);
                    this.pushInst(INST.ADD);
                    this.complieStatement(quasis[i+1]);
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
            case "NullLiteral":{
                this.pushInst(INST.NULL);
                break;
            }
            case "BooleanLiteral":{
                let {value} = node;
                if(value){
                    this.pushInst(INST.TRUE);
                }else{
                    this.pushInst(INST.FALSE);
                }
                break;
            }
            case "StringLiteral":
            case "NumericLiteral":{
                let {value} = node;
                this.pushPool(value);
                break;
            }
            case "UnaryExpression":{
                let {operator,argument} = node;
                const opObj = {
                    "+":INST.ADD2,
                    "-":INST.SUB2,
                    "!":INST.NOT,
                    "~":INST.BNOT,
                    "void":INST.VOID,
                    "typeof":INST.TYPEOF,
                    "delete":INST.DEL,
                }
                if(operator === "delete"){
                    if(argument.type === "Identifier"){
                        let name = this.toScopeName(argument);
                        if(name === argument.name){// 全局变量
                            this.pushPool(name);
                            this.pushInst(INST.UNDEF);
                            this.pushInst(INST.STORE);
                            this.pushInst(INST.POP);
                            this.pushInst(INST.TRUE);
                        }else{
                            this.pushInst(INST.FALSE);
                        }
                    }else if(argument.type === "MemberExpression"){
                        let {object, property,computed} = argument;
                        this.complieStatement(object);
                        if(computed){
                            this.complieStatement(property);
                        }else{
                            this.pushPool(property.name);
                        }
                        this.pushInst(INST.DEL);
                    }else{
                        this.pushInst(INST.TRUE);
                    }
                }else{
                    this.complieStatement(argument);
                    this.pushInst(opObj[operator]);
                }
                break;
            }
            case "UpdateExpression":{
                let {prefix,operator,argument} = node;
                let op = operator === "++" ? INST.ADD :INST.SUB;
                if(argument.type === "Identifier"){
                    if(prefix){// ++a
                        let name = this.toScopeName(argument);
                        this.pushPool(name);
                        this.complieStatement(argument);
                        this.pushPool(1);
                        this.pushInst(op);
                        this.pushInst(INST.STORE);
                    }else{// a++
                        this.complieStatement(argument);
                        let name = this.toScopeName(argument);
                        this.pushPool(name);
                        this.pushInst(INST.COPY2);
                        this.pushPool(1);
                        this.pushInst(op);
                        this.pushInst(INST.STORE);
                        this.pushInst(INST.POP);
                    }
                } else if(argument.type === "MemberExpression"){
                    let {object,property,computed} = argument;
                    this.complieStatement(object);
                    if(computed){ // []
                        this.complieStatement(property);
                    }else{// .
                        this.pushPool(property.name);
                    }
                    this.pushInst(INST.DBCOPY);
                    this.pushInst(INST.GET);
                    if(prefix){// ++user.age;
                        this.pushPool(1);
                        this.pushInst(op);
                        this.pushInst(INST.SET);
                    }else{// user.age++;
                        this.pushInst(INST.COPY3);
                        this.pushPool(1);
                        this.pushInst(op);
                        this.pushInst(INST.SET);
                        this.pushInst(INST.POP);
                    }
                }
                break;
            }
            case "AssignmentExpression":{
                let {left,operator,right} = node;
                const opObj = {
                    "+=":INST.ADD,
                    "-=":INST.SUB,
                    "*=":INST.MUL,
                    "/=":INST.DIV,
                    "%=":INST.MOD,
                    "**=":INST.POW,
                    "&=":INST.BAND,
                    "|=":INST.BOR,
                    "^=":INST.XOR,
                    "<<=":INST.LSR,
                    ">>=":INST.ASR,
                    ">>>=":INST.ROR,
                };
                if(left.type === "Identifier"){
                    let name = this.toScopeName(left);
                    this.pushPool(name);
                    if(operator === "="){
                        this.complieStatement(right);
                    }else{
                        this.complieStatement(left);
                        this.complieStatement(right);
                        this.pushInst(opObj[operator]);
                    }
                    this.pushInst(INST.STORE);
                }else if(left.type ==="MemberExpression"){
                    let {object,property,computed} = left;
                    this.complieStatement(object);
                    if(computed){// []
                        this.complieStatement(property);
                    }else{
                        this.pushPool(property.name);
                    }
                    if(operator === "="){
                        this.complieStatement(right);
                    }else{
                        this.pushInst(INST.DBCOPY);
                        this.pushInst(INST.GET);
                        this.complieStatement(right);
                        this.pushInst(opObj[operator]);
                    }
                    this.pushInst(INST.SET);
                }
                break;
            }
            case "BinaryExpression":{
                let {left,operator,right} = node;
                this.complieStatement(left);
                this.complieStatement(right);
                const opObj = {
                    "+":INST.ADD,
                    "-":INST.SUB,
                    "*":INST.MUL,
                    "/":INST.DIV,
                    "%":INST.MOD,
                    "**":INST.POW,
                    "&":INST.BAND,
                    "|":INST.BOR,
                    "^":INST.XOR,
                    "<<":INST.LSR,
                    ">>":INST.ASR,
                    ">>>":INST.ROR,
                    "in":INST.IN,
                    "instanceof":INST.INSTA,
                    ">":INST.GT,
                    "<":INST.LT,
                    ">=":INST.GTE,
                    "<=":INST.LTE,
                    "==":INST.EQ,
                    "!=":INST.NEQ,
                    "===":INST.SEQ,
                    "!==":INST.SNEQ,
                }
                this.pushInst(opObj[operator]);
                break;
            }
            case "SequenceExpression":{
                let {expressions} = node;
                let len = expressions.length;
                for (let i = 0; i < len-1; i++) {
                    this.complieStatement(expressions[i]);
                    this.pushInst(INST.POP);
                }
                this.complieStatement(expressions[len-1]);
                break;
            }
            case "MemberExpression":{
                let {object,property,computed} = node;
                this.complieStatement(object);
                if(computed){ // []
                    this.complieStatement(property);
                }else{// .
                    this.pushPool(property.name);
                }
                this.pushInst(INST.GET);
                break;
            }
            case "ObjectExpression":{
                let {properties} = node;
                this.pushInst(INST.OBJ);
                for (let i = 0; i < properties.length; i++) {
                    this.complieStatement(properties[i]);
                }
                break;
            }
            case "ObjectProperty":{
                let {key,value,computed} = node;
                this.pushInst(INST.COPY);
                if(computed){// []
                    this.complieStatement(key);
                }else{
                    if(key.type === "Identifier"){
                        this.pushPool(key.name);
                    }else{
                        this.complieStatement(key);
                    }
                }
                this.complieStatement(value);
                this.pushInst(INST.SET);
                this.pushInst(INST.POP);
                break;
            }
            case "ArrayExpression":{
                let {elements} = node;
                this.pushInst(INST.ARR);
                for (let i = 0; i < elements.length; i++) {
                    this.pushInst(INST.COPY);
                    this.pushPool(i);
                    this.complieStatement(elements[i]);
                    this.pushInst(INST.SET);
                    this.pushInst(INST.POP);
                }
                break;
            }
            case "CallExpression":{
                let {callee} = node;
                let args = node.arguments;
                if(callee.type === "MemberExpression"){
                    let {object,property, computed} = callee;
                    this.complieStatement(object); // obj
                    this.pushInst(INST.COPY); // 复制栈顶元素
                    if(computed){// console["log"] // key
                        this.complieStatement(property);
                    }else{// console.log
                        this.pushPool(property.name);
                    }
                    this.pushInst(INST.GET);
                }else{
                    this.pushInst(INST.UNDEF);
                    this.complieStatement(callee);
                }
                this.pushInst(INST.ARR);// []
                for(let i=0;i<args.length;i++){
                    this.pushInst(INST.COPY);
                    this.pushPool(i);
                    this.complieStatement(args[i]);
                    this.pushInst(INST.SET);
                    this.pushInst(INST.POP);
                }
                this.pushInst(INST.CALL);
                break;
            }
            case "NewExpression":{
                let {callee} = node;
                let args = node.arguments;
                this.complieStatement(callee); // func
                this.pushInst(INST.ARR);// []
                for (let i = 0; i <args.length; i++) {
                    this.pushInst(INST.COPY);
                    this.pushPool(i);
                    this.complieStatement(args[i]);
                    this.pushInst(INST.SET);
                    this.pushInst(INST.POP);
                }
                this.pushInst(INST.NEW);
                break;
            }
            case "DebuggerStatement":{
                this.pushInst(INST.DEBUG);
                break;
            }
            case "EmptyStatement":{
                break;
            }
            case "ThrowStatement":{
                let {argument} = node;
                this.complieStatement(argument);
                this.pushInst(INST.THROW);
                break;
            }
            case "ConditionalExpression":
            case "IfStatement":{
                let {test,consequent,alternate} = node;
                let endLabel = this.getUniqueName("if_end");
                let elseLabel = this.getUniqueName("if_else");
                this.complieStatement(test);
                if(alternate === null){
                    this.setRef(endLabel);// 入栈要跳转的地址
                    this.pushInst(INST.JUMPF);
                    this.complieStatement(consequent);
                }else{
                    this.setRef(elseLabel);
                    this.pushInst(INST.JUMPF); /// 条件为假跳转
                    this.complieStatement(consequent);
                    this.setRef(endLabel);
                    this.pushInst(INST.JUMP); // 无条件跳转
                    this.setAddr(elseLabel);
                    this.complieStatement(alternate);
                }
                this.setAddr(endLabel);
                break;
            }
            case "LogicalExpression":{
                let {left,operator,right} = node;
                let endLabel = this.getUniqueName("end");
                this.complieStatement(left);
                this.pushInst(INST.COPY);
                this.setRef(endLabel);
                if(operator === "&&"){
                    this.pushInst(INST.JUMPF);
                }else if(operator === "||"){
                    this.pushInst(INST.JUMPT);
                }
                this.pushInst(INST.POP);
                this.complieStatement(right);
                this.setAddr(endLabel);
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
                this.setRef(continueLabel);
                this.pushInst(INST.JUMP);
                break;
            }
            case "WhileStatement":{
                let {test,body} = node;
                let whileEnd = this.getUniqueName("while_end");
                let whileTest = this.getUniqueName("while_test");
                this.jumpList.push({break:whileEnd,continue:whileTest});
                this.setAddr(whileTest);
                this.complieStatement(test);
                this.setRef(whileEnd);
                this.pushInst(INST.JUMPF);
                this.complieStatement(body);
                this.setRef(whileTest);
                this.pushInst(INST.JUMP);
                this.setAddr(whileEnd);
                this.jumpList.pop();
                break;
            }
            case "DoWhileStatement":{
                let {test,body} = node;
                let startLabel = this.getUniqueName("do_while_start");
                let testLabel = this.getUniqueName("do_while_test");
                let endLabel = this.getUniqueName("do_while_end");
                this.jumpList.push({break:endLabel,continue:testLabel});
                this.setAddr(startLabel);
                this.complieStatement(body);
                this.setAddr(testLabel);
                this.complieStatement(test);
                this.setRef(startLabel)
                this.pushInst(INST.JUMPT);
                this.setAddr(endLabel);
                this.jumpList.pop();
                break;
            }
            case "ForStatement":{
                let {init,test,body,update} = node;
                let forEnd = this.getUniqueName("for_end");
                let forTest = this.getUniqueName("for_test");
                let forUpdate = this.getUniqueName("for_update");
                this.jumpList.push({break:forEnd,continue:forUpdate});
                if(init){// 初始化
                    this.complieStatement(init);
                    if(init.type !== "VariableDeclaration"){
                        this.pushInst(INST.POP);
                    }
                }
                this.setAddr(forTest);
                if(test){
                    this.complieStatement(test);
                    this.setRef(forEnd);
                    this.pushInst(INST.JUMPF);
                }
                this.complieStatement(body);
                this.setAddr(forUpdate);
                if(update){
                    this.complieStatement(update);
                    this.pushInst(INST.POP);
                }
                this.setRef(forTest);
                this.pushInst(INST.JUMP);
                this.setAddr(forEnd);
                this.jumpList.pop();
                break;
            }
            case "SwitchStatement":{
                let {discriminant,cases} = node;
                let switchCase = this.getUniqueName("switch_case");
                let switchDefault = this.getUniqueName("switch_default");
                let switchBreak = this.getUniqueName("switch_break");
                this.jumpList.push({break:switchBreak});
                this.complieStatement(discriminant);
                for (let i = 0; i < cases.length; i++) {
                    let {test} = cases[i];
                    if(test){
                        this.pushInst(INST.COPY);
                        this.complieStatement(test);
                        this.pushInst(INST.SEQ);
                        this.setRef(`${switchCase}_${i}`);
                        this.pushInst(INST.JUMPT);
                    }
                }
                for (let i = 0; i < cases.length; i++) {
                    let {test} = cases[i];
                    if(test === null){
                        this.setRef(switchDefault);
                        this.pushInst(INST.JUMP);
                    }
                }
                for (let i = 0; i < cases.length; i++) {
                    let {test,consequent} = cases[i];
                    if(test){ // case 1: case 2
                        this.setAddr(`${switchCase}_${i}`);
                    }else{ // default
                        this.setAddr(switchDefault);
                    }
                    for (let j = 0; j < consequent.length; j++) {
                        this.complieStatement(consequent[j]);
                    }
                }
                this.setAddr(switchBreak);
                this.pushInst(INST.POP);
                this.jumpList.pop();
                break;
            }
            case "ReturnStatement":{
                let {argument} = node;
                if(argument){
                    this.complieStatement(argument);
                }else{
                    this.pushInst(INST.UNDEF);
                }
                this.pushInst(INST.RET); // 退出函数，结果返回
                break;
            }
            case "ThisExpression":{
                this.pushInst(INST.THIS);
                break;
            }
            case "FunctionExpression":{
                let {body,params} = node;
                let func = this.getUniqueName("func");
                let funcEnd = this.getUniqueName("funcEnd");
                this.setRef(func);
                this.pushInst(INST.FUNC);
                this.setRef(funcEnd);
                this.pushInst(INST.JUMP);
                this.setAddr(func); // 进入函数体
                for (let i = 0; i < params.length; i++) {
                    let name = this.toScopeName(params[i]);
                    this.pushPool(name);
                    this.pushInst(INST.COPY2);
                    this.pushPool(i);
                    this.pushInst(INST.GET);
                    this.pushInst(INST.STORE);
                    this.pushInst(INST.POP);
                }
                this.pushInst(INST.POP);
                this.complieStatement(body);
                this.pushInst(INST.UNDEF);
                this.pushInst(INST.RET);
                this.setAddr(funcEnd);
                break;
            }
            case "FunctionDeclaration":{
                let {body,params,funcLabel,scope} = node;
                let func = this.getUniqueName("func");
                let funcEnd = this.getUniqueName("funcEnd");
                this.setRef(funcEnd);
                this.pushInst(INST.JUMP);
                this.setAddr(funcLabel); // 进入函数体
                let {bindings,uid} = scope;

                for (const key in bindings) {
                    this.pushPool(`ld${uid}_${key}`); // 作用域中的名字
                    this.pushInst(INST.DEF);
                }
                for (let i = 0; i < params.length; i++) {
                    let name = this.toScopeName(params[i]);
                    this.pushPool(name);
                    this.pushInst(INST.COPY2);
                    this.pushPool(i);
                    this.pushInst(INST.GET);
                    this.pushInst(INST.STORE);
                    this.pushInst(INST.POP);
                }
                this.pushInst(INST.POP);
                this.complieStatement(body);
                this.pushInst(INST.UNDEF);
                this.pushInst(INST.RET);
                this.setAddr(funcEnd);
                break;
            }
            case "TryStatement":{
                let {block,handler} = node;
                let allEnd = this.getUniqueName("all_end");
                let catchStart = this.getUniqueName("catch_start");
                this.setRef(catchStart);
                this.setRef(allEnd);
                this.pushInst(INST.TRY);
                this.complieStatement(block);
                this.pushInst(INST.UNDEF);
                this.pushInst(INST.RET);
                this.setAddr(catchStart);
                this.complieStatement(handler);
                this.setAddr(allEnd);
                break;
            }
            case "CatchClause":{
                let {param,body} = node;
                let name = this.toScopeName(param);
                this.pushPool(name);
                this.pushInst(INST.COPY2);
                this.pushInst(INST.STORE);
                this.pushInst(INST.POP);
                this.pushInst(INST.POP);
                this.complieStatement(body);
                this.pushInst(INST.UNDEF);
                this.pushInst(INST.RET);
                break;
            }
            default:
                console.log(`${type} 未实现`);
                throw {}
        }
    }
}



// 解释器
function vmFunc(instList,poolList){
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
            if(inst === undefined){console.log("退出时，为空栈：",stack);break;}
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
}


function main(){
    // 导入文件
    let jsCode = fs.readFileSync("./input.js") + "";
    // 创建编译器对象
    let complier = new Complier(jsCode);
    // 编译代码
    complier.complie();
    // 输出常量表
    console.log("===========================常量表===============================")
    console.log(complier.poolList);
    // 输出指令
    console.log("===========================指令表===============================")
    // console.log(complier.instList);
    complier.printInst();
    // 解释执行
    console.log("===========================执行指令===============================")
    vmFunc(complier.instList,complier.poolList);
}

main()

