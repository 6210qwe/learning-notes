// 读取要转换的 ES6 代码


function ES6_to_ES5(js_code){
  // 解析代码为 AST
  let ast = parse(js_code, {
    sourceType: 'module',
    plugins: ['jsx']
  });

  // 转换 AST 为 ES5 代码，使用同步的 transformSync 方法
  let result = babel.transformFromAstSync(ast, js_code, {
    presets: ['@babel/preset-env'],
  });

  // 输出转换后的 ES5 代码
  return result.code;
}

module.exports  = ES6_to_ES5
