

// 定义一个字符串拆分规则

function property_string(js_code) {
    let ast_code = parse(js_code)
    let nodes_to_replace = [];
    traverse(ast_code, {
        ObjectProperty: {
            exit: function (path) {
                nodes_to_replace.push(path)
            }
        }
    })
    nodes_to_replace.forEach((path) => {
        if(path.node.key.name){
             path.node.key = types.StringLiteral(path.node.key.name)
        }
    })

    return generator(ast_code).code

}

module.exports = property_string;