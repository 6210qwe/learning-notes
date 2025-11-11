const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default

// 安装Babel
// npm install @babel/core --save-dev
// npm install @babel/types --save-dev

const INST = {};{
    INST[INST["ADD"] = 1] = "ADD"
    INST[INST["STORE"] = 51] = "STORE" // 变量赋值
    INST[INST["LOAD"] = 52] = "LOAD" // 变量赋值
    INST[INST["PUSH"] = 101] = "PUSH" // 值入栈
    INST[INST["UNDEF"] = 151] = "UNDEF" // undefined
}

// 编译器
class Compiler{
    constructor(code) {
        this.ast = parser.parse(code);
        this.instList = [];
        this.poolList = [];
    }
    compiler(){
        traverse(this.ast, {
            enter(path){
                let {scope, node} = path;
                node.scope = scope;
                // node.path = path;
                // debugger;
            }
        })
        this.compileStatement(this.ast.program);
    }
    pushInst(inst){
        this.instList.push(inst);
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
                let {body} = node;
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
                break;
            }
            case "ExpressionStatement":{
                let {expression} = node;
                this.compileStatement(expression)
                break;
            }
            case "Identifier": {
                let {name} = node;
                this.pushPool(this.toScopeName(node));
                this.pushInst(INST.LOAD);
                break
            }
            case "BinaryExpression":{
                let {left, operator, right} = node;
                this.compileStatement(left)
                this.compileStatement(right)
                this.pushInst(INST.ADD)
                break;
            }
            case "NumericLiteral":{
                let {value} = node;
                this.pushPool(value)
                break;
            }
            default:
                console.log(`${type}未实现`);
                throw {}
        }
    }
}

// 解释器
function vmFunc(instList, poolList){
    function Scope(parentScope){
        this.data = {};
        if(parentScope){
            this.data.__proto__ = parentScope.data;
        }else{
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
            if(inst === undefined){console.log(stack);break}
            switch(inst){
                case INST.PUSH:{
                    let pos = instList[pc++];
                    stack.push(poolList[pos]);
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
                case INST.UNDEF:{
                    stack.push(undefined);
                    break;
                }
                case INST.ADD:{
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push(left + right)
                    break;
                }
                default:
                    console.log(`${INST[inst]}未实现`);
                    throw {};
            }
        }
    }
    vm(new Scope(),0);
}
function main(){
    let jsCode = fs.readFileSync("./input.js") + "";
    let compiler = new Compiler(jsCode);
    compiler.compiler();
    // 解释执行
    // 输出常量表
    console.log("============常量表==============")
    console.log(compiler.poolList)
    // 输出指令
    console.log("============指令表==============")
    console.log(compiler.instList)
    vmFunc(compiler.instList, compiler.poolList);
    console.log(jsCode)
}
main()