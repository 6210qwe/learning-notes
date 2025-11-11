// 导包

let {parse} = require("@babel/parser")
let generator = require("@babel/generator").default
let traverse = require('@babel/traverse').default;
let types = require('@babel/types');
let fs = require('fs');
const babel = require('@babel/core');

// 配置全局化
global.parse = parse;
global.generator = generator;
global.traverse = traverse;
global.types = types;
global.fs = fs;
global.babel = babel;

function sec4_lesson7(){
    // 读取输入的js
let js_code = fs.readFileSync("input.js", "utf8")


// AST的处理部分，混淆部分
let config = {
    to_es5: {
        open: true,
    },
    property_string: {
        open: true,
    },
    ObjectProperty_string:  {
        open: true,
    },
    string_split: {
        open: true,
        split_number: 2,
    },  // 配置化
    control: {
        open: true,
    },
    string_hex: {
        open: true,
    }, // 放在字符串相关处理的最后一步
    number_split: {
        open: true,
    },
    rename:  {
        open: true,
    },

}

for (let module_name in config){
    // 判断模块是否开启
    if(config[module_name]["open"]){
        js_code = require(`./ob_module/${module_name}`)(js_code, config[module_name])
        console.log(module_name, "success")
    }
}

// 写入输出的js
// fs.writeFileSync("output.js", js_code, "utf-8")
return js_code
}
