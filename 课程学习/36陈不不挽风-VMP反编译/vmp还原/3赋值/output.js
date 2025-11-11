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
            if (inst === undefined) { break; }
            console.log(`指令为${inst}, 栈状态:`, astStack.map(n => generator(n).code));
            switch (inst) {
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
                    }
                    break;
                }
                case 101: { // PUSH
                    let pos = instList[pc++];
                    let val = poolList[pos]
                    stack.push(val);
                    astStack.push(type.valueToNode(val))
                    break;
                }
                case 102: { // POP
                    stack.pop();
                    break;
                }
                case 104: { // COPY
                    let top = stack[stack.length - 1];
                    stack.push(top);
                    break;
                }
                case 152: { // ARR
                    stack.push([]);
                    break;
                }
                default:
                    console.log(`${inst} 未实现`);
                    throw { };
            }
        }
                console.log(astStack)
        const astNodes = [];
        while (astStack.length > 0) {
          astNodes.push(astStack.pop());
        }
        astNodes.reverse().forEach(node => {
          allBody.body.push(type.expressionStatement(node));
        });
    }
    vm(new Scope(), 0);
})([101,0,152,104,101,1,101,2,54,102,104,101,3,101,4,54,102,104,101,5,101,6,54,102,51,102], ["a",0,123,1,12,2,"345"]);
console.log('还原后的代码为：\n' + generator(allBody, {compact:false,   jsescOption: {minimal: true,unicode: false}, format:{indent:{style:'  '}}}).code);