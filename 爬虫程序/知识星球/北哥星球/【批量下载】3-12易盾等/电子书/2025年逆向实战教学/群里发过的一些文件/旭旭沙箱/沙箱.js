const fs = require('fs');
const path = require('path');
const all = {}

const envfilePath = path.join(__dirname, 'env.js');  //需要读取的环境代码
const envjsContent = fs.readFileSync(envfilePath, 'utf-8');

const codefilePath = path.join(__dirname, 'code.js');  //需要读取的执行代码
const codejsContent = fs.readFileSync(codefilePath, 'utf-8');


function set_sandbox(name,fun){
    global[name] = fun
}
set_sandbox('all',all)  //传入外部对象
set_sandbox('path',path) //传入外部

// 将环境和代码拼接
rescode = ''
rescode += envjsContent + '\n'
rescode += codejsContent + '\n'


// 丢入需要执行的js代码
Function(rescode)();